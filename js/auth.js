/**
 * Firebase Auth + garde pour pages protégées.
 * À charger après firebase-app.js et config.firebase.js.
 * Backoffice : seuls les e-mails listés dans ADMIN_EMAILS peuvent accéder (requireAdmin).
 */
(function() {
  var errMsg = 'Firebase ou config non chargé. Vérifiez js/config.firebase.js et rechargez la page.';
  function stubReject() {
    return Promise.reject(new Error(errMsg));
  }
  window.requireAuth = stubReject;
  window.requireAdmin = stubReject;
  window.getBasePath = function() { return ''; };

  if (typeof firebase === 'undefined' || !firebase.auth) return;

  var config = window.FIREBASE_CONFIG;
  if (!config || !config.apiKey || config.apiKey === 'YOUR_API_KEY') return;

  if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(config);
  }
  const auth = firebase.auth();
  window.firebaseAuth = auth;

  /**
   * Liste des e-mails autorisés à accéder au backoffice (à garder alignée avec firestore.rules).
   * Comparaison en minuscules.
   */
  var ADMIN_EMAILS = ['admin@stady.com'];
  window.ADMIN_EMAILS = ADMIN_EMAILS;
  window.ADMIN_EMAIL = ADMIN_EMAILS[0];

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

  /**
   * Exige d'être connecté avec le compte admin (admin@stady.com).
   * Sinon : déconnexion et redirection vers index.html.
   */
  function requireAdmin() {
    return new Promise((resolve, reject) => {
      const unsub = auth.onAuthStateChanged(user => {
        unsub();
        if (!user) {
          const base = getBasePath();
          window.location.href = base + (base.endsWith('/') ? '' : '/') + 'index.html';
          reject(new Error('Non authentifié'));
          return;
        }
        var email = (user.email || '').toLowerCase();
        if (ADMIN_EMAILS.indexOf(email) === -1) {
          auth.signOut();
          const base = getBasePath();
          window.location.href = base + (base.endsWith('/') ? '' : '/') + 'index.html?error=access_denied';
          reject(new Error('Accès réservé à l\'administrateur'));
          return;
        }
        resolve(user);
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
  window.requireAdmin = requireAdmin;
  window.getBasePath = getBasePath;
})();
