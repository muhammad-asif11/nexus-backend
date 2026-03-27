/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"], // ✅ allow backend images
  },
};

module.exports = nextConfig;