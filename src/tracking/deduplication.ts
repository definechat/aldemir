export interface CachedEvent {
  eventName: string;
  signature: string;
  timestamp: number;
}

export const deduplicationSystem = {
  // Simple volatile in-memory cache to store recent event signatures
  cache: new Map<string, number>(),

  /**
   * Generates a unique signature for the event based on its name and key properties
   */
  generateSignature(eventName: string, params: Record<string, any> = {}): string {
    // We safely extract high-cardinality values or unique IDs to hash if present, 
    // but default to standard product identifiers or steps to identify identical events
    const contentName = params.content_name || params.plan_name || '';
    const step = params.step || '';
    const value = params.value || '';
    return `${eventName}_${contentName}_${step}_${value}`;
  },

  /**
   * Checks if an event is a duplicate within its cooldown window (default: 1500ms)
   * If it is a duplicate, returns true. Otherwise, logs it and returns false.
   * Useful for avoiding double-renders or accidental rapid double-taps on subscription CTAs.
   */
  isDuplicate(eventName: string, params: Record<string, any> = {}, cooldownMs: number = 1500): boolean {
    if (typeof window === 'undefined') return true; // Safety override for SSR environments

    const sig = this.generateSignature(eventName, params);
    const now = Date.now();
    const lastTime = this.cache.get(sig);

    if (lastTime && now - lastTime < cooldownMs) {
      return true;
    }

    // Set or refresh timestamp of the last dispatched instance
    this.cache.set(sig, now);

    // Keep memory clean: prune old cached keys periodically
    if (this.cache.size > 100) {
      for (const [key, cachedTime] of this.cache.entries()) {
        if (now - cachedTime > 10000) {
          this.cache.delete(key);
        }
      }
    }

    return false;
  }
};
