'use client';

import { useEffect } from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
};

export default function Modal({ open, onClose, title, message }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="glass-panel gradient-border relative w-full max-w-md rounded-2xl p-6 text-center">
        <button
          aria-label="Close modal"
          className="absolute right-3 top-3 rounded-full bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
          onClick={onClose}
        >
          ✕
        </button>
        {title && <h3 className="mb-2 text-2xl font-display">{title}</h3>}
        <p className="text-lg text-gray-100">{message}</p>
      </div>
    </div>
  );
}
