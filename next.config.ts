import type { NextConfig } from "next";

const config: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['i.dummyjson.com', 'cdn.dummyjson.com']
  }
};

export default config;
