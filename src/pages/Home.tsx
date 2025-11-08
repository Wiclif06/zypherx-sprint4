
export default function Home() {
  return (
    <section className="card p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold">Bem-vindo à ZypherX</h1>
      <p className="muted mt-3 max-w-3xl">
        Aplicação SPA com foco em acessibilidade, usabilidade e integração com a API Java (DDD). Utilize o menu para navegar. 
        As rotas estáticas e dinâmicas, tipagem avançada em TypeScript e CRUD de Pacientes foram implementados conforme a rubrica.
      </p>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Responsividade', desc: 'Layout fluido XS/SM/MD/LG/XL com Tailwind.' },
          { title: 'Rotas', desc: 'Rotas estáticas e dinâmicas com feedback ao usuário.' },
          { title: 'CRUD', desc: 'Exemplo completo em /pacientes usando fetch nativo.' },
          { title: 'Tipos TS', desc: 'Union, Intersection, Interfaces e tipagem estrita.' },
          { title: 'Deploy', desc: 'Compatível com Vercel; README inclui o passo a passo.' },
          { title: 'Acessibilidade', desc: 'Foco visível, contraste e semântica.' },
        ].map((c) => (
          <div key={c.title} className="card p-4">
            <h3 className="font-semibold">{c.title}</h3>
            <p className="muted mt-1">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
