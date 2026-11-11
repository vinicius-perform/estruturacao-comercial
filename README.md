# Landing Page de Captura de Leads — Estruturação Comercial FA

Landing page premium, de alta conversão, responsiva e performática desenvolvida para a **Fazendo Acontecer (FA) — Marketing & Vendas**, com foco na oferta de **Estruturação Comercial**.

---

## 🚀 Visão Geral e Arquitetura

- **Framework**: Next.js 14+ (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS com o Design System oficial **FA Neon Performance**
  - Fundo principal: `#030A0D`
  - Fundo alternativo: `#08130F`
  - Cards: `#101C16`
  - Destaques neon: `#BCFC03` e `#9EF300`
  - Tipografia: *Space Grotesk* (títulos) e *Inter* (corpo)
- **Ícones**: Lucide React
- **Arquitetura de Conversão**:
  1. **Seção 01 — Hero + Captura**: Primeira dobra com headline provocativa, contraste neon e formulário visível imediatamente no desktop.
  2. **Seção 02 — Dores Comerciais**: Diagnóstico dos 4 gargalos que fazem empresas perderem vendas mesmo recebendo leads.
  3. **Seção 03 — A Solução e Entregáveis**: Os 6 entregáveis reais da oferta (Link da bio, CRM, Automações e Funil, Auditoria diária, Treinamento semanal de 1h30 e Informativo Goals / Relatório).
  4. **Seção 04 — Como Funciona + Autoridade**: Timeline em 3 passos com prazos (48h após onboarding e 6 meses de acompanhamento) + dados de autoridade institucional da FA (+180 clientes e 85 colaboradores).
  5. **Seção 05 — FAQ Enxuto + CTA Final**: Resolução de 4 objeções fundamentais e chamada final para o formulário.
  6. **LGPD & Políticas**: Página dedicada `/privacidade` e modal interativo inline.

---

## ⚙️ Variáveis de Ambiente e Integração com CRM

Crie um arquivo `.env.local` na raiz do projeto com base no arquivo `.env.example`:

```env
# URL do Webhook ou API REST do CRM da FA (n8n, Make, CRM próprio, etc.)
CRM_WEBHOOK_URL=https://webhook.fazendoacontecer.net.br/webhook/lead-estruturacao

# Token de autenticação (opcional)
CRM_API_KEY=

# Permite log local em desenvolvimento quando CRM_WEBHOOK_URL não estiver configurado
ALLOW_LOCAL_LEAD_LOG=true

# Analytics (Opcional)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=

# URL do Domínio
NEXT_PUBLIC_SITE_URL=https://estruturacao.fazendoacontecer.com.br
```

### Payload Enviado ao CRM (`POST /api/lead`):

```json
{
  "nome": "Dr. Carlos Santos",
  "whatsapp": "11987654321",
  "empresa": "Clínica Santos Saúde",
  "desafio_comercial": "Recebo leads, mas converto pouco.",
  "origem": "lp_estruturacao_comercial_fa",
  "utm_source": "meta_ads",
  "utm_medium": "feed",
  "utm_campaign": "estruturacao_comercial_q4",
  "utm_content": "video_marcela_01",
  "utm_term": "",
  "fbclid": "IwAR0...",
  "gclid": "",
  "landing_page": "/?utm_source=meta_ads",
  "referrer": "https://instagram.com/",
  "data_hora_entrada": "2026-11-10T20:30:00.000Z",
  "criado_em": "2026-11-10T20:30:45.000Z"
}
```

---

## 🛠️ Comandos de Execução

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Iniciar servidor de produção
npm start
```
