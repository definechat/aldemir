import { capiTransport } from './transport';
import { capiEventBridge } from './eventBridge';
import { CapiUserData } from './types';

export const capiClient = {
  /**
   * Safe initializer for the Conversions API system on startup.
   * Flushes outstanding items stored in local caches due to previous network losses.
   */
  initialize(): void {
    if (typeof window === 'undefined') return;
    
    // Drain queued entries asynchronously to avoid rendering delays
    setTimeout(() => {
      capiTransport.flushStoredQueue().catch(err => {
        console.warn('[CapiClient] Failed background queue synchronization:', err);
      });
    }, 3000);
  },

  /**
   * Facade method to manually trigger real Conversions API events.
   * Reuses identical payload formatting paradigms.
   */
  async trackServerEvent(
    eventName: string,
    eventId: string,
    eventTime: number,
    params: Record<string, any> = {},
    overrideUserData?: CapiUserData
  ): Promise<void> {
    await capiEventBridge.bridgeEvent(eventName, eventId, eventTime, params, overrideUserData);
  }
};
