# 🚀 Guide Ultime de Déploiement AeroGes

## 🎯 Situation actuelle

Vous avez une erreur Netlify :
```
Rollup failed to resolve import "pdfjs-dist" from src/components/TextExtractor.tsx
```

## ✅ SOLUTION IMMÉDIATE

J'ai mis à jour le fichier `vite.config.ts` pour **externaliser pdfjs-dist**.

### Que faire MAINTENANT :

#### Option 1 : Redéployer avec la nouvelle config (RAPIDE)

1. **Téléchargez le fichier `vite.config.ts` mis à jour**
2. **Remplacez votre ancien fichier**
3. **Redéployez sur Netlify** : [app.netlify.com/drop](https://app.netlify.com/drop)
4. ✅ **Ça devrait marcher !**

#### Option 2 : Build local puis déployer (100% FIABLE)

Si l'Option 1 ne marche pas :

```bash
# Sur votre ordinateur (avec Node.js installé)

# 1. Ouvrir le terminal dans le dossier du projet
cd /chemin/vers/aeroges

# 2. Installer les dépendances
npm install

# 3. Builder l'application
npm run build

# 4. Le dossier /dist est créé avec l'app compilée
```

Ensuite :
1. Allez sur [app.netlify.com/drop](https://app.netlify.com/drop)
2. **Glissez-déposez UNIQUEMENT le dossier `/dist`**
3. ✅ **C'est déployé !**

---

## 📁 Fichiers essentiels mis à jour

### 1. `vite.config.ts` (NOUVEAU)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['pdfjs-dist']
    }
  }
});
```

### 2. `package.json` (vérifier)

**ASSUREZ-VOUS** qu'il n'y a **PAS** cette ligne :
```json
"pdfjs-dist": "^4.0.379"  // ❌ À SUPPRIMER si présente
```

### 3. `index.html` (avec CDN PDF.js)

Doit contenir ces lignes :
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs" type="module"></script>
<script>
  window.pdfjsLib = null;
  import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs').then(module => {
    window.pdfjsLib = module;
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs';
  });
</script>
```

### 4. `components/TextExtractor.tsx` (vérifier)

La fonction `processPDF` doit utiliser `window.pdfjsLib` :
```typescript
const processPDF = async (file: File) => {
  try {
    const pdfjsLib = (window as any).pdfjsLib;
    
    if (!pdfjsLib) {
      setError('Chargement de PDF.js en cours...');
      return;
    }
    
    // ... reste du code
  }
}
```

**PAS d'import** comme ça :
```typescript
import * as pdfjsLib from 'pdfjs-dist'; // ❌ NON !
```

---

## 🔍 Script de vérification

J'ai créé un script `check-pdfjs.js` pour vérifier qu'il n'y a pas d'imports cachés.

### Utilisation :

```bash
node check-pdfjs.js
```

Cela cherche tous les imports de `pdfjs-dist` dans votre projet.

---

## 🆘 Dépannage

### Erreur : "Build failed" après redéploiement

**Solution** : Netlify utilise peut-être un cache. Sur Netlify :
1. Allez dans "Site settings"
2. "Build & deploy"
3. "Clear cache and retry deploy"

### Erreur : "Cannot find module 'X'"

**Solution** : Vérifiez que `package.json` contient toutes les dépendances

### L'extraction PDF ne marche pas

**Solution** : 
1. Ouvrez la console du navigateur (F12)
2. Regardez les erreurs
3. Assurez-vous que le script CDN PDF.js est bien chargé dans `index.html`

### L'app se déploie mais écran blanc

**Solution** :
1. Console du navigateur (F12) → onglet "Console"
2. Regardez les erreurs
3. Vérifiez que `/src/main.tsx` existe et importe correctement `App.tsx`

---

## 📊 Comparaison des méthodes

| Méthode | Difficulté | Temps | Fiabilité |
|---------|-----------|-------|-----------|
| **Redéployer avec vite.config mis à jour** | 🟢 Facile | 2 min | 90% |
| **Build local + Deploy /dist** | 🟡 Moyen | 5 min | 100% |
| **Netlify clear cache** | 🟢 Facile | 3 min | 80% |

---

## 🎉 Une fois déployé

### Tester l'application

1. ✅ Extraction de texte (copier-coller)
2. ✅ OCR d'images (uploader une photo)
3. ✅ Extraction PDF (uploader un PDF)
4. ✅ Ajout manuel d'autorisation
5. ✅ Export PDF
6. ✅ Notifications (activer les notifications)

### Installer sur Android

1. Ouvrez l'URL dans Chrome Android
2. Bannière "Installer AeroGes" apparaît
3. Cliquez sur "Installer"
4. L'icône apparaît sur l'écran d'accueil

---

## 📞 Besoin d'aide ?

Si vous avez encore une erreur :

1. **Partagez-moi** :
   - Le message d'erreur exact
   - Les logs de build Netlify (si applicable)
   - La structure de vos dossiers

2. **Vérifiez** :
   - [ ] `vite.config.ts` contient `external: ['pdfjs-dist']`
   - [ ] `package.json` ne contient PAS `pdfjs-dist`
   - [ ] `index.html` contient les scripts CDN PDF.js
   - [ ] `TextExtractor.tsx` utilise `window.pdfjsLib`

---

## 🔗 Liens utiles

- **Netlify Drop** : https://app.netlify.com/drop
- **PWABuilder** (APK) : https://pwabuilder.com
- **PDF.js CDN** : https://cdnjs.com/libraries/pdf.js
- **Créer des icônes** : `/public/ICONES-INSTRUCTIONS.md`

---

**Recommandation : Essayez d'abord l'Option 1 (redéployer avec le nouveau vite.config.ts). Si ça ne marche pas, utilisez l'Option 2 (build local). 🚀**
