import { UtmParams, TouchState } from './types';
import { safeStorage } from './storage';

export const utmManager = {
  /**
   * Helper to parse query parameters from current window URL
   */
  getQueryParams(): UtmParams {
    if (typeof window === 'undefined') return {};
    try {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const utms: UtmParams = {};

      const trackingKeys = [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_content',
        'utm_term',
        'fbclid',
        'gclid'
      ];

      trackingKeys.forEach(key => {
        const val = params.get(key);
        if (val) {
          utms[key] = val;
        }
      });

      return utms;
    } catch (e) {
      console.warn('[UtmManager] Error parsing search query parameters', e);
      return {};
    }
  },

  /**
   * Evaluates if any relevant UTM or Facebook Click tracking keys are active
   */
  hasUtmParams(params: UtmParams): boolean {
    return Object.keys(params).length > 0;
  },

  /**
   * Main initializer: runs upon entry, persists touch states safely
   */
  initialize(): { firstTouch: TouchState | null; lastTouch: TouchState | null } {
    if (typeof window === 'undefined') return { firstTouch: null, lastTouch: null };

    const currentUtms = this.getQueryParams();
    const currentUrl = window.location.href;
    const currentReferrer = document.referrer || '';
    const timestamp = new Date().toISOString();

    let firstTouch = this.getFirstTouch();
    let lastTouch = this.getLastTouch();

    // If new UTMs are found in the URL, parse and update storage
    if (this.hasUtmParams(currentUtms)) {
      const newTouchState: TouchState = {
        utm_params: currentUtms,
        landing_page: currentUrl,
        referrer: currentReferrer,
        timestamp: timestamp
      };

      // 1. Maintain First Touch permanently (never overwrite once captured)
      if (!firstTouch) {
        firstTouch = newTouchState;
        safeStorage.setLocalItem('fc_first_touch', JSON.stringify(firstTouch));
      }

      // 2. Overwrite Last Touch with latest incoming parameters
      lastTouch = newTouchState;
      safeStorage.setLocalItem('fc_last_touch', JSON.stringify(lastTouch));
    }

    return { firstTouch, lastTouch };
  },

  /**
   * Gets preserved First Touch
   */
  getFirstTouch(): TouchState | null {
    const raw = safeStorage.getLocalItem('fc_first_touch');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as TouchState;
    } catch (_) {
      return null;
    }
  },

  /**
   * Gets preserved Last Touch
   */
  getLastTouch(): TouchState | null {
    const raw = safeStorage.getLocalItem('fc_last_touch');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as TouchState;
    } catch (_) {
      return null;
    }
  },

  /**
   * Returns a merged parameter object containing best-available UTM values fallback-ordered
   */
  getBestAvailableUtms(): UtmParams {
    const current = this.getQueryParams();
    if (this.hasUtmParams(current)) {
      return current;
    }
    const last = this.getLastTouch();
    if (last) {
      return last.utm_params;
    }
    const first = this.getFirstTouch();
    if (first) {
      return first.utm_params;
    }
    return {};
  }
};
