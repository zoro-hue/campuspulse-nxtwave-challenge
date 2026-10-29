import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  BrandLogo,
  SearchIcon,
  HelpIcon,
  ProfileIcon,
  ArrowRightIcon,
} from './Icons';
import { X, UserPlus, Sparkles } from 'lucide-react';

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    setCampaignPlanOpen,
    isLiveMode,
    liveStats,
  } = useCampaign();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [helpOpen, setHelpOpen] = useState(false);

  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'registrations', label: 'Registrations' },
    { id: 'ambassadors', label: 'Ambassadors' },
    { id: 'whatsapp', label: 'WhatsApp Outreach' },
  ];

  return (
    <>
      <header className="w-full max-w-[1240px] mx-auto px-2 sm:px-4 pt-2.5 pb-1 select-none">
        <div className="bg-[#d4dfc4] border border-[#bdccab] rounded-xl px-3 sm:px-4 py-1.5 flex items-center justify-between shadow-xs">
          {/* Left: Standardized 3 Vertical Bars Brand Logo + CampusPulse Wordmark */}
          <div
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={() => setActiveTab('overview')}
          >
            <BrandLogo size={20} className="group-hover:scale-105 transition-transform" />
            <span className="font-extrabold text-[17px] tracking-tight text-[#151b2b]">
              CampusPulse
            </span>
          </div>

          {/* Center: Horizontal Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 text-[14px] font-semibold text-[#303d29]">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id || (link.id === 'registrations' && activeTab === 'register');
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#c5d4b1] text-[#151b2b] shadow-inner font-bold'
                      : 'hover:bg-[#c9d8b7]/60 hover:text-[#151b2b]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Plan CTA button + standardized utility icons */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            <button
              onClick={() => setCampaignPlanOpen(true)}
              className="ph-btn-orange text-[13px] px-3.5 py-1.5 flex items-center space-x-1.5 whitespace-nowrap cursor-pointer shadow-sm"
            >
              <span>View campaign plan</span>
              <ArrowRightIcon size={14} color="navy" />
            </button>

            {/* Utility icons (Search, Help circle, Profile circle) */}
            <div className="flex items-center space-x-1 text-[#151b2b] border-l border-[#b5c3a7] pl-2">
              {/* Search Icon */}
              <button
                onClick={() => setSearchOpen(true)}
                title="Search sprint items"
                className="p-1 hover:bg-[#c3d1af] rounded-lg transition-colors cursor-pointer text-[#151b2b]"
                aria-label="Search"
              >
                <SearchIcon size={18} color="navy" />
              </button>

              {/* Help Icon */}
              <button
                onClick={() => setHelpOpen(true)}
                title="Campaign Info & Rules"
                className="p-1 hover:bg-[#c3d1af] rounded-lg transition-colors cursor-pointer text-[#151b2b]"
                aria-label="Help"
              >
                <HelpIcon size={18} color="navy" />
              </button>

              {/* Profile Icon */}
              <button
                title="Lead Growth Planner (Final-Year Engineering)"
                className="p-1 hover:bg-[#c3d1af] rounded-lg transition-colors cursor-pointer text-[#151b2b]"
                aria-label="Profile"
              >
                <ProfileIcon size={18} color="navy" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl w-full max-w-md shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#dcdecb]">
              <div className="flex items-center space-x-2 text-[#151b2b] font-bold">
                <SearchIcon size={18} color="gray" />
                <span>Search CampusPulse</span>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[#485466] hover:text-[#151b2b] p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="pt-3">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Jump to registration, ambassadors, channels, rules..."
                className="w-full bg-[#e2e7d5] border border-[#bccab0] rounded-xl px-3.5 py-2 text-sm text-[#151b2b] placeholder-[#606e57] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
              />
            </div>
            <div className="mt-3 space-y-1">
              {[
                { title: 'Student Registration Portal (Live Form)', tab: 'register' },
                { title: 'Ambassador Growth Network & Leaderboard', tab: 'ambassadors' },
                { title: 'Overview & Target (500 registrations)', tab: 'overview' },
                { title: 'Channel Planning & ₹2,000 Budget split', tab: 'channels' },
                { title: 'Message Experiments & A/B testing', tab: 'experiments' },
                { title: 'Referral Scenarios & 7-day model', tab: 'referrals' },
                { title: 'Next-Action Engine & ₹350 reserve rule', tab: 'actions' },
                { title: 'Docs & System Architecture', tab: 'docs' },
              ]
                .filter((item) =>
                  item.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => {
                      setActiveTab(item.tab);
                      setSearchOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-[#dfe6d3] text-[#151b2b] flex items-center justify-between group cursor-pointer"
                  >
                    <span>{item.title}</span>
                    <ArrowRightIcon size={14} color="gray" className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Campaign Info / Help Modal */}
      {helpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl w-full max-w-lg shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#dcdecb]">
              <div className="flex items-center space-x-2 text-[#151b2b] font-bold">
                <HelpIcon size={20} color="navy" />
                <span className="text-base">Campaign Constraints & Rules</span>
              </div>
              <button
                onClick={() => setHelpOpen(false)}
                className="text-[#485466] hover:text-[#151b2b] p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#3d4d35] leading-relaxed">
              <div className="p-3 bg-[#e8eddc] rounded-xl border border-[#cbd5c0]">
                <strong className="text-[#151b2b] block mb-1">Target Audience & Objective</strong>
                Acquire 500 final-year engineering students for the 60-minute hands-on workshop "Build Your First AI Project in 60 Minutes" within a strict 7-day sprint window.
              </div>

              <div className="p-3 bg-[#e8eddc] rounded-xl border border-[#cbd5c0]">
                <strong className="text-[#151b2b] block mb-1">Strict Budget Cap: ₹2,000 Total</strong>
                ₹500 allocated to student ambassadors, ₹1,150 allocated to targeted social/paid tests, and a ₹350 reserve held strictly until Day 3 / Day 6 pacing validation.
              </div>

              <div className="p-3 bg-[#e8eddc] rounded-xl border border-[#cbd5c0]">
                <strong className="text-[#151b2b] block mb-1">Live Registration & Referral Engine</strong>
                Every student registration via referral links (<code className="font-mono bg-[#dce5cf] px-1 rounded">?ref=CODE</code>) is recorded with duplicate email checks and attributed to ambassadors in local storage.
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setHelpOpen(false)}
                className="ph-btn-orange text-xs px-4 py-2 font-bold cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
