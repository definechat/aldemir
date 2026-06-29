import { generateUUID } from './sessionManager';

export interface EventIdRecord {
  eventId: string;
  eventTime: number; // Unix timestamp in seconds
  eventTimestamp: string; // ISO format
}

export const eventIdSystem = {
  /**
   * Generates a unique event ID matching Meta's spec: prefix_name_uuid
   * @param eventName - Name of the event being dispatched
   */
  generate(eventName: string): EventIdRecord {
    const uuid = generateUUID();
    const cleanName = eventName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const eventTimeMs = Date.now();
    
    return {
      eventId: `fc_${cleanName}_${uuid}`,
      eventTime: Math.floor(eventTimeMs / 1000), // Meta CAPI expects seconds
      eventTimestamp: new Date(eventTimeMs).toISOString()
    };
  }
};
