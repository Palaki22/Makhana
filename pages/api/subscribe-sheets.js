export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    const resp = await fetch(process.env.SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!resp.ok) throw new Error('Google Sheets error');
    return res.status(201).json({ message: 'Added to Google Sheets' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to connect to Sheets' });
  }
}
