import { useState } from 'react'

type FAQ = { id: string; q: string; a: string }

const faqs: FAQ[] = [
  {
    id: 'objetivo',
    q: 'Qual é o objetivo principal da ZypherX?',
    a: 'A ZypherX foi criada para digitalizar e centralizar o atendimento de pacientes do Hospital das Clínicas, facilitando a gestão de dados clínicos e o acesso rápido a informações de saúde em ambiente seguro e acessível.',
  },
  {
    id: 'acessibilidade',
    q: 'Como o sistema auxilia pessoas com dificuldade no uso de tecnologia?',
    a: 'A interface da ZypherX foi projetada com foco em usabilidade, utilizando contrastes adequados, textos claros e estrutura simplificada. Além disso, é totalmente responsiva, permitindo acesso fácil por diferentes dispositivos.',
  },
  {
    id: 'integracao',
    q: 'A plataforma está integrada ao sistema Java da Sprint anterior?',
    a: 'Sim. A ZypherX consome a API desenvolvida na disciplina Domain Driven Design Using Java, garantindo a integração total entre o front-end React e o backend Java hospedado externamente.',
  },
  {
    id: 'seguranca',
    q: 'Como os dados dos pacientes são protegidos?',
    a: 'A aplicação segue boas práticas de segurança, com autenticação de acesso à API, criptografia nas conexões e políticas de controle de dados em conformidade com a LGPD.',
  },
  {
    id: 'vercel',
    q: 'Como o sistema é disponibilizado online?',
    a: 'O deploy da aplicação é realizado na plataforma Vercel, garantindo alta disponibilidade e integração direta com o repositório GitHub da equipe.',
  },
  {
    id: 'colaboracao',
    q: 'Quem participou no desenvolvimento do projeto?',
    a: 'O projeto foi desenvolvido pelos alunos Gabriel Ambrósio Saraiva, Felipe Wiclif Leal da Silva e Paulo Cesar Oliveira Andrade, turma 1TDSPY, na Sprint 4 de Front-End Design Engineering da FIAP.',
  },
]

export default function FAQ() {
  const [ativo, setAtivo] = useState<string | null>(null)

  const toggle = (id: string) => {
    setAtivo(ativo === id ? null : id)
  }

  return (
    <section className="card p-6 md:p-10 max-w-4xl mx-auto animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6">FAQ</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="card p-4 md:p-6">
            <h3 className="text-lg font-semibold">{faq.q}</h3>
            <button
              className="btn mt-3"
              onClick={() => toggle(faq.id)}
            >
              {ativo === faq.id ? 'Ocultar Resposta' : 'Analisar Resposta'}
            </button>

            {ativo === faq.id && (
              <p className="mt-4 text-neutral-300 animate-slideUp">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}