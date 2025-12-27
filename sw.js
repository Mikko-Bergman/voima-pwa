const CACHE='voima-pwa-v2';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(ASSETS);self.skipWaiting();})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.map(k=>k===CACHE?null:caches.delete(k)));self.clients.claim();})()));
self.addEventListener('fetch',e=>e.respondWith((async()=>{const req=e.request;const c=await caches.open(CACHE);const cached=await c.match(req);if(cached) return cached;try{const fresh=await fetch(req);if(req.method==='GET'&&new URL(req.url).origin===self.location.origin){c.put(req,fresh.clone());}return fresh;}catch(err){if(req.mode==='navigate') return c.match('./index.html');throw err;}})()));
