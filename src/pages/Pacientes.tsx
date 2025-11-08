
import { useEffect, useState } from 'react'
import type { Paciente, WithTimestamps, ApiList } from '@/types'
import { PacientesAPI } from '@/services/api'

type Row = WithTimestamps<Paciente>
const empty: Omit<Paciente,'id'> = { nome:'', idade:0, email:'', status:'ativo' }

export default function Pacientes() {
  const [list, setList] = useState<Row[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string|null>(null)
  const [form, setForm] = useState<Omit<Paciente,'id'>>({...empty})
  const [editingId, setEditingId] = useState<number|string|null>(null)
  const [message, setMessage] = useState<string>('')

  const load = async () => {
    setLoading(true); setErr(null)
    try {
      const data = await PacientesAPI.list()
      setList(data.items); setTotal(data.total)
    } catch (e:any) {
      setErr(e.message ?? 'Erro ao carregar')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(null); setMessage('')
    try {
      if (editingId != null) {
        await PacientesAPI.update(editingId, form)
        setMessage('Paciente atualizado com sucesso.')
      } else {
        await PacientesAPI.create(form)
        setMessage('Paciente criado com sucesso.')
      }
      setForm({...empty}); setEditingId(null)
      await load()
    } catch (e:any) {
      setErr(e.message ?? 'Falha no envio')
    }
  }

  const onEdit = (row: Row) => {
    setEditingId(row.id)
    setForm({ nome: row.nome, idade: row.idade, email: row.email, status: row.status })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onDelete = async (id: number|string) => {
    if (!confirm('Confirma remover este paciente?')) return
    try {
      await PacientesAPI.remove(id)
      setMessage('Paciente removido.')
      await load()
    } catch (e:any) {
      setErr(e.message ?? 'Falha ao remover')
    }
  }

  return (
    <section className="space-y-8">
      <div className="card p-6 md:p-10">
        <h2 className="text-2xl font-bold">{editingId ? 'Editar Paciente' : 'Novo Paciente'}</h2>
        <form className="mt-6 grid md:grid-cols-2 gap-4" onSubmit={onSubmit}>
          <div>
            <label className="label">Nome</label>
            <input className="input" value={form.nome} onChange={e=>setForm(s=>({...s, nome:e.target.value}))} required />
          </div>
          <div>
            <label className="label">Idade</label>
            <input type="number" className="input" value={form.idade} onChange={e=>setForm(s=>({...s, idade:Number(e.target.value)}))} required />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" value={form.email} onChange={e=>setForm(s=>({...s, email:e.target.value}))} required />
          </div>
          <div>
            <label className="label">Status</label>
            <select className="input" value={form.status} onChange={e=>setForm(s=>({...s, status:e.target.value as any}))}>
              <option value="ativo">ativo</option>
              <option value="inativo">inativo</option>
            </select>
          </div>
          <div className="md:col-span-2 flex items-center gap-2">
            <button className="btn" type="submit">{editingId ? 'Salvar alterações' : 'Cadastrar'}</button>
            {editingId && <button type="button" className="btn" onClick={()=>{setEditingId(null); setForm({...empty})}}>Cancelar</button>}
            {loading && <span className="muted">carregando...</span>}
          </div>
        </form>
        {message && <p className="text-green-400 mt-2">{message}</p>}
        {err && <p className="text-red-400 mt-2">{err}</p>}
      </div>

      <div className="card p-6 md:p-10">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Pacientes ({total})</h3>
          <button className="btn" onClick={load}>Atualizar</button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left">
              <tr className="border-b border-neutral-800">
                <th className="py-2 pr-4">ID</th>
                <th className="py-2 pr-4">Nome</th>
                <th className="py-2 pr-4">Idade</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {list.map(row => (
                <tr key={row.id} className="border-b border-neutral-900">
                  <td className="py-2 pr-4 font-mono">{row.id}</td>
                  <td className="py-2 pr-4">{row.nome}</td>
                  <td className="py-2 pr-4">{row.idade}</td>
                  <td className="py-2 pr-4">{row.email}</td>
                  <td className="py-2 pr-4">{row.status}</td>
                  <td className="py-2 pr-4 flex gap-2">
                    <button className="btn" onClick={()=>onEdit(row)}>Editar</button>
                    <button className="btn" onClick={()=>onDelete(row.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && !loading && (
                <tr><td colSpan={6} className="py-6 text-center muted">Nenhum paciente encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
