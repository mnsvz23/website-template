export default async function handler(req, res) {
  if (req.method === 'POST') {
    let body = req.body;
    // For Vercel/Netlify, body may need to be parsed
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch {}
    }
    const { bookId } = body || {};
    console.log('Ebook clicked:', bookId);
    // Here you would increment a count in your DB
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
} 