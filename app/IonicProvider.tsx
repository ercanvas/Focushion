'use client';

import { setupIonicReact, IonApp } from '@ionic/react';
import dynamic from 'next/dynamic'; // 1. Dinamik import modülünü ekledik

/* Ionic CSS Kuralları */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Temalar */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

setupIonicReact();

// 2. Ana bileşenimizi normal bir fonksiyon olarak tanımlıyoruz
function IonicProviderBase({ children }: { children: React.ReactNode }) {
  return <IonApp>{children}</IonApp>;
}

// 3. Bu bileşeni dışarıya "Sadece Tarayıcıda Çalıştır (ssr: false)" ayarıyla ihraç ediyoruz
export default dynamic(() => Promise.resolve(IonicProviderBase), {
  ssr: false,
});