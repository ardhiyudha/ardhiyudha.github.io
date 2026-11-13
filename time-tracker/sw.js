const CACHE='time-tracker-shell-v4';
const CORE=['./','./index.html','./config.js','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{
  if(r.ok&&e.request.url.startsWith(location.origin)){const clone=r.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));}
  return r;
 }).catch(()=>caches.match('./index.html'))));
});
