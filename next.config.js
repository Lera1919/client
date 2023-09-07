/** @type {import('next').NextConfig} */


module.exports = nextConfig = {
    images: {
        remotePatterns: [
            {

                protocol: 'https',
                hostname: 'instagram.lern.dev',
                port: '',
                pathname: 'storage/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                
            },
        ],
    },
}
