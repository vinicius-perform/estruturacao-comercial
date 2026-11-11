'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { GlowButton } from './GlowButton';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToHero = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById('formulario-captura');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const navLinks = [
    { label: 'Benefícios', href: '#dores' },
    { label: 'O que está incluído', href: '#entregaveis' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Dúvidas', href: '#faq' },
  ];

  return (
    <header className="sticky top-4 z-40 w-full px-4 sm:px-6 lg:px-8 max-w-container mx-auto">
      <nav
        aria-label="Navegação principal"
        className="w-full flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-fa-card/85 backdrop-blur-md border border-fa-border shadow-card-shadow transition-all duration-300"
      >
        {/* Logo Oficial FA */}
        <Link href="/" className="relative flex items-center focus:outline-none group">
          <div className="relative w-28 sm:w-36 h-7 sm:h-8 transition-transform group-hover:scale-[1.02]">
            <Image
              src="/logo-white.png"
              alt="Fazendo Acontecer — Marketing & Vendas"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs lg:text-sm font-medium text-fa-text-muted hover:text-white transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Desktop com Glowbox Button */}
        <div className="hidden md:flex items-center">
          <GlowButton
            href="#formulario-captura"
            onClick={scrollToHero}
            size="sm"
            text="QUERO ESTRUTURAR"
          />
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu de navegação"
            className="p-1.5 rounded-lg text-fa-text-muted hover:text-white hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Menu mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-2xl bg-fa-card border border-fa-border shadow-2xl animate-fade-in space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-fa-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-fa-border">
            <GlowButton
              href="#formulario-captura"
              onClick={scrollToHero}
              size="full"
              text="QUERO ESTRUTURAR MEU COMERCIAL"
            />
          </div>
        </div>
      )}
    </header>
  );
}
