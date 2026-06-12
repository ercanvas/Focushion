'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Notes from '@/components/Notes';
import POW from '@/components/POW';
import RecordFocus from '@/components/RecordFocus';
import {
  Calculator,
  Atom,
  Briefcase,
  Code2,
  Palette,
  Languages,
  User,
  Play,
  Pause,
  RotateCcw,
  FileText,
  Coffee,
  Target,
  ChevronRight,
  Trophy,
  Focus,
  Compass,
  Users,
  Camera,
  BookOpen,
} from 'lucide-react';

const THEME = '#FBF4E2';
const ACCENT = '#C8A96E';

const POMODORO_MINUTES = 25;
const BREAK_MINUTES = 5;

const getSubjectIcon = (subject: string | null) => {
  const icons: Record<string, React.ReactNode> = {
    math: <Calculator size={32} color={ACCENT} strokeWidth={1.5} />,
    physics: <Atom size={32} color="#34D399" strokeWidth={1.5} />,
    business: <Briefcase size={32} color="#FBBF24" strokeWidth={1.5} />,
    cs: <Code2 size={32} color="#F472B6" strokeWidth={1.5} />,
    design: <Palette size={32} color="#A78BFA" strokeWidth={1.5} />,
    language: <Languages size={32} color="#F87171" strokeWidth={1.5} />,
  };
  return icons[subject || 'cs'] || <Target size={32} color={ACCENT} strokeWidth={1.5} />;
};

const getSubjectName = (subject: string | null) => {
  const names: Record<string, string> = {
    math: 'Matematik',
    physics: 'Fizik',
    business: 'İş Hayatı',
    cs: 'Bilgisayar Bilimleri',
    design: 'Tasarım',
    language: 'Dil Öğrenimi',
  };
  return names[subject || 'cs'] || 'Odaklanma';
};

function SessionFocusPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const subject = searchParams.get('subject');
  const topic = searchParams.get('topic');

  const [timeLeft, setTimeLeft] = useState(POMODORO_MINUTES * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showPOW, setShowPOW] = useState(false);
  const [showRecord, setShowRecord] = useState(false);

  const [notes, setNotes] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(`notes_${subject}_${topic}`) ?? '';
  });

  const timeLeftRef = useRef(timeLeft);
  const isActiveRef = useRef(isActive);
  const isBreakRef = useRef(isBreak);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const navItems = [
    { icon: Focus, label: 'Odaklan', path: '/session/subject', active: pathname === '/session/subject' || pathname === '/session/focus' },
    { icon: Compass, label: 'Keşfet', path: '/explore', active: false },
    { icon: Users, label: 'Buluş', path: '/meet/search', active: false },
    { icon: User, label: 'Profil', path: '/profile', active: false },
  ];

  useEffect(() => { timeLeftRef.current = timeLeft; }, [timeLeft]);
  useEffect(() => { isActiveRef.current = isActive; }, [isActive]);
  useEffect(() => { isBreakRef.current = isBreak; }, [isBreak]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleComplete = useCallback(() => {
    stopTimer();
    setIsActive(false);
    setShowCompleteModal(true);
    if (!isBreakRef.current) {
      setSessionsCompleted(prev => prev + 1);
    }
  }, [stopTimer]);

  const startTimer = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      if (timeLeftRef.current > 1) {
        setTimeLeft(prev => prev - 1);
      } else if (timeLeftRef.current === 1) {
        setTimeLeft(0);
        stopTimer();
        handleComplete();
      }
    }, 1000);
  }, [stopTimer, handleComplete]);

  const toggleActive = useCallback(() => {
    if (isActiveRef.current) {
      stopTimer();
      setIsActive(false);
    } else {
      if (timeLeftRef.current > 0) {
        setIsActive(true);
      }
    }
  }, [stopTimer]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      startTimer();
    }
    return () => {
      if (!isActive) {
        stopTimer();
      }
    };
  }, [isActive, timeLeft, startTimer, stopTimer]);

  const resetTimer = () => {
    stopTimer();
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(POMODORO_MINUTES * 60);
  };

  const handleNextSession = () => {
    if (isBreak) {
      setIsBreak(false);
      setTimeLeft(POMODORO_MINUTES * 60);
    } else {
      setIsBreak(true);
      setTimeLeft(BREAK_MINUTES * 60);
    }
    setShowCompleteModal(false);
    setIsActive(true);
  };

  const skipBreak = () => {
    setIsBreak(false);
    setTimeLeft(POMODORO_MINUTES * 60);
    setShowCompleteModal(false);
    setIsActive(true);
  };

  const handleSaveNotes = (savedNotes: string) => {
    setNotes(savedNotes);
    localStorage.setItem(`notes_${subject}_${topic}`, savedNotes);
  };

  const progress = isBreak
    ? ((BREAK_MINUTES * 60 - timeLeft) / (BREAK_MINUTES * 60)) * 100
    : ((POMODORO_MINUTES * 60 - timeLeft) / (POMODORO_MINUTES * 60)) * 100;

  return (
    <IonPage>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .fr * { font-family: 'Inter', -apple-system, sans-serif !important; }
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
            background: isBreak
              ? 'linear-gradient(135deg, rgba(74,222,128,0.08) 0%, rgba(5,3,1,0.92) 100%)'
              : 'linear-gradient(135deg, rgba(200,169,110,0.12) 0%, rgba(5,3,1,0.92) 100%)',
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
              <div className="flex items-center gap-3">
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'rgba(200,169,110,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Image src="/icon.png" alt="Focushion" width={28} height={28} style={{ borderRadius: 8 }} />
                </div>
                <div>
                  <span style={{ color: THEME, fontSize: 14, fontWeight: 600, letterSpacing: '-0.3px' }}>
                    Odaklanma seansı
                  </span>
                  <p style={{ color: 'rgba(251,244,226,0.4)', fontSize: 11, margin: 0 }}>
                    {getSubjectName(subject)} • {topic || 'odaklan'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Timer Section */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 pb-24">
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: 300,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              {/* Row: Notes Button + POW Button + Camera Button */}
              <div style={{
                display: 'flex',
                gap: 12,
                marginBottom: 20,
                width: '100%',
                justifyContent: 'center',
              }}>
                {/* Notes Button */}
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowNotes(true)}
                  style={{
                    flex: 1,
                    maxWidth: 100,
                    padding: '12px 0',
                    borderRadius: 250,
                    background: 'rgba(200,169,110,0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <FileText size={14} color="#1a1208" strokeWidth={1.5} />
                  <span style={{ color: '#1a1208', fontSize: 12, fontWeight: 600 }}>
                    Notlar
                  </span>
                </motion.button>

                {/* POW Button - Kayıt Defteri (Artık ikonlu) */}
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowPOW(true)}
                  style={{
                    flex: 1,
                    maxWidth: 100,
                    padding: '12px 0',
                    borderRadius: 250,
                    background: 'rgba(200,169,110,0.15)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(200,169,110,0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <BookOpen size={14} color={ACCENT} strokeWidth={1.5} />
                  <span style={{ color: THEME, fontSize: 12, fontWeight: 600 }}>
                    Defter
                  </span>
                </motion.button>

                {/* Camera Button - 4 circular frames */}
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowRecord(true)}
                  style={{
                    flex: 1,
                    maxWidth: 100,
                    padding: '8px 0',
                    borderRadius: 250,
                    background: 'rgba(200,169,110,0.15)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(200,169,110,0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <Camera size={20} color={ACCENT} strokeWidth={1.5} />
                  {/* 4 circular frames */}
                  <div
                    style={{
                      position: 'absolute',
                      top: -4,
                      left: -4,
                      right: -4,
                      bottom: -4,
                      borderRadius: 256,
                      border: '1px solid rgba(200,169,110,0.3)',
                      pointerEvents: 'none',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: -8,
                      left: -8,
                      right: -8,
                      bottom: -8,
                      borderRadius: 260,
                      border: '1px solid rgba(200,169,110,0.2)',
                      pointerEvents: 'none',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: -12,
                      left: -12,
                      right: -12,
                      bottom: -12,
                      borderRadius: 264,
                      border: '1px solid rgba(200,169,110,0.12)',
                      pointerEvents: 'none',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: -16,
                      left: -16,
                      right: -16,
                      bottom: -16,
                      borderRadius: 268,
                      border: '1px solid rgba(200,169,110,0.06)',
                      pointerEvents: 'none',
                    }}
                  />
                </motion.button>
              </div>

              {/* Timer Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(30px)',
                  borderRadius: 48,
                  padding: '32px 24px',
                  border: `1px solid ${isBreak ? 'rgba(74,222,128,0.2)' : 'rgba(200,169,110,0.2)'}`,
                  boxShadow: `0 8px 32px ${isBreak ? 'rgba(74,222,128,0.1)' : 'rgba(200,169,110,0.1)'}`,
                }}
              >
                {/* Session Type Badge */}
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 16px',
                    borderRadius: 100,
                    background: isBreak ? 'rgba(74,222,128,0.12)' : 'rgba(200,169,110,0.12)',
                    border: `1px solid ${isBreak ? 'rgba(74,222,128,0.2)' : 'rgba(200,169,110,0.2)'}`,
                  }}>
                    {isBreak ? (
                      <Coffee size={14} color="#4ade80" strokeWidth={1.5} />
                    ) : (
                      <Target size={14} color={ACCENT} strokeWidth={1.5} />
                    )}
                    <span style={{ color: isBreak ? '#4ade80' : ACCENT, fontSize: 12, fontWeight: 600 }}>
                      {isBreak ? 'MOLA' : 'ODAKLANMA'}
                    </span>
                  </div>
                </div>

                {/* Topic Info */}
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: 20,
                    background: 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    {getSubjectIcon(subject)}
                  </div>
                  <p style={{ color: THEME, fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                    {topic || 'Odaklanma Seansı'}
                  </p>
                  <span style={{ color: 'rgba(251,244,226,0.4)', fontSize: 12, fontWeight: 500 }}>
                    {getSubjectName(subject)}
                  </span>
                </div>

                {/* Timer Display */}
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <span style={{
                    color: THEME,
                    fontSize: 64,
                    fontWeight: 700,
                    letterSpacing: '2px',
                    fontFamily: '"SF Mono", "Inter", monospace',
                  }}>
                    {formatTime(timeLeft)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div style={{
                  width: '100%',
                  height: 4,
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  marginBottom: 28,
                }}>
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    style={{
                      height: '100%',
                      background: isBreak ? '#4ade80' : ACCENT,
                      borderRadius: 4,
                    }}
                  />
                </div>

                {/* Control Buttons */}
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                  {!isActive ? (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleActive}
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 72,
                        border: 'none',
                        background: `linear-gradient(135deg, ${THEME} 0%, #e8dfc8 100%)`,
                        color: '#1a1208',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Play size={28} fill="#1a1208" strokeWidth={1.5} />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleActive}
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 72,
                        border: '1px solid rgba(200,169,110,0.3)',
                        background: 'rgba(200,169,110,0.1)',
                        backdropFilter: 'blur(10px)',
                        color: THEME,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Pause size={28} strokeWidth={1.5} />
                    </motion.button>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={resetTimer}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 72,
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(0,0,0,0.3)',
                      backdropFilter: 'blur(10px)',
                      color: 'rgba(251,244,226,0.7)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <RotateCcw size={22} strokeWidth={1.5} />
                  </motion.button>
                </div>

                {/* Notes Indicator */}
                {notes && (
                  <div style={{
                    marginTop: 20,
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}>
                    <FileText size={12} color={ACCENT} strokeWidth={1.5} />
                    <span style={{ fontSize: 11, color: ACCENT, opacity: 0.7 }}>
                      Kaydedilmiş notlarınız var
                    </span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Session Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                marginTop: 32,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                padding: '10px 20px',
                borderRadius: 100,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 8,
                    background: i <= sessionsCompleted ? ACCENT : 'rgba(255,255,255,0.2)',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
              <span style={{ color: 'rgba(251,244,226,0.5)', fontSize: 12, fontWeight: 500, marginLeft: 6 }}>
                {sessionsCompleted}/4 seans
              </span>
            </motion.div>
          </div>

          {/* Complete Modal */}
          <AnimatePresence>
            {showCompleteModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: 0,
                  background: 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(24px)',
                  zIndex: 1000,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  style={{
                    background: 'rgba(18,14,10,0.95)',
                    backdropFilter: 'blur(30px)',
                    border: `1px solid ${ACCENT}20`,
                    borderRadius: 32,
                    padding: '32px 24px',
                    width: '90%',
                    maxWidth: 320,
                    textAlign: 'center',
                  }}
                >
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    background: isBreak ? 'rgba(74,222,128,0.12)' : `rgba(200,169,110,0.12)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}>
                    {isBreak ? (
                      <Coffee size={32} color="#4ade80" strokeWidth={1.5} />
                    ) : (
                      <Trophy size={32} color={ACCENT} strokeWidth={1.5} />
                    )}
                  </div>
                  <h2 style={{ color: THEME, fontSize: 24, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.5px' }}>
                    {isBreak ? 'Mola Bitti!' : 'Seans Tamamlandı!'}
                  </h2>
                  <p style={{ color: 'rgba(251,244,226,0.5)', fontSize: 14, fontWeight: 500, marginBottom: 24, lineHeight: 1.4 }}>
                    {isBreak
                      ? 'Devam etmeye hazır mısın?'
                      : `Harika iş çıkardın! ${POMODORO_MINUTES} dakika odaklandın.`}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleNextSession}
                      style={{
                        width: '100%',
                        padding: '16px 0',
                        borderRadius: 250,
                        border: 'none',
                        background: `linear-gradient(135deg, ${ACCENT} 0%, #b8925a 100%)`,
                        color: '#1a1208',
                        fontSize: 15,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                      }}
                    >
                      {isBreak ? 'Yeni Seansa Başla' : 'Molaya Başla'}
                      <ChevronRight size={16} strokeWidth={2} />
                    </motion.button>
                    {!isBreak && (
                      <button
                        onClick={skipBreak}
                        style={{
                          width: '100%',
                          padding: '14px 0',
                          borderRadius: 250,
                          border: '1px solid rgba(255,255,255,0.1)',
                          background: 'transparent',
                          color: 'rgba(251,244,226,0.6)',
                          fontSize: 14,
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        Molayı Atla
                      </button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notes Component */}
          <Notes
            isOpen={showNotes}
            onClose={() => setShowNotes(false)}
            initialNotes={notes}
            onSave={handleSaveNotes}
          />

          {/* POW Component - Kayıt Defteri (Başarı Panosu) */}
          <POW
            isOpen={showPOW}
            onClose={() => setShowPOW(false)}
          />

          {/* RecordFocus Component - Kamera Kayıt */}
          <RecordFocus
            isOpen={showRecord}
            onClose={() => setShowRecord(false)}
          />

          {/* Bottom Navigation */}
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
              style={{ pointerEvents: 'auto', width: 'auto', minWidth: 260, maxWidth: '90%' }}
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
                  {navItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActiveItem = item.active;
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
                          background: isActiveItem ? `rgba(200,169,110,0.15)` : 'transparent',
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
                          color={isActiveItem ? ACCENT : 'rgba(251,244,226,0.5)'}
                          strokeWidth={isActiveItem ? 2 : 1.5}
                        />
                        <span style={{
                          fontSize: 11,
                          fontWeight: isActiveItem ? 600 : 500,
                          color: isActiveItem ? ACCENT : 'rgba(251,244,226,0.5)',
                        }}>
                          {item.label}
                        </span>
                        {isActiveItem && (
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

export default dynamic(() => Promise.resolve(SessionFocusPage), { ssr: false });