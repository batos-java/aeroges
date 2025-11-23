# 🚀 Guide de Déploiement sur Netlify

## ✅ Problème résolu !

J'ai corrigé l'erreur `pdfjs-dist` :
- ✅ Supprimé la dépendance problématique de `package.json`
- ✅ Utilisé PDF.js via CDN (plus fiable et léger)
- ✅ Configuration automatique du worker PDF.js
- ✅ Créé une icône SVG temporaire

## 📦 Ce que vous devez uploader

Téléchargez **TOUS** ces fichiers/dossiers :

### Fichiers racine
- ✅ `package.json`
- ✅ `vite.config.ts`
- ✅ `tsconfig.json`
- ✅ `tsconfig.node.json`
- ✅ `netlify.toml`
- ✅ `index.html`

### Dossiers
- ✅ `/src/` (contient `main.tsx`)
- ✅ `/public/` (contient `manifest.json`, `service-worker.js`, `icon.svg`)
- ✅ `/components/` (tous les composants React)
- ✅ `/styles/` (contient `globals.css`)

### Fichiers optionnels
- `README.md`
- `.gitignore`
- `/guidelines/`
- `/Attributions.md`

## 🎯 Étapes de déploiement

### 1️⃣ Préparer le dossier

Assurez-vous d'avoir **tous les fichiers listés ci-dessus** dans votre dossier.

### 2️⃣ Déployer sur Netlify

1. **Allez sur** : [app.netlify.com/drop](https://app.netlify.com/drop)
2. **Glissez-déposez** le dossier COMPLET du projet
3. **Attendez 2-3 minutes** que Netlify :
   - Installe les dépendances (`npm install`)
   - Compile l'application (`npm run build`)
   - Déploie sur leur CDN

### 3️⃣ Vérifier le déploiement

Une fois terminé, vous obtiendrez une URL du type :
```
https://votre-app-random.netlify.app
```

**Testez en ouvrant cette URL dans Chrome/Edge.**

### 4️⃣ Installer sur Android

**Option A : Installation PWA (Recommandé)**
1. Ouvrez l'URL sur votre Android (Chrome)
2. Une bannière "Installer AeroGes" apparaît
3. Cliquez sur **Installer**
4. L'app s'ajoute à votre écran d'accueil

**Option B : Créer un APK**
1. Allez sur [pwabuilder.com](https://www.pwabuilder.com)
2. Entrez votre URL Netlify
3. Cliquez sur "Package for stores" → Android
4. Téléchargez l'APK et installez-le

## 🔧 Personnalisation (Optionnel)

### Nom de domaine personnalisé

Sur Netlify :
1. Allez dans **Site settings** → **Domain management**
2. Cliquez sur **Add custom domain**
3. Suivez les instructions

### Icônes PWA

Les instructions pour créer vos propres icônes sont dans :
`/public/ICONES-INSTRUCTIONS.md`

Pour l'instant, l'app utilise une icône SVG temporaire qui fonctionne.

## ⚠️ En cas d'erreur

### Erreur : "Build failed"
**Solution** : Vérifiez que vous avez bien téléchargé **tous** les dossiers (`/src`, `/components`, `/public`, `/styles`)

### Erreur : "Cannot find module X"
**Solution** : Vérifiez que `package.json` est bien présent à la racine

### Erreur : "index.html not found"
**Solution** : `index.html` doit être à la racine du projet, pas dans un sous-dossier

### L'app se déploie mais ne fonctionne pas
1. Ouvrez la **Console de développement** (F12)
2. Regardez les erreurs dans l'onglet **Console**
3. Partagez-moi les erreurs

## 📱 Avantages de cette solution

✅ **Pas besoin de serveur** : Netlify héberge gratuitement
✅ **HTTPS automatique** : Nécessaire pour les PWA
✅ **Mises à jour faciles** : Redéployez simplement
✅ **Fonctionne hors ligne** : Grâce au Service Worker
✅ **Notifications push** : Fonctionnent sur Android
✅ **Rapide** : CDN mondial de Netlify

## 🎉 Prochaines étapes

Une fois déployé :
1. Testez toutes les fonctionnalités
2. Créez des icônes personnalisées (optionnel)
3. Configurez un nom de domaine personnalisé (optionnel)
4. Partagez l'app avec votre équipe !

## 💬 Besoin d'aide ?

Si vous rencontrez un problème :
1. Vérifiez d'abord les **erreurs ci-dessus**
2. Regardez les logs de build sur Netlify
3. Partagez-moi l'erreur exacte

Bon déploiement ! 🚀
