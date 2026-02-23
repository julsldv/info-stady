/**
 * Firebase Auth + garde pour pages protégées.
 * À charger après firebase-app.js et config.firebase.js.
 * Backoffice : seul admin@stady.com peut accéder (requireAdmin).
 */
(function() {
  if (!window.FIREBASE_CONFIG || !window.firebase || !firebase.apps || !firebase.apps.length) {
    return;
  }
  const auth = firebase.auth();
  window.firebaseAuth = auth;

  /** E-mail du compte autorisé à accéder au backoffice (aligné sur firestore.rules). */
  const ADMIN_EMAIL = 'admin@stady.com';
  window.ADMIN_EMAIL = ADMIN_EMAIL;

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
        if ((user.email || '').toLowerCase() !== ADMIN_EMAIL) {
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
