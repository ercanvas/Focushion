'use client';

import React, { useState, useCallback, useRef } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Heart,
  Bookmark,
  Share2,
  Trophy,
  User,
  Play,
  Volume2,
  VolumeX,
  Focus,
  Compass,
  Users,
} from 'lucide-react';
import Wait from '@/components/Wait';

const THEME = '#FBF4E2';
const ACCENT = '#C8A96E';

interface FeedPost {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  userColor: string;
  type: 'video' | 'image' | 'text';
  content: string;
  mediaUrl?: string;
  likes: number;
  saves: number;
  shares: number;
  awards: number;
  isLiked: boolean;
  isSaved: boolean;
  isAwarded: boolean;
}

const generateMockPosts = (count: number): FeedPost[] => {
  const users = [
    { id: '1', name: 'zeynep_tekin', avatar: 'ZT', color: '#60A5FA' },
    { id: '2', name: 'mehmet_demir', avatar: 'MD', color: '#34D399' },
    { id: '3', name: 'ayse_yilmaz', avatar: 'AY', color: '#F472B6' },
    { id: '4', name: 'can_ozturk', avatar: 'CO', color: '#FBBF24' },
    { id: '5', name: 'elif_kaya', avatar: 'EK', color: '#A78BFA' },
    { id: '6', name: 'burak_celebi', avatar: 'BC', color: '#F87171' },
  ];

  const contents = [
    { type: 'video', text: '25 dakikalık odaklanma seansımı tamamladım! #focushion', media: '/video-placeholder.mp4' },
    { type: 'image', text: 'Bugünkü çalışma masam', media: '/post1.jpg' },
    { type: 'text', text: 'Python öğrenmeye başladım! 30 günlük challenge başlıyor' },
    { type: 'video', text: 'Sabah rutinim: 1 saat kodlama + kahve', media: '/video-placeholder.mp4' },
    { type: 'image', text: 'Notlarım bugün böyle', media: '/post2.jpg' },
    { type: 'text', text: 'Bugün 4 seans tamamladım! Toplam 100 dakika odaklanma' },
  ];

  const posts: FeedPost[] = [];
  for (let i = 0; i < count; i++) {
    const user = users[i % users.length];
    const content = contents[i % contents.length];
    posts.push({
      id: `post-${i}`,
      userId: user.id,
      username: user.name,
      userAvatar: user.avatar,
      userColor: user.color,
      type: content.type as 'video' | 'image' | 'text',
      content: content.text,
      mediaUrl: content.media,
      likes: Math.floor(Math.random() * 10000),
      saves: Math.floor(Math.random() * 2000),
      shares: Math.floor(Math.random() * 800),
      awards: Math.floor(Math.random() * 500),
      isLiked: false,
      isSaved: false,
      isAwarded: false,
    });
  }
  return posts;
};

// Sabitler bileşen dışında tanımlandı — her render'da yeniden oluşturulmaz
const requiredCredits = 2500;
// Gerçek uygulamada store/API'den alınacak
const userCredits = 1800;

function ExplorePage() {
  const router = useRouter();

  const [posts, setPosts] = useState<FeedPost[]>(() => generateMockPosts(20));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // useState başlangıç değeri olarak hesapla — useEffect'e gerek yok
  const [showWait, setShowWait] = useState(() => userCredits < requiredCredits);

  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const navItems = [
    { icon: Focus, label: 'Odaklan', path: '/session/subject', active: false },
    { icon: Compass, label: 'Keşfet', path: '/explore', active: true },
    { icon: Users, label: 'Buluş', path: '/meet/search', active: false },
    { icon: User, label: 'Profil', path: '/profile', active: false },
  ];

  const loadMorePosts = useCallback(() => {
    if (!isLoadingMore && posts.length > 0 && currentIndex > posts.length - 3) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setPosts(prev => [...prev, ...generateMockPosts(10)]);
        setIsLoadingMore(false);
      }, 800);
    }
  }, [currentIndex, posts.length, isLoadingMore]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollTop = container.scrollTop;
    const itemHeight = container.clientHeight;
    const newIndex = Math.round(scrollTop / itemHeight);

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < posts.length) {
      setCurrentIndex(newIndex);
      if (newIndex > posts.length - 3 && !isLoadingMore) {
        loadMorePosts();
      }
    }
  }, [currentIndex, posts.length, isLoadingMore, loadMorePosts]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndY.current = e.changedTouches[0].clientY;
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSave = (postId: string) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, isSaved: !post.isSaved, saves: post.isSaved ? post.saves - 1 : post.saves + 1 }
        : post
    ));
  };

  const handleAward = (postId: string) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, isAwarded: !post.isAwarded, awards: post.isAwarded ? post.awards - 1 : post.awards + 1 }
        : post
    ));
  };

  const handleShare = (postId: string) => {
    console.log('Share post:', postId);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <IonPage>
      {/* Wait Component - Credit kontrolü için */}
      <Wait
        isOpen={showWait}
        currentCredits={userCredits}
        requiredCredits={requiredCredits}
        onClose={() => setShowWait(false)}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .fr * { font-family: 'Inter', -apple-system, sans-serif !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes heartbeat {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .heart-animation { animation: heartbeat 0.3s ease-in-out; }
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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-20 px-6 pt-4 pb-3"
        style={{
          maxWidth: 430,
          margin: '0 auto',
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
              Keşfet
            </span>
          </div>
          <div style={{ width: 34 }} />
        </div>
      </motion.div>

      <IonContent
        scrollY={true}
        style={{ '--background': 'transparent', position: 'relative', zIndex: 1 } as React.CSSProperties}
      >
        <div
          ref={contentRef}
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fr relative h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
          style={{ maxWidth: 430, margin: '0 auto' }}
        >
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative w-full snap-start snap-always"
              style={{ height: '100vh' }}
            >
              {/* Content Area */}
              <div className="absolute inset-0 flex items-center justify-center">
                {post.type === 'video' && (
                  <div className="relative w-full h-full bg-black/50 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                        <Play size={32} color="white" />
                      </div>
                    </div>
                    <div className="absolute bottom-20 right-4 flex flex-col gap-3">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center"
                      >
                        {isMuted ? <VolumeX size={18} color="white" /> : <Volume2 size={18} color="white" />}
                      </button>
                    </div>
                  </div>
                )}

                {post.type === 'image' && (
                  <div className="w-full h-full bg-linear-to-b from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white/60 text-sm">📸 Görsel içerik</p>
                      <p className="text-white/80 text-xs mt-2">{post.content}</p>
                    </div>
                  </div>
                )}

                {post.type === 'text' && (
                  <div className="w-full h-full bg-linear-to-br from-amber-900/30 to-amber-800/20 backdrop-blur-sm flex items-center justify-center p-8">
                    <p className="text-white text-xl font-medium text-center leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                )}
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

              {/* User Info - Bottom Left */}
              <div className="absolute bottom-24 left-4 z-10 flex items-center gap-3">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 44,
                    background: `linear-gradient(135deg, ${post.userColor}40, ${post.userColor}15)`,
                    border: `2px solid ${post.userColor}`,
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, color: post.userColor }}>
                    {post.userAvatar}
                  </span>
                </div>
                <div>
                  <p style={{ color: 'white', fontSize: 15, fontWeight: 700, letterSpacing: '-0.2px' }}>
                    @{post.username}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 500, maxWidth: 200 }}>
                    {post.content.substring(0, 60)}...
                  </p>
                </div>
              </div>

              {/* Action Buttons - Right Side */}
              <div className="absolute bottom-24 right-4 z-10 flex flex-col gap-5">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleLike(post.id)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur flex items-center justify-center">
                    <Heart
                      size={24}
                      color={post.isLiked ? '#ef4444' : 'white'}
                      fill={post.isLiked ? '#ef4444' : 'none'}
                      strokeWidth={1.5}
                    />
                  </div>
                  <span style={{ color: 'white', fontSize: 11, fontWeight: 500 }}>
                    {formatNumber(post.likes)}
                  </span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAward(post.id)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur flex items-center justify-center">
                    <Trophy
                      size={22}
                      color={post.isAwarded ? ACCENT : 'white'}
                      fill={post.isAwarded ? ACCENT + '40' : 'none'}
                      strokeWidth={1.5}
                    />
                  </div>
                  <span style={{ color: 'white', fontSize: 11, fontWeight: 500 }}>
                    {formatNumber(post.awards)}
                  </span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSave(post.id)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur flex items-center justify-center">
                    <Bookmark
                      size={22}
                      color={post.isSaved ? ACCENT : 'white'}
                      fill={post.isSaved ? ACCENT + '40' : 'none'}
                      strokeWidth={1.5}
                    />
                  </div>
                  <span style={{ color: 'white', fontSize: 11, fontWeight: 500 }}>
                    {formatNumber(post.saves)}
                  </span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleShare(post.id)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur flex items-center justify-center">
                    <Share2 size={20} color="white" strokeWidth={1.5} />
                  </div>
                  <span style={{ color: 'white', fontSize: 11, fontWeight: 500 }}>
                    {formatNumber(post.shares)}
                  </span>
                </motion.button>
              </div>

              {/* Index Indicator */}
              <div className="absolute top-20 right-4 z-10 flex gap-1.5">
                {posts.slice(0, 5).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === currentIndex ? 20 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: i === currentIndex ? ACCENT : 'rgba(255,255,255,0.3)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          ))}

          {isLoadingMore && (
            <div className="w-full py-8 flex justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
            </div>
          )}
        </div>
      </IonContent>

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
    </IonPage>
  );
}

export default dynamic(() => Promise.resolve(ExplorePage), { ssr: false });