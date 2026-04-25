exports.handler = async (event) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors };
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return {
      statusCode: 503,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Supabase not configured' })
    };
  }

  const supabaseHeaders = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
  };

  /* ── GET: επιστρέφει top 20 σκορ ── */
  if (event.httpMethod === 'GET') {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/scores?select=name,score,total,percentage,created_at&order=percentage.desc,score.desc&limit=20`,
      { headers: supabaseHeaders }
    );
    const data = await res.text();
    return {
      statusCode: res.status,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: data
    };
  }

  /* ── POST: αποθηκεύει νέο σκορ ── */
  if (event.httpMethod === 'POST') {
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

    const { name, score, total } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 30) {
      return {
        statusCode: 400,
        headers: { ...cors, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid name' })
      };
    }

    if (typeof score !== 'number' || typeof total !== 'number' ||
        score < 0 || total < 1 || total > 24 || score > total) {
      return {
        statusCode: 400,
        headers: { ...cors, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid score' })
      };
    }

    const percentage = Math.round((score / total) * 100);

    const res = await fetch(`${SUPABASE_URL}/rest/v1/scores`, {
      method: 'POST',
      headers: { ...supabaseHeaders, 'Prefer': 'return=minimal' },
      body: JSON.stringify({ name: name.trim(), score, total, percentage })
    });

    if (!res.ok) {
      const err = await res.text();
      return {
        statusCode: res.status,
        headers: { ...cors, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: err })
      };
    }

    return {
      statusCode: 201,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true })
    };
  }

  return {
    statusCode: 405,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};
