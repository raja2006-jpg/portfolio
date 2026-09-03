import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Serve smaller images on mobile
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Compress responses
  compress: true,
  // Reduce JS bundle size — remove React DevTools overhead in prod
  reactStrictMode: false,
  experimental: {
    // Optimize Framer Motion and other large packages
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@react-three/fiber',
      '@react-three/drei',
      '@react-three/rapier',
    ],
  },
}

export default nextConfig
