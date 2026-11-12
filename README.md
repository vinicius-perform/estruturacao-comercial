# Landing Page de Estruturação Comercial — Fazendo Acontecer (FA)

Landing page premium, de alta conversão, responsiva e performática desenvolvida para a **Fazendo Acontecer (FA) — Marketing & Vendas**, com foco na oferta de **Estruturação Comercial**.

---

## 🚀 Visão Geral e Arquitetura

- **Framework**: Next.js 14+ (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS com o Design System corporativo **FA Dark & Vibrant Orange**
  - **Fundo Principal (Hero, Entregáveis, FAQ)**: `#080808`
  - **Fundo Seções de Destaque (Dores e Processo)**: `#101014` com cards elevados `#181820` e bordas `#262634`
  - **Acento Primário**: Laranja Vibrante (`#FF6A00` / `#FF8A3D`)
  - **Tipografia**: Plus Jakarta Sans (títulos de alto impacto) e Inter (corpo de texto limpo)
- **Ícones**: Lucide React
- **Arquitetura de Conversão**:
  1. **Seção 01 — Hero + Captura**:
     - Headline de alto impacto: *"Vamos triplicar a performance do seu time comercial em apenas 4 semanas."* (com acento cromático e sublinhado sólido laranja sob *"4 semanas"*).
     - Subheadline com proposta de valor: *"Atenda 3X mais leads no mesmo período, sem precisar contratar mais pessoas."*
     - Formulário de qualificação em **2 etapas** com barra de progresso suave, validação em tempo real e CTA *"ESTRUTURAR MEU COMERCIAL"*.
  2. **Seção 02 — Dores Comerciais ("O PROBLEMA NÃO É SÓ ATRAIR LEADS")**:
     - Diagnóstico claro dos 4 maiores gargalos comerciais (leads esfriando no WhatsApp, falta de padrão no atendimento, funil invisível e dependência de cobrança manual constante).
  3. **Seção 03 — A Solução e Entregáveis ("O QUE ESTÁ INCLUÍDO NA ESTRUTURAÇÃO")**:
     - Grid com os 6 pilares de implementação da FA (Link da bio estratégico, CRM configurado, Automações e Funil de Vendas, Auditoria diária de conversão, Treinamento semanal de 1h30 e Informativo Goals / Relatório executivo).
  4. **Seção 04 — Da Estrutura à Execução ("COMO FUNCIONA")**:
     - Timeline prática em 3 etapas de evolução com prazos definidos (Início em até 48h pós-onboarding e 6 meses de acompanhamento).
  5. **Seção 05 — FAQ Enxuto + CTA Final**:
     - Resolução rápida das 4 principais dúvidas frequentes e botão de ação para direcionamento ao formulário.
  6. **Seção 06 — Rodapé Institucional + LGPD**:
     - Termos de conformidade legal LGPD, direitos reservados e página dedicada [`/privacidade`](/privacidade).

---

## 📋 Formulário de Qualificação em 2 Etapas

O formulário coleta informações estratégicas para qualificar o lead antes da reunião de diagnóstico:

- **Etapa 1 — Dados de Contato**:
  - `Nome completo`
  - `WhatsApp com DDD` (com máscara automática `(XX) XXXXX-XXXX`)
  - `E-mail profissional`
- **Etapa 2 — Dados da Empresa e Operação**:
  - `Nome ou Instagram da Empresa`
  - `Segmento de atuação` (Select com principais nichos de mercado)
  - `Faturamento Médio Mensal` (Faixas financeiras estratégicas)
  - `Maior Gargalo Comercial` (Diagnóstico da principal dor da equipe)

---

## ⚙️ Variáveis de Ambiente e Integração com CRM

Crie um arquivo `.env.local` na raiz do projeto ou configure as seguintes variáveis no painel de deploy da sua plataforma de hospedagem:

```env
# URL do Webhook ou API REST do CRM da FA (n8n, Make, CRM próprio, etc.)
CRM_WEBHOOK_URL=https://webhook.fazendoacontecer.net.br/webhook/lead-estruturacao

# Token ou Chave de API de autenticação no CRM (opcional, se exigido pelo endpoint)
CRM_API_KEY=

# Modo de desenvolvimento: quando true, permite registrar leads no console se CRM_WEBHOOK_URL estiver vazio
ALLOW_LOCAL_LEAD_LOG=true

# Analytics e Tracking (Opcional)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=

# URL Canônica do Domínio em Produção
NEXT_PUBLIC_SITE_URL=https://estruturacao.fazendoacontecer.com.br
```

### Payload Enviado ao CRM (`POST /api/lead`):

```json
{
  "nome": "Carlos Eduardo Silva",
  "whatsapp": "11987654321",
  "email": "carlos@empresa.com.br",
  "empresa": "@empresa.saude",
  "segmento": "Clínicas e Consultórios",
  "faturamento": "R$ 80 mil a R$ 200 mil / mês",
  "desafio_comercial": "Recebo muitos leads, mas poucos viram vendas",
  "origem": "lp_estruturacao_comercial_fa",
  "contexto_origem": "hero_desktop_visible",
  "utm_source": "meta_ads",
  "utm_medium": "feed",
  "utm_campaign": "estruturacao_comercial",
  "utm_content": "video_01",
  "utm_term": "",
  "fbclid": "IwAR...",
  "gclid": "",
  "landing_page": "/",
  "referrer": "https://instagram.com/",
  "data_hora_entrada": "2026-11-12T19:30:00.000Z",
  "criado_em": "2026-11-12T19:30:45.000Z"
}
```

---

## 🚀 Como Realizar o Deploy em Produção

### Opção 1: Vercel (Recomendada)
1. Conecte sua conta do GitHub na [Vercel](https://vercel.com).
2. Importe o repositório `https://github.com/vinicius-perform/estruturacao-comercial`.
3. O Next.js será detectado automaticamente.
4. Adicione as variáveis de ambiente descritas acima em **Settings > Environment Variables**.
5. Clique em **Deploy**. A cada novo push na branch `main`, um deploy automático é disparado.

### Opção 2: Netlify
1. Conecte o repositório no painel da [Netlify](https://www.netlify.com).
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Configure as variáveis de ambiente e publique.

### Opção 3: Servidor Próprio / VPS / Docker
```bash
# 1. Clonar repositório
git clone https://github.com/vinicius-perform/estruturacao-comercial.git
cd estruturacao-comercial

# 2. Instalar dependências
npm install

# 3. Compilar versão de produção
npm run build

# 4. Iniciar serviço na porta desejada (ex: porta 3000 com PM2)
pm2 start npm --name "lp-estruturacao-fa" -- start -- -p 3000
```

---

## 🛠️ Comandos Locais

```bash
# Executar em modo desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Iniciar servidor de produção
npm start -- -p 3000
```
