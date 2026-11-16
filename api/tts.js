// Serverless Function Vercel pour la synthèse vocale ElevenLabs
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, xi-api-key');

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

    const { text, voiceId = '21m00Tcm4TlvDq8ikWAM', apiKey } = body || {};

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Texte requis pour la synthèse' });
    }

    const effectiveApiKey = apiKey || process.env.ELEVENLABS_API_KEY || process.env.XI_API_KEY;

    if (!effectiveApiKey) {
      return res.status(401).json({
        error: 'Clé API ElevenLabs manquante. Veuillez renseigner votre clé dans les Réglages (⚙️) ou dans les variables Vercel.'
      });
    }

    const elevenUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    const response = await fetch(elevenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': effectiveApiKey,
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.50,
          similarity_boost: 0.80,
          style: 0.25,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({
        error: 'Erreur ElevenLabs',
        details: errText
      });
    }

    const audioBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.status(200).send(Buffer.from(audioBuffer));

  } catch (error) {
    console.error('Erreur API TTS ElevenLabs:', error);
    return res.status(500).json({ error: 'Erreur interne lors de la synthèse vocale' });
  }
};
