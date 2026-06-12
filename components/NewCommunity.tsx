'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Search,
  Mic,
  FlaskConical,
  Dna,
  Settings,
  Zap,
  Microscope,
  Cpu,
  Battery,
  Trees,
  Music,
  BookOpen,
  Heart,
  Plus,
  Check,
} from 'lucide-react';

interface NewCommunityProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCommunity: (community: {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
    details: string[];
  }) => void;
}

// Yeni topluluklar (mevcut olmayan subjectler)
const NEW_COMMUNITIES = [
  {
    id: 'chemistry',
    name: 'Kimya',
    icon: <FlaskConical size={24} strokeWidth={1.5} />,
    color: '#10B981',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 100%)',
    borderColor: 'rgba(16,185,129,0.3)',
    details: ['Organik Kimya', 'Anorganik Kimya', 'Fizikokimya', 'Analitik Kimya', 'Biyokimya']
  },
  {
    id: 'biology',
    name: 'Biyoloji',
    icon: <Dna size={24} strokeWidth={1.5} />,
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(236,72,153,0.05) 100%)',
    borderColor: 'rgba(236,72,153,0.3)',
    details: ['Hücre Biyolojisi', 'Genetik', 'Evrim', 'Ekoloji', 'Anatomi']
  },
  {
    id: 'engineering',
    name: 'Mühendislik',
    icon: <Settings size={24} strokeWidth={1.5} />,
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0.05) 100%)',
    borderColor: 'rgba(245,158,11,0.3)',
    details: ['Makine Mühendisliği', 'Elektrik Mühendisliği', 'İnşaat Mühendisliği', 'Endüstri Mühendisliği', 'Mekatronik']
  },
  {
    id: 'electrical',
    name: 'Elektrik-Elektronik',
    icon: <Zap size={24} strokeWidth={1.5} />,
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 100%)',
    borderColor: 'rgba(59,130,246,0.3)',
    details: ['Devre Teorisi', 'Elektronik', 'Güç Sistemleri', 'Kontrol Sistemleri', 'Haberleşme']
  },
  {
    id: 'mechanical',
    name: 'Makine Mühendisliği',
    icon: <Cpu size={24} strokeWidth={1.5} />,
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 100%)',
    borderColor: 'rgba(139,92,246,0.3)',
    details: ['Termodinamik', 'Akışkanlar Mekaniği', 'Katı Mekaniği', 'Mekanizma Tekniği', 'İmalat Süreçleri']
  },
  {
    id: 'energy',
    name: 'Enerji Sistemleri',
    icon: <Battery size={24} strokeWidth={1.5} />,
    color: '#14B8A6',
    gradient: 'linear-gradient(135deg, rgba(20,184,166,0.15) 0%, rgba(20,184,166,0.05) 100%)',
    borderColor: 'rgba(20,184,166,0.3)',
    details: ['Yenilenebilir Enerji', 'Enerji Verimliliği', 'Güç Elektroniği', 'Akıllı Şebekeler', 'Enerji Depolama']
  },
  {
    id: 'environment',
    name: 'Çevre Bilimleri',
    icon: <Trees size={24} strokeWidth={1.5} />,
    color: '#22C55E',
    gradient: 'linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0.05) 100%)',
    borderColor: 'rgba(34,197,94,0.3)',
    details: ['Ekoloji', 'İklim Değişikliği', 'Su Kaynakları', 'Atık Yönetimi', 'Sürdürülebilirlik']
  },
  {
    id: 'architecture',
    name: 'Mimarlık',
    icon: <Heart size={24} strokeWidth={1.5} />,
    color: '#EF4444',
    gradient: 'linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.05) 100%)',
    borderColor: 'rgba(239,68,68,0.3)',
    details: ['Mimari Tasarım', 'Yapı Fiziği', 'Kent Planlama', 'İç Mimarlık', 'Peyzaj Mimarisi']
  },
  {
    id: 'music',
    name: 'Müzik Teorisi',
    icon: <Music size={24} strokeWidth={1.5} />,
    color: '#A855F7',
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(168,85,247,0.05) 100%)',
    borderColor: 'rgba(168,85,247,0.3)',
    details: ['Armoni', 'Kontrpuan', 'Müzik Tarihi', 'Kompozisyon', 'Müzik Teknolojisi']
  },
  {
    id: 'philosophy',
    name: 'Felsefe',
    icon: <BookOpen size={24} strokeWidth={1.5} />,
    color: '#6B7280',
    gradient: 'linear-gradient(135deg, rgba(107,114,128,0.15) 0%, rgba(107,114,128,0.05) 100%)',
    borderColor: 'rgba(107,114,128,0.3)',
    details: ['Epistemoloji', 'Etik', 'Mantık', 'Metafizik', 'Siyaset Felsefesi']
  },
];

const THEME = '#FBF4E2';
const ACCENT = '#C8A96E';

const NewCommunity: React.FC<NewCommunityProps> = ({ isOpen, onClose, onAddCommunity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState<typeof NEW_COMMUNITIES[0] | null>(null);

  const filteredCommunities = NEW_COMMUNITIES.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    if (selectedCommunity) {
      onAddCommunity({
        id: selectedCommunity.id,
        name: selectedCommunity.name,
        icon: selectedCommunity.icon,
        color: selectedCommunity.color,
        details: selectedCommunity.details,
      });
      setSelectedCommunity(null);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            zIndex: 3000,
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
              height: '80vh',
              maxHeight: 600,
              background: 'rgba(28, 24, 20, 0.96)',
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
                    color: THEME,
                    fontSize: 20,
                    fontWeight: 700,
                    margin: 0,
                    letterSpacing: '-0.3px',
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  Yeni Kategori Ekle
                </h3>
                <p
                  style={{
                    color: 'rgba(251,244,226,0.45)',
                    fontSize: 12,
                    marginTop: 4,
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  Odaklanmak istediğin bir alanı ekle
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
                }}
              >
                <X size={16} color={THEME} />
              </button>
            </div>

            {/* Arama Inputu */}
            <div style={{ padding: '16px 20px' }}>
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 250,
                  padding: '4px 4px 4px 16px',
                  border: '1px solid rgba(200,169,110,0.15)',
                }}
              >
                <Search size={18} color="rgba(251,244,226,0.5)" />
                <input
                  type="text"
                  placeholder="Kategori ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: THEME,
                    fontSize: 14,
                    padding: '10px 0',
                    fontFamily: 'Manrope, sans-serif',
                  }}
                />
                <button
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 250,
                    background: 'rgba(200,169,110,0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Mic size={18} color={ACCENT} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Topluluk Listesi */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '0 20px 20px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filteredCommunities.map((community) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedCommunity(community)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '14px 16px',
                      background: selectedCommunity?.id === community.id
                        ? `${community.color}15`
                        : 'rgba(255,255,255,0.03)',
                      borderRadius: 20,
                      border: selectedCommunity?.id === community.id
                        ? `1px solid ${community.color}`
                        : '1px solid rgba(200,169,110,0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: `${community.color}15`,
                        border: `1px solid ${community.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {React.cloneElement(community.icon, { color: community.color })}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: THEME, fontSize: 15, fontWeight: 600, margin: 0 }}>
                        {community.name}
                      </p>
                      <p style={{ color: 'rgba(251,244,226,0.45)', fontSize: 11, margin: '2px 0 0' }}>
                        {community.details.length} konu
                      </p>
                    </div>
                    {selectedCommunity?.id === community.id && (
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 250,
                          background: community.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Check size={14} color="#1a1208" strokeWidth={2} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: '16px 20px',
                borderTop: '1px solid rgba(200,169,110,0.08)',
                display: 'flex',
                gap: 12,
              }}
            >
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  borderRadius: 250,
                  border: '1px solid rgba(200,169,110,0.25)',
                  background: 'transparent',
                  color: 'rgba(251,244,226,0.6)',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                Vazgeç
              </button>
              <button
                onClick={handleAdd}
                disabled={!selectedCommunity}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  borderRadius: 250,
                  border: 'none',
                  background: !selectedCommunity
                    ? 'rgba(200,169,110,0.3)'
                    : `linear-gradient(135deg, ${selectedCommunity.color} 0%, ${selectedCommunity.color}CC 100%)`,
                  color: !selectedCommunity ? 'rgba(251,244,226,0.4)' : '#1a1208',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: !selectedCommunity ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                <Plus size={16} />
                Kategori Ekle
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewCommunity;