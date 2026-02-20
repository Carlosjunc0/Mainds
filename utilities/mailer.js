async function sendLeadEmail({ name, lastname, phone, email, comments }) {
  const endpoint = `https://formsubmit.co/ajax/maquinados.indelsur@gmail.com`
  const payload = {
    name: `${name} ${lastname}`,
    phone,
    email,
    message: comments,
    _subject: 'Nueva solicitud de cotización - MAINDS',
    _template: 'table',
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    return response.ok
  } catch (_error) {
    return false
  }
}

module.exports = { sendLeadEmail }