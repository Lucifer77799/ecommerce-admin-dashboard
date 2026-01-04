/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Ensure Turbopack resolves the project root correctly
    root: __dirname,
  },
};

module.exports = nextConfig;
