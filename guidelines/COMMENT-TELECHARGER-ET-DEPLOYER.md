# 📥 Comment télécharger et déployer AeroGes sur GitHub Pages

## 🎯 Étape 1 : Télécharger tous les fichiers du projet

### **Méthode 1 : Téléchargement via l'interface Figma Make**

1. **Cherchez le bouton de téléchargement** dans l'interface Figma Make
   - Regardez en haut à droite de l'écran
   - Cherchez une icône de téléchargement 📥 ou "Download"
   - Ou un bouton "Export" / "Download ZIP"

2. **Téléchargez l'archive complète**
   - Cliquez sur le bouton de téléchargement
   - Un fichier `.zip` sera téléchargé (ex: `aeroges.zip`)

3. **Décompressez l'archive**
   ```bash
   # Sur Windows : Clic droit → Extraire tout
   # Sur Mac/Linux :
   unzip aeroges.zip
   cd aeroges
   ```

---

### **Méthode 2 : Si vous ne trouvez pas le bouton de téléchargement**

Copiez manuellement les fichiers un par un depuis l'interface.

**Liste des fichiers ESSENTIELS à télécharger :**

```
📁 Projet AeroGes
│
├── 📁 .github/
│   └── 📁 workflows/
│       └── deploy.yml          ⚠️ CRUCIAL !
│
├── 📁 components/
│   ├── AuthorizationCard.tsx
│   ├── AuthorizationDetails.tsx
│   ├── AuthorizationForm.tsx
│   ├── AuthorizationList.tsx
│   ├── InstallPrompt.tsx
│   ├── TextExtractor.tsx
│   └── 📁 figma/
│       └── ImageWithFallback.tsx
│
├── 📁 public/
│   ├── manifest.json           ⚠️ IMPORTANT !
│   ├── service-worker.js       ⚠️ IMPORTANT !
│   └── icon.svg
│
├── 📁 styles/
│   └── globals.css
│
├── 📁 src/
│   └── main.tsx
│
├── App.tsx                     ⚠️ CRUCIAL !
├── package.json                ⚠️ CRUCIAL !
├── vite.config.ts              ⚠️ CRUCIAL !
├── tsconfig.json
├── tsconfig.node.json
├── index.html                  ⚠️ CRUCIAL !
├── .gitignore                  ⚠️ IMPORTANT !
└── README.md
```

---

## 🚀 Étape 2 : Initialiser Git et créer le repo GitHub

### **2.1 Créer le dépôt sur GitHub**

1. Allez sur [https://github.com](https://github.com)
2. Cliquez sur le bouton **"New"** (ou **"+"** → **"New repository"**)
3. Remplissez :
   ```
   Repository name: aeroges        ⚠️ Notez ce nom !
   Description: PWA pour gestion des autorisations ASA/AEA
   Public ✅                        ⚠️ DOIT être public !
   
   ❌ Ne cochez PAS "Add README"
   ❌ Ne cochez PAS ".gitignore"
   ❌ Ne cochez PAS "license"
   ```
4. Cliquez sur **"Create repository"**

---

### **2.2 Préparer le projet localement**

Ouvrez un terminal dans le dossier où vous avez décompressé les fichiers :

```bash
# Aller dans le dossier du projet
cd aeroges

# Vérifier que tous les fichiers sont là
ls -la

# Vous devez voir :
# .github/
# components/
# public/
# App.tsx
# package.json
# vite.config.ts
# etc.
```

---

### **2.3 Configurer le base path**

⚠️ **TRÈS IMPORTANT** : Le `base` path doit correspondre au nom exact de votre repo !

**Si votre repo s'appelle "aeroges" :**
- ✅ `vite.config.ts` est déjà correct : `base: '/aeroges/',`

**Si votre repo a un autre nom (ex: "aviation-app") :**

Modifiez **`vite.config.ts`** :
```typescript
base: '/aviation-app/',  // ⚠️ Remplacez par votre nom de repo
```

Modifiez **`public/service-worker.js`** :
```javascript
const BASE_PATH = '/aviation-app/';  // ⚠️ Même nom !
```

---

### **2.4 Initialiser Git et pusher**

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Vérifier que .github/workflows/deploy.yml est bien ajouté
git status

# Vous devez voir en vert :
#   .github/workflows/deploy.yml
#   App.tsx
#   package.json
#   etc.

# Premier commit
git commit -m "Initial commit: AeroGes PWA complète"

# Lier au repo GitHub (remplacez VOTRE-USERNAME et aeroges)
git remote add origin https://github.com/VOTRE-USERNAME/aeroges.git

# Renommer la branche en main (si besoin)
git branch -M main

# Pusher vers GitHub
git push -u origin main
```

**Exemple avec des vraies valeurs :**
```bash
git remote add origin https://github.com/mamadou/aeroges.git
git branch -M main
git push -u origin main
```

---

## ⚙️ Étape 3 : Configurer GitHub Pages

1. Sur votre repo GitHub, allez dans **Settings** (⚙️)
2. Dans le menu de gauche, cliquez sur **"Pages"**
3. Dans **"Source"**, sélectionnez : **"GitHub Actions"** ⚠️ (pas "Deploy from a branch" !)
4. Sauvegardez

---

## ✅ Étape 4 : Vérifier le déploiement

### **4.1 Vérifier le workflow**

1. Allez dans l'onglet **"Actions"** de votre repo
2. Vous devriez voir : **"Deploy AeroGes to GitHub Pages"** ⏳
3. Attendez 2-3 minutes
4. Une **✅ coche verte** apparaît = Succès !

**Si vous voyez un ❌ rouge :**
- Cliquez dessus pour voir les logs
- Vérifiez les erreurs
- Souvent c'est un problème de permissions → Voir section "Dépannage"

---

### **4.2 Accéder à votre application**

Votre application est maintenant en ligne ! 🎉

```
https://VOTRE-USERNAME.github.io/aeroges/
```

**Exemple :**
```
https://mamadou.github.io/aeroges/
```

---

## 🔧 Dépannage

### **Problème : "Permission denied" dans Actions**

**Solution :**
1. Settings → Actions → General
2. Descendez jusqu'à "Workflow permissions"
3. Cochez **"Read and write permissions"** ✅
4. Cochez **"Allow GitHub Actions to create and approve pull requests"** ✅
5. Cliquez sur "Save"
6. Relancez le workflow :
   - Actions → Cliquez sur le workflow échoué
   - Cliquez sur "Re-run all jobs"

---

### **Problème : 404 sur l'URL**

**Causes possibles :**

1. **Le base path ne correspond pas au nom du repo**
   - Vérifiez `vite.config.ts` → `base: '/aeroges/',`
   - Le nom doit être EXACTEMENT celui du repo (casse incluse)

2. **GitHub Pages n'est pas configuré sur "GitHub Actions"**
   - Settings → Pages → Source → **"GitHub Actions"** ⚠️

3. **Le workflow n'a pas réussi**
   - Actions → Vérifiez qu'il y a une ✅ verte

---

### **Problème : Le dossier .github/ n'est pas pushé**

```bash
# Forcer l'ajout
git add -f .github/workflows/deploy.yml

# Commit et push
git commit -m "Add GitHub Actions workflow"
git push
```

---

### **Problème : "npm ci failed"**

Le fichier `package.json` est peut-être corrompu.

**Solution :**
1. Vérifiez que `package.json` est valide (pas d'erreur de syntaxe)
2. Testez en local :
   ```bash
   npm install
   npm run build
   ```
3. Si ça échoue, il y a un problème dans le code

---

## 📋 Checklist complète avant déploiement

Avant de pusher sur GitHub, vérifiez :

- [ ] ✅ Tous les fichiers sont téléchargés
- [ ] ✅ Le dossier `.github/workflows/` existe avec `deploy.yml` dedans
- [ ] ✅ `vite.config.ts` contient `base: '/NOM-DU-REPO/',`
- [ ] ✅ `public/service-worker.js` contient `BASE_PATH = '/NOM-DU-REPO/';`
- [ ] ✅ `package.json` contient `"build": "tsc && vite build"`
- [ ] ✅ Le nom dans `base:` correspond EXACTEMENT au nom du repo GitHub
- [ ] ✅ Le repo GitHub est **PUBLIC** (pas privé)
- [ ] ✅ Git est initialisé (`git init`)
- [ ] ✅ Tous les fichiers sont ajoutés (`git add .`)
- [ ] ✅ Le remote est configuré (`git remote add origin ...`)
- [ ] ✅ Les fichiers sont pushés (`git push -u origin main`)

Après le push :

- [ ] ✅ Settings → Pages → Source = **"GitHub Actions"**
- [ ] ✅ Actions → Workflow avec ✅ verte
- [ ] ✅ L'URL `https://USERNAME.github.io/REPO/` fonctionne

---

## 🎯 Commandes rapides (résumé)

```bash
# 1. Décompresser et aller dans le dossier
unzip aeroges.zip
cd aeroges

# 2. Vérifier le nom du repo et ajuster vite.config.ts si besoin

# 3. Initialiser Git
git init
git add .
git commit -m "Initial commit: AeroGes PWA"

# 4. Lier au repo GitHub (remplacez VOTRE-USERNAME)
git remote add origin https://github.com/VOTRE-USERNAME/aeroges.git
git branch -M main
git push -u origin main

# 5. Configurer GitHub Pages
# → Settings → Pages → Source: GitHub Actions

# 6. Attendre 2-3 minutes

# 7. Accéder à l'app
# → https://VOTRE-USERNAME.github.io/aeroges/
```

---

## 🆘 Besoin d'aide ?

Si vous êtes bloqué, vérifiez :

1. **Le workflow Actions** : Actions → Cliquez sur le workflow pour voir les logs
2. **La configuration Pages** : Settings → Pages → Source doit être "GitHub Actions"
3. **Le base path** : `vite.config.ts` doit contenir le nom exact du repo

**Si ça ne marche toujours pas, fournissez-moi :**
- L'URL de votre repo GitHub
- Le contenu de `vite.config.ts` (ligne `base:`)
- Un screenshot de l'onglet Actions
- L'erreur exacte que vous voyez

---

## 🎉 Prochaines étapes après le déploiement

Une fois que l'application est en ligne :

1. **Tester sur mobile Android** :
   - Ouvrez l'URL dans Chrome Android
   - Vous verrez une popup "Installer l'application"
   - Cliquez sur "Installer"
   - L'app s'installe comme une app native ! 📱

2. **Partager l'URL** :
   - Envoyez l'URL à vos collègues
   - Ils pourront installer la PWA directement

3. **Mises à jour** :
   - Modifiez le code localement
   - `git add .`
   - `git commit -m "Update: ..."`
   - `git push`
   - GitHub Actions redéploie automatiquement ! 🚀

---

**Bon déploiement ! ✈️🚀**
