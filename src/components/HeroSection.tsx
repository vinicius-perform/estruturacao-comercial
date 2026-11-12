'use client';

import React from 'react';
import { LeadForm } from './LeadForm';

export function HeroSection() {
  return (
    <section className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center isolate bg-[#080808]">
      {/* Iluminação Ambiente Escura Premium (Laranja / Âmbar Sutil) */}
      <div className="pointer-events-none absolute -top-36 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#FF6A00]/10 blur-[130px] rounded-full -z-10" />
      <div className="pointer-events-none absolute top-1/2 -right-24 w-[400px] h-[400px] bg-[#FF6A00]/5 blur-[140px] rounded-full -z-10" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#FF6A00]/4 blur-[120px] rounded-full -z-10" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* COLUNA ESQUERDA: Promessa, Contexto e Autoridade */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6">
            {/* Eyebrow no estilo Arena de Crescimento */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full border border-[#FF6A00]/40 bg-[#1A0E05]/95 backdrop-blur-md text-[10px] sm:text-xs font-bold tracking-wider text-[#FF6A00] uppercase shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
              ESTRUTURAÇÃO COMERCIAL — FAZENDO ACONTECER
            </div>

            {/* Headline Principal com Tipografia Plus Jakarta Sans */}
            <h1 className="font-heading text-xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.25] sm:leading-[1.15] tracking-tight drop-shadow-md break-words">
              Vamos{' '}
              <span className="text-[#FF6A00]">
                triplicar a performance
              </span>{' '}
              do seu time comercial em apenas{' '}
              <span className="relative inline-block whitespace-nowrap">
                4 semanas
                <span className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-[3px] sm:h-[4px] bg-[#FF6A00] rounded-full" />
              </span>
              .
            </h1>

            {/* Subheadline em Destaque */}
            <p className="text-sm sm:text-base lg:text-lg text-white font-bold leading-relaxed drop-shadow-sm max-w-xl">
              Atenda 3X mais leads no mesmo período, sem precisar contratar mais pessoas.
            </p>

            {/* Texto de apoio com eliminação de gargalos */}
            <p className="text-xs sm:text-sm lg:text-base text-fa-text-muted leading-relaxed border-l-2 border-[#FF6A00] pl-4 bg-gradient-to-r from-[#FF6A00]/10 via-[#080808]/60 to-transparent py-2 rounded-r-lg max-w-xl">
              Iremos estruturar sua operação para eliminar tarefas desnecessárias, reduzir gargalos e multiplicar a capacidade produtiva do seu time.
            </p>
          </div>

          {/* COLUNA DIREITA: Formulário em Destaque na Primeira Dobra */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <LeadForm sourceContext="hero_desktop_visible" />
          </div>
        </div>
      </div>
    </section>
  );
}
