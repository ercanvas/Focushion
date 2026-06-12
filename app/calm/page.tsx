'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  User,
  Focus,
  Compass,
  Users,
  Heart,
  Brain,
  Quote,
  BookOpen,
  Sparkles,
  Zap,
  Network,
  MessageCircle,
  Leaf,
  Wind,
  Droplets,
  Trees,
  Bird,
  Sun,
  Activity,
} from 'lucide-react';

const THEME = '#FBF4E2';
const ACCENT = '#C8A96E';

const quotes = [
  { text: 'Sessizlik, gerçek bilgeliğin başladığı yerdir. Zihnini sustur, evreni duy.', author: 'Lao Tzu', source: 'Tao Te Ching' },
  { text: 'Bir ağaç gibi ol: Köklerin toprağa, dalların gökyüzüne uzansın. Ama her zaman dengeyi koru.', author: 'Bilge Atasözü', source: 'Doğa Felsefesi' },
  { text: 'Odaklanma, bir nehir gibi akar. Onu zorlama, sadece akışına izin ver.', author: 'Zen Öğretisi', source: 'Farkındalık' },
  { text: 'Zihin bir bahçedir. Hangi tohumu ekiyorsan, o çiçek açar.', author: 'Budist Atasözü', source: 'Bilinçli Yaşam' },
];

const fellowshipMembers = [
  { id: 1, name: 'Dr. Ayşe Yılmaz', role: 'Nörobilim Uzmanı', avatar: 'AY', color: '#60A5FA', expertise: 'Odaklanma Teknikleri', bio: '10 yıldır beyin ve odaklanma üzerine çalışıyor.' },
  { id: 2, name: 'Prof. Mehmet Demir', role: 'Verimlilik Koçu', avatar: 'MD', color: '#34D399', expertise: 'Zaman Yönetimi', bio: 'Binlerce kişiye odaklanma sanatını öğretti.' },
  { id: 3, name: 'Zeynep Tekin', role: 'Kıdemli Geliştirici', avatar: 'ZT', color: '#F472B6', expertise: 'Teknik Mentorluk', bio: 'Teknoloji dünyasında 15 yıllık deneyim.' },
  { id: 4, name: 'Can Öztürk', role: 'Startup Kurucusu', avatar: 'CO', color: '#FBBF24', expertise: 'Girişimcilik', bio: '3 başarılı girişimin kurucusu.' },
];

const failureStories = [
  { id: 1, name: 'Steve Jobs', story: "30 yaşında kurduğu şirketten kovuldu. Bu onun için bir son değil, yeniden doğuştu. Daha sonra Apple'a geri dönerek dünyanın en değerli şirketini kurdu.", lesson: 'Reddedilmek bir başlangıçtır, asla son değil.', color: '#60A5FA', delay: 0 },
  { id: 2, name: 'J.K. Rowling', story: '12 yayınevi tarafından reddedilen Harry Potter, bugün milyarlarca dolarlık bir evren yarattı. Her hayır, sana daha doğru bir evet hazırlar.', lesson: 'Başarısızlık, başarının temel taşıdır.', color: '#34D399', delay: 0.3 },
  { id: 3, name: 'Elon Musk', story: 'SpaceX ilk 3 roket denemesi başarısız oldu, tüm yatırımını kaybetti. 4. denemede başardı ve uzay tarihini değiştirdi.', lesson: 'Her başarısızlık, bir sonraki başarıya giden yolda bir adımdır.', color: '#F472B6', delay: 0.6 },
];

const calmWords = [
  { word: 'Nefes al...', delay: 0, icon: Wind },
  { word: 'Sakin ol...', delay: 0.4, icon: Leaf },
  { word: 'Akışa bırak...', delay: 0.8, icon: Droplets },
  { word: 'Topraklan...', delay: 1.2, icon: Trees },
  { word: 'Huzuru hisset...', delay: 1.6, icon: Bird },
  { word: 'Yalnız değilsin...', delay: 2.0, icon: Sun },
];

// FIX 1: Math.random render dışına alındı — bileşen mount olurken bir kez hesaplanır
const LEAF_DATA = [...Array(15)].map((_, i) => ({
  left: Math.random() * 280,
  rotate: Math.random() * 360,
  delay: i * 0.5,
}));

type TabId = 'fellowship' | 'stories' | 'science';

function CalmPage() {
  const router = useRouter();
  const [showForestAnimation, setShowForestAnimation] = useState(true);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'exhale' | 'hold'>('inhale');
  const [activeTab, setActiveTab] = useState<TabId>('fellowship');
  const [pageLoaded, setPageLoaded] = useState(false);
  // FIX 4: selectedMember kaldırıldı (kullanılmıyordu)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForestAnimation(false);
      setPageLoaded(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!pageLoaded) return;
    const interval = setInterval(() => {
      setCurrentQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [pageLoaded]);

  useEffect(() => {
    if (!showBreathing) return;
    const phases: ('inhale' | 'hold' | 'exhale')[] = ['inhale', 'hold', 'exhale'];
    let phaseIndex = 0;
    const interval = setInterval(() => {
      phaseIndex = (phaseIndex + 1) % phases.length;
      setBreathingPhase(phases[phaseIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, [showBreathing]);

  useEffect(() => {
    if (!pageLoaded) return;
    const timer = setTimeout(() => setShowBreathing(true), 2000);
    return () => clearTimeout(timer);
  }, [pageLoaded]);

  const navItems = [
    { icon: Focus, label: 'Odaklan', path: '/session/subject', active: false },
    { icon: Compass, label: 'Keşfet', path: '/explore', active: false },
    { icon: Users, label: 'Buluş', path: '/meet/search', active: false },
    { icon: User, label: 'Profil', path: '/profile', active: false },
  ];

  if (showForestAnimation) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: '#0a1a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
        }}
      >
        <div className="forest-container">
          <style>{`
            @keyframes treeGrow {
              0% { transform: scaleY(0); opacity: 0; }
              100% { transform: scaleY(1); opacity: 1; }
            }
            @keyframes leafFall {
              0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
              20% { opacity: 1; }
              100% { transform: translateY(200px) rotate(360deg); opacity: 0; }
            }
            @keyframes birdFly {
              0% { transform: translateX(-100px); opacity: 0; }
              20% { opacity: 1; }
              80% { opacity: 1; }
              100% { transform: translateX(100px); opacity: 0; }
            }
            @keyframes sunRise {
              0% { transform: scale(0.5); opacity: 0; }
              100% { transform: scale(1); opacity: 0.8; }
            }
            @keyframes fadeIn { to { opacity: 1; } }
            .tree { animation: treeGrow 1.5s ease-out forwards; transform-origin: bottom; }
            .leaf { position: absolute; animation: leafFall 3s ease-in infinite; }
            .bird { animation: birdFly 4s ease-in-out infinite; }
            .sun { animation: sunRise 2s ease-out forwards; }
          `}</style>

          <svg width="300" height="300" viewBox="0 0 300 300" style={{ margin: '0 auto' }}>
            <circle cx="150" cy="80" r="40" fill="#FFD700" opacity="0" className="sun" />
            {[50, 100, 150, 200, 250].map((x, i) => (
              <g key={i} className="tree" style={{ animationDelay: `${i * 0.3}s` }}>
                <rect x={x - 8} y={120} width="16" height="120" fill="#5D4037" rx="4" />
                <circle cx={x} cy={110} r="30" fill="#2E7D32" />
                <circle cx={x - 15} cy={120} r="20" fill="#388E3C" />
                <circle cx={x + 15} cy={120} r="20" fill="#388E3C" />
                <circle cx={x} cy={95} r="22" fill="#43A047" />
              </g>
            ))}

            {/* FIX 1: Math.random render dışında (LEAF_DATA sabit) */}
            {LEAF_DATA.map((leaf, i) => (
              <g
                key={`leaf-${i}`}
                className="leaf"
                style={{ animationDelay: `${leaf.delay}s`, transform: `translate(${leaf.left}px, 100px)` }}
              >
                <ellipse cx="0" cy="0" rx="6" ry="3" fill="#66BB6A" transform={`rotate(${leaf.rotate})`} />
              </g>
            ))}

            <g className="bird" style={{ animationDelay: '1s' }}>
              <path d="M0,0 Q10,-10 20,0 Q30,-10 40,0" fill="none" stroke="#37474F" strokeWidth="2" />
            </g>
            <g className="bird" style={{ animationDelay: '2s' }}>
              <path d="M0,0 Q10,-10 20,0 Q30,-10 40,0" fill="none" stroke="#37474F" strokeWidth="2" />
            </g>
          </svg>

          <p style={{
            color: THEME, fontSize: 18, fontWeight: 500, marginTop: 32,
            textAlign: 'center', opacity: 0,
            animation: 'fadeIn 1s ease-out 2s forwards',
          }}>
            <Leaf size={20} style={{ display: 'inline', marginRight: 8, color: '#66BB6A' }} />
            Ormanın sessizliğine hoş geldin...
          </p>
        </div>
      </div>
    );
  }

  return (
    <IonPage>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .fr * { font-family: 'Inter', -apple-system, sans-serif !important; }
        @keyframes breathe {
          0% { transform: scale(1); opacity: 0.4; box-shadow: 0 0 0 0 ${ACCENT}40; }
          50% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 0 20px ${ACCENT}20; }
          100% { transform: scale(1); opacity: 0.4; box-shadow: 0 0 0 0 ${ACCENT}40; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes gentlePulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInSlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .breathing-circle { animation: breathe 6s ease-in-out infinite; }
        .floating { animation: float 4s ease-in-out infinite; }
        .gentle-pulse { animation: gentlePulse 3s ease-in-out infinite; }
        .slide-up { animation: slideUp 0.8s ease-out forwards; }
        .fade-in-slow { animation: fadeInSlow 1.5s ease-out forwards; }
      `}</style>

      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <Image
          src="/bg.jpg" alt="" fill className="object-cover object-center"
          style={{ filter: 'brightness(0.4) saturate(0.8) blur(2px)' }} priority
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(30,40,20,0.6) 0%, rgba(10,20,5,0.85) 45%, rgba(5,10,3,0.98) 100%)',
        }} />
      </div>

      <IonContent
        scrollY={true}
        style={{ '--background': 'transparent', position: 'relative', zIndex: 1 } as React.CSSProperties}
      >
        <div className="fr relative flex flex-col min-h-full mx-auto pb-32" style={{ maxWidth: 480 }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="sticky top-0 z-10 px-6 pt-4 pb-3"
            style={{
              background: 'rgba(10,15,8,0.85)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(200,169,110,0.08)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="gentle-pulse" style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(200,169,110,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Image src="/icon.png" alt="Focushion" width={28} height={28} style={{ borderRadius: 8 }} />
                </div>
                <div>
                  <span style={{ color: THEME, fontSize: 18, fontWeight: 600, letterSpacing: '-0.3px' }}>Sakinlik</span>
                  <p style={{ color: 'rgba(251,244,226,0.35)', fontSize: 11, margin: 0 }}>İç huzur ve topluluk</p>
                </div>
              </div>
              <div className="gentle-pulse">
                <Heart size={18} color="#4ade80" strokeWidth={1.5} style={{ opacity: 0.5 }} />
              </div>
            </div>
          </motion.div>

          {/* Nefes Bölümü */}
          <div className="px-6 py-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative slide-up"
              style={{
                background: 'rgba(20,25,12,0.5)',
                backdropFilter: 'blur(40px)',
                borderRadius: 48,
                padding: '40px 28px',
                border: '1px solid rgba(200,169,110,0.12)',
                textAlign: 'center',
              }}
            >
              {!showBreathing ? (
                <>
                  <div className="floating" style={{ marginBottom: 24 }}>
                    <div style={{
                      width: 80, height: 80, borderRadius: 80,
                      background: `radial-gradient(circle, ${ACCENT}20, ${ACCENT}05)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto',
                    }}>
                      <Leaf size={44} color={ACCENT} strokeWidth={1.2} />
                    </div>
                  </div>
                  <h2 style={{ color: THEME, fontSize: 22, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.3px' }}>
                    Hoş geldin, yol arkadaşım.
                  </h2>
                  <p style={{ color: 'rgba(251,244,226,0.5)', fontSize: 14, lineHeight: 1.6, maxWidth: 280, margin: '0 auto' }}>
                    Zihnini sustur, nefesini hisset.<br />Birlikte daha güçlüyüz.
                  </p>
                </>
              ) : (
                <div className="fade-in-slow">
                  <div className="breathing-circle" style={{
                    width: 120, height: 120, borderRadius: 120,
                    background: `radial-gradient(circle, ${ACCENT}25, ${ACCENT}05)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                    border: `1px solid ${ACCENT}30`,
                  }}>
                    {breathingPhase === 'inhale' && <Wind size={48} color={ACCENT} strokeWidth={1.2} />}
                    {breathingPhase === 'hold' && <Leaf size={48} color={ACCENT} strokeWidth={1.2} />}
                    {breathingPhase === 'exhale' && <Droplets size={48} color={ACCENT} strokeWidth={1.2} />}
                  </div>
                  <h2 style={{ color: ACCENT, fontSize: 20, fontWeight: 500, marginBottom: 8, letterSpacing: '1px' }}>
                    {breathingPhase === 'inhale' && 'Nefes Al'}
                    {breathingPhase === 'hold' && 'Tut'}
                    {breathingPhase === 'exhale' && 'Nefes Ver'}
                  </h2>
                  <p style={{ color: 'rgba(251,244,226,0.4)', fontSize: 13, marginBottom: 28 }}>
                    {breathingPhase === 'inhale' && '5 saniye boyunca içinize çekin'}
                    {breathingPhase === 'hold' && '5 saniye boyunca nefesinizi tutun'}
                    {breathingPhase === 'exhale' && '5 saniye boyunca verin'}
                  </p>
                  <div style={{ marginTop: 8 }}>
                    {/* FIX 5: idx kaldırıldı, key olarak item.word kullanıldı */}
                    {calmWords.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.div
                          key={item.word}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: item.delay + 0.5 }}
                          style={{
                            display: 'inline-block',
                            margin: '6px 8px',
                            padding: '6px 16px',
                            background: 'rgba(200,169,110,0.06)',
                            borderRadius: 250,
                            fontSize: 12,
                            color: 'rgba(251,244,226,0.6)',
                          }}
                        >
                          <IconComponent size={12} style={{ display: 'inline', marginRight: 6 }} />
                          {item.word}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Alıntı */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className="px-6 mb-8"
            >
              <div style={{
                background: 'rgba(96,165,250,0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: 28,
                padding: '24px',
                border: '1px solid rgba(96,165,250,0.12)',
              }}>
                <Quote size={20} color="#60A5FA" strokeWidth={1.2} style={{ marginBottom: 12, opacity: 0.5 }} />
                {/* FIX 2: Tırnak işaretleri JSX entity ile kaçırıldı */}
                <p style={{ color: THEME, fontSize: 15, fontWeight: 500, lineHeight: 1.6, fontStyle: 'italic' }}>
                  &ldquo;{quotes[currentQuoteIndex].text}&rdquo;
                </p>
                <div style={{ marginTop: 12 }}>
                  <span style={{ color: '#60A5FA', fontSize: 12, fontWeight: 500 }}>
                    {quotes[currentQuoteIndex].author}
                  </span>
                  <span style={{ color: 'rgba(251,244,226,0.3)', fontSize: 11, marginLeft: 8 }}>
                    {quotes[currentQuoteIndex].source}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Tabs */}
          <div className="px-6 mb-6">
            <div style={{
              display: 'flex', gap: 6,
              background: 'rgba(15,20,10,0.5)',
              borderRadius: 250, padding: 4,
            }}>
              {([
                { id: 'fellowship' as TabId, label: 'Fellowship', icon: Network },
                { id: 'stories' as TabId, label: 'Hikayeler', icon: BookOpen },
                { id: 'science' as TabId, label: 'Bilim', icon: Brain },
              ]).map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    whileTap={{ scale: 0.98 }}
                    // FIX 3: any yerine TabId tipi kullanıldı
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      flex: 1, padding: '10px 12px', borderRadius: 250, border: 'none',
                      background: isActive ? 'rgba(200,169,110,0.12)' : 'transparent',
                      color: isActive ? ACCENT : 'rgba(251,244,226,0.4)',
                      fontSize: 12, fontWeight: 500, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <IconComponent size={14} strokeWidth={1.2} />
                    {tab.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Fellowship */}
          {activeTab === 'fellowship' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="px-6 mb-6">
              <div style={{
                background: 'rgba(15,20,10,0.4)', backdropFilter: 'blur(20px)',
                borderRadius: 28, padding: '24px',
                border: '1px solid rgba(200,169,110,0.08)', marginBottom: 20,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <Network size={22} color={ACCENT} strokeWidth={1.2} />
                  <div>
                    <h3 style={{ color: THEME, fontSize: 17, fontWeight: 600, margin: 0 }}>Gölge Mentor Ağı</h3>
                    <p style={{ color: 'rgba(251,244,226,0.4)', fontSize: 12, margin: 0 }}>Takip etme, bağlan.</p>
                  </div>
                </div>
                <p style={{ color: 'rgba(251,244,226,0.5)', fontSize: 13, lineHeight: 1.6 }}>
                  Herkesin bir gölge mentoru var. Sana ilham verecek, yolunu aydınlatacak kişilerle tanış.
                </p>
              </div>

              {fellowshipMembers.map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 16px',
                    background: 'rgba(20,25,12,0.3)',
                    borderRadius: 24, border: '1px solid rgba(200,169,110,0.06)',
                    marginBottom: 12, cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  whileHover={{ background: 'rgba(30,35,20,0.5)' }}
                >
                  <div style={{
                    width: 50, height: 50, borderRadius: 50,
                    background: `${member.color}15`, border: `1.5px solid ${member.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 18, fontWeight: 600, color: member.color }}>{member.avatar}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: THEME, fontSize: 14, fontWeight: 600, margin: 0 }}>{member.name}</p>
                    <p style={{ color: member.color, fontSize: 11, fontWeight: 500, margin: 0 }}>{member.role}</p>
                  </div>
                  <MessageCircle size={16} color="rgba(251,244,226,0.3)" strokeWidth={1.2} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Hikayeler */}
          {activeTab === 'stories' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="px-6 mb-6">
              <div style={{
                background: 'rgba(15,20,10,0.4)', backdropFilter: 'blur(20px)',
                borderRadius: 28, padding: '24px',
                border: '1px solid rgba(200,169,110,0.08)', marginBottom: 20,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <BookOpen size={22} color={ACCENT} strokeWidth={1.2} />
                  <div>
                    <h3 style={{ color: THEME, fontSize: 17, fontWeight: 600, margin: 0 }}>Reddedilme Hikayeleri</h3>
                    <p style={{ color: 'rgba(251,244,226,0.4)', fontSize: 12, margin: 0 }}>Her başarısızlık bir öğretmendir</p>
                  </div>
                </div>
              </div>

              {failureStories.map((story) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: story.delay, duration: 0.5 }}
                  style={{
                    padding: '18px',
                    background: 'rgba(20,25,12,0.3)',
                    borderRadius: 24, border: `1px solid ${story.color}20`,
                    marginBottom: 14,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 38,
                      background: `${story.color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: story.color }}>{story.name.charAt(0)}</span>
                    </div>
                    <span style={{ color: THEME, fontSize: 14, fontWeight: 600 }}>{story.name}</span>
                  </div>
                  <p style={{ color: 'rgba(251,244,226,0.65)', fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>
                    {story.story}
                  </p>
                  {/* FIX 2: " → &ldquo; &rdquo; */}
                  <p style={{ color: story.color, fontSize: 12, fontWeight: 500, fontStyle: 'italic' }}>
                    &ldquo;{story.lesson}&rdquo;
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Bilim */}
          {activeTab === 'science' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="px-6 mb-6">
              <div style={{
                background: 'rgba(15,20,10,0.4)', backdropFilter: 'blur(20px)',
                borderRadius: 28, padding: '24px',
                border: '1px solid rgba(200,169,110,0.08)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <Brain size={22} color={ACCENT} strokeWidth={1.2} />
                  <div>
                    <h3 style={{ color: THEME, fontSize: 17, fontWeight: 600, margin: 0 }}>Nörobilim</h3>
                    <p style={{ color: 'rgba(251,244,226,0.4)', fontSize: 12, margin: 0 }}>Beynini anla, odaklanmanı güçlendir</p>
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  {[
                    { icon: Brain,    title: 'Prefrontal Korteks',  desc: 'Düzenli odaklanma ile kalınlığı artar',          color: '#60A5FA' },
                    { icon: Activity, title: 'Dopamin Yönetimi',    desc: 'Odaklanma sırasında doğru salgılanır',           color: '#34D399' },
                    { icon: Zap,      title: 'Nöroplastisite',      desc: 'Beyin her yaşta kendini yeniden şekillendirir',  color: ACCENT },
                  ].map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: 14,
                          background: `${item.color}10`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <IconComponent size={20} color={item.color} strokeWidth={1.2} />
                        </div>
                        <div>
                          <p style={{ color: THEME, fontSize: 14, fontWeight: 600, margin: 0 }}>{item.title}</p>
                          <p style={{ color: 'rgba(251,244,226,0.45)', fontSize: 11, margin: 0 }}>{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{
                  background: 'rgba(200,169,110,0.05)',
                  borderRadius: 20, padding: '20px', textAlign: 'center',
                }}>
                  <p style={{ color: THEME, fontSize: 13, fontWeight: 500, margin: 0 }}>
                    <Sparkles size={14} style={{ display: 'inline', marginRight: 6, color: ACCENT }} />
                    Kullanıcılarımızın odaklanma süresi
                  </p>
                  <p style={{ color: ACCENT, fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>+%32</p>
                  <p style={{ color: 'rgba(251,244,226,0.4)', fontSize: 11 }}>ortalama artış gösterdi</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bottom Navigation */}
          <div style={{
            position: 'fixed', bottom: 20, left: 0, right: 0,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 50, pointerEvents: 'none',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{ pointerEvents: 'auto', width: 'auto', minWidth: 260, maxWidth: '90%' }}
            >
              <div style={{
                background: 'rgba(18,14,12,0.88)',
                backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                borderRadius: 250, padding: '8px 20px',
                border: '1px solid rgba(200,169,110,0.1)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              }}>
                <div className="flex justify-around items-center" style={{ gap: 8 }}>
                  {navItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActiveItem = item.active;
                    return (
                      <motion.button
                        key={item.label}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => router.push(item.path)}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                          background: isActiveItem ? 'rgba(200,169,110,0.12)' : 'transparent',
                          border: 'none', cursor: 'pointer', padding: '8px 16px',
                          borderRadius: 250, transition: 'all 0.2s ease', position: 'relative',
                        }}
                      >
                        <IconComponent
                          size={20}
                          color={isActiveItem ? ACCENT : 'rgba(251,244,226,0.4)'}
                          strokeWidth={1.2}
                        />
                        <span style={{
                          fontSize: 11, fontWeight: isActiveItem ? 500 : 400,
                          color: isActiveItem ? ACCENT : 'rgba(251,244,226,0.4)',
                        }}>
                          {item.label}
                        </span>
                        {isActiveItem && (
                          <motion.div
                            layoutId="activeTab"
                            style={{
                              position: 'absolute', bottom: -2,
                              width: 24, height: 2, borderRadius: 2, background: ACCENT,
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

export default dynamic(() => Promise.resolve(CalmPage), { ssr: false });