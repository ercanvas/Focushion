'use client';

// 'useRef' kullanılmadığı için kaldırıldı
import React, { useState, useEffect } from 'react';
// Modül ismi '@ionic/react' olarak düzeltildi/netleştirildi
import { IonPage, IonContent } from '@ionic/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Notes from '@/components/Notes';
import {
  User,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Volume2,
  VolumeX,
  Flag,
  LogOut,
  AlertCircle,
  Focus,
  Compass,
  Users,
  Clock,
} from 'lucide-react';
import Loading from '@/components/Loading';

const THEME = '#FBF4E2';
const ACCENT = '#C8A96E';

const participants = [
  { id: 1, name: 'ayse_yilmaz', avatar: 'AY', color: '#F472B6', isMuted: false, isVideoOn: true },
  { id: 2, name: 'mehmet_demir', avatar: 'MD', color: '#34D399', isMuted: true, isVideoOn: true },
  { id: 3, name: 'zeynep_tekin', avatar: 'ZT', color: '#60A5FA', isMuted: false, isVideoOn: true },
  { id: 4, name: 'can_ozturk', avatar: 'CO', color: '#FBBF24', isMuted: false, isVideoOn: false },
];

function MeetFoundPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGlobalMicOn, setIsGlobalMicOn] = useState(true);
  const [isGlobalCameraOn, setIsGlobalCameraOn] = useState(true);
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
  const [participantVolumes, setParticipantVolumes] = useState<Record<string, number>>({});
  const [showVolumeSlider, setShowVolumeSlider] = useState<string | null>(null);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [timeLeft, setTimeLeft] = useState(900);

  // ESLint Cascading Render Hatası Giderildi:
  // State güncellemeleri doğrudan Effect gövdesinde senkron çalışmak yerine,
  // interval tetikleyicisinin içine (asenkron event) taşındı.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            router.push('/meet/search');
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/meet/search');
    }, 500);
  };

  const handleReport = (participantId: string) => {
    console.log('Report user:', participantId);
    setSelectedParticipant(null);
  };

  const handleVolumeChange = (participantId: string, volume: number) => {
    setParticipantVolumes(prev => ({ ...prev, [participantId]: volume }));
  };

  const handleParticipantClick = (participantId: string) => {
    if (selectedParticipant === participantId) {
      setSelectedParticipant(null);
      setShowVolumeSlider(null);
    } else {
      setSelectedParticipant(participantId);
      setShowVolumeSlider(null);
    }
  };

  const handleVolumeButtonClick = (participantId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVolumeSlider(showVolumeSlider === participantId ? null : participantId);
  };

  const handleSaveNotes = (savedNotes: string) => {
    setNotes(savedNotes);
    localStorage.setItem('meet_notes', savedNotes);
  };

  const getVolumeIcon = (volume: number = 70) => {
    if (volume === 0) return <VolumeX size={18} color="white" />;
    return <Volume2 size={18} color="white" />;
  };

  const topBarWidth = 280;

  return (
    <IonPage>
      <Loading isLoading={isLoading} />
      <Notes
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        initialNotes={notes}
        onSave={handleSaveNotes}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .fr * { font-family: 'Inter', -apple-system, sans-serif !important; }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse-ring 1.8s ease-out infinite;
        }
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 120px;
          height: 4px;
          background: rgba(200,169,110,0.3);
          border-radius: 2px;
          outline: none;
          transform: rotate(-90deg);
        }
        input[type="range"]:focus {
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: ${ACCENT};
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .vertical-slider-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <Image
          src="/bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          style={{ filter: 'brightness(0.3) saturate(0.85)' }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(200,169,110,0.15) 0%, rgba(12,8,4,0.85) 45%, rgba(5,3,1,0.98) 100%)',
          }}
        />
      </div>

      <IonContent
        scrollY={false}
        style={{ '--background': 'transparent', position: 'relative', zIndex: 1 } as React.CSSProperties}
      >
        <div className="fr relative flex flex-col h-full mx-auto" style={{ maxWidth: 430 }}>

          {/* Top Controls Bar */}
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              background: 'rgba(18, 14, 12, 0.9)',
              backdropFilter: 'blur(24px)',
              borderRadius: 250,
              padding: '12px 16px',
              border: '1px solid rgba(200,169,110,0.25)',
              display: 'flex',
              gap: 12,
              width: topBarWidth,
              justifyContent: 'center',
              boxSizing: 'border-box',
            }}
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsGlobalMicOn(!isGlobalMicOn)}
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                flexShrink: 0,
                background: isGlobalMicOn ? 'rgba(200,169,110,0.15)' : 'rgba(239,68,68,0.2)',
                border: `1px solid ${isGlobalMicOn ? 'rgba(200,169,110,0.3)' : 'rgba(239,68,68,0.5)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {isGlobalMicOn ? (
                <Mic size={22} color={ACCENT} strokeWidth={1.5} />
              ) : (
                <MicOff size={22} color="#ef4444" strokeWidth={1.5} />
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsGlobalCameraOn(!isGlobalCameraOn)}
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                flexShrink: 0,
                background: isGlobalCameraOn ? 'rgba(200,169,110,0.15)' : 'rgba(239,68,68,0.2)',
                border: `1px solid ${isGlobalCameraOn ? 'rgba(200,169,110,0.3)' : 'rgba(239,68,68,0.5)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {isGlobalCameraOn ? (
                <Camera size={22} color={ACCENT} strokeWidth={1.5} />
              ) : (
                <CameraOff size={22} color="#ef4444" strokeWidth={1.5} />
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                flexShrink: 0,
                background: 'rgba(200,169,110,0.15)',
                border: '1px solid rgba(200,169,110,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <AlertCircle size={22} color={ACCENT} strokeWidth={1.5} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleExit}
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                flexShrink: 0,
                background: 'rgba(239,68,68,0.2)',
                border: '1px solid rgba(239,68,68,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <LogOut size={22} color="#ef4444" strokeWidth={1.5} />
            </motion.button>
          </div>

          {/* 4 Equal Grid - Video Participants */}
          <div className="grid grid-cols-2 gap-0.5 w-full h-full">
            {participants.map((participant) => (
              <div
                key={participant.id}
                onClick={() => handleParticipantClick(participant.id.toString())}
                className="relative cursor-pointer"
                style={{
                  height: '50vh',
                  background: `linear-gradient(135deg, ${participant.color}30, ${participant.color}10)`,
                  border: selectedParticipant === participant.id.toString() ? `2px solid ${ACCENT}` : 'none',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {participant.isVideoOn ? (
                    <div className="text-center">
                      <div
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 80,
                          background: `linear-gradient(135deg, ${participant.color}40, ${participant.color}15)`,
                          border: `2px solid ${participant.color}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                        }}
                      >
                        <span style={{ fontSize: 32, fontWeight: 700, color: participant.color }}>
                          {participant.avatar}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 80,
                          background: 'rgba(0,0,0,0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                        }}
                      >
                        <CameraOff size={32} color="rgba(255,255,255,0.5)" />
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 8 }}>
                        Kamera kapalı
                      </p>
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {selectedParticipant === participant.id.toString() && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.75)',
                        backdropFilter: 'blur(12px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 30,
                        zIndex: 15,
                      }}
                    >
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReport(participant.id.toString());
                        }}
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          background: 'rgba(239,68,68,0.2)',
                          border: '1px solid rgba(239,68,68,0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <Flag size={24} color="#ef4444" strokeWidth={1.5} />
                      </motion.button>

                      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => handleVolumeButtonClick(participant.id.toString(), e)}
                          style={{
                            width: 56,
                            height: 56,
                            borderRadius: '50%',
                            background: 'rgba(200,169,110,0.2)',
                            border: '1px solid rgba(200,169,110,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          {getVolumeIcon(participantVolumes[participant.id.toString()])}
                        </motion.button>

                        <AnimatePresence>
                          {showVolumeSlider === participant.id.toString() && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: 10 }}
                              style={{
                                position: 'absolute',
                                bottom: 65,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 44,
                                height: 140,
                                background: 'rgba(18, 14, 12, 0.95)',
                                backdropFilter: 'blur(24px)',
                                borderRadius: 250,
                                border: '1px solid rgba(200,169,110,0.3)',
                                padding: '16px 0',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 20,
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="vertical-slider-container">
                                <span style={{ color: THEME, fontSize: 11, fontWeight: 600, marginBottom: 12 }}>
                                  Ses
                                </span>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={participantVolumes[participant.id.toString()] ?? 70}
                                  onChange={(e) => handleVolumeChange(participant.id.toString(), parseInt(e.target.value))}
                                  style={{
                                    width: 100,
                                    height: 4,
                                  }}
                                />
                                <span style={{ color: ACCENT, fontSize: 12, fontWeight: 700, marginTop: 12 }}>
                                  {participantVolumes[participant.id.toString()] ?? 70}%
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(12px)',
                    padding: '6px 12px',
                    borderRadius: 250,
                    zIndex: 10,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 28,
                      background: `linear-gradient(135deg, ${participant.color}40, ${participant.color}15)`,
                      border: `1px solid ${participant.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 700, color: participant.color }}>
                      {participant.avatar}
                    </span>
                  </div>
                  <span style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>
                    @{participant.name}
                  </span>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(12px)',
                    padding: 6,
                    borderRadius: 250,
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 28,
                  }}
                >
                  {participant.isMuted ? (
                    <MicOff size={14} color="#ef4444" strokeWidth={1.5} />
                  ) : (
                    <>
                      <Mic size={14} color="#4ade80" strokeWidth={1.5} />
                      <div className="live-dot" style={{ marginLeft: 6, width: 6, height: 6 }} />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Group */}
          <div
            style={{
              position: 'absolute',
              bottom: 90,
              left: '50%',
              transform: 'translateX(-50%)',
              width: topBarWidth,
              display: 'flex',
              gap: 10,
              zIndex: 20,
            }}
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowNotes(true)}
              style={{
                flex: 1,
                padding: '14px 0',
                borderRadius: 250,
                border: 'none',
                background: `linear-gradient(135deg, ${ACCENT} 0%, #b8925a 100%)`,
                color: '#1a1208',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                boxShadow: '0 6px 24px rgba(200,169,110,0.3)',
              }}
            >
              <span style={{ fontSize: 16 }}>📝</span>
              Notlar Al
            </motion.button>

            <div
              style={{
                width: 90,
                borderRadius: 250,
                background: 'rgba(18, 14, 12, 0.9)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(200,169,110,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
              }}
            >
              <Clock size={15} color={timeLeft <= 60 ? '#ef4444' : ACCENT} className={timeLeft <= 60 ? 'animate-pulse' : ''} />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: timeLeft <= 60 ? '#ef4444' : THEME,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div
            style={{
              position: 'fixed',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: 430,
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
                    { icon: Users, label: 'Buluş', path: '/meet/search', active: true },
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

export default dynamic(() => Promise.resolve(MeetFoundPage), { ssr: false });