# Backoffice Stady (version statique)

Backoffice **100 % statique** pour administrer les collections **Stades** et **Contestants** sur Firestore (projet **stady-98226**). Hébergeable sur GitHub Pages, sans serveur ni clé secrète.

## Prérequis

1. **Firebase Auth (Email/Password)** activé sur le projet [stady-98226](https://console.firebase.google.com/project/stady-98226).
2. **Un utilisateur admin** : dans la console Firebase → Authentication → Users → Add user (email + mot de passe). C’est ce compte que tu utiliseras pour te connecter au backoffice.
3. **Règles Firestore** : les collections `Stades` et `Contestants` doivent autoriser la lecture/écriture pour les utilisateurs connectés (`request.auth != null`). Voir `firestore.rules.snippet.txt` ou le fichier `firestore.rules` à la racine du repo Stady.

## Configuration

1. Dans la [console Firebase](https://console.firebase.google.com/project/stady-98226/settings/general) : **Paramètres du projet** → **Vos applications** → ajoute une **Application web** si tu n’en as pas (icône `</>`).
2. Copie la config (apiKey, authDomain, projectId, etc.) dans **`js/config.firebase.js`** en remplaçant les valeurs `YOUR_API_KEY`, etc.

```js
window.FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "stady-98226.firebaseapp.com",
  projectId: "stady-98226",
  storageBucket: "stady-98226.firebasestorage.app",
  messagingSenderId: "...",
  appId: "..."
};
```

3. (Optionnel) Pour restreindre l’accès au backoffice à certains emails, tu peux ajouter une condition dans les règles Firestore (ex. `request.auth.token.email == "admin@example.com"`).

## Déploiement sur GitHub Pages

1. Clone (ou copie) ce dossier dans ton repo **info-stady** (ou un repo dédié).
2. Sur GitHub : **Settings** → **Pages** → **Source** : “Deploy from a branch” → branche `main` (ou `master`), dossier **/ (root)**.
3. Le site sera disponible à : `https://<ton-username>.github.io/info-stady/` (si le repo s’appelle `info-stady`).

## Utilisation

1. Ouvre l’URL du site (locale ou GitHub Pages).
2. Connecte-toi avec l’email et le mot de passe de ton utilisateur Firebase Auth.
3. Accède à **Stades** et **Contestants** pour lister, créer, modifier et supprimer les documents.

## Index Firestore

Si une requête sur **Contestants** avec filtre par sport échoue, la console Firebase peut proposer de créer un **index composite**. Clique sur le lien fourni dans le message d’erreur pour le créer.

## Fichiers

- `index.html` : page d’accueil + formulaire de connexion.
- `stades.html` / `stade-form.html` : liste et formulaire Stades.
- `contestants.html` / `contestant-form.html` : liste et formulaire Contestants.
- `js/config.firebase.js` : config Firebase (à remplir).
- `js/auth.js` : vérification de l’authentification et redirection si non connecté.
- `js/db.js` : accès Firestore Stades / Contestants.
- `css/style.css` : styles communs.
