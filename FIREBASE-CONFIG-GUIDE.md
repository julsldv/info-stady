# Vérifier la config Firebase pour le backoffice Stady

Projet : **stady-98226**

---

## 1. Vérifier que l’application Web existe

1. Ouvre : **[Paramètres du projet](https://console.firebase.google.com/project/stady-98226/settings/general)**  
   (ou : Console Firebase → sélectionne le projet **stady-98226** → icône **engrenage** → **Paramètres du projet**)

2. Descends jusqu’à la section **« Vos applications »**.

3. Vérifie qu’il y a **au moins une application Web** (icône **</>** avec le nom "Web" ou un surnom).

4. Si tu n’en as pas : clique sur **« Ajouter une application »** → **</> Web** → donne un surnom (ex. "Backoffice") → **Enregistrer l’application**. Tu obtiendras un objet `firebaseConfig` à copier (pour plus tard si besoin).

5. Clique sur l’application Web : tu dois voir **Clé API (apiKey)**, **ID du projet (projectId)** = `stady-98226`, **Domaines autorisés**, etc. Note : le **projectId** doit être exactement **stady-98226**.

---

## 2. Activer la connexion par e-mail / mot de passe

1. Ouvre : **[Authentication → Sign-in method](https://console.firebase.google.com/project/stady-98226/authentication/providers)**  
   (ou : menu gauche **Build** → **Authentication** → onglet **Sign-in method**)

2. Dans la liste des fournisseurs, trouve **« E-mail/Mot de passe »**.

3. Clique dessus.

4. Passe **« Activer »** sur **Oui** (bouton bleu).

5. Clique **Enregistrer**.

---

## 3. Créer un utilisateur pour te connecter au backoffice

1. Ouvre : **[Authentication → Users](https://console.firebase.google.com/project/stady-98226/authentication/users)**  
   (ou : **Authentication** → onglet **Users**)

2. Clique **« Ajouter un utilisateur »** (ou **Add user**).

3. Saisis un **e-mail** (ex. `admin@ton-domaine.com` ou une adresse que tu contrôles).

4. Saisis un **mot de passe** (au moins 6 caractères). Note-le quelque part.

5. Clique **« Ajouter un utilisateur »**.

→ C’est cet e-mail et ce mot de passe que tu utiliseras sur la page de connexion du backoffice.

---

## 4. Vérifier les règles Firestore (Stades et Contestants)

1. Ouvre : **[Firestore Database → Règles](https://console.firebase.google.com/project/stady-98226/firestore/rules)**  
   (ou : **Build** → **Firestore Database** → onglet **Règles**)

2. Vérifie que tu as bien des règles pour **Stades** et **Contestants** avec accès pour les utilisateurs connectés, par exemple :

   ```
   match /Stades/{stadeId} {
     allow read, write: if request.auth != null;
   }
   match /Contestants/{contestantId} {
     allow read, write: if request.auth != null;
   }
   ```

3. Si ces blocs manquent ou sont en `allow read, write: if false;`, modifie-les comme ci-dessus, puis clique **« Publier »**.

---

## 5. (Optionnel) Vérifier les domaines autorisés pour Auth

1. Toujours dans **[Paramètres du projet](https://console.firebase.google.com/project/stady-98226/settings/general)**.

2. Descends à **« Vos applications »** → clique sur ton **application Web**.

3. Section **« Domaines autorisés »** (ou dans **Authentication → Settings → Authorized domains**) :  
   - `localhost` doit être présent pour les tests en local.  
   - Pour le backoffice sur GitHub Pages, le domaine doit être autorisé, par ex. :  
     **`julsldv.github.io`**  
   (Firebase ajoute parfois automatiquement les domaines utilisés ; si la connexion échoue sur GitHub Pages, ajoute ce domaine.)

---

## Récap : checklist

- [ ] Application Web présente dans **Paramètres** (projectId = stady-98226).
- [ ] **Authentication → Sign-in method** : E-mail/Mot de passe **activé**.
- [ ] **Authentication → Users** : au moins **un utilisateur** créé (email + mot de passe).
- [ ] **Firestore → Règles** : **Stades** et **Contestants** en `read, write` si `request.auth != null`.
- [ ] (Optionnel) Domaine **julsldv.github.io** dans les domaines autorisés si tu utilises GitHub Pages.

Une fois tout ça fait, recharge la page du backoffice et connecte-toi avec l’e-mail et le mot de passe de l’utilisateur créé à l’étape 3.
