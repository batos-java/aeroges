# 🔧 Dépannage Erreur 404 - GitHub Pages

## 🎯 Diagnostic du problème 404

### ✅ **Étape 1 : Vérifier que le workflow a réussi**

1. Allez sur votre dépôt GitHub : `https://github.com/VOTRE-USERNAME/aeroges`
2. Cliquez sur l'onglet **"Actions"**
3. Vous devez voir un workflow avec une **✅ coche verte**

**Si vous voyez un ❌ rouge** :
- Cliquez dessus pour voir les logs d'erreur
- Le build a échoué → Voir "Erreur de build" plus bas

**Si vous ne voyez aucun workflow** :
- Le fichier `.github/workflows/deploy.yml` n'existe pas ou est mal placé
- Vérifiez qu'il est bien dans `/.github/workflows/deploy.yml`

---

### ✅ **Étape 2 : Vérifier la configuration GitHub Pages**

1. Allez dans **Settings** → **Pages** (menu de gauche)
2. Vérifiez :
   ```
   Source: GitHub Actions ✅
   ```
   
**Si c'est "Deploy from a branch"** :
- Changez en **"GitHub Actions"**
- Attendez 2-3 minutes

---

### ✅ **Étape 3 : Vérifier le nom du repo vs base path**

C'est la cause **#1** des erreurs 404 !

**Quel est le nom EXACT de votre dépôt GitHub ?**

1. Allez sur votre dépôt
2. Le nom est dans l'URL : `https://github.com/USERNAME/NOM-DU-REPO`
3. Notez le `NOM-DU-REPO` exactement

**Maintenant, vérifiez `vite.config.ts` :**

Le fichier doit contenir :
```typescript
base: '/NOM-DU-REPO/',  // ⚠️ DOIT correspondre exactement !
```

**Exemples de correspondance :**

| Nom du repo GitHub | vite.config.ts | ✅/❌ |
|-------------------|----------------|-------|
| `aeroges` | `base: '/aeroges/',` | ✅ |
| `AeroGes` | `base: '/aeroges/',` | ❌ (casse différente) |
| `aviation-app` | `base: '/aeroges/',` | ❌ (nom différent) |
| `aeroges` | `base: '/aviation-app/',` | ❌ (nom différent) |

**⚠️ La casse compte !** GitHub Pages est sensible à la casse.

---

### ✅ **Étape 4 : Corriger le base path**

Si le nom du repo et le `base` ne correspondent pas :

**Option A : Renommer le repo**
1. Settings → General
2. Repository name → Changez en `aeroges`
3. Cliquez sur "Rename"

**Option B : Modifier vite.config.ts**

Mettez le nom EXACT de votre repo :

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/NOM-EXACT-DU-REPO/',  // ⚠️ Remplacez ici
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
})
```

**Et aussi dans `/public/service-worker.js` :**

```javascript
const BASE_PATH = '/NOM-EXACT-DU-REPO/'; // ⚠️ Même nom !
```

**Puis commitez et pushez :**

```bash
git add vite.config.ts public/service-worker.js
git commit -m "Fix: Correction base path pour GitHub Pages"
git push
```

Attendez 2-3 minutes que GitHub Actions redéploie.

---

## 🔍 **Diagnostic approfondi**

### **Test 1 : L'URL exacte**

Essayez ces URLs dans l'ordre :

1. `https://VOTRE-USERNAME.github.io/` 
   - Affiche-t-il quelque chose ? → Votre compte GitHub Pages fonctionne ✅

2. `https://VOTRE-USERNAME.github.io/NOM-DU-REPO/`
   - 404 ? → Problème de déploiement ou base path
   - Page blanche ? → Problème de base path
   - Affiche l'app ? → ✅ Ça marche !

### **Test 2 : Vérifier les fichiers déployés**

1. Allez dans **Actions** → Cliquez sur le dernier workflow ✅
2. Cliquez sur **"deploy"** (le job)
3. Cliquez sur **"Deploy to GitHub Pages"**
4. Vous devriez voir l'URL finale

### **Test 3 : Vérifier la branche gh-pages**

Certaines configurations créent une branche `gh-pages` :

1. Sur votre repo, cliquez sur le menu déroulant des branches (en haut à gauche)
2. Y a-t-il une branche `gh-pages` ?
   - **OUI** → Settings → Pages → Source doit être "Deploy from a branch" avec `gh-pages`
   - **NON** → C'est normal avec GitHub Actions

---

## 🛠️ **Solutions aux problèmes courants**

### **Problème : Workflow n'apparaît pas dans Actions**

**Cause** : Le fichier `.github/workflows/deploy.yml` n'est pas au bon endroit.

**Solution** :
```bash
# Vérifier l'emplacement
ls -la .github/workflows/

# Doit afficher : deploy.yml

# Si le dossier n'existe pas :
mkdir -p .github/workflows
# Puis créez le fichier deploy.yml dedans
```

---

### **Problème : Workflow échoue (❌ rouge)**

**Causes possibles** :

1. **Erreur de build npm**
   - Logs : `npm ci failed` ou `npm run build failed`
   - Solution : Testez en local :
     ```bash
     npm install
     npm run build
     ```
   - Si ça échoue localement, corrigez les erreurs TypeScript/build

2. **Permissions manquantes**
   - Logs : `Permission denied` ou `403`
   - Solution : Settings → Actions → General
   - "Workflow permissions" → Cochez **"Read and write permissions"**
   - Cochez **"Allow GitHub Actions to create and approve pull requests"**
   - Sauvegardez

3. **package.json manquant ou invalide**
   - Vérifiez que `package.json` existe à la racine
   - Vérifiez qu'il contient :
     ```json
     "scripts": {
       "build": "tsc && vite build"
     }
     ```

---

### **Problème : GitHub Pages n'est pas activé**

1. Settings → Pages
2. Si vous voyez "GitHub Pages is currently disabled"
3. Source → Sélectionnez **"GitHub Actions"**
4. Sauvegardez

---

### **Problème : Repo privé**

**GitHub Pages gratuit ne fonctionne que pour les repos publics !**

**Solution** :
1. Settings → General
2. Danger Zone → "Change repository visibility"
3. Cliquez sur "Change visibility"
4. Sélectionnez **"Make public"**

---

### **Problème : Page blanche (pas 404)**

**Cause** : Le `base` path est incorrect.

**Solution** :
1. Ouvrez la console du navigateur (F12)
2. Vous verrez des erreurs 404 sur les fichiers CSS/JS
3. Les URLs sont mauvaises → Corrigez le `base` dans `vite.config.ts`

**Exemple d'erreur dans la console :**
```
GET https://USERNAME.github.io/assets/index.js 404
```

Au lieu de :
```
GET https://USERNAME.github.io/aeroges/assets/index.js 200 ✅
```

---

## ✅ **Solution complète étape par étape**

### **Méthode garantie qui fonctionne toujours :**

1. **Notez le nom EXACT de votre repo**
   ```
   https://github.com/USERNAME/[NOM-DU-REPO]
   ```

2. **Modifiez `vite.config.ts` :**
   ```typescript
   base: '/[NOM-DU-REPO]/',
   ```

3. **Modifiez `public/service-worker.js` :**
   ```javascript
   const BASE_PATH = '/[NOM-DU-REPO]/';
   ```

4. **Commitez et pushez :**
   ```bash
   git add .
   git commit -m "Fix: Correction base path"
   git push
   ```

5. **Vérifiez le workflow :**
   - Actions → Attendez la ✅ verte (2-3 min)

6. **Vérifiez GitHub Pages :**
   - Settings → Pages
   - Source: **GitHub Actions** ✅

7. **Testez l'URL :**
   ```
   https://USERNAME.github.io/[NOM-DU-REPO]/
   ```

8. **Videz le cache du navigateur :**
   - Ctrl + Shift + R (Windows/Linux)
   - Cmd + Shift + R (Mac)

---

## 🚨 **Checklist de dépannage complète**

Cochez chaque élément :

- [ ] Le repo est **PUBLIC** (pas privé)
- [ ] Le workflow GitHub Actions s'est exécuté avec ✅
- [ ] Settings → Pages → Source = **"GitHub Actions"**
- [ ] `vite.config.ts` → `base: '/NOM-DU-REPO/'` (nom exact)
- [ ] `service-worker.js` → `BASE_PATH = '/NOM-DU-REPO/'` (même nom)
- [ ] Le nom du repo et le base path correspondent EXACTEMENT
- [ ] La casse est identique (majuscules/minuscules)
- [ ] J'ai pushez après les modifications
- [ ] J'ai attendu 3 minutes après le push
- [ ] J'ai vidé le cache du navigateur
- [ ] L'URL testée est : `https://USERNAME.github.io/NOM-DU-REPO/`

---

## 📞 **Besoin d'aide supplémentaire ?**

**Fournissez ces informations :**

1. **URL de votre repo GitHub :**
   ```
   https://github.com/USERNAME/NOM-DU-REPO
   ```

2. **Contenu de votre `vite.config.ts` :**
   (La ligne `base: '...'`)

3. **Statut du workflow :**
   - Screenshot de l'onglet Actions
   - Logs d'erreur si ❌ rouge

4. **URL testée :**
   ```
   https://USERNAME.github.io/NOM-DU-REPO/
   ```

5. **Ce que vous voyez :**
   - 404 ?
   - Page blanche ?
   - Erreur spécifique ?

---

## 🎯 **Exemple complet fonctionnel**

**Configuration qui marche à 100% :**

**Repo GitHub :**
```
https://github.com/mamadou/aeroges
```

**vite.config.ts :**
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/aeroges/',  // ✅ Correspond au nom du repo
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
})
```

**service-worker.js :**
```javascript
const BASE_PATH = '/aeroges/';  // ✅ Même nom
```

**GitHub Pages Settings :**
```
Source: GitHub Actions ✅
```

**Workflow Actions :**
```
✅ Deploy AeroGes to GitHub Pages
```

**URL finale :**
```
https://mamadou.github.io/aeroges/
```

**✅ Fonctionne parfaitement !**

---

**Bonne chance ! 🚀**
