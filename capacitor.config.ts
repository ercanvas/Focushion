import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.focushion.app',
  appName: 'Focushion',
  // Next.js 'out' klasörüne export ettiğinde dosyalar buradan okunacak
  webDir: 'out', 
  server: {
    // Statik uygulamalarda sunucu URL'sine ihtiyacımız yok, 
    // uygulama cihaz içindeki dosyaları kullanacak.
    androidScheme: 'https'
  }
};

export default config;