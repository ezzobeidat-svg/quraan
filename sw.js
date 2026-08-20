// Service Worker بسيط لتطبيق "حفظ القرآن"
// وجوده ضروري حتى يتعامل أندرويد مع التطبيق كـ PWA مثبت فعليًا، وليس كـ اختصار عادي
const CACHE_NAME = 'hifz-quran-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// أبسط استراتيجية: تمرير الطلبات مباشرة (Network first) مع تسجيل نسخة بالكاش لو الشبكة غير متاحة
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
