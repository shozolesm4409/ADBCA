/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['script.google.com'],
    },
    async headers() {
        return [
            {
                source: '/api/proxy',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
                ],
            },
        ];
    },
};

module.exports = nextConfig;