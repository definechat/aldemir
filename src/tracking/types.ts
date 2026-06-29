export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  [key: string]: string | undefined;
}

export interface TouchState {
  utm_params: UtmParams;
  landing_page: string;
  referrer: string;
  timestamp: string;
}

export interface SessionData {
  sessionId: string;
  visitorId: string;
  firstTouch: TouchState | null;
  lastTouch: TouchState | null;
  trafficSource: {
    origin: 'facebook' | 'instagram' | 'google' | 'direct' | 'organic' | 'paid' | 'other';
    channelName: string;
    referrer: string;
  };
  fbp?: string;
  fbc?: string;
  externalId?: string;
}
