'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Mic, MicOff, CameraOff, Video, Square } from 'lucide-react';

interface RecordFocusProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (videoUrl: string) => void;
}

const RecordFocus: React.FC<RecordFocusProps> = ({ isOpen, onClose, onSave }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isMicActive, setIsMicActive] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // startCamera fonksiyonunu önce tanımla
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: true,
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Kamera başlatılamadı:', error);
    }
  };

  // stopCamera fonksiyonunu önce tanımla
  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const toggleCamera = () => {
    if (mediaStreamRef.current) {
      const videoTrack = mediaStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isCameraActive;
        setIsCameraActive(!isCameraActive);
      }
    }
  };

  const toggleMic = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMicActive;
        setIsMicActive(!isMicActive);
      }
    }
  };

  const startRecording = () => {
    if (!mediaStreamRef.current) return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(mediaStreamRef.current);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      if (onSave) onSave(url);
    };

    mediaRecorder.start();
    setIsRecording(true);

    intervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setRecordingTime(0);
      onClose();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
            flexDirection: 'column',
          }}
        >
          {/* Video Preview */}
          <div className="relative flex-1 bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Recording Indicator */}
          {isRecording && (
            <div
              style={{
                position: 'absolute',
                top: 60,
                left: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)',
                padding: '8px 16px',
                borderRadius: 250,
                zIndex: 10,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 12,
                  background: '#ef4444',
                  animation: 'pulse 1s infinite',
                }}
              />
              <span style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>
                {formatTime(recordingTime)}
              </span>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 60,
              right: 20,
              width: 44,
              height: 44,
              borderRadius: 44,
              background: 'rgba(0,0,0,0.6)',
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
          </button>

          {/* Control Buttons */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: 30,
              padding: '16px 20px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              zIndex: 10,
            }}
          >
            {/* Camera Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleCamera}
              style={{
                width: 56,
                height: 56,
                borderRadius: 56,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {isCameraActive ? (
                <Camera size={24} color="white" />
              ) : (
                <CameraOff size={24} color="#ef4444" />
              )}
            </motion.button>

            {/* Record Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={isRecording ? stopRecording : startRecording}
              style={{
                width: 72,
                height: 72,
                borderRadius: 72,
                background: isRecording ? '#ef4444' : 'rgba(200,169,110,0.9)',
                border: isRecording ? 'none' : '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: isRecording ? '0 0 20px rgba(239,68,68,0.5)' : 'none',
              }}
            >
              {isRecording ? (
                <Square size={28} color="white" />
              ) : (
                <Video size={28} color="#1a1208" />
              )}
            </motion.button>

            {/* Mic Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMic}
              style={{
                width: 56,
                height: 56,
                borderRadius: 56,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {isMicActive ? (
                <Mic size={24} color="white" />
              ) : (
                <MicOff size={24} color="#ef4444" />
              )}
            </motion.button>
          </div>

          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.3; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecordFocus;