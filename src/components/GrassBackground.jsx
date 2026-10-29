import React from 'react';

/**
 * SpikyGrassClump — Classic PostHog-style hand-drawn grass clump with soft ground shadow.
 */
export const SpikyGrassClump = ({ className = '', width = 76, height = 54, rotation = 0 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 68 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    style={{
      transform: `rotate(${rotation}deg)`,
      transformOrigin: 'bottom center',
    }}
  >
    {/* Soft ground shadow ellipse */}
    <ellipse cx="34" cy="44" rx="30" ry="4" fill="#263412" opacity="0.35" />

    {/* Far left leaning blade */}
    <path
      d="M26 44 C19 32, 10 20, 2 11 C11 20, 21 31, 30 44 Z"
      fill="#34461a"
    />
    <path
      d="M28 44 C23 33, 15 23, 9 16 C17 24, 25 33, 31 44 Z"
      fill="#4a6125"
      opacity="0.85"
    />

    {/* Left-center blade */}
    <path
      d="M30 44 C27 28, 22 14, 20 5 C25 16, 29 29, 32 44 Z"
      fill="#283713"
    />
    <path
      d="M31 44 C29 30, 24 17, 23 9 C26 19, 30 31, 33 44 Z"
      fill="#5a732d"
      opacity="0.9"
    />

    {/* Center tall blade */}
    <path
      d="M32 45 C32 26, 29 11, 34 1 C37 13, 38 28, 38 45 Z"
      fill="#223010"
    />
    <path
      d="M33 45 C34 29, 31 16, 35 7 C38 18, 39 31, 38 45 Z"
      fill="#4e6627"
      opacity="0.85"
    />

    {/* Right-center blade */}
    <path
      d="M36 44 C40 28, 47 16, 56 6 C48 18, 43 31, 38 44 Z"
      fill="#2c3c15"
    />
    <path
      d="M37 44 C41 31, 46 20, 52 12 C46 22, 42 32, 39 44 Z"
      fill="#5d7730"
      opacity="0.85"
    />

    {/* Far right leaning blade */}
    <path
      d="M38 44 C45 32, 54 22, 66 14 C57 25, 48 34, 41 44 Z"
      fill="#394d1d"
    />
    <path
      d="M39 44 C45 34, 52 26, 61 20 C53 28, 46 36, 42 44 Z"
      fill="#496024"
      opacity="0.8"
    />

    {/* Foreground small accent sprouts */}
    <path
      d="M29 44 C25 37, 19 30, 14 25 C20 31, 26 37, 31 44 Z"
      fill="#23310e"
    />
    <path
      d="M37 44 C41 38, 48 32, 53 27 C47 34, 42 39, 39 44 Z"
      fill="#23310e"
    />
  </svg>
);

/**
 * TallSpikeGrass — Taller upright blades for prominent peeking grass clumps.
 */
export const TallSpikeGrass = ({ className = '', width = 64, height = 75, rotation = 0 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 54 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    style={{
      transform: `rotate(${rotation}deg)`,
      transformOrigin: 'bottom center',
    }}
  >
    {/* Ground shadow */}
    <ellipse cx="27" cy="64" rx="24" ry="4" fill="#223010" opacity="0.35" />

    {/* Outer Left blade */}
    <path d="M20 64 C14 46, 6 28, 2 15 C8 28, 16 46, 23 64 Z" fill="#324419" />
    <path d="M22 64 C17 48, 10 32, 7 22 C12 34, 19 50, 24 64 Z" fill="#4d6428" opacity="0.8" />

    {/* Inner Left tall blade */}
    <path d="M24 65 C22 40, 17 18, 18 4 C23 20, 27 42, 28 65 Z" fill="#253412" />
    <path d="M25 65 C24 43, 20 23, 20 10 C24 24, 28 45, 29 65 Z" fill="#58712e" opacity="0.85" />

    {/* Center tall blade */}
    <path d="M27 66 C27 38, 25 15, 29 1 C32 17, 34 40, 33 66 Z" fill="#1e2a0d" />
    <path d="M28 66 C28 41, 27 20, 30 7 C33 22, 34 43, 33 66 Z" fill="#4a6125" opacity="0.85" />

    {/* Inner Right tall blade */}
    <path d="M30 65 C33 42, 38 20, 44 6 C40 22, 36 43, 34 65 Z" fill="#253412" />
    <path d="M31 65 C34 45, 38 25, 42 12 C38 26, 35 46, 33 65 Z" fill="#5c7631" opacity="0.85" />

    {/* Outer Right blade */}
    <path d="M33 64 C39 46, 46 28, 52 16 C46 30, 39 48, 35 64 Z" fill="#36491b" />
    <path d="M34 64 C39 49, 45 34, 49 23 C44 36, 38 51, 36 64 Z" fill="#485e26" opacity="0.8" />

    {/* Small center sprouts */}
    <path d="M25 65 C22 56, 17 48, 13 42 C18 49, 23 57, 27 65 Z" fill="#223010" />
    <path d="M31 65 C34 57, 39 50, 43 44 C38 51, 34 58, 32 65 Z" fill="#223010" />
  </svg>
);

/**
 * DaisyFlower — Cute 5-petal white flower with golden yellow center (PostHog aesthetic).
 */
export const DaisyFlower = ({ className = '', size = 26, rotation = 0 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    {/* Ground dot shadow */}
    <circle cx="12" cy="13" r="10" fill="#223010" opacity="0.18" />

    {/* 5 White Petals */}
    <ellipse cx="12" cy="5" rx="3.5" ry="5" fill="#fcfef9" stroke="#b4c29c" strokeWidth="0.8" />
    <ellipse cx="19" cy="10" rx="5" ry="3.5" fill="#fcfef9" stroke="#b4c29c" strokeWidth="0.8" />
    <ellipse cx="16" cy="18" rx="3.5" ry="5" fill="#fcfef9" stroke="#b4c29c" strokeWidth="0.8" />
    <ellipse cx="8" cy="18" rx="3.5" ry="5" fill="#fcfef9" stroke="#b4c29c" strokeWidth="0.8" />
    <ellipse cx="5" cy="10" rx="5" ry="3.5" fill="#fcfef9" stroke="#b4c29c" strokeWidth="0.8" />

    {/* Center golden disk */}
    <circle cx="12" cy="12" r="4.2" fill="#f5b81a" stroke="#cf960e" strokeWidth="0.8" />
    <circle cx="11.2" cy="11.2" r="1.4" fill="#feeb78" opacity="0.95" />
  </svg>
);

/**
 * PaperAirplane — PostHog origami paper rocket with curved dashed flight trail.
 */
export const PaperAirplane = () => (
  <div className="absolute top-5 right-6 pointer-events-none select-none hidden sm:block z-0">
    <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
      {/* Dashed curved flight trail */}
      <path
        d="M10 86 C 44 80, 52 46, 28 34 C 6 22, 24 4, 96 22"
        stroke="#597040"
        strokeWidth="1.6"
        strokeDasharray="4 4"
        fill="none"
        opacity="0.7"
      />
      {/* Origami rocket */}
      <g transform="translate(92, 8) rotate(16)">
        <polygon points="34,14 2,28 16,16" fill="#fdfefb" stroke="#52673a" strokeWidth="1.1" />
        <polygon points="34,14 16,16 20,32" fill="#e4ebdb" stroke="#52673a" strokeWidth="1.1" />
        <polygon points="34,14 20,32 2,28" fill="#d7dfca" stroke="#52673a" strokeWidth="1.1" />
      </g>
    </svg>
  </div>
);

export default function GrassBackground({ children }) {
  return (
    <div
      className="relative min-h-screen w-full bg-[#8da871] overflow-x-hidden selection:bg-[#f5a623]"
      style={{
        backgroundImage: `radial-gradient(ellipse at 50% 30%, #95b279 0%, #8da871 55%, #7b9661 100%)`,
      }}
    >
      {/* ================= NATURAL SAGE MEADOW ILLUSTRATIONS ================= */}
      <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Origami Paper Rocket in top-right */}
        <PaperAirplane />

        {/* ----------------- LEFT MARGIN (Along & behind Left Rail) ----------------- */}
        <div className="absolute top-24 left-2 opacity-90 hidden md:block">
          <TallSpikeGrass width={54} height={64} rotation={-4} />
        </div>
        <div className="absolute top-[42%] left-1 opacity-90 hidden sm:block">
          <SpikyGrassClump width={66} height={46} rotation={3} />
        </div>
        <div className="absolute bottom-44 left-2 opacity-90 hidden sm:block">
          <TallSpikeGrass width={60} height={70} rotation={-5} />
        </div>

        {/* ----------------- RIGHT MARGIN (Beside Main Surface) ----------------- */}
        <div className="absolute top-36 right-3 opacity-90 hidden md:block">
          <SpikyGrassClump width={68} height={48} rotation={4} />
        </div>
        <div className="absolute top-[52%] right-2 opacity-90 hidden sm:block">
          <TallSpikeGrass width={62} height={72} rotation={-3} />
        </div>
        <div className="absolute bottom-48 right-3 opacity-90 hidden sm:block">
          <SpikyGrassClump width={70} height={50} rotation={5} />
        </div>

        {/* ----------------- BOTTOM EDGE LUSH GRASS ROW ----------------- */}
        {/* Clump 1: Bottom-Left (under left rail) with daisies */}
        <div className="absolute bottom-1 left-2 sm:left-4 z-10 flex items-end">
          <SpikyGrassClump width={88} height={62} rotation={-3} />
          <div className="-ml-7 mb-2">
            <DaisyFlower size={26} rotation={14} />
          </div>
          <div className="-ml-3 mb-5 hidden sm:block">
            <DaisyFlower size={18} rotation={-16} />
          </div>
        </div>

        {/* Clump 2: Bottom Left-Center */}
        <div className="absolute bottom-0 left-[16%] sm:left-[19%] z-10 opacity-95">
          <TallSpikeGrass width={74} height={86} rotation={2} />
        </div>

        {/* Clump 3: Bottom Center-Left */}
        <div className="absolute bottom-1 left-[34%] sm:left-[36%] z-10 opacity-95 hidden sm:block">
          <SpikyGrassClump width={80} height={58} rotation={-4} />
        </div>

        {/* Clump 4: Bottom Center-Right */}
        <div className="absolute bottom-0 left-[54%] sm:left-[56%] z-10 opacity-95 hidden md:block">
          <TallSpikeGrass width={70} height={82} rotation={-2} />
        </div>

        {/* Clump 5: Bottom Right-Center */}
        <div className="absolute bottom-1 left-[72%] sm:left-[74%] z-10 opacity-95">
          <SpikyGrassClump width={84} height={60} rotation={3} />
          <div className="absolute -top-3 left-4">
            <DaisyFlower size={22} rotation={20} />
          </div>
        </div>

        {/* Clump 6: Bottom-Right Corner */}
        <div className="absolute bottom-1 right-2 sm:right-5 z-10 flex items-end">
          <div className="mr-[-22px] mb-3 hidden sm:block">
            <DaisyFlower size={24} rotation={-12} />
          </div>
          <TallSpikeGrass width={78} height={90} rotation={4} />
        </div>
      </div>

      {/* Main content layer */}
      <div className="relative z-10 w-full min-h-screen flex flex-col pb-6 sm:pb-8">
        {children}
      </div>
    </div>
  );
}
