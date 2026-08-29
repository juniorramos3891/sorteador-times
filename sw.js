// Service Worker — Sorteador de Times
const CACHE = 'sorteador-v31';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './Images/Logo.png',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png'
];

// Install: cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: remove old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: network-first, falling back to cache only when offline. An
// actively-developed app needs the freshest code whenever the device is
// online — cache-first previously meant every deploy required TWO
// reloads before the new code actually reached the browser (the first
// reload only lets the browser notice/install the new worker; cache-first
// kept serving the OLD cached response on that very reload). Network-first
// removes that gap: online, you always get the latest deploy on the very
// next load. The cache still exists purely as the offline fallback.
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Cache successful GET responses for offline use later
        if (e.request.method === 'GET' && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request).then(cached => cached || caches.match('./index.html')))
  );
});
