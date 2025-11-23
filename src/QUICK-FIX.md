# ⚡ FIX RAPIDE - Erreur pdfjs-dist sur Netlify

## 🚨 L'erreur
```
Rollup failed to resolve import "pdfjs-dist" from src/components/TextExtractor.tsx
```

---

## ✅ LA SOLUTION EN 2 MINUTES

### 1️⃣ Téléchargez ce fichier mis à jour

**Fichier : `vite.config.ts`**

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

### 2️⃣ Remplacez votre ancien `vite.config.ts`

### 3️⃣ Redéployez sur Netlify

Glissez-déposez tout le projet sur : [app.netlify.com/drop](https://app.netlify.com/drop)

### ✅ C'EST FAIT !

---

## 🔧 Si ça ne marche TOUJOURS pas

### Option alternative : Build local

```bash
npm install
npm run build
```

Puis déployez UNIQUEMENT le dossier `/dist` sur Netlify Drop.

---

## 📋 Checklist de vérification

Avant de redéployer, vérifiez :

- [ ] Le fichier `vite.config.ts` contient `external: ['pdfjs-dist']`
- [ ] Le fichier `package.json` ne contient PAS la ligne `"pdfjs-dist": "..."`
- [ ] Le fichier `index.html` contient les scripts CDN PDF.js
- [ ] Le fichier `components/TextExtractor.tsx` utilise `window.pdfjsLib` (pas d'import pdfjs-dist)

---

## 💡 Pourquoi cette solution ?

- **pdfjs-dist** est difficile à bundler avec Vite (workers, WASM, chemins complexes)
- **Solution** : On l'utilise via CDN (chargé dans `index.html`)
- **`external: ['pdfjs-dist']`** dit à Vite : "ne cherche pas à bundler ce module"

---

## 📞 Ça ne marche pas ?

Lisez le guide complet : `README-DEPLOIEMENT.md`

Ou vérifiez s'il reste des imports : `node check-pdfjs.js`
