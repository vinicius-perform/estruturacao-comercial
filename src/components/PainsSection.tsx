'use client';

import React from 'react';
import { MessageSquareOff, Users2, EyeOff, AlertTriangle } from 'lucide-react';
import { GlowButton } from './GlowButton';

export function PainsSection() {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('formulario-captura');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const pains = [
    {
      id: '1',
      icon: MessageSquareOff,
      title: 'Leads chegam e esfriam no WhatsApp.',
      description: 'Sem acompanhamento, oportunidades deixam de avançar.',
    },
    {
      id: '2',
      icon: Users2,
      title: 'Cada vendedor atende de um jeito.',
      description: 'Sem padrão, a experiência e a conversão dependem de quem responde.',
    },
    {
      id: '3',
      icon: EyeOff,
      title: 'O funil não mostra o que está acontecendo.',
      description: 'Fica difícil identificar onde as vendas estão travando.',
    },
    {
      id: '4',
      icon: AlertTriangle,
      title: 'Você precisa cobrar tudo para o comercial funcionar.',
      description: 'Sem uma rotina de gestão, a operação depende de cobranças constantes.',
    },
  ];

  return (
    <section id="dores" className="relative py-20 sm:py-28 bg-[#101014] border-y border-[#1F1F28] overflow-hidden text-white">
      {/* Sutil halo ambiente quente no fundo */}
      <div className="pointer-events-none absolute top-1/2 left-0 w-96 h-96 bg-[#FF6A00]/6 blur-[120px] rounded-full -z-10" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* COLUNA ESQUERDA: Eyebrow, Headline e Linha Laranja */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#FF6A00] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
              O PROBLEMA NÃO É SÓ ATRAIR LEADS
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-[1.2]">
              Seu negócio recebe oportunidades.{' '}
              <span className="text-[#FF6A00]">Mas quantas viram vendas?</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Sem processo, até uma boa demanda pode se transformar em oportunidades perdidas.
            </p>

            {/* Linha de acento laranja sólida */}
            <div className="w-12 h-1 bg-[#FF6A00] rounded-full" />
          </div>

          {/* COLUNA DIREITA: Lista de Dores em Cards Cinza Escuro com Badges Laranjas */}
          <div className="lg:col-span-7 space-y-4">
            {pains.map((pain) => {
              return (
                <div
                  key={pain.id}
                  className="group flex items-start gap-4 p-5 sm:p-6 rounded-xl bg-[#181820] border border-[#262634] hover:border-[#FF6A00]/60 hover:bg-[#1E1E28] transition-all duration-300 shadow-md"
                >
                  {/* Badge Quadrado Laranja com Número Preto */}
                  <div className="w-8 h-8 rounded-md bg-[#FF6A00] text-black font-extrabold text-sm flex items-center justify-center shrink-0 shadow-sm mt-0.5 group-hover:scale-105 transition-transform">
                    {pain.id}
                  </div>

                  <div className="space-y-1 flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FF8A3D] transition-colors">
                      {pain.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {pain.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fechamento da Seção + CTA Secundário */}
        <div className="mt-16 pt-10 border-t border-[#1F1F28] max-w-2xl mx-auto text-center space-y-6">
          <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
            Mais leads nem sempre resolvem uma operação que ainda{' '}
            <span className="text-[#FF6A00] font-bold underline underline-offset-4 decoration-[#FF6A00]/60">
              perde oportunidades
            </span>
            .
          </p>
          <div>
            <GlowButton
              href="#formulario-captura"
              onClick={scrollToForm}
              text="ORGANIZAR FLUXO COMERCIAL"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
