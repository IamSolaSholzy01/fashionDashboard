/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    // apiUrl: "https://lit-cliffs-84601.herokuapp.com/api/v1"
    apiUrl: "http://localhost:3000/api/v1",
  },
};

module.exports = nextConfig;
