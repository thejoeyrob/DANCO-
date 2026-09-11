importScripts('./narration-manifest.js?v=36.0.0');

const CACHE_NAME = 'danco-workforce-standard-plus-v36-admin-invites-accessibility-20260911';

const OLD_BACKEND = 'https://danco-assessment-service.josephrwhelan.chatgpt.site';
const NEW_BACKEND = 'https://uneqycntlykjedaaynou.supabase.co/functions/v1/danco-service-v5';

const CORE_ASSETS = [
  './',
  './index.html?v=36.0.0',
  './app.css?v=36.0.0',
  './app.js?v=36.0.0',
  './narration-manifest.js?v=36.0.0',
  './manifest.webmanifest?v=36.0.0',
  './danco-logo.webp',
  './danco-logo-white.png',
  './danco-logo-gold.png',
  './danco-plus-logo-gold.png',
  './joseph-whelan-eds-white.png',
  './danco-helper-english.png',
  './danco-helper-spanish.png',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './icon-danco-plus-192.png',
  './icon-danco-plus-512.png',
  './apple-touch-icon-danco-plus.png',
  './social-preview.png',
  './leaderboard-hero-rendered.png',
  './visual-epdm.png',
  './visual-tpo.png',
  './visual-pvc.png',
  './visual-metal.png',
  './visual-tpo_correct.png',
  './visual-tpo_exposed.png',
  './visual-tpo_fishmouth.png',
  './visual-tpo_badlayout.png',
  './visual-ladder-3ft.png',
  './visual-ladder-1ft.png',
  './visual-ladder-2ft.png',
  './visual-ladder-flush.png',
  './visual-tool-seam-probe.png',
  './visual-tool-core-cutter.png',
  './visual-tool-chalk-reel.png',
  './visual-tool-tin-snips.png',
  './visual-action-clean-dry.png',
  './visual-action-more-heat.png',
  './visual-action-more-overlap.png',
  './visual-action-seal-over.png',
  './visual-signal-qualified.png',
  './visual-signal-roofer.png',
  './visual-signal-driver.png',
  './visual-signal-none.png',
  './visual-zone-perimeter.png',
  './visual-zone-center.png',
  './visual-zone-drain.png',
  './visual-zone-equal.png'
];

const NARRATION_ASSETS = [
  './narration-en.mp3?v=36.0.0',
  './narration-es.mp3?v=36.0.0'
];

const PITCH_AUDIO_ASSETS = [
  'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/096d0dd6-da7a-40e3-a45f-5342a206499d.mp3',
  'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/94d3ad02-9857-4e8d-b1e0-fb00e38ec69d.mp3',
  'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/fa4f3dd7-2615-477c-a290-c21002aba1c4.mp3',
  'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/f90539f4-abc1-4b98-b91e-c4a4bce48cd1.mp3',
  'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/502fb2b7-96b9-4f29-9471-301dc369c169.mp3',
  'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/550a00ae-8efa-4bbb-a314-94910513fc03.mp3',
  'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/60def49a-a1f6-4fe1-9b51-99694582f285.mp3',
  'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/bd95d6da-b389-4ae8-9b41-4e7582ffd9a0.mp3',
  'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/51858cee-2526-417f-8b7e-8d8874349852.mp3',
  'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/d73d3abe-fb7c-4f87-939e-19aef6d9bff0.mp3'
];

self.addEventListener('install', event => event.waitUntil(
  caches.open(CACHE_NAME)
    .then(cache =>
      cache.addAll(CORE_ASSETS)
        .then(() => Promise.allSettled([...NARRATION_ASSETS, ...PITCH_AUDIO_ASSETS].map(asset => cache.add(asset))))
    )
    .then(() => self.skipWaiting())
));

self.addEventListener('activate', event => event.waitUntil(
  caches.keys()
    .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
    .then(() => self.clients.claim())
));

async function forwardToSupabase(request) {
  const originalUrl = new URL(request.url);
  const targetUrl = NEW_BACKEND + originalUrl.pathname + originalUrl.search;

  const headers = new Headers(request.headers);
  const init = {
    method: request.method,
    headers,
    mode: 'cors',
    credentials: 'omit',
    cache: 'no-store',
    redirect: 'follow'
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = await request.clone().arrayBuffer();
  }

  return fetch(targetUrl, init);
}

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // Live-data bridge:
  // Existing app.js still calls the old service URL.
  // Route those API calls to the new Supabase Edge Function instead.
  if (requestUrl.origin === OLD_BACKEND && requestUrl.pathname.startsWith('/api/')) {
    event.respondWith(forwardToSupabase(event.request));
    return;
  }

  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match('./index.html?v=36.0.0'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached =>
      cached ||
      fetch(event.request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
    )
  );
});
