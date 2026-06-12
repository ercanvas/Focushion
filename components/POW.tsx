'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trophy,
  FileText,
  Image as ImageIcon,
  Video,
  Plus,
  CheckCircle,
  Target,
  Flame,
  Clock,
  Camera,
  Code,
  Palette,
  Briefcase,
  Globe,
  Atom,
} from 'lucide-react';
import Notes from './Notes';
import RecordFocus from './RecordFocus';

interface POWProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Achievement {
  id: string;
  title: string;
  date: string;
  type: 'achievement';
  icon: React.ReactNode;
  color: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'note';
  category: 'math' | 'physics' | 'cs' | 'design' | 'language' | 'business';
  color: string;
}

interface Media {
  id: string;
  title: string;
  date: string;
  type: 'image' | 'video';
  thumbnail?: string;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: 'İlk Odaklanma', date: '15 Mayıs 2024', type: 'achievement', icon: <Target size={18} />, color: '#60A5FA' },
  { id: '2', title: '7 Gün Seri', date: '22 Mayıs 2024', type: 'achievement', icon: <Flame size={18} />, color: '#F97316' },
  { id: '3', title: '25 Saat', date: '1 Haziran 2024', type: 'achievement', icon: <Clock size={18} />, color: '#34D399' },
  { id: '4', title: 'Python Uzmanı', date: '10 Haziran 2024', type: 'achievement', icon: <Code size={18} />, color: '#F472B6' },
];

const NOTES: Note[] = [
  { id: '1', title: 'Python Fonksiyonlar', content: 'Bugün fonksiyonlar ve parametreler üzerine çalıştım. Lambda fonksiyonlarını öğrendim.', date: '12 Haziran 2024', type: 'note', category: 'cs', color: '#F472B6' },
  { id: '2', title: 'Proje Fikirleri', content: 'Yeni bir mobil uygulama fikri: Odaklanma asistanı. Kullanıcıların odaklanma sürelerini artırmak için çeşitli özellikler.', date: '11 Haziran 2024', type: 'note', category: 'business', color: '#FBBF24' },
  { id: '3', title: 'UI/UX Notları', content: 'Apple Human Interface Guidelines okudum. Glassmorphism trendi ve kullanım alanları.', date: '9 Haziran 2024', type: 'note', category: 'design', color: '#A78BFA' },
  { id: '4', title: 'Almanca Kelimeler', content: 'der, die, das artikelleri ve günlük konuşma kalıpları. Temel seviye tamamlandı.', date: '8 Haziran 2024', type: 'note', category: 'language', color: '#F87171' },
];

const MEDIA: Media[] = [
  { id: '1', title: 'Çalışma Masam', date: '10 Haziran 2024', type: 'image' },
  { id: '2', title: 'Seans Kaydı', date: '8 Haziran 2024', type: 'video' },
  { id: '3', title: 'Not Defterim', date: '5 Haziran 2024', type: 'image' },
];

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  math: { bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.3)', text: '#60A5FA' },
  physics: { bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)', text: '#34D399' },
  cs: { bg: 'rgba(244,114,182,0.12)', border: 'rgba(244,114,182,0.3)', text: '#F472B6' },
  design: { bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.3)', text: '#A78BFA' },
  language: { bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.3)', text: '#F87171' },
  business: { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.3)', text: '#FBBF24' },
};

const categoryNames: Record<string, string> = {
  math: 'Matematik',
  physics: 'Fizik',
  cs: 'Bilgisayar',
  design: 'Tasarım',
  language: 'Dil',
  business: 'İş',
};

const categoryIcons: Record<string, React.ReactNode> = {
  math: <Target size={12} />,
  physics: <Atom size={12} />,
  cs: <Code size={12} />,
  design: <Palette size={12} />,
  language: <Globe size={12} />,
  business: <Briefcase size={12} />,
};

const ACCENT = '#C8A96E';

const POW: React.FC<POWProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'notes' | 'media'>('achievements');
  const [showNotes, setShowNotes] = useState(false);
  const [showRecord, setShowRecord] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isPOWVisible, setIsPOWVisible] = useState(true);

  const handleAddNote = () => {
    setSelectedNote(null);
    setIsPOWVisible(false);
    setShowNotes(true);
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsPOWVisible(false);
    setShowNotes(true);
  };

  const handleCloseNotes = () => {
    setShowNotes(false);
    setSelectedNote(null);
    setIsPOWVisible(true);
  };

  const handleAddMedia = () => {
    setShowRecord(true);
  };

  const handleSaveNote = (noteContent: string) => {
    console.log('Note saved:', noteContent);
    handleCloseNotes();
  };

  const handleRecordClose = () => {
    setShowRecord(false);
  };

  const stats = [
    { icon: <Trophy size={20} />, value: '4', label: 'Başarı', color: ACCENT },
    { icon: <Flame size={20} />, value: '14', label: 'Gün Seri', color: '#F97316' },
    { icon: <Clock size={20} />, value: '42', label: 'Saat', color: '#34D399' },
  ];

  return (
    <>
      <Notes
        isOpen={showNotes}
        onClose={handleCloseNotes}
        initialNotes={selectedNote?.content || ''}
        onSave={handleSaveNote}
      />
      
      <RecordFocus isOpen={showRecord} onClose={handleRecordClose} />

      <AnimatePresence>
        {isOpen && isPOWVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              zIndex: 2500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              style={{
                width: '100%',
                maxWidth: 420,
                height: '85vh',
                maxHeight: 650,
                background: 'rgba(28, 24, 20, 0.92)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                borderRadius: 32,
                border: '1px solid rgba(200,169,110,0.15)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                style={{
                  padding: '20px 20px 16px',
                  borderBottom: '1px solid rgba(200,169,110,0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3
                    style={{
                      color: '#FBF4E2',
                      fontSize: 20,
                      fontWeight: 700,
                      margin: 0,
                      letterSpacing: '-0.3px',
                      fontFamily: 'Manrope, sans-serif',
                    }}
                  >
                    Kayıt Defteri
                  </h3>
                  <p
                    style={{
                      color: 'rgba(251,244,226,0.45)',
                      fontSize: 12,
                      marginTop: 4,
                      fontFamily: 'Manrope, sans-serif',
                    }}
                  >
                    Başarıların ve anıların
                  </p>
                </div>
                <button
                  onClick={onClose}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 250,
                    background: 'rgba(200,169,110,0.08)',
                    border: '1px solid rgba(200,169,110,0.15)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(200,169,110,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(200,169,110,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(200,169,110,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(200,169,110,0.15)';
                  }}
                >
                  <X size={16} color="#FBF4E2" />
                </button>
              </div>

              {/* Tabs */}
              <div
                style={{
                  display: 'flex',
                  padding: '12px 20px',
                  gap: 6,
                  borderBottom: '1px solid rgba(200,169,110,0.06)',
                }}
              >
                {[
                  { id: 'achievements', label: 'Başarılar', icon: Trophy },
                  { id: 'notes', label: 'Notlar', icon: FileText },
                  { id: 'media', label: 'Medya', icon: ImageIcon },
                ].map((tab) => {
                  const IconComponent = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <motion.button
                      key={tab.id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveTab(tab.id as 'achievements' | 'notes' | 'media')}
                      style={{
                        flex: 1,
                        padding: '10px 12px',
                        borderRadius: 250,
                        border: 'none',
                        background: isActive ? 'rgba(200,169,110,0.12)' : 'transparent',
                        backdropFilter: isActive ? 'blur(10px)' : 'none',
                        color: isActive ? ACCENT : 'rgba(251,244,226,0.5)',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: 'Manrope, sans-serif',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        transition: 'all 0.2s',
                      }}
                    >
                      <IconComponent size={14} strokeWidth={1.5} />
                      {tab.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* Content */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '20px',
                }}
              >
                {/* Achievements Tab */}
                {activeTab === 'achievements' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Stats Cards */}
                    <div
                      style={{
                        display: 'flex',
                        gap: 12,
                        marginBottom: 24,
                      }}
                    >
                      {stats.map((stat, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          style={{
                            flex: 1,
                            background: 'rgba(255,255,255,0.03)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 20,
                            padding: '14px 8px',
                            textAlign: 'center',
                            border: '1px solid rgba(200,169,110,0.08)',
                          }}
                        >
                          <div style={{ color: stat.color, marginBottom: 8 }}>
                            {stat.icon}
                          </div>
                          <span style={{ color: '#FBF4E2', fontSize: 22, fontWeight: 700, fontFamily: 'Manrope, sans-serif' }}>
                            {stat.value}
                          </span>
                          <p style={{ color: 'rgba(251,244,226,0.45)', fontSize: 11, margin: 0, fontFamily: 'Manrope, sans-serif' }}>
                            {stat.label}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Achievement List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {ACHIEVEMENTS.map((item, idx) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14,
                            padding: '12px 16px',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: 20,
                            border: '1px solid rgba(200,169,110,0.06)',
                          }}
                        >
                          <div
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: 14,
                              background: `${item.color}15`,
                              border: `1px solid ${item.color}30`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <span style={{ color: item.color }}>{item.icon}</span>
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ color: '#FBF4E2', fontSize: 14, fontWeight: 600, margin: 0, fontFamily: 'Manrope, sans-serif' }}>
                              {item.title}
                            </p>
                            <p style={{ color: 'rgba(251,244,226,0.4)', fontSize: 11, margin: 0, fontFamily: 'Manrope, sans-serif' }}>
                              {item.date}
                            </p>
                          </div>
                          <CheckCircle size={18} color="#4ade80" strokeWidth={1.5} />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Notes Tab */}
                {activeTab === 'notes' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Add Note Button */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAddNote}
                      style={{
                        width: '100%',
                        padding: '14px 0',
                        borderRadius: 250,
                        border: '1px dashed rgba(200,169,110,0.3)',
                        background: 'rgba(200,169,110,0.04)',
                        color: ACCENT,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        marginBottom: 20,
                        fontFamily: 'Manrope, sans-serif',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(200,169,110,0.08)';
                        e.currentTarget.style.borderColor = 'rgba(200,169,110,0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(200,169,110,0.04)';
                        e.currentTarget.style.borderColor = 'rgba(200,169,110,0.3)';
                      }}
                    >
                      <Plus size={16} strokeWidth={1.5} />
                      Yeni Not Ekle
                    </motion.button>

                    {/* Notes List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {NOTES.map((note, idx) => {
                        const colors = categoryColors[note.category];
                        return (
                          <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => handleEditNote(note)}
                            style={{
                              padding: '16px',
                              background: colors.bg,
                              borderRadius: 20,
                              border: `1px solid ${colors.border}`,
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateX(0)';
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                              <div
                                style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: 10,
                                  background: `${colors.text}15`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                {categoryIcons[note.category]}
                              </div>
                              <span style={{ color: colors.text, fontSize: 11, fontWeight: 600, fontFamily: 'Manrope, sans-serif' }}>
                                {categoryNames[note.category]}
                              </span>
                              <span style={{ flex: 1 }} />
                              <span style={{ color: 'rgba(251,244,226,0.35)', fontSize: 10, fontFamily: 'Manrope, sans-serif' }}>
                                {note.date}
                              </span>
                            </div>
                            <h4 style={{ color: '#FBF4E2', fontSize: 15, fontWeight: 600, margin: 0, marginBottom: 6, fontFamily: 'Manrope, sans-serif' }}>
                              {note.title}
                            </h4>
                            <p style={{ color: 'rgba(251,244,226,0.6)', fontSize: 12, margin: 0, lineHeight: 1.4, fontFamily: 'Manrope, sans-serif' }}>
                              {note.content.length > 80 ? note.content.substring(0, 80) + '...' : note.content}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Media Tab */}
                {activeTab === 'media' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Add Media Button */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAddMedia}
                      style={{
                        width: '100%',
                        padding: '14px 0',
                        borderRadius: 250,
                        border: '1px dashed rgba(200,169,110,0.3)',
                        background: 'rgba(200,169,110,0.04)',
                        color: ACCENT,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        marginBottom: 20,
                        fontFamily: 'Manrope, sans-serif',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(200,169,110,0.08)';
                        e.currentTarget.style.borderColor = 'rgba(200,169,110,0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(200,169,110,0.04)';
                        e.currentTarget.style.borderColor = 'rgba(200,169,110,0.3)';
                      }}
                    >
                      <Camera size={16} strokeWidth={1.5} />
                      Yeni Medya Ekle
                    </motion.button>

                    {/* Media Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 12,
                      }}
                    >
                      {MEDIA.map((item, idx) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          style={{
                            aspectRatio: '1',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 20,
                            border: '1px solid rgba(200,169,110,0.08)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 10,
                            transition: 'all 0.2s',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                            e.currentTarget.style.borderColor = 'rgba(200,169,110,0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                            e.currentTarget.style.borderColor = 'rgba(200,169,110,0.08)';
                          }}
                        >
                          {item.type === 'image' ? (
                            <ImageIcon size={32} color="#34D399" strokeWidth={1.5} />
                          ) : (
                            <Video size={32} color="#F472B6" strokeWidth={1.5} />
                          )}
                          <p style={{ color: '#FBF4E2', fontSize: 13, fontWeight: 600, margin: 0, fontFamily: 'Manrope, sans-serif' }}>
                            {item.title}
                          </p>
                          <p style={{ color: 'rgba(251,244,226,0.4)', fontSize: 10, margin: 0, fontFamily: 'Manrope, sans-serif' }}>
                            {item.date}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default POW;