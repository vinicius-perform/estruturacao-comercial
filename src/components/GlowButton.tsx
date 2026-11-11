'use client';

import React from 'react';

interface GlowButtonProps {
  children?: React.ReactNode;
  text?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  size?: 'default' | 'sm' | 'full';
}

export function GlowButton({
  children,
  text,
  href,
  onClick,
  type = 'button',
  disabled = false,
  isLoading = false,
  className = '',
  size = 'default',
}: GlowButtonProps) {
  const sizeClass =
    size === 'sm' ? 'glowbox-sm' : size === 'full' ? 'glowbox-full' : '';

  const label = isLoading ? 'ENVIANDO DADOS...' : text || children;

  const innerContent = (
    <div className="btn-cta-box">
      <div className="btn-cta">
        {label}
      </div>
      <img
        src="/seta-2.svg"
        className="arrow-icon"
        alt="Seta"
      />
    </div>
  );

  return (
    <div className={`glowbox glowbox-active ${sizeClass} ${className}`}>
      <div className="glowbox-animations">
        <div className="glowbox-glow" />
        <div className="glowbox-stars-masker">
          <div className="glowbox-stars" />
        </div>
      </div>

      <div className="glowbox-borders-masker">
        <div className="glowbox-borders" />
      </div>

      {type === 'submit' ? (
        <button
          type="submit"
          disabled={disabled || isLoading}
          className="w-full text-left bg-transparent border-none cursor-pointer p-0 block focus:outline-none"
        >
          {innerContent}
        </button>
      ) : href ? (
        <a href={href} onClick={onClick} className="block text-decoration-none">
          {innerContent}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className="w-full text-left bg-transparent border-none cursor-pointer p-0 block focus:outline-none"
        >
          {innerContent}
        </button>
      )}
    </div>
  );
}
