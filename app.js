/**
 * Aura - Concierge Vocale Exclusif | Richie Rich Event
 * Voice Engine & Interactive Luxury Experience
 */

// Moteur de connaissances et d'intelligence d'Aura (Local & Immédiat)
const AURA_ENGINE = {
  systemPrompt: `Tu es Aura, le concierge virtuel et l'assistant exclusif de Richie Rich Event (richierichevent.com). 20 ans d'expertise dans la création d'événements sur mesure. Programme de fidélité Trust Points. Accès VIP en club partenaire. Ton élégant, direct, chaleureux et sélectif. Pas de Web3/crypto.`,

  respond(message, lang) {
    const clean = (message || '').toLowerCase();
    let currentLang = lang || 'fr';

    // Détection de langue
    if (/[\u0900-\u097F]/.test(clean) || clean.includes('namaste') || clean.includes('kaise') || clean.includes('dhanyavad')) {
      currentLang = 'hi';
    } else if (clean.includes('hello') || clean.includes('how are') || (clean.includes('trust points') && !clean.includes('comment')) || clean.includes('vip table') || clean.includes('event')) {
      if (!clean.includes('bonjour') && !clean.includes('merci') && !clean.includes('carré')) {
        currentLang = 'en';
      }
    }

    // Réponses en Hindi
    if (currentLang === 'hi') {
      if (clean.includes('trust') || clean.includes('point') || clean.includes('पॉइंट') || clean.includes('रिवॉर्ड') || clean.includes('फायदे')) {
        return "हमारे Trust Points प्रोग्राम के ज़रिए आप हर इवेंट में शामिल होकर, दोस्तों को रेफर करके खास रिवॉर्ड्स कमा सकते हैं। ये पॉइंट्स VIP टेबल्स, वेलकम ड्रिंक्स और एक्सक्लूसिव डिस्काउंट्स में बदले जाते हैं। क्या आप आज richierichevent.com पर रजिस्टर करना चाहेंगे?";
      }
      if (clean.includes('vip') || clean.includes('table') || clean.includes('क्लब') || clean.includes('पार्टी') || clean.includes('बुकिंग')) {
        return "Richie Rich Event के पार्टनर क्लब्स में आपको फास्ट-ट्रैक एंट्री और प्राइवेट VIP टेबल्स का विशेषाधिकार मिलता है। अपनी अगली खास रात के लिए आप हमारी टीम से सीधे संपर्क कर सकते हैं।";
      }
      if (clean.includes('event') || clean.includes('शादी') || clean.includes('इवेंट') || clean.includes('प्लान') || clean.includes('आयोजन')) {
        return "20 सालों से हम दुनिया के सबसे शानदार और एक्सक्लूसिव इवेंट्स तैयार कर रहे हैं। डेकोरेशन से लेकर इंटरनेशनल आर्टिस्ट्स तक, हम हर लम्हे को यादगार बनाते हैं। आइए richierichevent.com पर मिलकर आपकी शाम डिज़ाइन करें।";
      }
      if (clean.includes('कौन') || clean.includes('kaun') || clean.includes('who')) {
        return "नमस्ते। मैं Aura हूँ, Richie Rich Event की आधिकारिक वॉइस कंसीयर्ज। 20 सालों के लग्ज़री अनुभव के साथ, मैं आपकी सेवा में हाज़िर हूँ। बताइए, आज मैं आपके लिए क्या प्लान करूँ?";
      }
      return "नमस्ते। मैं Aura हूँ, Richie Rich Event की एक्सक्लूसिव कंसीयर्ज। 20 सालों के लग्ज़री इवेंट्स का अनुभव अब आपके लिए उपलब्ध है। बताइए, आज मैं आपके लिए कौन सा खास अनुभव प्लान करूँ?";
    }

    // Réponses en Anglais
    if (currentLang === 'en') {
      if (clean.includes('trust') || clean.includes('point') || clean.includes('loyalty') || clean.includes('reward')) {
        return "Our Trust Points reward your loyalty at every event, referral, and engagement. You can unlock fast-track VIP access, signature welcome drinks, and bespoke privileges. Would you like me to guide you to join our circle on richierichevent.com?";
      }
      if (clean.includes('vip') || clean.includes('table') || clean.includes('club') || clean.includes('night') || clean.includes('party')) {
        return "Through Richie Rich Event, step directly past the line with priority access and dedicated VIP tables in the most prestigious partner clubs. Let me know your date and guest list, and our private concierge will arrange everything.";
      }
      if (clean.includes('event') || clean.includes('bespoke') || clean.includes('anniversary') || clean.includes('wedding') || clean.includes('private')) {
        return "For over twenty years, Richie Rich Event has orchestrated breathtaking bespoke celebrations worldwide, from avant-garde scenography to world-class headliners. Shall we start designing your private vision together?";
      }
      if (clean.includes('who are you') || clean.includes('who is aura')) {
        return "I am Aura, the exclusive virtual concierge of Richie Rich Event. For two decades, we have crafted legendary bespoke parties and luxury nightlife experiences. How can I assist your evening?";
      }
      return "Welcome. I am Aura, your exclusive virtual concierge at Richie Rich Event. For two decades, we have defined bespoke luxury nightlife and private celebrations. How may I elevate your evening today?";
    }

    // Réponses en Français
    if (clean.includes('trust') || clean.includes('point') || clean.includes('fidelite') || clean.includes('fidélité') || clean.includes('avantage')) {
      return "Nos Trust Points récompensent votre fidélité lors de chaque venue, parrainage ou partage. Vous les convertissez ensuite en accès aux carrés VIP, verres d'accueil d'exception et privilèges sur mesure. Souhaitez-vous vous inscrire dès aujourd'hui sur richierichevent.com ?";
    }
    if (clean.includes('vip') || clean.includes('carre') || clean.includes('carré') || clean.includes('table') || clean.includes('club') || clean.includes('coupe-file') || clean.includes('boite') || clean.includes('boîte')) {
      return "Grâce à Richie Rich Event, vous bénéficiez d'un accès coupe-file prioritaire et de tables réservées dans nos clubs partenaires les plus exclusifs. Indiquez-moi votre date et le nombre d'invités, et notre conciergerie se charge de tout.";
    }
    if (clean.includes('evenement') || clean.includes('événement') || clean.includes('soiree') || clean.includes('soirée') || clean.includes('anniversaire') || clean.includes('mariage') || clean.includes('sur mesure')) {
      return "Depuis 20 ans, Richie Rich Event façonne des moments d'anthologie sur mesure, des décors monumentaux jusqu'aux artistes les plus renommés. Parlons de votre vision pour concevoir un événement qui marquera les esprits.";
    }
    if (clean.includes('qui es-tu') || clean.includes('qui est aura') || clean.includes('qui etes-vous')) {
      return "Je suis Aura, la concierge virtuelle et l'assistante exclusive de Richie Rich Event. Depuis vingt ans, nous créons des événements de luxe sur mesure et vous ouvrons les portes des clubs les plus sélects. Quel privilège puis-je organiser pour vous ?";
    }
    return "Bienvenue. Je suis Aura, votre concierge exclusive chez Richie Rich Event. Depuis vingt ans, nous concevons des événements d'exception et ouvrons les portes des nuits les plus sélectes. Quel privilège puis-je organiser pour vous aujourd'hui ?";
  }
};

const I18N = {
  fr: {
    statusIdle: "Aura est à votre écoute",
    statusListening: "Aura vous écoute...",
    statusProcessing: "Aura prépare votre réponse...",
    statusSpeaking: "Aura vous répond...",
    conciergeDesc: "Votre concierge vocale exclusive pour des expériences inoubliables",
    welcomeQuote: "« Bienvenue chez Richie Rich Event. Touchez le micro ou posez votre question. »",
    voiceHint: "Touchez le micro pour parler à Aura",
    inputPlaceholder: "Ou écrivez votre demande ici...",
    quickPrompts: [
      { text: "Comment fonctionnent les Trust Points ?", label: "✨ Trust Points" },
      { text: "Je souhaite réserver un carré VIP en club", label: "🍾 Carré VIP Club" },
      { text: "Organiser un événement privé sur mesure", label: "🎉 Événement Privé" },
      { text: "Comment rejoindre le cercle VIP ?", label: "💎 Devenir Membre" }
    ],
    defaultGreeting: "Bienvenue. Je suis Aura, votre concierge exclusive chez Richie Rich Event. Depuis vingt ans, nous façonnons des nuits et des événements sur mesure d'exception. Quel privilège puis-je organiser pour vous aujourd'hui ?"
  },
  en: {
    statusIdle: "Aura is at your service",
    statusListening: "Aura is listening...",
    statusProcessing: "Aura is preparing your response...",
    statusSpeaking: "Aura is speaking...",
    conciergeDesc: "Your exclusive voice concierge for unforgettable luxury nightlife & bespoke events",
    welcomeQuote: "“Welcome to Richie Rich Event. Tap the microphone or ask any question.”",
    voiceHint: "Tap the mic to talk with Aura",
    inputPlaceholder: "Or type your request here...",
    quickPrompts: [
      { text: "How do Trust Points work?", label: "✨ Trust Points" },
      { text: "Book an exclusive VIP table at a partner club", label: "🍾 VIP Club Tables" },
      { text: "Plan a bespoke private celebration", label: "🎉 Bespoke Events" },
      { text: "How can I join the VIP circle?", label: "💎 Join VIP Circle" }
    ],
    defaultGreeting: "Welcome. I am Aura, your exclusive virtual concierge at Richie Rich Event. For two decades, we have defined bespoke luxury nightlife and private celebrations. How may I elevate your evening today?"
  },
  hi: {
    statusIdle: "Aura आपकी सेवा में उपलब्ध है",
    statusListening: "Aura सुन रही है...",
    statusProcessing: "Aura विचार कर रही है...",
    statusSpeaking: "Aura बोल रही है...",
    conciergeDesc: "Richie Rich Event की एक्सक्लूसिव वॉइस कंसीयर्ज — लग्ज़री और खास पलों के लिए",
    welcomeQuote: "« Richie Rich Event में आपका स्वागत है। माइक पर टैप करें या सवाल पूछें। »",
    voiceHint: "Aura से बात करने के लिए माइक दबाएँ",
    inputPlaceholder: "या यहाँ अपना संदेश लिखें...",
    quickPrompts: [
      { text: "Trust Points रिवॉर्ड्स कैसे काम करते हैं?", label: "✨ Trust Points" },
      { text: "पार्टनर क्लब में VIP टेबल बुक करें", label: "🍾 VIP क्लब टेबल" },
      { text: "एक खास प्राइवेट इवेंट प्लान करें", label: "🎉 प्राइवेट इवेंट्स" },
      { text: "VIP सर्कल में कैसे शामिल हों?", label: "💎 सदस्य बनें" }
    ],
    defaultGreeting: "नमस्ते। मैं Aura हूँ, Richie Rich Event की एक्सक्लूसिव कंसीयर्ज। 20 सालों के लग्ज़री इवेंट्स का अनुभव अब आपके लिए उपलब्ध है। बताइए, आज मैं आपके लिए कौन सा खास अनुभव प्लान करूँ?"
  }
};

class AuraVoiceApp {
  constructor() {
    this.currentLang = 'fr';
    this.isListening = false;
    this.isSpeaking = false;
    this.isProcessing = false;
    this.conversationHistory = [];
    
    this.apiKey = localStorage.getItem('aura_gemini_api_key') || '';
    this.speechRate = parseFloat(localStorage.getItem('aura_speech_rate') || '1.02');
    this.autoSpeak = localStorage.getItem('aura_auto_speak') !== 'false';
    this.selectedVoiceURI = localStorage.getItem('aura_selected_voice') || 'auto';

    this.speechSynthesis = window.speechSynthesis;
    this.recognition = null;
    this.availableVoices = [];

    this.canvas = document.getElementById('audioVisualizer');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.animationId = null;

    this.initDOM();
    this.initSpeechRecognition();
    this.initSpeechSynthesis();
    this.initEvents();
    this.setLanguage('fr', false);
    this.startCanvasVisualizer();
  }

  initDOM() {
    this.dom = {
      statusBadge: document.getElementById('statusBadge'),
      statusText: document.getElementById('statusText'),
      conciergeDesc: document.getElementById('conciergeDesc'),
      auraOrb: document.getElementById('auraOrb'),
      speechLiveBox: document.getElementById('speechLiveBox'),
      speechLiveText: document.getElementById('speechLiveText'),
      quickPrompts: document.getElementById('quickPrompts'),
      micBtn: document.getElementById('micBtn'),
      micIcon: document.getElementById('micIcon'),
      micWave: document.getElementById('micListeningWave'),
      voiceHint: document.getElementById('voiceHint'),
      textForm: document.getElementById('textForm'),
      textInput: document.getElementById('textInput'),
      transcriptList: document.getElementById('transcriptList'),
      clearChatBtn: document.getElementById('clearChatBtn'),
      langBtns: document.querySelectorAll('.lang-btn'),
      settingsBtn: document.getElementById('settingsBtn'),
      settingsModal: document.getElementById('settingsModal'),
      closeSettingsBtn: document.getElementById('closeSettingsBtn'),
      saveSettingsBtn: document.getElementById('saveSettingsBtn'),
      apiKeyInput: document.getElementById('apiKeyInput'),
      voiceSelect: document.getElementById('voiceSelect'),
      speechRate: document.getElementById('speechRate'),
      rateVal: document.getElementById('rateVal'),
      autoSpeakToggle: document.getElementById('autoSpeakToggle')
    };

    if (this.dom.apiKeyInput) this.dom.apiKeyInput.value = this.apiKey;
    if (this.dom.speechRate) this.dom.speechRate.value = this.speechRate;
    if (this.dom.rateVal) this.dom.rateVal.textContent = `${this.speechRate}x`;
    if (this.dom.autoSpeakToggle) this.dom.autoSpeakToggle.checked = this.autoSpeak;
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("L'API Web Speech Recognition n'est pas supportée dans ce navigateur.");
      if (this.dom.voiceHint) this.dom.voiceHint.textContent = "Reconnaissance vocale non disponible sur ce navigateur (utilisez le clavier)";
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateState('listening');
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const currentText = finalTranscript || interimTranscript;
        if (currentText) {
          this.dom.speechLiveText.textContent = `« ${currentText} »`;
        }

        if (finalTranscript) {
          this.isListening = false;
          this.handleUserMessage(finalTranscript);
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('Statut reconnaissance vocale:', event.error);
        this.isListening = false;
        this.updateState('idle');
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (!this.isProcessing && !this.isSpeaking) {
          this.updateState('idle');
        }
      };
    } catch (e) {
      console.warn('Initialisation SpeechRecognition:', e);
    }
  }

  initSpeechSynthesis() {
    if (!this.speechSynthesis) return;

    const populateVoices = () => {
      try {
        this.availableVoices = this.speechSynthesis.getVoices() || [];
        if (!this.dom.voiceSelect) return;

        this.dom.voiceSelect.innerHTML = '<option value="auto">Détection automatique optimisée</option>';
        this.availableVoices.forEach((voice) => {
          const option = document.createElement('option');
          option.value = voice.voiceURI;
          option.textContent = `${voice.name} (${voice.lang})`;
          if (voice.voiceURI === this.selectedVoiceURI) {
            option.selected = true;
          }
          this.dom.voiceSelect.appendChild(option);
        });
      } catch (err) {
        console.warn('Erreur populateVoices:', err);
      }
    };

    populateVoices();
    if (this.speechSynthesis.onvoiceschanged !== undefined) {
      this.speechSynthesis.onvoiceschanged = populateVoices;
    }
  }

  initEvents() {
    this.dom.micBtn.addEventListener('click', () => this.toggleListening());

    this.dom.langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        this.setLanguage(lang, true);
      });
    });

    this.dom.textForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = this.dom.textInput.value.trim();
      if (text) {
        this.dom.textInput.value = '';
        this.handleUserMessage(text);
      }
    });

    this.dom.clearChatBtn.addEventListener('click', () => {
      this.conversationHistory = [];
      this.dom.transcriptList.innerHTML = '';
      this.dom.speechLiveText.textContent = I18N[this.currentLang].welcomeQuote;
    });

    this.dom.settingsBtn.addEventListener('click', () => {
      this.dom.settingsModal.classList.remove('hidden');
    });

    this.dom.closeSettingsBtn.addEventListener('click', () => {
      this.dom.settingsModal.classList.add('hidden');
    });

    this.dom.speechRate.addEventListener('input', (e) => {
      this.dom.rateVal.textContent = `${e.target.value}x`;
    });

    this.dom.saveSettingsBtn.addEventListener('click', () => {
      this.apiKey = this.dom.apiKeyInput.value.trim();
      this.speechRate = parseFloat(this.dom.speechRate.value);
      this.autoSpeak = this.dom.autoSpeakToggle.checked;
      this.selectedVoiceURI = this.dom.voiceSelect.value;

      localStorage.setItem('aura_gemini_api_key', this.apiKey);
      localStorage.setItem('aura_speech_rate', this.speechRate.toString());
      localStorage.setItem('aura_auto_speak', this.autoSpeak.toString());
      localStorage.setItem('aura_selected_voice', this.selectedVoiceURI);

      this.dom.settingsModal.classList.add('hidden');
    });
  }

  setLanguage(lang, speakGreeting = false) {
    if (!I18N[lang]) return;
    this.currentLang = lang;

    this.dom.langBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });

    const i18n = I18N[lang];
    this.dom.statusText.textContent = i18n.statusIdle;
    this.dom.conciergeDesc.textContent = i18n.conciergeDesc;
    this.dom.speechLiveText.textContent = i18n.welcomeQuote;
    this.dom.voiceHint.textContent = i18n.voiceHint;
    this.dom.textInput.placeholder = i18n.inputPlaceholder;

    if (this.recognition) {
      const langCodes = { fr: 'fr-FR', en: 'en-US', hi: 'hi-IN' };
      this.recognition.lang = langCodes[lang] || 'fr-FR';
    }

    this.dom.quickPrompts.innerHTML = '';
    i18n.quickPrompts.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'prompt-pill';
      btn.textContent = p.label;
      btn.addEventListener('click', () => this.handleUserMessage(p.text));
      this.dom.quickPrompts.appendChild(btn);
    });

    if (speakGreeting) {
      this.speak(i18n.defaultGreeting);
      this.addMessageToTranscript('aura', i18n.defaultGreeting);
    }
  }

  toggleListening() {
    if (this.isSpeaking) {
      this.stopSpeaking();
    }

    if (!this.recognition) {
      const promptText = prompt(this.currentLang === 'fr' ? "Dictez ou écrivez votre message pour Aura :" : "Say or write your message for Aura:");
      if (promptText) this.handleUserMessage(promptText);
      return;
    }

    if (this.isListening) {
      try { this.recognition.stop(); } catch(e){}
      this.isListening = false;
      this.updateState('idle');
    } else {
      try {
        this.recognition.start();
      } catch (err) {
        console.warn('Reconnaissance déjà active ou erreur:', err);
      }
    }
  }

  async handleUserMessage(message) {
    if (!message || message.trim() === '') return;

    this.stopSpeaking();
    this.addMessageToTranscript('user', message);
    this.dom.speechLiveText.textContent = `« ${message} »`;

    this.isProcessing = true;
    this.updateState('processing');

    let reply = '';

    // 1. Si une clé Gemini est renseignée côté client, tentative directe
    if (this.apiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;
        const res = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: `${AURA_ENGINE.systemPrompt}\nLangue requise : ${this.currentLang}.\nMessage : ${message}` }] }
            ],
            generationConfig: { temperature: 0.7, maxOutputTokens: 250 }
          })
        });
        if (res.ok) {
          const gData = await res.json();
          reply = gData.candidates?.[0]?.content?.parts?.[0]?.text;
        }
      } catch (e) {
        console.warn('Échec direct Gemini:', e);
      }
    }

    // 2. Si pas encore de réponse, tentative via le serveur /api/chat
    if (!reply) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            history: this.conversationHistory,
            language: this.currentLang,
            apiKey: this.apiKey || undefined
          })
        });

        const contentType = response.headers.get('content-type') || '';
        if (response.ok && contentType.includes('application/json')) {
          const data = await response.json();
          if (data && data.reply) {
            reply = data.reply;
          }
        }
      } catch (err) {
        console.warn('Le serveur /api/chat ne répond pas en JSON:', err);
      }
    }

    // 3. Moteur autonome haute fidélité (Garantie 100% de réponse)
    if (!reply) {
      reply = AURA_ENGINE.respond(message, this.currentLang);
    }

    this.isProcessing = false;
    this.addMessageToTranscript('aura', reply);
    this.dom.speechLiveText.textContent = `« ${reply} »`;

    if (this.autoSpeak) {
      this.speak(reply);
    } else {
      this.updateState('idle');
    }
  }

  speak(text) {
    if (!this.speechSynthesis) return;

    this.stopSpeaking();
    this.isSpeaking = true;
    this.updateState('speaking');

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = this.speechRate;
      utterance.pitch = 1.0;

      let selectedVoice = null;
      if (this.selectedVoiceURI && this.selectedVoiceURI !== 'auto') {
        selectedVoice = this.availableVoices.find(v => v.voiceURI === this.selectedVoiceURI);
      }

      if (!selectedVoice) {
        const langPrefix = this.currentLang === 'hi' ? 'hi' : (this.currentLang === 'en' ? 'en' : 'fr');
        selectedVoice = this.availableVoices.find(v => v.lang && v.lang.startsWith(langPrefix) && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Online')));
        if (!selectedVoice) {
          selectedVoice = this.availableVoices.find(v => v.lang && v.lang.startsWith(langPrefix));
        }
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onend = () => {
        this.isSpeaking = false;
        this.updateState('idle');
      };

      utterance.onerror = (e) => {
        console.warn('Statut synthèse vocale:', e);
        this.isSpeaking = false;
        this.updateState('idle');
      };

      this.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Erreur synthèse:', e);
      this.isSpeaking = false;
      this.updateState('idle');
    }
  }

  stopSpeaking() {
    if (this.speechSynthesis) {
      try {
        this.speechSynthesis.cancel();
      } catch(e){}
      this.isSpeaking = false;
    }
  }

  updateState(state) {
    const { auraOrb, micBtn, micIcon, micWave, statusText } = this.dom;
    const i18n = I18N[this.currentLang];

    if (!auraOrb || !micBtn) return;

    auraOrb.classList.remove('listening', 'processing', 'speaking');
    micBtn.classList.remove('recording');
    if (micIcon) micIcon.classList.remove('hidden');
    if (micWave) micWave.classList.add('hidden');

    switch (state) {
      case 'listening':
        auraOrb.classList.add('listening');
        micBtn.classList.add('recording');
        if (micIcon) micIcon.classList.add('hidden');
        if (micWave) micWave.classList.remove('hidden');
        if (statusText) statusText.textContent = i18n.statusListening;
        break;

      case 'processing':
        auraOrb.classList.add('processing');
        if (statusText) statusText.textContent = i18n.statusProcessing;
        break;

      case 'speaking':
        auraOrb.classList.add('speaking');
        if (statusText) statusText.textContent = i18n.statusSpeaking;
        break;

      case 'idle':
      default:
        if (statusText) statusText.textContent = i18n.statusIdle;
        break;
    }
  }

  addMessageToTranscript(sender, text) {
    this.conversationHistory.push({ sender, text });

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;

    const senderLabel = sender === 'aura' ? 'AURA — CONCIERGE' : 'VOUS';
    
    let playBtnHtml = '';
    if (sender === 'aura') {
      playBtnHtml = `
        <button class="play-audio-btn" title="Écouter la voix d'Aura">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
      `;
    }

    bubble.innerHTML = `
      <span class="bubble-sender">${senderLabel}</span>
      <div class="bubble-body">
        <span>${text}</span>
        ${playBtnHtml}
      </div>
    `;

    if (sender === 'aura') {
      const playBtn = bubble.querySelector('.play-audio-btn');
      if (playBtn) {
        playBtn.addEventListener('click', () => this.speak(text));
      }
    }

    this.dom.transcriptList.appendChild(bubble);
    this.dom.transcriptList.scrollTop = this.dom.transcriptList.scrollHeight;
  }

  startCanvasVisualizer() {
    if (!this.ctx || !this.canvas) return;

    let tick = 0;
    const draw = () => {
      tick++;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const numBars = 32;
      const barWidth = 3;
      const gap = (this.canvas.width - (numBars * barWidth)) / (numBars - 1);
      const centerY = this.canvas.height / 2;

      for (let i = 0; i < numBars; i++) {
        let barHeight = 4;

        if (this.isSpeaking) {
          const wave = Math.sin((tick * 0.12) + (i * 0.35)) * 0.5 + 0.5;
          const noise = Math.cos((tick * 0.08) - (i * 0.2)) * 0.5 + 0.5;
          barHeight = 6 + (wave * noise * 28);
        } else if (this.isListening) {
          const wave = Math.sin((tick * 0.18) + (i * 0.4)) * 0.5 + 0.5;
          barHeight = 4 + (wave * 20);
        } else {
          const wave = Math.sin((tick * 0.03) + (i * 0.2)) * 0.5 + 0.5;
          barHeight = 3 + (wave * 5);
        }

        const x = i * (barWidth + gap);
        const y = centerY - (barHeight / 2);

        const gradient = this.ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (this.isListening) {
          gradient.addColorStop(0, '#a78bfa');
          gradient.addColorStop(1, '#6d28d9');
        } else {
          gradient.addColorStop(0, '#fef08a');
          gradient.addColorStop(0.5, '#d4af37');
          gradient.addColorStop(1, '#854d0e');
        }

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.roundRect(x, y, barWidth, barHeight, 2);
        this.ctx.fill();
      }

      this.animationId = requestAnimationFrame(draw);
    };

    draw();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.auraApp = new AuraVoiceApp();
});
