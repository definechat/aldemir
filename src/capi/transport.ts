import { CapiEvent } from './types';
import { safeStorage } from '../tracking/storage';

export const capiTransport = {
  isBrowser(): boolean {
    return typeof window !== 'undefined';
  },

  /**
   * Dispatches the structured event array to the custom CAPI micro-routing endpoint
   */
  async send(events: CapiEvent[]): Promise<boolean> {
    if (events.length === 0) return true;

    // Check if browser context is present before hitting any network requests
    if (!this.isBrowser()) return false;

    try {
      // Endpoint is set to /api/meta/capi. In Netlify or similar frameworks, this can
      // be seamlessly backed by a Netlify Function or API Route for server-side execution.
      const response = await fetch('/api/meta/capi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ events }),
        // Timeout safeguard to prevent blocking thread execution
        signal: AbortSignal.timeout ? AbortSignal.timeout(6000) : undefined
      });

      if (response.ok) {
        return true;
      } else {
        console.warn(`[CAPI Transport] API replied with status code: ${response.status}`);
        this.saveToOutboundQueue(events);
        return false;
      }
    } catch (err) {
      console.warn('[CAPI Transport] Post failed due to network or connection timeout. Queueing for retry.', err);
      this.saveToOutboundQueue(events);
      return false;
    }
  },

  /**
   * Persists undelivered events to localStorage for immediate resubmission upon next mount
   */
  saveToOutboundQueue(events: CapiEvent[]): void {
    if (!this.isBrowser()) return;
    try {
      const storedQueue = safeStorage.getLocalItem('fc_capi_outbound_queue');
      const queue: CapiEvent[] = storedQueue ? JSON.parse(storedQueue) : [];

      // Avoid growing queue infinitely
      const merged = [...queue, ...events].slice(-50);
      safeStorage.setLocalItem('fc_capi_outbound_queue', JSON.stringify(merged));
    } catch (_) {}
  },

  /**
   * Background process to consume or drain and flush pending outbound events
   */
  async flushStoredQueue(): Promise<void> {
    if (!this.isBrowser()) return;
    try {
      const storedQueue = safeStorage.getLocalItem('fc_fc_capi_outbound_queue');
      if (!storedQueue) return;

      const queue: CapiEvent[] = JSON.parse(storedQueue);
      if (queue.length === 0) return;

      console.info(`[CAPI Transport] Attempting to flush ${queue.length} cached server-side events...`);
      const success = await this.send(queue);

      if (success) {
        safeStorage.removeLocalItem('fc_capi_outbound_queue');
        console.info('[CAPI Transport] Outbound queue successfully synchronized with Conversions API.');
      }
    } catch (_) {}
  }
};
