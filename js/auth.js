/**
 * Firebase Auth + garde pour pages protégées.
 * À charger après firebase-app.js et config.firebase.js.
 */
(function() {
  if (!window.FIREBASE_CONFIG || !window.firebase || !firebase.apps || !firebase.apps.length) {
    return;
  }
  const auth = firebase.auth();
  window.firebaseAuth = auth;

  /** Redirige vers index si non connecté (pour les pages protégées). */
  function requireAuth() {
    return new Promise((resolve, reject) => {
      const unsub = auth.onAuthStateChanged(user => {
        unsub();
        if (user) resolve(user);
        else {
          const base = getBasePath();
          window.location.href = base + (base.endsWith('/') ? '' : '/') + 'index.html';
          reject(new Error('Non authentifié'));
        }
      });
    });
  }

  function getBasePath() {
    const path = window.location.pathname;
    if (path.endsWith('index.html') || path === '/' || path === '') return '';
    const last = path.lastIndexOf('/');
    return last <= 0 ? '' : path.slice(0, last + 1);
  }

  window.requireAuth = requireAuth;
  window.getBasePath = getBasePath;
})();
