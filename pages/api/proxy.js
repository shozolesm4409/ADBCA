export default async function handler(req, res) {
    try {
        const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwr7iZvXRuOVQfM0NtE-KordP2yFy21L3Qf6N57g-uIrgaZaBIWEv3KLrkzex1VAOqw/exec';

        const response = await fetch(googleScriptUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Vercel Proxy)',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();

        // কনটেন্ট-টাইপ সেট করো (Google Script HTML)
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=300'); // ৫ মিনিট ক্যাশ
        res.status(200).send(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).send('<div style="color: red; padding: 20px;">Error loading data from Google Script. Please try again later.</div>');
    }
}