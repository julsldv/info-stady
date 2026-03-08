/**
 * Firebase Auth pour le backoffice.
 * À charger après firebase-app.js et config.firebase.js.
 * requireAuth() : redirige vers index si non connecté.
 */
(function() {
  function getBasePath() {
    var path = window.location.pathname;
    if (path.endsWith('index.html') || path === '/' || path === '') return '';
    var last = path.lastIndexOf('/');
    return last <= 0 ? '' : path.slice(0, last + 1);
  }
  window.getBasePath = getBasePath;

  var base = getBasePath();
  var indexUrl = base + (base.endsWith('/') ? '' : '/') + 'index.html';

  function requireAuth() {
    if (!window.firebaseAuth) {
      return Promise.reject(new Error('Firebase non chargé. Rechargez la page.'));
    }
    return new Promise(function(resolve, reject) {
      var unsub = window.firebaseAuth.onAuthStateChanged(function(user) {
        unsub();
        if (user) resolve(user);
        else {
          window.location.href = indexUrl;
          reject(new Error('Non authentifié'));
        }
      });
    });
  }
  window.requireAuth = requireAuth;

  if (typeof firebase === 'undefined' || !firebase.auth) return;

  var config = window.FIREBASE_CONFIG;
  if (!config || !config.apiKey || config.apiKey === 'YOUR_API_KEY') return;

  if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(config);
  }
  window.firebaseAuth = firebase.auth();
  window.requireAuth = requireAuth;
})();
