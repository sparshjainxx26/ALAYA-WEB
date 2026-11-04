import React, { useState, useEffect } from 'react';

// ==============================================================
// CHANGE BACKGROUND VIDEO HERE:
// Put your video file in /public/bg.mp4 (served as /bg.mp4)
// Or paste any video URL here:
// ==============================================================
export const BACKGROUND_VIDEO_SRC = '/bg.mp4';

export const BackgroundVideo: React.FC = () => {
  const [videoFailed, setVideoFailed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
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
          prefersReducedMotion ? 'bg-[#060B1C]' : 'alaya-gradient-bg'
        } transition-opacity duration-1000`}
      />

      {/* Background Video Element */}
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          src={BACKGROUND_VIDEO_SRC}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoFailed(true)}
        >
          <source src={BACKGROUND_VIDEO_SRC} type="video/mp4" onError={() => setVideoFailed(true)} />
        </video>
      )}

      {/* Deeper Midnight Navy Overlay: rgba(6, 11, 28, 0.92) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: 'rgba(6, 11, 28, 0.92)' }}
      />

      {/* Subtle technical grid texture */}
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
