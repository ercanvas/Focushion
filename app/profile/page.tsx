'use client';

import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  User,
  Edit2,
  Share2,
  AlertCircle,
  LogOut,
  Bell,
  Moon,
  Globe,
  Lock,
  HelpCircle,
  Info,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Smartphone,
  Eye,
  Database,
  MessageCircle,
  Star,
  Focus,
  Compass,
  Users,
} from 'lucide-react';
import Loading from '@/components/Loading';

const THEME = '#FBF4E2';
const ACCENT = '#C8A96E';

const currentUser = {
  name: 'Mehmet Demir',
  username: 'mehmet_demir',
  avatar: 'MD',
  color: '#34D399',
  email: 'mehmet@focushion.com',
  joinDate: '2024',
};

// FIX: Discriminated union — her item tipi kendi alanlarına sahip
type ToggleItem = {
  icon: React.ElementType;
  label: string;
  type: 'toggle';
  value: boolean;
  onChange: () => void;
};

type SelectItem = {
  icon: React.ElementType;
  label: string;
  type: 'select';
  value: string;
  options?: string[];
};

type ValueItem = {
  icon: React.ElementType;
  label: string;
  type: 'value';
  value: string;
};

type NavItem = {
  icon: React.ElementType;
  label: string;
  type: 'nav';
  value?: string;
};

type SettingsItem = ToggleItem | SelectItem | ValueItem | NavItem;

type SettingsSection = {
  title: string;
  items: SettingsItem[];
};

function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/');
    }, 500);
  };

  const handleEditProfile = () => console.log('Edit profile');
  const handleShareProfile = () => console.log('Share profile');
  const handleReportIssue = () => console.log('Report issue');

  const settingsSections: SettingsSection[] = [
    {
      title: 'Tercihler',
      items: [
        {
          icon: Bell,
          label: 'Bildirimler',
          type: 'toggle',
          value: notificationsEnabled,
          onChange: () => setNotificationsEnabled(prev => !prev),
        },
        {
          icon: Moon,
          label: 'Karanlık Mod',
          type: 'toggle',
          value: darkModeEnabled,
          onChange: () => setDarkModeEnabled(prev => !prev),
        },
        {
          icon: Globe,
          label: 'Dil',
          type: 'select',
          value: 'Türkçe',
          options: ['Türkçe', 'English', 'Deutsch', 'Français'],
        },
        {
          icon: Smartphone,
          label: 'Otomatik Oynatma',
          type: 'toggle',
          value: autoPlayEnabled,
          onChange: () => setAutoPlayEnabled(prev => !prev),
        },
      ],
    },
    {
      title: 'Gizlilik ve Güvenlik',
      items: [
        { icon: Lock, label: 'Hesap Gizliliği', type: 'select', value: 'Herkes' },
        { icon: Eye, label: 'Profili Görüntüleyenler', type: 'value', value: '1.2K' },
        { icon: Database, label: 'Veri Yönetimi', type: 'nav' },
      ],
    },
    {
      title: 'Odaklanma',
      items: [
        { icon: Focus, label: 'Günlük Hedef', type: 'select', value: '2 saat' },
        { icon: Star, label: 'Başarılar', type: 'value', value: '12' },
        { icon: MessageCircle, label: 'Bildirim Ayarları', type: 'nav' },
      ],
    },
    {
      title: 'Destek',
      items: [
        { icon: HelpCircle, label: 'Yardım', type: 'nav' },
        { icon: Info, label: 'Hakkında', type: 'nav', value: 'v1.0.0' },
      ],
    },
  ];

  return (
    <IonPage>
      <Loading isLoading={isLoading} />
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
            background: 'linear-gradient(180deg, rgba(200,169,110,0.2) 0%, rgba(12,8,4,0.85) 45%, rgba(5,3,1,0.98) 100%)',
          }}
        />
      </div>

      <IonContent
        scrollY={true}
        style={{ '--background': 'transparent', position: 'relative', zIndex: 1 } as React.CSSProperties}
      >
        <div className="fr relative flex flex-col min-h-full mx-auto" style={{ maxWidth: 430 }}>

          {/* Back Button */}
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              zIndex: 20,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: 250,
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => router.back()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>

          {/* Profile Header */}
          <div
            style={{
              height: '45%',
              minHeight: 380,
              background: '#12100D',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 40,
              paddingBottom: 30,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 50% 100%, rgba(200,169,110,0.15), transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                background: `linear-gradient(135deg, ${currentUser.color}40, ${currentUser.color}20)`,
                border: `3px solid ${currentUser.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
            >
              <span style={{ fontSize: 40, fontWeight: 700, color: currentUser.color }}>
                {currentUser.avatar}
              </span>
            </motion.div>

            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{ color: THEME, fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.3px' }}
            >
              {currentUser.name}
            </motion.h2>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              style={{ color: 'rgba(251,244,226,0.5)', fontSize: 14, fontWeight: 500, margin: '4px 0 24px 0' }}
            >
              @{currentUser.username}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                display: 'flex',
                gap: 12,
                padding: '0 20px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {[
                { label: 'Profili Düzenle', icon: Edit2, onClick: handleEditProfile, danger: false },
                { label: 'Profili Paylaş', icon: Share2, onClick: handleShareProfile, danger: false },
                { label: 'Sorun Belirt', icon: AlertCircle, onClick: handleReportIssue, danger: true },
                { label: 'Oturumu Kapat', icon: LogOut, onClick: handleLogout, danger: true },
              ].map(({ label, icon: Icon, onClick, danger }) => (
                <button
                  key={label}
                  onClick={onClick}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 250,
                    border: `1px solid ${danger ? 'rgba(239,68,68,0.3)' : 'rgba(200,169,110,0.3)'}`,
                    background: danger ? 'rgba(239,68,68,0.1)' : 'rgba(200,169,110,0.1)',
                    backdropFilter: 'blur(10px)',
                    color: danger ? '#ef4444' : THEME,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Settings List */}
          <div className="flex-1 px-4 py-6 pb-32 overflow-y-auto no-scrollbar">
            {settingsSections.map((section, sectionIdx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + sectionIdx * 0.1 }}
                style={{ marginBottom: 24 }}
              >
                <h3
                  style={{
                    color: ACCENT,
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    marginBottom: 12,
                    paddingLeft: 8,
                  }}
                >
                  {section.title}
                </h3>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 24,
                    border: '1px solid rgba(200,169,110,0.1)',
                    overflow: 'hidden',
                  }}
                >
                  {section.items.map((item, itemIdx) => {
                    const IconComponent = item.icon;
                    const isLast = itemIdx === section.items.length - 1;
                    return (
                      <div
                        key={item.label}
                        onClick={() => {
                          if (item.type === 'nav') console.log('Navigate to:', item.label);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '16px 20px',
                          borderBottom: isLast ? 'none' : '1px solid rgba(200,169,110,0.08)',
                          cursor: item.type === 'nav' ? 'pointer' : 'default',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          if (item.type === 'nav') e.currentTarget.style.background = 'rgba(200,169,110,0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: 10,
                              background: 'rgba(200,169,110,0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <IconComponent size={18} color={ACCENT} strokeWidth={1.5} />
                          </div>
                          <span style={{ color: THEME, fontSize: 15, fontWeight: 500 }}>
                            {item.label}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {item.type === 'toggle' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                item.onChange();
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              {item.value ? (
                                <ToggleRight size={28} color={ACCENT} strokeWidth={1.5} />
                              ) : (
                                <ToggleLeft size={28} color="rgba(251,244,226,0.3)" strokeWidth={1.5} />
                              )}
                            </button>
                          )}
                          {item.type === 'select' && (
                            <>
                              <span style={{ color: 'rgba(251,244,226,0.5)', fontSize: 14 }}>
                                {item.value}
                              </span>
                              <ChevronRight size={16} color="rgba(251,244,226,0.3)" />
                            </>
                          )}
                          {item.type === 'value' && (
                            <span style={{ color: 'rgba(251,244,226,0.5)', fontSize: 14 }}>
                              {item.value}
                            </span>
                          )}
                          {item.type === 'nav' && (
                            <>
                              {item.value && (
                                <span style={{ color: 'rgba(251,244,226,0.5)', fontSize: 14 }}>
                                  {item.value}
                                </span>
                              )}
                              <ChevronRight size={16} color="rgba(251,244,226,0.3)" />
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}

            <div
              style={{
                textAlign: 'center',
                padding: '20px 0',
                color: 'rgba(251,244,226,0.25)',
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              Focushion v1.0.0
            </div>
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
                  {[
                    { icon: Focus, label: 'Odaklan', path: '/session/subject', active: false },
                    { icon: Compass, label: 'Keşfet', path: '/explore', active: false },
                    { icon: Users, label: 'Buluş', path: '/meet/search', active: false },
                    { icon: User, label: 'Profil', path: '/profile', active: true },
                  ].map((navItem) => {
                    const IconComponent = navItem.icon;
                    const isActiveItem = navItem.active;
                    return (
                      <motion.button
                        key={navItem.label}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push(navItem.path)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 4,
                          background: isActiveItem ? 'rgba(200,169,110,0.15)' : 'transparent',
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
                          {navItem.label}
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

export default dynamic(() => Promise.resolve(ProfilePage), { ssr: false });