import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://axygfmjqwqjioypcqdmo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4eWdmbWpxd3FqaW95cGNxZG1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzODE1MzksImV4cCI6MjA2Njk1NzUzOX0.hyo42u0L9cV5EWMTvstQxJQfHFq2Ry0U-16_DBaspJc'
);

function isUUID(str) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

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
      let ebook, fetchError;
      let queryId = bookId;
      if (!isUUID(bookId)) {
        queryId = Number(bookId);
      }
      ({ data: ebook, error: fetchError } = await supabase
        .from('ebooks')
        .select('click_count')
        .eq('id', queryId)
        .single());
      if (fetchError) {
        console.error('Supabase fetch error:', fetchError);
        return res.status(500).json({ success: false, error: fetchError.message });
      }
      // Increment and update
      const { error: updateError } = await supabase
        .from('ebooks')
        .update({ click_count: (ebook.click_count || 0) + 1 })
        .eq('id', queryId);
      if (updateError) {
        console.error('Supabase update error:', updateError);
        return res.status(500).json({ success: false, error: updateError.message });
      }
    }
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
} 