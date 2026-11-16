# ✨ AURA — Concierge Virtuelle & Voice App
### *Richie Rich Event (richierichevent.com)*

Aura est l'application vocale exclusive conçue sur mesure pour **Richie Rich Event**, référence depuis plus de 20 ans dans l'organisation d'événements de luxe, la scénographie sur mesure et les accès VIP en clubs partenaires.

---

## 🌟 Fonctionnalités Clés

1. **Expérience Vocale Complète (Voice In / Voice Out)** :
   - **Reconnaissance Vocale (STT)** en temps réel via la Web Speech API.
   - **Synthèse Vocale (TTS)** fluide et chaleureuse, calibrée pour le luxe et la nuit.
   - **Orbe Aura Dynamique** : Animation interactive réactive selon les états (*En écoute*, *En réflexion*, *En train de parler*, *En veille*).
   - **Visualiseur Audio de Fréquences** : Spectre d'ondes dorées synchronisé en direct.

2. **Support Trilingue Dédié** :
   - 🇫🇷 **Français** : Accueil chaleureux, distinction et élégance nocturne.
   - 🇬🇧 **Anglais** : International bespoke concierge, refined VIP tone.
   - 🇮🇳 **Hindi (Indien)** : Accueil respectueux et exclusif (*नमस्ते, आपका स्वागत है*).
   - Détection automatique et sélecteur rapide de langue.

3. **Connaissance Métier Richie Rich Event** :
   - **20 ans d'expertise** dans l'événementiel haute couture.
   - **Programme Trust Points** : Récompense la fidélité, le parrainage et l'engagement social pour débloquer des privilèges (carrés VIP, réductions, verres d'accueil).
   - **Partenariats Clubs VIP** : Accès coupe-file, tables dédiées et cercle d'ambassadeurs.
   - **Zéro Web3 / Crypto** : Respect strict de l'interdiction de toute mention blockchain.

4. **Architecture Hybride (Plug & Play)** :
   - Fonctionne **immédiatement à 100% hors ligne** grâce à un moteur de conciergerie haute fidélité intégré.
   - Possibilité de connecter **Google Gemini API** (Gemini 2.5 Flash) via un champ de clé API sécurisé dans les réglages ou via la variable d'environnement `GEMINI_API_KEY`.
   - **Zéro dépendance npm requise** : Tourne directement sur le runtime natif Node.js (`node:http`, `node:fs`).

---

## 🚀 Lancement Rapide

Dans le dossier `aura-voice-app` :

```bash
# Lancement direct du serveur
node server.js
```

Ouvrez ensuite votre navigateur sur :
👉 **[http://localhost:3050](http://localhost:3050)**

*(Note : Si le port 3050 est occupé, le serveur bascule automatiquement sur le port suivant).*

---

## 🎙️ Utilisation

1. Cliquez sur le **bouton Microphone doré** au centre.
2. Parlez naturellement (ex. : *"Comment fonctionnent les Trust Points ?"*, *"I want to book a VIP table tonight"*, ou en hindi).
3. Aura vous répond instantanément à la voix avec sous-titres synchronisés et transcription dans le journal de bord.
4. Vous pouvez également cliquer sur les **pastilles VIP rapides** ou utiliser le champ texte discret.

---

## 💎 Intégration sur richierichevent.com

L'application peut être hébergée comme application autonome ou intégrée dans une iframe responsive ou un widget flottant sur le site officiel.
