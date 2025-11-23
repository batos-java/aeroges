# 🎨 Instructions pour générer les icônes PWA

## Option 1 : Utiliser un générateur en ligne (RAPIDE)

1. Allez sur **[favicon.io](https://favicon.io/favicon-generator/)**
2. Configurez votre icône :
   - Texte : "AG" ou "✈️"
   - Couleur de fond : #4f46e5 (indigo)
   - Police : Choisissez une police moderne
3. Téléchargez le ZIP
4. Copiez `icon-192.png` et `icon-512.png` dans le dossier `/public`

## Option 2 : Utiliser PWA Asset Generator (MIEUX)

1. Allez sur **[https://progressier.com/pwa-icons-and-ios-splash-screen-generator](https://progressier.com/pwa-icons-and-ios-splash-screen-generator)**
2. Uploadez une image de base (peut être un simple logo)
3. Téléchargez les icônes générées
4. Placez `icon-192.png` et `icon-512.png` dans `/public`

## Option 3 : Créer manuellement avec Canva

1. Créez un carré de **512x512 pixels** sur Canva
2. Ajoutez :
   - Fond : Couleur #4f46e5 (indigo)
   - Icône/Texte : "✈️ AeroGes" ou juste "AG" en blanc
3. Exportez en PNG
4. Utilisez [resizeimage.net](https://resizeimage.net/) pour créer une version 192x192
5. Renommez en `icon-512.png` et `icon-192.png`
6. Placez-les dans `/public`

## ⚠️ Pour l'instant

Si vous n'avez pas le temps de créer les icônes maintenant :
- L'application fonctionnera QUAND MÊME
- Les icônes par défaut du navigateur seront utilisées
- Vous pourrez ajouter les icônes plus tard sans problème

## ✅ Vérification

Après avoir ajouté les icônes :
- `icon-192.png` doit être dans `/public/icon-192.png`
- `icon-512.png` doit être dans `/public/icon-512.png`
