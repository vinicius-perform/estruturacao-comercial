'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { GlowButton } from './GlowButton';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Primeira aberta por padrão

  const scrollToHero = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('formulario-captura');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const faqs = [
    {
      question: 'Preciso ter um CRM para contratar?',
      answer:
        'Não. A implementação e organização do CRM fazem parte da estruturação comercial oferecida pela FA.',
    },
    {
      question: 'Minha empresa já tem equipe comercial. Ainda faz sentido?',
      answer:
        'Sim. A estruturação é voltada também a negócios que já possuem atendimento e vendas, mas precisam organizar processos, acompanhamento e gestão.',
    },
    {
      question: 'A FA vai executar as vendas pela minha equipe?',
      answer:
        'Esta oferta é focada na estruturação, no acompanhamento e no desenvolvimento da operação comercial. Ela não inclui, por si só, a substituição dos vendedores da sua empresa.',
    },
    {
      question: 'Como funciona a contratação?',
      answer:
        'Após o alinhamento comercial, são formalizados os dados do contrato e o pagamento. Em seguida, ocorre o onboarding e o início da implementação da estrutura.',
    },
  ];

  return (
    <section id="faq" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho FAQ */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-fa-border bg-fa-card text-xs font-semibold tracking-wider text-fa-neon uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            Tire suas dúvidas
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Ficou alguma dúvida?
          </h2>
          <p className="text-sm sm:text-base text-fa-text-muted">
            Perguntas frequentes sobre o modelo de estruturação e acompanhamento comercial da FA.
          </p>
        </div>

        {/* Accordion Minimalista */}
        <div className="max-w-3xl mx-auto space-y-3 mb-20">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-fa-border bg-fa-card/90 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-fa-neon transition-colors hover:bg-fa-card-hover"
                >
                  <span className="text-sm sm:text-base font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-fa-neon shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-fa-text-muted leading-relaxed border-t border-fa-border/50 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BLOCO CTA FINAL: Destaque de Conversão */}
        <div className="max-w-3xl mx-auto relative rounded-3xl bg-gradient-to-b from-fa-card to-fa-bg-alt border border-fa-border shadow-glow-card p-8 sm:p-12 text-center card-glow-border">
          {/* Brilho neon decorativo suave */}
          <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-24 bg-fa-neon/20 blur-2xl rounded-full" />

          <div className="relative z-10 space-y-4">
            <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Seu comercial não precisa continuar dependendo do improviso.
            </h3>
            <p className="text-sm sm:text-base text-fa-text-muted max-w-xl mx-auto leading-relaxed">
              Entenda como a FA pode organizar sua operação e ajudar sua equipe a aproveitar melhor cada oportunidade.
            </p>

            <div className="pt-4">
              <GlowButton
                href="#formulario-captura"
                onClick={scrollToHero}
                text="QUERO ESTRUTURAR MEU COMERCIAL"
              />
            </div>

            <p className="text-[11px] text-fa-text-subtle pt-2">
              Converse com a equipe da FA e entenda como essa estrutura pode funcionar no seu negócio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
