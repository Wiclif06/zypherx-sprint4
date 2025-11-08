import type { Integrante } from '@/types'

const integrantes: Integrante[] = [
  { nome: 'Gabriel Ambrósio Saraiva', rm: '566552', turma: '1TDSPY', role: 'Estudante' },
  { nome: 'Felipe Wiclif Leal da Silva', rm: '563901', turma: '1TDSPY', role: 'Estudante' },
  { nome: 'Paulo Cesar Oliveira Andrade', rm: '563299', turma: '1TDSPY', role: 'Estudante' },
]

export default function Integrantes() {
  return (
    <section className="card p-6 md:p-10">
      <h2 className="text-2xl font-bold">Integrantes</h2>
      <p className="muted mt-2">Nome, RM, Turma e Cargo conforme exigência.</p>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrantes.map((i) => (
          <div
            key={i.rm}
            className="card p-4 border border-neutral-800 hover:border-brand-500 transition-all duration-300"
          >
            <div className="text-lg font-semibold">{i.nome}</div>
            <div className="mt-1 text-sm">RM: <span className="font-mono">{i.rm}</span></div>
            <div className="text-sm">Turma: {i.turma}</div>
            <div className="text-sm text-brand-400 mt-1 font-medium">
              Cargo: {i.role}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

