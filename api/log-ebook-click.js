import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://axygfmjqwqjioypcqdmo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4eWdmbWpxd3FqaW95cGNxZG1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzODE1MzksImV4cCI6MjA2Njk1NzUzOX0.hyo42u0L9cV5EWMTvstQxJQfHFq2Ry0U-16_DBaspJc'
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let body = req.body;
    // For Vercel/Netlify, body may need to be parsed
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch {}
    }
    const { bookId } = body || {};
    console.log('Ebook clicked:', bookId);
    // Increment click count in Supabase
    if (bookId) {
      const { data, error } = await supabase
        .from('ebooks')
        .update({ click_count: supabase.rpc('increment', { x: 1 }) })
        .eq('id', bookId);
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ success: false, error: error.message });
      }
    }
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
} 