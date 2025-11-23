# ⏰ RÈGLE MÉTIER : +3 JOURS POUR LES ASA

## 📋 DESCRIPTION

Pour toutes les autorisations de type **ASA** (Autorisation de Survol et d'Atterrissage), l'application ajoute **automatiquement 3 jours** à la date de fin de validité.

Cette règle métier est appliquée à l'enregistrement de l'autorisation, que ce soit via :
- ✅ Extraction automatique (texte/image/PDF)
- ✅ Saisie manuelle (formulaire)

---

## 🎯 EXEMPLE

### Document reçu :
```
SCHEDULE:
VJT503 FNLU 2105Z 23NOV 2025 - FCBB 
VJT503 FCBB 0850Z 25NOV 2025 - FNLU
```

**Date de fin détectée :** 25 novembre 2025

### Dans l'application :
```
Type:               ASA
Période:            23/11/2025 - 28/11/2025
                                  ↑
                        +3 jours ajoutés automatiquement
```

**Date de fin enregistrée :** 28 novembre 2025 (25 + 3 jours)

---

## 🔧 IMPLÉMENTATION TECHNIQUE

### 1️⃣ Dans `TextExtractor.tsx` (extraction automatique)

```typescript
if (type === 'ASA') {
  // RÈGLE MÉTIER: Ajouter 3 jours à la date de fin pour les ASA
  if (validTo) {
    const endDate = new Date(validTo);
    endDate.setDate(endDate.getDate() + 3);
    validTo = endDate.toISOString().split('T')[0];
  }

  setExtractedData({
    type: 'ASA',
    number,
    company,
    aircraftType,
    registration,
    callSign,
    route,
    validFrom,
    validTo, // Date ajustée (+3 jours)
  });
}
```

### 2️⃣ Dans `AuthorizationForm.tsx` (saisie manuelle)

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  if (type === 'ASA') {
    // RÈGLE MÉTIER: Ajouter 3 jours à la date de fin pour les ASA
    let adjustedValidTo = formData.validTo;
    if (adjustedValidTo) {
      const endDate = new Date(adjustedValidTo);
      endDate.setDate(endDate.getDate() + 3);
      adjustedValidTo = endDate.toISOString().split('T')[0];
    }

    onSubmit({
      type: 'ASA',
      // ...autres champs
      validTo: adjustedValidTo, // Date ajustée (+3 jours)
    });
  }
};
```

---

## 💡 INDICATION VISUELLE

Dans le formulaire de saisie manuelle, lorsque l'utilisateur choisit **ASA** et sélectionne une date de fin, un **message informatif** s'affiche automatiquement :

```
┌─────────────────────────────────────────────────────┐
│ ℹ️ Pour les ASA, 3 jours seront automatiquement    │
│    ajoutés à la date de fin (date finale :         │
│    28/11/2025)                                      │
└─────────────────────────────────────────────────────┘
```

Cela permet à l'utilisateur de :
- ✅ Comprendre la règle métier
- ✅ Voir la date finale qui sera enregistrée
- ✅ Ajuster sa saisie si nécessaire

---

## 📊 IMPACT SUR LES FONCTIONNALITÉS

### ✅ Notifications
Les notifications d'expiration sont calculées sur la **date ajustée (+3 jours)**, pas sur la date originale du document.

**Exemple :**
- Document : 23 NOV 2025 - 25 NOV 2025
- Date enregistrée : 23 NOV 2025 - 28 NOV 2025
- Notification 7 jours avant : **21 NOV 2025**
- Notification 1 jour avant : **27 NOV 2025**

### ✅ Statut (Valide/Expiré)
Le statut est calculé en fonction de la **date ajustée**.

**Exemple (aujourd'hui = 26 NOV 2025) :**
- Document : expire le 25 NOV 2025
- Date enregistrée : expire le 28 NOV 2025
- Statut affiché : **🟢 Valide** (pas expiré)

### ✅ Export PDF
Le PDF exporté affiche la **date ajustée (+3 jours)**.

```
Période de validité:
Du 23/11/2025 au 28/11/2025
```

---

## 🧪 CAS D'UTILISATION RÉELS

### Cas 1 : Extraction automatique
```
INPUT (document WhatsApp):
REP. OF CONGO OVF & FCBB LND PMT NR :2398/...
SCHEDULE:
VJT503 FNLU 2105Z 23NOV 2025 - FCBB 
VJT503 FCBB 0850Z 25NOV 2025 - FNLU

OUTPUT (application):
Type:               ASA
Période:            23/11/2025 - 28/11/2025
                                  ↑ +3 jours
```

### Cas 2 : Saisie manuelle
```
SAISIE UTILISATEUR:
Type:               ASA
Valide du:          23/11/2025
Jusqu'au:           25/11/2025

AFFICHAGE IMMÉDIAT:
ℹ️ Pour les ASA, 3 jours seront automatiquement 
   ajoutés (date finale : 28/11/2025)

ENREGISTREMENT:
validTo = "2025-11-28" (pas "2025-11-25")
```

### Cas 3 : Type AEA (pas de +3 jours)
```
INPUT:
Type:               AEA
Période:            23/11/2025 - 25/11/2025

OUTPUT:
Type:               AEA
Période:            23/11/2025 - 25/11/2025
                                  ↑ pas de changement
```

---

## 🎯 RÉSUMÉ

| Type | Date document | Date enregistrée | Différence |
|------|---------------|------------------|------------|
| **ASA** | 25/11/2025 | **28/11/2025** | +3 jours ✅ |
| **AEA** | 25/11/2025 | 25/11/2025 | Aucune ❌ |

---

## 📝 NOTES IMPORTANTES

1. **Transparence :** L'utilisateur est toujours informé de la date finale via le message informatif dans le formulaire.

2. **Cohérence :** La règle est appliquée uniformément partout dans l'application (extraction auto, saisie manuelle, notifications, export PDF).

3. **Traçabilité :** La date ajustée est celle qui est stockée dans la base de données (localStorage).

4. **Flexibilité :** Si l'utilisateur veut une date différente, il peut :
   - Soit saisir manuellement une date 3 jours avant celle souhaitée
   - Soit modifier l'autorisation après création

---

## ✅ IMPLÉMENTATION TERMINÉE

La règle métier **"+3 jours pour les ASA"** est maintenant **complètement implémentée** dans :

- ✅ `TextExtractor.tsx` (extraction automatique)
- ✅ `AuthorizationForm.tsx` (saisie manuelle)
- ✅ Message informatif dans le formulaire
- ✅ Documentation complète

---

## 🚀 PROCHAINE ÉTAPE

**Déployez l'application et testez avec vos documents réels !**

Avec votre exemple :
- Document : 23NOV 2025 - 25NOV 2025
- Application : 23/11/2025 - **28/11/2025** ✅
