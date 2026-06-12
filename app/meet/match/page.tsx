'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  User,
  X,
  Users as UsersIcon,
  Clock,
  Focus,
  Compass,
} from 'lucide-react';
import Loading from '@/components/Loading';

const THEME = '#FBF4E2';
const ACCENT = '#C8A96E';

// Mock users in queue
const queueUsers = [
  { id: 1, name: 'ayse_yilmaz', avatar: 'AY', color: '#F472B6', distance: 1 },
  { id: 2, name: 'zeynep_tekin', avatar: 'ZT', color: '#60A5FA', distance: 2 },
  { id: 3, name: 'can_ozturk', avatar: 'CO', color: '#FBBF24', distance: 3 },
  { id: 4, name: 'elif_kaya', avatar: 'EK', color: '#A78BFA', distance: 4 },
  { id: 5, name: 'burak_celebi', avatar: 'BC', color: '#F87171', distance: 5 },
  { id: 6, name: 'mehmet_demir', avatar: 'MD', color: '#34D399', distance: 6 },
];

function MeetMatchPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [queueCount, setQueueCount] = useState(42);
  const [estimatedTime, setEstimatedTime] = useState(30);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isMatching, setIsMatching] = useState(true);

  const handleMatchFound = () => {
    setIsLoading(true);
    setIsMatching(false);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/meet/found');
    }, 800);
  };

  // Simulate queue countdown
  useEffect(() => {
    if (!isMatching) return;

    const interval = setInterval(() => {
      setQueueCount(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => {
            handleMatchFound();
          }, 500);
          return 0;
        }
        return prev - 1;
      });
      setEstimatedTime(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isMatching]);

  const handleCancelMatch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/meet/search');
    }, 500);
  };

  // Animate cards - rotate through queue
  useEffect(() => {
    if (!isMatching) return;

    const cardInterval = setInterval(() => {
      setCurrentCardIndex(prev => (prev + 1) % queueUsers.length);
    }, 800);

    return () => clearInterval(cardInterval);
  }, [isMatching]);

  // Get visible cards (current, next, previous)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentCardIndex + i + queueUsers.length) % queueUsers.length;
      cards.push({ ...queueUsers[index], offset: i, zIndex: 5 - Math.abs(i) });
    }
    return cards;
  };

  return (
    <IonPage>
      <Loading isLoading={isLoading} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .fr * { font-family: 'Inter', -apple-system, sans-serif !important; }
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
            background: 'linear-gradient(180deg, rgba(200,169,110,0.2) 0%, rgba(12,8,4,0.85) 45%, rgba(5,3,1,0.98) 100%)',
          }}
        />
      </div>

      <IonContent
        scrollY={false}
        style={{ '--background': 'transparent', position: 'relative', zIndex: 1 } as React.CSSProperties}
      >
        <div className="fr relative flex flex-col h-full mx-auto" style={{ maxWidth: 430 }}>

          {/* Header */}
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
                <span style={{ color: THEME, fontSize: 18, fontWeight: 700, letterSpacing: '-0.3px' }}>
                  Eşleşme aranıyor
                </span>
              </div>
              <div style={{ width: 34 }} />
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
            {/* Card Stack Animation - Centered with padding */}
            <div className="relative w-full flex justify-center mb-12">
              <div className="relative w-[260px] h-[340px]">
                <AnimatePresence>
                  {getVisibleCards().map((card) => (
                    <motion.div
                      key={`${card.id}-${card.offset}`}
                      initial={{ 
                        opacity: 0,
                        x: card.offset * 35,
                        y: Math.abs(card.offset) * 12,
                        rotateZ: card.offset * 7,
                        scale: 1 - Math.abs(card.offset) * 0.1,
                      }}
                      animate={{ 
                        opacity: 1 - Math.abs(card.offset) * 0.25,
                        x: card.offset * 35,
                        y: Math.abs(card.offset) * 12,
                        rotateZ: card.offset * 7,
                        scale: 1 - Math.abs(card.offset) * 0.1,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: card.zIndex,
                        background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}CC 100%)`,
                        borderRadius: 28,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 24,
                        boxShadow: `0 12px 32px rgba(0,0,0,0.3)`,
                      }}
                    >
                      <div
                        style={{
                          width: 90,
                          height: 90,
                          borderRadius: 90,
                          background: 'rgba(255,255,255,0.2)',
                          border: '3px solid rgba(255,255,255,0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 20,
                        }}
                      >
                        <span style={{ fontSize: 34, fontWeight: 700, color: 'white' }}>
                          {card.avatar}
                        </span>
                      </div>
                      <span style={{ color: 'white', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                        @{card.name}
                      </span>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          background: 'rgba(0,0,0,0.3)',
                          padding: '4px 12px',
                          borderRadius: 100,
                        }}
                      >
                        <UsersIcon size={12} color="rgba(255,255,255,0.7)" />
                        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>
                          Sıradaki
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Queue Info - Fixed height to prevent button movement */}
            <div style={{ 
              textAlign: 'center', 
              minHeight: 120,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <UsersIcon size={18} color={ACCENT} strokeWidth={1.5} />
                <span style={{ color: THEME, fontSize: 18, fontWeight: 700 }}>
                  {queueCount} kişi kuyrukta
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginBottom: 32,
                }}
              >
                <Clock size={16} color="rgba(251,244,226,0.5)" strokeWidth={1.5} />
                <span style={{ color: 'rgba(251,244,226,0.6)', fontSize: 14 }}>
                  Tahmini eşleşme {estimatedTime} saniye sonra
                </span>
              </div>

              {/* Cancel Button - Fixed position */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleCancelMatch}
                style={{
                  padding: '14px 32px',
                  borderRadius: 250,
                  border: '1px solid rgba(239,68,68,0.5)',
                  background: 'rgba(239,68,68,0.1)',
                  color: '#ef4444',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  backdropFilter: 'blur(10px)',
                  width: 200,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(239,68,68,0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)';
                }}
              >
                <X size={16} strokeWidth={2} />
                Eşleşmeyi iptal et
              </motion.button>
            </div>
          </div>

          {/* Bottom Navigation - Floating Glassmorphism (Same as meet/search) */}
          <div
            style={{
              position: 'fixed',
              bottom: 20,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 50,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              style={{
                pointerEvents: 'auto',
                width: 'auto',
                minWidth: 260,
                maxWidth: '90%',
              }}
            >
              <div
                style={{
                  background: 'rgba(18, 14, 12, 0.9)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  borderRadius: 250,
                  padding: '8px 20px',
                  border: '1px solid rgba(200,169,110,0.15)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                }}
              >
                <div className="flex justify-around items-center" style={{ gap: 8 }}>
                  {[
                    { icon: Focus, label: 'Odaklan', path: '/session/subject', active: false },
                    { icon: Compass, label: 'Keşfet', path: '/explore', active: false },
                    { icon: UsersIcon, label: 'Buluş', path: '/meet/search', active: true },
                    { icon: User, label: 'Profil', path: '/profile', active: false },
                  ].map((item) => {
                    const IconComponent = item.icon;
                    const isActive = item.active;
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
                          background: isActive ? `rgba(200,169,110,0.15)` : 'transparent',
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
                          color={isActive ? ACCENT : 'rgba(251,244,226,0.5)'} 
                          strokeWidth={isActive ? 2 : 1.5} 
                        />
                        <span style={{
                          fontSize: 11,
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? ACCENT : 'rgba(251,244,226,0.5)',
                        }}>
                          {item.label}
                        </span>
                        {isActive && (
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
              </div>
            </motion.div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default dynamic(() => Promise.resolve(MeetMatchPage), { ssr: false });