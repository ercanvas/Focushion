'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Coins,
  AlertCircle,
  Target,
  Play,
  X,
  ShoppingBag,
  Crown,
  CheckCircle,
} from 'lucide-react';
import Ad from './Ad';

interface WaitProps {
  isOpen: boolean;
  currentCredits: number;
  requiredCredits: number;
  onClose?: () => void;
  onCreditsEarned?: (credits: number) => void;
}

const CREDIT_PACKS = [
  { credits: 100, price: 49, recommended: false },
  { credits: 500, price: 99, recommended: false },
  { credits: 1000, price: 149, recommended: false },
  { credits: 5000, price: 199, recommended: true },
  { credits: 10000, price: 249, recommended: false },
  { credits: 50000, price: 299, recommended: false },
];

const Wait: React.FC<WaitProps> = ({ isOpen, currentCredits, requiredCredits, onClose, onCreditsEarned }) => {
  const router = useRouter();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedPack, setSelectedPack] = useState<typeof CREDIT_PACKS[0] | null>(null);
  const [showAd, setShowAd] = useState(false);

  const remainingCredits = requiredCredits - currentCredits;

  const handleGoToFocus = () => {
    router.push('/session/subject');
  };

  const handleWatchAd = () => {
    setShowAd(true);
  };

  const handleAdComplete = () => {
    if (onCreditsEarned) {
      onCreditsEarned(100);
    }
  };

  const handleAdClose = () => {
    setShowAd(false);
  };

  const handlePremiumUpgrade = () => {
    console.log('Premium upgrade');
  };

  const handlePurchaseClick = (pack: typeof CREDIT_PACKS[0]) => {
    if (selectedPack?.credits === pack.credits) {
      setSelectedPack(null);
    } else {
      setSelectedPack(pack);
    }
  };

  const handleConfirmPurchase = () => {
    if (selectedPack) {
      console.log(`Purchased ${selectedPack.credits} credits for ${selectedPack.price} TL`);
      if (onCreditsEarned) {
        onCreditsEarned(selectedPack.credits);
      }
      setShowPurchaseModal(false);
      setSelectedPack(null);
    }
  };

  return (
    <>
      <Ad isOpen={showAd} onClose={handleAdClose} onComplete={handleAdComplete} />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              zIndex: 2000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                width: '100%',
                maxWidth: 380,
                background: 'rgba(18, 14, 12, 0.95)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                borderRadius: 40,
                border: '1px solid rgba(200,169,110,0.2)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '32px 24px 20px',
                  textAlign: 'center',
                  borderBottom: '1px solid rgba(200,169,110,0.1)',
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                    background: 'rgba(200,169,110,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    border: '1px solid rgba(200,169,110,0.25)',
                  }}
                >
                  <Coins size={40} color="#C8A96E" strokeWidth={1.5} />
                </div>
                <h2
                  style={{
                    color: '#FBF4E2',
                    fontSize: 28,
                    fontWeight: 800,
                    margin: 0,
                    letterSpacing: '-0.5px',
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  {currentCredits.toLocaleString()}
                </h2>
                <p
                  style={{
                    color: 'rgba(251,244,226,0.5)',
                    fontSize: 13,
                    fontWeight: 500,
                    marginTop: 8,
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  Mevcut Krediniz
                </p>
                <div
                  style={{
                    marginTop: 16,
                    padding: '10px 16px',
                    background: 'rgba(239,68,68,0.1)',
                    borderRadius: 250,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <AlertCircle size={14} color="#ef4444" strokeWidth={1.5} />
                  <span style={{ color: '#ef4444', fontSize: 12, fontWeight: 600, fontFamily: 'Manrope, sans-serif' }}>
                    Eksik: {remainingCredits.toLocaleString()} kredi
                  </span>
                </div>
                <p
                  style={{
                    color: 'rgba(251,244,226,0.4)',
                    fontSize: 12,
                    fontWeight: 500,
                    marginTop: 12,
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  Kredileriniz sayfayı görüntülemek için en az {requiredCredits.toLocaleString()} olmalıdır
                </p>
              </div>

              {/* Buttons */}
              <div
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleGoToFocus}
                  style={{
                    width: '100%',
                    padding: '16px 0',
                    borderRadius: 250,
                    border: 'none',
                    background: `linear-gradient(135deg, #C8A96E 0%, #b8925a 100%)`,
                    color: '#1a1208',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  <Target size={18} strokeWidth={2} />
                  Odak Sayfasına Git
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowPurchaseModal(true)}
                  style={{
                    width: '100%',
                    padding: '16px 0',
                    borderRadius: 250,
                    border: '1px solid rgba(200,169,110,0.3)',
                    background: 'rgba(200,169,110,0.08)',
                    backdropFilter: 'blur(10px)',
                    color: '#FBF4E2',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  Eksik Credit Al
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleWatchAd}
                  style={{
                    width: '100%',
                    padding: '16px 0',
                    borderRadius: 250,
                    border: '1px solid rgba(200,169,110,0.25)',
                    background: 'transparent',
                    backdropFilter: 'blur(10px)',
                    color: 'rgba(251,244,226,0.8)',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  <Play size={18} strokeWidth={1.5} />
                  Reklam İzleyerek Artır
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handlePremiumUpgrade}
                  style={{
                    width: '100%',
                    padding: '16px 0',
                    borderRadius: 250,
                    border: '1px solid rgba(200,169,110,0.25)',
                    background: 'transparent',
                    backdropFilter: 'blur(10px)',
                    color: 'rgba(251,244,226,0.8)',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  <Crown size={18} strokeWidth={1.5} />
                  Premium Üyesi Ol
                </motion.button>
              </div>
            </motion.div>

            {/* Purchase Modal */}
            <AnimatePresence>
              {showPurchaseModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.9)',
                    backdropFilter: 'blur(20px)',
                    zIndex: 2001,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                  }}
                  onClick={() => setShowPurchaseModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    style={{
                      width: '100%',
                      maxWidth: 400,
                      maxHeight: '90vh',
                      background: 'rgba(18, 14, 12, 0.98)',
                      backdropFilter: 'blur(40px)',
                      borderRadius: 32,
                      border: '1px solid rgba(200,169,110,0.2)',
                      overflow: 'hidden',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div
                      style={{
                        padding: '20px 20px 16px',
                        borderBottom: '1px solid rgba(200,169,110,0.1)',
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
                          Eksik Credit Al
                        </h3>
                        <p
                          style={{
                            color: 'rgba(251,244,226,0.4)',
                            fontSize: 12,
                            marginTop: 4,
                            fontFamily: 'Manrope, sans-serif',
                          }}
                        >
                          İhtiyacın kadar credit satın al
                        </p>
                      </div>
                      <button
                        onClick={() => setShowPurchaseModal(false)}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 250,
                          background: 'rgba(200,169,110,0.1)',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <X size={16} color="#FBF4E2" />
                      </button>
                    </div>

                    {/* Credit Grid */}
                    <div
                      style={{
                        padding: '20px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 12,
                        maxHeight: 'calc(90vh - 180px)',
                        overflowY: 'auto',
                      }}
                    >
                      {CREDIT_PACKS.map((pack) => {
                        const isSelected = selectedPack?.credits === pack.credits;
                        return (
                          <motion.button
                            key={pack.credits}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handlePurchaseClick(pack)}
                            style={{
                              padding: '16px 12px',
                              borderRadius: 20,
                              background: isSelected
                                ? `linear-gradient(135deg, ${'#C8A96E'}40, ${'#C8A96E'}20)`
                                : pack.recommended
                                ? `linear-gradient(135deg, ${'#C8A96E'}20, ${'#C8A96E'}08)`
                                : 'rgba(200,169,110,0.05)',
                              border: isSelected
                                ? `2px solid #C8A96E`
                                : pack.recommended
                                ? `2px solid #C8A96E`
                                : '1px solid rgba(200,169,110,0.15)',
                              cursor: 'pointer',
                              position: 'relative',
                              transition: 'all 0.2s',
                            }}
                          >
                            {pack.recommended && !isSelected && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: -10,
                                  right: 12,
                                  background: '#C8A96E',
                                  padding: '4px 10px',
                                  borderRadius: 250,
                                }}
                              >
                                <span style={{ color: '#1a1208', fontSize: 10, fontWeight: 700, fontFamily: 'Manrope, sans-serif' }}>
                                  Tavsiye Edilen
                                </span>
                              </div>
                            )}
                            {isSelected && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: -10,
                                  right: 12,
                                  background: '#C8A96E',
                                  padding: '4px 10px',
                                  borderRadius: 250,
                                }}
                              >
                                <CheckCircle size={12} color="#1a1208" />
                              </div>
                            )}
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 6,
                                marginBottom: 8,
                              }}
                            >
                              <Coins size={20} color="#C8A96E" />
                              <span
                                style={{
                                  color: '#FBF4E2',
                                  fontSize: 20,
                                  fontWeight: 800,
                                  fontFamily: 'Manrope, sans-serif',
                                }}
                              >
                                {pack.credits.toLocaleString()}
                              </span>
                            </div>
                            <span
                              style={{
                                color: '#C8A96E',
                                fontSize: 14,
                                fontWeight: 700,
                                display: 'block',
                                textAlign: 'center',
                                fontFamily: 'Manrope, sans-serif',
                              }}
                            >
                              {pack.price} TL
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Modal Footer */}
                    <div
                      style={{
                        padding: '16px 20px',
                        borderTop: '1px solid rgba(200,169,110,0.1)',
                        display: 'flex',
                        gap: 12,
                      }}
                    >
                      <button
                        onClick={() => {
                          setShowPurchaseModal(false);
                          setSelectedPack(null);
                        }}
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
                        onClick={handleConfirmPurchase}
                        disabled={!selectedPack}
                        style={{
                          flex: 1,
                          padding: '12px 0',
                          borderRadius: 250,
                          border: 'none',
                          background: !selectedPack
                            ? 'rgba(200,169,110,0.3)'
                            : `linear-gradient(135deg, #C8A96E 0%, #b8925a 100%)`,
                          color: !selectedPack ? 'rgba(251,244,226,0.4)' : '#1a1208',
                          fontSize: 14,
                          fontWeight: 700,
                          cursor: !selectedPack ? 'not-allowed' : 'pointer',
                          fontFamily: 'Manrope, sans-serif',
                        }}
                      >
                        Satın Al - {selectedPack?.price || 0} TL
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Wait;