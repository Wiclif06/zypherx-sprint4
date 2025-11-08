import { Layers, Cpu, Code, ShieldCheck, Zap, Accessibility } from 'lucide-react'
import logo from '@/assets/logo.png'

export default function Home() {
  const features = [
    { icon: <Layers size={24} className="text-brand-400" />, title: 'Responsividade', desc: 'Layout fluido XS/SM/MD/LG/XL com Tailwind e grid dinâmico.' },
    { icon: <Cpu size={24} className="text-brand-400" />, title: 'Rotas', desc: 'Rotas estáticas e dinâmicas com feedback visual e acessível.' },
    { icon: <Code size={24} className="text-brand-400" />, title: 'CRUD', desc: 'CRUD completo de Pacientes com integração nativa via fetch.' },
    { icon: <ShieldCheck size={24} className="text-brand-400" />, title: 'Tipos TS', desc: 'Union, Intersection, Interfaces e tipagem estrita com TypeScript.' },
    { icon: <Zap size={24} className="text-brand-400" />, title: 'Deploy', desc: 'Compatível com Vercel; README inclui o passo a passo de publicação.' },
    { icon: <Accessibility size={24} className="text-brand-400" />, title: 'Acessibilidade', desc: 'Contraste, foco visível e semântica aprimorada conforme WCAG.' },
  ]

  return (
    <section className="card p-8 md:p-12 text-center animate-fadeIn">
      <div className="flex justify-center mb-4">
        <img src={logo} alt="ZypherX Logo" className="h-14 drop-shadow-[0_0_12px_rgba(0,150,255,0.5)]" />
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
        Bem-vindo à{' '}
        <span className="bg-gradient-to-r from-brand-400 via-sky-400 to-blue-600 bg-clip-text text-transparent">
          ZypherX
        </span>
      </h1>

      <p className="text-neutral-400 max-w-3xl mx-auto mb-10 text-lg leading-relaxed">
        <b>ZypherX</b> é uma aplicação SPA desenvolvida com foco em <b>acessibilidade</b>,
        <b> usabilidade</b> e <b>integração</b> à API Java (DDD).  
        O sistema implementa práticas modernas de <b>TypeScript</b>, rotas dinâmicas e um CRUD
        completo de pacientes, seguindo o padrão institucional do Hospital das Clínicas.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="group border border-neutral-800 rounded-2xl p-6 bg-neutral-900/50 hover:bg-neutral-900/70 
                       hover:border-brand-500 transition-all duration-300 shadow-md hover:shadow-brand-500/10"
          >
            <div className="flex justify-center mb-3">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-brand-400 group-hover:text-sky-400 transition">
              {f.title}
            </h3>
            <p className="text-neutral-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      <footer className="mt-10 text-sm text-neutral-500">
        <p>Hospital das Clínicas – Unidade Digital | Desenvolvido por Equipe 1TDSPY</p>
      </footer>
    </section>
  )
}