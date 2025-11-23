# 📦 GUIDE D'INSTALLATION MANUELLE COMPLÈTE

## 🚨 PROBLÈME IDENTIFIÉ

Quand vous téléchargez depuis Figma Make, vous obtenez seulement :
```
aeroges/
├── index.html
├── package.json
├── README.md
├── vite.config.ts
└── src/
```

**Il manque TOUS les autres fichiers importants !** ❌

---

## ✅ SOLUTION : Créer tous les fichiers manuellement

Suivez ce guide étape par étape.

---

## 📂 ÉTAPE 1 : Créer la structure de dossiers

Dans votre dossier `aeroges/`, créez cette structure :

```
aeroges/
├── .github/
│   └── workflows/
├── components/
│   ├── figma/
│   └── ui/
├── public/
├── src/
└── styles/
```

### **Commandes pour créer la structure :**

**Windows (PowerShell) :**
```powershell
cd aeroges
mkdir .github
mkdir .github\workflows
mkdir components
mkdir components\figma
mkdir components\ui
mkdir public
mkdir styles
```

**Mac/Linux :**
```bash
cd aeroges
mkdir -p .github/workflows
mkdir -p components/figma
mkdir -p components/ui
mkdir public
mkdir styles
```

---

## 📄 ÉTAPE 2 : Créer les fichiers un par un

Je vais vous donner le contenu de **CHAQUE fichier essentiel**.

### **1. `.github/workflows/deploy.yml`**

Créez le fichier : `.github/workflows/deploy.yml`

```yaml
name: Deploy AeroGes to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout du code
        uses: actions/checkout@v4
      
      - name: Installation de Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Installation des dépendances
        run: npm ci
      
      - name: Build du projet
        run: npm run build
      
      - name: Configuration de Pages
        uses: actions/configure-pages@v4
      
      - name: Upload des artifacts
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    
    runs-on: ubuntu-latest
    needs: build
    
    steps:
      - name: Déploiement sur GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

### **2. `.gitignore`**

Créez le fichier : `.gitignore` (à la racine)

```
# dependencies
node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build
/dist

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

---

### **3. `public/manifest.json`**

Créez le fichier : `public/manifest.json`

```json
{
  "name": "AeroGes",
  "short_name": "AeroGes",
  "description": "Gestion des autorisations ASA et AEA",
  "start_url": "/aeroges/",
  "scope": "/aeroges/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/aeroges/icon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ]
}
```

**⚠️ Si votre repo ne s'appelle pas "aeroges", remplacez `/aeroges/` par `/VOTRE-REPO/`**

---

### **4. `public/icon.svg`**

Créez le fichier : `public/icon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="100" fill="#3b82f6"/>
  <path d="M256 120L140 320h232L256 120z" fill="white" stroke="white" stroke-width="8"/>
  <circle cx="256" cy="360" r="30" fill="white"/>
</svg>
```

---

### **5. `public/service-worker.js`**

Créez le fichier : `public/service-worker.js`

```javascript
const CACHE_NAME = 'aeroges-v1';
const BASE_PATH = '/aeroges/'; // ⚠️ Ajustez selon le nom de votre repo
const urlsToCache = [
  BASE_PATH,
  BASE_PATH + 'index.html',
  BASE_PATH + 'manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(() => {
          return caches.match('/');
        });
      })
  );
});
```

---

### **6. `styles/globals.css`**

Créez le fichier : `styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

---

### **7. `tsconfig.json`**

Si ce fichier n'existe pas, créez-le à la racine :

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "components", "App.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

### **8. `tsconfig.node.json`**

Si ce fichier n'existe pas, créez-le :

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

---

## 🚀 ÉTAPE 3 : Copier les fichiers depuis Figma Make

Maintenant, copiez les fichiers qui sont disponibles dans Figma Make :

### **Fichiers à copier depuis l'interface :**

1. **`App.tsx`** - Ouvrez-le dans Figma Make et copiez le contenu
2. **`src/main.tsx`** - Idem
3. **`components/AuthorizationCard.tsx`** - Créez et copiez
4. **`components/AuthorizationDetails.tsx`** - Créez et copiez
5. **`components/AuthorizationForm.tsx`** - Créez et copiez
6. **`components/AuthorizationList.tsx`** - Créez et copiez
7. **`components/InstallPrompt.tsx`** - Créez et copiez
8. **`components/TextExtractor.tsx`** - Créez et copiez

---

## ✅ ÉTAPE 4 : Vérifier la structure complète

Votre projet doit maintenant avoir cette structure :

```
aeroges/
│
├── .github/
│   └── workflows/
│       └── deploy.yml          ✅
│
├── components/
│   ├── AuthorizationCard.tsx   ✅
│   ├── AuthorizationDetails.tsx ✅
│   ├── AuthorizationForm.tsx   ✅
│   ├── AuthorizationList.tsx   ✅
│   ├── InstallPrompt.tsx       ✅
│   ├── TextExtractor.tsx       ✅
│   └── figma/
│       └── ImageWithFallback.tsx ✅
│
├── public/
│   ├── manifest.json           ✅
│   ├── service-worker.js       ✅
│   └── icon.svg                ✅
│
├── src/
│   └── main.tsx                ✅
│
├── styles/
│   └── globals.css             ✅
│
├── .gitignore                  ✅
├── App.tsx                     ✅
├── index.html                  ✅
├── package.json                ✅
├── tsconfig.json               ✅
├── tsconfig.node.json          ✅
└── vite.config.ts              ✅
```

---

## 🚀 ÉTAPE 5 : Déployer

```bash
git init
git add .
git commit -m "Initial commit: AeroGes PWA"
git remote add origin https://github.com/VOTRE-USERNAME/aeroges.git
git branch -M main
git push -u origin main
```

Puis :
1. Settings → Pages → Source → **"GitHub Actions"**
2. Attendez 2-3 min
3. Accédez à `https://VOTRE-USERNAME.github.io/aeroges/`

---

## 📋 CHECKLIST FINALE

- [ ] ✅ Structure de dossiers créée
- [ ] ✅ `.github/workflows/deploy.yml` créé
- [ ] ✅ `public/manifest.json` créé
- [ ] ✅ `public/service-worker.js` créé
- [ ] ✅ `public/icon.svg` créé
- [ ] ✅ `styles/globals.css` créé
- [ ] ✅ `.gitignore` créé
- [ ] ✅ Tous les composants copiés depuis Figma Make
- [ ] ✅ `vite.config.ts` contient `base: '/aeroges/',`
- [ ] ✅ Code pushé sur GitHub
- [ ] ✅ GitHub Pages configuré

---

**Suivez ce guide étape par étape ! 🚀**
