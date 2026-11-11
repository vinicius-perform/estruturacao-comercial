import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Política de Privacidade | Fazendo Acontecer',
  description: 'Conheça como a Fazendo Acontecer coleta, utiliza e protege os seus dados pessoais em conformidade com a LGPD.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-fa-bg text-fa-text py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Topo com Logo e Voltar */}
        <div className="flex items-center justify-between border-b border-fa-border pb-6 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-fa-text-muted hover:text-fa-neon transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar para a página inicial
          </Link>
          <div className="relative w-32 h-8">
            <Image
              src="/logo-white.png"
              alt="Fazendo Acontecer"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-fa-border bg-fa-card text-xs font-semibold text-fa-neon mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            LGPD • Lei Geral de Proteção de Dados (Lei nº 13.709/2018)
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Política de Privacidade e Proteção de Dados
          </h1>
          <p className="text-sm text-fa-text-muted">
            Última atualização: Novembro de 2026 • Fazendo Acontecer — Marketing & Vendas
          </p>
        </div>

        {/* Conteúdo */}
        <div className="space-y-8 text-sm leading-relaxed text-fa-text-muted">
          <section className="bg-fa-card p-6 rounded-2xl border border-fa-border">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4 text-fa-neon" />
              1. Nosso Compromisso com sua Privacidade
            </h2>
            <p>
              A <strong>FAZENDO ACONTECER — Marketing & Vendas</strong> valoriza a segurança e a transparência no tratamento de dados pessoais. Esta Política de Privacidade descreve de forma clara e objetiva como coletamos, usamos, armazenamos e protegemos as informações fornecidas por você ao solicitar contato comercial ou acessar nossa landing page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-fa-neon" />
              2. Dados Coletados e Princípio da Minimização
            </h2>
            <p>
              Coletamos estritamente as informações necessárias para viabilizar o primeiro atendimento consultivo da nossa equipe comercial sobre o serviço de Estruturação Comercial:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Nome completo:</strong> para identificação e comunicação personalizada.</li>
              <li><strong>WhatsApp corporativo/pessoal com DDD:</strong> canal principal para contato e apresentação da solução.</li>
              <li><strong>Nome da empresa ou clínica:</strong> para compreender o segmento e o contexto operacional do negócio.</li>
              <li><strong>Principal desafio comercial:</strong> para direcionar a conversa para a dor específica da sua operação.</li>
              <li><strong>Dados de navegação e atribuição técnica:</strong> parâmetros de campanha (UTM, referrer, data e hora) coletados de forma segura para mensurar a eficácia de nossos anúncios e campanhas.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-fa-neon" />
              3. Finalidade e Base Legal do Tratamento
            </h2>
            <p>
              O tratamento dos dados baseia-se no seu <strong>consentimento expresso</strong> e nos <strong>procedimentos preliminares relacionados a contrato</strong> (Art. 7º, I e V da LGPD).
            </p>
            <p>
              A finalidade é exclusiva:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Entrar em contato para entender a realidade do seu setor comercial.</li>
              <li>Apresentar a proposta de estruturação de CRM, processos, playbook e acompanhamento da FA.</li>
              <li>Enviar informações relevantes solicitadas por você.</li>
            </ul>
            <p className="text-xs text-fa-text-subtle">
              Nunca vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins promocionais alheios aos serviços da Fazendo Acontecer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">4. Armazenamento e Segurança</h2>
            <p>
              Seus dados são transmitidos via conexão criptografada (HTTPS/TLS) e armazenados em infraestrutura de CRM segura com controle restrito de acesso por credenciais autenticadas. Mantemos os dados apenas pelo período necessário para cumprir as finalidades comerciais ou até que você solicite a exclusão.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">5. Seus Direitos como Titular de Dados</h2>
            <p>
              Em conformidade com o artigo 18 da LGPD, você possui o direito de:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Confirmar a existência de tratamento de dados;</li>
              <li>Acessar seus dados pessoais sob nossa custódia;</li>
              <li>Solicitar a correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Solicitar a eliminação dos dados tratados com base no seu consentimento;</li>
              <li>Revogar o consentimento a qualquer momento.</li>
            </ul>
            <p>
              Para exercer qualquer um destes direitos, basta entrar em contato com nossa equipe através de nossos canais oficiais de comunicação institucional.
            </p>
          </section>

          <div className="pt-6 border-t border-fa-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-fa-text-subtle">
              © {new Date().getFullYear()} Fazendo Acontecer — Marketing & Vendas. Todos os direitos reservados.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-fa-neon text-fa-bg font-semibold text-xs tracking-wide hover:bg-fa-neon-sec transition-colors"
            >
              Voltar para a página
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
