export interface LeadPayload {
  nome: string;
  whatsapp: string;
  email?: string;
  empresa: string;
  segmento?: string;
  faturamento?: string;
  desafio_comercial: string;
  origem: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  landing_page?: string;
  referrer?: string;
  data_hora_entrada?: string;
}

export interface CrmResponse {
  success: boolean;
  message: string;
  leadId?: string;
  details?: unknown;
}

/**
 * Adaptador de integração oficial para o CRM da FA.
 * Suporta Webhook Direto (n8n, Make, CRM FA) ou API REST proprietária.
 */
export async function sendLeadToCrm(payload: LeadPayload): Promise<CrmResponse> {
  const crmUrl = process.env.CRM_WEBHOOK_URL || process.env.FA_CRM_API_URL;
  const crmApiKey = process.env.CRM_API_KEY || process.env.FA_CRM_TOKEN;

  // Se nenhum endpoint estiver configurado no servidor:
  if (!crmUrl) {
    // Modo seguro de desenvolvimento/staging documentado:
    // Se estiver explicitamente em desenvolvimento e permitir log local:
    if (process.env.NODE_ENV !== 'production' || process.env.ALLOW_LOCAL_LEAD_LOG === 'true') {
      console.warn(
        '[CRM ADAPTER] Aviso: Nenhuma variável CRM_WEBHOOK_URL configurada. Lead recebido e registrado em modo seguro de desenvolvimento:',
        {
          nome: payload.nome,
          empresa: payload.empresa,
          desafio: payload.desafio_comercial,
          timestamp: new Date().toISOString(),
        }
      );
      return {
        success: true,
        message: 'Lead registrado localmente com sucesso (modo de desenvolvimento ativo). Configure CRM_WEBHOOK_URL em produção.',
        leadId: `dev_${Date.now()}`,
      };
    }

    // Em produção estrita sem endpoint, acusar configuração pendente
    return {
      success: false,
      message: 'Serviço de integração temporariamente indisponível. O endpoint do CRM não foi configurado nas variáveis de ambiente.',
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos de timeout

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (crmApiKey) {
      headers['Authorization'] = `Bearer ${crmApiKey}`;
      headers['x-api-key'] = crmApiKey;
    }

    const response = await fetch(crmUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...payload,
        criado_em: new Date().toISOString(),
        ambiente: process.env.NODE_ENV || 'production',
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('[CRM ADAPTER ERROR] Resposta de erro do CRM:', response.status, errorText);
      return {
        success: false,
        message: `Falha na comunicação com o CRM da FA (código ${response.status}).`,
      };
    }

    let responseData: any = {};
    try {
      responseData = await response.json();
    } catch {
      // Caso a resposta seja 200 mas sem JSON (ex: webhook n8n com texto 'OK')
      responseData = { status: 'ok' };
    }

    return {
      success: true,
      message: 'Lead enviado com sucesso ao time comercial da FA.',
      leadId: responseData.id || responseData.lead_id || `lead_${Date.now()}`,
      details: responseData,
    };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('[CRM ADAPTER ERROR] Timeout ao conectar com o endpoint do CRM.');
      return {
        success: false,
        message: 'Tempo de resposta excedido ao conectar com o servidor comercial. Tente novamente em instantes.',
      };
    }

    console.error('[CRM ADAPTER EXCEPTION]', error);
    return {
      success: false,
      message: 'Não foi possível conectar ao sistema comercial no momento.',
    };
  }
}
