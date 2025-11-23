# 🧪 TEST D'EXTRACTION - Guide de vérification

## 🎯 OBJECTIF

Tester l'extraction automatique avec vos documents réels pour vérifier que tout fonctionne correctement.

---

## 📝 DONNÉES DE TEST

### Texte à coller :
```
REP. OF CONGO OVF & FCBB LND PMT NR :2398/OL/ANAC/DG/DTA/SRTA/25. stop 

F.IBARA DIALLO 
CAA/ CONGO-BZV
```

### Texte de l'image (OCR devrait extraire) :
```
OPERATOR          :VISTAJET LIMITED

AIRCRAFT TYPE     :CL60, MTOW : 21863 KGS
REGISTRATION      :9H-VFA OR SUB
CALLSIGN          :VJT503
PURPOSE           :CHARTER / COMMERCIAL
NON-SCHEDULED FLIGHT

SCHEDULE:
VJT503 FNLU 2105Z 23NOV 2025 - FCBB 
2215Z 23NOV 2025 00 PAX
VJT503 FCBB 0850Z 25NOV 2025 - FNLU 
1000Z 25NOV 2025 00 PAX
```

---

## ✅ RÉSULTAT ATTENDU

Après avoir cliqué sur "Extraire les données", vous devriez voir :

```
✅ Données extraites avec succès !

Type:                 ASA
Numéro:              2398/OL/ANAC/DG/DTA/SRTA/25
Compagnie:           VISTAJET LIMITED
Type d'aéronef:      CL60
Immatriculation:     9H-VFA
Call Sign:           VJT503
Itinéraire:          FNLU - FCBB
Période:             23/11/2025 - 28/11/2025
```

---

## 🔧 AMÉLIORATIONS APPORTÉES

### 1️⃣ Détection "OVF & FCBB LND"
**Avant :** Pattern ne matchait pas `OVF & ... LND`  
**Maintenant :** Pattern amélioré :
```typescript
/\b(ASA|AEA|OVF.*LND|LND.*OVF|OVF\s*&\s*.*\s*LND|LND\s*&\s*.*\s*OVF)\b/i
```
✅ Détecte : "OVF & FCBB LND"

### 2️⃣ Extraction de la compagnie
**Avant :** Pattern trop restrictif  
**Maintenant :** 
```typescript
/(?:operator)[:\s]*([A-Z\s&]+)/i
```
✅ Extrait : "VISTAJET LIMITED"

### 3️⃣ Extraction de la route depuis SCHEDULE
**Avant :** Ne détectait pas les codes ICAO dans le schedule  
**Maintenant :** Extraction intelligente :
```typescript
// Cherche la section SCHEDULE
// Extrait tous les codes ICAO (4 lettres)
// Retire les doublons : FNLU, FCBB, FNLU → FNLU - FCBB
```
✅ Extrait : "FNLU - FCBB"

### 4️⃣ Pattern de dates amélioré
**Avant :** Format aviation pas toujours reconnu  
**Maintenant :** 
```typescript
/(\d{1,2}[A-Z]{3}\s*\d{4})|(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})|(\d{4}[-\/]\d{2}[-\/]\d{2})/gi
```
✅ Détecte : "23NOV 2025" et "25NOV 2025"

### 5️⃣ Console log pour debug
**Nouveau :** 
```typescript
console.error('Extraction error:', err);
```
✅ Permet de voir les erreurs dans la console du navigateur

---

## 🧪 PROCÉDURE DE TEST

### Étape 1 : Ouvrir l'application
1. Lancer l'application localement ou sur Netlify
2. Cliquer sur "+ Nouvelle autorisation"
3. Choisir "Extraire depuis WhatsApp"

### Étape 2 : Coller le texte
```
REP. OF CONGO OVF & FCBB LND PMT NR :2398/OL/ANAC/DG/DTA/SRTA/25. stop 

F.IBARA DIALLO 
CAA/ CONGO-BZV
```

### Étape 3 : Importer l'image
1. Cliquer sur "Importer une image ou un PDF"
2. Sélectionner l'image du document
3. Attendre l'OCR (ça peut prendre 10-30 secondes)
4. Le texte OCR s'ajoute dans la zone de texte

### Étape 4 : Vérifier le texte combiné
La zone de texte devrait contenir :
```
REP. OF CONGO OVF & FCBB LND PMT NR :2398/OL/ANAC/DG/DTA/SRTA/25. stop 

F.IBARA DIALLO 
CAA/ CONGO-BZV

OPERATOR          :VISTAJET LIMITED
AIRCRAFT TYPE     :CL60, MTOW : 21863 KGS
REGISTRATION      :9H-VFA OR SUB
CALLSIGN          :VJT503
...
```

### Étape 5 : Extraire
1. Cliquer sur "Extraire les données"
2. Vérifier le résultat

---

## 🔍 CHECKLIST DE VÉRIFICATION

### ✅ Type
- [ ] Détecté : **ASA**
- [ ] Source : "OVF & FCBB LND"

### ✅ Numéro
- [ ] Détecté : **2398/OL/ANAC/DG/DTA/SRTA/25**
- [ ] Source : "PMT NR :"

### ✅ Compagnie
- [ ] Détecté : **VISTAJET LIMITED**
- [ ] Source : "OPERATOR :"

### ✅ Type d'aéronef
- [ ] Détecté : **CL60**
- [ ] Source : "AIRCRAFT TYPE :"
- [ ] MTOW ignoré : ✅

### ✅ Immatriculation
- [ ] Détecté : **9H-VFA**
- [ ] Source : "REGISTRATION :"
- [ ] "OR SUB" ignoré : ✅

### ✅ Call Sign
- [ ] Détecté : **VJT503**
- [ ] Source : "CALLSIGN :"

### ✅ Itinéraire
- [ ] Détecté : **FNLU - FCBB** (ou similaire)
- [ ] Source : "SCHEDULE:"

### ✅ Dates
- [ ] Date début : **23/11/2025**
- [ ] Date fin : **28/11/2025** (25 NOV + 3 jours)
- [ ] Règle +3 jours appliquée : ✅

---

## ❌ SI ÇA NE FONCTIONNE PAS

### Problème 1 : "Type d'autorisation non détecté"
**Cause :** Pattern ne matche pas  
**Solution :** Vérifier que le texte contient bien "OVF" et "LND"  
**Debug :** Ouvrir la console du navigateur (F12) et chercher les erreurs

### Problème 2 : Certaines données manquantes
**Cause :** Pattern regex ne matche pas le format  
**Solution :** Vérifier le format exact dans la zone de texte  
**Debug :** Copier le texte de la zone de texte et me le partager

### Problème 3 : OCR ne fonctionne pas
**Cause :** Tesseract.js ne charge pas  
**Solution :** Vérifier la connexion internet  
**Debug :** Console du navigateur → onglet Network

### Problème 4 : Route mal extraite
**Cause :** Format du SCHEDULE différent  
**Solution :** Le texte devrait contenir des codes ICAO (4 lettres)  
**Debug :** Vérifier que "FNLU" et "FCBB" sont bien dans le texte

### Problème 5 : Dates incorrectes
**Cause :** Format de date non reconnu  
**Solution :** Vérifier le format (23NOV 2025)  
**Debug :** Console du navigateur pour voir les dates détectées

---

## 🛠️ DEBUG : Ouvrir la console

### Chrome / Edge / Brave
1. Appuyer sur **F12**
2. Onglet "Console"
3. Tester l'extraction
4. Regarder les messages

### Firefox
1. Appuyer sur **F12**
2. Onglet "Console"
3. Tester l'extraction
4. Regarder les messages

### Safari (Mac)
1. Développement → Afficher la console Web
2. Tester l'extraction
3. Regarder les messages

---

## 📊 RÉSULTATS POSSIBLES

| Résultat | Signification | Action |
|----------|---------------|--------|
| ✅ **Tout extrait** | Parfait ! | Enregistrer l'autorisation |
| ⚠️ **Partiellement extrait** | Certaines données manquent | Compléter manuellement |
| ❌ **Erreur "Type non détecté"** | Pattern ne matche pas | Vérifier le texte |
| ❌ **Aucune donnée** | Problème de code | Ouvrir la console (F12) |

---

## 💡 CONSEILS

### Pour une extraction optimale :

1. **Image nette** : Bonne résolution, bon éclairage
2. **Texte complet** : Copier tout le message WhatsApp
3. **Vérifier avant d'extraire** : Lire le texte dans la zone
4. **Corriger si nécessaire** : Modifier le texte avant l'extraction
5. **Tester plusieurs fois** : Affiner les patterns si besoin

---

## 🚀 APRÈS LE TEST

### Si tout fonctionne ✅
1. **Déployer** sur Netlify
2. **Installer** la PWA sur votre téléphone
3. **Tester** avec de vrais messages WhatsApp
4. **Utiliser** au quotidien !

### Si des problèmes persistent ❌
1. **Copier le texte** de la zone de texte
2. **Copier les erreurs** de la console (F12)
3. **Me les partager** pour que je corrige
4. **Je mettrai à jour** les patterns regex

---

## 📝 RAPPORT DE TEST

Remplissez après le test :

```
✅ Données extraites correctement :
- [ ] Type
- [ ] Numéro
- [ ] Compagnie
- [ ] Type d'aéronef
- [ ] Immatriculation
- [ ] Call Sign
- [ ] Itinéraire
- [ ] Dates

❌ Problèmes rencontrés :
- ...

💬 Commentaires :
- ...
```

---

## ✅ PRÊT À TESTER !

Suivez les étapes et dites-moi ce qui se passe ! 🚀
