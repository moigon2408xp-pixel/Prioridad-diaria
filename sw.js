/**
 * SICS AIRTEK PWA — SERVICE WORKER
 * Modo Offline, Caché de Recursos y Sincronización
 */

const CACHE_NAME = 'sics-airtek-v1.0.2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './sics_dict.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './favicon.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11'
];

// Instalación: Precargar recursos estáticos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SICS ServiceWorker] Pre-cacheando recursos estáticos');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SICS ServiceWorker] Algunos recursos externos no pudieron ser cacheados:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activación: Limpieza de cachés antiguas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SICS ServiceWorker] Eliminando caché antigua:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Stale-while-revalidate para recursos estáticos, Network-first para llamadas a Google Apps Script
self.addEventListener('fetch', (e) => {
  const url = e.request.url;

  // Si es llamada al API de Google Apps Script, ir primero a la red
  if (url.includes('script.google.com')) {
    e.respondWith(
      fetch(e.request).catch(() => {
        return new Response(JSON.stringify({ 
          success: false, 
          offline: true, 
          error: 'Sin conexión a internet. Los cambios se sincronizarán al reconectar.' 
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // Para el resto de archivos (HTML, CSS, JS, imágenes): Cache first / Stale-while-revalidate
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        // En segundo plano intentamos actualizar la caché si hay red
        fetch(e.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(e.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, responseToCache));
        return networkResponse;
      });
    })
  );
});
