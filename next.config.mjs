/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "example.com",
      "d1l07mcd18xic4.cloudfront.net",
      "images.cdn.kukufm.com",
    ],
  },
};

export default nextConfig;
