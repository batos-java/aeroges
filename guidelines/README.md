# ✈️ AeroGes - Gestion d'Autorisations Aéronautiques

**AeroGes** est une Progressive Web App (PWA) mobile Android pour la gestion des autorisations de survol et d'atterrissage (ASA) et des autorisations d'exploitation d'aéronefs (AEA).

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![PWA](https://img.shields.io/badge/PWA-ready-green)
![Android](https://img.shields.io/badge/Android-compatible-green)

---

## 🎯 Fonctionnalités principales

### 📋 Gestion des autorisations
- ✅ **ASA (Autorisation de Survol et d'Atterrissage)** - Extraction automatique + Saisie manuelle
- ✅ **AEA (Autorisation d'Exploitation d'Aéronefs)** - Saisie manuelle uniquement
- ✅ **CRUD complet** : Créer, Lire, Modifier, Supprimer
- ✅ **Filtrage** par type (ASA/AEA) et statut (Valide/Expirée)
- ✅ **Recherche** par numéro, compagnie, immatriculation, etc.

### 🤖 Extraction automatique (ASA uniquement)
- ✅ Extraction intelligente depuis contenu WhatsApp
- ✅ Détection automatique de tous les champs ASA :
  - Numéro d'autorisation
  - Compagnie / Opérateur
  - Type d'aéronef
  - Immatriculation
  - Call Sign
  - Itinéraire
  - Dates de validité
- ✅ **Règle métier** : Ajout automatique de +3 jours à la date de fin de validité

### 🔔 Notifications push
- ✅ Alertes avant expiration (7, 3, et 1 jour)
- ✅ Configuration des notifications dans l'application
- ✅ Système de permissions natif

### 📄 Export PDF
- ✅ Export individuel ou groupé
- ✅ Format professionnel avec en-tête
- ✅ Toutes les informations détaillées

### 📱 PWA pour Android
- ✅ Installation sur écran d'accueil
- ✅ Fonctionnement hors ligne
- ✅ Interface mobile optimisée
- ✅ Icônes et splash screens

---

## 🛠️ Technologies utilisées

- **React 18** avec TypeScript
- **Tailwind CSS 4.0** pour le style
- **Lucide React** pour les icônes
- **jsPDF** pour l'export PDF
- **Service Worker** pour le mode hors ligne
- **Notification API** pour les alertes push
- **LocalStorage** pour la persistance des données

---

## 📦 Installation et développement local

### Prérequis
- Node.js 18+ et npm/yarn/pnpm

### Installation
```bash
# Cloner le projet
git clone <url-du-repo>
cd aeroges

# Installer les dépendances (automatique dans Figma Make)
npm install

# Lancer en mode développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

---

## 🚀 Déploiement sur Netlify (Recommandé)

### Option 1 : Via l'interface Netlify (le plus simple)

1. **Créer un compte sur [Netlify](https://www.netlify.com/)** (gratuit)

2. **Connecter votre dépôt Git** :
   - Cliquez sur "Add new site" → "Import an existing project"
   - Connectez votre compte GitHub/GitLab/Bitbucket
   - Sélectionnez le dépôt AeroGes

3. **Configuration du build** :
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Déployer** :
   - Cliquez sur "Deploy site"
   - Attendez quelques minutes
   - Votre PWA est en ligne ! 🎉

5. **Configuration HTTPS** :
   - HTTPS est automatiquement activé par Netlify
   - Votre URL sera : `https://votre-app.netlify.app`

### Option 2 : Via Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Builder le projet
npm run build

# Déployer
netlify deploy --prod
```

---

## 🚀 Déploiement sur Vercel

### Via l'interface Vercel

1. **Créer un compte sur [Vercel](https://vercel.com/)** (gratuit)

2. **Importer le projet** :
   - Cliquez sur "New Project"
   - Importez depuis Git (GitHub/GitLab/Bitbucket)
   - Sélectionnez le dépôt AeroGes

3. **Configuration automatique** :
   - Vercel détecte automatiquement Vite
   - Framework Preset : Vite
   - Build Command : `npm run build`
   - Output Directory : `dist`

4. **Déployer** :
   - Cliquez sur "Deploy"
   - Votre PWA est en ligne sur `https://votre-app.vercel.app`

### Via Vercel CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel --prod
```

---

## 🚀 Autres options de déploiement

### GitHub Pages

```bash
# Installer gh-pages
npm install --save-dev gh-pages

# Ajouter dans package.json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}

# Déployer
npm run deploy
```

### Firebase Hosting

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter
firebase login

# Initialiser
firebase init hosting

# Build et déployer
npm run build
firebase deploy
```

---

## 📱 Installation sur Android

### Pour les utilisateurs finaux

1. **Ouvrir l'application dans Chrome Android** :
   - Allez sur l'URL de votre PWA déployée
   - Exemple : `https://aeroges.netlify.app`

2. **Installer la PWA** :
   - Chrome affichera automatiquement une bannière "Ajouter à l'écran d'accueil"
   - OU cliquez sur le menu (⋮) → "Ajouter à l'écran d'accueil"

3. **Utiliser comme application native** :
   - L'icône AeroGes apparaît sur l'écran d'accueil
   - Lancez l'application comme n'importe quelle app Android
   - Fonctionne même hors ligne ! 📱✨

### Configuration requise
- **Android 5.0+**
- **Chrome 80+** ou navigateur compatible PWA
- **HTTPS obligatoire** (fourni par Netlify/Vercel/etc.)

---

## 📖 Guide d'utilisation

### 1️⃣ Extraction automatique (ASA)

1. Copiez le contenu du message WhatsApp contenant l'autorisation ASA
2. Cliquez sur le bouton **"Coller le texte"** dans l'onglet "Extraction"
3. L'application extrait automatiquement tous les champs
4. Vérifiez les informations
5. Cliquez sur **"Enregistrer"**
6. ✅ **+3 jours sont automatiquement ajoutés à la date de fin**

**Exemple de texte reconnu :**
```
Numéro: 0001/OL/ANAC/DG/DTA/SRTA/25
Compagnie: AIR SENEGAL
Type: B737-800
Immatriculation: 6V-AMC
Call Sign: SZN234
Itinéraire: GOOY-FCBB-GOOY
Valide du 15/01/2025 au 20/01/2025
```

### 2️⃣ Saisie manuelle (ASA et AEA)

1. Cliquez sur **"Nouvelle autorisation"**
2. Sélectionnez le type : **ASA** ou **AEA**
3. Remplissez tous les champs obligatoires
4. Les placeholders vous guident :
   - **ASA** : `ex: 0001/OL/ANAC/DG/DTA/SRTA/25`
   - **AEA** : `ex: 00001/ANAC/DG/DSA`
   - **Itinéraire** : `ex: GOOY - FCBB - GOOY`
5. Cliquez sur **"Enregistrer"**

### 3️⃣ Modification d'une autorisation

1. Trouvez l'autorisation dans la liste
2. Cliquez sur l'icône **✏️ (crayon)**
3. Modifiez les champs nécessaires
4. Cliquez sur **"Enregistrer"**

### 4️⃣ Suppression d'une autorisation

1. Trouvez l'autorisation dans la liste
2. Cliquez sur l'icône **🗑️ (poubelle)**
3. Confirmez la suppression

### 5️⃣ Export PDF

1. Sélectionnez les autorisations à exporter (ou "Tout sélectionner")
2. Cliquez sur **"Exporter la sélection (X)"**
3. Le PDF se télécharge automatiquement

### 6️⃣ Notifications push

1. Allez dans l'onglet **"Notifications"**
2. Activez les notifications
3. Acceptez les permissions du navigateur
4. Configurez les délais d'alerte (7, 3, 1 jour avant expiration)
5. Vous recevrez des notifications automatiques ! 🔔

### 7️⃣ Recherche et filtrage

- **Recherche** : Tapez dans la barre de recherche (numéro, compagnie, immatriculation, etc.)
- **Filtres** :
  - Tous / ASA / AEA
  - Valides / Expirées

---

## 🔧 Configuration PWA

### Personnalisation

Pour personnaliser l'application, modifiez :

**`/public/manifest.json`** :
```json
{
  "name": "AeroGes",
  "short_name": "AeroGes",
  "description": "Gestion d'autorisations aéronautiques ASA et AEA",
  "theme_color": "#4F46E5",
  "background_color": "#ffffff"
}
```

**`/public/service-worker.js`** :
- Gère le cache et le mode hors ligne
- Déjà configuré pour une performance optimale

---

## 📊 Règles métier importantes

### ASA (Autorisation de Survol et d'Atterrissage)
- ✅ Extraction automatique disponible
- ✅ **+3 jours ajoutés automatiquement** à la date de fin de validité
- ✅ Champs spécifiques : Call Sign, Itinéraire
- 🔔 Notifications avant expiration

### AEA (Autorisation d'Exploitation d'Aéronefs)
- ❌ Pas d'extraction automatique (saisie manuelle uniquement)
- ❌ Pas d'ajout de jours supplémentaires
- 🔔 Notifications avant expiration

---

## 🗂️ Structure du projet

```
aeroges/
├── public/
│   ├── manifest.json          # Configuration PWA
│   ├── service-worker.js      # Service Worker pour mode hors ligne
│   ├── icon-192.png          # Icône PWA 192x192
│   ├── icon-512.png          # Icône PWA 512x512
│   └── apple-touch-icon.png  # Icône iOS
├── components/
│   ├── AuthorizationForm.tsx     # Formulaire ASA/AEA
│   ├── AuthorizationCard.tsx     # Carte d'affichage
│   ├── ExtractionPanel.tsx       # Panel d'extraction automatique
│   └── NotificationPanel.tsx     # Gestion notifications
├── utils/
│   ├── textExtraction.ts      # Extraction automatique ASA
│   ├── pdfExport.ts          # Export PDF
│   └── notifications.ts       # Système de notifications
├── styles/
│   └── globals.css           # Styles globaux Tailwind
├── App.tsx                   # Composant principal
├── index.html               # Point d'entrée HTML
└── README.md               # Ce fichier
```

---

## 🐛 Dépannage

### La PWA ne s'installe pas sur Android

**Solutions** :
1. ✅ Vérifiez que l'application est servie en **HTTPS**
2. ✅ Vérifiez que le fichier `manifest.json` est accessible
3. ✅ Videz le cache du navigateur Chrome
4. ✅ Utilisez Chrome 80+ ou un navigateur compatible

### Les notifications ne fonctionnent pas

**Solutions** :
1. ✅ Vérifiez les permissions dans les paramètres du navigateur
2. ✅ L'application doit être en **HTTPS**
3. ✅ Testez sur un vrai appareil (pas toujours supporté en émulateur)
4. ✅ Rechargez la page après avoir accepté les permissions

### L'extraction automatique ne fonctionne pas

**Solutions** :
1. ✅ Vérifiez le format du texte collé
2. ✅ Le texte doit contenir les mots-clés : "Numéro", "Compagnie", "Type", etc.
3. ✅ Les dates doivent être au format : DD/MM/YYYY ou YYYY-MM-DD

### Le mode hors ligne ne fonctionne pas

**Solutions** :
1. ✅ Visitez l'application en ligne au moins une fois
2. ✅ Le Service Worker doit être enregistré (vérifiez dans DevTools)
3. ✅ Rechargez la page avec Ctrl+Shift+R pour forcer la mise à jour

---

## 🔐 Sécurité et données

- ✅ **Données stockées localement** : Tout est sauvegardé dans le LocalStorage du navigateur
- ✅ **Aucune transmission réseau** : Les données ne quittent jamais l'appareil
- ✅ **Pas de serveur backend** : Application 100% frontend
- ⚠️ **Attention** : Ne pas utiliser pour des données ultra-sensibles
- ℹ️ **Figma Make** n'est pas conçu pour la collecte de PII ou données très sensibles

---

## 📝 Mises à jour

Pour mettre à jour l'application déployée :

1. Modifiez le code localement
2. Poussez sur Git (GitHub/GitLab/etc.)
3. Netlify/Vercel redéploie automatiquement ! 🚀

Ou manuellement :
```bash
npm run build
netlify deploy --prod
# ou
vercel --prod
```

---

## 🆘 Support

Pour toute question ou problème :

1. 📖 Consultez d'abord ce README
2. 🔍 Vérifiez la section Dépannage
3. 💬 Contactez l'équipe de développement

---

## 📄 Licence

Ce projet est développé pour une utilisation interne dans le cadre de la gestion des autorisations aéronautiques.

---

## 🎉 Remerciements

Développé avec ❤️ pour faciliter la gestion des autorisations ASA et AEA.

**Bon vol ! ✈️**

---

## 📞 URLs utiles

- **Documentation PWA** : https://web.dev/progressive-web-apps/
- **Netlify** : https://www.netlify.com/
- **Vercel** : https://vercel.com/
- **React** : https://react.dev/
- **Tailwind CSS** : https://tailwindcss.com/

---

**Version** : 1.0.0  
**Dernière mise à jour** : Novembre 2025  
**Statut** : ✅ Prêt pour production
