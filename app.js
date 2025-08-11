// Tabs
const tabs = document.querySelectorAll('.tab');
const sections = {
  cotizador: document.getElementById('cotizador'),
  agenda: document.getElementById('agenda'),
  pedidos: document.getElementById('pedidos'),
};
tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x => x.classList.remove('active'));
  t.classList.add('active');
  Object.keys(sections).forEach(k => sections[k].style.display = 'none');
  sections[t.dataset.tab].style.display = 'block';
}));

// Dummy cotizador
document.getElementById('btnCotizar').addEventListener('click', () => {
  const ancho = parseFloat(document.getElementById('ancho').value || 0);
  const alto = parseFloat(document.getElementById('alto').value || 0);
  const producto = document.getElementById('producto').value;
  const tejido = document.getElementById('tejido').value;
  const accionamiento = document.getElementById('accionamiento').value;

  if (ancho <= 0 || alto <= 0) {
    document.getElementById('resultado').textContent = 'Ingresa medidas válidas.';
    return;
  }
  const m2 = (ancho/100) * (alto/100);
  // Precios de muestra (reemplazar con tu tabla real)
  const base = { 'Enrollables': 800, 'Sheer Elegance': 1100, 'Panel Japonés': 950 }[producto] || 800;
  const tejidoFactor = { 'Screen 5%': 1.0, 'Screen 1%': 1.1, 'Blackout': 1.2 }[tejido] || 1.0;
  const extra = accionamiento === 'Motorizada' ? 2500 : 0;
  const total = Math.round(m2 * base * tejidoFactor + extra);
  document.getElementById('resultado').textContent =
    `Precio estimado: $${total.toLocaleString('es-MX')} MXN (no vinculante)`;
});

// Dummy export PDF
document.getElementById('btnPDF').addEventListener('click', () => {
  alert('Generación de PDF pendiente: en el MVP conectaremos una librería como jsPDF.');
});

// Share API
document.getElementById('btnShare').addEventListener('click', async () => {
  try {
    await navigator.share({
      title: 'Cotización Hamilton',
      text: document.getElementById('resultado').textContent || 'Cotización',
    });
  } catch (e) {
    alert('Compartir no disponible en este dispositivo.');
  }
});

// Agenda (localStorage)
const agendaLista = document.getElementById('agendaLista');
document.getElementById('btnAgendar').addEventListener('click', () => {
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const cliente = document.getElementById('cliente').value.trim();
  if (!fecha || !hora || !cliente) { alert('Completa los campos.'); return; }
  const item = { id: Date.now(), fecha, hora, cliente };
  const items = JSON.parse(localStorage.getItem('agenda') || '[]');
  items.push(item);
  localStorage.setItem('agenda', JSON.stringify(items));
  renderAgenda();
});

function renderAgenda() {
  const items = JSON.parse(localStorage.getItem('agenda') || '[]')
    .sort((a,b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora));
  if (!items.length) { agendaLista.textContent = 'Sin eventos.'; return; }
  agendaLista.innerHTML = items.map(i => `
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div><strong>${i.cliente}</strong></div>
          <div class="sub">${i.fecha} — ${i.hora}</div>
        </div>
        <button data-del="${i.id}">Eliminar</button>
      </div>
    </div>
  `).join('');
  agendaLista.querySelectorAll('button[data-del]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-del');
      const items = JSON.parse(localStorage.getItem('agenda') || '[]').filter(x => String(x.id) !== String(id));
      localStorage.setItem('agenda', JSON.stringify(items));
      renderAgenda();
    });
  });
}
renderAgenda();

// Simple pedidos (placeholder)
document.getElementById('pedidosLista').innerHTML = `
  <div class="card">
    <div><strong>HJ-0001</strong> — En producción</div>
    <div class="sub">Cliente: Residencial Valle — Fecha: 2025-08-05</div>
  </div>
`;

// PWA registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

// Install prompt
let deferredPrompt;
const banner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');
const dismissBtn = document.getElementById('dismissInstall');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  banner.classList.add('show');
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') banner.classList.remove('show');
  deferredPrompt = null;
});

dismissBtn.addEventListener('click', () => banner.classList.remove('show'));