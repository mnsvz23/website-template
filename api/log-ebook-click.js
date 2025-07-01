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
      // Try to fetch as uuid first, if fails, try as integer
      let ebook, fetchError;
      // Try as uuid
      ({ data: ebook, error: fetchError } = await supabase
        .from('ebooks')
        .select('click_count')
        .eq('id', bookId)
        .single());
      // If uuid fails, try as integer
      if (fetchError && fetchError.code === '22P02') {
        ({ data: ebook, error: fetchError } = await supabase
          .from('ebooks')
          .select('click_count')
          .eq('id', Number(bookId))
          .single());
      }
      if (fetchError) {
        console.error('Supabase fetch error:', fetchError);
        return res.status(500).json({ success: false, error: fetchError.message });
      }
      // Increment and update
      const { error: updateError } = await supabase
        .from('ebooks')
        .update({ click_count: (ebook.click_count || 0) + 1 })
        .eq('id', fetchError && fetchError.code === '22P02' ? Number(bookId) : bookId);
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