import { capiPayloadBuilder } from './capiPayload';
import { capiTransport } from './transport';
import { CapiUserData } from './types';

export const capiEventBridge = {
  /**
   * Translates client-side event tracking parameters and pushes them immediately
   * into the CAPI Transport Layer utilizing matching Event IDs.
   * 
   * @param eventName - e.g. 'PageView'
   * @param eventId - Reused unique transaction reference
   * @param eventTime - Timestamp code
   * @param params - Associated payload
   * @param overrideUserData - Captured match elements
   */
  async bridgeEvent(
    eventName: string,
    eventId: string,
    eventTime: number,
    params: Record<string, any> = {},
    overrideUserData?: CapiUserData
  ): Promise<void> {
    try {
      // 1. Build standardized Server-Side Meta Payload
      const capiEvent = capiPayloadBuilder.buildEvent(
        eventName,
        eventId,
        eventTime,
        params,
        overrideUserData
      );

      // 2. Transmit asynchronously via transport layer
      await capiTransport.send([capiEvent]);
    } catch (err) {
      console.warn(`[CAPI Bridge] Failed to execute bridge synchronization for "${eventName}":`, err);
    }
  }
};
