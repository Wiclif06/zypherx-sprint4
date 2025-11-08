
import { useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import QRCode from 'qrcode'
import logo from '@/assets/logo.png'
import assinatura from '@/assets/assinatura.png'
import type { Paciente } from '@/types'
import { PacientesAPI } from '@/services/api'

const sintomasComuns = [
  'Febre','Dor de cabeça','Dor no corpo','Tosse','Cansaço','Náusea','Vômito','Dor abdominal','Falta de ar',
  'Pressão alta','Tontura','Gripe','Infecção de garganta','Ansiedade','Depressão','Insônia','Dores musculares',
  'Alergia','Coceira','Calafrios','Perda de apetite','Dores nas articulações','Problemas digestivos','Fadiga',
  'Enjoo','Sinusite','Otite','Dor de ouvido','Dor nos olhos','Desmaios','Taquicardia','Dores nas costas','Outros'
]

const empty: Omit<Paciente,'id'> = { nome:'', cpf:'', idade:0, email:'', status:'ativo', historico:[] }

export default function Pacientes(){
  const [list, setList] = useState<Paciente[]>([])
  const [form, setForm] = useState<Omit<Paciente,'id'>>({...empty})
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [observacoes, setObservacoes] = useState('')
  const [message, setMessage] = useState('')
  const [err, setErr] = useState('')
  const [cpfBusca, setCpfBusca] = useState('')
  const [pacienteEncontrado, setPacienteEncontrado] = useState<Paciente | null>(null)
  const [mostrarConsultas, setMostrarConsultas] = useState(false)

  const [editingPaciente, setEditingPaciente] = useState<Paciente | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const [showAtestado, setShowAtestado] = useState(false)
  const [motivoAtestado, setMotivoAtestado] = useState('')
  const [diasAfast, setDiasAfast] = useState(1)
  const [medicoNome, setMedicoNome] = useState('')
  const [pacienteAtestado, setPacienteAtestado] = useState<Paciente | null>(null)
  const [consultaAtestado, setConsultaAtestado] = useState<any>(null)

  const load = async()=>{
    try{
      const data = await PacientesAPI.list()
      setList(data.items)
    }catch(e:any){ setErr(e.message ?? 'Erro ao carregar pacientes') }
  }
  useEffect(()=>{ load() }, [])

  const onSubmit = async (e: React.FormEvent)=>{
    e.preventDefault()
    setErr(''); setMessage('')
    const novaConsulta = { data: new Date().toLocaleString('pt-BR'), sintomas: selectedSymptoms, observacoes }
    const existente = list.find(p => p.cpf === form.cpf)
    try{
      if(existente){
        const historicoAtualizado = [...(existente.historico || []), novaConsulta]
        const atualizado = { ...existente, historico: historicoAtualizado }
        await PacientesAPI.update(existente.id!, atualizado)
        setMessage('Nova consulta adicionada à ficha existente!')
      } else {
        const novoPaciente = { ...form, historico: [novaConsulta] }
        await PacientesAPI.create(novoPaciente)
        setMessage('Paciente cadastrado com sucesso!')
      }
      setForm({...empty}); setSelectedSymptoms([]); setObservacoes('')
      await load()
    }catch{
      setErr('Erro ao salvar paciente.')
    }
  }

  const buscarFicha = ()=>{
    const encontrado = list.find(p=> p.cpf === cpfBusca)
    setPacienteEncontrado(encontrado || null)
  }

  const editarConsulta = (paciente: Paciente, index: number)=>{
    setEditingPaciente(paciente)
    setEditingIndex(index)
  }

  const salvarEdicao = async ()=>{
    if(!editingPaciente || editingIndex===null) return
    try{
      await PacientesAPI.update(editingPaciente.id!, editingPaciente)
      setMessage('Consulta atualizada com sucesso!')
      setEditingPaciente(null); setEditingIndex(null)
      await load()
    }catch{ setErr('Erro ao salvar alterações.') }
  }

  const deletarConsulta = async (paciente: Paciente, index: number)=>{
    if(!confirm('Deseja realmente excluir esta consulta?')) return
    const historicoAtualizado = paciente.historico?.filter((_,i)=> i!==index) || []
    const atualizado = { ...paciente, historico: historicoAtualizado }
    try{
      await PacientesAPI.update(paciente.id!, atualizado)
      setMessage('Consulta excluída com sucesso!')
      await load()
    }catch{ setErr('Erro ao excluir consulta.') }
  }

  function gerarCRM(){
    const num = Math.floor(10000 + Math.random()*90000)
    return `CRM-${num}-SP`
  }

const gerarAtestadoPDF = async () => {
  if (!pacienteAtestado || !consultaAtestado) return;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const margem = 20;

  doc.addImage(logo, 'PNG', margem, 10, 35, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('ZypherX – Plataforma de Atendimento Médico Inteligente', 105, 22, { align: 'center' });
  doc.setFontSize(12);
  doc.text('Hospital das Clínicas – Unidade Digital', 105, 29, { align: 'center' });
  doc.line(margem, 35, 210 - margem, 35);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('ATESTADO MÉDICO', 105, 55, { align: 'center' });

  const nome = pacienteAtestado.nome;
  const cpf = pacienteAtestado.cpf;
  const data = new Date().toLocaleDateString('pt-BR');
  const crm = gerarCRM();
  const motivo = motivoAtestado.trim() || consultaAtestado.observacoes || 'Afastamento conforme avaliação.';

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  const corpo = [
    `Declaro, para os devidos fins, que o(a) paciente ${nome}, portador(a) do CPF ${cpf},`,
    `foi atendido(a) nesta data e necessita de afastamento de suas atividades habituais por ${diasAfast} dia(s).`,
    ``,
    `Motivo/Observação: ${motivo}`,
    ``,
    `Data de emissão: ${data}.`
  ];

  let y = 80;
  corpo.forEach(line => {
    doc.text(line, 105, y, { align: 'center', maxWidth: 170 });
    y += 8;
  });

  doc.addImage(assinatura, 'PNG', 105 - 25, 200, 50, 18);
  doc.line(70, 215, 150, 215);
  const medico = medicoNome?.trim() ? medicoNome : 'Médico Responsável';
  doc.text(medico, 105, 223, { align: 'center' });
  doc.text(`${crm}`, 105, 230, { align: 'center' });

  const codigo = `${cpf}-${Date.now()}`;
  const qrData = await QRCode.toDataURL(codigo);
  doc.addImage(qrData, 'PNG', 20, 260, 25, 25);
  doc.setFontSize(10);
  doc.text(`Código de Autenticação: ${codigo}`, 105, 270, { align: 'center' });
  doc.text('Projeto HC - ZypherX | Documento oficial - Uso restrito médico', 105, 283, { align: 'center' });

  doc.save(`Atestado_${nome.replace(/\s/g, '_')}.pdf`);
  setShowAtestado(false);
};

  return (
    <section className="space-y-8 animate-fadeIn">
      {}
      <div className="card p-6 md:p-10">
        <h2 className="text-2xl font-bold mb-6">Gerenciamento de Pacientes</h2>

        <form className="grid md:grid-cols-2 gap-4" onSubmit={onSubmit}>
          <div><label className="label">Nome</label><input className="input" value={form.nome} onChange={e => setForm(s => ({ ...s, nome: e.target.value }))} required /></div>
          <div><label className="label">CPF</label><input className="input" value={form.cpf} onChange={e => setForm(s => ({ ...s, cpf: e.target.value }))} required /></div>
          <div><label className="label">Idade</label><input type="number" className="input" value={form.idade} onChange={e => setForm(s => ({ ...s, idade: Number(e.target.value) }))} required /></div>
          <div><label className="label">Email</label><input type="email" className="input" value={form.email} onChange={e => setForm(s => ({ ...s, email: e.target.value }))} required /></div>

          <div className="md:col-span-2">
            <label className="label">Sintomas (Selecione os que está sentindo)</label>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-64 overflow-y-auto border border-neutral-800 rounded-xl p-3">
              {sintomasComuns.map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm text-neutral-300">
                  <input type="checkbox" className="accent-brand-500"
                    checked={selectedSymptoms.includes(s)}
                    onChange={() => setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])} />
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="label">Observações</label>
            <textarea className="input min-h-[100px]" placeholder="Descreva brevemente seu estado atual..." value={observacoes} onChange={e => setObservacoes(e.target.value)} />
          </div>

          <div className="md:col-span-2 flex gap-2 mt-4 flex-wrap">
            <button className="btn" type="submit">Salvar / Atualizar Ficha</button>
            <button type="button" className="btn" onClick={() => { setForm({ ...empty }); setSelectedSymptoms([]); setObservacoes(''); }}>Limpar</button>
            <button type="button" className="btn" onClick={()=> setMostrarConsultas(prev=>!prev)}>{mostrarConsultas ? 'Fechar Consultas' : 'Ver Últimas Consultas'}</button>
          </div>
          {message && <p className="text-green-400 mt-2">{message}</p>}
          {err && <p className="text-red-400 mt-2">{err}</p>}
        </form>
      </div>

      {}
      <div className="card p-6 md:p-10 mt-6">
        <h3 className="text-xl font-bold mb-4">Consultar Ficha do Paciente</h3>
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <input className="input w-full md:w-1/2" placeholder="Digite o CPF..." value={cpfBusca} onChange={e => setCpfBusca(e.target.value)} />
          <button className="btn" onClick={buscarFicha}>Ver Ficha</button>
        </div>

        {pacienteEncontrado ? (
          <div className="border border-neutral-800 rounded-xl p-4 bg-neutral-900/40">
            <p><b>Nome:</b> {pacienteEncontrado.nome}</p>
            <p><b>CPF:</b> {pacienteEncontrado.cpf}</p>
            <p><b>Idade:</b> {pacienteEncontrado.idade}</p>
            <p><b>Email:</b> {pacienteEncontrado.email}</p>

            <h4 className="text-lg font-semibold mt-4">Histórico de Consultas</h4>
            {pacienteEncontrado.historico?.length ? (
              <ul className="space-y-3 mt-2">
                {pacienteEncontrado.historico.map((h, i) => (
                  <li key={i} className="border border-neutral-800 rounded-lg p-3">
                    <p className="text-sm text-neutral-400">{h.data}</p>
                    <p><b>Sintomas:</b> {h.sintomas.join(', ')}</p>
                    <p><b>Observações:</b> {h.observacoes}</p>
                    <div className="flex gap-2 mt-2">
                      <button className="btn" onClick={() => editarConsulta(pacienteEncontrado, i)}>Editar</button>
                      <button className="btn" onClick={() => deletarConsulta(pacienteEncontrado, i)}>Excluir</button>
                      <button className="btn" onClick={() => { setShowAtestado(true); setPacienteAtestado(pacienteEncontrado); setConsultaAtestado(h); setMotivoAtestado(h.observacoes || h.sintomas?.join(', ') || ''); }}>Emitir Atestado</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-neutral-400 mt-2">Nenhum histórico registrado.</p>
            )}
          </div>
        ) : (
          cpfBusca && <p className="text-neutral-400">Nenhum paciente encontrado com esse CPF.</p>
        )}
      </div>

      {}
      {mostrarConsultas && (
        <div className="card p-6 md:p-10 mt-6 animate-slideUp">
          <h3 className="text-xl font-bold mb-4">Últimas Consultas Registradas</h3>
          {list.length > 0 ? (
            <ul className="space-y-3">
              {list.map((p) =>
                p.historico?.map((h, i) => (
                  <li key={`${p.cpf}-${i}`} className="border border-neutral-800 rounded-lg p-3 bg-neutral-900/40">
                    {editingPaciente?.id === p.id && editingIndex === i ? (
                      <>
                        <p className="text-sm text-neutral-400">{h.data}</p>
                        <div className="grid sm:grid-cols-2 gap-2 mt-2">
                          <textarea className="input" value={h.observacoes} onChange={e => {
                            const updated = [...(editingPaciente.historico || [])]
                            updated[i].observacoes = e.target.value
                            setEditingPaciente({ ...editingPaciente, historico: updated })
                          }} />
                        </div>
                        <button className="btn mt-2" onClick={salvarEdicao}>Salvar</button>
                        <button className="btn mt-2" onClick={() => { setEditingPaciente(null); setEditingIndex(null) }}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        <p><b>{p.nome}</b> — CPF: {p.cpf}</p>
                        <p><b>Data:</b> {h.data}</p>
                        <p><b>Sintomas:</b> {h.sintomas.join(', ')}</p>
                        <p><b>Observações:</b> {h.observacoes}</p>
                        <div className="flex gap-2 mt-2">
                          <button className="btn" onClick={() => editarConsulta(p, i)}>Editar</button>
                          <button className="btn" onClick={() => deletarConsulta(p, i)}>Excluir</button>
                          <button className="btn" onClick={() => { setShowAtestado(true); setPacienteAtestado(p); setConsultaAtestado(h); setMotivoAtestado(h.observacoes || h.sintomas?.join(', ') || ''); }}>Emitir Atestado</button>
                        </div>
                      </>
                    )}
                  </li>
                ))
              )}
            </ul>
          ) : (
            <p className="text-neutral-400">Nenhum paciente registrado.</p>
          )}
        </div>
      )}

      {}
      {showAtestado && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="card p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Emitir Atestado — {pacienteAtestado?.nome}</h3>
            <div className="grid gap-3">
              <div>
                <label className="label">Nome do médico (opcional)</label>
                <input className="input" placeholder="Ex.: Dr. João R. da Silva" value={medicoNome} onChange={e => setMedicoNome(e.target.value)} />
              </div>
              <div>
                <label className="label">Dias de afastamento</label>
                <input type="number" className="input" min={1} value={diasAfast} onChange={e => setDiasAfast(Number(e.target.value))} />
              </div>
              <div>
                <label className="label">Motivo do afastamento</label>
                <textarea className="input min-h-[100px]" placeholder="Descreva o motivo..." value={motivoAtestado} onChange={e => setMotivoAtestado(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="btn" onClick={()=> setShowAtestado(false)}>Cancelar</button>
              <button className="btn" onClick={gerarAtestadoPDF}>Gerar PDF</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
