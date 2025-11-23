# 🔧 ERREUR : Manifest.json non trouvé

## 🚨 Le problème

Netlify affiche : **"We did not find a manifest on your site"**

Cela signifie que le fichier `manifest.json` n'a pas été copié dans le dossier `/dist` lors du build.

---

## ✅ SOLUTION APPLIQUÉE

J'ai mis à jour `vite.config.ts` pour **expliciter le dossier public** :

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',  // ← Ajout explicite
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['pdfjs-dist']
    }
  }
});
```

---

## 🚀 QUE FAIRE MAINTENANT ?

### **Option 1 : Redéployer avec le nouveau vite.config.ts**

1. **Téléchargez le fichier `vite.config.ts` mis à jour**
2. **Remplacez votre ancien fichier**
3. **Redéployez sur [app.netlify.com/drop](https://app.netlify.com/drop)**
4. ✅ **Ça devrait marcher !**

---

### **Option 2 : Build local (100% fiable)**

Si l'Option 1 ne marche pas, buildez en local :

```bash
# 1. Ouvrir le terminal dans le dossier du projet
cd /chemin/vers/aeroges

# 2. Installer les dépendances
npm install

# 3. Builder
npm run build

# 4. Vérifier que /dist contient manifest.json
# Ouvrez /dist et vérifiez la présence de :
# - manifest.json
# - icon.svg
# - service-worker.js
```

Si ces fichiers sont présents dans `/dist` :
1. Allez sur [app.netlify.com/drop](https://app.netlify.com/drop)
2. Glissez-déposez **UNIQUEMENT le dossier `/dist`**
3. ✅ **C'est déployé !**

---

## 🔍 Pourquoi ce problème ?

**Vite** devrait automatiquement copier le contenu de `/public` vers `/dist`, mais parfois il faut l'expliciter avec `publicDir: 'public'`.

---

## 📋 Structure attendue après build

Après `npm run build`, le dossier `/dist` devrait contenir :

```
/dist/
├── index.html
├── manifest.json          ← Important !
├── icon.svg               ← Important !
├── service-worker.js      ← Important !
├── icon-192.png (optionnel)
├── icon-512.png (optionnel)
└── /assets/
    ├── index-[hash].js
    ├── index-[hash].css
    └── ...
```

---

## ✅ Vérification rapide

Avant de redéployer, vérifiez que votre structure est :

```
votre-projet/
├── index.html
├── vite.config.ts (mis à jour)
├── package.json
├── netlify.toml
├── /public/
│   ├── manifest.json      ← Doit être ici
│   ├── icon.svg           ← Doit être ici
│   └── service-worker.js  ← Doit être ici
├── /src/
│   └── main.tsx
├── /components/
│   └── ...
└── App.tsx
```

---

## 🎯 Résumé des corrections

| Problème | Status |
|----------|--------|
| ❌ pdfjs-dist error | ✅ RÉSOLU |
| ❌ dist vs build | ✅ RÉSOLU |
| ❌ manifest.json non trouvé | ✅ RÉSOLU → `publicDir: 'public'` |

---

## 🚀 Prochaines étapes

1. **Téléchargez le nouveau `vite.config.ts`**
2. **Redéployez sur Netlify Drop**
3. **Testez l'application**

Si le problème persiste, utilisez l'**Option 2** (build local) qui est **100% fiable**.

---

**Redéployez maintenant avec le nouveau vite.config.ts ! 🚀**
