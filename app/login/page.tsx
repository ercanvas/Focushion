'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  IonPage,
  IonContent,
  useIonToast,
} from '@ionic/react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const THEME  = '#FBF4E2';
const ACCENT = '#C8A96E';

function LoginPageBase() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [present] = useIonToast();
  const router = useRouter();

  const showToast = (message: string, color: 'success' | 'danger') => {
    present({ message, duration: 2000, position: 'bottom', color });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const BACKEND_IP = 'focushion-backend.onrender';
    try {
      const response = await fetch(`https://${BACKEND_IP}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        showToast(data.error || 'Bir hata oluştu.', 'danger');
      } else {
        showToast('Başarıyla giriş yapıldı!', 'success');
        router.push('/session/subject');
      }
    } catch {
      showToast('Sunucuya bağlanılamadı.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap');
        .fr * { font-family: 'Manrope', sans-serif !important; }

        .fsh-input {
          width: 100%;
          padding: 14px 20px;
          border-radius: 250px;
          border: 1px solid rgba(200,169,110,0.25);
          background: rgba(251,244,226,0.06);
          color: #FBF4E2;
          font-size: 15px;
          font-weight: 500;
          font-family: 'Manrope', sans-serif;
          outline: none;
          transition: border-color 0.2s;
          -webkit-appearance: none;
          box-sizing: border-box;
        }
        .fsh-input::placeholder { color: rgba(251,244,226,0.28); }
        .fsh-input:focus { border-color: rgba(200,169,110,0.65); }
        .fsh-input:-webkit-autofill,
        .fsh-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 100px #1a1208 inset;
          -webkit-text-fill-color: #FBF4E2;
        }
      `}</style>

      {/* ── Arka plan ── */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.22) saturate(0.8)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,5,2,0.55) 0%, rgba(8,5,2,0.82) 60%, rgba(5,3,1,0.99) 100%)',
          }}
        />
      </div>

      <IonContent
        scrollY={false}
        style={{ '--background': 'transparent', position: 'relative', zIndex: 1 } as React.CSSProperties}
      >
        <div className="fr relative flex flex-col h-full max-w-[430px] mx-auto px-6">

          {/* ── Top spacer ── */}
          <div className="h-12 shrink-0" />

          {/* ── Breadcrumb ── */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5"
          >
            <button
              onClick={() => router.push('/')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5, padding: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.png" alt="" width={18} height={18} style={{ borderRadius: 5, objectFit: 'contain', opacity: 0.7 }} />
              <span style={{ color: 'rgba(251,244,226,0.45)', fontSize: 13, fontWeight: 600 }}>Home</span>
            </button>
            <span style={{ color: 'rgba(251,244,226,0.22)', fontSize: 13 }}>/</span>
            <span style={{ color: ACCENT, fontSize: 13, fontWeight: 700 }}>Login</span>
          </motion.div>

          {/* ── Orta alan ── */}
          <div className="flex-1 flex flex-col justify-center">

            {/* Başlık */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mb-8"
            >
              <h1
                style={{
                  color: THEME,
                  fontSize: 36,
                  fontWeight: 900,
                  lineHeight: 1.08,
                  letterSpacing: '-0.03em',
                  margin: '0 0 10px',
                }}
              >
                Tekrar<br />
                <span style={{ color: ACCENT }}>hoş geldin.</span>
              </h1>
              <p style={{ color: 'rgba(251,244,226,0.40)', fontSize: 14, fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
                Topluluk seni bekliyor — giriş yap, odaklan.
              </p>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
            >
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                {/* E-posta */}
                <div>
                  <label style={{
                    display: 'block',
                    color: 'rgba(251,244,226,0.50)',
                    fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                    paddingLeft: 4,
                  }}>
                    E-posta
                  </label>
                  <input
                    className="fsh-input"
                    type="email"
                    placeholder="sen@ornek.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Şifre */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, paddingLeft: 4 }}>
                    <label style={{
                      color: 'rgba(251,244,226,0.50)',
                      fontSize: 11, fontWeight: 700,
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                    }}>
                      Şifre
                    </label>
                    <button
                      type="button"
                      onClick={() => router.push('/forgot-password')}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: ACCENT, fontSize: 12, fontWeight: 600,
                        fontFamily: 'Manrope, sans-serif',
                      }}
                    >
                      Şifremi unuttum
                    </button>
                  </div>
                  <input
                    className="fsh-input"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>

                {/* Submit butonu — 250px, border-radius 250px */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: 6,
                    width: 250,
                    alignSelf: 'center',
                    padding: '15px 0',
                    borderRadius: 250,
                    border: 'none',
                    background: loading
                      ? 'rgba(251,244,226,0.35)'
                      : `linear-gradient(135deg, ${THEME} 0%, #e8dfc8 100%)`,
                    color: '#1a1208',
                    fontSize: 15,
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: loading ? 'none' : '0 8px 28px rgba(200,169,110,0.25)',
                    transition: 'background 0.2s',
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  {loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}
                </motion.button>

              </form>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(251,244,226,0.08)' }} />
                <span style={{ color: 'rgba(251,244,226,0.25)', fontSize: 12, fontWeight: 500 }}>veya</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(251,244,226,0.08)' }} />
              </div>

              {/* Kayıt yönlendirme butonu — 250px, border-radius 250px */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push('/register')}
                  style={{
                    width: 250,
                    padding: '15px 0',
                    borderRadius: 250,
                    border: '1px solid rgba(200,169,110,0.35)',
                    background: 'rgba(251,244,226,0.06)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    color: THEME,
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    cursor: 'pointer',
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  Topluluğa katıl →
                </motion.button>
              </div>

            </motion.div>
          </div>

          {/* ── Bottom nav ── */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              background: 'rgba(8,5,2,0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(200,169,110,0.14)',
              paddingBottom: 'env(safe-area-inset-bottom, 12px)',
              marginLeft: -24,
              marginRight: -24,
            }}
          >

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, padding: '10px 0', borderTop: '1px solid rgba(251,244,226,0.05)' }}>
              {['Terms of Service', 'Privacy Policy'].map((label, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <span style={{ color: 'rgba(251,244,226,0.10)', fontSize: 11 }}>·</span>}
                  <button
                    onClick={() => router.push(i === 0 ? '/terms' : '/privacy')}
                    style={{
                      background: 'none', border: 'none',
                      color: 'rgba(251,244,226,0.22)', fontSize: 11, fontWeight: 500,
                      cursor: 'pointer', letterSpacing: '0.02em',
                      fontFamily: 'Manrope, sans-serif',
                    }}
                  >
                    {label}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </motion.nav>

        </div>
      </IonContent>
    </IonPage>
  );
}

export default dynamic(() => Promise.resolve(LoginPageBase), { ssr: false });