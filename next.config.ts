import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Geliştirme yaparken (npm run dev) bunu yorum satırına al:
  output: 'export', 
  
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  // Turbopack ve Dev Indicator hatalarını susturmak için en uyumlu yapı
  turbopack: {},
  allowedDevOrigins: ['192.168.1.102'],
};

export default nextConfig;