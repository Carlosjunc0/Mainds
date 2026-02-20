const fs = require('fs/promises')
const path = require('path')
let pool = null

try {
  if (process.env.DATABASE_URL) {
    pool = require('../database')
  }
} catch (_error) {
  pool = null
}

const localDbPath = path.join(__dirname, '..', 'data', 'contacto_leads.json')

async function ensureLocalDb() {
  await fs.mkdir(path.dirname(localDbPath), { recursive: true })
  try {
    await fs.access(localDbPath)
  } catch {
    await fs.writeFile(localDbPath, JSON.stringify([]), 'utf8')
  }
}

async function initTable() {
  if (pool) {
    const query = `
      CREATE TABLE IF NOT EXISTS contacto_leads (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        lastname TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        comments TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `
    await pool.query(query)
    return
  }

  await ensureLocalDb()
}

async function createLead({ name, lastname, phone, email, comments }) {
  if (pool) {
    const sql = `
      INSERT INTO contacto_leads (name, lastname, phone, email, comments)
      VALUES ($1, $2, $3, $4, $5)
    `
    return pool.query(sql, [name, lastname, phone, email, comments])
  }

  await ensureLocalDb()
  const raw = await fs.readFile(localDbPath, 'utf8')
  const items = JSON.parse(raw)
  items.push({
    id: items.length ? items[0].id + 1 : 1,
    name,
    lastname,
    phone,
    email,
    comments,
    created_at: new Date().toISOString(),
  })
  await fs.writeFile(localDbPath, JSON.stringify(items, null, 2), 'utf8')
}

async function getLeads() {
  if (pool) {
    const sql = 'SELECT id, name, lastname, phone, email, comments, created_at FROM contacto_leads ORDER BY created_at DESC'
    const result = await pool.query(sql)
    return result.rows
  }

  await ensureLocalDb()
  const raw = await fs.readFile(localDbPath, 'utf8')
  const items = JSON.parse(raw)
  return items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
}

module.exports = {
  initTable,
  createLead,
  getLeads,
}