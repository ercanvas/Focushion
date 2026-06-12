'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Users,
  Target,
  Calendar,
  MessageCircle,
  Share2,
  Heart,
  TrendingUp,
  UserPlus,
} from 'lucide-react';

interface CommunityProps {
  isOpen: boolean;
  onClose: () => void;
  community: {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
    members: number;
    description: string;
    purpose: string;
    recentActivity: { id: string; title: string; date: string; type: string }[];
    upcomingEvents: { id: string; title: string; date: string; participants: number }[];
    stats: { label: string; value: string; icon: React.ReactNode }[];
  };
}

const THEME = '#FBF4E2';
const ACCENT = '#C8A96E';

const Community: React.FC<CommunityProps> = ({ isOpen, onClose, community }) => {
  const [joined, setJoined] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'activity' | 'events'>('about');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
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
              maxWidth: 400,
              height: '85vh',
              maxHeight: 650,
              background: 'rgba(28, 24, 20, 0.96)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderRadius: 32,
              border: `1px solid ${community.color}30`,
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
                padding: '24px 20px 16px',
                borderBottom: '1px solid rgba(200,169,110,0.08)',
                position: 'relative',
              }}
            >
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
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
                <X size={16} color="#FBF4E2" />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 18,
                    background: `${community.color}15`,
                    border: `1.5px solid ${community.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {community.icon}
                </div>
                <div>
                  <h2 style={{ color: THEME, fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-0.3px' }}>
                    {community.name}
                  </h2>
                  <p style={{ color: community.color, fontSize: 12, fontWeight: 500, margin: '4px 0 0' }}>
                    {formatNumber(community.members)} üye
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', padding: '12px 20px', gap: 8, borderBottom: '1px solid rgba(200,169,110,0.06)' }}>
              {[
                { id: 'about', label: 'Hakkında', icon: Target },
                { id: 'activity', label: 'Aktivite', icon: TrendingUp },
                { id: 'events', label: 'Etkinlikler', icon: Calendar },
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveTab(tab.id as 'about' | 'activity' | 'events')}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 250,
                      border: 'none',
                      background: isActive ? `rgba(200,169,110,0.12)` : 'transparent',
                      color: isActive ? ACCENT : 'rgba(251,244,226,0.5)',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                    }}
                  >
                    <IconComponent size={14} strokeWidth={1.5} />
                    {tab.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              {activeTab === 'about' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <div style={{ marginBottom: 20 }}>
                    <h3 style={{ color: THEME, fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Topluluk Amacı</h3>
                    <p style={{ color: 'rgba(251,244,226,0.6)', fontSize: 13, lineHeight: 1.5 }}>{community.purpose}</p>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <h3 style={{ color: THEME, fontSize: 15, fontWeight: 600, marginBottom: 12 }}>İstatistikler</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                      {community.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 16,
                            padding: '12px 8px',
                            textAlign: 'center',
                          }}
                        >
                          <div style={{ color: ACCENT, marginBottom: 6 }}>{stat.icon}</div>
                          <p style={{ color: THEME, fontSize: 18, fontWeight: 700, margin: 0 }}>{stat.value}</p>
                          <p style={{ color: 'rgba(251,244,226,0.4)', fontSize: 10, margin: 0 }}>{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Join Button */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setJoined(!joined)}
                    style={{
                      width: '100%',
                      padding: '14px 0',
                      borderRadius: 250,
                      border: 'none',
                      background: joined
                        ? 'rgba(74,222,128,0.15)'
                        : `linear-gradient(135deg, ${community.color} 0%, ${community.color}CC 100%)`,
                      color: joined ? '#4ade80' : '#1a1208',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                    }}
                  >
                    {joined ? (
                      <>
                        <Users size={16} />
                        Topluluğa Katıldın
                      </>
                    ) : (
                      <>
                        <UserPlus size={16} />
                        Topluluğa Katıl
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}

              {activeTab === 'activity' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  {community.recentActivity.map((activity, idx) => (
                    <div
                      key={activity.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '12px 0',
                        borderBottom: '1px solid rgba(200,169,110,0.06)',
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: `${community.color}10`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {activity.type === 'discussion' ? (
                          <MessageCircle size={16} color={community.color} />
                        ) : activity.type === 'share' ? (
                          <Share2 size={16} color={community.color} />
                        ) : (
                          <Heart size={16} color={community.color} />
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ color: THEME, fontSize: 13, margin: 0 }}>{activity.title}</p>
                        <p style={{ color: 'rgba(251,244,226,0.4)', fontSize: 11, margin: 0 }}>{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'events' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  {community.upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      style={{
                        padding: '14px',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: 20,
                        marginBottom: 12,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <Calendar size={16} color={community.color} />
                        <span style={{ color: THEME, fontSize: 14, fontWeight: 600 }}>{event.title}</span>
                      </div>
                      <p style={{ color: 'rgba(251,244,226,0.5)', fontSize: 12, margin: '0 0 8px 26px' }}>{event.date}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 26 }}>
                        <Users size={12} color="rgba(251,244,226,0.4)" />
                        <span style={{ color: 'rgba(251,244,226,0.4)', fontSize: 11 }}>{event.participants} katılımcı</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Community;