/**
 * SICS MANTENIMIENTO & ZONA 3 — GESTIÓN OPERATIVA DE ESCALAMIENTOS 2.0
 * Airtek Internet — Control y Seguimiento en Vivo
 * Desarrollado para Moisés González (Analista de Zona / Despacho)
 */

document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'SICS_ESCALAMIENTOS_ZONA3_2026';
  const THEME_KEY = 'SICS_THEME_MODE';
  const CLOUD_URL_KEY = 'sics_cloud_url';
  const DEFAULT_CLOUD_URL = 'https://script.google.com/macros/s/AKfycbx4W5Rf5n4M80cG0MtgOksbU03FAxWtB5UxfDalVmbeykOKfvBhLk8iTD-ylrC9AJNgeA/exec';

  // 1. DICCIONARIO MAESTRO DE MDTs DE TODAS LAS ZONAS (1,690 MDTs)
  const MDT_SECTOR_MAP = (window.MDT_SECTOR_MAP && Object.keys(window.MDT_SECTOR_MAP).length > 0)
    ? window.MDT_SECTOR_MAP
    : {
    "MSR093": "Centro I", "MSR084": "Centro I", "MSR083": "Centro I", "MSR085": "Centro I", "MSR069": "Centro I", "MSR082": "Centro I", "MSR078": "Centro I", "MSR081": "Centro I", "MSR079": "Centro I",
    "MCN021": "La Concepción", "MCN023": "La Concepción", "MCN020": "La Concepción", "MCN019": "La Concepción", "MCN018": "La Concepción", "MCN012": "La Concepción", "MCN011": "La Concepción", "MCN010": "La Concepción", "MCN008": "La Concepción", "MCN007": "La Concepción", "MCN006": "La Concepción", "MCN005": "La Concepción", "MCN004": "La Concepción", "MCN003": "La Concepción", "MCN002": "La Concepción", "MCN001": "La Concepción",
    "MSR068": "Centro II", "MSR070": "Centro II", "MSR067": "Centro II", "MSR076": "Centro II", "MSR074": "Centro II", "MSR077": "Centro II", "MSR075": "Centro III", "MSR080": "Centro III", "MSR072": "Centro III", "MSR073": "Centro III", "MSR071": "Centro III", "MSR053": "Centro III", "MSR054": "Barrio Bolívar", "MSR056": "Centro III", "MSR055": "Barrio Bolívar", "MSR052": "Centro IV", "MSR051": "Centro IV", "MSR059": "Centro IV", "MSR057": "Centro IV", "MSR060": "Centro IV", "MSR061": "Centro IV", "MSR062": "Centro V", "MSR064": "Centro V", "MSR063": "Centro V", "MSR058": "Centro V", "MSR065": "Centro V", "MSR066": "Centro V",
    "MLT010": "Las Tunas 1-5", "MLT083": "Las Tunas 1-5", "MLT014": "Las Tunas 1-5", "MLT012": "Las Tunas 1-5", "MLT013": "Las Tunas 1-5", "MLT015": "Las Tunas 1-5", "MLT075": "Las Tunas 1-5", "MLT074": "Las Tunas 1-5", "MLT005": "Las Tunas 1-5", "MLT003": "Las Tunas 1-5", "MLT082": "Las Tunas 1-5", "MLT016": "Las Tunas 1-5", "MLT108": "Las Tunas 1-5", "MLT009": "Las Tunas 1-5", "MLT030": "Las Tunas 1-5", "MLT028": "Las Tunas 1-5", "MLT029": "Las Tunas 1-5", "MLT084": "Las Tunas 1-5", "MLT031": "Las Tunas 1-5", "MLT027": "Las Tunas 1-5", "MLT025": "Las Tunas 1-5", "MLT026": "Las Tunas 1-5", "MLT011": "Las Tunas 1-5", "MLT008": "Las Tunas 1-5", "MLT032": "Las Tunas 1-5",
    "MLT072": "Rotaria", "MLT054": "Rotaria", "MLT021": "Rotaria", "MLT081": "Rotaria", "MLT020": "Rotaria",
    "MLT076": "Las Tunas 1-5", "MLT024": "Las Tunas 1-5", "MLT023": "Las Tunas 1-5", "MLT017": "Las Tunas 1-5", "MLT022": "Las Tunas 1-5", "MLT006": "Las Tunas 1-5", "MLT007": "Las Tunas 1-5", "MLT018.1": "Las Tunas 1-5", "MLT019": "Las Tunas 1-5", "MLT040": "Las Tunas 1-5", "MLT002": "Las Tunas 1-5", "MLT001": "Las Tunas 1-5", "MLT039": "Las Tunas 1-5", "MLT041": "Las Tunas 1-5", "MLT004": "Las Tunas 1-5", "MLT071": "Las Tunas 1-5", "MLT058": "Las Tunas 1-5", "MLT055": "Las Tunas 1-5", "MLT056": "Las Tunas 1-5", "MLT059": "Las Tunas 1-5", "MLT057": "Las Tunas 1-5", "MLT053": "Las Tunas 1-5", "MLT018": "Las Tunas 1-5",
    "MLT042": "Olivos 1-4", "MLT046": "Olivos 1-4", "MLT045": "Olivos 1-4", "MLT043": "Olivos 1-4", "MLT044": "Olivos 1-4", "MLT052": "Olivos 1-4", "MLT051": "Olivos 1-4", "MLT050": "Olivos 1-4", "MLT115": "Olivos 1-4", "MLT063": "Olivos 1-4", "MLT062": "Olivos 1-4", "MLT049": "Olivos 1-4", "MLT088": "Olivos 1-4", "MLT078": "Olivos 1-4", "MLT077": "Olivos 1-4", "MLT047": "Olivos 1-4", "MLT048": "Olivos 1-4", "MLT064": "Olivos 1-4", "MLT085": "Olivos 1-4", "MLT069": "Olivos 1-4", "MLT070": "Olivos 1-4", "MLT068": "Olivos 1-4", "MLT065": "Olivos 1-4", "MLT066": "Olivos 1-4", "MLT067": "Olivos 1-4", "MLT060": "Olivos 1-4", "MLT061": "Olivos 1-4", "MLT110": "Olivos 1-4", "MLT111": "Olivos 1-4", "MLT112": "Olivos 1-4", "MLT114": "Olivos 1-4", "MLT113": "Olivos 1-4", "MLT079.1": "Olivos 1-4", "MLT079": "Olivos 1-4", "MLT080": "Olivos 1-4", "MLT089": "Olivos 1-4",
    "MLT073": "Villa Baralt", "MSR043": "Villa Baralt", "MSR040": "Villa Baralt", "MSR041": "Villa Baralt", "MSR045": "Villa Baralt", "MSR046": "Villa Baralt", "MSR044": "Villa Baralt", "MLT087": "Villa Baralt", "MSR050": "Villa Baralt", "MLT086": "Villa Baralt", "MLT038": "Villa Baralt", "MLT037": "Villa Baralt", "MLT036": "Villa Baralt", "MLT035": "Villa Baralt", "MLT033": "Villa Baralt", "MLT034": "Villa Baralt",
    "MSR036": "San Isidro", "MSR035": "San Isidro", "MSR094": "San Isidro", "MSR047": "San Isidro", "MSR048": "San Isidro", "MSR049": "San Isidro", "MSR033": "San Isidro", "MSR034": "San Isidro", "MSR031": "San Isidro", "MSR039": "San Isidro", "MSR037": "San Isidro", "MSR042": "San Isidro", "MSR030": "San Isidro", "MSR038": "San Isidro",
    "MSR092": "Chamarreta", "MSR089": "Chamarreta", "MSR090": "Chamarreta", "MSR086": "Chamarreta", "MSR087": "Chamarreta", "MSR091": "Chamarreta", "MSR088": "Chamarreta", "MSR020": "Chamarreta", "MSR014": "Chamarreta", "MSR016": "Chamarreta", "MSR019": "Chamarreta", "MSR018": "Chamarreta", "MSR017": "Chamarreta", "MSR013": "Chamarreta", "MSR015": "Chamarreta", "MSR011": "Chamarreta", "MSR010": "Chamarreta", "MSR009": "Chamarreta", "MSR012": "Chamarreta",
    "MSR021": "Barrio Bolívar", "MSR008": "Barrio Bolívar", "MSR007": "Barrio Bolívar", "MSR001": "Chamarreta", "MSR004": "Barrio Bolívar", "MSR005": "Barrio Bolívar",
    "MSR006": "San Rafael", "MSR026": "San Rafael", "MSR028": "San Rafael", "MSR027": "San Rafael", "MSR025": "San Rafael", "MSR029": "San Rafael", "MSR024": "San Rafael",
    "MSR022": "Chamarreta", "MSR002": "Chamarreta", "MSR003": "Chamarreta", "MSR023": "Chamarreta", "MSR032": "Chamarreta", "MSR000": "Chamarreta",
    "MLV001": "La Villa", "MLV002": "La Villa", "MLV003": "La Villa", "MLV004": "La Villa", "MLV016": "La Villa", "MLV017": "La Villa", "MLV020": "La Villa", "MLV021": "La Villa", "MLV022": "La Villa", "MLV023": "La Villa", "MLV024": "La Villa", "MLV025": "La Villa", "MLV005": "La Villa", "MLV007": "La Villa", "MLV008": "La Villa", "MLV009": "La Villa", "MLV010": "La Villa", "MLV011": "La Villa", "MLV012": "La Villa", "MLV006": "La Villa", "MLV013": "La Villa", "MLV014": "La Villa", "MLV015": "La Villa", "MLV018": "La Villa", "MLV019": "La Villa",
    "MBR001": "Barranquitas", "MBR002": "Barranquitas", "MBR003": "Barranquitas", "MBR004": "Barranquitas", "MBR005": "Barranquitas"
  };

  // 2. DATOS INICIALES
  const defaultCases = [
    {
      id: 'case_315484',
      orden: '315484',
      ticket: '4225772',
      supervisor: 'Roberto Carrillo',
      zona: 'La Villa',
      mdt: 'MLV003',
      cliente: 'Xiomara Elena Gonzalez Gonzalez',
      cedula: '12344292',
      telefono: '0412-7860689',
      direccion: 'Los Prados, A Tres Casas De La Casa De Bases De Misiones',
      cuadrilla: 'Luis Gómez / La Villa Zona 3',
      solicitado_por: 'Cecilia Jenny Espinoza (Zendesk)',
      prioridad: 'MEDIA',
      estado: 'En Ruta / En Sitio',
      motivo: 'Reubicación de equipo / acometida',
      avance: 'Cliente desea reubicar equipo en otro punto estratégico // validar red interna.',
      timestamp: Date.now() - (35 * 60 * 1000)
    },
    {
      id: 'case_498085',
      orden: '498085',
      ticket: '',
      supervisor: 'Roberto Carrillo',
      zona: 'Barranquitas',
      mdt: 'MBR001',
      cliente: 'LIGIA ELENA ATENCIO VARGAS',
      cedula: 'V-15661446',
      telefono: '0412-7860596',
      direccion: 'CALLE PRINCIPAL CASA S/N SECTOR LA PLAYA',
      cuadrilla: 'José Hernández',
      solicitado_por: 'Yarelis Irenis Marín Pacheco',
      prioridad: 'ALTA',
      estado: 'Escalado',
      motivo: 'Instalación de servicio por reconexión (cliente recuperado)',
      avance: 'Pendiente confirmación de despacho para zona foránea.',
      timestamp: Date.now() - (75 * 60 * 1000)
    }
  ];

  let cases = loadCases();

  function loadCases() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error cargando casos:', e);
    }
    return defaultCases;
  }

  function saveCases() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
    } catch (e) {
      console.error('Error guardando casos:', e);
    }
  }

  // 3. ELEMENTOS DEL DOM
  const casesContainer = document.getElementById('casesContainer');
  const emptyState = document.getElementById('emptyState');
  const kpiPendientes = document.getElementById('kpiPendientes');
  const kpiCriticos = document.getElementById('kpiCriticos');
  const kpiResueltos = document.getElementById('kpiResueltos');
  const countFiltrados = document.getElementById('countFiltrados');

  const inputBuscar = document.getElementById('inputBuscar');
  const filtroSupervisor = document.getElementById('filtroSupervisor');
  const filtroSolicitante = document.getElementById('filtroSolicitante');
  const filtroZona = document.getElementById('filtroZona');
  const filtroEstado = document.getElementById('filtroEstado');
  const btnLimpiarFiltros = document.getElementById('btnLimpiarFiltros');

  const modalBackdrop = document.getElementById('modalCaseBackdrop');
  const btnNuevo = document.getElementById('btnNuevoEscalamiento');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCancelModal = document.getElementById('btnCancelModal');
  const caseForm = document.getElementById('caseForm');
  const btnAutoParse = document.getElementById('btnAutoParse');
  const rawOrderText = document.getElementById('rawOrderText');
  const btnCopiarResumenWhatsApp = document.getElementById('btnCopiarResumenWhatsApp');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const btnExportar = document.getElementById('btnExportar');

  // Nube Sheets
  const btnSyncCloud = document.getElementById('btnSyncCloud');
  const btnConfigCloud = document.getElementById('btnConfigCloud');
  const modalCloudBackdrop = document.getElementById('modalCloudBackdrop');
  const btnCloseCloudModal = document.getElementById('btnCloseCloudModal');
  const btnCancelCloudModal = document.getElementById('btnCancelCloudModal');
  const btnSaveCloudUrl = document.getElementById('btnSaveCloudUrl');
  const inputCloudUrl = document.getElementById('inputCloudUrl');

  // 4. CONTROL DE TEMA OSCURO / CLARO
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeIcon) themeIcon.className = 'fas fa-sun';
    } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeIcon) themeIcon.className = 'fas fa-moon';
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.body.classList.contains('light-mode') ? 'light' : 'dark';
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  // 5. CÁLCULO DE TIEMPO TRANSCURRIDO Y ALERTA >2 HORAS
  function formatElapsedTime(timestamp) {
    if (!timestamp) return 'Reciente';
    const diffMs = Date.now() - Number(timestamp);
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Hace instantes';
    if (mins < 60) return `Hace ${mins} min`;
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `Hace ${hours}h ${remMins}m`;
  }

  function getElapsedMinutes(timestamp) {
    if (!timestamp) return 0;
    return Math.floor((Date.now() - Number(timestamp)) / 60000);
  }

  // 6. RENDERIZAR TARJETAS
  function renderCases() {
    const q = (inputBuscar.value || '').toLowerCase().trim();
    const supFilter = filtroSupervisor.value;
    const solFilter = filtroSolicitante.value;
    const zonaFilter = filtroZona.value;
    const estadoFilter = filtroEstado.value;

    const filtered = cases.filter(c => {
      const matchQ = !q || (
        (c.orden && c.orden.toLowerCase().includes(q)) ||
        (c.ticket && c.ticket.toLowerCase().includes(q)) ||
        (c.cliente && c.cliente.toLowerCase().includes(q)) ||
        (c.cedula && c.cedula.toLowerCase().includes(q)) ||
        (c.mdt && c.mdt.toLowerCase().includes(q)) ||
        (c.motivo && c.motivo.toLowerCase().includes(q)) ||
        (c.cuadrilla && c.cuadrilla.toLowerCase().includes(q)) ||
        (c.solicitado_por && c.solicitado_por.toLowerCase().includes(q)) ||
        (c.direccion && c.direccion.toLowerCase().includes(q))
      );
      const matchSup = !supFilter || c.supervisor === supFilter;
      const matchSol = !solFilter || (c.solicitado_por && c.solicitado_por.includes(solFilter));
      const matchZona = !zonaFilter || c.zona === zonaFilter;
      const matchEstado = !estadoFilter || c.estado === estadoFilter;
      return matchQ && matchSup && matchSol && matchZona && matchEstado;
    });

    if (countFiltrados) countFiltrados.textContent = filtered.length;

    // KPIs Globales
    const pendientes = cases.filter(c => c.estado !== 'Resuelto').length;
    const criticos = cases.filter(c => c.prioridad === 'CRÍTICA' && c.estado !== 'Resuelto').length;
    const resueltos = cases.filter(c => c.estado === 'Resuelto').length;

    if (kpiPendientes) kpiPendientes.textContent = pendientes;
    if (kpiCriticos) kpiCriticos.textContent = criticos;
    if (kpiResueltos) kpiResueltos.textContent = resueltos;

    if (filtered.length === 0) {
      casesContainer.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    casesContainer.innerHTML = filtered.map(c => {
      const isResuelto = c.estado === 'Resuelto';
      const isDiferido = c.estado === 'Diferido';
      const badgePrioClass = c.prioridad === 'CRÍTICA' ? 'prio-critica' : (c.prioridad === 'ALTA' ? 'prio-alta' : 'prio-media');
      const timeStr = formatElapsedTime(c.timestamp);
      const elapsedMins = getElapsedMinutes(c.timestamp);
      const isLate = !isResuelto && !isDiferido && elapsedMins >= 120;

      return `
        <div class="case-card ${isResuelto ? 'case-resolved' : ''}">
          <div class="case-card-header">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <span class="badge-order">#${c.orden}</span>
              ${c.ticket ? `<span class="badge-ticket"><i class="fas fa-ticket-alt"></i> Ticket #${c.ticket}</span>` : ''}
              <span class="badge-prio ${badgePrioClass}">${c.prioridad}</span>
              ${isLate ? `<span class="badge-alert-latigo" title="Alerta: caso escalado hace más de 2 horas sin resolverse"><i class="fas fa-exclamation-triangle"></i> >2h sin avance</span>` : ''}
            </div>
            <div class="case-time" title="Tiempo transcurrido desde el registro">
              <i class="far fa-clock"></i> ${timeStr}
            </div>
          </div>

          <div class="case-zone-row">
            <i class="fas fa-map-marker-alt" style="color:var(--corp-active);"></i>
            <strong>${c.mdt || 'MDT N/A'}</strong> &bull; <span>${c.zona}</span>
          </div>

          <div class="case-client-row">
            <i class="fas fa-user"></i>
            <span>${c.cliente || 'Abonado no especificado'}</span>
            ${c.cedula ? `<span class="badge-cedula"><i class="fas fa-id-card"></i> ${c.cedula}</span>` : ''}
            ${c.telefono ? `<a href="tel:${c.telefono}" class="tel-link"><i class="fas fa-phone-alt"></i> ${c.telefono}</a>` : ''}
          </div>

          ${c.direccion ? `
            <div class="case-address-row">
              <i class="fas fa-map-pin"></i>
              <span>${c.direccion}</span>
            </div>
          ` : ''}

          <div style="display:flex; flex-direction:column; gap:4px; font-size:0.83rem; margin-top:6px;">
            <div><i class="fas fa-hard-hat" style="color:#f59e0b; width:16px;"></i> Cuadrilla Asignada: <strong>${c.cuadrilla || 'Por asignar'}</strong></div>
            <div><i class="fas fa-user-tie" style="color:var(--corp-active); width:16px;"></i> Solicitó: <strong>${c.solicitado_por || 'Gerencia'}</strong></div>
            <div style="color:var(--dash-text-muted); font-size:0.78rem;">
              <i class="fas fa-user-shield" style="width:16px;"></i> Escalado a: <strong>${c.supervisor}</strong>
            </div>
          </div>

          ${c.motivo ? `
            <div class="case-motivo-box">
              <div class="motivo-label">Motivo de Operación:</div>
              <div class="motivo-text">${c.motivo}</div>
            </div>
          ` : ''}

          ${isDiferido ? `
            <div class="case-diferido-box">
              <i class="far fa-calendar-alt"></i>
              <span><strong>Diferido para:</strong> ${c.fecha_diferido || 'Fecha por definir'} ${c.hora_diferido ? 'a las ' + c.hora_diferido : ''} &bull; <em>${c.motivo_diferido || 'Sin motivo'}</em></span>
            </div>
          ` : ''}

          ${c.avance ? `
            <div class="case-avance-box" title="Avance interno para tu control">
              <i class="fas fa-sticky-note" style="color:#f59e0b;"></i>
              <span><strong>Avance:</strong> ${c.avance}</span>
            </div>
          ` : ''}

          <div class="case-status-row">
            <span class="status-indicator status-${(c.estado || 'escalado').replace(/[^a-zA-Z]/g, '').toLowerCase()}">
              ${c.estado}
            </span>

            <div class="case-card-actions">
              <button class="btn-icon btn-wa" onclick="window.copiarFichaWhatsApp('${c.id}')" title="Copiar ficha sobria para WhatsApp">
                <i class="fab fa-whatsapp"></i>
              </button>
              <button class="btn-icon btn-edit" onclick="window.editarCaso('${c.id}')" title="Editar caso / actualizar avance">
                <i class="fas fa-edit"></i>
              </button>
              ${!isResuelto ? `
                <button class="btn-icon btn-check" onclick="window.marcarResuelto('${c.id}')" title="Marcar como Resuelto">
                  <i class="fas fa-check"></i>
                </button>
              ` : ''}
              <button class="btn-icon btn-del" onclick="window.eliminarCaso('${c.id}')" title="Eliminar de la lista">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // NORMALIZACIÓN INTELIGENTE DE TÉCNICOS LÍDERES SICS
  function normalizeLeaderName(raw) {
    if (!raw) return '';
    let str = raw.trim();
    // Formato con coma: "Gómez Rosell, Luis Leopoldo" -> "Luis Gómez"
    if (str.includes(',')) {
      const parts = str.split(',');
      const apellidos = parts[0].trim().split(/\s+/);
      const nombres = parts[1].trim().split(/\s+/);
      const pNombre = nombres[0] || '';
      const pApellido = apellidos[0] || '';
      str = `${pNombre} ${pApellido}`.trim();
    } else {
      // Remover sufijos como VGT, (MDT), / La Villa Zona 3, etc.
      str = str.replace(/\bVGT\b/gi, '').replace(/\(.*?\)/g, '').split('/')[0].trim();
      const words = str.split(/\s+/).filter(Boolean);
      
      // Buscar coincidencia en directorio maestro de líderes SICS
      if (window.SICS_MASTER_DATA && window.SICS_MASTER_DATA.supervisores_y_cuadrillas) {
        const allSup = window.SICS_MASTER_DATA.supervisores_y_cuadrillas;
        for (const z in allSup) {
          for (const s in allSup[z]) {
            for (const c of allSup[z][s]) {
              const lParts = c.lider.toLowerCase().split(/\s+/);
              if (lParts.every(lp => str.toLowerCase().includes(lp))) {
                return c.lider;
              }
            }
          }
        }
      }
      
      if (words.length >= 4) {
        str = `${words[0]} ${words[2]}`; // E.g. Luis Leopoldo Gómez Rosell -> Luis Gómez
      } else if (words.length === 3) {
        str = `${words[0]} ${words[1]}`;
      }
    }
    // Capitalización estándar
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  function findSupervisorByLeader(leaderName) {
    if (!leaderName || !window.SICS_MASTER_DATA) return null;
    const lLower = leaderName.toLowerCase();
    const allSup = window.SICS_MASTER_DATA.supervisores_y_cuadrillas;
    for (const z in allSup) {
      for (const sup in allSup[z]) {
        for (const c of allSup[z][sup]) {
          const cLower = c.lider.toLowerCase();
          if (cLower === lLower || lLower.includes(cLower) || cLower.includes(lLower)) {
            return sup;
          }
        }
      }
    }
    return null;
  }

  // 7. PEGADO MÁGICO UNIVERSAL 2.0 (SIGO / ZENDESK + ODOO + WHATSAPP)
  function parsePastedOrder(text) {
    if (!text || !text.trim()) return;

    const raw = text.trim();
    const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

    let detectedOrden = '';
    let detectedTicket = '';
    let detectedCliente = '';
    let detectedCedula = '';
    let detectedTelefono = '';
    let detectedDireccion = '';
    let detectedMdt = '';
    let detectedZona = '';
    let detectedCuadrilla = '';
    let detectedSolicitadoPor = '';
    let detectedPrioridad = 'MEDIA';
    let detectedMotivo = '';
    let detectedComentario = '';

    // ESTRATEGIA A: FORMATO ODOO (F-OPE-AIRTEK-001/498085)
    if (raw.includes('F-OPE-AIRTEK') || (lines.length >= 6 && lines[0].includes('/'))) {
      const matchOdooOrden = lines[0].match(/(\d{5,8})/);
      if (matchOdooOrden) detectedOrden = matchOdooOrden[1];

      if (lines.length > 1) detectedMotivo = lines[1];
      if (lines.length > 2) detectedCliente = lines[2];
      if (lines.length > 3) detectedCedula = lines[3];
      if (lines.length > 4) detectedTelefono = normalizePhone(lines[4]);
      if (lines.length > 5) detectedDireccion = lines[5];

      // Buscar nodo en las líneas
      const nodoLine = lines.find(l => l.toUpperCase().includes('NODO'));
      if (nodoLine) {
        if (nodoLine.toUpperCase().includes('BARRANQUITAS')) {
          detectedZona = 'Barranquitas';
          detectedMdt = 'MBR001';
        } else if (nodoLine.toUpperCase().includes('CONCEPCION') || nodoLine.toUpperCase().includes('CONCEPCIÓN')) {
          detectedZona = 'La Concepción';
          detectedMdt = 'MCN001';
        } else if (nodoLine.toUpperCase().includes('VILLA')) {
          detectedZona = 'La Villa';
          detectedMdt = 'MLV001';
        }
      }

      // Cuadrilla y Solicitante en Odoo
      if (lines.length >= 8) detectedCuadrilla = normalizeLeaderName(lines[7]);
      if (lines.length >= 9) detectedSolicitadoPor = lines[8];
    }
    // ESTRATEGIA B: FORMATO SIGO / ZENDESK / SIX
    else {
      // Orden
      const matchSigoOrden = raw.match(/(?:Orden\s*N°?|Orden\s*N|Orden|OT)[\s:#]*(\d{5,8})/i) || raw.match(/\b(\d{6})\b/);
      if (matchSigoOrden) detectedOrden = matchSigoOrden[1];

      // Ticket Zendesk / Sigo
      const matchTicket = raw.match(/N°?\s*ticket[\s:#]*(\d+)/i) || raw.match(/ticket[\s:#]*(\d+)/i);
      if (matchTicket) detectedTicket = matchTicket[1];

      // Motivo en cabecera (Ej: "Reubicación - Orden N 315484")
      const matchHeaderMotivo = raw.match(/^([A-Za-zÁÉÍÓÚáéíóúñÑ\s]+?)\s*-\s*Orden/i);
      if (matchHeaderMotivo) {
        detectedMotivo = matchHeaderMotivo[1].trim();
      }

      // Nombre y apellido
      const matchCliente = raw.match(/Nombre\s+y\s+apellido\s*\n\s*([^\n\r]+)/i);
      if (matchCliente) detectedCliente = matchCliente[1].trim();

      // Cédula / Identificación
      const matchId = raw.match(/Identificación\s*\n\s*([^\n\r]+)/i) || raw.match(/Cédula[\s:#]*([VvEe]?[-]?\d+)/i);
      if (matchId) detectedCedula = matchId[1].trim();

      // Teléfono (primario y secundario en comentario)
      const matchTel = raw.match(/Teléfono\s*\n\s*([^\n\r]+)/i);
      if (matchTel) detectedTelefono = normalizePhone(matchTel[1].trim());

      const matchComentTel = raw.match(/número:\s*([0-9\s-]+)/i);
      if (matchComentTel && matchComentTel[1]) {
        const secTel = normalizePhone(matchComentTel[1].trim());
        if (secTel && !detectedTelefono) detectedTelefono = secTel;
        else if (secTel && detectedTelefono && detectedTelefono !== secTel) {
          detectedTelefono = `${secTel} (Alt: ${detectedTelefono})`;
        }
      }

      // Dirección
      const matchDir = raw.match(/Dirección\s+servicio\s*\n\s*([^\n\r]+)/i) || raw.match(/Dirección[\s:#]*([^\n\r]+)/i);
      if (matchDir) detectedDireccion = matchDir[1].trim();

      // Cuadrilla asignada y Técnico líder
      const matchTecLider = raw.match(/Técnico\s+líder\s*\n\s*([^\n\r]+)/i) || raw.match(/Técnico\s+lider[\s:#]*([^\n\r]+)/i);
      const matchCuad = raw.match(/Cuadrilla\s+asignada\s*\n\s*([^\n\r]+)/i) || raw.match(/Cuadrilla[\s:#]*([^\n\r]+)/i);
      if (matchTecLider && matchTecLider[1].trim()) {
        detectedCuadrilla = normalizeLeaderName(matchTecLider[1].trim());
      } else if (matchCuad && matchCuad[1].trim()) {
        detectedCuadrilla = normalizeLeaderName(matchCuad[1].trim());
      }

      // Usuario Zendesk / Solicitante
      const matchZendesk = raw.match(/Usuario\s+Zendesk\s*\n\s*([^\n\r]+)/i);
      if (matchZendesk) {
        detectedSolicitadoPor = `${matchZendesk[1].trim()} (Zendesk)`;
      } else {
        const matchSol = raw.match(/Solicitado\s+por[\s:#]*([^\n\r]+)/i);
        if (matchSol) detectedSolicitadoPor = matchSol[1].trim();
      }

      // MDT
      const matchMdt = raw.match(/\bM[DLSCNBR]{2,3}[-\s]?\d{2,3}(?:\.\d+)?\b/i) || raw.match(/MDT\s*\n\s*([^\n\r]+)/i);
      if (matchMdt) {
        detectedMdt = (matchMdt[1] || matchMdt[0]).toUpperCase().replace(/[-\s]/g, '');
      }

      // Comentario
      const matchComent = raw.match(/Comentario\s*\n\s*([^\n\r]+)/i);
      if (matchComent) detectedComentario = matchComent[1].trim();

      // Prioridad
      const matchPrio = raw.match(/Prioridad\s*([^\n\r]+)/i);
      if (matchPrio) {
        const pText = matchPrio[1].toUpperCase();
        if (pText.includes('CRIT') || pText.includes('CRÍT')) detectedPrioridad = 'CRÍTICA';
        else if (pText.includes('ALT')) detectedPrioridad = 'ALTA';
        else detectedPrioridad = 'MEDIA';
      }
    }

    // APLICAR CAMPOS EN EL FORMULARIO
    if (detectedOrden) document.getElementById('caseOrden').value = detectedOrden;
    if (detectedTicket) document.getElementById('caseTicket').value = detectedTicket;
    if (detectedCliente) document.getElementById('caseCliente').value = detectedCliente;
    if (detectedCedula) document.getElementById('caseCedula').value = detectedCedula;
    if (detectedTelefono) document.getElementById('caseTelefono').value = detectedTelefono;
    if (detectedDireccion) document.getElementById('caseDireccion').value = detectedDireccion;
    if (detectedCuadrilla) {
      document.getElementById('caseCuadrilla').value = detectedCuadrilla;
      const matchedSup = findSupervisorByLeader(detectedCuadrilla);
      if (matchedSup) {
        setSelectValue('caseSupervisor', matchedSup);
      }
    }
    if (detectedSolicitadoPor) document.getElementById('caseSolicitadoPor').value = detectedSolicitadoPor;
    if (detectedPrioridad) document.getElementById('casePrioridad').value = detectedPrioridad;

    if (detectedComentario && !document.getElementById('caseAvance').value) {
      document.getElementById('caseAvance').value = detectedComentario;
    }

    // RESOLUCIÓN DE MDT Y ZONA
    if (detectedMdt) {
      document.getElementById('caseMdt').value = detectedMdt;
      if (MDT_SECTOR_MAP[detectedMdt]) {
        detectedZona = MDT_SECTOR_MAP[detectedMdt];
      }
    }

    if (detectedZona) {
      setSelectValue('caseZona', detectedZona);
    }

    // AJUSTAR MOTIVO ESTANDARIZADO
    if (detectedMotivo) {
      mapMotivoToSelect(detectedMotivo);
    }

    Swal.fire({
      icon: 'success',
      title: '¡Orden Reconocida!',
      html: `<b>Orden:</b> #${detectedOrden || 'S/N'}<br><b>Cliente:</b> ${detectedCliente || 'Detectado'}<br><b>MDT / Zona:</b> ${detectedMdt || 'N/A'} - ${detectedZona || 'Detectada'}`,
      timer: 1600,
      showConfirmButton: false
    });
  }

  function normalizePhone(str) {
    if (!str) return '';
    const clean = str.replace(/[^0-9]/g, '');
    if (clean.length === 10 && clean.startsWith('4')) {
      return `0${clean.slice(0, 3)}-${clean.slice(3)}`;
    }
    if (clean.length === 11 && clean.startsWith('04')) {
      return `${clean.slice(0, 4)}-${clean.slice(4)}`;
    }
    return str;
  }

  function setSelectValue(selectId, val) {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    for (let i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value.toLowerCase() === val.toLowerCase() ||
          sel.options[i].text.toLowerCase().includes(val.toLowerCase())) {
        sel.selectedIndex = i;
        return;
      }
    }
  }

  function mapMotivoToSelect(motivoText) {
    const motivoSelect = document.getElementById('caseMotivoSelect');
    const motivoDetalle = document.getElementById('caseMotivoDetalle');
    const textLower = motivoText.toLowerCase();

    let found = false;
    for (let i = 0; i < motivoSelect.options.length; i++) {
      const optVal = motivoSelect.options[i].value.toLowerCase();
      if (textLower.includes('reubicaci') && optVal.includes('reubicación')) {
        motivoSelect.selectedIndex = i;
        found = true;
        break;
      } else if ((textLower.includes('reconexi') || textLower.includes('recuperado')) && optVal.includes('reconexión')) {
        motivoSelect.selectedIndex = i;
        found = true;
        break;
      } else if (textLower.includes('sin servicio') || textLower.includes('los rojo')) {
        if (optVal.includes('sin servicio')) { motivoSelect.selectedIndex = i; found = true; break; }
      } else if (textLower.includes('lentitud') || textLower.includes('atenuaci')) {
        if (optVal.includes('lentitud')) { motivoSelect.selectedIndex = i; found = true; break; }
      }
    }

    if (!found) {
      motivoSelect.value = 'Otro';
      motivoDetalle.style.display = 'block';
      motivoDetalle.value = motivoText;
    } else {
      motivoDetalle.style.display = 'none';
      motivoDetalle.value = '';
    }
  }

  // 8. HANDLERS GLOBALES PARA EL FORMULARIO
  window.handleEstadoChange = function(val) {
    const diferidoBox = document.getElementById('diferidoFieldsContainer');
    if (diferidoBox) {
      diferidoBox.style.display = (val === 'Diferido') ? 'block' : 'none';
    }
  };

  window.handleMotivoChange = function(val) {
    const detalleInput = document.getElementById('caseMotivoDetalle');
    if (detalleInput) {
      detalleInput.style.display = (val === 'Otro') ? 'block' : 'none';
      if (val !== 'Otro') detalleInput.value = '';
    }
  };

  // 9. MODAL NUEVO / EDITAR
  function openModal(caseData = null) {
    caseForm.reset();
    document.getElementById('rawOrderText').value = '';
    window.handleEstadoChange('Escalado');
    window.handleMotivoChange('Reubicación de equipo / acometida');

    if (caseData) {
      document.getElementById('modalTitle').innerHTML = '<i class="fas fa-edit"></i> Actualizar Escalamiento';
      document.getElementById('editCaseId').value = caseData.id;
      document.getElementById('caseOrden').value = caseData.orden || '';
      document.getElementById('caseTicket').value = caseData.ticket || '';
      document.getElementById('caseSupervisor').value = caseData.supervisor || 'Roberto Carrillo';
      setSelectValue('caseZona', caseData.zona || 'Rotaria');
      document.getElementById('caseMdt').value = caseData.mdt || '';
      document.getElementById('caseCuadrilla').value = caseData.cuadrilla || '';
      document.getElementById('caseSolicitadoPor').value = caseData.solicitado_por || '';
      document.getElementById('caseCliente').value = caseData.cliente || '';
      document.getElementById('caseCedula').value = caseData.cedula || '';
      document.getElementById('caseTelefono').value = caseData.telefono || '';
      document.getElementById('caseDireccion').value = caseData.direccion || '';
      document.getElementById('casePrioridad').value = caseData.prioridad || 'MEDIA';
      document.getElementById('caseEstado').value = caseData.estado || 'Escalado';
      window.handleEstadoChange(caseData.estado || 'Escalado');

      if (caseData.estado === 'Diferido') {
        document.getElementById('caseFechaDiferido').value = caseData.fecha_diferido || '';
        document.getElementById('caseHoraDiferido').value = caseData.hora_diferido || '14:00';
        document.getElementById('caseMotivoDiferido').value = caseData.motivo_diferido || 'Pospuesto por cliente para la tarde';
      }

      mapMotivoToSelect(caseData.motivo || 'Reubicación de equipo / acometida');
      document.getElementById('caseAvance').value = caseData.avance || '';
    } else {
      document.getElementById('modalTitle').innerHTML = '<i class="fas fa-tools"></i> Registrar Escalamiento';
      document.getElementById('editCaseId').value = '';
      document.getElementById('caseEstado').value = 'Escalado';
      document.getElementById('casePrioridad').value = 'MEDIA';
      document.getElementById('caseSupervisor').value = 'Roberto Carrillo';
      document.getElementById('caseZona').value = 'Rotaria';
      document.getElementById('caseSolicitadoPor').value = 'Cecilia Jenny Espinoza (Zendesk)';
    }

    modalBackdrop.style.display = 'flex';
  }

  function closeModal() {
    modalBackdrop.style.display = 'none';
  }

  caseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('editCaseId').value;
    const orden = document.getElementById('caseOrden').value.trim();
    const ticket = document.getElementById('caseTicket').value.trim();
    const supervisor = document.getElementById('caseSupervisor').value;
    const zona = document.getElementById('caseZona').value;
    const mdt = document.getElementById('caseMdt').value.trim();
    const cuadrilla = document.getElementById('caseCuadrilla').value.trim();
    const solicitado_por = document.getElementById('caseSolicitadoPor').value.trim();
    const cliente = document.getElementById('caseCliente').value.trim();
    const cedula = document.getElementById('caseCedula').value.trim();
    const telefono = document.getElementById('caseTelefono').value.trim();
    const direccion = document.getElementById('caseDireccion').value.trim();
    const prioridad = document.getElementById('casePrioridad').value;
    const estado = document.getElementById('caseEstado').value;

    const motivoSelectVal = document.getElementById('caseMotivoSelect').value;
    const motivoDetalleVal = document.getElementById('caseMotivoDetalle').value.trim();
    const motivo = (motivoSelectVal === 'Otro' && motivoDetalleVal) ? motivoDetalleVal : motivoSelectVal;

    let fecha_diferido = '';
    let hora_diferido = '';
    let motivo_diferido = '';

    if (estado === 'Diferido') {
      fecha_diferido = document.getElementById('caseFechaDiferido').value;
      hora_diferido = document.getElementById('caseHoraDiferido').value;
      motivo_diferido = document.getElementById('caseMotivoDiferido').value;
    }

    const avance = document.getElementById('caseAvance').value.trim();

    if (!orden || !mdt || !cuadrilla || !solicitado_por) {
      Swal.fire('Atención', 'Por favor completa: Orden, MDT, Cuadrilla Asignada y Quién Solicitó.', 'warning');
      return;
    }

    let savedCase = null;

    if (editId) {
      const idx = cases.findIndex(c => c.id === editId);
      if (idx !== -1) {
        cases[idx] = {
          ...cases[idx],
          orden, ticket, supervisor, zona, mdt, cuadrilla, solicitado_por, cliente, cedula, telefono, direccion,
          prioridad, estado, motivo, avance, fecha_diferido, hora_diferido, motivo_diferido
        };
        savedCase = cases[idx];
      }
    } else {
      const newCase = {
        id: 'case_' + (orden || Date.now()),
        orden, ticket, supervisor, zona, mdt, cuadrilla, solicitado_por, cliente, cedula, telefono, direccion,
        prioridad, estado, motivo, avance, fecha_diferido, hora_diferido, motivo_diferido,
        timestamp: Date.now()
      };
      cases.unshift(newCase);
      savedCase = newCase;
    }

    saveCases();
    renderCases();
    closeModal();

    // Sincronizar con la nube si está conectada
    if (savedCase) {
      pushCaseToCloud(savedCase);
    }

    Swal.fire({
      icon: 'success',
      title: editId ? 'Caso actualizado' : 'Escalamiento registrado',
      timer: 1300,
      showConfirmButton: false
    });
  });

  // 10. COPIAR FICHA WHATSAPP SOBRIA Y PROFESIONAL
  window.copiarFichaWhatsApp = function(id) {
    const c = cases.find(item => item.id === id);
    if (!c) return;

    const timeStr = formatElapsedTime(c.timestamp);
    let msg = `Orden: #${c.orden}\n`;
    if (c.ticket) msg += `Ticket: #${c.ticket}\n`;
    msg += `Cliente: ${c.cliente || 'No especificado'}${c.cedula ? ` (${c.cedula})` : ''}\n`;
    if (c.telefono) msg += `Contacto: ${c.telefono}\n`;
    if (c.direccion) msg += `Dirección: ${c.direccion}\n`;
    msg += `Cuadrilla Asignada: ${c.cuadrilla || 'Por asignar'}\n`;
    msg += `Solicitado por: ${c.solicitado_por || 'Gerencia'}\n`;
    if (c.estado === 'Diferido') {
      msg += `Estado: Diferido para ${c.fecha_diferido || 'hoy'} ${c.hora_diferido ? 'a las ' + c.hora_diferido : ''} (${c.motivo_diferido || 'Pospuesto'})\n`;
    }
    msg += `Tiempo Escalado: ${timeStr}`;

    navigator.clipboard.writeText(msg).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Ficha copiada',
        text: 'Formato sobrio listo para el chat del supervisor.',
        timer: 1400,
        showConfirmButton: false
      });
    });
  };

  window.editarCaso = function(id) {
    const c = cases.find(item => item.id === id);
    if (c) openModal(c);
  };

  window.marcarResuelto = function(id) {
    const idx = cases.findIndex(item => item.id === id);
    if (idx !== -1) {
      cases[idx].estado = 'Resuelto';
      saveCases();
      renderCases();
      updateStatusInCloud(id, 'Resuelto');
      Swal.fire({
        icon: 'success',
        title: 'Caso Resuelto',
        timer: 1200,
        showConfirmButton: false
      });
    }
  };

  window.eliminarCaso = function(id) {
    Swal.fire({
      title: '¿Eliminar este caso?',
      text: 'Se removerá de tu lista de seguimiento activo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(res => {
      if (res.isConfirmed) {
        cases = cases.filter(item => item.id !== id);
        saveCases();
        renderCases();
        deleteCaseInCloud(id);
      }
    });
  };

  // 11. SINCRONIZACIÓN GOOGLE SHEETS / APPS SCRIPT
  function getCloudUrl() {
    return localStorage.getItem(CLOUD_URL_KEY) || DEFAULT_CLOUD_URL;
  }

  function setCloudUrl(url) {
    localStorage.setItem(CLOUD_URL_KEY, url.trim());
  }

  async function syncWithCloud(interactive = false) {
    const cloudUrl = getCloudUrl();
    if (!cloudUrl) {
      if (interactive) {
        openCloudModal();
      }
      return;
    }

    if (btnSyncCloud) {
      btnSyncCloud.querySelector('i').classList.add('fa-spin');
    }

    try {
      const resp = await fetch(`${cloudUrl}?action=list_cases`, { method: 'GET' });
      if (!resp.ok) throw new Error('Error al conectar con la nube');
      const json = await resp.json();

      if ((json.status === 'success' || json.ok === true) && Array.isArray(json.data)) {
        // Reconciliación no destructiva por ID
        const remoteCases = json.data;
        const localMap = new Map();
        cases.forEach(c => localMap.set(String(c.id || c.orden), c));

        remoteCases.forEach(rc => {
          const key = String(rc.id || rc.orden);
          if (localMap.has(key)) {
            const local = localMap.get(key);
            // Si el remoto es más reciente o el local ya fue resuelto
            if ((rc.timestamp || 0) >= (local.timestamp || 0)) {
              localMap.set(key, { ...local, ...rc });
            }
          } else {
            localMap.set(key, rc);
          }
        });

        cases = Array.from(localMap.values());
        saveCases();
        renderCases();

        if (interactive) {
          Swal.fire({
            icon: 'success',
            title: 'Sincronizado con Sheets',
            text: `Base actualizada (${cases.length} casos cargados).`,
            timer: 1400,
            showConfirmButton: false
          });
        }
      }
    } catch (err) {
      console.warn('Sync cloud warning:', err);
      if (interactive) {
        Swal.fire('Atención', 'No se pudo sincronizar con Google Sheets. Revisa la URL del Web App.', 'warning');
      }
    } finally {
      if (btnSyncCloud) {
        btnSyncCloud.querySelector('i').classList.remove('fa-spin');
      }
    }
  }

  async function pushCaseToCloud(caseObj) {
    const cloudUrl = getCloudUrl();
    if (!cloudUrl) return;

    try {
      await fetch(cloudUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'save_case', case: caseObj })
      });
    } catch (e) {
      console.warn('Error enviando caso a la nube:', e);
    }
  }

  async function updateStatusInCloud(id, newStatus) {
    const cloudUrl = getCloudUrl();
    if (!cloudUrl) return;

    try {
      await fetch(cloudUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'update_status', id, estado: newStatus })
      });
    } catch (e) {
      console.warn('Error actualizando estado en la nube:', e);
    }
  }

  async function deleteCaseInCloud(id) {
    const cloudUrl = getCloudUrl();
    if (!cloudUrl) return;

    try {
      await fetch(cloudUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'delete_case', id })
      });
    } catch (e) {
      console.warn('Error eliminando caso en la nube:', e);
    }
  }

  function openCloudModal() {
    if (inputCloudUrl) inputCloudUrl.value = getCloudUrl();
    if (modalCloudBackdrop) modalCloudBackdrop.style.display = 'flex';
  }

  function closeCloudModal() {
    if (modalCloudBackdrop) modalCloudBackdrop.style.display = 'none';
  }

  // Copiar resumen de pendientes sin emojis
  if (btnCopiarResumenWhatsApp) {
    btnCopiarResumenWhatsApp.addEventListener('click', () => {
      const activos = cases.filter(c => c.estado !== 'Resuelto');
      if (activos.length === 0) {
        Swal.fire('Sin pendientes', 'No hay casos pendientes actualmente.', 'info');
        return;
      }

      let report = `CASOS PENDIENTES - SEGUIMIENTO ZONA 3\nFecha: ${new Date().toLocaleDateString('es-VE')}\nTotal pendientes: ${activos.length}\n\n`;

      activos.forEach(c => {
        report += `Orden #${c.orden} | ${c.zona} | Cuadrilla: ${c.cuadrilla} | Solicitó: ${c.solicitado_por} | ${formatElapsedTime(c.timestamp)}\n`;
      });

      navigator.clipboard.writeText(report).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Reporte copiado',
          timer: 1500,
          showConfirmButton: false
        });
      });
    });
  }

  // Exportar backup
  if (btnExportar) {
    btnExportar.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cases, null, 2));
      const dlAnchor = document.createElement('a');
      dlAnchor.setAttribute('href', dataStr);
      dlAnchor.setAttribute('download', `casos_zona3_${new Date().toISOString().split('T')[0]}.json`);
      dlAnchor.click();
    });
  }

  // Eventos UI
  if (btnNuevo) btnNuevo.addEventListener('click', () => openModal());
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if (btnCancelModal) btnCancelModal.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  if (btnAutoParse) {
    btnAutoParse.addEventListener('click', () => {
      parsePastedOrder(rawOrderText.value);
    });
  }

  // Eventos Nube
  if (btnSyncCloud) btnSyncCloud.addEventListener('click', () => syncWithCloud(true));
  if (btnConfigCloud) btnConfigCloud.addEventListener('click', openCloudModal);
  if (btnCloseCloudModal) btnCloseCloudModal.addEventListener('click', closeCloudModal);
  if (btnCancelCloudModal) btnCancelCloudModal.addEventListener('click', closeCloudModal);
  if (modalCloudBackdrop) {
    modalCloudBackdrop.addEventListener('click', (e) => {
      if (e.target === modalCloudBackdrop) closeCloudModal();
    });
  }

  if (btnSaveCloudUrl) {
    btnSaveCloudUrl.addEventListener('click', () => {
      const val = inputCloudUrl.value.trim();
      setCloudUrl(val);
      closeCloudModal();
      if (val) {
        syncWithCloud(true);
      }
    });
  }

  if (inputBuscar) inputBuscar.addEventListener('input', renderCases);
  if (filtroSupervisor) filtroSupervisor.addEventListener('change', renderCases);
  if (filtroSolicitante) filtroSolicitante.addEventListener('change', renderCases);
  if (filtroZona) filtroZona.addEventListener('change', renderCases);
  if (filtroEstado) filtroEstado.addEventListener('change', renderCases);

  if (btnLimpiarFiltros) {
    btnLimpiarFiltros.addEventListener('click', () => {
      inputBuscar.value = '';
      filtroSupervisor.value = '';
      filtroSolicitante.value = '';
      filtroZona.value = '';
      filtroEstado.value = '';
      renderCases();
    });
  }

  // ACCIONES RÁPIDAS MÓVILES (BARRA INFERIOR ANDROID)
  const btnMobileQuickPaste = document.getElementById('btnMobileQuickPaste');
  const btnMobileNewCase = document.getElementById('btnMobileNewCase');
  const btnMobileSync = document.getElementById('btnMobileSync');
  const btnMobileWhatsApp = document.getElementById('btnMobileWhatsApp');

  if (btnMobileQuickPaste) {
    btnMobileQuickPaste.addEventListener('click', async () => {
      openModal();
      try {
        if (navigator.clipboard && navigator.clipboard.readText) {
          const text = await navigator.clipboard.readText();
          if (text && text.trim()) {
            const rawEl = document.getElementById('rawOrderText');
            if (rawEl) {
              rawEl.value = text;
              parsePastedOrder(text);
              if (typeof Swal !== 'undefined') {
                Swal.fire({
                  icon: 'success',
                  title: '¡Orden Pegada y Procesada!',
                  text: 'Los datos de la orden fueron reconocidos exitosamente.',
                  timer: 1600,
                  showConfirmButton: false,
                  toast: true,
                  position: 'top-end'
                });
              }
            }
          } else {
            const rawEl = document.getElementById('rawOrderText');
            if (rawEl) rawEl.focus();
          }
        }
      } catch (err) {
        console.warn('[SICS Mobile] Permiso de portapapeles denegado o no disponible:', err);
        const rawEl = document.getElementById('rawOrderText');
        if (rawEl) rawEl.focus();
      }
    });
  }

  if (btnMobileNewCase) {
    btnMobileNewCase.addEventListener('click', () => openModal());
  }

  if (btnMobileSync) {
    btnMobileSync.addEventListener('click', () => syncWithCloud(true));
  }

  if (btnMobileWhatsApp) {
    btnMobileWhatsApp.addEventListener('click', () => {
      if (btnCopiarResumenWhatsApp) btnCopiarResumenWhatsApp.click();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'n') {
      e.preventDefault();
      openModal();
    }
  });

  // Actualizar tiempos en vivo cada minuto y sincronizar si hay nube
  setInterval(() => {
    renderCases();
    if (getCloudUrl()) syncWithCloud(false);
  }, 60000);

  // Inicializar
  initTheme();
  renderCases();
  if (getCloudUrl()) syncWithCloud(false);
});
