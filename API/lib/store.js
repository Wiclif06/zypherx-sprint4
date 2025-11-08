
import fs from 'fs'
import path from 'path'
const DB_PATH = path.resolve('./db.json')

export function load() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8')
    return JSON.parse(raw)
  } catch (e) {
    console.error('Erro ao ler db.json', e)
    return { pacientes: [], faq: [] }
  }
}

export function save(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8')
}
