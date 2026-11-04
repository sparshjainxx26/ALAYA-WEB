import React, { useState, useEffect } from 'react';

export const BackgroundVideo: React.FC = () => {
  const [videoFailed, setVideoFailed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const showVideo = !videoFailed && !prefersReducedMotion;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-50 overflow-hidden" aria-hidden="true">
      {/* Animated Gradient Fallback (Active when video fails or reduced motion is preferred) */}
      <div
        className={`absolute inset-0 w-full h-full ${
          prefersReducedMotion ? 'bg-[#0A1433]' : 'alaya-gradient-bg'
        } transition-opacity duration-1000`}
      />

      {/* Background Video Element */}
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoFailed(true)}
        >
          <source src="/bg.mp4" type="video/mp4" />
          <source src="/public/bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Mandatory Deep Navy Overlay: rgba(10, 20, 51, 0.82) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: 'rgba(10, 20, 51, 0.82)' }}
      />

      {/* Subtle technical grid texture (calibrated 1px grid lines with low opacity for science exhibition feel) */}
      <div
        className="absolute inset-0 w-full h-full opacity-15"
        style={{
          backgroundImage: `radial-gradient(rgba(47, 134, 255, 0.25) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};
