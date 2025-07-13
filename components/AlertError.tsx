"use client";

import { useEffect, useState } from "react";

type Props = {
  message: string;
  show: boolean;
  onClose: () => void;
};

export default function FloatingError({ message, show, onClose }: Props) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose(); // notifica al padre que se cerró
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-red-100 text-red-800 border border-red-300 px-4 py-2 rounded-lg shadow-md animate-fade-in">
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
