'use client';

import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  User,
  Focus,
  Compass,
  Users,
  Heart,
  Search,
  Mic,
  TrendingUp,
  Calendar,
  MessageCircle,
  Share2,
  Calculator,
  Atom,
  Briefcase,
  Code2,
  Palette,
  Languages,
} from 'lucide-react';
import Community from '@/components/Community';

const THEME = '#FBF4E2';
const ACCENT = '#C8A96E';

interface ActivityItem {
  id: string;
  title: string;
  date: string;
  type: string;
}

interface EventItem {
  id: string;
  title: string;
  date: string;
  participants: number;
}

interface StatItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface CommunityType {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  members: number;
  description: string;
  purpose: string;
  banner: string;
  recentActivity: ActivityItem[];
  upcomingEvents: EventItem[];
  stats: StatItem[];
}

// Topluluklar - session/subject'teki konulara göre
const COMMUNITIES: CommunityType[] = [
  {
    id: 'math',
    name: 'Matematik Topluluğu',
    icon: <Calculator size={28} color="#60A5FA" strokeWidth={1.5} />,
    color: '#60A5FA',
    members: 15420,
    description: 'Sayıların ve formüllerin gizemli dünyasında birlikte yol alıyoruz.',
    purpose: 'Matematiksel düşünceyi geliştirmek, problem çözme becerilerini paylaşmak ve ilham verici matematik içerikleri üretmek.',
    banner: 'math',
    recentActivity: [
      { id: 'm1', title: 'Kalkülüs sorusu üzerine tartışma', date: '2 saat önce', type: 'discussion' },
      { id: 'm2', title: 'Lineer Cebir çalışma grubu kuruldu', date: '5 saat önce', type: 'share' },
      { id: 'm3', title: 'Yeni teorem paylaşımı', date: '1 gün önce', type: 'like' },
    ],
    upcomingEvents: [
      { id: 'me1', title: 'Haftalık Matematik Buluşması', date: '15 Haziran 2024', participants: 128 },
      { id: 'me2', title: 'Online Problem Çözme Seansı', date: '18 Haziran 2024', participants: 64 },
    ],
    stats: [
      { label: 'Gönderi', value: '2.4K', icon: <MessageCircle size={16} /> },
      { label: 'Tartışma', value: '856', icon: <Share2 size={16} /> },
      { label: 'Etkinlik', value: '24', icon: <Calendar size={16} /> },
    ],
  },
  {
    id: 'physics',
    name: 'Fizik Topluluğu',
    icon: <Atom size={28} color="#34D399" strokeWidth={1.5} />,
    color: '#34D399',
    members: 12890,
    description: 'Evrenin işleyişini birlikte keşfediyoruz.',
    purpose: 'Fizik bilimini derinlemesine anlamak, deneyimleri paylaşmak ve bilimsel tartışmalar yapmak.',
    banner: 'physics',
    recentActivity: [
      { id: 'p1', title: 'Kuantum fiziği üzerine yeni makale', date: '3 saat önce', type: 'share' },
      { id: 'p2', title: 'Deney paylaşımı: Işık kırınımı', date: '6 saat önce', type: 'discussion' },
      { id: 'p3', title: 'Tesla hakkında ilginç bilgiler', date: '1 gün önce', type: 'like' },
    ],
    upcomingEvents: [
      { id: 'pe1', title: 'Astrofizik Söyleşisi', date: '16 Haziran 2024', participants: 256 },
      { id: 'pe2', title: 'Sanal Laboratuvar Atölyesi', date: '20 Haziran 2024', participants: 89 },
    ],
    stats: [
      { label: 'Gönderi', value: '1.8K', icon: <MessageCircle size={16} /> },
      { label: 'Tartışma', value: '624', icon: <Share2 size={16} /> },
      { label: 'Etkinlik', value: '18', icon: <Calendar size={16} /> },
    ],
  },
  {
    id: 'cs',
    name: 'Bilgisayar Bilimleri',
    icon: <Code2 size={28} color="#F472B6" strokeWidth={1.5} />,
    color: '#F472B6',
    members: 23450,
    description: 'Yazılım, yapay zeka ve teknolojinin geleceğini birlikte şekillendiriyoruz.',
    purpose: 'Yazılım geliştirme, yapay zeka, veri bilimi ve teknoloji trendlerini takip etmek.',
    banner: 'cs',
    recentActivity: [
      { id: 'c1', title: 'Python ile veri analizi eğitimi', date: '1 saat önce', type: 'share' },
      { id: 'c2', title: 'Yapay zeka etik tartışması', date: '4 saat önce', type: 'discussion' },
      { id: 'c3', title: 'Açık kaynak proje duyurusu', date: '1 gün önce', type: 'like' },
    ],
    upcomingEvents: [
      { id: 'ce1', title: 'Hackathon 2024', date: '22-23 Haziran 2024', participants: 512 },
      { id: 'ce2', title: 'AI Workshop: Derin Öğrenme', date: '25 Haziran 2024', participants: 178 },
    ],
    stats: [
      { label: 'Gönderi', value: '4.2K', icon: <MessageCircle size={16} /> },
      { label: 'Tartışma', value: '1.2K', icon: <Share2 size={16} /> },
      { label: 'Etkinlik', value: '32', icon: <Calendar size={16} /> },
    ],
  },
  {
    id: 'design',
    name: 'Tasarım Topluluğu',
    icon: <Palette size={28} color="#A78BFA" strokeWidth={1.5} />,
    color: '#A78BFA',
    members: 9870,
    description: 'Yaratıcı fikirleri görsel sanatlarla buluşturuyoruz.',
    purpose: 'UI/UX, grafik tasarım, illüstrasyon ve yaratıcı süreçleri paylaşmak.',
    banner: 'design',
    recentActivity: [
      { id: 'd1', title: 'Figma ile prototipleme eğitimi', date: '2 saat önce', type: 'share' },
      { id: 'd2', title: 'Renk teorisi tartışması', date: '7 saat önce', type: 'discussion' },
      { id: 'd3', title: 'Minimalist logo tasarımı', date: '2 gün önce', type: 'like' },
    ],
    upcomingEvents: [
      { id: 'de1', title: 'Portfolyo Değerlendirme Günü', date: '17 Haziran 2024', participants: 92 },
      { id: 'de2', title: 'Motion Design Atölyesi', date: '21 Haziran 2024', participants: 67 },
    ],
    stats: [
      { label: 'Gönderi', value: '1.2K', icon: <MessageCircle size={16} /> },
      { label: 'Tartışma', value: '432', icon: <Share2 size={16} /> },
      { label: 'Etkinlik', value: '15', icon: <Calendar size={16} /> },
    ],
  },
  {
    id: 'language',
    name: 'Dil Öğrenimi',
    icon: <Languages size={28} color="#F87171" strokeWidth={1.5} />,
    color: '#F87171',
    members: 11230,
    description: 'Farklı dilleri ve kültürleri birlikte keşfediyoruz.',
    purpose: 'Yabancı dil pratiği, çeviri çalışmaları ve kültürel etkileşim.',
    banner: 'language',
    recentActivity: [
      { id: 'l1', title: 'İngilizce deyimler üzerine sohbet', date: '3 saat önce', type: 'discussion' },
      { id: 'l2', title: 'Almanca kaynak önerileri', date: '8 saat önce', type: 'share' },
      { id: 'l3', title: 'Japonca çalışma grubu', date: '2 gün önce', type: 'like' },
    ],
    upcomingEvents: [
      { id: 'le1', title: 'Konuşma Kulübü (İngilizce)', date: '19 Haziran 2024', participants: 145 },
      { id: 'le2', title: 'Kültür Günü: Japonya', date: '23 Haziran 2024', participants: 88 },
    ],
    stats: [
      { label: 'Gönderi', value: '1.5K', icon: <MessageCircle size={16} /> },
      { label: 'Tartışma', value: '567', icon: <Share2 size={16} /> },
      { label: 'Etkinlik', value: '21', icon: <Calendar size={16} /> },
    ],
  },
  {
    id: 'business',
    name: 'İş Hayatı',
    icon: <Briefcase size={28} color="#FBBF24" strokeWidth={1.5} />,
    color: '#FBBF24',
    members: 8760,
    description: 'Kariyer, girişimcilik ve iş dünyasında birlikte büyüyoruz.',
    purpose: 'Kariyer gelişimi, girişimcilik hikayeleri, iş stratejileri ve networking.',
    banner: 'business',
    recentActivity: [
      { id: 'b1', title: 'LinkedIn profili iyileştirme ipuçları', date: '1 saat önce', type: 'share' },
      { id: 'b2', title: 'Startup deneyimleri paylaşımı', date: '5 saat önce', type: 'discussion' },
      { id: 'b3', title: 'Yatırım tavsiyeleri', date: '1 gün önce', type: 'like' },
    ],
    upcomingEvents: [
      { id: 'be1', title: 'Kariyer Zirvesi 2024', date: '28 Haziran 2024', participants: 345 },
      { id: 'be2', title: 'Girişimcilik Atölyesi', date: '30 Haziran 2024', participants: 112 },
    ],
    stats: [
      { label: 'Gönderi', value: '987', icon: <MessageCircle size={16} /> },
      { label: 'Tartışma', value: '345', icon: <Share2 size={16} /> },
      { label: 'Etkinlik', value: '12', icon: <Calendar size={16} /> },
    ],
  },
];

// Popüler postlar
const popularPosts = [
  { id: 1, community: 'Bilgisayar Bilimleri', title: 'Yapay Zeka ile Geleceğe Yolculuk', likes: 234, comments: 45, color: '#F472B6' },
  { id: 2, community: 'Matematik Topluluğu', title: 'Kalkülüsün Günlük Hayattaki Yeri', likes: 189, comments: 32, color: '#60A5FA' },
  { id: 3, community: 'Tasarım Topluluğu', title: 'Minimalist Tasarımın Gücü', likes: 156, comments: 28, color: '#A78BFA' },
];

function CommunityPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [memberRange, setMemberRange] = useState(50000);
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityType | null>(null);

  const filteredCommunities = COMMUNITIES.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMembers = community.members <= memberRange;
    return matchesSearch && matchesMembers;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const navItems = [
    { icon: Focus, label: 'Odaklan', path: '/session/subject', active: false },
    { icon: Compass, label: 'Keşfet', path: '/explore', active: false },
    { icon: Users, label: 'Buluş', path: '/meet/search', active: false },
    { icon: User, label: 'Profil', path: '/profile', active: false },
  ];

  return (
    <IonPage>
      {selectedCommunity && (
        <Community
          isOpen={!!selectedCommunity}
          onClose={() => setSelectedCommunity(null)}
          community={selectedCommunity}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .fr * { font-family: 'Inter', -apple-system, sans-serif !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        input[type="range"] {
          -webkit-appearance: none;
          background: rgba(200,169,110,0.2);
          border-radius: 10px;
          height: 4px;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 18px;
          background: ${ACCENT};
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
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
                <span style={{ color: THEME, fontSize: 18, fontWeight: 700, letterSpacing: '-0.3px' }}>
                  Topluluklar
                </span>
                <p style={{ color: 'rgba(251,244,226,0.4)', fontSize: 11, margin: 0 }}>
                  Keşfet, bağlan, birlikte büyü
                </p>
              </div>
            </div>
          </motion.div>

          {/* Arama Bölümü */}
          <div className="px-6 pt-6 pb-4">
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
                placeholder="Topluluk ara..."
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

            {/* Range Slider */}
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Users size={12} color="rgba(251,244,226,0.4)" />
                  <span style={{ color: 'rgba(251,244,226,0.5)', fontSize: 11 }}>Üye sayısı</span>
                </div>
                <span style={{ color: ACCENT, fontSize: 12, fontWeight: 600 }}>0 - {formatNumber(memberRange)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                value={memberRange}
                onChange={(e) => setMemberRange(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Popüler Postlar */}
          <div className="px-6 mb-6">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <TrendingUp size={16} color={ACCENT} strokeWidth={1.5} />
              <h3 style={{ color: THEME, fontSize: 15, fontWeight: 600, margin: 0 }}>Popüler Paylaşımlar</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {popularPosts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 20,
                    border: '1px solid rgba(200,169,110,0.08)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ color: post.color, fontSize: 10, fontWeight: 600, background: `${post.color}15`, padding: '2px 8px', borderRadius: 250 }}>
                      {post.community}
                    </span>
                  </div>
                  <p style={{ color: THEME, fontSize: 13, fontWeight: 500, margin: '0 0 8px' }}>{post.title}</p>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Heart size={12} color="rgba(251,244,226,0.4)" />
                      <span style={{ color: 'rgba(251,244,226,0.4)', fontSize: 11 }}>{post.likes}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MessageCircle size={12} color="rgba(251,244,226,0.4)" />
                      <span style={{ color: 'rgba(251,244,226,0.4)', fontSize: 11 }}>{post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topluluk Listesi */}
          <div className="px-6 pb-6">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Users size={16} color={ACCENT} strokeWidth={1.5} />
              <h3 style={{ color: THEME, fontSize: 15, fontWeight: 600, margin: 0 }}>Tüm Topluluklar</h3>
              <span style={{ color: 'rgba(251,244,226,0.4)', fontSize: 11 }}>({filteredCommunities.length})</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {filteredCommunities.map((community, idx) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedCommunity(community)}
                  style={{
                    padding: '16px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 24,
                    border: `1px solid ${community.color}20`,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  whileHover={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 16,
                        background: `${community.color}15`,
                        border: `1px solid ${community.color}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {community.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: THEME, fontSize: 16, fontWeight: 600, margin: 0 }}>{community.name}</h4>
                      <p style={{ color: community.color, fontSize: 12, fontWeight: 500, margin: '2px 0 0' }}>
                        {formatNumber(community.members)} üye
                      </p>
                    </div>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 250,
                        background: `${community.color}10`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Users size={14} color={community.color} />
                    </div>
                  </div>
                  <p style={{ color: 'rgba(251,244,226,0.5)', fontSize: 12, margin: 0, lineHeight: 1.4 }}>
                    {community.description}
                  </p>
                </motion.div>
              ))}
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
                  {navItems.map((item) => {
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
                          background: isActive ? 'rgba(200,169,110,0.15)' : 'transparent',
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

export default dynamic(() => Promise.resolve(CommunityPage), { ssr: false });