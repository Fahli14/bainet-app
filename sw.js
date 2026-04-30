const CACHE_NAME = 'bainet-sales-v2'; // Naikkan versi ke v2 karena ada perubahan aset
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./icon.png",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap",
  "https://cdn.jsdelivr.net/npm/chart.js",
  "https://unpkg.com/html5-qrcode"
];

// Tahap Install: Menyimpan aset statis ke dalam cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Menggunakan ASSETS_TO_CACHE yang sudah didefinisikan di atas
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Tahap Fetch: Mengambil data dari cache jika sedang offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Tahap Activate: Membersihkan cache lama jika ada update
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME)
                  .map((name) => caches.delete(name))
      );
    })
  );
});
