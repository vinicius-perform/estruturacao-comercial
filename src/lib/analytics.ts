/**
 * Disparador de eventos de conversão (GA4 e Meta Pixel)
 * IMPORTANTE: Disparado exclusivamente após resposta positiva e confirmada da API de lead.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function trackLeadConversion(leadId?: string, desafio?: string) {
  if (typeof window === 'undefined') return;

  // 1. Google Analytics 4 (GA4)
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      event_category: 'Conversao',
      event_label: 'Estruturacao Comercial FA',
      value: 1,
      lead_id: leadId || undefined,
      desafio_comercial: desafio || undefined,
    });
  }

  // 2. Meta Pixel (Facebook)
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', {
      content_name: 'Estruturação Comercial Fazendo Acontecer',
      content_category: 'Serviço B2B',
      status: 'success',
      desafio_comercial: desafio || undefined,
    });
  }

  // 3. Fallback dataLayer
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: 'lead_convertido',
      leadId: leadId || undefined,
      timestamp: new Date().toISOString(),
    });
  }
}
