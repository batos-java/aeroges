# 🚀 Instructions Rapides - Déploiement GitHub Pages

## ⚡ 5 commandes pour déployer AeroGes

### 🎯 Avant de commencer

**1. Créez un dépôt sur GitHub :**
- Allez sur https://github.com/new
- Nom du repo : `aeroges`
- Public ou Private : **Public** (recommandé)
- ❌ Ne cochez PAS "Add a README"
- Cliquez sur **"Create repository"**

**2. Vérifiez le fichier `vite.config.ts` :**
```typescript
base: '/aeroges/', // ⚠️ Doit correspondre au nom de votre repo
```
Si votre repo s'appelle autrement, modifiez cette ligne !

---

### 💻 Commandes à exécuter

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
# 1. Initialiser Git (si pas déjà fait)
git init
git add .
git commit -m "AeroGes PWA - Déploiement initial"
git branch -M main

# 2. Lier à GitHub (⚠️ Remplacez VOTRE-USERNAME et aeroges)
git remote add origin https://github.com/VOTRE-USERNAME/aeroges.git

# 3. Pousser sur GitHub
git push -u origin main
```

---

### ⚙️ Configuration GitHub Pages

1. **Allez sur votre dépôt GitHub** : `https://github.com/VOTRE-USERNAME/aeroges`
2. Cliquez sur **"Settings"** (onglet en haut)
3. Dans le menu de gauche : **"Pages"**
4. Dans **"Source"**, sélectionnez : **"GitHub Actions"**
5. ✅ C'est tout ! Le déploiement démarre automatiquement

---

### ✅ Vérifier le déploiement

1. **Actions** : Allez dans l'onglet "Actions" → Attendez la ✅ verte (2-3 min)
2. **URL** : Votre app est sur `https://VOTRE-USERNAME.github.io/aeroges/`
3. **Testez** : Ouvrez l'URL dans Chrome

---

### 📱 Installer sur Android

1. Ouvrez **Chrome** sur votre téléphone Android
2. Allez sur : `https://VOTRE-USERNAME.github.io/aeroges/`
3. Cliquez sur **"Ajouter à l'écran d'accueil"**
4. ✅ L'icône AeroGes apparaît sur votre écran !

---

### 🔄 Mettre à jour

Pour chaque modification :

```bash
git add .
git commit -m "Description des changements"
git push
```

✅ GitHub redéploie automatiquement en 2-3 minutes !

---

### 🐛 Problèmes ?

**404 ou page blanche ?**
→ Vérifiez que `base: '/aeroges/'` dans `vite.config.ts` correspond au nom de votre repo !

**Workflow échoue ?**
→ Onglet "Actions" → Cliquez sur le workflow rouge → Voir les logs

**PWA ne s'installe pas ?**
→ Utilisez Chrome Android (pas Firefox), videz le cache, rechargez

---

### 📞 Documentation complète

Consultez **DEPLOIEMENT_GITHUB_PAGES.md** pour le guide détaillé !

---

**Temps** : ~10 minutes | **Coût** : 💰 0€ | **Difficulté** : ⭐⭐ Facile

✈️ **Bon vol avec AeroGes !**
