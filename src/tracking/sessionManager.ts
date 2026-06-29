import { safeStorage } from './storage';

/**
 * Generates a standard RFC4122 version 4 compliant UUID
 */
export function generateUUID(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch (_) {}

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const sessionManager = {
  /**
   * Identifies or constructs a permanent Visitor ID (cached in LocalStorage)
   */
  getOrCreateVisitorId(): string {
    let visitorId = safeStorage.getLocalItem('fc_visitor_id');
    if (!visitorId) {
      visitorId = `fc_vis_${generateUUID()}`;
      safeStorage.setLocalItem('fc_visitor_id', visitorId);
    }
    return visitorId;
  },

  /**
   * Identifies or constructs a temporary Session ID (lives in SessionStorage)
   */
  getOrCreateSessionId(): string {
    let sessionId = safeStorage.getSessionItem('fc_session_id');
    if (!sessionId) {
      sessionId = `fc_sess_${generateUUID()}`;
      safeStorage.setSessionItem('fc_session_id', sessionId);
    }
    return sessionId;
  },

  /**
   * Meta pixel parameters parser:
   * First reads directly from _fbp cookie set by Meta.
   * If not available, generates one with similar schema and caches it to persist across subdomains.
   */
  getFbp(): string {
    const existing = safeStorage.getCookie('_fbp');
    if (existing) return existing;

    // Build standard fbp format: fb.1.creationTime.randomValue
    const creationTime = Date.now();
    const randomValue = Math.floor(Math.random() * 1000000000);
    const newFbp = `fb.1.${creationTime}.${randomValue}`;
    safeStorage.setCookie('_fbp', newFbp);
    return newFbp;
  },

  /**
   * Meta click parameter parser:
   * First reads the _fbc cookie.
   * If missing but fbclid is present in URL, builds the proper format.
   */
  getFbc(fbclid?: string): string | undefined {
    const existing = safeStorage.getCookie('_fbc');
    if (existing) return existing;

    if (fbclid) {
      const creationTime = Date.now();
      const newFbc = `fb.1.${creationTime}.${fbclid}`;
      safeStorage.setCookie('_fbc', newFbc);
      return newFbc;
    }
    return undefined;
  },

  /**
   * Constructs/retrieves stable offline customer match partner key 'external_id'
   */
  getExternalId(): string {
    return this.getOrCreateVisitorId();
  }
};
