'use client';

import React, { useEffect, useState } from 'react';
import { GlowButton } from './GlowButton';

export function MobileStickyCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Exibe somente após rolar mais de 500px da primeira dobra
      const scrollY = window.scrollY;
      const formEl = document.getElementById('formulario-captura');

      if (!formEl) {
        setIsVisible(scrollY > 500);
        return;
      }

      // Se o formulário estiver visível na janela, oculta a barra para não atrapalhar
      const rect = formEl.getBoundingClientRect();
      const isFormInView = rect.top < window.innerHeight && rect.bottom > 0;

      setIsVisible(scrollY > 500 && !isFormInView);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHero = () => {
    const element = document.getElementById('formulario-captura');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Coloca foco no primeiro input após a animação de scroll
      setTimeout(() => {
        const input = document.getElementById('lead-nome');
        if (input) input.focus();
      }, 500);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-40 animate-fade-in">
      <GlowButton
        onClick={scrollToHero}
        size="full"
        text="QUERO TRIPLICAR A PERFORMANCE DO MEU COMERCIAL"
      />
    </div>
  );
}
