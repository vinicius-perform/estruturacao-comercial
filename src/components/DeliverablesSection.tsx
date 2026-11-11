'use client';

import React from 'react';
import {
  Link2,
  Database,
  GitBranch,
  SearchCheck,
  GraduationCap,
  LineChart,
} from 'lucide-react';
import { GlowButton } from './GlowButton';

export function DeliverablesSection() {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('formulario-captura');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const deliverables = [
    {
      number: '01',
      tag: 'CANAL DE ENTRADA',
      icon: Link2,
      title: 'Estruturação do link da bio',
      description:
        'Organizamos os principais caminhos de contato para facilitar o acesso dos interessados ao seu negócio.',
    },
    {
      number: '02',
      tag: 'ORGANIZAÇÃO & DADOS',
      icon: Database,
      title: 'Implementação de CRM',
      description:
        'Centralizamos contatos e oportunidades em uma plataforma, com etapas claras para acompanhar cada atendimento.',
    },
    {
      number: '03',
      tag: 'PADRONIZAÇÃO',
      icon: GitBranch,
      title: 'Automações e funil de vendas',
      description:
        'Configuramos etapas e automações para padronizar o atendimento e reduzir oportunidades esquecidas.',
    },
    {
      number: '04',
      tag: 'DIREÇÃO DIÁRIA',
      icon: SearchCheck,
      title: 'Auditoria comercial diária',
      description:
        'Acompanhamos a execução e os indicadores para identificar gargalos e orientar melhorias na operação.',
    },
    {
      number: '05',
      tag: 'CAPACITAÇÃO PRÁTICA',
      icon: GraduationCap,
      title: 'Treinamento semanal de 1h30',
      description:
        'Desenvolvemos as habilidades comerciais da equipe com orientação prática, técnicas de vendas e alinhamentos.',
    },
    {
      number: '06',
      tag: 'PREVISIBILIDADE',
      icon: LineChart,
      title: 'Informativo no Goals e relatório',
      description:
        'Organizamos os principais números e informações comerciais para facilitar decisões e acompanhar o desempenho.',
    },
  ];

  return (
    <section id="entregaveis" className="relative py-20 sm:py-28 overflow-hidden bg-[#080808]">
      {/* Luz ambiente localizada no fundo */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF6A00]/5 blur-[140px] rounded-full -z-10" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção no estilo Arena */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF6A00]/40 bg-[#1A0E05]/90 text-xs font-bold tracking-wider text-[#FF6A00] uppercase">
            O QUE A FA IMPLEMENTA
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight leading-tight">
            Uma estrutura comercial para sua equipe vender com processo, não no improviso.
          </h2>
          <p className="text-sm sm:text-base text-fa-text-muted leading-relaxed max-w-2xl mx-auto">
            Organizamos as ferramentas, os processos e a rotina do seu comercial para que cada oportunidade tenha acompanhamento e direção.
          </p>
        </div>

        {/* Grid 3 colunas x 2 linhas inspirado na Imagem 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#121215] border border-[#222225] hover:border-[#FF6A00]/50 hover:bg-[#18181D] transition-all duration-300 shadow-card-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Badge da Categoria no estilo Arena */}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF8A3D] bg-[#221307] px-2.5 py-1 rounded-full border border-[#FF6A00]/30">
                      {item.tag}
                    </span>

                    {/* Número Circular em Destaque Laranja (Exato Arena) */}
                    <div className="w-8 h-8 rounded-full border border-[#FF6A00] flex items-center justify-center text-xs font-bold text-[#FF6A00] bg-[#1A0E05]">
                      {item.number}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#18181D] border border-[#2A2A30] flex items-center justify-center text-[#FF6A00] shrink-0 group-hover:border-[#FF6A00]/40 transition-colors">
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FF8A3D] transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-fa-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Faixa curta com o Conceito Unificado */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0D0D10] border border-[#222225] text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs sm:text-sm font-mono tracking-widest text-[#FF6A00] font-bold uppercase">
            CRM + PROCESSOS + TREINAMENTO + GESTÃO
          </div>
          <p className="text-sm sm:text-base text-white font-bold">
            Tudo conectado em uma mesma estrutura comercial.
          </p>
          <p className="text-xs text-fa-text-muted pt-1">
            Uma implementação baseada na Metodologia Validada de Vendas da FA (CRM, Congruência de Funil, Playbook, Rotinas e Rituais).
          </p>
        </div>

        {/* Botão de transição com Glowbox CTA */}
        <div className="mt-12 text-center">
          <GlowButton
            href="#formulario-captura"
            onClick={scrollToForm}
            text="QUERO ESSA ESTRUTURA NO MEU COMERCIAL"
          />
        </div>
      </div>
    </section>
  );
}
