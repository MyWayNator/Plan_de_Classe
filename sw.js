// Service worker : met l'appli en cache pour qu'elle s'ouvre sans réseau.
// Incrémenter VERSION à chaque mise à jour de l'appli.
const VERSION = 'v1.0.0';
const CACHE = 'plan-classe-' + VERSION;
const FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('plan-classe-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Réponse immédiate depuis le cache, puis mise à jour en arrière-plan quand le réseau est là.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const font = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !font) return;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const key = sameOrigin && req.mode === 'navigate' ? './index.html' : req;
      const cached = await cache.match(key, {ignoreSearch: sameOrigin});
      const fresh = fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) cache.put(key, res.clone());
        return res;
      }).catch(() => cached);
      return cached || fresh;
    })
  );
});
