/**
 * Centralized Meta Pixel Tracking Service
 * Verified, safe for React + Vite + TypeScript, SSR-safe, and ready for CAPI integration.
 */

import { sessionManager } from '../tracking/sessionManager';
import { utmManager } from '../tracking/utmManager';
import { attributionSystem } from '../tracking/attribution';
import { eventManager } from '../tracking/eventManager';
import { capiEventBridge } from '../capi/eventBridge';

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

export const pixelService = {
  /**
   * Safe check to guarantee we are running in the browser and the Pixel SDK is loaded
   */
  isClient(): boolean {
    return typeof window !== 'undefined' && typeof window.fbq === 'function';
  },

  /**
   * Safe getter to build matching tracking parameters for high Event Match Quality (EMQ)
   */
  getEnrichedData(): Record<string, any> {
    if (!this.isClient()) return {};
    try {
      const utms = utmManager.getBestAvailableUtms();
      const trafficSource = attributionSystem.getOrInitTrafficSource(utms);
      const visitorId = sessionManager.getOrCreateVisitorId();
      const sessionId = sessionManager.getOrCreateSessionId();
      const fbp = sessionManager.getFbp();
      const fbc = sessionManager.getFbc(utms.fbclid);

      return {
        utm_source: utms.utm_source || '',
        utm_medium: utms.utm_medium || '',
        utm_campaign: utms.utm_campaign || '',
        utm_content: utms.utm_content || '',
        utm_term: utms.utm_term || '',
        fbclid: utms.fbclid || '',
        gclid: utms.gclid || '',
        visitor_id: visitorId,
        session_id: sessionId,
        traffic_origin: trafficSource.origin,
        traffic_channel: trafficSource.channelName,
        fbp: fbp || '',
        fbc: fbc || '',
        external_id: visitorId,
        event_source_url: window.location.href,
        action_source: 'website'
      };
    } catch (e) {
      console.warn('[PixelService] Error preparing advanced enrichment payload', e);
      return {};
    }
  },

  /**
   * Dispatches standard PageView event enriched with session parameters
   */
  trackPageView(): void {
    if (this.isClient()) {
      try {
        const enriched = this.getEnrichedData();
        const prepared = eventManager.prepareAndQueue('PageView', enriched, { cooldownMs: 1000 });
        if (prepared) {
          window.fbq('track', 'PageView', prepared.params, {
            eventID: prepared.eventId
          });
          
          // Capture and queue for Conversions API in parallel
          capiEventBridge.bridgeEvent('PageView', prepared.eventId, prepared.eventTime, prepared.params).catch(() => {});
        }
      } catch (err) {
        console.warn('Meta Pixel Error [PageView]:', err);
      }
    }
  },

  /**
   * Dispatches standard ViewContent event enriched with session parameters
   */
  trackViewContent(contentName: string, category: string, value?: number): void {
    if (this.isClient()) {
      try {
        const enriched = this.getEnrichedData();
        const baseParams = {
          content_name: contentName,
          content_category: category,
          value: value || 0,
          currency: 'BRL',
          content_type: 'product',
          ...enriched
        };
        const prepared = eventManager.prepareAndQueue('ViewContent', baseParams, { cooldownMs: 3000 });
        if (prepared) {
          window.fbq('track', 'ViewContent', prepared.params, {
            eventID: prepared.eventId
          });

          // Capture and queue for Conversions API in parallel
          capiEventBridge.bridgeEvent('ViewContent', prepared.eventId, prepared.eventTime, prepared.params).catch(() => {});
        }
      } catch (err) {
        console.warn('Meta Pixel Error [ViewContent]:', err);
      }
    }
  },

  /**
   * Dispatches standard InitiateCheckout event enriched with session parameters
   */
  trackInitiateCheckout(contentName: string, value: number, contentIds?: string[]): void {
    if (this.isClient()) {
      try {
        const enriched = this.getEnrichedData();
        const baseParams = {
          content_name: contentName,
          value: value,
          currency: 'BRL',
          content_type: 'product',
          content_ids: contentIds || [],
          ...enriched
        };
        const prepared = eventManager.prepareAndQueue('InitiateCheckout', baseParams, { cooldownMs: 2500 });
        if (prepared) {
          window.fbq('track', 'InitiateCheckout', prepared.params, {
            eventID: prepared.eventId
          });

          // Capture and queue for Conversions API in parallel
          capiEventBridge.bridgeEvent('InitiateCheckout', prepared.eventId, prepared.eventTime, prepared.params).catch(() => {});
        }
      } catch (err) {
        console.warn('Meta Pixel Error [InitiateCheckout]:', err);
      }
    }
  },

  /**
   * Dispatches standard AddToCart event enriched with session parameters
   */
  trackAddToCart(contentName: string, value: number, contentIds?: string[]): void {
    if (this.isClient()) {
      try {
        const enriched = this.getEnrichedData();
        const baseParams = {
          content_name: contentName,
          value: value,
          currency: 'BRL',
          content_type: 'product',
          content_ids: contentIds || [],
          ...enriched
        };
        const prepared = eventManager.prepareAndQueue('AddToCart', baseParams, { cooldownMs: 2000 });
        if (prepared) {
          window.fbq('track', 'AddToCart', prepared.params, {
            eventID: prepared.eventId
          });

          // Capture and queue for Conversions API in parallel
          capiEventBridge.bridgeEvent('AddToCart', prepared.eventId, prepared.eventTime, prepared.params).catch(() => {});
        }
      } catch (err) {
        console.warn('Meta Pixel Error [AddToCart]:', err);
      }
    }
  },

  /**
   * Dispatches standard AddPaymentInfo event enriched with session parameters
   */
  trackAddPaymentInfo(value?: number, currency: string = 'BRL', contentName?: string): void {
    if (this.isClient()) {
      try {
        const enriched = this.getEnrichedData();
        const baseParams = {
          content_name: contentName || 'Assinatura',
          value: value || 0,
          currency: currency,
          ...enriched
        };
        const prepared = eventManager.prepareAndQueue('AddPaymentInfo', baseParams, { cooldownMs: 2000 });
        if (prepared) {
          window.fbq('track', 'AddPaymentInfo', prepared.params, {
            eventID: prepared.eventId
          });

          // Capture and queue for Conversions API in parallel
          capiEventBridge.bridgeEvent('AddPaymentInfo', prepared.eventId, prepared.eventTime, prepared.params).catch(() => {});
        }
      } catch (err) {
        console.warn('Meta Pixel Error [AddPaymentInfo]:', err);
      }
    }
  },

  /**
   * Dispatches standard Purchase event enriched with session parameters
   */
  trackPurchase(value: number, currency: string = 'BRL', contentName?: string): void {
    if (this.isClient()) {
      try {
        const enriched = this.getEnrichedData();
        const baseParams = {
          content_name: contentName || 'Assinatura',
          value: value,
          currency: currency,
          ...enriched
        };
        const prepared = eventManager.prepareAndQueue('Purchase', baseParams, { cooldownMs: 4000 });
        if (prepared) {
          window.fbq('track', 'Purchase', prepared.params, {
            eventID: prepared.eventId
          });

          // Capture and queue for Conversions API in parallel
          capiEventBridge.bridgeEvent('Purchase', prepared.eventId, prepared.eventTime, prepared.params).catch(() => {});
        }
      } catch (err) {
        console.warn('Meta Pixel Error [Purchase]:', err);
      }
    }
  },

  /**
   * Dispatches custom tailored events enriched with session parameters
   */
  trackCustomEvent(eventName: string, params?: Record<string, any>): void {
    if (this.isClient()) {
      try {
        const enriched = this.getEnrichedData();
        const baseParams = {
          ...(params || {}),
          ...enriched
        };
        const prepared = eventManager.prepareAndQueue(eventName, baseParams, { cooldownMs: 1500 });
        if (prepared) {
          window.fbq('trackCustom', eventName, prepared.params, {
            eventID: prepared.eventId
          });

          // Capture and queue for Conversions API in parallel
          capiEventBridge.bridgeEvent(eventName, prepared.eventId, prepared.eventTime, prepared.params).catch(() => {});
        }
      } catch (err) {
        console.warn(`Meta Pixel Error [Custom: ${eventName}]:`, err);
      }
    }
  }
};

