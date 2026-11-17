document.addEventListener('DOMContentLoaded', function () {

  // ── Popup annuncio R.E.V.E.
  const overlay = document.getElementById('popupOverlay');
  function closePopup() { overlay.classList.add('hidden'); }
  document.getElementById('popupClose').addEventListener('click', closePopup);
  document.getElementById('popupClose2').addEventListener('click', closePopup);
  document.getElementById('popupCta').addEventListener('click', closePopup);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closePopup();
  });

  // ── Hero slideshow (crossfade fra 3 foto ogni 2s)
  const photos = ['foto0.jpg', 'foto1.jpg', 'foto2.jpg'];
  const layerA = document.getElementById('slideA');
  const layerB = document.getElementById('slideB');

  if (layerA && layerB) {
    let current = 0;
    let active = layerA;
    let inactive = layerB;
    const overlay = 'linear-gradient(to bottom, rgba(10,0,0,0.58) 0%, rgba(10,0,0,0.42) 55%, rgba(10,0,0,0.70) 100%)';

    function setBg(el, photo) {
      el.style.backgroundImage = overlay + ", url('" + photo + "')";
    }

    setBg(active, photos[0]);
    active.style.opacity = '1';
    inactive.style.opacity = '0';

    setInterval(function () {
      current = (current + 1) % photos.length;
      setBg(inactive, photos[current]);
      inactive.style.opacity = '1';
      active.style.opacity = '0';
      var tmp = active;
      active = inactive;
      inactive = tmp;
    }, 2000);
  }

  // ── Modal documenti per servizio
  const servizi = {
    trasferimento: {
      titolo: 'Trasferimento di proprietà',
      docs: [
        'Documenti di riconoscimento venditore',
        'Documenti di riconoscimento acquirente',
        'Carta di circolazione',
        'CDP o CDPD (Certificato di proprietà)',
      ]
    },
    patente: {
      titolo: 'Rinnovo patente',
      docs: [
        'Patente',
        'Fototessera a fondo bianco',
        'Visita medica in sede',
      ]
    },
    immatricolazione: {
      titolo: 'Immatricolazioni veicoli esteri',
      docs: [
        'Documento d\'identità in corso di validità',
        'Codice fiscale o tessera sanitaria',
        'Titolo di proprietà del veicolo (fattura o atto di vendita)',
        'Carta di circolazione estera',
        'Certificato di conformità (COC) o perizia tecnica',
        'Prova di residenza in Italia',
      ]
    },
    duplicati: {
      titolo: 'Duplicati',
      docs: [
        'Carta d\'identità in corso di validità',
        'Codice fiscale',
        'Denuncia di smarrimento o furto (se applicabile)',
        'Libretto di circolazione (se disponibile)',
        'Marca da bollo',
      ]
    },
    assicurazione: {
      titolo: 'Assicurazioni RCA',
      docs: [
        'Carta d\'identità in corso di validità',
        'Codice fiscale',
        'Patente di guida',
        'Libretto di circolazione',
        'Attestato di rischio (se si cambia compagnia)',
      ]
    },
    reve: {
      titolo: 'Contratto R.E.V.E.',
      docs: [
        'Carta di circolazione estera',
        'Data certa',
        'Documenti di riconoscimento dell\'utilizzatore del veicolo',
      ]
    },
    bollo: {
      titolo: 'Pagamento bollo',
      docs: [
        'Carta di circolazione del veicolo',
        'Codice fiscale dell\'intestatario',
        'Metodo di pagamento (contanti o carta)',
      ]
    },
    'patente-internazionale': {
      titolo: 'Patenti internazionali',
      docs: [
        'Patente di guida in corso di validità',
        'Carta d\'identità in corso di validità',
        'Codice fiscale',
        '1 foto tessera recente',
      ]
    },
    'targa-ciclomotore': {
      titolo: 'Targhe ciclomotori',
      docs: [
        'Documento di identità in corso di validità',
        'Codice fiscale',
        'Libretto del ciclomotore',
      ]
    },
    visure: {
      titolo: 'Visure',
      docs: [
        'Documento di identità in corso di validità',
        'Codice fiscale',
        'Targa del veicolo da visionare',
      ]
    }
  };

  const docOverlay = document.getElementById('docOverlay');
  const docTitle = document.getElementById('docModalTitle');
  const docList = document.getElementById('docList');
  const docClose = document.getElementById('docClose');
  const docCta = document.getElementById('docCta');

  function openDocModal(serviceKey) {
    const s = servizi[serviceKey];
    if (!s) return;
    docTitle.textContent = s.titolo;
    docList.innerHTML = s.docs.map(function(d) { return '<li>' + d + '</li>'; }).join('');
    docOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDocModal() {
    docOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.card-clickable').forEach(function(card) {
    card.addEventListener('click', function() {
      openDocModal(card.dataset.service);
    });
  });

  docClose.addEventListener('click', closeDocModal);
  docCta.addEventListener('click', closeDocModal);
  docOverlay.addEventListener('click', function(e) {
    if (e.target === docOverlay) closeDocModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeDocModal();
  });

  // ── Navbar: shadow on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ── Mobile menu toggle
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  toggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });

  // ── Scroll-in animations
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-aos]').forEach(function (el) {
    observer.observe(el);
  });

  // ── Contact form
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      alert('Per favore compila i campi obbligatori prima di inviare.');
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Invio in corso...';

    try {
      const response = await fetch('https://formspree.io/f/xpqnloql', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Messaggio inviato!';
        form.reset();
        setTimeout(function () {
          btn.disabled = false;
          btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Invia richiesta';
        }, 3000);
      } else {
        throw new Error();
      }
    } catch (e) {
      alert('Errore durante l\'invio. Riprova o contattaci telefonicamente.');
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Invia richiesta';
    }
  });
});
