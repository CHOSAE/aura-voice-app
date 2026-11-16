/**
 * Aura - Concierge Vocale Exclusif | Richie Rich Event
 * Voice Engine & Interactive Luxury Experience
 * Module Vocal Ultra-Naturel & Multi-Moteurs (Navigateur HD / ElevenLabs / OpenAI)
 */

// Fonction de détection robuste de la langue
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

// Moteur de connaissances et d'intelligence d'Aura
const AURA_ENGINE = {
  systemPrompt: `Tu es Aura, le concierge virtuel et l'assistant exclusif de Richie Rich Event (richierichevent.com). 20 ans d'expertise dans la création d'événements de luxe sur mesure. Programme de fidélité Trust Points. Accès VIP en club partenaire. Ton élégant, direct, chaleureux et sélectif. Pas de Web3/crypto. Réponses concises et rythmées pour la voix (2 à 4 phrases).`,

  respond(message, lang, history = []) {
    const clean = (message || '').toLowerCase();
    const currentLang = detectMessageLanguage(message, lang || 'fr');

    // 1. GARDE-FOUS DE SÉCURITÉ (LITIGES, PORTE, SÉCURITÉ)
    if (clean.includes('dispute') || clean.includes('overcharge') || clean.includes('refund') || clean.includes('charged twice') || clean.includes('billing error') || clean.includes('fraud') ||
        clean.includes('denied entry') || clean.includes('bounced') || clean.includes('bouncer') || clean.includes('door dispute') || clean.includes('refused at door') || clean.includes('not letting me in') ||
        clean.includes('safety') || clean.includes('fight') || clean.includes('harass') || clean.includes('emergency') || clean.includes('danger') || clean.includes('police') || clean.includes('injured') ||
        clean.includes('surfactur') || clean.includes('remboursement') || clean.includes('trop débité') || clean.includes('litige') || clean.includes('refoulé') || clean.includes('videur') || clean.includes('bloqué à la porte') || clean.includes('entrée refusée') || clean.includes('sécurité') || clean.includes('bagarre') || clean.includes('urgence') || clean.includes('volé') || clean.includes('agression')) {
      
      const isDoor = clean.includes('door') || clean.includes('bouncer') || clean.includes('bounced') || clean.includes('refoulé') || clean.includes('videur') || clean.includes('porte');
      const isPayment = clean.includes('charge') || clean.includes('refund') || clean.includes('bill') || clean.includes('paiement') || clean.includes('rembours');
      const reasonEn = isDoor ? 'Door entry & access dispute' : (isPayment ? 'Payment & billing dispute' : 'Venue safety & security alert');
      const reasonFr = isDoor ? "Contestation d'accès à l'entrée du club" : (isPayment ? 'Contestation de paiement & facturation' : 'Alerte sécurité & assistance immédiate');

      if (currentLang === 'en') {
        return {
          reply: "I take this situation with the utmost priority. In accordance with our VIP safety protocols, I have immediately transferred your file to our Live Human Duty Manager on duty. A senior manager is stepping in right now to assist you directly.",
          action: 'duty_manager_escalation',
          escalation: {
            title: "LIVE HUMAN DUTY MANAGER DISPATCHED",
            description: `Priority escalation for: ${reasonEn}. Senior duty management notified at partner venue.`,
            phone: "+33 1 89 00 00 00",
            whatsapp: "https://wa.me/33600000000?text=URGENT%20VIP%20DUTY%20MANAGER%20ESCALATION"
          }
        };
      } else {
        return {
          reply: "Je traite cette situation avec la plus haute priorité. Conformément à nos protocoles de sécurité VIP, je transfère immédiatement votre dossier à notre Duty Manager humain d'astreinte. Un responsable prend le relais en direct sans délai.",
          action: 'duty_manager_escalation',
          escalation: {
            title: "DUTY MANAGER HUMAIN EN DIRECT DÉPÊCHÉ",
            description: `Escalade prioritaire : ${reasonFr}. La direction d'astreinte du club partenaire est immédiatement prévenue.`,
            phone: "+33 1 89 00 00 00",
            whatsapp: "https://wa.me/33600000000?text=URGENT%20VIP%20DUTY%20MANAGER%20ESCALATION"
          }
        };
      }
    }

    // 2. EXEMPLE : FOUNDING MEMBER + TOY ROOM + 2 GUESTS
    if ((clean.includes('founding') || clean.includes('fondateur')) && (clean.includes('toy room') || clean.includes('club')) && (clean.includes('guest') || clean.includes('invit') || clean.includes('perk') || clean.includes('avantage'))) {
      if (currentLang === 'en') {
        return {
          reply: "Welcome back! As a verified Founding Member at Toy Room tonight, your tier entitles you to a €500 dedicated table credit, complimentary signature welcome champagne, priority DJ booth allocation, and zero-wait fast-track entry. I have generated your two VIP Guest QR passes below—your guests simply present them at the velvet rope.",
          action: 'guest_passes',
          passData: {
            club: "Toy Room",
            tier: "Founding Member",
            guestCount: 2,
            tableCredit: "€500 Table Credit Active",
            passes: [
              { id: "VIP-TR-F01", name: "Guest Pass 1", validUntil: "Tonight - 05:00 AM", status: "FAST-TRACK VERIFIED" },
              { id: "VIP-TR-F02", name: "Guest Pass 2", validUntil: "Tonight - 05:00 AM", status: "FAST-TRACK VERIFIED" }
            ]
          }
        };
      } else {
        return {
          reply: "Ravi de vous retrouver ! En tant que Founding Member vérifié au Toy Room ce soir, votre statut vous donne droit à 500 € de crédit de table, un magnum de champagne d'accueil, un placement prioritaire au DJ booth et un accès coupe-file immédiat. J'ai généré vos deux Pass QR invités ci-dessous : vos invités n'ont qu'à les présenter au coupe-file pour entrer sans aucune attente.",
          action: 'guest_passes',
          passData: {
            club: "Toy Room",
            tier: "Founding Member",
            guestCount: 2,
            tableCredit: "500 € de Crédit de Table Activé",
            passes: [
              { id: "VIP-TR-F01", name: "Pass Invité 1", validUntil: "Ce soir - 05:00", status: "COUPE-FILE VÉRIFIÉ" },
              { id: "VIP-TR-F02", name: "Pass Invité 2", validUntil: "Ce soir - 05:00", status: "COUPE-FILE VÉRIFIÉ" }
            ]
          }
        };
      }
    }

    // 3. DISPONIBILITÉ TABLES
    if (clean.includes('disponib') || clean.includes('availability') || clean.includes('table available') || clean.includes('reste des tables')) {
      if (currentLang === 'en') {
        return "We currently have premium table allocations available at our partner venues: Upper Dancefloor and DJ Booth tables can still be secured for tonight. What club or city are you planning to attend?";
      }
      return "Nous disposons actuellement de tables exclusives dans nos clubs partenaires : les carrés DJ Booth et Dancefloor sont encore accessibles pour ce soir. Pour quel club ou quelle ville souhaitez-vous sécuriser votre table ?";
    }

    // 4. ONBOARDING & INSCRIPTION
    if (clean.includes('onboard') || clean.includes('rejoindre') || clean.includes('become member') || clean.includes('devenir membre') || clean.includes('inscription')) {
      if (currentLang === 'en') {
        return "Membership at Richie Rich Event is selective, opening access to our three tiers: Member, Ambassador, and Founding Member. You accumulate Trust Points through presence and referrals to unlock table credits and private fast-track passes. Would you like me to initiate your membership application?";
      }
      return "L'adhésion chez Richie Rich Event repose sur trois cercles sélectifs : Membre VIP, Ambassadeur et Founding Member. Vos Trust Points accumulés débloquent des crédits de table, des pass invités et un accès coupe-file permanent. Souhaitez-vous que j'initie votre candidature dès maintenant ?";
    }

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
      if (clean.includes('richie rich') || (clean.includes('about') && clean.includes('company')) || clean.includes('history') || clean.includes('expertise')) {
        return "Richie Rich Event is an elite luxury event house with twenty years of bespoke expertise. We orchestrate legendary private celebrations, high-end nightlife experiences, and curated VIP club tables for distinguished international guests.";
      }
      if (clean.includes('who are you') || clean.includes('your name') || (clean.includes('what') && clean.includes('you do'))) {
        return "I am Aura, the exclusive virtual concierge of Richie Rich Event. For two decades, our house has unlocked priority club access and crafted unforgettable luxury celebrations worldwide. How may I assist your evening?";
      }
      if (clean.includes('price') || clean.includes('cost') || clean.includes('how much') || clean.includes('rate') || clean.includes('quote') || clean.includes('expensive')) {
        return "Every VIP table experience is tailored to your taste, whether you are heading to Paris, Dubai, or Saint-Tropez. Minimum spends vary by venue, headliner DJ, and party size. Tell me your preferred date and guest count, and our concierge will curate the finest proposal.";
      }
      if (clean.includes('dress') || clean.includes('wear') || clean.includes('outfit') || clean.includes('door') || clean.includes('shoes')) {
        return "The dress code across our partner clubs is effortlessly chic, elegant, and glamorous. Sophisticated evening attire ensures an impeccable reception and immediate fast-track entry with our ambassadors.";
      }
      if (clean.includes('book') || clean.includes('table') || clean.includes('booth') || clean.includes('bottle') || clean.includes('reserve') || clean.includes('reservation')) {
        return "Through Richie Rich Event, step directly past the ropes into prime VIP tables right beside the DJ booth. Let me know your desired city, date, and number of guests, or reach our private WhatsApp team to confirm in minutes.";
      }
      if (clean.includes('event') || clean.includes('wedding') || clean.includes('birthday') || clean.includes('private') || clean.includes('yacht') || clean.includes('villa') || clean.includes('gala')) {
        return "For over twenty years, Richie Rich Event has orchestrated breathtaking celebrations across Mediterranean yachts, private villas, and historic estates. From avant-garde scenography to booking world-class artists, we bring your vision to life.";
      }
      if (clean.includes('trust') || clean.includes('point') || clean.includes('loyalty') || clean.includes('reward') || clean.includes('benefit')) {
        return "Our Trust Points reward your presence at our events, referrals of distinguished peers, and social engagement. You can redeem them for table upgrades, priority fast-track access, and signature welcome drinks on richierichevent.com.";
      }
      if (clean.includes('refer') || clean.includes('friend') || clean.includes('invite') || clean.includes('ambassador')) {
        return "Our ambassador circle allows you to invite esteemed friends. Each approved referral instantly credits Trust Points to both accounts, unlocking fast-track passes and complimentary hospitality at our partner venues.";
      }
      if (clean.includes('where') || clean.includes('city') || clean.includes('cities') || clean.includes('location') || clean.includes('paris') || clean.includes('dubai') || clean.includes('cannes') || clean.includes('ibiza') || clean.includes('monaco')) {
        return "We curate private privileges across the world's most vibrant luxury capitals: Paris, Saint-Tropez, Cannes, Monaco, Courchevel, Dubai, Ibiza, and London. Where are you planning to celebrate next?";
      }
      if (clean.includes('music') || clean.includes('dj') || clean.includes('artist') || clean.includes('lineup') || clean.includes('genre')) {
        return "We collaborate with the world's most sought-after headliners and electronic music producers, from melodic house and techno to open-format legends. We also book custom live performers for your private celebrations.";
      }
      if (clean.includes('contact') || clean.includes('whatsapp') || clean.includes('phone') || clean.includes('call') || clean.includes('reach') || clean.includes('email')) {
        return "Our private concierge desk operates around the clock. You can connect with our team immediately via WhatsApp through the link below or by submitting your inquiry on richierichevent.com.";
      }
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
    if (clean.includes('richie rich') || (clean.includes('qui') && clean.includes('entreprise')) || clean.includes('histoire') || clean.includes('expertise')) {
      return "Richie Rich Event est une maison de haute création événementielle cumulant vingt ans d'expertise. Nous concevons des nuits de légende, des événements privés sur mesure et ouvrons l'accès aux carrés VIP les plus convoités au monde.";
    }
    if (clean.includes('prix') || clean.includes('tarif') || clean.includes('combien') || clean.includes('cout') || clean.includes('coût') || clean.includes('budget')) {
      return "Chaque expérience VIP est personnalisée selon le club, la ville et l'artiste en tête d'affiche. Indiquez-moi votre date idéale et le nombre de convives, et notre conciergerie privée vous transmettra une proposition sur mesure sous quelques instants.";
    }
    if (clean.includes('dress code') || clean.includes('tenue') || clean.includes('habiller') || clean.includes('porter') || clean.includes('vetement') || clean.includes('vêtement')) {
      return "Le dress code dans nos établissements partenaires est résolument chic, élégant et soigné. Une tenue de soirée raffinée vous assure un accueil irréprochable et un passage coupe-file immédiat aux côtés de nos ambassadeurs.";
    }
    if (clean.includes('trust') || clean.includes('point') || clean.includes('fidelite') || clean.includes('fidélité') || clean.includes('avantage') || clean.includes('recompense')) {
      return "Nos Trust Points valorisent votre fidélité à chaque venue, parrainage ou partage. Vous les convertissez en accès directs aux carrés VIP, verres d'accueil d'exception ou surclassements de table sur richierichevent.com.";
    }
    if (clean.includes('parrain') || clean.includes('parrainage') || clean.includes('inviter')) {
      return "Le parrainage est au cœur de notre cercle. En recommandant des relations d'exception, vous et vos filleuls cumulez instantanément des Trust Points pour débloquer des privilèges et accès prioritaires en club.";
    }
    if (clean.includes('vip') || clean.includes('carre') || clean.includes('carré') || clean.includes('table') || clean.includes('bouteille') || clean.includes('boite') || clean.includes('boîte') || clean.includes('coupe-file') || clean.includes('reserver') || clean.includes('réservation')) {
      return "Grâce à notre cercle de conciergerie, vous évitez toute attente et accédez directement aux tables les plus convoitées, au plus près des artistes et du DJ booth. Pour quel club ou quelle date souhaitez-vous votre réservation ?";
    }
    if (clean.includes('evenement') || clean.includes('événement') || clean.includes('mariage') || clean.includes('anniversaire') || clean.includes('soiree') || clean.includes('soirée') || clean.includes('prive') || clean.includes('privé') || clean.includes('gala') || clean.includes('yacht') || clean.includes('villa')) {
      return "Depuis vingt ans, Richie Rich Event façonne des célébrations privées d'anthologie, de la privatisation de villas et yachts d'exception jusqu'aux décors monumentaux et au booking de DJs internationaux. Racontez-moi votre projet pour donner vie à votre vision.";
    }
    if (clean.includes('ville') || clean.includes('ou') || clean.includes('où') || clean.includes('paris') || clean.includes('cannes') || clean.includes('tropez') || clean.includes('dubai') || clean.includes('monaco') || clean.includes('ibiza') || clean.includes('londres')) {
      return "Nous opérons dans les capitales et destinations les plus prisées du monde : Paris, Cannes, Saint-Tropez, Monaco, Courchevel, Dubaï, Ibiza et Londres. Dans quelle destination souhaitez-vous que j'organise vos privilèges ?";
    }
    if (clean.includes('musique') || clean.includes('dj') || clean.includes('artiste') || clean.includes('lineup') || clean.includes('style')) {
      return "Nous collaborons avec les DJs et producteurs les plus en vue de la scène internationale, de la house mélodique à l'open format d'exception. Nous orchestrons également des performances live sur mesure pour vos soirées privées.";
    }
    if (clean.includes('contact') || clean.includes('joindre') || clean.includes('telephone') || clean.includes('téléphone') || clean.includes('whatsapp') || clean.includes('equipe') || clean.includes('équipe')) {
      return "Notre conciergerie privée est joignable 24 heures sur 24 via notre WhatsApp officiel ou directement sur le formulaire de richierichevent.com. Je peux également transmettre votre demande prioritaire à notre équipe dès maintenant.";
    }
    if (clean.includes('qui es-tu') || clean.includes('qui est aura') || clean.includes('qui etes-vous') || clean.includes('tu fais quoi')) {
      return "Je suis Aura, la concierge virtuelle exclusive de Richie Rich Event. Depuis vingt ans, nous créons des événements sur mesure inoubliables et ouvrons les portes des cercles VIP les plus sélects. Quel privilège puis-je organiser pour vous aujourd'hui ?";
    }
    if (clean.includes('bonjour') || clean.includes('bonsoir') || clean.includes('salut') || clean.includes('coucou')) {
      return "Bienvenue. Je suis Aura, votre concierge exclusive chez Richie Rich Event. Comment puis-je sublimer votre soirée ou accompagner vos projets d'événements aujourd'hui ?";
    }
    if (clean.includes('merci') || clean.includes('parfait') || clean.includes('super') || clean.includes('genial') || clean.includes('top')) {
      return "C'est un véritable honneur de vous accompagner. N'hésitez pas si vous avez la moindre envie pour sublimer votre soirée ou préparer votre prochain événement.";
    }

    return "Je suis à votre entière disposition. Qu'il s'agisse de réserver une table VIP ce soir, de découvrir vos avantages Trust Points ou d'imaginer une célébration sur mesure, que puis-je orchestrer pour vous ?";
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
      { text: "Quels sont mes avantages ce soir en tant que Founding Member au Toy Room et comment inviter 2 personnes ?", label: "🎟️ Avantages Toy Room (2 Invités)" },
      { text: "Peux-tu vérifier la disponibilité des tables VIP ce soir ?", label: "🍾 Disponibilité Tables" },
      { text: "Quel est le dress code pour entrer en club partenaire ?", label: "👗 Dress Code & Tenue" },
      { text: "J'ai un problème urgent à l'entrée avec le videur", label: "🛡️ Litige Entrée / Duty Manager" }
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
      { text: "Hey Aura, what perks do I get tonight as a Founding Member at Toy Room, and how do I bring two guests?", label: "🎟️ Founding Member Perks (Toy Room)" },
      { text: "Can you check VIP table availability for tonight?", label: "🍾 Check Table Availability" },
      { text: "What is the dress code for partner clubs?", label: "👗 Dress Code Guidelines" },
      { text: "I have an urgent issue at the door with entry", label: "🛡️ Door Dispute / Duty Manager" }
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
    
    // Configurations persistées
    this.aiProvider = localStorage.getItem('aura_ai_provider') || 'smart-local';
    this.openaiChatKey = localStorage.getItem('aura_openai_chat_key') || '';
    this.apiKey = localStorage.getItem('aura_gemini_api_key') || '';
    this.speechRate = parseFloat(localStorage.getItem('aura_speech_rate') || '0.98');
    this.autoSpeak = localStorage.getItem('aura_auto_speak') !== 'false';
    this.selectedVoiceURI = localStorage.getItem('aura_selected_voice') || 'auto';
    
    // Moteur vocal par défaut : ElevenLabs (Voix humaine studio)
    this.ttsProvider = localStorage.getItem('aura_tts_provider') || 'elevenlabs';
    this.elevenLabsKey = localStorage.getItem('aura_elevenlabs_key') || 'sk_8d99786b3465153e4c9fbcbf6328152bf7ced76f6f26942e';
    this.elevenLabsVoiceId = localStorage.getItem('aura_elevenlabs_voice_id') || 'EXAVITQu4vr4xnSDxMaL'; // Sarah - Luxury VIP
    this.openaiKey = localStorage.getItem('aura_openai_key') || '';
    this.openaiVoice = localStorage.getItem('aura_openai_voice') || 'nova';

    this.memberTier = localStorage.getItem('aura_member_tier') || 'Founding Member';

    this.speechSynthesis = window.speechSynthesis;
    this.currentAudioElement = null;
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
      // Cerveau IA
      aiProviderSelect: document.getElementById('aiProviderSelect'),
      openaiAiConfig: document.getElementById('openaiAiConfig'),
      openaiChatKey: document.getElementById('openaiChatKey'),
      geminiAiConfig: document.getElementById('geminiAiConfig'),
      apiKeyInput: document.getElementById('apiKeyInput'),
      // Paramètres audio
      voiceSelect: document.getElementById('voiceSelect'),
      speechRate: document.getElementById('speechRate'),
      rateVal: document.getElementById('rateVal'),
      autoSpeakToggle: document.getElementById('autoSpeakToggle'),
      ttsProviderSelect: document.getElementById('ttsProviderSelect'),
      elevenLabsConfig: document.getElementById('elevenLabsConfig'),
      elevenLabsApiKey: document.getElementById('elevenLabsApiKey'),
      elevenLabsVoiceId: document.getElementById('elevenLabsVoiceId'),
      openaiConfig: document.getElementById('openaiConfig'),
      openaiApiKey: document.getElementById('openaiApiKey'),
      openaiVoiceSelect: document.getElementById('openaiVoiceSelect'),
      browserVoiceGroup: document.getElementById('browserVoiceGroup'),
      // Tier Membre VIP
      memberTierBadge: document.getElementById('memberTierBadge'),
      tierLabel: document.getElementById('tierLabel'),
      memberTierSelect: document.getElementById('memberTierSelect')
    };

    if (this.dom.memberTierSelect) this.dom.memberTierSelect.value = this.memberTier;
    if (this.dom.tierLabel) this.dom.tierLabel.textContent = this.memberTier;

    if (this.dom.aiProviderSelect) this.dom.aiProviderSelect.value = this.aiProvider;
    if (this.dom.openaiChatKey) this.dom.openaiChatKey.value = this.openaiChatKey;
    if (this.dom.apiKeyInput) this.dom.apiKeyInput.value = this.apiKey;

    if (this.dom.speechRate) this.dom.speechRate.value = this.speechRate;
    if (this.dom.rateVal) this.dom.rateVal.textContent = `${this.speechRate}x`;
    if (this.dom.autoSpeakToggle) this.dom.autoSpeakToggle.checked = this.autoSpeak;

    if (this.dom.ttsProviderSelect) this.dom.ttsProviderSelect.value = this.ttsProvider;
    if (this.dom.elevenLabsApiKey) this.dom.elevenLabsApiKey.value = this.elevenLabsKey;
    if (this.dom.elevenLabsVoiceId) this.dom.elevenLabsVoiceId.value = this.elevenLabsVoiceId;
    if (this.dom.openaiApiKey) this.dom.openaiApiKey.value = this.openaiKey;
    if (this.dom.openaiVoiceSelect) this.dom.openaiVoiceSelect.value = this.openaiVoice;

    this.updateProviderVisibility();
  }

  updateProviderVisibility() {
    const provider = this.dom.ttsProviderSelect ? this.dom.ttsProviderSelect.value : 'elevenlabs';
    if (this.dom.elevenLabsConfig) this.dom.elevenLabsConfig.classList.toggle('hidden', provider !== 'elevenlabs');
    if (this.dom.openaiConfig) this.dom.openaiConfig.classList.toggle('hidden', provider !== 'openai');
    if (this.dom.browserVoiceGroup) this.dom.browserVoiceGroup.classList.toggle('hidden', provider !== 'browser');

    const aiProvider = this.dom.aiProviderSelect ? this.dom.aiProviderSelect.value : 'smart-local';
    if (this.dom.openaiAiConfig) this.dom.openaiAiConfig.classList.toggle('hidden', aiProvider !== 'openai');
    if (this.dom.geminiAiConfig) this.dom.geminiAiConfig.classList.toggle('hidden', aiProvider !== 'gemini');
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
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
        console.warn('Statut micro:', event.error);
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

        this.dom.voiceSelect.innerHTML = '<option value="auto">✨ Sélection automatique de la voix la plus humaine & naturelle</option>';
        
        const sorted = [...this.availableVoices].sort((a, b) => {
          const scoreA = (a.name.includes('Natural') || a.name.includes('Neural') || a.name.includes('Google')) ? 1 : 0;
          const scoreB = (b.name.includes('Natural') || b.name.includes('Neural') || b.name.includes('Google')) ? 1 : 0;
          return scoreB - scoreA;
        });

        sorted.forEach((voice) => {
          const option = document.createElement('option');
          option.value = voice.voiceURI;
          const isHD = voice.name.includes('Natural') || voice.name.includes('Neural') || voice.name.includes('Google');
          option.textContent = `${isHD ? '💎 ' : ''}${voice.name} (${voice.lang})`;
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

    if (this.dom.memberTierBadge) {
      this.dom.memberTierBadge.addEventListener('click', () => {
        if (this.dom.settingsModal) this.dom.settingsModal.classList.remove('hidden');
      });
    }

    if (this.dom.memberTierSelect) {
      this.dom.memberTierSelect.addEventListener('change', (e) => {
        this.memberTier = e.target.value;
        if (this.dom.tierLabel) this.dom.tierLabel.textContent = this.memberTier;
        localStorage.setItem('aura_member_tier', this.memberTier);
      });
    }

    this.dom.closeSettingsBtn.addEventListener('click', () => {
      this.dom.settingsModal.classList.add('hidden');
    });

    if (this.dom.aiProviderSelect) {
      this.dom.aiProviderSelect.addEventListener('change', () => this.updateProviderVisibility());
    }

    if (this.dom.ttsProviderSelect) {
      this.dom.ttsProviderSelect.addEventListener('change', () => this.updateProviderVisibility());
    }

    this.dom.speechRate.addEventListener('input', (e) => {
      this.dom.rateVal.textContent = `${e.target.value}x`;
    });

    this.dom.saveSettingsBtn.addEventListener('click', () => {
      if (this.dom.memberTierSelect) {
        this.memberTier = this.dom.memberTierSelect.value;
        if (this.dom.tierLabel) this.dom.tierLabel.textContent = this.memberTier;
        localStorage.setItem('aura_member_tier', this.memberTier);
      }
      this.apiKey = this.dom.apiKeyInput.value.trim();
      if (this.dom.openaiChatKey) this.openaiChatKey = this.dom.openaiChatKey.value.trim();
      if (this.dom.aiProviderSelect) this.aiProvider = this.dom.aiProviderSelect.value;
      this.speechRate = parseFloat(this.dom.speechRate.value);
      this.autoSpeak = this.dom.autoSpeakToggle.checked;
      this.selectedVoiceURI = this.dom.voiceSelect.value;

      if (this.dom.ttsProviderSelect) this.ttsProvider = this.dom.ttsProviderSelect.value;
      if (this.dom.elevenLabsApiKey) this.elevenLabsKey = this.dom.elevenLabsApiKey.value.trim();
      if (this.dom.elevenLabsVoiceId) this.elevenLabsVoiceId = this.dom.elevenLabsVoiceId.value.trim() || 'EXAVITQu4vr4xnSDxMaL';
      if (this.dom.openaiApiKey) this.openaiKey = this.dom.openaiApiKey.value.trim();
      if (this.dom.openaiVoiceSelect) this.openaiVoice = this.dom.openaiVoiceSelect.value;

      localStorage.setItem('aura_ai_provider', this.aiProvider);
      localStorage.setItem('aura_openai_chat_key', this.openaiChatKey);
      localStorage.setItem('aura_gemini_api_key', this.apiKey);
      localStorage.setItem('aura_speech_rate', this.speechRate.toString());
      localStorage.setItem('aura_auto_speak', this.autoSpeak.toString());
      localStorage.setItem('aura_selected_voice', this.selectedVoiceURI);
      localStorage.setItem('aura_tts_provider', this.ttsProvider);
      localStorage.setItem('aura_elevenlabs_key', this.elevenLabsKey);
      localStorage.setItem('aura_elevenlabs_voice_id', this.elevenLabsVoiceId);
      localStorage.setItem('aura_openai_key', this.openaiKey);
      localStorage.setItem('aura_openai_voice', this.openaiVoice);

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
      this.speak(i18n.defaultGreeting, lang);
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
        console.warn('Reconnaissance active:', err);
      }
    }
  }

  async handleUserMessage(message) {
    if (!message || message.trim() === '') return;

    this.stopSpeaking();
    this.addMessageToTranscript('user', message);
    this.dom.speechLiveText.textContent = `« ${message} »`;

    // Détection automatique de la langue du message
    const detectedLang = detectMessageLanguage(message, this.currentLang);
    if (detectedLang !== this.currentLang) {
      this.setLanguage(detectedLang, false);
    }

    this.isProcessing = true;
    this.updateState('processing');

    let reply = '';

    // 1. Appel OpenAI GPT-4o-mini direct si clé OpenAI renseignée
    if (this.openaiChatKey) {
      try {
        const messages = [
          { role: 'system', content: `${AURA_ENGINE.systemPrompt}\nRéponds obligatoirement dans la langue détectée : ${detectedLang}.` }
        ];
        const recent = this.conversationHistory.slice(-6);
        for (const item of recent) {
          messages.push({ role: item.sender === 'user' ? 'user' : 'assistant', content: item.text });
        }
        messages.push({ role: 'user', content: message });

        const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.openaiChatKey}`
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
          reply = oData.choices?.[0]?.message?.content?.trim();
        }
      } catch (e) {
        console.warn('Fallback direct OpenAI Chat:', e);
      }
    }

    // 2. Clé Gemini directe si présente
    if (!reply && this.apiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;
        const res = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: `${AURA_ENGINE.systemPrompt}\nLangue requise : ${detectedLang}.\nMessage : ${message}` }] }
            ],
            generationConfig: { temperature: 0.7, maxOutputTokens: 250 }
          })
        });
        if (res.ok) {
          const gData = await res.json();
          reply = gData.candidates?.[0]?.content?.parts?.[0]?.text;
        }
      } catch (e) {
        console.warn('Fallback Gemini direct:', e);
      }
    }

    let actionData = null;

    // 3. Appel serveur Vercel /api/chat
    if (!reply) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            history: this.conversationHistory,
            language: detectedLang,
            memberTier: this.memberTier || 'Founding Member',
            apiKey: this.apiKey || undefined,
            openaiApiKey: this.openaiChatKey || undefined
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.reply) {
            reply = data.reply;
            actionData = data;
          }
        }
      } catch (err) {
        console.warn('Fallback local:', err);
      }
    }

    // 4. Moteur autonome sémantique riche
    if (!reply) {
      const fallback = AURA_ENGINE.respond(message, detectedLang, this.conversationHistory);
      if (typeof fallback === 'object' && fallback !== null) {
        reply = fallback.reply;
        actionData = fallback;
      } else {
        reply = fallback;
      }
    }

    this.isProcessing = false;
    this.addMessageToTranscript('aura', reply, actionData);
    this.dom.speechLiveText.textContent = `« ${reply} »`;

    if (this.autoSpeak) {
      this.speak(reply, detectedLang);
    } else {
      this.updateState('idle');
    }
  }

  formatForNaturalSpeech(text) {
    return text
      .replace(/richierichevent\.com/gi, 'Richie Rich Event point com')
      .replace(/20 ans/g, 'vingt ans')
      .replace(/VIP/g, 'V.I.P.')
      .replace(/[\*\_#]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  async speak(text, lang = null) {
    this.stopSpeaking();
    this.isSpeaking = true;
    this.updateState('speaking');

    const spokenText = this.formatForNaturalSpeech(text);
    const activeLang = lang || this.currentLang;

    // 1. ElevenLabs (Voix humaine ultra-réaliste activée par défaut)
    if (this.ttsProvider === 'elevenlabs') {
      const voiceId = this.elevenLabsVoiceId || 'EXAVITQu4vr4xnSDxMaL';
      
      // 1. Appel direct ultra-rapide si la clé est présente
      if (this.elevenLabsKey) {
        try {
          const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'xi-api-key': this.elevenLabsKey
            },
            body: JSON.stringify({
              text: spokenText,
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: 0.50,
                similarity_boost: 0.85,
                style: 0.25,
                use_speaker_boost: true
              }
            })
          });

          if (res.ok) {
            const blob = await res.blob();
            const audioUrl = URL.createObjectURL(blob);
            this.playAudioUrl(audioUrl);
            return;
          } else {
            console.warn('Erreur ElevenLabs direct:', await res.text());
          }
        } catch (e) {
          console.warn('Échec direct ElevenLabs:', e);
        }
      }

      // 2. Tentative via l'endpoint /api/tts si disponible
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: spokenText,
            voiceId: voiceId,
            apiKey: this.elevenLabsKey || undefined
          })
        });

        if (response.ok) {
          const blob = await response.blob();
          const audioUrl = URL.createObjectURL(blob);
          this.playAudioUrl(audioUrl);
          return;
        }
      } catch (err) {
        console.warn('Erreur /api/tts ElevenLabs:', err);
      }
    }

    // 2. OpenAI TTS (Nova / Shimmer Studio)
    if (this.ttsProvider === 'openai' && this.openaiKey) {
      try {
        const res = await fetch('https://api.openai.com/v1/audio/speech', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.openaiKey}`
          },
          body: JSON.stringify({
            model: 'tts-1',
            input: spokenText,
            voice: this.openaiVoice || 'nova',
            speed: this.speechRate
          })
        });

        if (res.ok) {
          const blob = await res.blob();
          const audioUrl = URL.createObjectURL(blob);
          this.playAudioUrl(audioUrl);
          return;
        }
      } catch (e) {
        console.warn('Fallback OpenAI vers voix native:', e);
      }
    }

    // 3. Synthèse Vocale Haute Définition du Navigateur (Optimisée avec voix Neural / Natural)
    if (!this.speechSynthesis) {
      this.isSpeaking = false;
      this.updateState('idle');
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.rate = Math.min(Math.max(this.speechRate, 0.92), 1.05);
      utterance.pitch = 1.0;

      let selectedVoice = null;
      if (this.selectedVoiceURI && this.selectedVoiceURI !== 'auto') {
        selectedVoice = this.availableVoices.find(v => v.voiceURI === this.selectedVoiceURI);
      }

      if (!selectedVoice) {
        const langPrefix = activeLang === 'hi' ? 'hi' : (activeLang === 'en' ? 'en' : 'fr');
        
        selectedVoice = this.availableVoices.find(v => 
          v.lang && v.lang.startsWith(langPrefix) && 
          (v.name.includes('Natural') || v.name.includes('Neural'))
        );

        if (!selectedVoice) {
          selectedVoice = this.availableVoices.find(v => 
            v.lang && v.lang.startsWith(langPrefix) && 
            (v.name.includes('Google') || v.name.includes('Online') || v.name.includes('Premium'))
          );
        }

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
        console.warn('Statut vocal:', e);
        this.isSpeaking = false;
        this.updateState('idle');
      };

      this.speechSynthesis.speak(utterance);

    } catch (e) {
      console.warn('Erreur speech:', e);
      this.isSpeaking = false;
      this.updateState('idle');
    }
  }

  playAudioUrl(url) {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
    }
    this.currentAudioElement = new Audio(url);
    this.currentAudioElement.onended = () => {
      this.isSpeaking = false;
      this.updateState('idle');
    };
    this.currentAudioElement.onerror = () => {
      this.isSpeaking = false;
      this.updateState('idle');
    };
    this.currentAudioElement.play().catch(e => {
      console.warn('Audio play bloqué par le navigateur:', e);
      this.isSpeaking = false;
      this.updateState('idle');
    });
  }

  stopSpeaking() {
    if (this.currentAudioElement) {
      try { this.currentAudioElement.pause(); } catch(e){}
      this.currentAudioElement = null;
    }
    if (this.speechSynthesis) {
      try { this.speechSynthesis.cancel(); } catch(e){}
    }
    this.isSpeaking = false;
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

  addMessageToTranscript(sender, text, actionData = null) {
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

    // Contenu spécifique (Pass QR ou Alerte Duty Manager)
    let extraHtml = '';
    if (actionData && actionData.action === 'guest_passes' && actionData.passData) {
      const p = actionData.passData;
      let passesHtml = '';
      p.passes.forEach(pass => {
        passesHtml += `
          <div class="vip-pass-card">
            <div class="vip-qr-box">
              <svg viewBox="0 0 100 100" fill="#000">
                <rect x="0" y="0" width="30" height="30" fill="#000"/>
                <rect x="5" y="5" width="20" height="20" fill="#fff"/>
                <rect x="10" y="10" width="10" height="10" fill="#000"/>
                <rect x="70" y="0" width="30" height="30" fill="#000"/>
                <rect x="75" y="5" width="20" height="20" fill="#fff"/>
                <rect x="80" y="10" width="10" height="10" fill="#000"/>
                <rect x="0" y="70" width="30" height="30" fill="#000"/>
                <rect x="5" y="75" width="20" height="20" fill="#fff"/>
                <rect x="10" y="80" width="10" height="10" fill="#000"/>
                <rect x="40" y="10" width="10" height="20" fill="#000"/>
                <rect x="60" y="40" width="20" height="10" fill="#000"/>
                <rect x="40" y="60" width="10" height="30" fill="#000"/>
                <rect x="70" y="70" width="20" height="20" fill="#000"/>
                <rect x="50" y="50" width="10" height="10" fill="#000"/>
              </svg>
            </div>
            <div class="vip-pass-info">
              <div class="vip-pass-header">
                <span class="vip-pass-club">${p.club}</span>
                <span class="vip-pass-badge">${pass.status}</span>
              </div>
              <div class="vip-pass-detail">${pass.name} • <strong>${p.tier}</strong></div>
              <div class="vip-pass-detail" style="color:var(--gold-light);">✨ ${p.tableCredit}</div>
              <div class="vip-pass-code">ID: ${pass.id} • ${pass.validUntil}</div>
            </div>
          </div>
        `;
      });
      extraHtml = `<div class="vip-pass-container">${passesHtml}</div>`;
    } else if (actionData && actionData.action === 'duty_manager_escalation' && actionData.escalation) {
      const esc = actionData.escalation;
      extraHtml = `
        <div class="duty-manager-alert">
          <div class="duty-header">
            <svg class="duty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span class="duty-title">${esc.title}</span>
          </div>
          <p class="duty-text">${esc.description}</p>
          <div class="duty-actions">
            <a href="tel:${esc.phone}" class="duty-btn">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/></svg>
              Appel Duty Manager d'Astreinte
            </a>
            <a href="${esc.whatsapp}" target="_blank" rel="noopener" class="duty-btn duty-btn-secondary">
              WhatsApp Sécurité Prioritaire
            </a>
          </div>
        </div>
      `;
    }

    bubble.innerHTML = `
      <span class="bubble-sender">${senderLabel}</span>
      <div class="bubble-body">
        <div style="display:flex; flex-direction:column; gap:8px; width:100%;">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
            <span>${text}</span>
            ${playBtnHtml}
          </div>
          ${extraHtml}
        </div>
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
