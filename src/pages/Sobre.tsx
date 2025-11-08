import { Code, Server, Layers, Globe, Database, Cpu } from 'lucide-react'

export default function Sobre() {
  return (
    <section className="card p-8 md:p-12 animate-fadeIn space-y-6">
      {/* Cabeçalho */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-extrabold mb-2">
          Sobre o Projeto <span className="text-brand-400">ZypherX</span>
        </h2>
        <p className="text-neutral-400 max-w-3xl mx-auto text-lg leading-relaxed">
          O <b>ZypherX</b> é uma plataforma de <b>atendimento médico inteligente</b> desenvolvida com base no 
          modelo <b>Domain Driven Design (DDD)</b>.  
          A aplicação integra <b>Front-End</b> em React + TypeScript com o <b>Back-End Java</b> do Hospital das Clínicas,
          garantindo acessibilidade, desempenho e confiabilidade.
        </p>
      </div>

      {/* Seções */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Tecnologias */}
        <div className="card bg-neutral-900/50 border border-neutral-800 p-6 hover:border-brand-500 transition">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-brand-400">
            <Code size={22} /> Tecnologias Utilizadas
          </h3>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-neutral-300">
            <li><b>React + Vite + TypeScript</b> — Base moderna e reativa.</li>
            <li><b>TailwindCSS</b> — Estilização fluida, responsiva e acessível.</li>
            <li><b>React Router</b> — Controle de rotas estáticas e dinâmicas.</li>
            <li><b>Fetch nativo</b> — Comunicação direta e leve com a API.</li>
            <li><b>Lucide React</b> — Ícones acessíveis e minimalistas.</li>
          </ul>
        </div>

        {/* Funcionalidades */}
        <div className="card bg-neutral-900/50 border border-neutral-800 p-6 hover:border-brand-500 transition">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-brand-400">
            <Cpu size={22} /> Funcionalidades Principais
          </h3>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-neutral-300">
            <li>CRUD completo de pacientes com histórico e atestados em PDF.</li>
            <li>Rotas dinâmicas e feedback visual instantâneo.</li>
            <li>Tratamento de erros e validações de formulário.</li>
            <li>Componentização escalável e tipagem avançada.</li>
            <li>Geração automatizada de documentos e relatórios médicos.</li>
          </ul>
        </div>
      </div>

      {/* Integração e Estrutura */}
      <div className="mt-10 grid md:grid-cols-3 gap-6 text-neutral-300">
        <div className="flex flex-col items-center text-center p-4 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:border-brand-500 transition">
          <Server size={28} className="text-brand-400 mb-2" />
          <h4 className="font-semibold text-brand-400">Back-End Java</h4>
          <p className="text-sm mt-1">Arquitetura orientada a domínios (DDD), com API integrada ao Hospital das Clínicas.</p>
        </div>

        <div className="flex flex-col items-center text-center p-4 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:border-brand-500 transition">
          <Database size={28} className="text-brand-400 mb-2" />
          <h4 className="font-semibold text-brand-400">Banco de Dados</h4>
          <p className="text-sm mt-1">Estrutura relacional e validação completa de entidades e consultas médicas.</p>
        </div>

        <div className="flex flex-col items-center text-center p-4 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:border-brand-500 transition">
          <Globe size={28} className="text-brand-400 mb-2" />
          <h4 className="font-semibold text-brand-400">Deploy & Integração</h4>
          <p className="text-sm mt-1">Aplicação otimizada para deploy no Vercel e integração via APIs REST.</p>
        </div>
      </div>

      <footer className="text-center text-sm text-neutral-500 mt-8">
        <p>Projeto desenvolvido por <b>Equipe 1TDSPY</b> — FIAP Unidade Paulista • 2025</p>
      </footer>
    </section>
  )
}