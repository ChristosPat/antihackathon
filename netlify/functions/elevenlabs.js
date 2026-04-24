exports.handler = async (event) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors };
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 503,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'API key not configured' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid JSON' })
    };
  }

  const { action } = body;

  try {
    if (action === 'addVoice') {
      const { audioBase64, audioType, ext, voiceName } = body;
      const buffer = Buffer.from(audioBase64, 'base64');
      const formData = new FormData();
      formData.append('name', voiceName || ('TrustyDevil_' + Date.now()));
      formData.append('description', 'AntIhackathon demo voice clone');
      formData.append('files', new Blob([buffer], { type: audioType }), `recording.${ext || 'webm'}`);

      const res = await fetch('https://api.elevenlabs.io/v1/voices/add', {
        method: 'POST',
        headers: { 'xi-api-key': apiKey },
        body: formData
      });
      const data = await res.text();
      return { statusCode: res.status, headers: { ...cors, 'Content-Type': 'application/json' }, body: data };
    }

    if (action === 'tts') {
      const { voiceId, text } = body;
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.5, similarity_boost: 0.85 }
        })
      });
      if (!res.ok) {
        return { statusCode: res.status, headers: { ...cors, 'Content-Type': 'application/json' }, body: await res.text() };
      }
      const audioBuffer = await res.arrayBuffer();
      return {
        statusCode: 200,
        headers: { ...cors, 'Content-Type': 'audio/mpeg' },
        body: Buffer.from(audioBuffer).toString('base64'),
        isBase64Encoded: true
      };
    }

    if (action === 'listVoices') {
      const res = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: { 'xi-api-key': apiKey }
      });
      const data = await res.text();
      return { statusCode: res.status, headers: { ...cors, 'Content-Type': 'application/json' }, body: data };
    }

    if (action === 'deleteVoice') {
      const { voiceId } = body;
      await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
        method: 'DELETE',
        headers: { 'xi-api-key': apiKey }
      });
      return { statusCode: 200, headers: { ...cors, 'Content-Type': 'application/json' }, body: '{}' };
    }

    return {
      statusCode: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Unknown action' })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
