'use client';

import React from 'react';
import { X, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] bg-fa-card border border-fa-border rounded-2xl p-6 sm:p-8 overflow-y-auto shadow-2xl text-fa-text"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-5 right-5 p-2 text-fa-text-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-5 h-5 text-fa-neon" />
          <span className="text-xs font-semibold text-fa-neon uppercase tracking-wider">
            Privacidade e LGPD
          </span>
        </div>

        <h2 id="privacy-title" className="text-xl sm:text-2xl font-bold text-white mb-4">
          Política de Privacidade e Proteção de Dados
        </h2>

        <div className="space-y-4 text-sm text-fa-text-muted leading-relaxed">
          <p>
            A <strong>Fazendo Acontecer — Marketing & Vendas</strong> preza pela total confidencialidade e segurança dos dados fornecidos por nossos clientes e parceiros.
          </p>

          <div className="bg-fa-bg p-4 rounded-xl border border-fa-border space-y-2">
            <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4 text-fa-neon" />
              Finalidade Exclusiva do Contato
            </h3>
            <p className="text-xs">
              Os dados solicitados (Nome, WhatsApp, Empresa e Desafio Comercial) são utilizados unicamente para que nossos consultores realizem um diagnóstico prévio da sua operação e apresentem a proposta de Estruturação Comercial.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-fa-neon" />
              Garantias e Direitos (LGPD)
            </h3>
            <ul className="text-xs list-disc pl-5 space-y-1">
              <li>Não realizamos envio de spam ou mensagens não solicitadas.</li>
              <li>Não comercializamos seus dados em nenhuma circunstância com terceiros.</li>
              <li>Você pode revogar o contato ou solicitar exclusão a qualquer momento informando nossa equipe.</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-fa-border flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-fa-neon text-fa-bg font-semibold text-xs tracking-wide hover:bg-fa-neon-sec transition-colors"
          >
            Entendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
