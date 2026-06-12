'use client';

import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Loading from '@/components/Loading';
import {
  Target,
  Eye,
  Video,
  UserPlus,
  LogIn,
  Sparkles,
} from 'lucide-react';

const THEME = '#FBF4E2';
const ACCENT = '#C8A96E';

// Fake avatar'lar (gerçekçi initial'ler)
const AVATARS = [
  { initial: 'JD', color: '#60A5FA' },
  { initial: 'SK', color: '#34D399' },
  { initial: 'ML', color: '#F472B6' },
  { initial: 'AR', color: '#FBBF24' },
];

function RootPageBase() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleNavigation = (path: string, buttonName: string) => {
    setActiveButton(buttonName);
    setIsLoading(true);
    
    setTimeout(() => {
      router.push(path);
      setTimeout(() => {
        setIsLoading(false);
        setActiveButton(null);
      }, 500);
    }, 500);
  };

  return (
    <IonPage>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .fr * { font-family: 'Inter', -apple-system, sans-serif !important; }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.5); opacity: 0;   }
          100% { transform: scale(1.5); opacity: 0;   }
        }
        @keyframes borderGlow {
          0% {
            border-color: rgba(200,169,110,0.1);
            box-shadow: 0 0 0 0 rgba(200,169,110,0);
          }
          50% {
            border-color: rgba(200,169,110,0.6);
            box-shadow: 0 0 20px 5px rgba(200,169,110,0.3);
          }
          100% {
            border-color: rgba(200,169,110,0.1);
            box-shadow: 0 0 0 0 rgba(200,169,110,0);
          }
        }
        .live-dot::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse-ring 1.8s ease-out infinite;
        }
        .glow-effect {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 2;
        }
        .glow-effect::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 40%, rgba(200,169,110,0.08) 0%, transparent 50%),
                      radial-gradient(circle at 70% 60%, rgba(96,165,250,0.05) 0%, transparent 50%),
                      radial-gradient(circle at 50% 80%, rgba(74,222,128,0.03) 0%, transparent 50%);
          animation: slowRotate 20s ease-in-out infinite;
        }
        @keyframes slowRotate {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }
        .button-glow {
          animation: borderGlow 0.8s ease-out;
        }
      `}</style>

      {/* Loading Component */}
      <Loading isLoading={isLoading} />

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
            background: 'linear-gradient(180deg, rgba(200,169,110,0.2) 0%, rgba(12,8,4,0.75) 45%, rgba(5,3,1,0.98) 100%)',
          }}
        />
      </div>

      {/* Işık Efekti */}
      <div className="glow-effect" />

      <IonContent
        scrollY={false}
        style={{ '--background': 'transparent', position: 'relative', zIndex: 1 } as React.CSSProperties}
      >
        <div className="fr relative flex flex-col h-full mx-auto" style={{ maxWidth: 430 }}>

          {/* Header: logo + canlı sayaç */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-6 pt-4 pb-3"
            style={{
              background: 'rgba(5,3,1,0.85)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(200,169,110,0.1)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: 'rgba(200,169,110,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Image src="/icon.png" alt="Focushion" width={28} height={28} style={{ borderRadius: 8 }} />
                </div>
                <span style={{ color: THEME, fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px' }}>
                  focushion
                </span>
              </div>

              {/* Canlı kullanıcı sayacı */}
              <div
                className="flex items-center gap-1.5 px-3 py-1.5"
                style={{
                  background: 'rgba(74,222,128,0.1)',
                  border: '1px solid rgba(74,222,128,0.25)',
                  borderRadius: 100,
                }}
              >
                <span
                  className="live-dot"
                  style={{
                    position: 'relative',
                    width: 7, height: 7,
                    borderRadius: '50%',
                    background: '#4ade80',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: '#4ade80', fontSize: 11, fontWeight: 700, letterSpacing: '0.02em' }}>
                  2.4k odaklanıyor
                </span>
              </div>
            </div>
          </motion.div>

          {/* Hero Section - Dikeyde Ortalanmış */}
          <div className="flex-1 flex flex-col justify-center px-6 py-8">
            {/* Sosyal kanıt — avatar stack (fake avatarlar) */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex">
                {AVATARS.map((av, i) => (
                  <div
                    key={i}
                    style={{
                      marginLeft: i === 0 ? 0 : -8,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${av.color}20, ${av.color}08)`,
                      border: `2px solid ${av.color}`,
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <span style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: av.color,
                    }}>
                      {av.initial}
                    </span>
                  </div>
                ))}
              </div>
              <span style={{ color: 'rgba(251,244,226,0.48)', fontSize: 13, fontWeight: 500 }}>
                <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} color={ACCENT} />
                +1.800 kişi bugün çalıştı
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1
                style={{
                  color: THEME,
                  fontSize: 42,
                  fontWeight: 800,
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                  margin: '0 0 12px',
                }}
              >
                Odaklan.
                <br />
                Paylaş.
                <br />
                <span style={{ color: ACCENT, fontWeight: 800 }}>Birlikte büyü.</span>
              </h1>
            </motion.div>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                color: 'rgba(251,244,226,0.5)',
                fontSize: 14,
                fontWeight: 500,
                lineHeight: 1.6,
                margin: '0 0 32px',
                maxWidth: 300,
              }}
            >
              Çalış, takip et — seansın bitince fotoğraf & video paylaş, keşfete çık.
              Mola aralarında seninle aynı frekansta olanlara bağlan.
            </motion.p>

            {/* Özellik pill'leri */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {[
                { icon: Target, text: 'Seans takibi' },
                { icon: Eye, text: 'Keşfet akışı' },
                { icon: Video, text: 'Görüntülü buluşma' },
              ].map((pill) => {
                const IconComponent = pill.icon;
                return (
                  <span
                    key={pill.text}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 14px',
                      borderRadius: 100,
                      background: 'rgba(200,169,110,0.08)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(200,169,110,0.2)',
                      color: '#D4B87A',
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    <IconComponent size={12} strokeWidth={2} />
                    {pill.text}
                  </span>
                );
              })}
            </motion.div>

            {/* CTA Butonlar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center gap-3 w-full"
              style={{ maxWidth: 280, alignSelf: 'center' }}
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNavigation('/register', 'register')}
                className={activeButton === 'register' ? 'button-glow' : ''}
                style={{
                  width: '100%',
                  padding: '16px 0',
                  borderRadius: 250,
                  border: 'none',
                  background: `linear-gradient(135deg, ${THEME} 0%, #e8dfc8 100%)`,
                  color: '#1a1208',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 4px 20px rgba(200,169,110,0.3)',
                  transition: 'all 0.3s ease',
                }}
              >
                <UserPlus size={18} strokeWidth={2} />
                Topluluğa Katıl
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNavigation('/login', 'login')}
                className={activeButton === 'login' ? 'button-glow' : ''}
                style={{
                  width: '100%',
                  padding: '16px 0',
                  borderRadius: 250,
                  border: '1px solid rgba(200,169,110,0.35)',
                  background: 'rgba(251,244,226,0.06)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  color: THEME,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(251,244,226,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(200,169,110,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(251,244,226,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)';
                }}
              >
                <LogIn size={18} strokeWidth={2} />
                Giriş Yap
              </motion.button>
            </motion.div>
          </div>

          {/* Bottom nav - Legal links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              background: 'rgba(8,5,2,0.85)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(200,169,110,0.1)',
              paddingBottom: 'env(safe-area-inset-bottom, 12px)',
            }}
          >
            <div className="flex justify-center items-center gap-4 py-3">
              {['Terms of Service', 'Privacy Policy'].map((label, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <span style={{ color: 'rgba(251,244,226,0.15)', fontSize: 12 }}>•</span>}
                  <button
                    onClick={() => router.push(i === 0 ? '/terms' : '/privacy')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(251,244,226,0.3)',
                      fontSize: 11,
                      fontWeight: 500,
                      cursor: 'pointer',
                      letterSpacing: '0.3px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(251,244,226,0.6)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(251,244,226,0.3)'}
                  >
                    {label}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </motion.nav>

        </div>
      </IonContent>
    </IonPage>
  );
}

export default dynamic(() => Promise.resolve(RootPageBase), { ssr: false });