'use client';

import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import NewCommunity from '@/components/NewCommunity';
import {
  Calculator,
  Atom,
  Briefcase,
  Code2,
  Palette,
  Languages,
  Clock,
  User,
  ArrowLeft,
  TrendingUp,
  Zap,
  Focus,
  Compass,
  Users,
  Coins,
  Target,
  Award,
  Leaf,
  Handshake,
  Plus,
} from 'lucide-react';

const THEME = '#FBF4E2';
const ACCENT = '#C8A96E';

// FIX 1: Açık tip tanımı — icon ReactNode olarak belirtildi
interface Subject {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  borderColor: string;
  details: string[];
}

const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'math',
    name: 'Matematik',
    icon: <Calculator size={24} color="#60A5FA" strokeWidth={1.5} />,
    color: '#60A5FA',
    gradient: 'linear-gradient(135deg, rgba(96,165,250,0.15) 0%, rgba(96,165,250,0.05) 100%)',
    borderColor: 'rgba(96,165,250,0.3)',
    details: ['Kalkülüs', 'Lineer Cebir', 'İstatistik', 'Geometri', 'Diferansiyel Denklemler'],
  },
  {
    id: 'physics',
    name: 'Fizik',
    icon: <Atom size={24} color="#34D399" strokeWidth={1.5} />,
    color: '#34D399',
    gradient: 'linear-gradient(135deg, rgba(52,211,153,0.15) 0%, rgba(52,211,153,0.05) 100%)',
    borderColor: 'rgba(52,211,153,0.3)',
    details: ['Klasik Mekanik', 'Elektromanyetizma', 'Kuantum Fiziği', 'Termodinamik', 'Görelilik'],
  },
  {
    id: 'business',
    name: 'İş Hayatı',
    icon: <Briefcase size={24} color="#FBBF24" strokeWidth={1.5} />,
    color: '#FBBF24',
    gradient: 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.05) 100%)',
    borderColor: 'rgba(251,191,36,0.3)',
    details: ['Pazarlama', 'Finans', 'Liderlik', 'Girişimcilik', 'Strateji'],
  },
  {
    id: 'cs',
    name: 'Bilgisayar Bilimleri',
    icon: <Code2 size={24} color="#F472B6" strokeWidth={1.5} />,
    color: '#F472B6',
    gradient: 'linear-gradient(135deg, rgba(244,114,182,0.15) 0%, rgba(244,114,182,0.05) 100%)',
    borderColor: 'rgba(244,114,182,0.3)',
    details: ['Python', 'JavaScript', 'C++', 'Rust', 'Go', 'Veri Yapıları', 'Algoritmalar'],
  },
  {
    id: 'design',
    name: 'Tasarım',
    icon: <Palette size={24} color="#A78BFA" strokeWidth={1.5} />,
    color: '#A78BFA',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.15) 0%, rgba(167,139,250,0.05) 100%)',
    borderColor: 'rgba(167,139,250,0.3)',
    details: ['UI/UX Tasarım', 'Illustrator', 'Photoshop', 'Figma', '3D Modelleme'],
  },
  {
    id: 'language',
    name: 'Dil Öğrenimi',
    icon: <Languages size={24} color="#F87171" strokeWidth={1.5} />,
    color: '#F87171',
    gradient: 'linear-gradient(135deg, rgba(248,113,113,0.15) 0%, rgba(248,113,113,0.05) 100%)',
    borderColor: 'rgba(248,113,113,0.3)',
    details: ['İngilizce', 'Almanca', 'İspanyolca', 'Japonca', 'Fransızca'],
  },
];

const lastStudiedTopic = {
  name: 'Python',
  subject: 'Bilgisayar Bilimleri',
  progress: 65,
  remaining: 35,
  subjectColor: '#F472B6',
};

function SessionSubjectPage() {
  const router = useRouter();
  // FIX 2: pathname kaldırıldı (kullanılmıyordu)
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showNewCommunity, setShowNewCommunity] = useState(false);

  const handleSubjectClick = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setSelectedTopic(null);
  };

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
  };

  const handleStartSession = () => {
    if (selectedSubject && selectedTopic) {
      router.push(`/session/focus?subject=${selectedSubject}&topic=${encodeURIComponent(selectedTopic)}`);
    }
  };

  const handleCloseModal = () => {
    setSelectedSubject(null);
    setSelectedTopic(null);
  };

  // FIX 1: newCommunity.icon zaten ReactNode — Subject tipine uyumlu
  const handleAddCommunity = (newCommunity: {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
    details: string[];
  }) => {
    const newSubject: Subject = {
      id: newCommunity.id,
      name: newCommunity.name,
      icon: newCommunity.icon,
      color: newCommunity.color,
      gradient: `linear-gradient(135deg, ${newCommunity.color}20 0%, ${newCommunity.color}08 100%)`,
      borderColor: `${newCommunity.color}30`,
      details: newCommunity.details,
    };
    // FIX 1: prev ve newSubject aynı Subject tipinde — tip uyuşmazlığı giderildi
    setSubjects(prev => [...prev, newSubject]);
  };

  const currentSubject = selectedSubject ? subjects.find(s => s.id === selectedSubject) : null;
  // FIX 3: topics değişkeni kaldırıldı, currentSubject.details doğrudan kullanılıyor

  const navItems = [
    { icon: Focus, label: 'Odaklan', path: '/session/subject', active: true },
    { icon: Compass, label: 'Keşfet', path: '/explore', active: false },
    { icon: Users, label: 'Buluş', path: '/meet/search', active: false },
    { icon: User, label: 'Profil', path: '/profile', active: false },
  ];

  const topButtons = [
    { icon: Leaf, label: 'Sakinlik', path: '/calm', color: '#4ade80' },
    { icon: Handshake, label: 'Topluluk', path: '/community', color: ACCENT },
  ];

  return (
    <IonPage>
      <NewCommunity
        isOpen={showNewCommunity}
        onClose={() => setShowNewCommunity(false)}
        onAddCommunity={handleAddCommunity}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .fr * { font-family: 'Inter', -apple-system, sans-serif !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

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

      <IonContent
        scrollY={true}
        style={{ '--background': 'transparent', position: 'relative', zIndex: 1 } as React.CSSProperties}
      >
        <div className="fr relative flex flex-col min-h-full mx-auto pb-32" style={{ maxWidth: 430 }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-10 px-6 pt-4 pb-3"
            style={{
              background: 'rgba(5,3,1,0.85)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(200,169,110,0.1)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(200,169,110,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Image src="/icon.png" alt="Focushion" width={28} height={28} style={{ borderRadius: 8 }} />
                </div>
                <div>
                  <span style={{ color: THEME, fontSize: 14, fontWeight: 600, letterSpacing: '-0.3px' }}>
                    Seans oluştur
                  </span>
                  <p style={{ color: 'rgba(251,244,226,0.4)', fontSize: 11, margin: 0 }}>
                    odaklanma hedefini belirle
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Top Navigation Buttons */}
          <div className="px-6 pt-4 pb-2">
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 16,
              background: 'rgba(18, 14, 12, 0.6)',
              backdropFilter: 'blur(20px)',
              borderRadius: 250, padding: '6px 12px',
              width: 'fit-content', margin: '0 auto',
              border: '1px solid rgba(200,169,110,0.15)',
            }}>
              {topButtons.map((button) => {
                const IconComponent = button.icon;
                return (
                  <motion.button
                    key={button.label}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(button.path)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '8px 18px', borderRadius: 250, border: 'none',
                      background: 'rgba(255,255,255,0.05)',
                      cursor: 'pointer', transition: 'all 0.2s ease',
                    }}
                    whileHover={{ background: 'rgba(200,169,110,0.15)' }}
                  >
                    <IconComponent size={16} color={button.color} strokeWidth={1.5} />
                    <span style={{ color: THEME, fontSize: 13, fontWeight: 500, letterSpacing: '-0.2px' }}>
                      {button.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="px-6 mt-4 mb-4"
          >
            <h1 style={{
              color: THEME, fontSize: 34, fontWeight: 700,
              letterSpacing: '-0.5px', marginBottom: 10, lineHeight: 1.1,
            }}>
              Neye<br />odaklanacaksın?
            </h1>
            <p style={{ color: 'rgba(251,244,226,0.5)', fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>
              Bir kategori seç, ardından spesifik bir konu belirle ve odaklanmaya başla.
            </p>
          </motion.div>

          {/* Subject Cards */}
          <div className="px-6 mb-4 overflow-x-auto no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-3 pb-4">
              {subjects.map((subject, idx) => {
                const isSelected = selectedSubject === subject.id;
                return (
                  <motion.button
                    key={subject.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSubjectClick(subject.id)}
                    style={{
                      minWidth: 150, padding: '18px 16px', borderRadius: 24,
                      background: isSelected
                        ? `linear-gradient(135deg, ${subject.color}20 0%, ${subject.color}08 100%)`
                        : 'rgba(255,255,255,0.04)',
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${isSelected ? subject.color : 'rgba(255,255,255,0.08)'}`,
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s ease',
                      boxShadow: isSelected ? `0 4px 20px ${subject.color}20` : 'none',
                    }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 16,
                      background: `${subject.color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 14,
                    }}>
                      {subject.icon}
                    </div>
                    <span style={{ color: THEME, fontSize: 16, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                      {subject.name}
                    </span>
                    <span style={{ color: subject.color, fontSize: 12, fontWeight: 500, opacity: 0.8 }}>
                      {subject.details.length} konu
                    </span>
                  </motion.button>
                );
              })}

              {/* Kategori Ekle */}
              <motion.button
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: subjects.length * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowNewCommunity(true)}
                style={{
                  minWidth: 120, padding: '18px 16px', borderRadius: 24,
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(20px)',
                  border: '1px dashed rgba(200,169,110,0.3)',
                  cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s ease',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                <Plus size={28} color={ACCENT} strokeWidth={1.5} />
                <span style={{ color: ACCENT, fontSize: 13, fontWeight: 600 }}>Kategori Ekle</span>
              </motion.button>
            </div>
          </div>

          {/* Topic Pills */}
          {selectedSubject && currentSubject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: `${currentSubject.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {currentSubject.icon}
                  </div>
                  <h2 style={{ color: currentSubject.color, fontSize: 15, fontWeight: 600, letterSpacing: '-0.2px' }}>
                    {currentSubject.name}
                  </h2>
                </div>
                <span style={{ color: 'rgba(251,244,226,0.35)', fontSize: 12, fontWeight: 500 }}>
                  {currentSubject.details.length} konu
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {/* FIX 3: topics değişkeni yerine currentSubject.details doğrudan */}
                {currentSubject.details.map((topic, idx) => (
                  <motion.button
                    key={topic}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleTopicClick(topic)}
                    style={{
                      padding: '10px 18px', borderRadius: 100,
                      background: selectedTopic === topic
                        ? `linear-gradient(135deg, ${currentSubject.color} 0%, ${currentSubject.color}CC 100%)`
                        : 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(10px)',
                      border: selectedTopic === topic ? 'none' : '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer', transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{
                      color: selectedTopic === topic ? '#1a1208' : THEME,
                      fontSize: 13,
                      fontWeight: selectedTopic === topic ? 600 : 500,
                    }}>
                      {topic}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Last Studied */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="px-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} color={ACCENT} strokeWidth={1.5} />
              <h3 style={{ color: ACCENT, fontSize: 14, fontWeight: 600, letterSpacing: '0.3px' }}>En Son</h3>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              borderRadius: 24,
              border: `1px solid ${lastStudiedTopic.subjectColor}30`,
              padding: '16px',
            }}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span style={{ color: lastStudiedTopic.subjectColor, fontSize: 13, fontWeight: 600 }}>
                    {lastStudiedTopic.subject}
                  </span>
                  <h4 style={{ color: THEME, fontSize: 18, fontWeight: 700, marginTop: 2 }}>
                    {lastStudiedTopic.name}
                  </h4>
                </div>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: `${lastStudiedTopic.subjectColor}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Target size={20} color={lastStudiedTopic.subjectColor} strokeWidth={1.5} />
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span style={{ color: 'rgba(251,244,226,0.5)', fontSize: 11, fontWeight: 500 }}>İlerleme</span>
                  <span style={{ color: THEME, fontSize: 11, fontWeight: 600 }}>{lastStudiedTopic.progress}%</span>
                </div>
                <div style={{
                  width: '100%', height: 6,
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 3, overflow: 'hidden',
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${lastStudiedTopic.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ height: '100%', background: lastStudiedTopic.subjectColor, borderRadius: 3 }}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'rgba(251,244,226,0.4)', fontSize: 11, fontWeight: 500 }}>
                  Kalan: {lastStudiedTopic.remaining}%
                </span>
                <button
                  onClick={() => {
                    const subject = subjects.find(s => s.name === lastStudiedTopic.subject);
                    if (subject) {
                      handleSubjectClick(subject.id);
                      setTimeout(() => handleTopicClick(lastStudiedTopic.name), 100);
                    }
                  }}
                  style={{
                    background: 'none', border: 'none',
                    color: ACCENT, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Devam Et →
                </button>
              </div>
            </div>
          </motion.div>

          {/* Credit Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="px-6 mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <Coins size={16} color={ACCENT} strokeWidth={1.5} />
              <h3 style={{ color: ACCENT, fontSize: 14, fontWeight: 600, letterSpacing: '0.3px' }}>
                Kredi nasıl kazanılır?
              </h3>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              borderRadius: 24,
              border: '1px solid rgba(200,169,110,0.1)',
              padding: '16px',
            }}>
              <div className="flex items-start gap-3">
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'rgba(200,169,110,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Award size={20} color={ACCENT} strokeWidth={1.5} />
                </div>
                <div>
                  <p style={{ color: THEME, fontSize: 14, fontWeight: 500, lineHeight: 1.5, margin: 0 }}>
                    Her tamamladığınız{' '}
                    <span style={{ color: ACCENT, fontWeight: 700 }}>25 dakikalık odaklanma seansı</span>{' '}
                    sonunda{' '}
                    <span style={{ color: ACCENT, fontWeight: 700 }}>2.500 Kredi</span> kazanırsınız.
                  </p>
                  <p style={{ color: 'rgba(251,244,226,0.4)', fontSize: 12, fontWeight: 500, marginTop: 8 }}>
                    Kredilerinizle keşfet ve buluş sayfalarını görüntüleyebilir, özel içeriklere erişebilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Sheet Modal */}
          <AnimatePresence>
            {selectedTopic && currentSubject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed', bottom: 0, left: 0, right: 0, top: 0,
                  background: 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(24px)',
                  zIndex: 1000,
                  display: 'flex', alignItems: 'flex-end',
                }}
                onClick={handleCloseModal}
              >
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  style={{
                    background: 'rgba(18,14,10,0.95)',
                    backdropFilter: 'blur(30px)',
                    borderTop: `1px solid ${currentSubject.color}20`,
                    borderRadius: '32px 32px 0 0',
                    width: '100%', maxWidth: 430,
                    margin: '0 auto', padding: '28px 24px 32px',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div style={{
                    width: 48, height: 5,
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: 3, margin: '0 auto 24px',
                  }} />

                  <div className="flex items-center gap-4 mb-6">
                    <div style={{
                      width: 56, height: 56, borderRadius: 20,
                      background: `${currentSubject.color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {currentSubject.icon}
                    </div>
                    <div>
                      <span style={{ color: currentSubject.color, fontSize: 13, fontWeight: 600, letterSpacing: '0.3px' }}>
                        {currentSubject.name}
                      </span>
                      <h3 style={{ color: THEME, fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px', marginTop: 2 }}>
                        {selectedTopic}
                      </h3>
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 24, padding: '20px', marginBottom: 28,
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                          <Clock size={14} color="rgba(251,244,226,0.4)" />
                          <span style={{ color: 'rgba(251,244,226,0.4)', fontSize: 11, fontWeight: 500 }}>Toplam Çalışma</span>
                        </div>
                        <p style={{ color: THEME, fontSize: 28, fontWeight: 700, margin: 0 }}>
                          12<span style={{ fontSize: 13, fontWeight: 500, color: ACCENT, marginLeft: 4 }}>saat</span>
                        </p>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                          <TrendingUp size={14} color="rgba(251,244,226,0.4)" />
                          <span style={{ color: 'rgba(251,244,226,0.4)', fontSize: 11, fontWeight: 500 }}>Toplam Seans</span>
                        </div>
                        <p style={{ color: THEME, fontSize: 28, fontWeight: 700, margin: 0 }}>8</p>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                          <Zap size={14} color="#4ade80" />
                          <span style={{ color: 'rgba(251,244,226,0.4)', fontSize: 11, fontWeight: 500 }}>Günlük Seri</span>
                        </div>
                        <p style={{ color: '#4ade80', fontSize: 28, fontWeight: 700, margin: 0 }}>3</p>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleStartSession}
                    style={{
                      width: '100%', padding: '18px 0', borderRadius: 250, border: 'none',
                      background: `linear-gradient(135deg, ${currentSubject.color} 0%, ${currentSubject.color}CC 100%)`,
                      color: '#1a1208', fontSize: 16, fontWeight: 700, cursor: 'pointer',
                      marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                  >
                    Seans Başlat
                    <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                  </motion.button>

                  <button
                    onClick={handleCloseModal}
                    style={{
                      width: '100%', padding: '14px 0', borderRadius: 250,
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'transparent', color: 'rgba(251,244,226,0.6)',
                      fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    Vazgeç
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Navigation */}
          <div style={{
            position: 'fixed', bottom: 20, left: 0, right: 0,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 50, pointerEvents: 'none',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              style={{ pointerEvents: 'auto', width: 'auto', minWidth: 260, maxWidth: '90%' }}
            >
              <div style={{
                background: 'rgba(18, 14, 12, 0.9)',
                backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                borderRadius: 250, padding: '8px 20px',
                border: '1px solid rgba(200,169,110,0.15)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              }}>
                <div className="flex justify-around items-center" style={{ gap: 8 }}>
                  {navItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActiveItem = item.active;
                    return (
                      <motion.button
                        key={item.label}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push(item.path)}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                          background: isActiveItem ? 'rgba(200,169,110,0.15)' : 'transparent',
                          border: 'none', cursor: 'pointer', padding: '8px 16px',
                          borderRadius: 250, transition: 'all 0.2s ease', position: 'relative',
                        }}
                      >
                        <IconComponent
                          size={20}
                          color={isActiveItem ? ACCENT : 'rgba(251,244,226,0.5)'}
                          strokeWidth={isActiveItem ? 2 : 1.5}
                        />
                        <span style={{
                          fontSize: 11, fontWeight: isActiveItem ? 600 : 500,
                          color: isActiveItem ? ACCENT : 'rgba(251,244,226,0.5)',
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

export default dynamic(() => Promise.resolve(SessionSubjectPage), { ssr: false });