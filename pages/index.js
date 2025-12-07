import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/proxy')
            .then(res => res.text())
            .then(data => {
                setContent(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading form:', err);
                setContent('<div>Error loading form. Please refresh.</div>');
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Head>
                <title>Motijheel Campus - Admission Form</title>
                <meta name="description" content="Admission Form for Motijheel Campus" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container">
                {loading ? (
                    <div className="loading">Loading Admission Form...</div>
                ) : (
                    <div
                        className="form-container"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                )}
            </div>
        </>
    );
}