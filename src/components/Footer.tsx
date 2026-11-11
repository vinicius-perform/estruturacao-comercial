'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { PrivacyModal } from './PrivacyModal';

export function Footer() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <>
      <footer className="w-full bg-fa-bg border-t border-fa-border/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-fa-border/50">
            {/* Logo Oficial FA */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="relative w-36 h-9">
                <Image
                  src="/logo-white.png"
                  alt="Fazendo Acontecer — Marketing & Vendas"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-fa-text-subtle text-center md:text-left">
                Estruturação de CRM, processos de atendimento e acompanhamento de vendas.
              </p>
            </div>

            {/* Links e Privacidade */}
            <div className="flex items-center gap-6 text-xs text-fa-text-muted">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="hover:text-fa-neon transition-colors"
              >
                Política de Privacidade
              </button>
              <Link href="/privacidade" className="hover:text-fa-neon transition-colors">
                Termos & LGPD
              </Link>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-fa-text-subtle text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} FAZENDO ACONTECER — Marketing & Vendas. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-1.5 text-fa-text-muted">
              <ShieldCheck className="w-3.5 h-3.5 text-fa-neon" />
              <span>Ambiente comercial seguro e em conformidade com a LGPD.</span>
            </div>
          </div>
        </div>
      </footer>

      <PrivacyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
    </>
  );
}
