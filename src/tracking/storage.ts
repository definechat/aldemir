/**
 * Safe client-side Storage and Cookie helper.
 * Prevents hydration mismatches, supports fully enclosed try-catch fallback, and prevents SSR errors.
 */

export const safeStorage = {
  isBrowser(): boolean {
    return typeof window !== 'undefined';
  },

  // --- LocalStorage ---
  getLocalItem(key: string): string | null {
    if (!this.isBrowser()) return null;
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn(`[Storage] Failed to get LocalStorage item: ${key}`, e);
      return null;
    }
  },

  setLocalItem(key: string, value: string): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`[Storage] Failed to set LocalStorage item: ${key}`, e);
    }
  },

  removeLocalItem(key: string): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[Storage] Failed to remove LocalStorage item: ${key}`, e);
    }
  },

  // --- SessionStorage ---
  getSessionItem(key: string): string | null {
    if (!this.isBrowser()) return null;
    try {
      return sessionStorage.getItem(key);
    } catch (e) {
      console.warn(`[Storage] Failed to get SessionStorage item: ${key}`, e);
      return null;
    }
  },

  setSessionItem(key: string, value: string): void {
    if (!this.isBrowser()) return;
    try {
      sessionStorage.setItem(key, value);
    } catch (e) {
      console.warn(`[Storage] Failed to set SessionStorage item: ${key}`, e);
    }
  },

  // --- Cookies ---
  getCookie(name: string): string | undefined {
    if (!this.isBrowser()) return undefined;
    try {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) return match[2];
    } catch (e) {
      console.warn(`[Storage] Failed to read cookie: ${name}`, e);
    }
    return undefined;
  },

  setCookie(name: string, value: string, daysActive: number = 365): void {
    if (!this.isBrowser()) return;
    try {
      const date = new Date();
      date.setTime(date.getTime() + (daysActive * 24 * 60 * 60 * 1000));
      const expires = '; expires=' + date.toUTCString();
      // Secure; SameSite=Lax is recommended for tracking identifiers to survive cross-navigation
      document.cookie = `${name}=${value}${expires}; path=/; SameSite=Lax; Secure`;
    } catch (e) {
      console.warn(`[Storage] Failed to write cookie: ${name}`, e);
    }
  }
};
