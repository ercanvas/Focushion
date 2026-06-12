'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bold,
  Italic,
  Underline,
  X,
  Maximize2,
  Minimize2,
  Save,
  Trash2,
  FileText,
} from 'lucide-react';

interface NotesProps {
  isOpen: boolean;
  onClose: () => void;
  initialNotes?: string;
  onSave?: (notes: string) => void;
}

const Notes: React.FC<NotesProps> = ({ isOpen, onClose, initialNotes = '', onSave }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sadece odaklama için effect
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // initialNotes değiştiğinde notes'i güncelle - ESLint kuralını devre dışı bırak
  useEffect(() => {
    if (notes !== initialNotes) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNotes(initialNotes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialNotes]);

  const handleFormat = (type: 'bold' | 'italic' | 'underline') => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = notes.substring(start, end);

    if (selectedText) {
      let formattedText = '';
      if (type === 'bold') {
        formattedText = `**${selectedText}**`;
      } else if (type === 'italic') {
        formattedText = `*${selectedText}*`;
      } else if (type === 'underline') {
        formattedText = `__${selectedText}__`;
      }

      const newNotes = notes.substring(0, start) + formattedText + notes.substring(end);
      setNotes(newNotes);
      
      setTimeout(() => {
        textarea.focus();
        const newStart = start;
        const newEnd = start + formattedText.length;
        textarea.setSelectionRange(newStart, newEnd);
      }, 0);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(notes);
    }
    onClose();
  };

  const handleDiscard = () => {
    setNotes(initialNotes);
    onClose();
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleDiscard();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            zIndex: 2000,
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
              width: isFullscreen ? '100%' : 580,
              height: isFullscreen ? '100%' : 680,
              maxWidth: isFullscreen ? '100%' : '90vw',
              maxHeight: isFullscreen ? '100%' : '85vh',
              background: 'rgba(28, 24, 20, 0.92)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderRadius: isFullscreen ? 0 : 28,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,169,110,0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid rgba(200,169,110,0.12)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(200,169,110,0.04)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: 'rgba(200,169,110,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FileText size={20} color="#C8A96E" strokeWidth={1.5} />
                </div>
                <div>
                  <h3
                    style={{
                      color: '#FBF4E2',
                      fontSize: 18,
                      fontWeight: 600,
                      margin: 0,
                      fontFamily: 'Inter, -apple-system, sans-serif',
                      letterSpacing: '-0.3px',
                    }}
                  >
                    Notlar
                  </h3>
                  <p
                    style={{
                      color: 'rgba(251,244,226,0.45)',
                      fontSize: 12,
                      margin: '2px 0 0 0',
                      fontFamily: 'Inter, -apple-system, sans-serif',
                    }}
                  >
                    ⌘ + S ile kaydet
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFullscreen}
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
                    color: '#FBF4E2',
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
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
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
                    color: '#FBF4E2',
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
                  <X size={16} />
                </motion.button>
              </div>
            </div>

            {/* Toolbar - Format Buttons */}
            <div
              style={{
                padding: '12px 24px',
                borderBottom: '1px solid rgba(200,169,110,0.08)',
                background: 'rgba(200,169,110,0.02)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  background: 'rgba(200,169,110,0.06)',
                  borderRadius: 250,
                  padding: 4,
                  width: 'fit-content',
                }}
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFormat('bold')}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 250,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: '#FBF4E2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(200,169,110,0.15)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Bold size={16} strokeWidth={2} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFormat('italic')}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 250,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: '#FBF4E2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(200,169,110,0.15)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Italic size={16} strokeWidth={2} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFormat('underline')}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 250,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: '#FBF4E2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(200,169,110,0.15)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Underline size={16} strokeWidth={2} />
                </motion.button>
              </div>
            </div>

            {/* Notes Editor Area - Notebook style */}
            <div
              style={{
                flex: 1,
                position: 'relative',
                background: `
                  repeating-linear-gradient(
                    transparent,
                    transparent 27px,
                    rgba(200,169,110,0.06) 27px,
                    rgba(200,169,110,0.06) 28px
                  )
                `,
                padding: '20px 28px',
                overflow: 'auto',
              }}
            >
              {/* Decorative left margin line */}
              <div
                style={{
                  position: 'absolute',
                  left: 20,
                  top: 20,
                  bottom: 20,
                  width: 2,
                  background: 'rgba(200,169,110,0.12)',
                  borderRadius: 1,
                }}
              />
              <textarea
                ref={textareaRef}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  fontSize: 16,
                  lineHeight: '28px',
                  color: '#FBF4E2',
                  fontFamily: '-apple-system, "SF Mono", "SF Pro Text", "Inter", monospace',
                  fontWeight: 400,
                  paddingLeft: 20,
                }}
                placeholder="Notlarınızı buraya yazın...

Metni seçip B, I veya U butonlarını kullanarak biçimlendirebilirsiniz.

**Kalın yazı** için metni seçip B'ye basın
*İtalik yazı* için metni seçip I'ye basın
__Altı çizili yazı__ için metni seçip U'ya basın

⌘ + S ile kaydedin, ESC ile vazgeçin"
              />
            </div>

            {/* Footer - Save & Discard Buttons */}
            <div
              style={{
                padding: '16px 24px',
                borderTop: '1px solid rgba(200,169,110,0.08)',
                display: 'flex',
                gap: 12,
                justifyContent: 'flex-end',
                background: 'rgba(200,169,110,0.02)',
              }}
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleDiscard}
                style={{
                  padding: '10px 24px',
                  borderRadius: 250,
                  border: '1px solid rgba(200,169,110,0.25)',
                  background: 'transparent',
                  color: 'rgba(251,244,226,0.7)',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(200,169,110,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(200,169,110,0.25)';
                }}
              >
                <Trash2 size={14} />
                Vazgeç
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                style={{
                  padding: '10px 28px',
                  borderRadius: 250,
                  border: 'none',
                  background: 'linear-gradient(135deg, #C8A96E 0%, #b8925a 100%)',
                  color: '#1a1208',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #d4b47a 0%, #c4a06a 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #C8A96E 0%, #b8925a 100%)';
                }}
              >
                <Save size={14} />
                Kaydet
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notes;