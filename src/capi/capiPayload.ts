import { CapiEvent, CapiCustomData, CapiUserData } from './types';
import { capiUserDataBuilder } from './userData';

export const capiPayloadBuilder = {
  /**
   * Generates a single official Meta CAPI event payload matching browser events 1:1
   * 
   * @param eventName - e.g., 'PageView', 'ViewContent', 'InitiateCheckout', 'Purchase'
   * @param eventId - Reused unique transaction reference generated previously
   * @param eventTime - Timestamp structure
   * @param customParams - Value, Content ID arrays, currency etc.
   * @param overrideUserData - Allows appending newly collected email/phone pairs safely
   */
  buildEvent(
    eventName: string,
    eventId: string,
    eventTime: number,
    customParams: Record<string, any> = {},
    overrideUserData?: CapiUserData
  ): CapiEvent {
    const defaultUrl = typeof window !== 'undefined' ? window.location.href : '';

    // 1. Build Client User Data
    const basicUserData = capiUserDataBuilder.getBasicUserData();
    const finalUserData: CapiUserData = {
      ...basicUserData,
      ...(overrideUserData || {})
    };

    // 2. Build Custom Event Data (Meta standard conversion fields)
    const customData: CapiCustomData = {};
    if (customParams.value !== undefined) customData.value = Number(customParams.value);
    if (customParams.currency) customData.currency = customParams.currency;
    if (customParams.content_name) customData.content_name = customParams.content_name;
    if (customParams.content_category) customData.content_category = customParams.content_category;
    if (customParams.content_type) customData.content_type = customParams.content_type;
    if (customParams.content_ids) {
      customData.content_ids = Array.isArray(customParams.content_ids)
        ? customParams.content_ids
        : [customParams.content_ids];
    }
    
    // Pass along supplemental custom attributes safely for granular server matches and reporting
    Object.keys(customParams).forEach(key => {
      const standardKeys = [
        'value',
        'currency',
        'content_name',
        'content_category',
        'content_type',
        'content_ids',
        'event_id',
        'event_time',
        'visitor_id',
        'session_id',
        'fbc',
        'fbp',
        'external_id',
        'traffic_origin',
        'traffic_channel',
        'event_source_url',
        'action_source'
      ];
      if (!standardKeys.includes(key)) {
        customData[key] = customParams[key];
      }
    });

    return {
      event_name: eventName,
      event_time: eventTime,
      event_id: eventId,
      event_source_url: customParams.event_source_url || defaultUrl,
      action_source: 'website',
      user_data: finalUserData,
      custom_data: Object.keys(customData).length > 0 ? customData : undefined
    };
  }
};
