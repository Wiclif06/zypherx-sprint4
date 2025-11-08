
export default function Sobre() {
  return (
    <section className="card p-6 md:p-10 space-y-4">
      <h2 className="text-2xl font-bold">Sobre o Projeto</h2>
      <p className="muted max-w-3xl">
        O projeto ZypherX integra Front-End (React + Vite + TS) com o backend Java (Domain Driven Design).
        A proposta é criar uma experiência coesa e responsiva, consumindo a API publicada remotamente.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <h3 className="font-semibold">Tecnologias</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>React + Vite + TypeScript</li>
            <li>TailwindCSS (apenas)</li>
            <li>react-router-dom</li>
            <li>fetch nativo (sem Axios)</li>
          </ul>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold">Funcionalidades</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Rotas estáticas e dinâmicas</li>
            <li>CRUD de Pacientes</li>
            <li>Tratamento de erros e feedbacks</li>
            <li>Componentização e tipagem avançada</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
