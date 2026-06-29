export interface CapiUserData {
  em?: string[];             // Hashed Email (SHA-256)
  ph?: string[];             // Hashed Phone (SHA-256)
  external_id?: string[];    // Hashed or Unique External ID
  client_ip_address?: string; // Client IP (from request or forward headers)
  client_user_agent?: string; // Client User Agent (browser)
  fbp?: string;              // Browser ID cookie
  fbc?: string;              // Click ID cookie
  ge?: string[];             // Hashed Gender
  db?: string[];             // Hashed Date of Birth
  fn?: string[];             // Hashed First Name
  ln?: string[];             // Hashed Last Name
  ct?: string[];             // Hashed City
  st?: string[];             // Hashed State
  zp?: string[];             // Hashed Zip Code
  country?: string[];        // Hashed Country
}

export interface CapiCustomData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_type?: string;
  content_ids?: string[];
  contents?: Array<{
    id: string;
    quantity: number;
    item_price?: number;
  }>;
  [key: string]: any;
}

export interface CapiEvent {
  event_name: string;
  event_time: number; // Unix timestamp in seconds
  event_id: string;   // Unique event identifier for browser/server deduplication
  event_source_url: string;
  action_source: 'email' | 'website' | 'app' | 'phone_call' | 'chat' | 'physical_store' | 'system_generated' | 'other';
  user_data: CapiUserData;
  custom_data?: CapiCustomData;
  opt_out?: boolean;
}

export interface CapiPayload {
  data: CapiEvent[];
  test_event_code?: string; // Helps verify Conversions API setups inside Meta Events Manager
}
