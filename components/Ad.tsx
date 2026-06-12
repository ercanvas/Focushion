'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Volume2, VolumeX } from 'lucide-react';

interface AdProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const Ad: React.FC<AdProps> = ({ isOpen, onClose, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen && isPlaying && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsPlaying(false);
            onComplete();
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
              onClose();
            }, 3000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOpen, isPlaying, timeLeft, onComplete, onClose]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleClose = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    onClose();
  };

  return (
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
            background: '#000',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Video Content Area */}
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div className="text-center">
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 24,
                    background: 'rgba(200,169,110,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                  }}
                >
                  <span style={{ fontSize: 48 }}>🎬</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 16 }}>
                  Reklam içeriği
                </p>
              </div>
            </div>
          </div>

          {/* Timer Circle - Top Right */}
          <div
            style={{
              position: 'absolute',
              top: 60,
              right: 20,
              width: 56,
              height: 56,
              borderRadius: 56,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(200,169,110,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
          >
            <svg width="50" height="50" viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="22"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="3"
              />
              <circle
                cx="25"
                cy="25"
                r="22"
                fill="none"
                stroke="#C8A96E"
                strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 22}`}
                strokeDashoffset={`${2 * Math.PI * 22 * (1 - timeLeft / 30)}`}
                strokeLinecap="round"
                transform="rotate(-90 25 25)"
              />
            </svg>
            <span
              style={{
                position: 'absolute',
                color: '#FBF4E2',
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              {timeLeft}
            </span>
          </div>

          {/* Close Button - Top Left (appears after ad completes) */}
          {timeLeft === 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: 60,
                left: 20,
                width: 44,
                height: 44,
                borderRadius: 44,
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <X size={20} color="white" />
            </motion.button>
          )}

          {/* Play/Pause Button - Center */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayPause}
            style={{
              position: 'absolute',
              bottom: 100,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 64,
              height: 64,
              borderRadius: 64,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            {isPlaying ? (
              <Pause size={28} color="white" />
            ) : (
              <Play size={28} color="white" />
            )}
          </motion.button>

          {/* Mute Button - Bottom Right */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMuted(!isMuted)}
            style={{
              position: 'absolute',
              bottom: 100,
              right: 20,
              width: 44,
              height: 44,
              borderRadius: 44,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            {isMuted ? <VolumeX size={20} color="white" /> : <Volume2 size={20} color="white" />}
          </motion.button>

          {/* Toast Notification */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                style={{
                  position: 'absolute',
                  bottom: 30,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 'auto',
                  minWidth: 200,
                  padding: '12px 24px',
                  background: '#4ade80',
                  borderRadius: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  zIndex: 20,
                  boxShadow: '0 4px 20px rgba(74,222,128,0.3)',
                }}
              >
                <span style={{ fontSize: 18 }}>🎉</span>
                <span style={{ color: '#1a1208', fontSize: 14, fontWeight: 600 }}>
                  Reklam izleyerek 100 credit kazandınız!
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Ad;