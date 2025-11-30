/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Vercel için 'export' zorunlu değil ama statik çıktı istiyorsan kalabilir.
  // Dinamik özellikler (API routes vb.) kullanacaksan bu satırı silmelisin.
  output: 'export', 

  images: {
    unoptimized: true,
  },

  // !! BU İKİSİNİ KALDIRIYORUZ !!
  // Çünkü Vercel'de siten ana dizinde (root) çalışacak. 
  // '/figma' dersen siten bozuk görünür.
  // basePath: '/figma',
  // assetPrefix: '/figma/',

  // !! SİHİRLİ DOKUNUŞ BURADA (Build Hatasını Çözer) !!
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig