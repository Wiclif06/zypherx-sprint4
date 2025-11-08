import { useEffect, useState } from 'react'
import type { Paciente, WithTimestamps } from '@/types'
import { PacientesAPI } from '@/services/api'

type Row = WithTimestamps<Paciente>
const empty: Omit<Paciente, 'id'> = { nome: '', idade: 0, email: '', status: 'ativo' }

export default function Pacientes() {
  const [list, setList] = useState<Row[]>([])
  const [filtered, setFiltered] = useState<Row[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [form, setForm] = useState<Omit<Paciente, 'id'>>({ ...empty })
  const [editingId, setEditingId] = useState<number | string | null>(null)
  const [message, setMessage] = useState<string>('')
  const [step, setStep] = useState<number>(1)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('todos')

  const load = async () => {
    setLoading(true)
    setErr(null)
    try {
      const data = await PacientesAPI.list()
      setList(data.items)
      setFiltered(data.items)
      setTotal(data.total)
    } catch (e: any) {
      setErr(e.message ?? 'Erro ao carregar pacientes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filterList = (term: string, status: string) => {
    let temp = [...list]
    if (term.trim() !== '') {
      temp = temp.filter(p =>
        p.nome.toLowerCase().includes(term.toLowerCase()) ||
        p.email.toLowerCase().includes(term.toLowerCase())
      )
    }
    if (status !== 'todos') {
      temp = temp.filter(p => p.status === status)
    }
    setFiltered(temp)
  }

  useEffect(() => {
    filterList(search, filterStatus)
  }, [search, filterStatus, list])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)
    setMessage('')
    setLoading(true)
    try {
      if (editingId != null) {
        await PacientesAPI.update(editingId, form)
        setMessage('Paciente atualizado com sucesso.')
      } else {
        await PacientesAPI.create(form)
        setMessage('Paciente cadastrado com sucesso.')
      }
      setForm({ ...empty })
      setEditingId(null)
      setStep(1)
      await load()
    } catch (e: any) {
      setErr('Falha ao salvar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const onEdit = (row: Row) => {
    setEditingId(row.id)
    setForm({ nome: row.nome, idade: row.idade, email: row.email, status: row.status })
    setStep(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onDelete = async (id: number | string) => {
    if (!confirm('Deseja realmente excluir este paciente?')) return
    try {
      await PacientesAPI.remove(id)
      setMessage('Paciente removido com sucesso.')
      await load()
    } catch (e: any) {
      setErr('Erro ao remover paciente.')
    }
  }

  const nextStep = () => setStep(2)
  const prevStep = () => setStep(1)

  return (
    <section className="space-y-8 animate-fadeIn">
      <div className="card p-6 md:p-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Gerenciamento de Pacientes</h2>
          <button onClick={load} className="btn">Atualizar</button>
        </div>

        <div className="flex justify-center mt-6 gap-4">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Formulário</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Lista</div>
        </div>

        {}
        {step === 1 && (
          <form className="mt-8 grid md:grid-cols-2 gap-4" onSubmit={onSubmit}>
            <div>
              <label className="label">Nome</label>
              <input className="input" value={form.nome} onChange={e => setForm(s => ({ ...s, nome: e.target.value }))} required />
            </div>
            <div>
              <label className="label">Idade</label>
              <input type="number" className="input" value={form.idade} onChange={e => setForm(s => ({ ...s, idade: Number(e.target.value) }))} required />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" className="input" value={form.email} onChange={e => setForm(s => ({ ...s, email: e.target.value }))} required />
            </div>
            <div>
              <label className="label">Status</label>
              <select className="input" value={form.status} onChange={e => setForm(s => ({ ...s, status: e.target.value as any }))}>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
            <div className="md:col-span-2 flex items-center gap-2 mt-4">
              <button className="btn" type="submit">{editingId ? 'Salvar alterações' : 'Cadastrar'}</button>
              {editingId && (
                <button type="button" className="btn" onClick={() => { setEditingId(null); setForm({ ...empty }) }}>
                  Cancelar
                </button>
              )}
              <button type="button" className="btn" onClick={nextStep}>Ver lista</button>
            </div>
            {message && <p className="text-green-400 mt-2">{message}</p>}
            {err && <p className="text-red-400 mt-2">{err}</p>}
          </form>
        )}

        {}
        {step === 2 && (
          <div className="mt-8 animate-slideUp">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h3 className="text-xl font-semibold">Pacientes cadastrados ({filtered.length})</h3>
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  placeholder="Buscar por nome ou email..."
                  className="input w-48 md:w-64"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select
                  className="input w-32"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="todos">Todos</option>
                  <option value="ativo">Ativos</option>
                  <option value="inativo">Inativos</option>
                </select>
                <button className="btn" onClick={prevStep}>← Voltar</button>
              </div>
            </div>

            {loading && <p className="muted">Carregando...</p>}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left border-b border-neutral-800">
                  <tr>
                    <th className="py-2 pr-4">ID</th>
                    <th className="py-2 pr-4">Nome</th>
                    <th className="py-2 pr-4">Idade</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr key={row.id} className="border-b border-neutral-900 hover:bg-neutral-900/40 transition">
                      <td className="py-2 pr-4 font-mono">{row.id}</td>
                      <td className="py-2 pr-4">{row.nome}</td>
                      <td className="py-2 pr-4">{row.idade}</td>
                      <td className="py-2 pr-4">{row.email}</td>
                      <td className="py-2 pr-4 capitalize">{row.status}</td>
                      <td className="py-2 pr-4 flex gap-2">
                        <button className="btn" onClick={() => onEdit(row)}>Editar</button>
                        <button className="btn" onClick={() => onDelete(row.id)}>Excluir</button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center muted">
                        Nenhum paciente encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}