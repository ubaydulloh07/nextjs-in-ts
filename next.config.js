/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.dummyjson.com", "cdn.dummyjson.com"],
  },
};

module.exports = nextConfig;
