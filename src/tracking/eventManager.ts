import { eventIdSystem, EventIdRecord } from './eventId';
import { deduplicationSystem } from './deduplication';
import { safeStorage } from './storage';

export interface EnrichedEventPayload {
  eventName: string;
  eventId: string;
  eventTime: number; // seconds
  eventTimestamp: string; // ISO
  params: Record<string, any>;
  clientMetadata: Record<string, any>;
}

export const eventManager = {
  /**
   * Safe check for client environment
   */
  isClient(): boolean {
    return typeof window !== 'undefined';
  },

  /**
   * Formats, deduplicates, and signs any event.
   * Keeps track of the generated parameters so that if a backend integration (CAPI)
   * is added, all events can seamlessly be mirrored over to the server with precise pairing.
   * 
   * @param eventName - Official Meta Pixel specification name
   * @param params - Payload parameters
   * @param customOptions - Advanced options like cooldown override
   */
  prepareAndQueue(
    eventName: string,
    params: Record<string, any> = {},
    customOptions: { cooldownMs?: number } = {}
  ): EnrichedEventPayload | null {
    if (!this.isClient()) return null;

    // 1. Check for rate limit and double click de-duplication
    const cooldown = customOptions.cooldownMs !== undefined ? customOptions.cooldownMs : 1500;
    if (deduplicationSystem.isDuplicate(eventName, params, cooldown)) {
      console.info(`[Tracking] Event "${eventName}" deduplicated (ignored to prevent inflation)`);
      return null;
    }

    // 2. Generate pristine event UUID matching CAPI specifications
    const eventRecord: EventIdRecord = eventIdSystem.generate(eventName);

    // 3. Assemble and log tracking information (perfect for offline server queues/sync, CAPI, or Webhook triggers)
    const enrichedPayload: EnrichedEventPayload = {
      eventName,
      eventId: eventRecord.eventId,
      eventTime: eventRecord.eventTime,
      eventTimestamp: eventRecord.eventTimestamp,
      params: {
        ...params,
        event_id: eventRecord.eventId, // Inject for EMQ matching context
        event_time: eventRecord.eventTime
      },
      clientMetadata: {
        event_source_url: window.location.href,
        action_source: 'website',
        referrer: typeof document !== 'undefined' ? document.referrer : ''
      }
    };

    // 4. Save the last 15 purchase/checkout/conversion events in dynamic queue cache (allows CAPI delivery fallbacks if browser fails)
    try {
      const storedQueueStr = safeStorage.getLocalItem('fc_capi_sync_queue');
      const queue: EnrichedEventPayload[] = storedQueueStr ? JSON.parse(storedQueueStr) : [];
      queue.push(enrichedPayload);
      
      // Bound size to keep storage light and clean
      if (queue.length > 15) {
        queue.shift();
      }
      safeStorage.setLocalItem('fc_capi_sync_queue', JSON.stringify(queue));
    } catch (_) {}

    return enrichedPayload;
  }
};
