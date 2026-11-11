import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://estruturacao.fazendoacontecer.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Estruturação Comercial | CRM, Processos e Gestão de Vendas — FA',
  description:
    'Estruture seu setor comercial com CRM, automações, processos de vendas, treinamento e auditoria comercial. Conheça a solução da Fazendo Acontecer.',
  keywords: [
    'estruturação comercial',
    'crm vendas',
    'automação comercial',
    'treinamento de vendas',
    'auditoria comercial',
    'gestão de vendas',
    'fazendo acontecer',
    'processos comerciais',
  ],
  authors: [{ name: 'Fazendo Acontecer — Marketing & Vendas' }],
  creator: 'Fazendo Acontecer',
  publisher: 'Fazendo Acontecer',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-fa.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon-fa.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    title: 'Estruturação Comercial | CRM, Processos e Gestão de Vendas — FA',
    description:
      'Estruture seu setor comercial com CRM, automações, processos de vendas, treinamento e auditoria comercial. Conheça a solução da Fazendo Acontecer.',
    siteName: 'Fazendo Acontecer — Marketing & Vendas',
    images: [
      {
        url: '/logo-white.png',
        width: 933,
        height: 227,
        alt: 'Estruturação Comercial Fazendo Acontecer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estruturação Comercial | CRM, Processos e Gestão de Vendas — FA',
    description:
      'Estruture seu setor comercial com CRM, automações, processos de vendas, treinamento e auditoria comercial.',
    images: ['/logo-white.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Google Fonts: Plus Jakarta Sans e Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-fa-bg text-fa-text font-sans antialiased selection:bg-fa-neon selection:text-fa-bg min-h-screen flex flex-col">
        {/* Scripts de Analytics se configurados */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}

        {pixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {children}
      </body>
    </html>
  );
}
