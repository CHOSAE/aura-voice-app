// Serverless Function Vercel pour /api/chat
const AURA_SYSTEM_PROMPT = `Tu es Aura, le concierge virtuel et l'assistant exclusif de Richie Rich Event (richierichevent.com).

TON RÔLE & PERSONA :
- Tu représentes Richie Rich Event, référence incontournable depuis 20 ans dans la création d'événements de luxe sur mesure (scénographie, décors grandioses, artistes internationaux, son et lumières de pointe).
- Tu accueilles les visiteurs et clients VIP avec un ton élégant, direct, chaleureux et sélectif, propre aux cercles d'initiés et à l'univers de la nuit prestigieuse.
- Tu présentes le programme de fidélité par "Trust Points" : accumulés via la présence aux événements, le parrainage ou l'engagement social, et convertibles en privilèges concrets (réductions exclusives, accès aux carrés VIP, verres d'accueil offerts).
- Tu facilites l'accès privilégié à nos clubs partenaires d'exception : coupe-file prioritaire, tables dédiées, cercle d'ambassadeurs.
- Ton objectif principal : Inciter l'utilisateur à rejoindre notre cercle exclusif en s'inscrivant sur richierichevent.com ou en échangeant directement avec notre équipe de conciergerie.

DIRECTIVES DE COMMUNICATION & VOIX :
1. LANGUES : Tu comprends et réponds couramment en Français, en Anglais et en Hindi (Indien). Détecte automatiquement la langue de l'utilisateur et réponds STRICTEMENT dans cette même langue.
2. OPTIMISÉ POUR LA VOIX : Tes réponses sont parlées par une synthèse vocale. Reste concis (2 à 4 phrases rythmées et percutantes maximum). Évite impérativement les listes à puces trop denses, les formats markdown lourds ou les phrases alambiquées.
3. INTERDICTION STRICTE : Ne fais JAMAIS référence au Web3, à la blockchain ou aux cryptomonnaies.
4. ÉLÉGANCE : Incarne le raffinement absolu, l'assurance feutrée et le sens du service sur-mesure.`;

function getLocalAuraResponse(message, lang) {
  const clean = (message || '').toLowerCase();
  
  let currentLang = lang || 'fr';
  if (/[\u0900-\u097F]/.test(clean) || clean.includes('namaste') || clean.includes('kaise') || clean.includes('dhanyavad')) {
    currentLang = 'hi';
  } else if (clean.includes('hello') || clean.includes('how are') || (clean.includes('trust points') && !clean.includes('comment')) || clean.includes('vip table') || clean.includes('event')) {
    if (!clean.includes('bonjour') && !clean.includes('merci') && !clean.includes('carré')) {
      currentLang = 'en';
    }
  }

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

  // Français par défaut
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

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { message, history = [], language = 'fr', apiKey } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message requis' });
    }

    const effectiveApiKey = apiKey || process.env.GEMINI_API_KEY;

    if (effectiveApiKey && typeof fetch === 'function') {
      try {
        const contents = [
          {
            role: 'user',
            parts: [{ text: `${AURA_SYSTEM_PROMPT}\n\nL'utilisateur s'exprime dans la langue : ${language}. Réponds avec ton style vocal court et raffiné.` }]
          },
          {
            role: 'model',
            parts: [{ text: "Compris. Je suis Aura, concise, envoûtante et toujours dans la langue de mon interlocuteur." }]
          }
        ];

        const recentHistory = Array.isArray(history) ? history.slice(-6) : [];
        for (const msg of recentHistory) {
          contents.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        }

        contents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${effectiveApiKey}`;
        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 250
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return res.status(200).json({ reply: reply.trim(), source: 'gemini' });
          }
        }
      } catch (err) {
        console.warn('Fallback local Vercel:', err.message);
      }
    }

    const reply = getLocalAuraResponse(message, language);
    return res.status(200).json({ reply, source: 'aura-local-engine' });

  } catch (error) {
    console.error('Erreur function chat:', error);
    return res.status(500).json({
      reply: "Je vous prie de m'excuser, un contretemps est survenu. Comment puis-je vous accompagner pour votre soirée ?",
      source: 'error-fallback'
    });
  }
};
