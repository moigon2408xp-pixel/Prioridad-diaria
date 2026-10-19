/**
 * SICS MANTENIMIENTO & ZONA 3 — GESTIÓN OPERATIVA Y ESCALAMIENTOS 2.0
 * Airtek Internet — Control y Seguimiento en Vivo
 * Desarrollado para Moisés González (Analista de Zona / Despacho)
 */

document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'SICS_ESCALAMIENTOS_ZONA3_2026';
  const THEME_KEY = 'SICS_THEME_MODE';
  const CLOUD_URL_KEY = 'sics_cloud_url';
  const SOUND_KEY = 'SICS_SOUND_ENABLED';
  const DEFAULT_CLOUD_URL = 'https://script.google.com/macros/s/AKfycbx4W5Rf5n4M80cG0MtgOksbU03FAxWtB5UxfDalVmbeykOKfvBhLk8iTD-ylrC9AJNgeA/exec';

  // 1. MAPA MAESTRO DE NODOS DE TODAS LAS ZONAS DE MANTENIMIENTO AIRTEK
  const NODE_TO_ZONE_MAP = {
    // Zona 1 (NORTE)
    "MBV": { nodo: "Bella Vista", sector: "Bella Vista", zona: "Zona 1-Z", supervisor: "José Castillo" },
    "MPM": { nodo: "Pomona", sector: "Pomona", zona: "Zona 1-Z", supervisor: "José Castillo" },
    "MMC": { nodo: "Machiques", sector: "Machiques", zona: "Zona 1-Z", supervisor: "José Castillo" },
    "MSJ": { nodo: "San José las Piedras", sector: "San José las Piedras", zona: "Zona 1-Z", supervisor: "José Castillo" },
    // Zona 2 (SUR)
    "MCS": { nodo: "Callao", sector: "Callao", zona: "Zona 2-Z", supervisor: "Angel Contreras" },
    "MCU": { nodo: "La Cañada", sector: "La Cañada", zona: "Zona 2-Z", supervisor: "Angel Contreras" },
    // Zona 3 (OESTE)
    "MSR": { nodo: "San Rafael", sector: "San Rafael", zona: "Zona 3-Z", supervisor: "Roberto Carrillo" },
    "MLT": { nodo: "Las Tunas", sector: "Rotaria", zona: "Zona 3-Z", supervisor: "Roberto Carrillo" },
    "MCN": { nodo: "Concepción", sector: "La Concepción", zona: "Zona 3-Z", supervisor: "Roberto Carrillo" },
    "MLV": { nodo: "La Villa", sector: "La Villa", zona: "Zona 3-Z", supervisor: "Roberto Carrillo" },
    "MBR": { nodo: "Barranquitas", sector: "Barranquitas", zona: "Zona 3-Z", supervisor: "Roberto Carrillo" },
    // Zona 5 (COL)
    "MCB": { nodo: "Cabimas", sector: "Cabimas", zona: "Zona 5-Z", supervisor: "Jesus Rojas" },
    "MCO": { nodo: "Ciudad Ojeda", sector: "Ciudad Ojeda", zona: "Zona 5-Z", supervisor: "Jesus Rojas" },
    "MBQ": { nodo: "Bachaquero", sector: "Bachaquero", zona: "Zona 5-Z", supervisor: "Jesus Rojas" },
    "MMG": { nodo: "Mene Grande", sector: "Mene Grande", zona: "Zona 5-Z", supervisor: "Jesus Rojas" },
    "MPA": { nodo: "Los Puertos de Altagracia", sector: "Los Puertos", zona: "Zona 5-Z", supervisor: "Jesus Rojas" },
    // Zona 6 (SUB-NORTE)
    "MLC": { nodo: "Lago Caribe", sector: "Lago Caribe", zona: "Zona 6-Z", supervisor: "Marlo Villalobos" },
    "MMR": { nodo: "Marite", sector: "Marite", zona: "Zona 6-Z", supervisor: "Marlo Villalobos" },
    "MPG": { nodo: "Paraguaipoa", sector: "Paraguaipoa", zona: "Zona 6-Z", supervisor: "Marlo Villalobos" },
    "MSC": { nodo: "Santa Cruz de Mara", sector: "Santa Cruz de Mara", zona: "Zona 6-Z", supervisor: "Marlo Villalobos" },
    "MEM": { nodo: "El Moján", sector: "El Moján", zona: "Zona 6-Z", supervisor: "Marlo Villalobos" },
    // Falcón 1
    "MFC": { nodo: "Coro", sector: "Coro", zona: "Zona 1-F", supervisor: "Jose Millan" },
    "MVC": { nodo: "La Vela de Coro", sector: "La Vela", zona: "Zona 1-F", supervisor: "Jose Millan" },
    "MFM": { nodo: "Mene Mauroa", sector: "Mene Mauroa", zona: "Zona 1-F", supervisor: "Jose Millan" },
    "MFD": { nodo: "Dabajuro", sector: "Dabajuro", zona: "Zona 1-F", supervisor: "Jose Millan" },
    "FPC": { nodo: "Puerto Cumarebo", sector: "Puerto Cumarebo", zona: "Zona 1-F", supervisor: "Jose Millan" },
    "FTP": { nodo: "Tocopero", sector: "Tocopero", zona: "Zona 1-F", supervisor: "Jose Millan" },
    "FYR": { nodo: "Yaracal", sector: "Yaracal", zona: "Zona 1-F", supervisor: "Jose Millan" },
    "FTU": { nodo: "Tucacas", sector: "Tucacas", zona: "Zona 1-F", supervisor: "Jose Millan" },
    // Falcón 2
    "FPS": { nodo: "Punto Fijo (SUR)", sector: "Punto Fijo Sur", zona: "Zona 2-F", supervisor: "Leomar León" },
    "FPN": { nodo: "Punto Fijo (NORTE)", sector: "Punto Fijo Norte", zona: "Zona 2-F", supervisor: "Leomar León" },
    "FPU": { nodo: "Pueblo Nuevo", sector: "Pueblo Nuevo", zona: "Zona 2-F", supervisor: "Leomar León" },
    "FAD": { nodo: "Adícora", sector: "Adícora", zona: "Zona 2-F", supervisor: "Leomar León" }
  };

  const MDT_SECTOR_MAP = (window.MDT_SECTOR_MAP && Object.keys(window.MDT_SECTOR_MAP).length > 0)
    ? window.MDT_SECTOR_MAP
    : {
    "MSR093": "Centro I", "MSR084": "Centro I", "MSR083": "Centro I", "MSR085": "Centro I", "MSR069": "Centro I",
    "MCN021": "La Concepción", "MCN023": "La Concepción", "MCN001": "La Concepción",
    "MLT072": "Rotaria", "MLT054": "Rotaria", "MLT021": "Rotaria", "MLT081": "Rotaria", "MLT020": "Rotaria",
    "MLV001": "La Villa", "MLV002": "La Villa", "MLV003": "La Villa",
    "MBR001": "Barranquitas", "MBR002": "Barranquitas"
  };

  // 2. DATOS INICIALES
  const defaultCases = [
    {
      id: 'case_496026',
      orden: '496026',
      orden_final: '',
      ticket: '',
      supervisor: 'Roberto Carrillo',
      zona: 'Zona 3-Z',
      mdt: 'MSR006',
      cliente: 'Abonado C.I. 26310051',
      cedula: '26310051',
      telefono: '0412-7860689',
      direccion: 'Sector San Rafael / Centro',
      cuadrilla: 'Por asignar',
      solicitado_por: 'Jeremi Gil',
      prioridad: 'MEDIA',
      estado: 'Pendiente',
      motivo: 'Instalación por reconexión (cliente recuperado)',
      avance: 'ODT recibida de Presidencia / CTO. Asignar cuadrilla en sitio.',
      fecha_registro: new Date().toISOString().split('T')[0],
      fecha_reprogramada: '',
      hora_reprogramada: '',
      gestionado_por: 'Sin gestionar',
      timestamp: Date.now() - (20 * 60 * 1000)
    },
    {
      id: 'case_308816',
      orden: '308816',
      orden_final: 'cumplida bajo la orden original',
      ticket: '',
      supervisor: 'Angel Contreras',
      zona: 'Zona 2-Z',
      mdt: 'MCS010',
      cliente: 'Yohainer Martinez',
      cedula: '25334443',
      telefono: '0414-6543210',
      direccion: 'El Callao calle 14 casa 22',
      cuadrilla: 'Jesús Montiel',
      solicitado_por: 'Moises Gonzalez',
      prioridad: 'MEDIA',
      estado: 'Pausa',
      motivo: 'No Localizado',
      avance: 'Cliente no atendió llamada de confirmación. Programado para contacto posterior.',
      fecha_registro: '2026-10-06',
      fecha_reprogramada: new Date().toISOString().split('T')[0],
      hora_reprogramada: '14:00',
      gestionado_por: 'Moises Gonzalez',
      timestamp: Date.now() - (60 * 60 * 1000)
    }
  ];

  let cases = loadCases();
  let currentTab = 'principal'; // 'principal' | 'cumplidas' | 'canceladas' | 'pausadas'
  let activeAlarmCaseId = null;
  let preAlertNotifiedIds = new Set();

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
  const kpiNextAlarmTime = document.getElementById('kpiNextAlarmTime');
  const headerNextAlarmIcon = document.getElementById('headerNextAlarmIcon');
  const countFiltrados = document.getElementById('countFiltrados');
  const tabSectionTitle = document.getElementById('tabSectionTitle');

  // Pestañas SICS
  const tabBtnPrincipal = document.getElementById('tabBtnPrincipal');
  const tabBtnCumplidas = document.getElementById('tabBtnCumplidas');
  const tabBtnCanceladas = document.getElementById('tabBtnCanceladas');
  const tabBtnPausadas = document.getElementById('tabBtnPausadas');
  const tabBadgePrincipal = document.getElementById('tabBadgePrincipal');
  const tabBadgeCumplidas = document.getElementById('tabBadgeCumplidas');
  const tabBadgeCanceladas = document.getElementById('tabBadgeCanceladas');
  const tabBadgePausadas = document.getElementById('tabBadgePausadas');

  // Filtros
  const inputBuscar = document.getElementById('inputBuscar');
  const filtroSupervisor = document.getElementById('filtroSupervisor');
  const filtroSolicitante = document.getElementById('filtroSolicitante');
  const filtroZona = document.getElementById('filtroZona');
  const filtroEstado = document.getElementById('filtroEstado');
  const btnLimpiarFiltros = document.getElementById('btnLimpiarFiltros');

  // Banner preventivo y Modal Alarma
  const advanceAlarmBanner = document.getElementById('advanceAlarmBanner');
  const advanceAlarmBannerText = document.getElementById('advanceAlarmBannerText');
  const btnAttendAdvanceAlarm = document.getElementById('btnAttendAdvanceAlarm');
  const btnCloseAdvanceBanner = document.getElementById('btnCloseAdvanceBanner');
  const modalAlarmOverlay = document.getElementById('modalAlarmOverlay');
  const alarmModalContent = document.getElementById('alarmModalContent');
  const btnAlarmAttend = document.getElementById('btnAlarmAttend');
  const btnAlarmSnooze = document.getElementById('btnAlarmSnooze');
  const btnAlarmMute = document.getElementById('btnAlarmMute');
  const btnDismissAlarmModal = document.getElementById('btnDismissAlarmModal');

  // Controles de sonido
  const btnSoundToggle = document.getElementById('btnSoundToggle');
  const soundIcon = document.getElementById('soundIcon');
  const btnTestSound = document.getElementById('btnTestSound');

  // Modal Principal SICS
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

  // 4. MOTOR DE AUDIO (WEB AUDIO API) — ALARMA INSISTENTE SICS
  let audioCtx = null;
  let persistentAlarmTimer = null;
  let isAlarmSounding = false;
  let soundEnabled = localStorage.getItem(SOUND_KEY) !== 'false';

  function updateSoundIconUI() {
    if (soundIcon) {
      soundIcon.className = soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
      soundIcon.style.color = soundEnabled ? 'var(--c-info)' : 'var(--dash-text-muted)';
    }
    if (btnSoundToggle) {
      btnSoundToggle.title = soundEnabled ? 'Sonido de Alarma: Activado' : 'Sonido de Alarma: Silenciado';
    }
  }
  updateSoundIconUI();

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Pre-alarma suave (2 tonos elegantes de cortesía)
  function playAlertChime() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const playTone = (freq, start, dur) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur);
      };
      playTone(659.25, 0, 0.22); // E5
      playTone(880.00, 0.2, 0.35); // A5
    } catch (e) {
      console.warn('AudioContext chime error:', e);
    }
  }

  // Alarma sonora insistente tipo bíper de emergencia (pulso continuo)
  function startPersistentAlarm() {
    if (!soundEnabled || isAlarmSounding) return;
    isAlarmSounding = true;

    const playPulse = () => {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const playBeep = (freq, start, dur) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square'; // Timbre penetrante de alarma industrial
          osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
          gain.gain.setValueAtTime(0.22, ctx.currentTime + start);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + start + dur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + start);
          osc.stop(ctx.currentTime + start + dur);
        };
        // Doble beep de alta urgencia
        playBeep(880, 0, 0.12);
        playBeep(1174, 0.14, 0.16);
      } catch (e) {
        console.warn('AudioContext alarm error:', e);
      }
    };

    playPulse();
    if (persistentAlarmTimer) clearInterval(persistentAlarmTimer);
    persistentAlarmTimer = setInterval(playPulse, 1200);
  }

  function stopPersistentAlarm() {
    isAlarmSounding = false;
    if (persistentAlarmTimer) {
      clearInterval(persistentAlarmTimer);
      persistentAlarmTimer = null;
    }
  }

  if (btnSoundToggle) {
    btnSoundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem(SOUND_KEY, soundEnabled);
      updateSoundIconUI();
      if (!soundEnabled) {
        stopPersistentAlarm();
      }
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: soundEnabled ? 'info' : 'warning',
        title: soundEnabled ? 'Sonido de alarma activado' : 'Sonido de alarma silenciado',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  if (btnTestSound) {
    btnTestSound.addEventListener('click', () => {
      getAudioContext();
      startPersistentAlarm();
      Swal.fire({
        title: '🔔 Probando Alarma Insistente',
        text: 'Sonará de forma repetitiva hasta que la detengas.',
        icon: 'warning',
        confirmButtonText: 'Detener Alarma',
        confirmButtonColor: '#ef4444'
      }).then(() => {
        stopPersistentAlarm();
      });
    });
  }

  // Desbloqueo automático del AudioContext en el primer clic
  document.addEventListener('click', () => getAudioContext(), { once: true });

  // 5. CONTROL DE PESTAÑAS SICS (Bandeja Principal, Cumplidas, Canceladas, Pausadas)
  const tabButtons = [
    { btn: tabBtnPrincipal, tab: 'principal', title: 'Bandeja Principal (Casos Activos)' },
    { btn: tabBtnCumplidas, tab: 'cumplidas', title: 'Casos Cumplidos (Realizados)' },
    { btn: tabBtnCanceladas, tab: 'canceladas', title: 'Casos Cancelados' },
    { btn: tabBtnPausadas, tab: 'pausadas', title: 'Casos Pausados / Reprogramados' }
  ];

  tabButtons.forEach(item => {
    if (item.btn) {
      item.btn.addEventListener('click', () => {
        tabButtons.forEach(t => t.btn && t.btn.classList.remove('active'));
        item.btn.classList.add('active');
        currentTab = item.tab;
        if (tabSectionTitle) tabSectionTitle.textContent = item.title;
        renderCases();
      });
    }
  });

  // 6. CÁLCULO DE TIEMPO TRANSCURRIDO & VIGILANCIA DE ALARMAS
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

  function getScheduledTimestamp(caseObj) {
    const f = caseObj.fecha_reprogramada || caseObj.fecha_diferido;
    const h = caseObj.hora_reprogramada || caseObj.hora_diferido || '14:00';
    if (!f) return null;

    // Normalizar formato de fecha si viene DD/MM/YYYY
    let yyyy_mm_dd = f;
    if (f.includes('/')) {
      const parts = f.split('/');
      if (parts.length === 3) {
        if (parts[2].length === 4) {
          yyyy_mm_dd = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        }
      }
    }

    const isoStr = `${yyyy_mm_dd}T${h.padStart(5, '0')}:00`;
    const ts = new Date(isoStr).getTime();
    return isNaN(ts) ? null : ts;
  }

  // 7. RENDERIZAR TARJETAS Y ACTUALIZAR CONTADORES SICS
  function renderCases() {
    const q = (inputBuscar.value || '').toLowerCase().trim();
    const supFilter = filtroSupervisor.value;
    const solFilter = filtroSolicitante.value;
    const zonaFilter = filtroZona.value;
    const estadoFilter = filtroEstado.value;

    // Contadores por categoría SICS
    let countPrincipal = 0;
    let countCumplidas = 0;
    let countCanceladas = 0;
    let countPausadas = 0;

    cases.forEach(c => {
      const st = (c.estado || 'Pendiente').toLowerCase();
      const mot = (c.motivo || '').toLowerCase();

      if (st === 'realizado' || st === 'resuelto') {
        countCumplidas++;
      } else if (st === 'cancelado' || st === 'cancelado/espera' || st === 'rebotado') {
        countCanceladas++;
      } else if (st === 'pausa' || st === 'diferido' || mot.includes('reprogram')) {
        countPausadas++;
      } else {
        countPrincipal++;
      }
    });

    if (tabBadgePrincipal) tabBadgePrincipal.textContent = countPrincipal;
    if (tabBadgeCumplidas) tabBadgeCumplidas.textContent = countCumplidas;
    if (tabBadgeCanceladas) tabBadgeCanceladas.textContent = countCanceladas;
    if (tabBadgePausadas) tabBadgePausadas.textContent = countPausadas;

    // Filtrar según la pestaña activa
    const filteredByTab = cases.filter(c => {
      const st = (c.estado || 'Pendiente').toLowerCase();
      const mot = (c.motivo || '').toLowerCase();

      if (currentTab === 'cumplidas') {
        return st === 'realizado' || st === 'resuelto';
      } else if (currentTab === 'canceladas') {
        return st === 'cancelado' || st === 'cancelado/espera' || st === 'rebotado';
      } else if (currentTab === 'pausadas') {
        return st === 'pausa' || st === 'diferido' || mot.includes('reprogram');
      } else {
        // 'principal': casos que no están cumplidos ni cancelados ni pausados
        return st !== 'realizado' && st !== 'resuelto' &&
               st !== 'cancelado' && st !== 'cancelado/espera' && st !== 'rebotado' &&
               st !== 'pausa' && st !== 'diferido' && !mot.includes('reprogram');
      }
    });

    // Filtros secundarios (búsqueda, supervisor, zona, solicitante)
    const filtered = filteredByTab.filter(c => {
      const matchQ = !q || (
        (c.orden && c.orden.toLowerCase().includes(q)) ||
        (c.cliente && c.cliente.toLowerCase().includes(q)) ||
        (c.cedula && c.cedula.toLowerCase().includes(q)) ||
        (c.mdt && c.mdt.toLowerCase().includes(q)) ||
        (c.motivo && c.motivo.toLowerCase().includes(q)) ||
        (c.cuadrilla && c.cuadrilla.toLowerCase().includes(q)) ||
        (c.solicitado_por && c.solicitado_por.toLowerCase().includes(q)) ||
        (c.direccion && c.direccion.toLowerCase().includes(q)) ||
        (c.zona && c.zona.toLowerCase().includes(q))
      );
      const matchSup = !supFilter || c.supervisor === supFilter;
      const matchSol = !solFilter || (c.solicitado_por && c.solicitado_por.includes(solFilter));
      const matchZona = !zonaFilter || (c.zona && c.zona.includes(zonaFilter));
      const matchEstado = !estadoFilter || c.estado === estadoFilter;
      return matchQ && matchSup && matchSol && matchZona && matchEstado;
    });

    if (countFiltrados) countFiltrados.textContent = filtered.length;

    // KPIs Globales en Header
    if (kpiPendientes) kpiPendientes.textContent = countPrincipal;
    if (kpiCriticos) kpiCriticos.textContent = cases.filter(c => c.prioridad === 'CRÍTICA' && c.estado !== 'Realizado' && c.estado !== 'Resuelto').length;
    if (kpiResueltos) kpiResueltos.textContent = countCumplidas;

    if (filtered.length === 0) {
      casesContainer.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    casesContainer.innerHTML = filtered.map(c => {
      const isResuelto = c.estado === 'Realizado' || c.estado === 'Resuelto';
      const isPausa = c.estado === 'Pausa' || c.estado === 'Diferido';
      const badgePrioClass = c.prioridad === 'CRÍTICA' ? 'prio-critica' : (c.prioridad === 'ALTA' ? 'prio-alta' : 'prio-media');
      const timeStr = formatElapsedTime(c.timestamp);

      // Evaluación de hora reprogramada
      const scheduledMs = getScheduledTimestamp(c);
      let reprogBadgeHtml = '';
      if (scheduledMs && !isResuelto) {
        const diffMins = Math.round((scheduledMs - Date.now()) / 60000);
        const horaStr = c.hora_reprogramada || c.hora_diferido || '14:00';
        if (diffMins <= 0) {
          reprogBadgeHtml = `
            <span class="badge-reprog-due" title="¡HORA VENCIDA! Caso debía ser atendido a las ${horaStr}">
              <i class="fas fa-bell"></i> ¡Vencido! (${horaStr})
            </span>
          `;
        } else if (diffMins <= 15) {
          reprogBadgeHtml = `
            <span class="badge-reprog-warning" title="Próximo a cumplirse en ${diffMins} minutos">
              <i class="far fa-clock"></i> En ${diffMins}m (${horaStr})
            </span>
          `;
        } else {
          reprogBadgeHtml = `
            <span style="font-size:11px; color:#38bdf8; font-weight:700; background:rgba(56,189,248,0.1); padding:2px 8px; border-radius:6px;">
              <i class="far fa-calendar-check"></i> Reprog: ${horaStr}
            </span>
          `;
        }
      }

      return `
        <div class="case-card ${isResuelto ? 'case-resolved' : ''}">
          <div class="case-card-header">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <span class="badge-order">#${c.orden}</span>
              ${c.orden_final ? `<span style="font-size:11px; color:#a855f7; font-weight:700; background:rgba(168,85,247,0.12); padding:2px 6px; border-radius:4px;"><i class="fas fa-arrow-right"></i> Final: ${c.orden_final}</span>` : ''}
              <span class="badge-prio ${badgePrioClass}">${c.prioridad}</span>
              ${reprogBadgeHtml}
            </div>
            <div class="case-time" title="Tiempo de registro">
              <i class="far fa-clock"></i> ${timeStr}
            </div>
          </div>

          <div class="case-zone-row">
            <i class="fas fa-map-marker-alt" style="color:var(--corp-active);"></i>
            <strong>${c.mdt || 'MDT N/A'}</strong> &bull; <span>${c.zona || 'Zona 3-Z'}</span>
          </div>

          <div class="case-client-row">
            <i class="fas fa-user"></i>
            <strong>${c.cliente || 'Abonado SICS'}</strong>
            ${c.cedula ? `<span class="badge-cedula"><i class="fas fa-id-card"></i> ${c.cedula}</span>` : ''}
            ${c.telefono ? `<a href="tel:${c.telefono}" class="tel-link"><i class="fas fa-phone-alt"></i> ${c.telefono}</a>` : ''}
          </div>

          ${c.direccion ? `
            <div class="case-address-row">
              <i class="fas fa-map-pin"></i>
              <span>${c.direccion}</span>
            </div>
          ` : ''}

          <div style="display:flex; flex-direction:column; gap:4px; font-size:0.83rem; margin-top:8px;">
            <div><i class="fas fa-hard-hat" style="color:#f59e0b; width:16px;"></i> Cuadrilla: <strong>${c.cuadrilla || 'Por asignar'}</strong></div>
            <div><i class="fas fa-user-tie" style="color:#0ea5e9; width:16px;"></i> Solicitó: <strong>${c.solicitado_por || 'Jeremi Gil'}</strong></div>
            <div style="color:var(--dash-text-muted); font-size:0.78rem;">
              <i class="fas fa-user-shield" style="width:16px;"></i> Escalado a: <strong>${c.supervisor || 'Roberto Carrillo'}</strong>
            </div>
          </div>

          ${c.motivo ? `
            <div class="case-motivo-box" style="margin-top:8px;">
              <div class="motivo-label">Motivo / Operación:</div>
              <div class="motivo-text">${c.motivo}</div>
            </div>
          ` : ''}

          ${(c.fecha_reprogramada || c.hora_reprogramada) ? `
            <div style="margin-top:8px; padding:6px 10px; background:rgba(56,189,248,0.08); border-left:3px solid #38bdf8; border-radius:4px; font-size:12px;">
              <i class="far fa-clock" style="color:#38bdf8;"></i> <strong>Reprogramado para:</strong> ${c.fecha_reprogramada || 'Hoy'} a las <strong>${c.hora_reprogramada || '14:00'}</strong>
            </div>
          ` : ''}

          ${c.avance ? `
            <div class="case-avance-box" title="Observaciones internas" style="margin-top:8px;">
              <i class="fas fa-sticky-note" style="color:#f59e0b;"></i>
              <span><strong>Observaciones:</strong> ${c.avance}</span>
            </div>
          ` : ''}

          <div class="case-status-row" style="margin-top:10px;">
            <span class="status-indicator status-${(c.estado || 'pendiente').replace(/[^a-zA-Z]/g, '').toLowerCase()}">
              ${c.estado || 'Pendiente'}
            </span>

            <div class="case-card-actions">
              <button class="btn-icon btn-wa" onclick="window.copiarFichaWhatsApp('${c.id}')" title="Copiar ficha sobria para WhatsApp">
                <i class="fab fa-whatsapp"></i>
              </button>
              <button class="btn-icon btn-edit" onclick="window.editarCaso('${c.id}')" title="Editar caso / actualizar estado">
                <i class="fas fa-edit"></i>
              </button>
              ${!isResuelto ? `
                <button class="btn-icon btn-check" onclick="window.marcarResuelto('${c.id}')" title="Marcar como Realizado">
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

  // 8. BUCLE DE VIGILANCIA DE ALARMAS REPROGRAMADAS (CADA 5 SEGUNDOS)
  function checkReprogrammedAlarms() {
    const now = Date.now();
    let nextScheduledDiff = Infinity;
    let nextScheduledCase = null;
    let triggeredAlarmCase = null;

    cases.forEach(c => {
      const isDone = c.estado === 'Realizado' || c.estado === 'Resuelto' || c.estado === 'Cancelado';
      if (isDone) return;

      const scheduledMs = getScheduledTimestamp(c);
      if (!scheduledMs) return;

      const diffMs = scheduledMs - now;
      const diffMins = Math.round(diffMs / 60000);

      // Encontrar el caso más próximo en el futuro
      if (diffMs > 0 && diffMs < nextScheduledDiff) {
        nextScheduledDiff = diffMs;
        nextScheduledCase = c;
      }

      // 1. AVISO PREVENTIVO (15 MINUTOS ANTES)
      if (diffMins <= 15 && diffMins > 0) {
        if (!preAlertNotifiedIds.has(c.id)) {
          preAlertNotifiedIds.add(c.id);
          const horaStr = c.hora_reprogramada || c.hora_diferido || '14:00';

          if (advanceAlarmBanner && advanceAlarmBannerText) {
            advanceAlarmBannerText.innerHTML = `
              <strong>⏰ AVISO PREVENTIVO:</strong> El caso <strong>#${c.orden}</strong> (${c.cliente}) está reprogramado para las <strong>${horaStr}</strong> (faltan ${diffMins} min).
            `;
            advanceAlarmBanner.style.display = 'flex';
            if (btnAttendAdvanceAlarm) {
              btnAttendAdvanceAlarm.onclick = () => openModal(c);
            }
          }

          playAlertChime();
        }
      }

      // 2. ALARMA CRÍTICA AL ALCANZAR LA HORA O ESTAR VENCIDO
      if (diffMins <= 0) {
        if (!triggeredAlarmCase) {
          triggeredAlarmCase = c;
        }
      }
    });

    // Actualizar indicador en header
    if (kpiNextAlarmTime) {
      if (nextScheduledCase) {
        const minsLeft = Math.round(nextScheduledDiff / 60000);
        const hora = nextScheduledCase.hora_reprogramada || nextScheduledCase.hora_diferido || '14:00';
        kpiNextAlarmTime.textContent = `${hora} (#${nextScheduledCase.orden} en ${minsLeft}m)`;
        if (headerNextAlarmIcon) headerNextAlarmIcon.style.color = '#38bdf8';
      } else {
        kpiNextAlarmTime.textContent = 'Sin casos';
        if (headerNextAlarmIcon) headerNextAlarmIcon.style.color = 'var(--dash-text-muted)';
      }
    }

    // DISPARAR ALARMA VISUAL & SONORA INSISTENTE
    if (triggeredAlarmCase) {
      activeAlarmCaseId = triggeredAlarmCase.id;
      const horaStr = triggeredAlarmCase.hora_reprogramada || triggeredAlarmCase.hora_diferido || '14:00';

      if (alarmModalContent) {
        alarmModalContent.innerHTML = `
          <div class="alarm-case-card">
            <div class="alarm-case-header">
              <span style="font-size:1.1rem; font-weight:900; color:#38bdf8;">Orden #${triggeredAlarmCase.orden}</span>
              <span class="alarm-overdue-tag">¡HORA PROGRAMADA: ${horaStr}!</span>
            </div>
            <div style="font-size:1.05rem; font-weight:800; color:#fff; margin-bottom:6px;">
              ${triggeredAlarmCase.cliente}
            </div>
            <div style="font-size:0.88rem; color:#94a3b8; margin-bottom:8px;">
              <strong>Zona:</strong> ${triggeredAlarmCase.zona || 'Zona 3-Z'} &bull; <strong>MDT:</strong> ${triggeredAlarmCase.mdt || 'N/A'} &bull; <strong>Supervisor:</strong> ${triggeredAlarmCase.supervisor}
            </div>
            <div style="font-size:0.85rem; color:#f59e0b; background:rgba(245,158,11,0.1); padding:8px 12px; border-radius:6px;">
              <i class="fas fa-exclamation-triangle"></i> <strong>Motivo de Operación:</strong> ${triggeredAlarmCase.motivo || 'Visita reprogramada'}
            </div>
          </div>
        `;
      }

      if (modalAlarmOverlay) {
        modalAlarmOverlay.style.display = 'flex';
      }

      startPersistentAlarm();
    }
  }

  // Cerrar banner preventivo
  if (btnCloseAdvanceBanner && advanceAlarmBanner) {
    btnCloseAdvanceBanner.addEventListener('click', () => {
      advanceAlarmBanner.style.display = 'none';
    });
  }

  // ACCIONES DEL MODAL DE ALARMA
  if (btnAlarmAttend) {
    btnAlarmAttend.addEventListener('click', () => {
      stopPersistentAlarm();
      if (modalAlarmOverlay) modalAlarmOverlay.style.display = 'none';
      if (activeAlarmCaseId) {
        const found = cases.find(c => c.id === activeAlarmCaseId);
        if (found) {
          found.estado = 'En ejecucion';
          saveCases();
          renderCases();
          openModal(found);
        }
      }
    });
  }

  if (btnAlarmSnooze) {
    btnAlarmSnooze.addEventListener('click', () => {
      stopPersistentAlarm();
      if (modalAlarmOverlay) modalAlarmOverlay.style.display = 'none';
      if (activeAlarmCaseId) {
        const found = cases.find(c => c.id === activeAlarmCaseId);
        if (found) {
          // Posponer 15 minutos en el futuro
          const newTarget = new Date(Date.now() + (15 * 60 * 1000));
          const hh = String(newTarget.getHours()).padStart(2, '0');
          const mm = String(newTarget.getMinutes()).padStart(2, '0');
          found.hora_reprogramada = `${hh}:${mm}`;
          found.fecha_reprogramada = newTarget.toISOString().split('T')[0];
          saveCases();
          renderCases();
          pushCaseToCloud(found);

          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: `Caso #${found.orden} pospuesto 15 min (para las ${hh}:${mm})`,
            showConfirmButton: false,
            timer: 2500
          });
        }
      }
    });
  }

  if (btnAlarmMute) {
    btnAlarmMute.addEventListener('click', () => {
      stopPersistentAlarm();
      if (modalAlarmOverlay) modalAlarmOverlay.style.display = 'none';
    });
  }

  if (btnDismissAlarmModal) {
    btnDismissAlarmModal.addEventListener('click', () => {
      stopPersistentAlarm();
      if (modalAlarmOverlay) modalAlarmOverlay.style.display = 'none';
    });
  }

  // 9. PEGADO MÁGICO 100% CERTERO — COMPATIBLE CON TODAS LAS ZONAS Y ODOO / SICS
  function parsePastedOrder(text) {
    if (!text || !text.trim()) return;

    const raw = text.trim();

    let detectedOrden = '';
    let detectedOrdenFinal = '';
    let detectedCliente = '';
    let detectedCedula = '';
    let detectedTelefono = '';
    let detectedDireccion = '';
    let detectedMdt = '';
    let detectedZona = '';
    let detectedSupervisor = '';
    let detectedCuadrilla = '';
    let detectedSolicitadoPor = '';
    let detectedPrioridad = 'MEDIA';
    let detectedMotivo = '';
    let detectedFechaRegistro = new Date().toISOString().split('T')[0];
    let detectedFechaReprogramada = '';
    let detectedHoraReprogramada = '14:00';
    let detectedEstado = 'Pendiente';
    let detectedGestionadoPor = 'Sin gestionar';
    let detectedComentarios = '';

    // 1. ORDEN PRINCIPAL
    const matchOdooOrden = raw.match(/F-OPE-AIRTEK-\d+\/(\d+)/i) ||
                           raw.match(/(?:Orden\s*Origen|Orden\s*N[°o]?|OT|N[°o]\s*de\s*Orden)[\s:#]*(\d{5,8})/i) ||
                           raw.match(/\b(\d{6})\b/);
    if (matchOdooOrden) detectedOrden = matchOdooOrden[1];

    // Orden Final
    const matchOrdenFinal = raw.match(/Orden\s*Final(?:[^\n\r:]*)[\s:#]+([^\n\r]+)/i);
    if (matchOrdenFinal) detectedOrdenFinal = matchOrdenFinal[1].trim();

    // 2. CÉDULA CLIENTE
    const matchCedula = raw.match(/(?:C\.?I\.?|Cédula|Cedula|Identificación|Identificacion)(?:\s*Cliente)?[\s:#]*([VvEe]?[-]?\d{6,9})/i);
    if (matchCedula) detectedCedula = matchCedula[1].replace(/[^0-9]/g, '');

    // 3. SOLICITADO POR / REQUERIDO POR (NUNCA ASIGNAR A CLIENTE)
    const matchReq = raw.match(/(?:Requerido\s+por|Solicitado\s+por|Usuario\s+Zendesk)[\s:#]+([^\n\r]+)/i);
    const matchReg = raw.match(/Registrado\s+por[\s:#]+([^\n\r]+)/i);
    if (matchReq) {
      detectedSolicitadoPor = matchReq[1].trim();
    } else if (matchReg) {
      detectedSolicitadoPor = matchReg[1].trim();
    }

    // 4. NODO, ZONA, SECTOR Y SUPERVISOR AUTOMÁTICO (TODAS LAS ZONAS DE MANTENIMIENTO)
    const matchNodePrefix = raw.match(/^([A-Z]{3})\s*-\s*/m) || raw.match(/\b(M[A-Z]{2}|F[A-Z]{2})\b/);
    const matchMdtExplicit = raw.match(/\b(M[A-Z]{2}|F[A-Z]{2})\d{2,3}(?:\.\d+)?\b/i);

    let prefix = '';
    if (matchMdtExplicit) {
      detectedMdt = matchMdtExplicit[0].toUpperCase();
      prefix = detectedMdt.substring(0, 3);
    } else if (matchNodePrefix) {
      prefix = matchNodePrefix[1].toUpperCase();
      detectedMdt = prefix + '001';
    }

    if (prefix && NODE_TO_ZONE_MAP[prefix]) {
      const nodeInfo = NODE_TO_ZONE_MAP[prefix];
      detectedZona = nodeInfo.zona;
      detectedSupervisor = nodeInfo.supervisor;
      if (MDT_SECTOR_MAP[detectedMdt]) {
        detectedZona = MDT_SECTOR_MAP[detectedMdt];
      }
    }

    // Revisar si viene explícito "Zona: Zona 2-Z"
    const matchZonaExplicit = raw.match(/Zona[\s:#]+([^\n\r]+)/i);
    if (matchZonaExplicit) {
      const zText = matchZonaExplicit[1].trim();
      if (zText.toUpperCase().includes('ZONA')) detectedZona = zText;
    }

    // 5. CLIENTE / ABONADO (IGNORAR ESTRICTAMENTE DEPARTAMENTOS INTERNOS)
    const matchDiferidaHeader = raw.match(/(?:Editando\s+Diferida\s+de|Diferida\s+de)\s+([^\n\r]+)/i);
    if (matchDiferidaHeader) {
      detectedCliente = matchDiferidaHeader[1].trim();
    } else {
      const matchCliCandidate = raw.match(/(?:Nombre\s+Cliente|Nombre\s+y\s+apellido|Abonado|^Cliente)[\s:#]+([^\n\r]+)/im);
      if (matchCliCandidate) {
        const cand = matchCliCandidate[1].trim();
        const invalidPattern = /(?:gerencia|direcci[oó]n|presidencia|atenci[oó]n|no\s+presencial|requiere|ausente|no\s+localizado)/i;
        if (!invalidPattern.test(cand)) {
          detectedCliente = cand;
        }
      }
    }

    if (!detectedCliente) {
      detectedCliente = detectedCedula ? `Abonado C.I. ${detectedCedula}` : 'Abonado SICS';
    }

    // 6. MOTIVO / OPERACIÓN
    const matchTipoODT = raw.match(/Tipo\s+de\s+Orden\s+de\s+Trabajo[\s:#]*([^\n\r]+)/i);
    const matchMotivoExplicit = raw.match(/Motivo[\s:#]+([^\n\r]+)/i);
    if (matchMotivoExplicit) {
      detectedMotivo = matchMotivoExplicit[1].trim();
    } else if (matchTipoODT) {
      detectedMotivo = matchTipoODT[1].trim();
    } else if (matchNodePrefix) {
      const matchTitleMotivo = raw.match(new RegExp(prefix + '\\s*-\\s*([^,\\n\\r]+)'));
      if (matchTitleMotivo) detectedMotivo = matchTitleMotivo[1].trim();
    }

    // 7. CUADRILLA ASIGNADA (SIN "NODO SAN")
    const matchCuad = raw.match(/(?:Cuadrilla(?:\s*ODT)?|Técnico\s+líder|Tecnico\s+lider|Responsable)[\s:#]+([A-Za-zÁÉÍÓÚáéíóúñÑ\s]+)/i);
    if (matchCuad) {
      const cuadVal = matchCuad[1].trim();
      const invalidCuad = /(?:odt|responsable|equipo|ayudante|nodo|tiempo)/i;
      if (!invalidCuad.test(cuadVal) && cuadVal.length > 3) {
        detectedCuadrilla = cuadVal;
      }
    }

    // 8. TELÉFONO DE CONTACTO (NUNCA FECHA)
    const matchPhone = raw.match(/(?:Teléfono|Telefono|Telf|Celular)[\s:#]*([0-9\s-]{10,15})/i) || raw.match(/\b(04\d{2}[-\s]?\d{7})\b/);
    if (matchPhone) {
      detectedTelefono = normalizePhone(matchPhone[1] || matchPhone[0]);
    }

    // 9. DIRECCIÓN
    const matchDir = raw.match(/(?:Dirección\s+servicio|Dirección|Direccion)[\s:#]+([^\n\r]+)/i);
    if (matchDir) {
      const dirVal = matchDir[1].trim();
      if (!dirVal.toLowerCase().includes('instalación de servicio')) {
        detectedDireccion = dirVal;
      }
    }

    // 10. FECHAS Y REPROGRAMACIONES
    const matchReqDate = raw.match(/Fecha\s+de\s+Requerimiento[\s:#]*([0-9/.-]+)/i);
    if (matchReqDate) {
      detectedFechaRegistro = normalizeDateToIso(matchReqDate[1]);
    }

    const matchReprog = raw.match(/Fecha\s+Reprogramada(?:[^\n\r:]*)[\s:#]+([^\n\r]+)/i);
    if (matchReprog) {
      const repStr = matchReprog[1].trim();
      const parts = repStr.split(/\s+/);
      if (parts[0]) detectedFechaReprogramada = normalizeDateToIso(parts[0]);
      if (parts[1]) detectedHoraReprogramada = parts[1].substring(0, 5);
      detectedEstado = 'Pausa';
    }

    // 11. ESTATUS
    const matchEst = raw.match(/(?:Estatus|Estado)[\s:#]+([^\n\r]+)/i);
    if (matchEst) {
      const estStr = matchEst[1].trim();
      if (estStr.toLowerCase().includes('realizado')) detectedEstado = 'Realizado';
      else if (estStr.toLowerCase().includes('pausa')) detectedEstado = 'Pausa';
      else if (estStr.toLowerCase().includes('cancelado')) detectedEstado = 'Cancelado';
      else if (estStr.toLowerCase().includes('ejecucion')) detectedEstado = 'En ejecucion';
      else detectedEstado = 'Pendiente';
    }

    // APLICAR AL FORMULARIO MODAL
    if (detectedOrden) document.getElementById('caseOrden').value = detectedOrden;
    if (detectedOrdenFinal) document.getElementById('caseOrdenFinal').value = detectedOrdenFinal;
    if (detectedCliente) document.getElementById('caseCliente').value = detectedCliente;
    if (detectedCedula) document.getElementById('caseCedula').value = detectedCedula;
    if (detectedTelefono) document.getElementById('caseTelefono').value = detectedTelefono;
    if (detectedDireccion) document.getElementById('caseDireccion').value = detectedDireccion;
    if (detectedMdt) document.getElementById('caseMdt').value = detectedMdt;
    if (detectedCuadrilla) document.getElementById('caseCuadrilla').value = detectedCuadrilla;
    if (detectedSolicitadoPor) document.getElementById('caseSolicitadoPor').value = detectedSolicitadoPor;
    if (detectedFechaRegistro) document.getElementById('caseFechaRegistro').value = detectedFechaRegistro;
    if (detectedFechaReprogramada) document.getElementById('caseFechaReprogramada').value = detectedFechaReprogramada;
    if (detectedHoraReprogramada) document.getElementById('caseHoraReprogramada').value = detectedHoraReprogramada;

    setSelectValue('caseZona', detectedZona || 'Zona 3-Z');
    setSelectValue('caseSupervisor', detectedSupervisor || 'Roberto Carrillo');
    setSelectValue('caseEstado', detectedEstado);

    if (detectedMotivo) {
      mapMotivoToSelect(detectedMotivo);
    }

    Swal.fire({
      icon: 'success',
      title: '¡Pegado Mágico 100% Reconocido!',
      html: `<b>Orden:</b> #${detectedOrden || 'S/N'}<br><b>Cliente:</b> ${detectedCliente}<br><b>C.I.:</b> ${detectedCedula || 'N/A'}<br><b>Zona / Nodo:</b> ${detectedZona} (${prefix || 'MDT'})`,
      timer: 1700,
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

  function normalizeDateToIso(str) {
    if (!str) return new Date().toISOString().split('T')[0];
    const s = str.trim();
    if (s.includes('/')) {
      const p = s.split('/');
      if (p.length === 3) {
        if (p[2].length === 4) return `${p[2]}-${p[1].padStart(2, '0')}-${p[0].padStart(2, '0')}`;
      }
    }
    return s;
  }

  function setSelectValue(selectId, val) {
    const sel = document.getElementById(selectId);
    if (!sel || !val) return;
    const vLower = val.toLowerCase();
    for (let i = 0; i < sel.options.length; i++) {
      const optVal = sel.options[i].value.toLowerCase();
      const optText = sel.options[i].text.toLowerCase();
      if (optVal === vLower || optText.includes(vLower) || vLower.includes(optVal)) {
        sel.selectedIndex = i;
        return;
      }
    }
  }

  function mapMotivoToSelect(motivoText) {
    const motivoSelect = document.getElementById('caseMotivoSelect');
    const motivoDetalle = document.getElementById('caseMotivoDetalle');
    if (!motivoSelect || !motivoDetalle) return;

    const lower = motivoText.toLowerCase();
    let matchedVal = '';

    for (let i = 0; i < motivoSelect.options.length; i++) {
      const val = motivoSelect.options[i].value;
      if (val && lower.includes(val.toLowerCase())) {
        matchedVal = val;
        break;
      }
    }

    if (!matchedVal) {
      if (lower.includes('reconexi')) matchedVal = 'Instalación por reconexión (cliente recuperado)';
      else if (lower.includes('reubicaci')) matchedVal = 'Reubicación de equipo / acometida';
      else if (lower.includes('reprogram')) matchedVal = 'Visita reprogramada';
      else if (lower.includes('no localiz')) matchedVal = 'No Localizado';
      else if (lower.includes('los') || lower.includes('sin servicio')) matchedVal = 'Sin servicio / LOS Rojo';
      else if (lower.includes('obra civil')) matchedVal = 'Requiere obra civil cliente';
    }

    if (matchedVal) {
      motivoSelect.value = matchedVal;
      motivoDetalle.style.display = 'none';
    } else {
      motivoSelect.value = 'Otro';
      motivoDetalle.style.display = 'block';
      motivoDetalle.value = motivoText;
    }
  }

  // 10. HANDLERS GLOBALES DE FORMULARIO
  window.handleEstadoChange = function(val) {
    // Si se pasa a Pausa o Diferido, sugerir fecha y hora si están vacías
    if (val === 'Pausa') {
      const fechaReprog = document.getElementById('caseFechaReprogramada');
      if (fechaReprog && !fechaReprog.value) {
        fechaReprog.value = new Date().toISOString().split('T')[0];
      }
    }
  };

  window.handleMotivoChange = function(val) {
    const detalleInput = document.getElementById('caseMotivoDetalle');
    if (detalleInput) {
      detalleInput.style.display = (val === 'Otro') ? 'block' : 'none';
      if (val !== 'Otro') detalleInput.value = '';
    }
  };

  // 11. MODAL NUEVO / EDITAR
  function openModal(caseData = null) {
    caseForm.reset();
    document.getElementById('rawOrderText').value = '';
    const titleSpan = document.getElementById('modalTitleText');

    if (caseData) {
      if (titleSpan) titleSpan.textContent = `Editando Diferida de ${caseData.cliente || caseData.orden}`;
      document.getElementById('editCaseId').value = caseData.id;
      document.getElementById('caseOrden').value = caseData.orden || '';
      document.getElementById('caseOrdenFinal').value = caseData.orden_final || '';
      document.getElementById('caseTicket').value = caseData.ticket || '';
      document.getElementById('caseFechaRegistro').value = caseData.fecha_registro || new Date().toISOString().split('T')[0];
      document.getElementById('caseRegistradoPor').value = caseData.registrado_por || 'Moises Gonzalez';
      document.getElementById('caseCedula').value = caseData.cedula || '';
      document.getElementById('caseCliente').value = caseData.cliente || '';
      document.getElementById('caseFechaReprogramada').value = caseData.fecha_reprogramada || caseData.fecha_diferido || '';
      document.getElementById('caseHoraReprogramada').value = caseData.hora_reprogramada || caseData.hora_diferido || '14:00';
      document.getElementById('caseGestionadoPor').value = caseData.gestionado_por || 'Sin gestionar';
      document.getElementById('caseMdt').value = caseData.mdt || '';
      document.getElementById('caseCuadrilla').value = caseData.cuadrilla || '';
      document.getElementById('caseSolicitadoPor').value = caseData.solicitado_por || 'Jeremi Gil';
      document.getElementById('caseTelefono').value = caseData.telefono || '';
      document.getElementById('caseDireccion').value = caseData.direccion || '';
      document.getElementById('casePrioridad').value = caseData.prioridad || 'MEDIA';
      document.getElementById('caseEstado').value = caseData.estado || 'Pendiente';
      document.getElementById('caseAvance').value = caseData.avance || '';

      setSelectValue('caseZona', caseData.zona || 'Zona 3-Z');
      setSelectValue('caseSupervisor', caseData.supervisor || 'Roberto Carrillo');
      mapMotivoToSelect(caseData.motivo || 'Instalación por reconexión (cliente recuperado)');
    } else {
      if (titleSpan) titleSpan.textContent = 'Registrar Caso SICS';
      document.getElementById('editCaseId').value = '';
      document.getElementById('caseFechaRegistro').value = new Date().toISOString().split('T')[0];
      document.getElementById('caseRegistradoPor').value = 'Moises Gonzalez';
      document.getElementById('caseOrden').value = '';
      document.getElementById('caseOrdenFinal').value = '';
      document.getElementById('caseEstado').value = 'Pendiente';
      document.getElementById('casePrioridad').value = 'MEDIA';
      document.getElementById('caseZona').value = 'Zona 3-Z';
      document.getElementById('caseSupervisor').value = 'Roberto Carrillo';
      document.getElementById('caseSolicitadoPor').value = 'Jeremi Gil';
      document.getElementById('caseGestionadoPor').value = 'Sin gestionar';
      document.getElementById('caseHoraReprogramada').value = '14:00';
      document.getElementById('caseMotivoSelect').value = 'Instalación por reconexión (cliente recuperado)';
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
    const orden_final = document.getElementById('caseOrdenFinal').value.trim();
    const ticket = document.getElementById('caseTicket').value.trim();
    const fecha_registro = document.getElementById('caseFechaRegistro').value;
    const registrado_por = document.getElementById('caseRegistradoPor').value.trim();
    const cedula = document.getElementById('caseCedula').value.trim();
    const cliente = document.getElementById('caseCliente').value.trim();
    const zona = document.getElementById('caseZona').value;
    const supervisor = document.getElementById('caseSupervisor').value;
    const mdt = document.getElementById('caseMdt').value.trim();
    const cuadrilla = document.getElementById('caseCuadrilla').value.trim();
    const solicitado_por = document.getElementById('caseSolicitadoPor').value.trim();
    const telefono = document.getElementById('caseTelefono').value.trim();
    const direccion = document.getElementById('caseDireccion').value.trim();
    const prioridad = document.getElementById('casePrioridad').value;
    const estado = document.getElementById('caseEstado').value;
    const fecha_reprogramada = document.getElementById('caseFechaReprogramada').value;
    const hora_reprogramada = document.getElementById('caseHoraReprogramada').value;
    const gestionado_por = document.getElementById('caseGestionadoPor').value.trim();

    const motivoSelectVal = document.getElementById('caseMotivoSelect').value;
    const motivoDetalleVal = document.getElementById('caseMotivoDetalle').value.trim();
    const motivo = (motivoSelectVal === 'Otro' && motivoDetalleVal) ? motivoDetalleVal : motivoSelectVal;
    const avance = document.getElementById('caseAvance').value.trim();

    if (!orden || !cliente) {
      Swal.fire('Atención', 'Por favor ingresa al menos N° de Orden y Nombre del Cliente.', 'warning');
      return;
    }

    let savedCase = null;

    if (editId) {
      const idx = cases.findIndex(c => c.id === editId);
      if (idx !== -1) {
        cases[idx] = {
          ...cases[idx],
          orden, orden_final, ticket, fecha_registro, registrado_por, cedula, cliente,
          zona, supervisor, mdt, cuadrilla, solicitado_por, telefono, direccion,
          prioridad, estado, motivo, fecha_reprogramada, hora_reprogramada, gestionado_por,
          // Compatibilidad con Google Sheets
          fecha_diferido: fecha_reprogramada,
          hora_diferido: hora_reprogramada,
          motivo_diferido: motivo,
          avance
        };
        savedCase = cases[idx];
      }
    } else {
      const newCase = {
        id: 'case_' + (orden || Date.now()),
        orden, orden_final, ticket, fecha_registro, registrado_por, cedula, cliente,
        zona, supervisor, mdt, cuadrilla, solicitado_por, telefono, direccion,
        prioridad, estado, motivo, fecha_reprogramada, hora_reprogramada, gestionado_por,
        fecha_diferido: fecha_reprogramada,
        hora_diferido: hora_reprogramada,
        motivo_diferido: motivo,
        avance,
        timestamp: Date.now()
      };
      cases.unshift(newCase);
      savedCase = newCase;
    }

    saveCases();
    renderCases();
    closeModal();

    if (savedCase) {
      pushCaseToCloud(savedCase);
    }

    Swal.fire({
      icon: 'success',
      title: editId ? 'Caso SICS Actualizado' : 'Caso SICS Registrado',
      timer: 1400,
      showConfirmButton: false
    });
  });

  // 12. ACCIONES RÁPIDAS (WhatsApp, Marcar Realizado, Editar, Eliminar)
  window.editarCaso = function(id) {
    const c = cases.find(item => item.id === id);
    if (c) openModal(c);
  };

  window.marcarResuelto = function(id) {
    const c = cases.find(item => item.id === id);
    if (c) {
      c.estado = 'Realizado';
      saveCases();
      renderCases();
      updateStatusInCloud(c.id, 'Realizado');

      Swal.fire({
        icon: 'success',
        title: '¡Caso Cumplido!',
        text: `Orden #${c.orden} marcada como Realizada.`,
        timer: 1300,
        showConfirmButton: false
      });
    }
  };

  window.copiarFichaWhatsApp = function(id) {
    const c = cases.find(item => item.id === id);
    if (!c) return;

    let text = `*ODT SICS AIRTEK — #${c.orden}*\n`;
    text += `*Cliente:* ${c.cliente}\n`;
    if (c.cedula) text += `*C.I.:* ${c.cedula}\n`;
    if (c.telefono) text += `*Teléfono:* ${c.telefono}\n`;
    text += `*Zona / MDT:* ${c.zona || 'Zona 3-Z'} | ${c.mdt || 'N/A'}\n`;
    if (c.cuadrilla) text += `*Cuadrilla:* ${c.cuadrilla}\n`;
    if (c.motivo) text += `*Motivo:* ${c.motivo}\n`;
    if (c.direccion) text += `*Dirección:* ${c.direccion}\n`;
    if (c.hora_reprogramada) text += `*Reprogramada para:* ${c.hora_reprogramada}\n`;
    text += `*Estatus:* ${c.estado || 'Pendiente'}\n`;
    if (c.avance) text += `*Nota:* ${c.avance}`;

    navigator.clipboard.writeText(text).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Ficha copiada',
        text: 'Lista para pegar en el grupo de WhatsApp.',
        timer: 1200,
        showConfirmButton: false
      });
    });
  };

  window.eliminarCaso = function(id) {
    Swal.fire({
      title: '¿Eliminar caso?',
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

  // 13. SINCRONIZACIÓN GOOGLE SHEETS
  function getCloudUrl() {
    return localStorage.getItem(CLOUD_URL_KEY) || DEFAULT_CLOUD_URL;
  }

  function setCloudUrl(url) {
    localStorage.setItem(CLOUD_URL_KEY, url.trim());
  }

  async function syncWithCloud(interactive = false) {
    const cloudUrl = getCloudUrl();
    if (!cloudUrl) {
      if (interactive) openCloudModal();
      return;
    }

    if (btnSyncCloud) {
      btnSyncCloud.querySelector('i').classList.add('fa-spin');
    }

    try {
      const resp = await fetch(`${cloudUrl}?action=list_cases`, { method: 'GET' });
      if (!resp.ok) throw new Error('Error al conectar con Sheets');
      const json = await resp.json();

      if ((json.status === 'success' || json.ok === true) && Array.isArray(json.data)) {
        const remoteCases = json.data;
        const localMap = new Map();
        cases.forEach(c => localMap.set(String(c.id || c.orden), c));

        remoteCases.forEach(rc => {
          const key = String(rc.id || rc.orden);
          if (localMap.has(key)) {
            const local = localMap.get(key);
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
            text: `Base actualizada (${cases.length} casos).`,
            timer: 1400,
            showConfirmButton: false
          });
        }
      }
    } catch (err) {
      console.warn('Sync cloud warning:', err);
      if (interactive) {
        Swal.fire('Atención', 'No se pudo sincronizar con Google Sheets. Revisa el enlace Apps Script.', 'warning');
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
      console.warn('Error enviando caso a Sheets:', e);
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
      console.warn('Error actualizando estado en Sheets:', e);
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
      console.warn('Error eliminando caso en Sheets:', e);
    }
  }

  function openCloudModal() {
    if (inputCloudUrl) inputCloudUrl.value = getCloudUrl();
    if (modalCloudBackdrop) modalCloudBackdrop.style.display = 'flex';
  }

  function closeCloudModal() {
    if (modalCloudBackdrop) modalCloudBackdrop.style.display = 'none';
  }

  // 14. REPORTES Y EXPORTACIÓN
  if (btnCopiarResumenWhatsApp) {
    btnCopiarResumenWhatsApp.addEventListener('click', () => {
      const activos = cases.filter(c => c.estado !== 'Realizado' && c.estado !== 'Resuelto');
      if (activos.length === 0) {
        Swal.fire('Sin pendientes', 'No hay casos pendientes actualmente.', 'info');
        return;
      }

      let report = `*SICS CONTROL Y SEGUIMIENTO — PENDIENTES*\n`;
      report += `Fecha: ${new Date().toLocaleDateString('es-VE')}\n`;
      report += `Total pendientes: ${activos.length}\n\n`;

      activos.forEach(c => {
        report += `• *Orden #${c.orden}* | ${c.cliente} | ${c.zona} | Cuad: ${c.cuadrilla || 'S/A'} | Mot: ${c.motivo || 'N/A'}\n`;
      });

      navigator.clipboard.writeText(report).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Reporte consolidado copiado',
          timer: 1500,
          showConfirmButton: false
        });
      });
    });
  }

  if (btnExportar) {
    btnExportar.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cases, null, 2));
      const dlAnchor = document.createElement('a');
      dlAnchor.setAttribute('href', dataStr);
      dlAnchor.setAttribute('download', `sics_casos_${new Date().toISOString().split('T')[0]}.json`);
      dlAnchor.click();
    });
  }

  // 15. EVENTOS GENERALES UI
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

  // Pegado directo en el textarea
  if (rawOrderText) {
    rawOrderText.addEventListener('paste', () => {
      setTimeout(() => parsePastedOrder(rawOrderText.value), 60);
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
      if (val) syncWithCloud(true);
    });
  }

  // Filtros dinámicos
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

  // Control de Tema
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

  // Atajo de teclado (Ctrl + N)
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'n') {
      e.preventDefault();
      openModal();
    }
  });

  // 16. CICLOS DE EJECUCIÓN CONTINUA
  // Vigilancia de alarmas insistentes cada 5 segundos
  setInterval(checkReprogrammedAlarms, 5000);
  checkReprogrammedAlarms();

  // Sincronización en segundo plano con Google Sheets cada 60 segundos
  setInterval(() => {
    renderCases();
    if (getCloudUrl()) syncWithCloud(false);
  }, 60000);

  // Inicializar
  initTheme();
  renderCases();
  if (getCloudUrl()) syncWithCloud(false);
});
