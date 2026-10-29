import React, { useState } from 'react';

/**
 * Mascot renders official PostHog hedgehog mascot SVGs with transparent backgrounds.
 * Supports interactive hover bounce/tilt effect.
 */
export default function Mascot({
  name = 'remote-work',
  className = '',
  alt = 'CampusPulse Hedgehog Mascot',
  size = 120,
  animated = false,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative inline-block select-none transition-transform duration-200 ease-out ${
        isHovered ? 'scale-105 -rotate-1' : ''
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: size, height: 'auto' }}
    >
      <img
        src={`/hoggies/${name}.svg`}
        alt={alt}
        className="w-full h-auto drop-shadow-sm pointer-events-none"
        loading="eager"
      />
    </div>
  );
}

