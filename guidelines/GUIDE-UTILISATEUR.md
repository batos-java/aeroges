# 📱 GUIDE D'UTILISATION - AeroGes

Guide complet pour utiliser l'application AeroGes sur Android.

---

## 📥 INSTALLATION

### **Sur Android (recommandé)**

1. **Ouvrir Chrome** sur votre téléphone
2. **Aller sur** : `https://batos-java.github.io/aeroges/`
3. **Menu (⋮)** → **"Installer l'application"**
4. **Valider** l'installation
5. ✅ L'icône AeroGes apparaît sur votre écran d'accueil !

---

## 🚀 PREMIÈRE UTILISATION

### **1️⃣ Activer les notifications**

1. Cliquez sur l'icône **cloche** (🔔) en haut à droite
2. Autorisez les notifications quand demandé
3. ✅ Vous recevrez des alertes **7, 3 et 1 jour avant l'expiration** des autorisations

---

## ✈️ AJOUTER UNE AUTORISATION ASA (Automatique)

**ASA = Autorisation de Survol et d'Atterrissage**

### **Méthode : Extraction automatique depuis WhatsApp**

1. **Copiez** le message WhatsApp contenant l'autorisation ASA
2. Dans AeroGes, cliquez sur **"Extraire"** (bouton bleu)
3. **Collez** le texte dans le champ
4. Cliquez sur **"Extraire les informations"**
5. ✅ **Les informations sont automatiquement remplies !**
6. **Vérifiez** les données (surtout la date de fin = date d'origine + 3 jours)
7. Cliquez sur **"Ajouter l'autorisation"**

### **⚠️ Règle importante : +3 jours**

La date de fin de validité est **automatiquement augmentée de 3 jours** par rapport à la date indiquée dans le message WhatsApp.

**Exemple :**
- Message WhatsApp : Valide jusqu'au **15/12/2025**
- Dans AeroGes : **18/12/2025** (15 + 3 jours)

---

## 📝 AJOUTER UNE AUTORISATION AEA (Manuel)

**AEA = Autorisation d'Exploitation d'Aéronefs**

### **Méthode : Saisie manuelle**

1. Cliquez sur **"Ajouter"** (bouton blanc bordé bleu)
2. Sélectionnez **"AEA"** en haut
3. Remplissez **tous les champs** :
   - Numéro d'autorisation
   - Compagnie
   - Type d'appareil
   - Immatriculation
   - Date de début
   - Date de fin
4. Cliquez sur **"Ajouter l'autorisation"**

---

## 🔍 RECHERCHER UNE AUTORISATION

### **Barre de recherche**

Tapez dans la barre de recherche :
- **Numéro** d'autorisation
- **Nom de la compagnie**
- **Immatriculation** de l'appareil

Les résultats sont **filtrés instantanément** !

### **Filtres**

Cliquez sur les boutons :
- **Tout** : Affiche toutes les autorisations
- **ASA** : Affiche uniquement les ASA
- **AEA** : Affiche uniquement les AEA

---

## 📄 VOIR LES DÉTAILS D'UNE AUTORISATION

1. **Cliquez** sur une autorisation dans la liste
2. Vous voyez tous les détails :
   - Numéro, compagnie, type d'appareil
   - Dates de validité
   - Jours restants avant expiration
   - Pour ASA : itinéraire et indicatif d'appel

---

## ✏️ MODIFIER UNE AUTORISATION

1. **Ouvrez** les détails de l'autorisation
2. Cliquez sur **"Modifier"**
3. Changez les informations nécessaires
4. Cliquez sur **"Enregistrer les modifications"**

---

## 🗑️ SUPPRIMER UNE AUTORISATION

1. **Ouvrez** les détails de l'autorisation
2. Cliquez sur **"Supprimer"**
3. **Confirmez** la suppression

⚠️ **Attention :** Cette action est irréversible !

---

## 📥 EXPORTER EN PDF

1. **Ouvrez** les détails de l'autorisation
2. Cliquez sur **"Exporter en PDF"**
3. Le PDF est **téléchargé automatiquement**
4. Vous pouvez le partager ou l'imprimer

Le PDF contient :
- Toutes les informations de l'autorisation
- Format professionnel
- Logo AeroGes

---

## 🔔 NOTIFICATIONS

### **Quand recevez-vous des notifications ?**

Vous recevrez une notification :
- **7 jours** avant l'expiration
- **3 jours** avant l'expiration
- **1 jour** avant l'expiration

### **Activer/Désactiver**

Cliquez sur l'icône **cloche** (🔔) en haut à droite pour activer/désactiver.

---

## 💾 DONNÉES ET SAUVEGARDE

### **Où sont stockées mes données ?**

Les données sont **stockées localement** sur votre téléphone :
- ✅ **Pas de serveur** = vos données restent privées
- ✅ **Accès hors ligne** = fonctionne sans Internet
- ⚠️ **Sauvegarde manuelle** = pensez à exporter vos autorisations en PDF régulièrement

### **Si je désinstalle l'app ?**

⚠️ **Toutes les données seront perdues** !

**Solution :** Exportez vos autorisations en PDF avant de désinstaller.

---

## 🌐 MODE HORS LIGNE

L'app fonctionne **sans connexion Internet** grâce au service worker :
- ✅ Consulter les autorisations
- ✅ Ajouter/modifier/supprimer
- ✅ Exporter en PDF
- ❌ Impossible de recevoir de nouvelles notifications push

---

## 📋 EXEMPLE D'EXTRACTION ASA

### **Texte WhatsApp typique :**

```
ASA N°2025/12/345
Compagnie : Air Transport Service
Type d'appareil : Boeing 737-800
Immatriculation : N12345
Indicatif d'appel : ATS123
Itinéraire : Dakar (DSS) - Abidjan (ABJ) - Lagos (LOS)
Valide du 10/12/2025 au 20/12/2025
```

### **Résultat après extraction :**

- **Numéro** : 2025/12/345
- **Compagnie** : Air Transport Service
- **Type d'appareil** : Boeing 737-800
- **Immatriculation** : N12345
- **Indicatif** : ATS123
- **Itinéraire** : Dakar (DSS) - Abidjan (ABJ) - Lagos (LOS)
- **Valide du** : 10/12/2025
- **Valide jusqu'au** : **23/12/2025** (20 + 3 jours !)

---

## ❓ QUESTIONS FRÉQUENTES

### **L'extraction automatique ne fonctionne pas**

1. Vérifiez que le texte contient **tous les champs** requis
2. Le format doit être similaire à l'exemple ci-dessus
3. En cas d'échec, ajoutez l'autorisation **manuellement**

### **Je ne reçois pas de notifications**

1. Vérifiez que les notifications sont **activées** (icône cloche)
2. Autorisez les notifications dans les **paramètres Android** :
   - Paramètres → Applications → Chrome → Notifications → Autoriser

### **L'app est lente**

1. Fermez les autres applications
2. Redémarrez Chrome
3. Si le problème persiste, videz le cache : Chrome → Paramètres → Confidentialité → Effacer les données

---

## 🎯 CONSEILS D'UTILISATION

1. ✅ **Activez les notifications** pour ne jamais oublier une expiration
2. ✅ **Exportez en PDF** régulièrement pour avoir une sauvegarde
3. ✅ **Vérifiez toujours** les dates après extraction automatique
4. ✅ **Utilisez les filtres** pour retrouver rapidement une autorisation
5. ✅ **Nettoyez régulièrement** les autorisations expirées

---

## 📞 SUPPORT

Pour toute question ou problème :
- Consultez ce guide
- Vérifiez le fichier `DEPLOY-SUCCESS.md`
- Contactez votre administrateur système

---

**Bonne utilisation ! ✈️**
