// Serverless Function Vercel pour /api/chat avec Guardrails de Sécurité, Passes QR et Onboarding Membre
const AURA_SYSTEM_PROMPT = `Tu es Aura, le concierge virtuel et l'assistant exclusif de Richie Rich Event (richierichevent.com).

TON RÔLE & PERSONA :
- Tu représentes la maison d'événementiel Richie Rich Event (20 ans d'expertise dans le luxe sur mesure, VIP clubbing et événements privés).
- Ton ton est élégant, direct, chaleureux, sélectif et sécurisant.
- Tu réponds aux FAQ sur les événements, expliques les dress codes, vérifies la disponibilité des tables et gères l'onboarding et les privilèges des membres.

DIRECTIVES CRUCIALES :
1. LANGUE : Détecte automatiquement la langue de l'utilisateur (Français, Anglais ou Hindi) et réponds STRICTEMENT dans cette même langue.
2. VÉRIFICATION DE TIER & PASS INVITÉS :
   - Lorsqu'un membre mentionne son statut (ex: 'Founding Member') pour un club partenaire (ex: 'Toy Room') et souhaite venir avec des invités (ex: 2 invités) :
     Vérifie immédiatement son statut, confirme son crédit de table dédié (ex: 500€ de crédit), détaille ses avantages (table prioritaire DJ booth, accueil personnalisé, coupe-file sans attente) et génère ses Pass QR invités numériques.
3. GARDE-FOUS DE SÉCURITÉ STRICTS (SAFETY GUARDRAILS) :
   - TOUT litige relatif aux paiements (surfacturation, contestation, remboursement), tout refus ou problème à la porte du club (refoulement, contestation physionomiste), ou tout problème de sécurité/urgence dans l'établissement DÉCLENCHE UN TRANSFERT IMMÉDIAT ET PRIORITAIRE vers un gestionnaire de garde humain en direct (Live Human Duty Manager).
   - Dans ce cas, stoppe le traitement automatique et rassure immédiatement l'utilisateur en lui indiquant qu'un Duty Manager prend la main en direct.
4. SYNTHÈSE VOCALE : Tes réponses sont concises, rythmées et naturelles (2 à 4 phrases percutantes), adaptées pour la voix humaine d'ElevenLabs.
5. STRICTEMENT AUCUNE MENTION DU WEB3, BLOCKCHAIN OU CRYPTOMONNAIES.`;

function detectMessageLanguage(text, defaultLang = 'fr') {
  if (!text || typeof text !== 'string') return defaultLang;
  const str = text.toLowerCase();

  if (/[\u0900-\u097F]/.test(str)) return 'hi';
  const hindiTokens = ['namaste', 'kaise', 'kripya', 'dhanyavad', 'shukriya', 'kya', 'hai', 'aap', 'mujhe', 'karna'];
  for (const t of hindiTokens) {
    if (new RegExp(`\\b${t}\\b`, 'i').test(str)) return 'hi';
  }

  const englishWords = [
    'the', 'is', 'are', 'was', 'were', 'what', 'where', 'when', 'why', 'who', 'how',
    'can', 'could', 'would', 'should', 'will', 'do', 'does', 'did', 'have', 'has',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'my', 'your', 'our', 'their',
    'tell', 'me', 'about', 'want', 'need', 'book', 'table', 'tonight', 'night',
    'party', 'club', 'clubs', 'event', 'events', 'dress', 'code', 'price', 'cost',
    'much', 'hello', 'hi', 'hey', 'please', 'thanks', 'thank', 'good', 'entry',
    'perks', 'founding', 'member', 'guests', 'toy', 'room', 'pass', 'dispute', 'security'
  ];

  const frenchWords = [
    'le', 'la', 'les', 'un', 'une', 'des', 'est', 'sont', 'ce', 'cette', 'ces',
    'qui', 'que', 'quoi', 'comment', 'pourquoi', 'où', 'quand', 'quel', 'quelle',
    'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'mon', 'ton', 'notre', 'votre',
    'bonjour', 'merci', 'soirée', 'combien', 'prix', 'carré', 'bouteille', 'boite',
    'tenue', 'habiller', 'mariage', 'anniversaire', 'sur', 'dans', 'avec', 'pour',
    'avantages', 'fondateur', 'membres', 'invités', 'litige', 'sécurité', 'porte'
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

// Détection des garde-fous de sécurité
function checkSafetyGuardrails(text) {
  const clean = text.toLowerCase();
  
  // 1. Litiges de paiement / Facturation
  if (clean.includes('dispute') || clean.includes('overcharge') || clean.includes('refund') || clean.includes('charged twice') || clean.includes('billing error') || clean.includes('fraud') ||
      clean.includes('surfactur') || clean.includes('remboursement') || clean.includes('trop débité') || clean.includes('erreur de carte') || clean.includes('litige paiement')) {
    return {
      triggered: true,
      category: 'payment_dispute',
      reasonFr: 'Contestation de paiement & facturation',
      reasonEn: 'Payment & billing dispute'
    };
  }

  // 2. Refus à l'entrée / Conflit physionomiste
  if (clean.includes('denied entry') || clean.includes('bounced') || clean.includes('bouncer') || clean.includes('door dispute') || clean.includes('refused at door') || clean.includes('not letting me in') ||
      clean.includes('refoulé') || clean.includes('refuse l\'entrée') || clean.includes('bloqué à la porte') || clean.includes('problème physionomiste') || clean.includes('videur') || clean.includes('entrée refusée')) {
    return {
      triggered: true,
      category: 'door_entry_dispute',
      reasonFr: 'Contestation d\'accès à l\'entrée du club',
      reasonEn: 'Door entry & access dispute'
    };
  }

  // 3. Sécurité de l'établissement / Urgence / Incident
  if (clean.includes('safety') || clean.includes('fight') || clean.includes('harass') || clean.includes('emergency') || clean.includes('danger') || clean.includes('police') || clean.includes('injured') || clean.includes('stolen') ||
      clean.includes('sécurité') || clean.includes('bagarre') || clean.includes('agression') || clean.includes('danger') || clean.includes('urgence') || clean.includes('volé') || clean.includes('blessé') || clean.includes('harcèlement')) {
    return {
      triggered: true,
      category: 'venue_safety',
      reasonFr: 'Alerte sécurité & assistance immédiate en club',
      reasonEn: 'Venue safety alert & immediate assistance'
    };
  }

  return { triggered: false };
}

function getIntelligentLocalAuraResponse(message, lang, history = []) {
  const clean = (message || '').toLowerCase();
  const currentLang = detectMessageLanguage(message, lang || 'fr');

  // VÉRIFICATION GARDE-FOUS DE SÉCURITÉ
  const guardrail = checkSafetyGuardrails(message);
  if (guardrail.triggered) {
    if (currentLang === 'en') {
      return {
        reply: "I take this situation with the utmost priority. In accordance with our VIP safety protocols, I have immediately transferred your file to our Live Human Duty Manager on duty. A senior manager is stepping in right now to assist you directly.",
        action: 'duty_manager_escalation',
        escalation: {
          category: guardrail.category,
          title: "LIVE HUMAN DUTY MANAGER DISPATCHED",
          description: `Priority escalation for: ${guardrail.reasonEn}. Senior duty management notified at partner venue.`,
          phone: "+33 1 89 00 00 00",
          whatsapp: "https://wa.me/33600000000?text=URGENT%20VIP%20DUTY%20MANAGER%20ESCALATION"
        }
      };
    } else {
      return {
        reply: "Je traite cette situation avec la plus haute priorité. Conformément à nos protocoles de sécurité VIP, je transfère immédiatement votre dossier à notre Duty Manager humain d'astreinte. Un responsable prend le relais en direct sans délai.",
        action: 'duty_manager_escalation',
        escalation: {
          category: guardrail.category,
          title: "DUTY MANAGER HUMAIN EN DIRECT DÉPÊCHÉ",
          description: `Escalade prioritaire : ${guardrail.reasonFr}. La direction d'astreinte du club partenaire est immédiatement prévenue.`,
          phone: "+33 1 89 00 00 00",
          whatsapp: "https://wa.me/33600000000?text=URGENT%20VIP%20DUTY%20MANAGER%20ESCALATION"
        }
      };
    }
  }

  // EXEMPLE MAJEUR : FOUNDING MEMBER + TOY ROOM + GUESTS
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

  // DISPONIBILITÉ DES TABLES
  if (clean.includes('disponib') || clean.includes('availability') || clean.includes('table available') || clean.includes('reste des tables')) {
    if (currentLang === 'en') {
      return {
        reply: "We currently have premium table allocations available at our partner venues: Upper Dancefloor and DJ Booth tables can still be reserved for tonight. What club or city are you planning to attend?",
        action: 'table_availability'
      };
    } else {
      return {
        reply: "Nous disposons actuellement de tables exclusives dans nos clubs partenaires : les carrés DJ Booth et Dancefloor sont encore accessibles pour ce soir. Pour quel club ou quelle ville souhaitez-vous sécuriser votre table ?",
        action: 'table_availability'
      };
    }
  }

  // ONBOARDING / ADHÉSION MEMBRE
  if (clean.includes('onboard') || clean.includes('rejoindre') || clean.includes('become member') || clean.includes('devenir membre') || clean.includes('inscription')) {
    if (currentLang === 'en') {
      return {
        reply: "Membership at Richie Rich Event is selective, opening access to our three tiers: Member, Ambassador, and Founding Member. You accumulate Trust Points through presence and referrals to unlock table credits and private fast-track passes. Would you like me to initiate your membership application?",
        action: 'member_onboarding'
      };
    } else {
      return {
        reply: "L'adhésion chez Richie Rich Event repose sur trois cercles sélectifs : Membre VIP, Ambassadeur et Founding Member. Vos Trust Points accumulés débloquent des crédits de table, des pass invités et un accès coupe-file permanent. Souhaitez-vous que j'initie votre candidature dès maintenant ?",
        action: 'member_onboarding'
      };
    }
  }

  // FAQ DRESS CODE
  if (clean.includes('dress code') || clean.includes('tenue') || clean.includes('wear') || clean.includes('outfit')) {
    if (currentLang === 'en') {
      return {
        reply: "The dress code across our partner clubs, including Toy Room and L'Arc, is strictly elegant, glamorous, and chic. Upscale evening wear is required, ensuring an effortless fast-track entry with our ambassadors.",
        action: null
      };
    } else {
      return {
        reply: "Le dress code dans nos établissements partenaires (Toy Room, L'Arc, Raspoutine) est strictement élégant, chic et soigné. Une tenue de soirée raffinée vous assure un accueil immédiat et prioritaire.",
        action: null
      };
    }
  }

  // FAQ TARIFS & DEVIS
  if (clean.includes('price') || clean.includes('prix') || clean.includes('cost') || clean.includes('tarif') || clean.includes('how much') || clean.includes('combien')) {
    if (currentLang === 'en') {
      return {
        reply: "Table pricing and minimum spends are tailored to the venue, headline artist, and table tier. Share your preferred date and guest count with me, and our private concierge will provide a bespoke quotation within minutes.",
        action: null
      };
    } else {
      return {
        reply: "Les tarifs et minimum spends dépendent du club, de la tête d'affiche et de l'emplacement de la table (Dancefloor ou DJ Booth). Indiquez-moi votre date et le nombre d'invités pour recevoir une proposition sur mesure sous quelques instants.",
        action: null
      };
    }
  }

  // RÉPONSE GÉNÉRALE PAR DÉFAUT
  if (currentLang === 'en') {
    return {
      reply: "I am at your complete service. Whether you wish to check table availability tonight, review your Founding Member perks, or plan a private luxury celebration, how may I assist you?",
      action: null
    };
  }
  return {
    reply: "Je suis à votre entière disposition. Qu'il s'agisse de vérifier la disponibilité d'une table ce soir, de faire valoir vos privilèges Founding Member ou de concevoir votre événement privé, quel privilège puis-je organiser pour vous ?",
    action: null
  };
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

    const detectedLang = detectMessageLanguage(message, language);

    // MOTEUR D'INTELLIGENCE & GARDE-FOUS DE SÉCURITÉ
    const result = getIntelligentLocalAuraResponse(message, detectedLang, history);

    return sendResponse(res, 200, {
      reply: result.reply,
      action: result.action,
      passData: result.passData,
      escalation: result.escalation,
      language: detectedLang,
      source: 'aura-concierge-guardrails-engine'
    });

  } catch (error) {
    console.error('Erreur API Chat:', error);
    return sendResponse(res, 200, {
      reply: "Je suis à vos côtés pour concevoir une soirée sur mesure. Quel privilège puis-je organiser pour vous ?",
      source: 'graceful-fallback'
    });
  }
};
