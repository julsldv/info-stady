# Vérification : Firebase Web + repo GitHub (backoffice Stady)

Coche au fur et à mesure. Projet Firebase : **stady-98226**. Repo GitHub : **info-stady**.

---

## A. Firebase Console (projet stady-98226)

### A1. Application Web
- [ ] Ouvre **[Paramètres du projet](https://console.firebase.google.com/project/stady-98226/settings/general)**.
- [ ] Section **« Vos applications »** : une app **Web** (icône `</>`) existe.
- [ ] En cliquant dessus : **projectId** = `stady-98226`, **apiKey** commence par `AIza...` (comme dans ton `index.html` / `config.firebase.js`).

### A2. Authentication – Méthode de connexion
- [ ] Ouvre **[Méthodes de connexion](https://console.firebase.google.com/project/stady-98226/authentication/providers)**.
- [ ] **E-mail/Mot de passe** : statut **Activé** (bouton bleu).

### A3. Authentication – Utilisateurs
- [ ] Ouvre **[Utilisateurs](https://console.firebase.google.com/project/stady-98226/authentication/users)**.
- [ ] Au moins **un utilisateur** avec e-mail + mot de passe (celui que tu utilises pour te connecter au backoffice).

### A4. Firestore – Règles
- [ ] Ouvre **[Règles Firestore](https://console.firebase.google.com/project/stady-98226/firestore/rules)**.
- [ ] Présence de :
  - `match /Stades/{stadeId} { allow read, write: if request.auth != null; }`
  - `match /Contestants/{contestantId} { allow read, write: if request.auth != null; }`
- [ ] Clic sur **Publier** si tu viens de modifier.

### A5. Domaines autorisés (si tu utilises GitHub Pages)
- [ ] Dans **Paramètres du projet** → ton app Web → **Domaines autorisés** (ou **Authentication** → **Settings** → **Authorized domains**).
- [ ] `julsldv.github.io` (ou ton domaine GitHub Pages) est dans la liste. Sinon, **Ajouter un domaine**.

---

## B. Repo GitHub (info-stady)

### B1. Structure du repo
À la racine du repo **info-stady**, tu dois avoir **exactement** ces fichiers/dossiers (pas dans un sous-dossier) :

```
info-stady/
  index.html          ← page d’accueil + connexion (obligatoire)
  config-check.html
  stades.html
  stade-form.html
  contestants.html
  contestant-form.html
  css/
    style.css
  js/
    config.firebase.js
    auth.js
    db.js
    app.js
```

- [ ] `index.html` est à la **racine** du repo (pas dans un dossier du type `info-stady/` ou `public/`).
- [ ] Le dossier `js/` existe et contient au moins `config.firebase.js`, `auth.js`, `db.js`, `app.js`.
- [ ] Le dossier `css/` existe et contient `style.css`.

### B2. Contenu de index.html (critique)
- [ ] Dans `index.html`, tu as bien un bloc qui définit **`window.FIREBASE_CONFIG`** avec au moins :
  - `projectId: "stady-98226"`
  - `apiKey` qui n’est **pas** `"YOUR_API_KEY"` (une vraie clé du type `AIza...`).
- [ ] Juste après ce bloc, tu as : `firebase.initializeApp(window.FIREBASE_CONFIG);` et `window.firebaseAuth = firebase.auth();`.

### B3. Contenu de js/config.firebase.js
- [ ] Même config que dans `index.html` : `window.FIREBASE_CONFIG = { apiKey: "AIza...", projectId: "stady-98226", ... }` (pas de `YOUR_API_KEY`).

### B4. GitHub Pages
- [ ] Repo **info-stady** → **Settings** → **Pages**.
- [ ] **Source** : “Deploy from a branch”.
- [ ] **Branch** : `main` (ou `master`), dossier **/ (root)**.
- [ ] L’URL du site est bien : **https://julsldv.github.io/info-stady/** (ou ton username / nom de repo).

### B5. Structure à la racine (éviter la 404)
Sur GitHub, à la **racine** du repo **info-stady**, tu dois avoir :
- **index.html** (et pas seulement dans un sous-dossier)
- le dossier **js/** avec auth.js, config.firebase.js, db.js, app.js
- le dossier **css/** avec style.css

Si tout est dans un sous-dossier (ex. un dossier **info-stady** à l’intérieur du repo), GitHub Pages ne trouvera pas **index.html** à l’URL `.../info-stady/` et tu auras une 404 « File not found ». **Solution** : déplace le contenu (index.html, js/, css/, etc.) **à la racine** du repo, pas dans un sous-dossier.

### B6. Vérifier que le bon index est servi
- [ ] Ouvre **https://julsldv.github.io/info-stady/** (avec le **slash final** si besoin).
- [ ] Ouvre les **outils de développement** (F12) → onglet **Réseau** (Network) → recharge la page.
- [ ] La requête **index.html** renvoie **200**.
- [ ] Les requêtes **js/auth.js**, **js/config.firebase.js** renvoient **200** (pas 404).
- [ ] Tu vois la page **Backoffice Stady** avec le formulaire. Au clic sur « Se connecter », si tu as « Firebase n’a pas pu se charger » ou une 404, une ressource (souvent **js/auth.js**) n’est pas chargée : vérifie la structure du repo (B5) et que la balise `<base>` est bien appliquée (fichiers à jour avec la correction chemin GitHub Pages).

---

## Récap

| Où | À vérifier |
|----|------------|
| **Firebase** | App Web, Auth (E-mail/Mot de passe activé + 1 utilisateur), Règles Stades/Contestants, domaine autorisé |
| **GitHub** | Structure à la racine, `index.html` avec config + `firebaseAuth`, `js/config.firebase.js` à jour, Pages activées, URL correcte |

Si tout est coché et que la connexion échoue encore : ouvre **https://julsldv.github.io/info-stady/config-check.html** et vérifie que tous les tests (config, Firebase initialisé, Auth, Firestore) sont verts.
