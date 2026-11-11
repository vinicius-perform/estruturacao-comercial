import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToCrm, LeadPayload } from '@/lib/crm';

const VALID_CHALLENGES = [
  'Recebo muitos leads, mas poucos viram vendas',
  'Falta de follow-up e leads esfriando no WhatsApp',
  'Vendedores sem processo e sem padrão de atendimento',
  'Não temos CRM organizado nem previsibilidade de funil',
  'Quero estruturar o setor comercial do zero',
  'Outro gargalo',
  // Opções legadas para retrocompatibilidade
  'Recebo leads, mas converto pouco.',
  'Minha equipe não faz follow-up.',
  'Não tenho CRM ou funil organizado.',
  'Não consigo acompanhar os resultados.',
  'Quero estruturar meu comercial do zero.',
  'Outro desafio.',
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Dados da requisição inválidos.' },
        { status: 400 }
      );
    }

    const {
      nome,
      whatsapp,
      email,
      empresa,
      segmento,
      faturamento,
      desafio_comercial,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      fbclid,
      gclid,
      landing_page,
      referrer,
      data_hora_entrada,
    } = body;

    // 1. Validação Etapa 1: Nome, WhatsApp, Email
    if (!nome || typeof nome !== 'string' || nome.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: 'Por favor, informe seu nome completo.' },
        { status: 400 }
      );
    }

    const cleanPhone = (typeof whatsapp === 'string' ? whatsapp : '').replace(/\D/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      return NextResponse.json(
        { success: false, message: 'Por favor, informe um WhatsApp válido com DDD (10 ou 11 dígitos).' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: 'Por favor, informe um e-mail válido.' },
        { status: 400 }
      );
    }

    // 2. Validação Etapa 2: Empresa/Instagram, Segmento, Faturamento, Gargalo
    if (!empresa || typeof empresa !== 'string' || empresa.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: 'Por favor, informe o nome ou Instagram da sua empresa.' },
        { status: 400 }
      );
    }

    if (!segmento || typeof segmento !== 'string' || !segmento.trim()) {
      return NextResponse.json(
        { success: false, message: 'Por favor, selecione o segmento de atuação.' },
        { status: 400 }
      );
    }

    if (!faturamento || typeof faturamento !== 'string' || !faturamento.trim()) {
      return NextResponse.json(
        { success: false, message: 'Por favor, selecione o faturamento médio mensal.' },
        { status: 400 }
      );
    }

    if (!desafio_comercial || typeof desafio_comercial !== 'string' || !desafio_comercial.trim()) {
      return NextResponse.json(
        { success: false, message: 'Por favor, selecione seu principal gargalo comercial.' },
        { status: 400 }
      );
    }

    const payload: LeadPayload = {
      nome: nome.trim(),
      whatsapp: cleanPhone,
      email: email.trim().toLowerCase(),
      empresa: empresa.trim(),
      segmento: segmento.trim(),
      faturamento: faturamento.trim(),
      desafio_comercial: desafio_comercial.trim(),
      origem: 'lp_estruturacao_comercial_fa',
      utm_source: typeof utm_source === 'string' ? utm_source.slice(0, 150) : '',
      utm_medium: typeof utm_medium === 'string' ? utm_medium.slice(0, 150) : '',
      utm_campaign: typeof utm_campaign === 'string' ? utm_campaign.slice(0, 150) : '',
      utm_content: typeof utm_content === 'string' ? utm_content.slice(0, 150) : '',
      utm_term: typeof utm_term === 'string' ? utm_term.slice(0, 150) : '',
      fbclid: typeof fbclid === 'string' ? fbclid.slice(0, 200) : '',
      gclid: typeof gclid === 'string' ? gclid.slice(0, 200) : '',
      landing_page: typeof landing_page === 'string' ? landing_page.slice(0, 300) : '',
      referrer: typeof referrer === 'string' ? referrer.slice(0, 300) : '',
      data_hora_entrada: typeof data_hora_entrada === 'string' ? data_hora_entrada : new Date().toISOString(),
    };

    const result = await sendLeadToCrm(payload);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Solicitação recebida com sucesso! Nossa equipe entrará em contato.',
        leadId: result.leadId,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('[API LEAD ERROR]', err);
    return NextResponse.json(
      { success: false, message: 'Ocorreu um erro interno ao processar seu contato. Tente novamente.' },
      { status: 500 }
    );
  }
}
