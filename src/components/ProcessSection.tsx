'use client';

import React from 'react';
import { Target, Sliders, TrendingUp, Clock } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      step: 'Passo 01',
      icon: Target,
      title: 'Entendemos sua operação',
      description:
        'Alinhamos os principais desafios, a estrutura atual e as prioridades comerciais do negócio.',
    },
    {
      step: 'Passo 02',
      icon: Sliders,
      title: 'Implementamos a estrutura',
      description:
        'Organizamos CRM, funil, automações e processos para iniciar a execução comercial.',
      badge: 'Início em até 48h após onboarding',
    },
    {
      step: 'Passo 03',
      icon: TrendingUp,
      title: 'Acompanhamos e desenvolvemos',
      description:
        'Auditamos a operação, analisamos indicadores e treinamos a equipe para melhorar continuamente a execução.',
      badge: 'Acompanhamento de 6 meses',
    },
  ];

  return (
    <section id="como-funciona" className="relative py-20 sm:py-28 bg-[#101014] border-y border-[#1F1F28] overflow-hidden text-white">
      {/* Luz ambiente localizada sutil no fundo */}
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#FF6A00]/6 blur-[130px] rounded-full -z-10" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header no Estilo Arena */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF6A00]/40 bg-[#20140D] text-xs font-bold tracking-wider text-[#FF6A00] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
            DA ESTRUTURA À EXECUÇÃO
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight leading-tight">
            Não é só orientação. É estruturação na prática.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Uma implantação organizada e acompanhamento contínuo para que sua equipe tenha processos claros para executar.
          </p>
        </div>

        {/* Timeline dos 3 passos em Cards Cinza Escuro Elevado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Linha conectora no desktop com brilho laranja */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[#FF6A00]/40 to-transparent -z-0" />

          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative z-10 flex flex-col p-7 sm:p-8 rounded-2xl bg-[#181820] border border-[#262634] hover:border-[#FF6A00]/50 hover:bg-[#1E1E28] transition-all duration-300 shadow-md"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#20140D] border border-[#FF6A00]/30 flex items-center justify-center text-[#FF6A00] shadow-sm">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6A00] bg-[#2E1E14] px-2.5 py-1 rounded-full border border-[#FF6A00]/30">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FF8A3D] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5 flex-1">
                  {item.description}
                </p>

                {item.badge && (
                  <div className="pt-3 border-t border-[#262634]">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#FFB380] bg-[#20140D] px-2.5 py-1 rounded-md border border-[#FF6A00]/25">
                      <Clock className="w-3.5 h-3.5 text-[#FF6A00]" />
                      {item.badge}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
