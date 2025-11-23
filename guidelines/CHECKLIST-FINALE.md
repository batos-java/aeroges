# ✅ CHECKLIST FINALE - Avant de redéployer

## 📋 Vérifications essentielles

### 1. Fichier `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',           // ← IMPORTANT : génère dans /dist
    rollupOptions: {
      external: ['pdfjs-dist'] // ← IMPORTANT : n'essaie pas de bundler
    }
  }
});
```

- [ ] ✅ Contient `outDir: 'dist'`
- [ ] ✅ Contient `external: ['pdfjs-dist']`

---

### 2. Fichier `package.json`

- [ ] ✅ Ne contient **PAS** la ligne `"pdfjs-dist": "..."`

Exemple correct :
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "lucide-react": "^0.487.0",
    "tesseract.js": "^5.1.1",
    "jspdf": "^2.5.2",
    // PAS de pdfjs-dist ici !
  }
}
```

---

### 3. Fichier `index.html`

- [ ] ✅ Contient les scripts CDN PDF.js

```html
<!-- PDF.js CDN pour extraction de texte PDF -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs" type="module"></script>
<script>
  window.pdfjsLib = null;
  import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs').then(module => {
    window.pdfjsLib = module;
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs';
  });
</script>
```

---

### 4. Fichier `netlify.toml`

- [ ] ✅ Contient `publish = "dist"`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 5. Fichier `components/TextExtractor.tsx`

- [ ] ✅ La fonction `processPDF` utilise `window.pdfjsLib`
- [ ] ✅ **Aucun import** de `pdfjs-dist`

```typescript
const processPDF = async (file: File) => {
  try {
    const pdfjsLib = (window as any).pdfjsLib; // ← Utilise le CDN
    
    if (!pdfjsLib) {
      setError('Chargement de PDF.js en cours...');
      return;
    }
    // ... reste du code
  }
}
```

---

### 6. Structure des dossiers

- [ ] ✅ `/src/main.tsx` existe
- [ ] ✅ `/App.tsx` ou `/src/App.tsx` existe
- [ ] ✅ `/components/` contient tous les composants
- [ ] ✅ `/public/` contient `manifest.json`, `service-worker.js`, `icon.svg`
- [ ] ✅ `/styles/globals.css` existe

---

## 🔍 Vérification rapide (optionnel)

### Tester en local AVANT de déployer :

```bash
# 1. Installer les dépendances
npm install

# 2. Builder
npm run build

# 3. Vérifier que le dossier /dist est créé
# (pas /build)

# 4. Tester le build
npm run preview
```

Si `npm run build` crée bien un dossier **`/dist`** → ✅ C'est bon !

---

## 🚀 Prêt pour le déploiement ?

Si vous avez coché toutes les cases ci-dessus :

### Méthode 1 : Netlify Drop (Simple)
1. Allez sur [app.netlify.com/drop](https://app.netlify.com/drop)
2. Glissez-déposez tout le projet
3. Attendez 2-3 minutes
4. ✅ **Ça devrait marcher !**

### Méthode 2 : Build local puis deploy (100% fiable)
1. Exécutez `npm run build` en local
2. Allez sur [app.netlify.com/drop](https://app.netlify.com/drop)
3. Glissez-déposez UNIQUEMENT le dossier `/dist`
4. ✅ **C'est déployé !**

---

## 📊 Résumé des corrections

| Problème | Status |
|----------|--------|
| ❌ `pdfjs-dist` import error | ✅ **RÉSOLU** → externalisé |
| ❌ `dist` does not exist | ✅ **RÉSOLU** → `outDir: 'dist'` |
| ⏳ Déploiement Netlify | 🚀 **PRÊT** |

---

## 🎉 Vous êtes prêt !

Tous les problèmes sont résolus. **Redéployez maintenant !**

Si une erreur apparaît, partagez-moi le message exact.

**Bon déploiement ! 🚀**
