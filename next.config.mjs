/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "skill-trade-next-15.vercel.app"], // Add the domain you want to allow for external images
  },
  reactStrictMode: false, // Disable StrictMode
  // eslint:{
  //   ignoreDuringBuildsx:true
  // },
};

export default nextConfig;
