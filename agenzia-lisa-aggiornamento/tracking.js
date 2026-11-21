// Eventi di conversione: chiamate, WhatsApp, invio modulo.
// Non usa cookie e non carica servizi esterni. Scrive nel dataLayer, pronto per
// Google Analytics 4 / Google Ads quando verranno collegati (con banner di consenso).
(function () {
  window.dataLayer = window.dataLayer || [];
  window.trackEvent = function (name, params) {
    var data = Object.assign({ event: name, page_path: location.pathname }, params || {});
    window.dataLayer.push(data);
    if (typeof window.gtag === 'function') {
      var p = Object.assign({}, params || {});
      window.gtag('event', name, p);
    }
  };
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) {
      window.trackEvent('click_chiamata', { numero: href.replace('tel:', '') });
    } else if (href.indexOf('wa.me') !== -1) {
      window.trackEvent('click_whatsapp', { link_url: href });
    }
  });
})();
