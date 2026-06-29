import { safeStorage } from './storage';
import { UtmParams } from './types';

export interface AttributionInfo {
  origin: 'facebook' | 'instagram' | 'google' | 'direct' | 'organic' | 'paid' | 'other';
  channelName: string;
  referrer: string;
}

export const attributionSystem = {
  /**
   * Safe parser to inspect referrers and determine touch origin
   */
  classifyTraffic(utms: UtmParams, referrer: string): AttributionInfo {
    const rawReferrer = referrer.toLowerCase();
    const source = (utms.utm_source || '').toLowerCase();
    const medium = (utms.utm_medium || '').toLowerCase();

    // 1. Detect Facebook Paid or Organic traffic
    if (
      source.includes('facebook') ||
      source.includes('fb') ||
      rawReferrer.includes('facebook.com') ||
      rawReferrer.includes('fb.me') ||
      utms.fbclid
    ) {
      if (medium.includes('cpc') || medium.includes('paid') || utms.fbclid) {
        return { origin: 'facebook', channelName: 'Facebook Ads', referrer };
      }
      return { origin: 'facebook', channelName: 'Facebook Orgânico', referrer };
    }

    // 2. Detect Instagram Paid or Organic traffic
    if (
      source.includes('instagram') ||
      source.includes('ig') ||
      rawReferrer.includes('instagram.com')
    ) {
      if (medium.includes('cpc') || medium.includes('paid')) {
        return { origin: 'instagram', channelName: 'Instagram Ads', referrer };
      }
      return { origin: 'instagram', channelName: 'Instagram Orgânico', referrer };
    }

    // 3. Detect Google Search & Paid traffic
    if (
      source.includes('google') ||
      source.includes('gads') ||
      rawReferrer.includes('google.com') ||
      utms.gclid
    ) {
      if (medium.includes('cpc') || medium.includes('paid') || utms.gclid) {
        return { origin: 'google', channelName: 'Google Ads', referrer };
      }
      return { origin: 'google', channelName: 'Google Search Orgânico', referrer };
    }

    // 4. Fallback to Direct if no referrer and no UTMs
    if (!referrer && Object.keys(utms).length === 0) {
      return { origin: 'direct', channelName: 'Acesso Direto', referrer: '' };
    }

    // 5. Detect general Organic search
    const organicSearchSources = ['bing.com', 'yahoo.com', 'duckduckgo.com', 'baidu.com'];
    if (organicSearchSources.some(src => rawReferrer.includes(src))) {
      return { origin: 'organic', channelName: 'Busca Orgânica Outros', referrer };
    }

    return { origin: 'other', channelName: source || 'Tráfego de Referência', referrer };
  },

  /**
   * Initializes attribution tracking and returns traffic source
   */
  getOrInitTrafficSource(utms: UtmParams): AttributionInfo {
    if (typeof window === 'undefined') {
      return { origin: 'direct', channelName: 'Acesso Direto', referrer: '' };
    }

    const currentReferrer = document.referrer || '';
    
    // Check if we have already saved first touch traffic source
    const cached = safeStorage.getLocalItem('fc_traffic_source');
    if (cached) {
      try {
        return JSON.parse(cached) as AttributionInfo;
      } catch (_) {}
    }

    // Compute and persist the original traffic source
    const classification = this.classifyTraffic(utms, currentReferrer);
    safeStorage.setLocalItem('fc_traffic_source', JSON.stringify(classification));

    // Save initial referrer permanently if not yet recorded
    if (!safeStorage.getLocalItem('fc_initial_referrer')) {
      safeStorage.setLocalItem('fc_initial_referrer', currentReferrer);
    }

    return classification;
  }
};
