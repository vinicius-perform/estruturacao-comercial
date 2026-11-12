'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import { captureAttribution, AttributionData } from '@/lib/attribution';
import { trackLeadConversion } from '@/lib/analytics';
import { PrivacyModal } from './PrivacyModal';
import { GlowButton } from './GlowButton';

interface LeadFormProps {
  id?: string;
  className?: string;
  sourceContext?: string;
  ctaText?: string;
}

const SEGMENTO_OPTIONS = [
  'Clínicas e Consultórios',
  'Serviços Especializados',
  'B2B e Vendas Corporativas',
  'Tecnologia e Software / SaaS',
  'Varejo e Comércio',
  'Indústria e Distribuição',
  'Educação e Treinamentos',
  'Outro segmento',
];

const FATURAMENTO_OPTIONS = [
  'Até R$ 30 mil / mês',
  'R$ 30 mil a R$ 80 mil / mês',
  'R$ 80 mil a R$ 200 mil / mês',
  'R$ 200 mil a R$ 500 mil / mês',
  'Acima de R$ 500 mil / mês',
];

const GARGALO_OPTIONS = [
  'Recebo muitos leads, mas poucos viram vendas',
  'Falta de follow-up e leads esfriando no WhatsApp',
  'Vendedores sem processo e sem padrão de atendimento',
  'Não temos CRM organizado nem previsibilidade de funil',
  'Quero estruturar o setor comercial do zero',
  'Outro gargalo',
];

export function LeadForm({
  id = 'formulario-captura',
  className = '',
  sourceContext,
  ctaText = 'ESTRUTURAR MEU COMERCIAL',
}: LeadFormProps) {
  // Controle de etapas (1 = Dados Pessoais / Contato, 2 = Dados da Empresa)
  const [step, setStep] = useState<1 | 2>(1);

  // Etapa 1: Nome, WhatsApp, Email
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');

  // Etapa 2: Nome/Instagram Empresa, Segmento, Faturamento, Maior Gargalo
  const [empresa, setEmpresa] = useState('');
  const [segmento, setSegmento] = useState('');
  const [faturamento, setFaturamento] = useState('');
  const [gargalo, setGargalo] = useState('');

  const [attribution, setAttribution] = useState<AttributionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Captura atribuição na montagem no cliente
  useEffect(() => {
    const attr = captureAttribution();
    setAttribution(attr);
  }, []);

  // Máscara de telefone brasileiro (DDD + 8 ou 9 dígitos)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 11);
    let formatted = raw;

    if (raw.length > 2) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    }
    if (raw.length > 7) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
    } else if (raw.length > 6) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`;
    }

    setWhatsapp(formatted);
  };

  // Avança para a Etapa 2 após validar a Etapa 1
  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!nome.trim() || nome.trim().length < 2) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }

    const digitsOnly = whatsapp.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 11) {
      setErrorMessage('Por favor, informe um WhatsApp válido com DDD (ex: 11 99999-9999).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage('Por favor, informe um e-mail válido para contato.');
      return;
    }

    setStep(2);
  };

  // Retorna para a Etapa 1
  const handlePrevStep = () => {
    setErrorMessage(null);
    setStep(1);
  };

  // Submissão final na Etapa 2
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validações da Etapa 2
    if (!empresa.trim() || empresa.trim().length < 2) {
      setErrorMessage('Por favor, informe o nome ou Instagram da sua empresa.');
      return;
    }

    if (!segmento) {
      setErrorMessage('Por favor, selecione o segmento da sua empresa.');
      return;
    }

    if (!faturamento) {
      setErrorMessage('Por favor, selecione a faixa de faturamento médio mensal.');
      return;
    }

    if (!gargalo) {
      setErrorMessage('Por favor, selecione o maior gargalo comercial da sua operação.');
      return;
    }

    setIsLoading(true);

    try {
      const digitsOnly = whatsapp.replace(/\D/g, '');
      const payload = {
        nome: nome.trim(),
        whatsapp: digitsOnly,
        email: email.trim().toLowerCase(),
        empresa: empresa.trim(),
        segmento: segmento.trim(),
        faturamento: faturamento.trim(),
        desafio_comercial: gargalo.trim(),
        origem: 'lp_estruturacao_comercial_fa',
        contexto_origem: sourceContext || 'hero_form_multistep',
        utm_source: attribution?.utm_source || '',
        utm_medium: attribution?.utm_medium || '',
        utm_campaign: attribution?.utm_campaign || '',
        utm_content: attribution?.utm_content || '',
        utm_term: attribution?.utm_term || '',
        fbclid: attribution?.fbclid || '',
        gclid: attribution?.gclid || '',
        landing_page: attribution?.landing_page || (typeof window !== 'undefined' ? window.location.pathname : ''),
        referrer: attribution?.referrer || '',
        data_hora_entrada: attribution?.data_hora_entrada || new Date().toISOString(),
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Não foi possível enviar os dados no momento.');
      }

      // Sucesso confirmado
      setIsSuccess(true);
      trackLeadConversion(data.leadId, gargalo);
    } catch (err: any) {
      setErrorMessage(err.message || 'Ocorreu um erro ao enviar seus dados. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        id={id}
        className={`relative w-full rounded-2xl bg-fa-card border border-fa-border shadow-glow-card p-6 sm:p-7 card-glow-border transition-all duration-300 ${className}`}
      >
        {/* Glow sutil no topo do card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#FF6A00]/40 to-transparent" />

        {isSuccess ? (
          <div className="py-8 text-center space-y-4 animate-fade-in">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/30 flex items-center justify-center text-[#FF6A00]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Solicitação recebida com sucesso!
            </h3>
            <p className="text-sm text-fa-text-muted max-w-sm mx-auto leading-relaxed">
              Recebemos seus dados e nossa equipe de especialistas comerciais entrará em contato para analisar a estrutura do seu negócio.
            </p>
            <div className="pt-4 border-t border-fa-border">
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setStep(1);
                  setNome('');
                  setWhatsapp('');
                  setEmail('');
                  setEmpresa('');
                  setSegmento('');
                  setFaturamento('');
                  setGargalo('');
                }}
                className="text-xs text-[#FF6A00] hover:text-white underline transition-colors"
              >
                Enviar nova resposta
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Indicador de Etapas */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold transition-all ${
                      step === 1
                        ? 'bg-[#FF6A00] text-black font-extrabold shadow-sm shadow-[#FF6A00]/40'
                        : 'bg-[#FF6A00]/20 text-[#FF6A00]'
                    }`}
                  >
                    1
                  </span>
                  <span className={`text-xs font-semibold ${step === 1 ? 'text-white' : 'text-fa-text-muted'}`}>
                    Contato
                  </span>
                  <span className="text-fa-text-subtle text-xs">/</span>
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold transition-all ${
                      step === 2
                        ? 'bg-[#FF6A00] text-black font-extrabold shadow-sm shadow-[#FF6A00]/40'
                        : 'bg-white/10 text-fa-text-subtle'
                    }`}
                  >
                    2
                  </span>
                  <span className={`text-xs font-semibold ${step === 2 ? 'text-white' : 'text-fa-text-muted'}`}>
                    Empresa
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#FF6A00] bg-[#1A0E05] px-2.5 py-0.5 rounded-full border border-[#FF6A00]/30 tracking-wider uppercase">
                  Etapa {step} de 2
                </span>
              </div>

              {/* Barra de Progresso Suave */}
              <div className="w-full bg-[#1A1A1E] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#FF6A00] to-[#FFA048] h-full transition-all duration-300 ease-out"
                  style={{ width: step === 1 ? '50%' : '100%' }}
                />
              </div>
            </div>

            {/* Cabeçalho da Etapa Atual */}
            <div className="mb-2">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                {step === 1 ? 'Vamos estruturar seu comercial?' : 'Sobre a sua empresa'}
              </h3>
              <p className="text-xs text-fa-text-muted mt-0.5 leading-snug">
                {step === 1
                  ? 'Preencha seus dados de contato para darmos início.'
                  : 'Conte sobre a operação para personalizarmos a estruturação.'}
              </p>
            </div>

            {/* Mensagem de Erro amigável */}
            {errorMessage && (
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-red-950/40 border border-red-500/40 text-red-200 text-xs animate-fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* CONTEÚDO DA ETAPA 1 */}
            {step === 1 && (
              <div className="space-y-3.5 animate-fade-in">
                {/* Campo 1: Nome completo */}
                <div className="space-y-1">
                  <label htmlFor="lead-nome" className="block text-xs font-medium text-fa-text">
                    Nome completo <span className="text-[#FF6A00]">*</span>
                  </label>
                  <input
                    id="lead-nome"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Seu nome e sobrenome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-fa-bg border border-fa-border text-white text-sm placeholder:text-fa-text-subtle focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-all"
                  />
                </div>

                {/* Campo 2: WhatsApp com DDD */}
                <div className="space-y-1">
                  <label htmlFor="lead-whatsapp" className="block text-xs font-medium text-fa-text">
                    WhatsApp com DDD <span className="text-[#FF6A00]">*</span>
                  </label>
                  <input
                    id="lead-whatsapp"
                    type="tel"
                    inputMode="numeric"
                    required
                    autoComplete="tel"
                    placeholder="(DDD) 99999-9999"
                    value={whatsapp}
                    onChange={handlePhoneChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-fa-bg border border-fa-border text-white text-sm placeholder:text-fa-text-subtle focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-all"
                  />
                </div>

                {/* Campo 3: Email */}
                <div className="space-y-1">
                  <label htmlFor="lead-email" className="block text-xs font-medium text-fa-text">
                    E-mail profissional <span className="text-[#FF6A00]">*</span>
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="seu@empresa.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-fa-bg border border-fa-border text-white text-sm placeholder:text-fa-text-subtle focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-all"
                  />
                </div>

                {/* Botão de Avanço para a Etapa 2 */}
                <div className="pt-2">
                  <GlowButton
                    type="button"
                    onClick={handleNextStep}
                    size="full"
                    text="ESTRUTURAR MEU COMERCIAL"
                  />
                </div>
              </div>
            )}

            {/* CONTEÚDO DA ETAPA 2 */}
            {step === 2 && (
              <div className="space-y-3 animate-fade-in">
                {/* Campo 1: Nome ou Instagram da Empresa */}
                <div className="space-y-1">
                  <label htmlFor="lead-empresa" className="block text-xs font-medium text-fa-text">
                    Nome ou Instagram da Empresa <span className="text-[#FF6A00]">*</span>
                  </label>
                  <input
                    id="lead-empresa"
                    type="text"
                    required
                    placeholder="Ex: @suaempresa ou Nome da Empresa"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-fa-bg border border-fa-border text-white text-sm placeholder:text-fa-text-subtle focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-all"
                  />
                </div>

                {/* Campo 2: Segmento */}
                <div className="space-y-1">
                  <label htmlFor="lead-segmento" className="block text-xs font-medium text-fa-text">
                    Segmento de atuação <span className="text-[#FF6A00]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="lead-segmento"
                      required
                      value={segmento}
                      onChange={(e) => setSegmento(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-fa-bg border border-fa-border text-white text-sm focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-fa-text-subtle bg-fa-card">
                        Selecione o segmento...
                      </option>
                      {SEGMENTO_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-fa-card text-white py-1">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-fa-text-muted">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Campo 3: Faturamento Médio Mensal */}
                <div className="space-y-1">
                  <label htmlFor="lead-faturamento" className="block text-xs font-medium text-fa-text">
                    Faturamento Médio Mensal <span className="text-[#FF6A00]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="lead-faturamento"
                      required
                      value={faturamento}
                      onChange={(e) => setFaturamento(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-fa-bg border border-fa-border text-white text-sm focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-fa-text-subtle bg-fa-card">
                        Selecione o faturamento médio...
                      </option>
                      {FATURAMENTO_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-fa-card text-white py-1">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-fa-text-muted">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Campo 4: Maior Gargalo */}
                <div className="space-y-1">
                  <label htmlFor="lead-gargalo" className="block text-xs font-medium text-fa-text">
                    Maior Gargalo Comercial <span className="text-[#FF6A00]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="lead-gargalo"
                      required
                      value={gargalo}
                      onChange={(e) => setGargalo(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-fa-bg border border-fa-border text-white text-sm focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-fa-text-subtle bg-fa-card">
                        Selecione o principal gargalo...
                      </option>
                      {GARGALO_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-fa-card text-white py-1">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-fa-text-muted">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Botão de Envio Principal com Glowbox CTA */}
                <div className="pt-2">
                  <GlowButton
                    type="submit"
                    disabled={isLoading}
                    isLoading={isLoading}
                    size="full"
                    text={ctaText}
                  />
                </div>

                {/* Botão para voltar à Etapa 1 */}
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={isLoading}
                    className="inline-flex items-center gap-1.5 text-xs text-fa-text-muted hover:text-white transition-colors cursor-pointer py-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Voltar para a Etapa 1</span>
                  </button>
                </div>
              </div>
            )}

            {/* Microcopy e LGPD */}
            <div className="pt-1 text-center">
              <p className="text-[11px] text-fa-text-muted leading-relaxed">
                Seus dados serão utilizados para contato sobre esta solução.
              </p>
              <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[11px] text-fa-text-subtle">
                <Shield className="w-3 h-3 text-[#FF6A00]/80" />
                <span>Ambiente seguro sob a LGPD.</span>
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-fa-text-muted hover:text-[#FF6A00] underline transition-colors"
                >
                  Política de Privacidade
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      <PrivacyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
    </>
  );
}
