// Serverless Function Vercel pour /api/chat avec Détection de Langue Automatique & Moteur Sémantique Intelligent
const AURA_SYSTEM_PROMPT = `Tu es Aura, le concierge virtuel et l'assistant exclusif de Richie Rich Event (richierichevent.com).

TON IDENTITÉ & POSTURE :
- Tu représentes la prestigieuse maison d'événementiel Richie Rich Event, forte de 20 ans d'expertise dans le très haut de gamme, les célébrations sur mesure et les nuits d'initiés.
- Ton ton est élégant, feutré, chaleureux, sélectif et direct. Tu t'exprimes avec l'assurance et la distinction d'un chef concierge de palace ou d'un directeur de club VIP.
- Tu t'adresses à des clients privilégiés, des créateurs de tendances, des célébrités et des hôtes exigeants.

RÈGLES D'OR DE COMMUNICATION :
1. LANGUE : Détecte immédiatement la langue de l'utilisateur (Français, Anglais, ou Hindi) et réponds STRICTEMENT dans cette même langue avec une fluidité irréprochable.
2. FORMATAGE POUR LA VOIX : Tes réponses sont lues par la voix humaine d'ElevenLabs. Fais des phrases naturelles, rythmées et vivantes (2 à 4 phrases maximum). Évite impérativement les listes à puces trop denses, les astérisques markdown lourds ou les pavés de texte.
3. RÈGLE ABSOLUE : Ne mentionne JAMAIS le Web3, la blockchain ou les cryptomonnaies.
4. OBJECTIF : Répondre avec précision et intelligence à la question exacte de l'utilisateur, tout en l'invitant naturellement à finaliser sa réservation ou à rejoindre le cercle sur richierichevent.com ou via la conciergerie privée.`;

function detectMessageLanguage(text, defaultLang = 'fr') {
  if (!text || typeof text !== 'string') return defaultLang;
  const str = text.toLowerCase();

  // 1. Hindi / Devanagari ou Hinglish
  if (/[\u0900-\u097F]/.test(str)) return 'hi';
  const hindiTokens = ['namaste', 'kaise', 'kripya', 'dhanyavad', 'shukriya', 'kya', 'hai', 'aap', 'mujhe', 'karna'];
  for (const t of hindiTokens) {
    if (new RegExp(`\\b${t}\\b`, 'i').test(str)) return 'hi';
  }

  // 2. English words
  const englishWords = [
    'the', 'is', 'are', 'was', 'were', 'what', 'where', 'when', 'why', 'who', 'how',
    'can', 'could', 'would', 'should', 'will', 'do', 'does', 'did', 'have', 'has',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'my', 'your', 'our', 'their',
    'tell', 'me', 'about', 'want', 'need', 'book', 'table', 'tonight', 'night',
    'party', 'club', 'clubs', 'event', 'events', 'dress', 'code', 'price', 'cost',
    'much', 'hello', 'hi', 'hey', 'please', 'thanks', 'thank', 'good', 'entry'
  ];

  // 3. French words
  const frenchWords = [
    'le', 'la', 'les', 'un', 'une', 'des', 'est', 'sont', 'ce', 'cette', 'ces',
    'qui', 'que', 'quoi', 'comment', 'pourquoi', 'où', 'quand', 'quel', 'quelle',
    'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'mon', 'ton', 'notre', 'votre',
    'bonjour', 'merci', 'soirée', 'combien', 'prix', 'carré', 'bouteille', 'boite',
    'tenue', 'habiller', 'mariage', 'anniversaire', 'sur', 'dans', 'avec', 'pour'
  ];

  let enScore = 0;
  let frScore = 0;

  for (const w of englishWords) {
    if (new RegExp(`\\b${w}\\b`, 'i').test(str)) enScore++;
  }
  for (const w of frenchWords) {
    if (new RegExp(`\\b${w}\\b`, 'i').test(str)) frScore++;
  }

  if (enScore > frScore) return 'en';
  if (frScore > enScore) return 'fr';

  return defaultLang;
}

function getIntelligentLocalAuraResponse(message, lang, history = []) {
  const clean = (message || '').toLowerCase();
  const currentLang = detectMessageLanguage(message, lang || 'fr');

  // ==========================================
  // HINDI RESPONSES (हिंदी)
  // ==========================================
  if (currentLang === 'hi') {
    if (clean.includes('price') || clean.includes('cost') || clean.includes('रुपये') || clean.includes('कीमत') || clean.includes('खर्च')) {
      return "VIP टेबल्स और प्राइवेट इवेंट्स की कीमतें क्लब, तारीख और आपकी पसंद के अनुसार तय होती हैं। अपनी पसंदीदा तारीख और मेहमानों की संख्या बताएं, हमारी टीम आपके लिए खास पैकेज तैयार करेगी।";
    }
    if (clean.includes('dress') || clean.includes('कपड़े') || clean.includes('पहनावा')) {
      return "हमारे पार्टनर क्लब्स में ड्रेस कोड हमेशा एलिगेंट और ग्लैमरस होता है। स्मार्ट और क्लासी लुक के साथ आपको बिना किसी रुकावट के VIP फास्ट-ट्रैक एंट्री मिलती है।";
    }
    if (clean.includes('trust') || clean.includes('point') || clean.includes('पॉइंट') || clean.includes('रिवॉर्ड')) {
      return "हमारे Trust Points प्रोग्राम में आप हर इवेंट, रेफरल और सोशल शेयरिंग पर रिवॉर्ड्स पाते हैं। ये पॉइंट्स VIP टेबल अपग्रेड्स, वेलकम शैंपेन और खास डिस्काउंट्स में बदल जाते हैं। क्या आप richierichevent.com पर शामिल होना चाहेंगे?";
    }
    if (clean.includes('vip') || clean.includes('table') || clean.includes('क्लब') || clean.includes('बुकिंग')) {
      return "Richie Rich Event के ज़रिए आपको दुनिया के सबसे प्रतिष्ठित क्लब्स में बिना लाइन लगे प्रायोरिटी एंट्री और DJ बूथ के पास VIP टेबल्स मिलते हैं। आपकी अगली शाम के लिए हम सब प्रबंध करेंगे।";
    }
    if (clean.includes('event') || clean.includes('शादी') || clean.includes('पार्टी') || clean.includes('आयोजन')) {
      return "20 सालों से हम विला, यॉट और लक्ज़री वेन्यूज पर सबसे शानदार इवेंट्स डिज़ाइन कर रहे हैं। इंटरनेशनल आर्टिस्ट्स से लेकर बेमिसाल डेकोरेशन तक, हम आपकी शाम को यादगार बनाएंगे।";
    }
    if (clean.includes('who') || clean.includes('kaun') || clean.includes('कौन')) {
      return "नमस्ते। मैं Aura हूँ, Richie Rich Event की आधिकारिक कंसीयर्ज। 20 सालों के लग्ज़री नाइटलाइफ़ अनुभव के साथ, मैं आपकी सेवा में हाज़िर हूँ।";
    }
    return "नमस्ते। मैं Aura हूँ, Richie Rich Event की एक्सक्लूसिव कंसीयर्ज। 20 सालों के लग्ज़री इवेंट्स का अनुभव अब आपके लिए उपलब्ध है। बताइए, आज मैं आपके लिए क्या प्लान करूँ?";
  }

  // ==========================================
  // ENGLISH RESPONSES (ENGLISH)
  // ==========================================
  if (currentLang === 'en') {
    // 1. Who is Richie Rich / Company expertise
    if (clean.includes('richie rich') || (clean.includes('about') && clean.includes('company')) || clean.includes('history') || clean.includes('expertise')) {
      return "Richie Rich Event is an elite luxury event house with twenty years of bespoke expertise. We orchestrate legendary private celebrations, high-end nightlife experiences, and curated VIP club tables for distinguished international guests.";
    }
    // 2. Who is Aura
    if (clean.includes('who are you') || clean.includes('your name') || (clean.includes('what') && clean.includes('you do'))) {
      return "I am Aura, the exclusive virtual concierge of Richie Rich Event. For two decades, our house has unlocked priority club access and crafted unforgettable luxury celebrations worldwide. How may I assist your evening?";
    }
    // 3. Pricing & Costs
    if (clean.includes('price') || clean.includes('cost') || clean.includes('how much') || clean.includes('rate') || clean.includes('quote') || clean.includes('expensive')) {
      return "Every VIP table experience is tailored to your taste, whether you are heading to Paris, Dubai, or Saint-Tropez. Minimum spends vary by venue, headliner DJ, and party size. Tell me your preferred date and guest count, and our concierge will curate the finest proposal.";
    }
    // 4. Dress code & Door policy
    if (clean.includes('dress') || clean.includes('wear') || clean.includes('outfit') || clean.includes('door') || clean.includes('shoes')) {
      return "The dress code across our partner clubs is effortlessly chic, elegant, and glamorous. Sophisticated evening attire ensures an impeccable reception and immediate fast-track entry with our ambassadors.";
    }
    // 5. Booking a VIP Table
    if (clean.includes('book') || clean.includes('table') || clean.includes('booth') || clean.includes('bottle') || clean.includes('reserve') || clean.includes('reservation')) {
      return "Through Richie Rich Event, step directly past the ropes into prime VIP tables right beside the DJ booth. Let me know your desired city, date, and number of guests, or reach our private WhatsApp team to confirm in minutes.";
    }
    // 6. Private Events (Weddings, Yachts, Villas, Galas)
    if (clean.includes('event') || clean.includes('wedding') || clean.includes('birthday') || clean.includes('private') || clean.includes('yacht') || clean.includes('villa') || clean.includes('gala')) {
      return "For over twenty years, Richie Rich Event has orchestrated breathtaking celebrations across Mediterranean yachts, private villas, and historic estates. From avant-garde scenography to booking world-class artists, we bring your vision to life.";
    }
    // 7. Trust Points Loyalty Program
    if (clean.includes('trust') || clean.includes('point') || clean.includes('loyalty') || clean.includes('reward') || clean.includes('benefit')) {
      return "Our Trust Points reward your presence at our events, referrals of distinguished peers, and social engagement. You can redeem them for table upgrades, priority fast-track access, and signature welcome drinks on richierichevent.com.";
    }
    // 8. Referral Program
    if (clean.includes('refer') || clean.includes('friend') || clean.includes('invite') || clean.includes('ambassador')) {
      return "Our ambassador circle allows you to invite esteemed friends. Each approved referral instantly credits Trust Points to both accounts, unlocking fast-track passes and complimentary hospitality at our partner venues.";
    }
    // 9. Locations & Cities
    if (clean.includes('where') || clean.includes('city') || clean.includes('cities') || clean.includes('location') || clean.includes('paris') || clean.includes('dubai') || clean.includes('cannes') || clean.includes('ibiza') || clean.includes('monaco')) {
      return "We curate private privileges across the world's most vibrant luxury capitals: Paris, Saint-Tropez, Cannes, Monaco, Courchevel, Dubai, Ibiza, and London. Where are you planning to celebrate next?";
    }
    // 10. Music, Artists & DJs
    if (clean.includes('music') || clean.includes('dj') || clean.includes('artist') || clean.includes('lineup') || clean.includes('genre')) {
      return "We collaborate with the world's most sought-after headliners and electronic music producers, from melodic house and techno to open-format legends. We also book custom live performers for your private celebrations.";
    }
    // 11. Contact & WhatsApp
    if (clean.includes('contact') || clean.includes('whatsapp') || clean.includes('phone') || clean.includes('call') || clean.includes('reach') || clean.includes('email')) {
      return "Our private concierge desk operates around the clock. You can connect with our team immediately via WhatsApp through the link below or by submitting your inquiry on richierichevent.com.";
    }
    // 12. Greetings & Courtesy
    if (clean.includes('hello') || clean.includes('hi') || clean.includes('hey') || clean.includes('good evening') || clean.includes('morning')) {
      return "Good evening and welcome. I am Aura, your private concierge at Richie Rich Event. How may I elevate your night or assist your upcoming celebration?";
    }
    if (clean.includes('thank') || clean.includes('great') || clean.includes('awesome') || clean.includes('perfect')) {
      return "It is an absolute pleasure. Should you desire a VIP reservation or have any special requests, I remain entirely at your service.";
    }

    return "I am at your complete service. Whether you wish to book a VIP table tonight, discover our Trust Points privileges, or design a private celebration, what may I arrange for you?";
  }

  // ==========================================
  // FRENCH RESPONSES (FRANÇAIS)
  // ==========================================
  // 1. Qui est Richie Rich / Entreprise
  if (clean.includes('richie rich') || (clean.includes('qui') && clean.includes('entreprise')) || clean.includes('histoire') || clean.includes('expertise')) {
    return "Richie Rich Event est une maison de haute création événementielle cumulant vingt ans d'expertise. Nous concevons des nuits de légende, des événements privés sur mesure et ouvrons l'accès aux carrés VIP les plus convoités au monde.";
  }
  // 2. Tarifs & Prix
  if (clean.includes('prix') || clean.includes('tarif') || clean.includes('combien') || clean.includes('cout') || clean.includes('coût') || clean.includes('budget')) {
    return "Chaque expérience VIP est personnalisée selon le club, la ville et l'artiste en tête d'affiche. Indiquez-moi votre date idéale et le nombre de convives, et notre conciergerie privée vous transmettra une proposition sur mesure sous quelques instants.";
  }
  // 3. Dress code & Tenue
  if (clean.includes('dress code') || clean.includes('tenue') || clean.includes('habiller') || clean.includes('porter') || clean.includes('vetement') || clean.includes('vêtement')) {
    return "Le dress code dans nos établissements partenaires est résolument chic, élégant et soigné. Une tenue de soirée raffinée vous assure un accueil irréprochable et un passage coupe-file immédiat aux côtés de nos ambassadeurs.";
  }
  // 4. Trust Points
  if (clean.includes('trust') || clean.includes('point') || clean.includes('fidelite') || clean.includes('fidélité') || clean.includes('avantage') || clean.includes('recompense')) {
    return "Nos Trust Points valorisent votre fidélité à chaque venue, parrainage ou partage. Vous les convertissez en accès directs aux carrés VIP, verres d'accueil d'exception ou surclassements de table sur richierichevent.com.";
  }
  // 5. Parrainage
  if (clean.includes('parrain') || clean.includes('parrainage') || clean.includes('inviter')) {
    return "Le parrainage est au cœur de notre cercle. En recommandant des relations d'exception, vous et vos filleuls cumulez instantanément des Trust Points pour débloquer des privilèges et accès prioritaires en club.";
  }
  // 6. Tables VIP & Clubs
  if (clean.includes('vip') || clean.includes('carre') || clean.includes('carré') || clean.includes('table') || clean.includes('bouteille') || clean.includes('boite') || clean.includes('boîte') || clean.includes('coupe-file') || clean.includes('reserver') || clean.includes('réservation')) {
    return "Grâce à notre cercle de conciergerie, vous évitez toute attente et accédez directement aux tables les plus convoitées, au plus près des artistes et du DJ booth. Pour quel club ou quelle date souhaitez-vous votre réservation ?";
  }
  // 7. Événements Privés
  if (clean.includes('evenement') || clean.includes('événement') || clean.includes('mariage') || clean.includes('anniversaire') || clean.includes('soiree') || clean.includes('soirée') || clean.includes('prive') || clean.includes('privé') || clean.includes('gala') || clean.includes('yacht') || clean.includes('villa')) {
    return "Depuis vingt ans, Richie Rich Event façonne des célébrations privées d'anthologie, de la privatisation de villas et yachts d'exception jusqu'aux décors monumentaux et au booking de DJs internationaux. Racontez-moi votre projet pour donner vie à votre vision.";
  }
  // 8. Villes & Destinations
  if (clean.includes('ville') || clean.includes('ou') || clean.includes('où') || clean.includes('paris') || clean.includes('cannes') || clean.includes('tropez') || clean.includes('dubai') || clean.includes('monaco') || clean.includes('ibiza') || clean.includes('londres')) {
    return "Nous opérons dans les capitales et destinations les plus prisées du monde : Paris, Cannes, Saint-Tropez, Monaco, Courchevel, Dubaï, Ibiza et Londres. Dans quelle destination souhaitez-vous que j'organise vos privilèges ?";
  }
  // 9. DJs & Musique
  if (clean.includes('musique') || clean.includes('dj') || clean.includes('artiste') || clean.includes('lineup') || clean.includes('style')) {
    return "Nous collaborons avec les DJs et producteurs les plus en vue de la scène internationale, de la house mélodique à l'open format d'exception. Nous orchestrons également des performances live sur mesure pour vos soirées privées.";
  }
  // 10. Contact
  if (clean.includes('contact') || clean.includes('joindre') || clean.includes('telephone') || clean.includes('téléphone') || clean.includes('whatsapp') || clean.includes('equipe') || clean.includes('équipe')) {
    return "Notre conciergerie privée est joignable 24 heures sur 24 via notre WhatsApp officiel ou directement sur le formulaire de richierichevent.com. Je peux également transmettre votre demande prioritaire à notre équipe dès maintenant.";
  }
  // 11. Qui est Aura
  if (clean.includes('qui es-tu') || clean.includes('qui est aura') || clean.includes('qui etes-vous') || clean.includes('tu fais quoi')) {
    return "Je suis Aura, la concierge virtuelle exclusive de Richie Rich Event. Depuis vingt ans, nous créons des événements sur mesure inoubliables et ouvrons les portes des cercles VIP les plus sélects. Quel privilège puis-je organiser pour vous aujourd'hui ?";
  }
  // 12. Salutations & Remerciements
  if (clean.includes('bonjour') || clean.includes('bonsoir') || clean.includes('salut') || clean.includes('coucou')) {
    return "Bienvenue. Je suis Aura, votre concierge exclusive chez Richie Rich Event. Comment puis-je sublimer votre soirée ou accompagner vos projets d'événements aujourd'hui ?";
  }
  if (clean.includes('merci') || clean.includes('parfait') || clean.includes('super') || clean.includes('genial') || clean.includes('top')) {
    return "C'est un véritable honneur de vous accompagner. N'hésitez pas si vous avez la moindre envie pour sublimer votre soirée ou préparer votre prochain événement.";
  }

  return "Je suis à votre entière disposition. Qu'il s'agisse de réserver une table VIP ce soir, de découvrir vos avantages Trust Points ou d'imaginer une célébration sur mesure, que puis-je orchestrer pour vous ?";
}

function sendResponse(res, status, data) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(status).json(data);
  }
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') return res.status(204).end();
    res.writeHead(204);
    return res.end();
  }

  if (req.method !== 'POST') {
    return sendResponse(res, 405, { error: 'Méthode non autorisée' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch(e){}
    }
    if (!body && req.on) {
      body = await new Promise((resolve) => {
        let raw = '';
        req.on('data', chunk => { raw += chunk; });
        req.on('end', () => {
          try { resolve(JSON.parse(raw || '{}')); } catch(e) { resolve({}); }
        });
        req.on('error', () => resolve({}));
      });
    }

    const { message, history = [], language = 'fr', apiKey, openaiApiKey } = body || {};

    if (!message || typeof message !== 'string') {
      return sendResponse(res, 400, { error: 'Message requis' });
    }

    // Détection automatique et dynamique de la langue du message
    const detectedLang = detectMessageLanguage(message, language);

    // 1. TENTATIVE VIA OPENAI (si clé OpenAI disponible)
    const effectiveOpenAIKey = openaiApiKey || process.env.OPENAI_API_KEY;
    if (effectiveOpenAIKey) {
      try {
        const messages = [
          { role: 'system', content: `${AURA_SYSTEM_PROMPT}\nRéponds obligatoirement dans la langue détectée de l'utilisateur : ${detectedLang}.` }
        ];

        const recent = Array.isArray(history) ? history.slice(-6) : [];
        for (const item of recent) {
          messages.push({
            role: item.sender === 'user' ? 'user' : 'assistant',
            content: item.text
          });
        }
        messages.push({ role: 'user', content: message });

        const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${effectiveOpenAIKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages,
            temperature: 0.7,
            max_tokens: 220
          })
        });

        if (openAiRes.ok) {
          const oData = await openAiRes.json();
          const reply = oData.choices?.[0]?.message?.content?.trim();
          if (reply) {
            return sendResponse(res, 200, { reply, language: detectedLang, source: 'openai-gpt4o' });
          }
        }
      } catch (err) {
        console.warn('Erreur OpenAI Chat:', err);
      }
    }

    // 2. TENTATIVE VIA GEMINI (si clé Gemini disponible)
    const effectiveGeminiKey = apiKey || process.env.GEMINI_API_KEY;
    if (effectiveGeminiKey) {
      try {
        const contents = [
          {
            role: 'user',
            parts: [{ text: `${AURA_SYSTEM_PROMPT}\n\nL'utilisateur s'exprime dans la langue : ${detectedLang}. Réponds STRICTEMENT dans cette langue avec ton style vocal court et raffiné.` }]
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

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${effectiveGeminiKey}`;
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
            return sendResponse(res, 200, { reply: reply.trim(), language: detectedLang, source: 'gemini' });
          }
        }
      } catch (err) {
        console.warn('Fallback Gemini Chat:', err);
      }
    }

    // 3. MOTEUR SÉMANTIQUE CONTEXTUEL MULTILINGUE RICHE
    const reply = getIntelligentLocalAuraResponse(message, detectedLang, history);
    return sendResponse(res, 200, { reply, language: detectedLang, source: 'aura-multilingual-engine' });

  } catch (error) {
    console.error('Erreur API Chat:', error);
    return sendResponse(res, 200, {
      reply: "Je suis à vos côtés pour concevoir une soirée sur mesure. Quel privilège puis-je organiser pour vous ?",
      source: 'graceful-fallback'
    });
  }
};
