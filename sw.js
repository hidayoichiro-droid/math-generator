// sw.js — Service Worker v3 (ネットワーク優先)
const CACHE = 'math-gen-v4';
const ASSETS = [
  './', './index.html', './worksheet.html',
  './app.css', './app.js', './generator.js', './storage.js',
  './worksheet.css', './worksheet.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png'
];

// インストール時：全ファイルをキャッシュ
self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE)
    .then(c => c.addAll(ASSETS))
    .then(() => self.skipWaiting())
));

// 有効化時：古いキャッシュを全削除
self.addEventListener('activate', e => e.waitUntil(
  caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));

// フェッチ時：ネットワーク優先 → 失敗時のみキャッシュを使用
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // 成功したらキャッシュにも保存
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
