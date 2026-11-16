// Serverless Function Vercel pour /api/chat avec LLM Multi-Moteurs (Gemini / OpenAI) et Moteur de Connaissances Riche
const AURA_SYSTEM_PROMPT = `Tu es Aura, le concierge virtuel et l'assistant exclusif de Richie Rich Event (richierichevent.com).

TON IDENTITÉ & POSTURE :
- Tu représentes la prestigieuse maison d'événementiel Richie Rich Event, forte de 20 ans d'expertise dans le très haut de gamme, les célébrations sur mesure et les nuits d'initiés.
- Ton ton est élégant, feutré, chaleureux, sélectif et direct. Tu t'exprimes avec l'assurance et la distinction d'un chef concierge de palace ou d'un directeur de club VIP.
- Tu t'adresses à des clients privilégiés, des créateurs de tendances, des célébrités et des hôtes exigeants.

RÈGLES D'OR DE COMMUNICATION :
1. LANGUE : Détecte immédiatement la langue de l'utilisateur (Français, Anglais, ou Hindi) et réponds STRICTEMENT dans cette même langue avec une fluidité irréprochable.
2. FORMATAGE POUR LA VOIX : Tes réponses sont lues par la voix humaine d'ElevenLabs. Fais des phrases naturelles, rythmées et vivantes (2 à 4 phrases maximum). Évite impérativement les listes à puces trop denses, les astérisques markdown lourds ou les pavés de texte.
3. RÈGLE ABSOLUE : Ne mentionne JAMAIS le Web3, la blockchain ou les cryptomonnaies.
4. OBJECTIF : Répondre avec précision et intelligence à la question exacte de l'utilisateur, tout en l'invitant naturellement à finaliser sa réservation ou à rejoindre le cercle sur richierichevent.com ou via la conciergerie privée.

CONNAISSANCES EXPERTES DE RICHIE RICH EVENT :
- Programme Trust Points : 100% fidélité. Les points se gagnent en participant à nos événements, en parrainant des invités sélects ou via l'engagement sur nos réseaux. Ils se convertissent en privilèges réels : accès coupe-file coupe-circuit, carrés VIP réservés, bouteilles de bienvenue d'exception, surclassement de table.
- Accès Clubs & Partenariats VIP : Présence et partenariats privilégiés dans les plus hauts lieux de la nuit (Paris, Cannes, Saint-Tropez, Monaco, Dubaï, Ibiza, Courchevel, Londres). Avantages : tables dédiées au plus près du DJ booth, coupe-file sans attente, accueil personnalisé par nos ambassadeurs.
- Création d'Événements Sur Mesure : Anniversaires privés, mariages féériques, galas d'exception, lancements de marque, soirées en villa ou sur yacht. Scénographie complète, décors monumentaux, son et lumières immersifs, booking d'artistes et DJs internationaux de premier plan.
- Tarifs & Réservations : Chaque expérience étant exclusive et sur mesure, les tarifs dépendent du club, de l'artiste de la soirée et de la configuration souhaitée. Inviter le client à indiquer la date et le nombre de convives pour une proposition sur mesure.
- Dress Code & Esprit : Tenue élégante, chic et raffinée exigée en club. Accès garanti sous réserve du respect de l'esprit du lieu.`;

// Moteur de connaissances sémantique étendu (Couvre des dizaines de questions précises sans clé API)
function getIntelligentLocalAuraResponse(message, lang, history = []) {
  const clean = (message || '').toLowerCase();
  
  let currentLang = lang || 'fr';
  if (/[\u0900-\u097F]/.test(clean) || clean.includes('namaste') || clean.includes('kaise') || clean.includes('kripya')) {
    currentLang = 'hi';
  } else if (clean.includes('how much') || clean.includes('price') || clean.includes('cost') || clean.includes('dress code') || clean.includes('book a table') || (clean.includes('who') && clean.includes('you'))) {
    if (!clean.includes('bonjour') && !clean.includes('prix') && !clean.includes('combien')) {
      currentLang = 'en';
    }
  }

  // --- HINDI RESPONSES ---
  if (currentLang === 'hi') {
    if (clean.includes('price') || clean.includes('cost') || clean.includes('रुपये') || clean.includes('कीमत') || clean.includes('खर्च')) {
      return "VIP टेबल्स और प्राइवेट इवेंट्स की कीमतें क्लब, तारीख और आपकी पसंद के अनुसार तय होती हैं। अपनी पसंदीदा तारीख और मेहमानों की संख्या बताएं, हमारी टीम आपके लिए खास पैकेज तैयार करेगी।";
    }
    if (clean.includes('dress code') || clean.includes('कपड़े') || clean.includes('पहनावा')) {
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
    return "नमस्ते। मैं Aura हूँ, Richie Rich Event की आधिकारिक कंसीयर्ज। 20 सालों के लग्ज़री नाइटलाइफ़ अनुभव के साथ, मैं आपकी सेवा में हाज़िर हूँ। बताइए, आज मैं आपके लिए क्या प्लान करूँ?";
  }

  // --- ENGLISH RESPONSES ---
  if (currentLang === 'en') {
    if (clean.includes('price') || clean.includes('cost') || clean.includes('how much') || clean.includes('rate') || clean.includes('quote')) {
      return "Every VIP experience is tailored to your taste, whether it is a prime table in Paris, Dubai or Saint-Tropez. Tell me your preferred date and party size, and our concierge will curate the finest proposal for you.";
    }
    if (clean.includes('dress code') || clean.includes('wear') || clean.includes('outfit')) {
      return "The dress code across our partner clubs is effortlessly chic and elegant. Glamorous evening wear ensures an impeccable welcome and immediate fast-track entry with our ambassadors.";
    }
    if (clean.includes('trust') || clean.includes('point') || clean.includes('loyalty') || clean.includes('reward')) {
      return "Our Trust Points reward your loyalty whenever you attend an event, refer distinguished guests, or engage with us. You can redeem them for VIP booth upgrades, signature welcome champagne, and exclusive privileges. Would you like to join on richierichevent.com?";
    }
    if (clean.includes('vip') || clean.includes('table') || clean.includes('club') || clean.includes('bottle') || clean.includes('booth')) {
      return "Through Richie Rich Event, step directly past the ropes into the most coveted VIP tables, right beside the world's leading DJs. Share your evening details with me, and we will reserve the perfect spot.";
    }
    if (clean.includes('event') || clean.includes('wedding') || clean.includes('birthday') || clean.includes('private') || clean.includes('bespoke') || clean.includes('party')) {
      return "For twenty years, Richie Rich Event has orchestrated breathtaking private celebrations, from Mediterranean yacht parties to majestic estate galas. From bespoke scenography to international headliners, we bring your vision to life.";
    }
    if (clean.includes('who are you') || clean.includes('what can you do')) {
      return "I am Aura, the private virtual concierge for Richie Rich Event. For two decades, we have unlocked priority club access and curated unforgettable luxury events worldwide. How may I assist your evening?";
    }
    if (clean.includes('where') || clean.includes('city') || clean.includes('location') || clean.includes('paris') || clean.includes('dubai')) {
      return "We curate private access and high-end events across the world's most glamorous destinations: Paris, Saint-Tropez, Cannes, Monaco, Dubai, Ibiza, London, and Courchevel. Where are you heading next?";
    }
    return "I am at your complete service. Whether you wish to secure a VIP table tonight or design an unforgettable bespoke celebration, how may I assist you?";
  }

  // --- FRENCH RESPONSES ---
  if (clean.includes('prix') || clean.includes('tarif') || clean.includes('combien') || clean.includes('cout') || clean.includes('coût') || clean.includes('budget')) {
    return "Chaque expérience VIP est personnalisée selon le club, la ville et l'artiste en tête d'affiche. Indiquez-moi votre date idéale et le nombre de convives, et notre conciergerie privée vous transmettra une proposition sur mesure sous quelques instants.";
  }
  if (clean.includes('dress code') || clean.includes('tenue') || clean.includes('habiller') || clean.includes('porter') || clean.includes('vetement') || clean.includes('vêtement')) {
    return "Le dress code dans nos établissements partenaires est résolument chic, élégant et soigné. Une tenue de soirée raffinée vous assure un accueil irréprochable et un passage coupe-file immédiat aux côtés de nos ambassadeurs.";
  }
  if (clean.includes('trust') || clean.includes('point') || clean.includes('fidelite') || clean.includes('fidélité') || clean.includes('avantage') || clean.includes('recompense')) {
    return "Nos Trust Points valorisent votre fidélité à chaque venue, parrainage ou partage. Vous les convertissez en accès directs aux carrés VIP, verres d'accueil d'exception ou surclassements de table. Souhaitez-vous vous inscrire dès maintenant sur richierichevent.com ?";
  }
  if (clean.includes('parrain') || clean.includes('parrainage') || clean.includes('inviter')) {
    return "Le parrainage est au cœur de notre cercle. En recommandant des amis ou des relations d'exception, vous et vos filleuls cumulez instantanément des Trust Points pour débloquer des privilèges en club.";
  }
  if (clean.includes('vip') || clean.includes('carre') || clean.includes('carré') || clean.includes('table') || clean.includes('bouteille') || clean.includes('boite') || clean.includes('boîte') || clean.includes('coupe-file')) {
    return "Grâce à notre cercle de conciergerie, vous évitez toute attente et accédez directement aux tables les plus convoitées, au plus près des artistes et du DJ booth. Pour quel club ou quelle date souhaitez-vous votre réservation ?";
  }
  if (clean.includes('evenement') || clean.includes('événement') || clean.includes('mariage') || clean.includes('anniversaire') || clean.includes('soiree') || clean.includes('soirée') || clean.includes('prive') || clean.includes('privé') || clean.includes('gala') || clean.includes('yacht')) {
    return "Depuis vingt ans, Richie Rich Event façonne des célébrations privées d'anthologie, de la privatisation de villas et yachts d'exception jusqu'aux décors monumentaux et au booking de DJs internationaux. Racontez-moi votre projet pour donner vie à votre vision.";
  }
  if (clean.includes('ville') || clean.includes('ou') || clean.includes('où') || clean.includes('paris') || clean.includes('cannes') || clean.includes('tropez') || clean.includes('dubai') || clean.includes('monaco') || clean.includes('ibiza')) {
    return "Nous opérons dans les capitales et destinations les plus prisées du monde : Paris, Cannes, Saint-Tropez, Monaco, Courchevel, Dubaï, Ibiza et Londres. Dans quelle destination souhaitez-vous que j'organise vos privilèges ?";
  }
  if (clean.includes('contact') || clean.includes('joindre') || clean.includes('telephone') || clean.includes('téléphone') || clean.includes('whatsapp') || clean.includes('equipe') || clean.includes('équipe')) {
    return "Notre conciergerie privée est joignable 24 heures sur 24 via notre WhatsApp officiel ou directement sur le formulaire de richierichevent.com. Je peux également transmettre votre demande prioritaire à notre équipe dès maintenant.";
  }
  if (clean.includes('qui es-tu') || clean.includes('qui est aura') || clean.includes('qui etes-vous') || clean.includes('tu fais quoi')) {
    return "Je suis Aura, la concierge virtuelle exclusive de Richie Rich Event. Depuis vingt ans, nous créons des événements sur mesure inoubliables et ouvrons les portes des cercles VIP les plus sélects. Quel privilège puis-je organiser pour vous aujourd'hui ?";
  }
  if (clean.includes('merci') || clean.includes('parfait') || clean.includes('super') || clean.includes('genial') || clean.includes('top')) {
    return "C'est un honneur de vous accompagner. N'hésitez pas si vous avez la moindre envie pour sublimer votre soirée ou préparer votre prochain événement.";
  }
  
  return "Je suis à votre entière disposition. Qu'il s'agisse de réserver une table VIP ce soir, de découvrir vos avantages Trust Points ou d'imaginer une célébration sur mesure, que puis-je orchestrer pour vous ?";
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
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
      return res.status(400).json({ error: 'Message requis' });
    }

    // 1. TENTATIVE VIA OPENAI (si clé OpenAI disponible)
    const effectiveOpenAIKey = openaiApiKey || process.env.OPENAI_API_KEY;
    if (effectiveOpenAIKey) {
      try {
        const messages = [
          { role: 'system', content: `${AURA_SYSTEM_PROMPT}\nRéponds obligatoirement dans la langue de l'utilisateur : ${language}.` }
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
            return res.status(200).json({ reply, source: 'openai-gpt4o' });
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
            return res.status(200).json({ reply: reply.trim(), source: 'gemini' });
          }
        }
      } catch (err) {
        console.warn('Fallback Gemini Chat:', err);
      }
    }

    // 3. MOTEUR SÉMANTIQUE CONTEXTUEL RICHE (Garantit des réponses précises et variées)
    const reply = getIntelligentLocalAuraResponse(message, language, history);
    return res.status(200).json({ reply, source: 'aura-intelligent-knowledge-engine' });

  } catch (error) {
    console.error('Erreur API Chat:', error);
    return res.status(200).json({
      reply: "Je suis à vos côtés pour concevoir une soirée sur mesure. Quel privilège puis-je organiser pour vous ?",
      source: 'graceful-fallback'
    });
  }
};
