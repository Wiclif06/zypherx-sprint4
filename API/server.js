
import express from 'express'
import cors from 'cors'
import { load, save } from './lib/store.js'
import { nanoid } from 'nanoid'

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.json({ ok: true, name: 'ZypherX API', version: '1.0.0' }))

// Namespace /api
const api = express.Router()
app.use('/api', api)

// Pacientes CRUD
api.get('/pacientes', (req, res) => {
  const db = load()
  res.json({ items: db.pacientes, total: db.pacientes.length })
})

api.get('/pacientes/:id', (req, res) => {
  const db = load()
  const p = db.pacientes.find(x => String(x.id) === String(req.params.id))
  if (!p) return res.status(404).json({ error: 'Paciente não encontrado' })
  res.json(p)
})

api.post('/pacientes', (req, res) => {
  const db = load()
  const body = req.body || {}
  const now = new Date().toISOString()
  const novo = {
    id: Number.isFinite(body.id) ? body.id : nanoid(8),
    nome: body.nome ?? '',
    idade: Number(body.idade ?? 0),
    email: body.email ?? '',
    status: body.status === 'inativo' ? 'inativo' : 'ativo',
    createdAt: now, updatedAt: now
  }
  db.pacientes.push(novo)
  save(db)
  res.status(201).json(novo)
})

api.put('/pacientes/:id', (req, res) => {
  const db = load()
  const idx = db.pacientes.findIndex(x => String(x.id) === String(req.params.id))
  if (idx < 0) return res.status(404).json({ error: 'Paciente não encontrado' })
  const now = new Date().toISOString()
  db.pacientes[idx] = { ...db.pacientes[idx], ...req.body, updatedAt: now }
  save(db)
  res.json(db.pacientes[idx])
})

api.delete('/pacientes/:id', (req, res) => {
  const db = load()
  const idx = db.pacientes.findIndex(x => String(x.id) === String(req.params.id))
  if (idx < 0) return res.status(404).json({ error: 'Paciente não encontrado' })
  db.pacientes.splice(idx, 1)
  save(db)
  res.status(204).send()
})

// FAQ
api.get('/faq', (req, res) => {
  const db = load()
  res.json(db.faq)
})

// Contato
api.post('/contato', (req, res) => {
  const body = req.body || {}
  // Aqui só simulamos o envio — poderia salvar em arquivo/log
  res.status(201).json({ ok: true, received: body })
})

app.listen(PORT, () => {
  console.log(`ZypherX API rodando em http://localhost:${PORT}`)
})
