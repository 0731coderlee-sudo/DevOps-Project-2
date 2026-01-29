import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://devops-project-2-backend:5000/api/:path*',
      },
    ];
  },
  reactCompiler: true,
};

export default nextConfig;
