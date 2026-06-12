'use client';

import React, { useState, useEffect, useRef } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Mic, MicOff, Camera, CameraOff,
  BatteryFull, BatteryLow,
  User, Focus, Compass, Users
} from 'lucide-react';
import Loading from '@/components/Loading';
import Wait from '@/components/Wait';

import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';

const THEME = '#FBF4E2';
const ACCENT = '#C8A96E';

const currentUser = { name: 'mehmet_demir', avatar: 'MD', color: '#34D399' };

// Bileşen dışında sabit — her render'da yeniden oluşturulmaz
const requiredCredits = 2500;
const userCredits = 1800; // Gerçek uygulamada store/API'den alınacak

function MeetSearchPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(100);

  // useState başlangıç değeri olarak hesapla — useEffect'e gerek yok
  const [showWait, setShowWait] = useState(() => userCredits < requiredCredits);

  // Kamera kutusunun DOM referansı — konumu hesaplamak için
  const cameraBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initData = async () => {
      const battery = await Device.getBatteryInfo();
      setBatteryLevel(Math.round((battery.batteryLevel ?? 1) * 100));
      // networkStatus kullanılmadığından Network.getStatus() çağrısı kaldırıldı.
      // İleride gerekirse: const status = await Network.getStatus();
    };

    const startCamera = async () => {
      // DOM render tamamlanana kadar bekle
      await new Promise(resolve => setTimeout(resolve, 300));

      if (!cameraBoxRef.current) return;

      // Native layer'ı HTML elementinin tam konumuna hizala
      const rect = cameraBoxRef.current.getBoundingClientRect();

      const cameraPreviewOptions: CameraPreviewOptions = {
        position: 'front',
        x: Math.round(rect.left),
        y: Math.round(rect.top),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        toBack: true,
      };

      await CameraPreview.start(cameraPreviewOptions);
    };

    initData();

    // Sadece kredi yeterliyse kamerayı başlat
    if (userCredits >= requiredCredits) {
      startCamera();
    }

    return () => {
      CameraPreview.stop();
    };
  }, []);

  // Kamera aç/kapat toggle
  const handleToggleCamera = async () => {
    if (isCameraOn) {
      await CameraPreview.stop();
    } else {
      if (!cameraBoxRef.current) return;
      const rect = cameraBoxRef.current.getBoundingClientRect();
      await CameraPreview.start({
        position: 'front',
        x: Math.round(rect.left),
        y: Math.round(rect.top),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        toBack: true,
      });
    }
    setIsCameraOn(prev => !prev);
  };

  const handleStartSearch = () => {
    setIsLoading(true);
    setTimeout(() => router.push('/meet/match'), 800);
  };

  const navItems = [
    { icon: Focus,   label: 'Odaklan', path: '/session/subject', active: false },
    { icon: Compass, label: 'Keşfet',  path: '/explore',         active: false },
    { icon: Users,   label: 'Buluş',   path: '/meet/search',     active: true  },
    { icon: User,    label: 'Profil',  path: '/profile',         active: false },
  ];

  return (
    <IonPage>
      <Loading isLoading={isLoading} />

      {/* Wait Component - Credit kontrolü için */}
      <Wait
        isOpen={showWait}
        currentCredits={userCredits}
        requiredCredits={requiredCredits}
        onClose={() => setShowWait(false)}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .fr * { font-family: 'Inter', -apple-system, sans-serif !important; }
        @keyframes pulse-ring {
          0%  { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(1.5); opacity: 0; }
        }
        .camera-pulse::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 32px;
          background: linear-gradient(135deg, ${ACCENT}40, ${ACCENT}10);
          animation: pulse-ring 2s ease-out infinite;
          pointer-events: none;
        }
      `}</style>

      {/* Arka plan */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <Image
          src="/bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          style={{ filter: 'brightness(0.35) saturate(0.9)' }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(200,169,110,0.2) 0%, rgba(12,8,4,0.85) 45%, rgba(5,3,1,0.98) 100%)',
          }}
        />
      </div>

      <IonContent
        scrollY={false}
        style={{ '--background': 'transparent', position: 'relative', zIndex: 1 } as React.CSSProperties}
      >
        <div className="fr flex flex-col h-full mx-auto" style={{ maxWidth: 430 }}>

          {/* Header */}
          <div
            className="px-6 pt-4 pb-3 border-b border-white/10"
            style={{ background: 'rgba(5,3,1,0.85)', backdropFilter: 'blur(20px)' }}
          >
            <span style={{ color: THEME, fontSize: 18, fontWeight: 700 }}>
              Görüntülü buluşma
            </span>
          </div>

          {/* Ana İçerik */}
          <div className="flex-1 flex flex-col items-center justify-center px-6">

            {/* Kamera Kutusu */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="relative w-full"
              style={{ maxWidth: 300 }}
            >
              <div className="camera-pulse relative">
                <div
                  ref={cameraBoxRef}
                  style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    borderRadius: 28,
                    background: isCameraOn ? 'transparent' : '#1a1a2e',
                    border: `2px solid ${ACCENT}40`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Kamera kapalıyken ikon göster */}
                  {!isCameraOn && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                      }}
                    >
                      <CameraOff size={40} color="rgba(255,255,255,0.3)" />
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                        Kamera kapalı
                      </span>
                    </div>
                  )}

                  {/* Kullanıcı etiketi — her zaman görünür */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 16,
                      left: 16,
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'rgba(0,0,0,0.55)',
                      backdropFilter: 'blur(8px)',
                      padding: '6px 12px',
                      borderRadius: 100,
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                        background: currentUser.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#000' }}>
                        {currentUser.avatar}
                      </span>
                    </div>
                    <span style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>
                      @{currentUser.name}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Kontrol Butonları */}
            <div className="mt-8 flex gap-4 items-center">
              <button
                onClick={() => setIsMicOn(prev => !prev)}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 52,
                  background: isMicOn ? 'rgba(255,255,255,0.1)' : 'rgba(239,68,68,0.2)',
                  border: `1px solid ${isMicOn ? 'rgba(255,255,255,0.15)' : 'rgba(239,68,68,0.4)'}`,
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {isMicOn
                  ? <Mic size={20} color={ACCENT} />
                  : <MicOff size={20} color="#ef4444" />
                }
              </button>

              <button
                onClick={handleToggleCamera}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 52,
                  background: isCameraOn ? 'rgba(255,255,255,0.1)' : 'rgba(239,68,68,0.2)',
                  border: `1px solid ${isCameraOn ? 'rgba(255,255,255,0.15)' : 'rgba(239,68,68,0.4)'}`,
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {isCameraOn
                  ? <Camera size={20} color={ACCENT} />
                  : <CameraOff size={20} color="#ef4444" />
                }
              </button>

              {/* Pil göstergesi */}
              <div
                style={{
                  height: 52,
                  padding: '0 16px',
                  borderRadius: 52,
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {batteryLevel > 20
                  ? <BatteryFull size={20} color="#4ade80" />
                  : <BatteryLow size={20} color="#ef4444" />
                }
                <span style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>
                  {batteryLevel}%
                </span>
              </div>
            </div>

            {/* Başlat Butonu */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleStartSearch}
              style={{
                marginTop: 32,
                width: '100%',
                maxWidth: 250,
                padding: '16px 0',
                borderRadius: 250,
                border: 'none',
                background: `linear-gradient(135deg, ${ACCENT} 0%, #b8925a 100%)`,
                color: '#1a1208',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '-0.2px',
              }}
            >
              Her şey yolunda
            </motion.button>
          </div>

          {/* Bottom Navigation */}
          <div
            style={{
              position: 'fixed',
              bottom: 20,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 50,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ pointerEvents: 'auto', minWidth: 260, maxWidth: '90%' }}
            >
              <div
                style={{
                  background: 'rgba(18,14,12,0.9)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  borderRadius: 250,
                  padding: '8px 20px',
                  border: '1px solid rgba(200,169,110,0.15)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                  display: 'flex',
                  gap: 8,
                }}
              >
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.button
                      key={item.label}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push(item.path)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                        background: item.active ? 'rgba(200,169,110,0.15)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px 16px',
                        borderRadius: 250,
                        transition: 'all 0.2s ease',
                        position: 'relative',
                      }}
                    >
                      <IconComponent
                        size={20}
                        color={item.active ? ACCENT : 'rgba(251,244,226,0.5)'}
                        strokeWidth={item.active ? 2 : 1.5}
                      />
                      <span style={{
                        fontSize: 11,
                        fontWeight: item.active ? 600 : 500,
                        color: item.active ? ACCENT : 'rgba(251,244,226,0.5)',
                      }}>
                        {item.label}
                      </span>
                      {item.active && (
                        <motion.div
                          layoutId="activeTab"
                          style={{
                            position: 'absolute',
                            bottom: -2,
                            width: 24,
                            height: 2,
                            borderRadius: 2,
                            background: ACCENT,
                          }}
                          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
}

export default dynamic(() => Promise.resolve(MeetSearchPage), { ssr: false });