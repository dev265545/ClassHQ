/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  images: {
    domains: ["flowbite.s3.amazonaws.com", "res.cloudinary.com"],
  },
};
