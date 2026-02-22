# Qui peut accéder au backoffice ?

## Comportement

- **Lecture** (Stades, Contestants) : tout utilisateur connecté à l’app (Firebase Auth) peut lire, comme aujourd’hui.
- **Écriture** (créer / modifier / supprimer Stades et Contestants) : **uniquement les comptes dont l’e-mail est listé** dans les règles Firestore.

Donc : les utilisateurs qui se connectent à l’app Stady avec leur mail **peuvent** ouvrir la page du backoffice et se connecter, mais s’ils ne sont pas dans la liste des admins, ils auront une **erreur** s’ils tentent d’ajouter ou modifier un stade/contestant (refus par les règles Firestore).

## Quel utilisateur utiliser pour le backoffice ?

Tu as deux possibilités :

1. **Un compte dédié admin** (recommandé)  
   - Dans Firebase → Authentication → Users → **Ajouter un utilisateur**.  
   - Ex. : `backoffice@mondomaine.com` avec un mot de passe réservé à toi.  
   - Tu utilises **uniquement** ce compte pour te connecter au backoffice.  
   - Dans les règles Firestore, tu mets **cet e-mail** dans la liste des admins (voir ci‑dessous).

2. **Ton compte perso déjà utilisé dans l’app**  
   - Si tu veux utiliser le même e-mail que pour l’app, mets **cet e-mail** dans la liste des admins.  
   - Seul ce compte (et les autres e-mails que tu ajoutes) pourra modifier Stades/Contestants.

## Où configurer les e-mails admin ?

Dans le projet Firebase (Stady), fichier **`firestore.rules`** à la racine du repo :

- Remplace **`ton-email@example.com`** par l’e-mail du compte que tu utilises pour le backoffice (ex. `backoffice@mondomaine.com` ou ton mail perso).
- Tu peux ajouter plusieurs admins en décommentant et en dupliquant la ligne avec un autre e-mail.

Exemple pour un seul admin :

```
request.auth.token.email == 'backoffice@mondomaine.com'
```

Exemple pour deux admins :

```
request.auth.token.email == 'backoffice@mondomaine.com'
|| request.auth.token.email == 'collegue@mondomaine.com'
```

Puis déploie les règles :

```bash
firebase deploy --only firestore:rules
```

## Récap

| Utilisateur              | Peut ouvrir la page backoffice ? | Peut lire Stades/Contestants ? | Peut modifier/créer/supprimer ? |
|--------------------------|-----------------------------------|--------------------------------|----------------------------------|
| Non connecté             | Oui (formulaire de connexion)     | Non                            | Non                               |
| Connecté (app seulement) | Oui                               | Oui                            | **Non** (règles)                  |
| Connecté (email admin)   | Oui                               | Oui                            | **Oui**                           |

Seuls les comptes dont l’e-mail est dans les règles ont les droits d’écriture sur Stades et Contestants.
