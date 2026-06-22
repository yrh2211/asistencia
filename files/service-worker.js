const CACHE_NAME = 'asistencia-damur-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/app.js',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.min.js'
];

// Instalar Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cacheando archivos');
      return cache.addAll(URLS_TO_CACHE).catch(err => {
        console.log('Error cacheando archivos:', err);
        // Continuar sin cachear
      });
    })
  );
  self.skipWaiting();
});

// Activar Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker activado');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - Network first, fallback to cache
self.addEventListener('fetch', event => {
  // No cachear solicitudes POST
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Si es exitosa, actualizar cache
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Si la red falla, usar cache
        return caches.match(event.request).then(response => {
          if (response) {
            return response;
          }
          // Si no está en cache, retornar página offline
          return new Response('Sin conexión a internet. Por favor, intenta de nuevo.', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// Sincronización en background (opcional)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-asistencia') {
    event.waitUntil(
      // Aquí se podría sincronizar datos cuando haya conexión
      Promise.resolve()
    );
  }
});
