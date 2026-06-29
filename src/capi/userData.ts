import { CapiUserData } from './types';
import { sessionManager } from '../tracking/sessionManager';
import { hashingTool } from './hashing';

export const capiUserDataBuilder = {
  /**
   * Automatically compiles native client-side tracking parameters for high EMQ
   */
  getBasicUserData(): CapiUserData {
    if (typeof window === 'undefined') return {};

    const visitorId = sessionManager.getOrCreateVisitorId();
    const fbp = sessionManager.getFbp();
    const fbc = sessionManager.getFbc();

    return {
      external_id: [visitorId],
      fbp: fbp || undefined,
      fbc: fbc || undefined,
      client_user_agent: navigator.userAgent
    };
  },

  /**
   * Hashes supplementary user characteristics in compliance with Meta privacy standards
   */
  async enrichUserData(
    baseData: CapiUserData,
    rawDetails: {
      email?: string;
      phone?: string;
      firstName?: string;
      lastName?: string;
    }
  ): Promise<CapiUserData> {
    const updated = { ...baseData };

    if (rawDetails.email) {
      const hashedEmail = await hashingTool.sha256(rawDetails.email, 'email');
      if (hashedEmail) updated.em = [hashedEmail];
    }

    if (rawDetails.phone) {
      const hashedPhone = await hashingTool.sha256(rawDetails.phone, 'phone');
      if (hashedPhone) updated.ph = [hashedPhone];
    }

    if (rawDetails.firstName) {
      const hashedFN = await hashingTool.sha256(rawDetails.firstName, 'general');
      if (hashedFN) updated.fn = [hashedFN];
    }

    if (rawDetails.lastName) {
      const hashedLN = await hashingTool.sha256(rawDetails.lastName, 'general');
      if (hashedLN) updated.ln = [hashedLN];
    }

    return updated;
  }
};
