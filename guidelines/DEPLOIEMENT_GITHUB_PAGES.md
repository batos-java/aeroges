# 🚀 Déploiement GitHub Pages - AeroGes

Guide complet pour déployer votre PWA AeroGes sur **GitHub Pages** (100% gratuit).

---

## ⚡ Déploiement automatique en 10 minutes

### 📋 Prérequis

- ✅ Un compte GitHub (gratuit)
- ✅ Git installé sur votre ordinateur
- ✅ Le projet AeroGes prêt

---

## 🎯 Étape 1 : Créer un dépôt GitHub

### 1.1 Créer le dépôt sur GitHub

1. Allez sur https://github.com
2. Cliquez sur le bouton **"New"** (ou le "+" en haut à droite → New repository)
3. Remplissez les informations :
   ```
   Repository name: aeroges
   Description: PWA pour gestion des autorisations ASA et AEA
   Public ou Private: Public (recommandé pour GitHub Pages gratuit)
   ```
4. ❌ **NE COCHEZ PAS** "Add a README file"
5. Cliquez sur **"Create repository"**

### 1.2 Configurer le base path dans vite.config.ts

⚠️ **IMPORTANT** : Ouvrez le fichier `/vite.config.ts` et vérifiez que le `base` correspond au nom de votre dépôt :

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/aeroges/', // ⚠️ Doit correspondre au nom de votre repo !
})
```

Si votre dépôt s'appelle différemment (ex: `aviation-app`), changez en :
```typescript
base: '/aviation-app/',
```

---

## 🎯 Étape 2 : Pousser votre code sur GitHub

### 2.1 Initialiser Git (si pas déjà fait)

Ouvrez un terminal dans le dossier de votre projet et exécutez :

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - AeroGes PWA"

# Renommer la branche en 'main' (si nécessaire)
git branch -M main
```

### 2.2 Lier votre dépôt GitHub

Remplacez `VOTRE-USERNAME` et `aeroges` par vos valeurs :

```bash
# Ajouter le remote
git remote add origin https://github.com/VOTRE-USERNAME/aeroges.git

# Vérifier que c'est correct
git remote -v
```

**Exemple** :
```bash
git remote add origin https://github.com/mamadou/aeroges.git
```

### 2.3 Pousser sur GitHub

```bash
git push -u origin main
```

Si c'est votre première fois, GitHub vous demandera de vous authentifier.

✅ **Votre code est maintenant sur GitHub !**

---

## 🎯 Étape 3 : Activer GitHub Pages

### 3.1 Configurer GitHub Pages

1. Allez sur votre dépôt GitHub : `https://github.com/VOTRE-USERNAME/aeroges`
2. Cliquez sur l'onglet **"Settings"** (en haut)
3. Dans le menu de gauche, cliquez sur **"Pages"**
4. Dans la section **"Source"**, sélectionnez :
   ```
   Source: GitHub Actions
   ```
   (Pas "Deploy from a branch" !)

### 3.2 Le déploiement démarre automatiquement !

1. Allez dans l'onglet **"Actions"** de votre dépôt
2. Vous verrez un workflow en cours : **"Deploy AeroGes to GitHub Pages"**
3. Attendez 2-3 minutes (le temps du build et déploiement)
4. ✅ Une coche verte apparaît quand c'est terminé !

---

## 🎯 Étape 4 : Récupérer votre URL

### 4.1 Trouver l'URL de votre application

Votre application est maintenant accessible à :

```
https://VOTRE-USERNAME.github.io/aeroges/
```

**Exemple** :
- Si votre username est `mamadou` et votre repo `aeroges`
- URL : `https://mamadou.github.io/aeroges/`

### 4.2 Vérifier le déploiement

1. Retournez dans **Settings** → **Pages**
2. En haut, vous verrez :
   ```
   ✅ Your site is live at https://VOTRE-USERNAME.github.io/aeroges/
   ```
3. Cliquez sur **"Visit site"**

---

## 📱 Étape 5 : Installer sur Android

### 5.1 Sur votre téléphone Android

1. **Ouvrez Chrome** sur votre téléphone
2. **Allez sur votre URL** : `https://VOTRE-USERNAME.github.io/aeroges/`
3. **Attendez** que la page charge complètement
4. **Chrome affiche** une bannière : **"Ajouter AeroGes à l'écran d'accueil"**
5. **Cliquez sur "Installer"** ou **"Ajouter"**

### 5.2 Alternative manuelle

Si la bannière n'apparaît pas :
1. Cliquez sur le **menu** (⋮) en haut à droite
2. Sélectionnez **"Ajouter à l'écran d'accueil"** ou **"Installer l'application"**
3. Confirmez

✅ **L'icône AeroGes apparaît sur votre écran d'accueil !**

---

## 🔄 Mises à jour automatiques

### Comment mettre à jour l'application ?

Chaque fois que vous faites un `git push`, GitHub Actions redéploie automatiquement !

```bash
# 1. Modifier votre code
# (ex: éditer un fichier dans votre éditeur)

# 2. Commit et push
git add .
git commit -m "Amélioration de l'interface"
git push

# 3. GitHub Actions redéploie automatiquement !
# ✅ Votre site est mis à jour en 2-3 minutes
```

### Suivre le déploiement

1. Allez dans l'onglet **"Actions"**
2. Vous verrez le workflow en cours
3. Attendez la coche verte ✅
4. Rechargez votre application sur Android

---

## ⚙️ Configuration avancée

### Utiliser un domaine personnalisé (optionnel)

Si vous avez votre propre domaine (`aeroges.com`) :

1. Allez dans **Settings** → **Pages**
2. Section **"Custom domain"**
3. Entrez votre domaine : `aeroges.com`
4. Configurez les DNS chez votre registraire :
   ```
   Type: CNAME
   Name: www
   Value: VOTRE-USERNAME.github.io
   ```
5. Attendez la propagation DNS (quelques heures)

### Activer HTTPS (déjà actif par défaut)

✅ GitHub Pages active automatiquement HTTPS pour toutes les applications !

---

## 🐛 Dépannage

### ❌ Erreur 404 "Page not found"

**Problème** : L'URL affiche une erreur 404.

**Solutions** :
1. Vérifiez que GitHub Pages est activé dans **Settings** → **Pages**
2. Vérifiez que la source est bien **"GitHub Actions"**
3. Vérifiez que le workflow s'est bien exécuté dans **Actions**
4. Attendez 5 minutes après le premier déploiement

### ❌ La page s'affiche mais sans style

**Problème** : La page est blanche ou sans CSS.

**Solutions** :
1. Vérifiez le `base` dans `/vite.config.ts` :
   ```typescript
   base: '/aeroges/', // ⚠️ Doit correspondre au nom du repo
   ```
2. Si votre repo s'appelle `aviation-app`, changez en :
   ```typescript
   base: '/aviation-app/',
   ```
3. Commitez et pushez à nouveau :
   ```bash
   git add vite.config.ts
   git commit -m "Fix base path"
   git push
   ```

### ❌ Le workflow GitHub Actions échoue

**Problème** : Le workflow a un ❌ rouge dans Actions.

**Solutions** :
1. Cliquez sur le workflow pour voir les logs
2. Vérifiez que `package.json` contient bien les scripts :
   ```json
   "scripts": {
     "build": "tsc && vite build"
   }
   ```
3. Testez le build en local :
   ```bash
   npm install
   npm run build
   ```
4. Si ça fonctionne localement, pushez à nouveau

### ❌ La PWA ne s'installe pas sur Android

**Solutions** :
1. ✅ Vérifiez que l'URL est en **HTTPS** (automatique sur GitHub Pages)
2. ✅ Utilisez **Chrome Android** (pas Firefox ou autre)
3. ✅ Videz le cache : Menu → Paramètres → Confidentialité → Effacer les données
4. ✅ Rechargez la page avec un pull-to-refresh

### ❌ Les notifications ne fonctionnent pas

**Problème** : Les notifications push ne s'affichent pas.

**Solutions** :
1. Activez les permissions dans Chrome : Menu → Paramètres → Paramètres du site → Notifications
2. Les notifications fonctionnent uniquement en HTTPS (✅ actif par défaut)
3. Testez sur un vrai appareil (pas émulateur)
4. Relancez l'application après avoir accepté les permissions

---

## 📊 Vérification complète

### Checklist de déploiement réussi

- [ ] ✅ Le dépôt GitHub existe
- [ ] ✅ Le code est poussé sur GitHub (`git push`)
- [ ] ✅ GitHub Pages est activé (Settings → Pages)
- [ ] ✅ Source = "GitHub Actions"
- [ ] ✅ Le workflow s'est exécuté avec succès (Actions → ✅)
- [ ] ✅ L'URL fonctionne : `https://USERNAME.github.io/aeroges/`
- [ ] ✅ L'application s'affiche correctement
- [ ] ✅ La PWA s'installe sur Android
- [ ] ✅ Le mode hors ligne fonctionne

---

## 🎯 Commandes récapitulatives

```bash
# Configuration initiale (une seule fois)
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/aeroges.git
git push -u origin main

# Mises à jour futures
git add .
git commit -m "Description des changements"
git push

# Vérifier le statut
git status
git log --oneline

# Voir l'URL du remote
git remote -v
```

---

## 📞 Liens utiles

- **Votre dépôt** : `https://github.com/VOTRE-USERNAME/aeroges`
- **Actions (builds)** : `https://github.com/VOTRE-USERNAME/aeroges/actions`
- **Settings Pages** : `https://github.com/VOTRE-USERNAME/aeroges/settings/pages`
- **URL finale** : `https://VOTRE-USERNAME.github.io/aeroges/`
- **Documentation GitHub Pages** : https://docs.github.com/pages

---

## 💰 Coûts

✅ **100% GRATUIT** avec GitHub Pages !

- Hébergement illimité
- Bande passante illimitée
- HTTPS automatique
- Déploiement automatique
- Aucune carte de crédit requise

---

## 🎉 Félicitations !

Votre application **AeroGes** est maintenant :
- ✅ Hébergée gratuitement sur GitHub Pages
- ✅ Accessible via HTTPS
- ✅ Déployée automatiquement à chaque `git push`
- ✅ Installable sur Android comme une app native
- ✅ Fonctionnelle hors ligne

**Temps total** : ~10 minutes  
**Coût** : 💰 0€ (100% gratuit)  
**Difficulté** : ⭐⭐ Facile

---

## 🚀 Prochaines étapes

1. ✅ Partagez l'URL avec vos utilisateurs
2. ✅ Installez l'app sur plusieurs téléphones Android
3. ✅ Testez l'extraction automatique ASA
4. ✅ Configurez les notifications push
5. ✅ Créez quelques autorisations de test

**Bon vol avec AeroGes ! ✈️**

---

**Version** : 1.0.0  
**Plateforme** : GitHub Pages  
**Mise à jour** : Novembre 2025
