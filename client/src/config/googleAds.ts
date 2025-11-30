// Google Ads configuration based on domain
// This allows different projects to use different tracking codes

const getGoogleAdsConfig = () => {
  if (typeof window === 'undefined') {
    return {
      conversionId: 'AW-xxxxxxxxx',
      conversionLabel: 'xxxxxxxxx'
    };
  }

  const hostname = window.location.hostname;

  // Main production project - keep existing codes
  if (hostname.includes('hathaven-landing') || hostname.includes('legal-refund')) {
    return {
      conversionId: 'AW-17686188611',
      conversionLabel: 'L3B5CLWh2MgbEMOkt_FB'
    };
  }

  // New projects - use placeholders
  if (hostname.includes('ecb-support.guru') || hostname.includes('ecb-support-guru')) {
    return {
      conversionId: 'AW-xxxxxxxxx',
      conversionLabel: 'xxxxxxxxx'
    };
  }

  if (hostname.includes('eu-cbd.guru') || hostname.includes('eu-cbd-guru')) {
    return {
      conversionId: 'AW-xxxxxxxxx',
      conversionLabel: 'xxxxxxxxx'
    };
  }

  // Default fallback - use placeholders
  return {
    conversionId: 'AW-xxxxxxxxx',
    conversionLabel: 'xxxxxxxxx'
  };
};

export const googleAdsConfig = getGoogleAdsConfig();

