const navBtn = document.getElementById('hamburgerBtn')
const nav = document.getElementById('mainNav')

if (navBtn && nav) {
  navBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open')
    navBtn.setAttribute('aria-expanded', String(open))
  })
}

// Lazy load hero background for better initial performance.
const lazyBlocks = document.querySelectorAll('.lazy-bg')
if ('IntersectionObserver' in window && lazyBlocks.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.backgroundImage = `url(${entry.target.dataset.bg})`
        observer.unobserve(entry.target)
      }
    })
  })
  lazyBlocks.forEach((block) => observer.observe(block))
}

const trabajosGrid = document.getElementById('trabajosGrid')
if (trabajosGrid) {
  fetch('/api/trabajos')
    .then((response) => response.json())
    .then((items) => {
      trabajosGrid.innerHTML = items
        .map((item) => `<article class="card"><h3>${item.titulo}</h3><p>${item.descripcion}</p></article>`)
        .join('')
    })
    .catch(() => {
      trabajosGrid.innerHTML = '<p>No fue posible cargar los trabajos en este momento.</p>'
    })
}

const contactForm = document.getElementById('contactForm')
const statusNode = document.getElementById('formStatus')
if (contactForm && statusNode) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const formData = new FormData(contactForm)
    const payload = Object.fromEntries(formData.entries())
    statusNode.textContent = 'Enviando solicitud...'

    const response = await fetch('/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })

    const body = await response.json()
    if (!response.ok) {
      statusNode.textContent = body.errors?.map((item) => item.msg).join(' | ') || 'No se pudo enviar.'
      statusNode.style.color = '#fca5a5'
      return
    }

    statusNode.textContent = 'Solicitud enviada correctamente.'
    statusNode.style.color = '#86efac'
    contactForm.reset()
  })
}