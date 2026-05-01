const CACHE_NAME = 'nav-openlayers-v1';

// Daftar file inti yang di-cache untuk mode offline dasar
const CORE_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn.jsdelivr.net/npm/ol@v9.1.0/ol.css',
    'https://cdn.jsdelivr.net/npm/ol@v9.1.0/dist/ol.js'
];

// Instalasi Service Worker & Caching Aset
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching kerangka aplikasi...');
                return cache.addAll(CORE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Aktivasi & Pembersihan Cache Lama
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Menghapus cache lama:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Intersepsi Jaringan (Fetch)
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);

    // Jangan cache request ke API pihak ketiga (Routing, Traffic, Geocoding)
    // Biarkan request ini selalu meminta data terbaru (Network Only)
    if (requestUrl.hostname.includes('router.project-osrm.org') || 
        requestUrl.hostname.includes('photon.komoot.io') ||
        requestUrl.hostname.includes('api.tomtom.com')) {
        return; 
    }

    // Strategi Stale-While-Revalidate untuk aset aplikasi
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                // Jangan cache gambar map tile (*.png dari Carto) agar penyimpanan memori ponsel tidak bengkak
                if (requestUrl.hostname.includes('cartocdn.com')) {
                    return networkResponse;
                }
                
                // Perbarui cache dengan respons jaringan terbaru
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                });
                return networkResponse;
            }).catch(() => {
                // Jika offline dan jaringan gagal, kembalikan response cache
                return cachedResponse;
            });

            return cachedResponse || fetchPromise;
        })
    );
});
