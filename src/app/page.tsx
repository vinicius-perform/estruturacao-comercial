import { HeroSection } from '@/components/HeroSection';
import { PainsSection } from '@/components/PainsSection';
import { DeliverablesSection } from '@/components/DeliverablesSection';
import { ProcessSection } from '@/components/ProcessSection';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { MobileStickyCta } from '@/components/MobileStickyCta';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-fa-bg text-fa-text overflow-x-hidden selection:bg-fa-neon selection:text-fa-bg">
      {/* Conteúdo Principal em Seções Estratégicas */}
      <main>
        {/* SEÇÃO 01: Hero + Captura de Leads na Primeira Dobra */}
        <HeroSection />

        {/* SEÇÃO 02: Identificação com as Dores Comerciais */}
        <PainsSection />

        {/* SEÇÃO 03: A Solução e os 6 Entregáveis Oficiais */}
        <DeliverablesSection />

        {/* SEÇÃO 04: Como Funciona + Autoridade da FA */}
        <ProcessSection />

        {/* SEÇÃO 05: FAQ Enxuto + Captura Final */}
        <FaqSection />
      </main>

      {/* Rodapé Institucional com LGPD e Políticas */}
      <Footer />

      {/* CTA Fixo Inteligente para Dispositivos Móveis */}
      <MobileStickyCta />
    </div>
  );
}
