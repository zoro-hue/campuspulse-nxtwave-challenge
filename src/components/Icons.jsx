import React from 'react';

/**
 * Standardized CampusPulse SVG Icon System
 * Derived from the official CampusPulse Icon Reference Sheet.
 * Consistent stroke weight: 2px, stroke-linecap="round", stroke-linejoin="round"
 */

const COLOR_MAP = {
  default: '#151b2b',
  navy: '#151b2b',
  primary: '#3d82f6',
  blue: '#3d82f6',
  success: '#16a34a',
  green: '#16a34a',
  warning: '#f5a623',
  orange: '#f5a623',
  experiment: '#f46b9b',
  pink: '#f46b9b',
  referral: '#f5a623',
  yellow: '#f5a623',
  error: '#dc2626',
  red: '#dc2626',
  disabled: '#9ca3af',
  gray: '#6b7280',
};

// 1. Brand Mark: 3 Vertical Rounded Bars
export const BrandLogo = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`inline-block select-none ${className}`}
  >
    <rect x="3" y="10" width="4" height="10" rx="2" fill="#151B2B" />
    <rect x="10" y="4" width="4" height="16" rx="2" fill="#151B2B" />
    <rect x="17" y="7" width="4" height="13" rx="2" fill="#151B2B" />
  </svg>
);

// 2. Search
export const SearchIcon = ({ size = 20, color = 'navy', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLOR_MAP[color] || color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <circle cx="11" cy="11" r="7.5" />
    <path d="M16.5 16.5L21.5 21.5" />
  </svg>
);

// 3. Help (Circle with ?)
export const HelpIcon = ({ size = 20, color = 'navy', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLOR_MAP[color] || color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2 2-2 3" />
    <path d="M12 16h.01" strokeWidth="2.5" />
  </svg>
);

// 4. Profile (Circle with User Silhouette)
export const ProfileIcon = ({ size = 20, color = 'navy', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLOR_MAP[color] || color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.5 18c1.5-2.5 3-3 5.5-3s4 0.5 5.5 3" />
  </svg>
);

// 5. Arrow (Right Button Arrow)
export const ArrowRightIcon = ({ size = 16, color = 'navy', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLOR_MAP[color] || color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

// --- Sidebar Icons ---

// 6. Home (Active & Inactive)
export const HomeIcon = ({ size = 20, color = 'navy', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLOR_MAP[color] || color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <path d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 20v-9.5z" />
    <path d="M9 21v-7h6v7" />
  </svg>
);

// 7. Channel Planning (3 Vertical Bars)
export const ChannelBarsIcon = ({ size = 20, color = 'navy', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLOR_MAP[color] || color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <rect x="4" y="11" width="3.5" height="9" rx="1.5" />
    <rect x="10.25" y="4" width="3.5" height="16" rx="1.5" />
    <rect x="16.5" y="8" width="3.5" height="12" rx="1.5" />
  </svg>
);

// 8. Message Experiments (Angled Pencil)
export const PencilIcon = ({ size = 20, color = 'navy', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLOR_MAP[color] || color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

// 9. Referral Scenarios (3 People Group)
export const UsersGroupIcon = ({ size = 20, color = 'navy', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLOR_MAP[color] || color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    {/* Center person */}
    <circle cx="12" cy="8" r="3" />
    <path d="M7 19c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5" />
    {/* Left person */}
    <circle cx="5" cy="10" r="2.2" />
    <path d="M1.5 19c0-2 1.5-3.2 3.5-3.2" />
    {/* Right person */}
    <circle cx="19" cy="10" r="2.2" />
    <path d="M22.5 19c0-2-1.5-3.2-3.5-3.2" />
  </svg>
);

// 10. Next Actions (Lightbulb)
export const LightbulbIcon = ({ size = 20, color = 'navy', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLOR_MAP[color] || color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.3 4.5 3.3 5.7.5.3.7.8.7 1.3H15c0-.5.2-1 .7-1.3C17.7 13.5 19 11.5 19 9a7 7 0 0 0-7-7z" />
  </svg>
);

// 11. Docs (Document sheet with lines)
export const DocsIcon = ({ size = 20, color = 'navy', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLOR_MAP[color] || color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="14" y2="17" />
  </svg>
);

// --- Metric Card Icons ---

// 12. Bullseye Target (Blue)
export const TargetIcon = ({ size = 24, color = 'primary', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLOR_MAP[color] || color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

// 13. Money Pouch / Rupee (Green)
export const MoneyPouchIcon = ({ size = 24, color = 'success', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLOR_MAP[color] || color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <path d="M19 14c0 4-3 7-7 7s-7-3-7-7c0-3.5 2.5-6.5 5.5-7h3c3 .5 5.5 3.5 5.5 7z" />
    <path d="M9 7l1.5-4h3L15 7" />
    {/* Rupee symbol inside */}
    <path d="M10 11h4" strokeWidth="1.8" />
    <path d="M10 13.5h3.5" strokeWidth="1.8" />
    <path d="M11.5 11v5" strokeWidth="1.8" />
    <path d="M12 16l2.5 3" strokeWidth="1.8" />
  </svg>
);

// 14. Calendar (Blue)
export const CalendarIcon = ({ size = 24, color = 'primary', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLOR_MAP[color] || color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    {/* 4 dots/grid inside */}
    <circle cx="8" cy="14" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="14" r="1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="14" r="1" fill="currentColor" stroke="none" />
    <circle cx="8" cy="18" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="18" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// --- Table / Status Indicators ---

// 15. On Track (Green Circle with Up Arrow)
export const OnTrackIcon = ({ size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`inline-block ${className}`}
  >
    <circle cx="12" cy="12" r="10" fill="#16a34a" />
    <path d="M12 16V8M8 12l4-4 4 4" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 16. Behind (Orange Circle with Clock)
export const BehindIcon = ({ size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`inline-block ${className}`}
  >
    <circle cx="12" cy="12" r="10" fill="#f5a623" />
    <path d="M12 7v5l3 2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 17. Success (Green Check Circle)
export const SuccessCheckIcon = ({ size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`inline-block ${className}`}
  >
    <circle cx="12" cy="12" r="10" fill="#16a34a" />
    <path d="M8 12l3 3 5-5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 18. Warning (Orange Triangle with !)
export const WarningIcon = ({ size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`inline-block ${className}`}
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="#f5a623" />
    <line x1="12" y1="9" x2="12" y2="13" stroke="#151b2b" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill="#151b2b" />
  </svg>
);

// 19. Info Circle (Blue with i)
export const InfoCircleIcon = ({ size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`inline-block ${className}`}
  >
    <circle cx="12" cy="12" r="10" fill="#3d82f6" />
    <line x1="12" y1="11" x2="12" y2="16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="7.5" r="1" fill="#ffffff" />
  </svg>
);

// 20. Action Reset (Circular rotate arrow)
export const ResetIcon = ({ size = 16, color = 'gray', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLOR_MAP[color] || color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

