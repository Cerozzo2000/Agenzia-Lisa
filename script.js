document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      alert('Per favore compila tutti i campi prima di inviare.');
      return;
    }

    alert('Grazie, la tua richiesta è stata inviata. Ti ricontatteremo presto.');
    form.reset();
  });
});
