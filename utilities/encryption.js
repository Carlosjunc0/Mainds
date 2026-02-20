const crypto = require('crypto')

const ENCRYPTION_SECRET = process.env.CONTACT_ENCRYPTION_KEY || 'ClaveDemoTemporalCambiarEnProduccion'
const ALGORITHM = 'aes-256-gcm'

function getKey() {
  return crypto.createHash('sha256').update(ENCRYPTION_SECRET).digest()
}

function encryptText(value) {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv)
  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return JSON.stringify({
    iv: iv.toString('hex'),
    tag: tag.toString('hex'),
    content: encrypted.toString('hex'),
  })
}

function decryptText(payload) {
  const parsed = JSON.parse(payload)
  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), Buffer.from(parsed.iv, 'hex'))
  decipher.setAuthTag(Buffer.from(parsed.tag, 'hex'))
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(parsed.content, 'hex')),
    decipher.final(),
  ])
  return decrypted.toString('utf8')
}

module.exports = {
  encryptText,
  decryptText,
}