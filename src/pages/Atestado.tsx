
import { useState } from 'react'
import jsPDF from 'jspdf'
import logo from '@/assets/logo.png'
import assinatura from '@/assets/assinatura.png'
import QRCode from 'qrcode'

export default function Atestado() {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [dias, setDias] = useState(1)
  const [medico, setMedico] = useState('Dr. Felipe Wiclif Leal da Silva')
  const [data, setData] = useState(new Date().toLocaleDateString('pt-BR'))
  const [gerado, setGerado] = useState(false)

  const gerarCodigo = async (texto: string) => {
    return await QRCode.toDataURL(texto)
  }

  const gerarAtestadoPDF = async () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const margem = 20

    // Cabeçalho
    if (logo) doc.addImage(logo, 'PNG', margem, 10, 25, 25)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text('PROJETO HC - ZYPHERX', 105, 20, { align: 'center' })
    doc.setFontSize(12)
    doc.text('Sistema de Atendimento Digital - Hospital das Clínicas', 105, 27, { align: 'center' })
    doc.line(margem, 35, 210 - margem, 35)

    // Corpo
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    const corpo = [
      `Declaro que o(a) paciente ${nome}, portador(a) do CPF ${cpf}, foi atendido(a) nesta data e necessita de afastamento de suas atividades habituais por ${dias} dia(s).`,
      '',
      'Recomenda-se repouso e acompanhamento médico conforme necessidade clínica.',
      '',
      `Data de emissão: ${data}.`
    ]
    doc.text(corpo, margem, 75, { maxWidth: 170, align: 'justify' })

    // Assinatura
    if (assinatura) doc.addImage(assinatura, 'PNG', 95, 200, 40, 15)
    doc.line(70, 215, 150, 215)
    doc.text(`${medico}`, 105, 223, { align: 'center' })
    doc.text('CRM: ___________', 105, 230, { align: 'center' })

    // QR Code de autenticação
    const codigoAutenticacao = `${cpf}-${Date.now()}`
    const qr = await gerarCodigo(codigoAutenticacao)
    doc.addImage(qr, 'PNG', 20, 260, 25, 25)
    doc.setFontSize(10)
    doc.text(`Código de Autenticação: ${codigoAutenticacao}`, 50, 270)
    doc.text('Projeto HC - ZypherX | Documento oficial - Uso restrito médico', 105, 285, { align: 'center' })

    doc.save(`Atestado_${nome.replace(/\s/g, '_')}.pdf`)
  }

  const gerarVisualizacao = (e: React.FormEvent) => {
    e.preventDefault()
    setGerado(true)
  }

  return (
    <section className="card p-6 md:p-10 animate-fadeIn max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Emitir Atestado Médico</h2>

      <form onSubmit={gerarVisualizacao} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Nome do Paciente</label>
          <input className="input" value={nome} onChange={e => setNome(e.target.value)} required />
        </div>
        <div>
          <label className="label">CPF</label>
          <input className="input" value={cpf} onChange={e => setCpf(e.target.value)} required />
        </div>
        <div>
          <label className="label">Dias de Afastamento</label>
          <input type="number" min={1} className="input" value={dias} onChange={e => setDias(Number(e.target.value))} />
        </div>
        <div>
          <label className="label">Médico Responsável</label>
          <input className="input" value={medico} onChange={e => setMedico(e.target.value)} />
        </div>

        <button className="btn md:col-span-2 mt-4" type="submit">
          Visualizar Atestado
        </button>
      </form>

      {gerado && (
        <div className="mt-10 p-6 border border-neutral-800 rounded-2xl bg-neutral-900/50">
          <h3 className="text-xl font-semibold mb-4 text-center">Pré-visualização do Atestado</h3>
          <div className="space-y-2 text-neutral-300">
            <div className="flex justify-center">
              <img src={logo} alt="logo" className="w-16 mb-2 opacity-90" />
            </div>
            <p className="text-center font-semibold text-lg">PROJETO HC - ZYPHERX</p>
            <p className="text-center text-sm text-neutral-400 mb-4">Sistema de Atendimento Digital</p>
            <p><b>Paciente:</b> {nome}</p>
            <p><b>CPF:</b> {cpf}</p>
            <p><b>Dias de afastamento:</b> {dias}</p>
            <p><b>Data:</b> {data}</p>
            <div className="mt-4 border border-neutral-800 rounded-xl p-3 bg-neutral-900/40">
              <p className="leading-relaxed text-justify">
                Declaro que o(a) paciente acima necessita de afastamento de suas atividades por {dias} dia(s),
                conforme avaliação médica e em virtude de seu estado clínico.
              </p>
            </div>
            <div className="flex flex-col items-center mt-8">
              <img src={assinatura} alt="assinatura" className="w-40 opacity-80" />
              <p className="mt-1 font-medium">{medico}</p>
              <p>CRM: ___________</p>
              <p className="text-neutral-400 text-sm mt-2">Projeto HC - ZypherX</p>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button className="btn" onClick={gerarAtestadoPDF}>
              Imprimir Atestado (PDF)
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
