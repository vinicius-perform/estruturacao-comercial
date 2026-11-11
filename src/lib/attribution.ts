export interface AttributionData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  fbclid: string;
  gclid: string;
  landing_page: string;
  referrer: string;
  data_hora_entrada: string;
}

const STORAGE_KEY = 'fa_lp_attribution_v1';

export function captureAttribution(): AttributionData {
  if (typeof window === 'undefined') {
    return {
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_content: '',
      utm_term: '',
      fbclid: '',
      gclid: '',
      landing_page: '',
      referrer: '',
      data_hora_entrada: new Date().toISOString(),
    };
  }

  // Tenta ler dados salvos na sessão primeiro para preservar primeira entrada
  const saved = window.sessionStorage.getItem(STORAGE_KEY);
  let initialData: Partial<AttributionData> = {};
  if (saved) {
    try {
      initialData = JSON.parse(saved);
    } catch {
      // Ignora erro de parse
    }
  }

  const urlParams = new URLSearchParams(window.location.search);

  const currentData: AttributionData = {
    utm_source: urlParams.get('utm_source') || initialData.utm_source || '',
    utm_medium: urlParams.get('utm_medium') || initialData.utm_medium || '',
    utm_campaign: urlParams.get('utm_campaign') || initialData.utm_campaign || '',
    utm_content: urlParams.get('utm_content') || initialData.utm_content || '',
    utm_term: urlParams.get('utm_term') || initialData.utm_term || '',
    fbclid: urlParams.get('fbclid') || initialData.fbclid || '',
    gclid: urlParams.get('gclid') || initialData.gclid || '',
    landing_page: window.location.pathname + window.location.search,
    referrer: document.referrer || initialData.referrer || '',
    data_hora_entrada: initialData.data_hora_entrada || new Date().toISOString(),
  };

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
  } catch {
    // Session storage pode falhar em modo anônimo estrito
  }

  return currentData;
}
