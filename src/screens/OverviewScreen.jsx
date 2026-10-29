import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  TargetIcon,
  MoneyPouchIcon,
  CalendarIcon,
  ArrowRightIcon,
  ChannelBarsIcon,
  PencilIcon,
  UsersGroupIcon,
  LightbulbIcon,
} from '../components/Icons';
import { Play, UserCheck, MessageSquare, UserPlus, Sparkles, CheckCircle2 } from 'lucide-react';

export default function OverviewScreen() {
  const {
    totalTarget,
    totalBudget,
    reserveBudget,
    setActiveTab,
    setCampaignPlanOpen,
    setWhatsAppModalOpen,
    isLiveMode,
    setIsLiveMode,
    liveStats,
    activeRegistrationsCount,
    activeRemainingGap,
    activeProgressPercentage,
  } = useCampaign();

  const featureCards = [
    {
      id: 'channels',
      title: 'Plan channels',
      desc: 'Decide where to reach students and allocate your budget.',
      icon: ChannelBarsIcon,
      mascot: '/hoggies/megaphone.svg',
      fallbackSvg: '/hoggies/megaphone.svg',
      bg: '#dcebfc',
      border: '#c5daf4',
      iconColor: 'green',
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp outreach',
      desc: 'Draft and dispatch personalized messages with attribution links.',
      icon: PencilIcon,
      mascot: '/hoggies/phone-call.svg',
      fallbackSvg: '/hoggies/reading.svg',
      bg: '#fde8e8',
      border: '#f6d2d2',
      iconColor: 'pink',
    },
    {
      id: 'referrals',
      title: 'Model referrals',
      desc: 'Estimate registrations from your ambassador network.',
      icon: UsersGroupIcon,
      mascot: '/hoggies/coding-group.svg',
      fallbackSvg: '/hoggies/coding-group.svg',
      bg: '#fdf4d7',
      border: '#f5e4b7',
      iconColor: 'yellow',
    },
    {
      id: 'actions',
      title: 'Get next actions',
      desc: 'Use simple rules to know what to do next.',
      icon: LightbulbIcon,
      mascot: '/hoggies/workflows.svg',
      fallbackSvg: '/hoggies/survey.svg',
      bg: '#e5f5e4',
      border: '#cae9c9',
      iconColor: 'orange',
    },
  ];

  return (
    <div className="w-full flex flex-col justify-between space-y-4 select-none">
      {/* ================= LIVE MODE VS DEMO BENCHMARK TOGGLE BAR ================= */}
      <div className="bg-[#fcfdfa] border border-[#d2dbca] rounded-2xl p-2.5 sm:px-4 sm:py-2 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center space-x-2.5">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isLiveMode ? 'bg-[#16a34a] animate-pulse' : 'bg-[#f5a623]'
            }`}
          ></span>
          <div className="text-xs text-[#2c3d23] font-semibold">
            {isLiveMode ? (
              <span>
                <strong className="text-[#151b2b]">Live Campaign Mode:</strong>{' '}
                {liveStats.totalRegistrations} verified registrations stored in database • {activeRemainingGap} gap to goal ({activeProgressPercentage}% achieved)
              </span>
            ) : (
              <span>
                <strong className="text-[#151b2b]">Demo Benchmark Mode:</strong> 205 sample registrations (illustrative planning scenario)
              </span>
            )}
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center space-x-1.5 bg-[#eaefdf] p-1 rounded-xl border border-[#c5d3b6] text-xs font-bold">
          <button
            onClick={() => setIsLiveMode(true)}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              isLiveMode
                ? 'bg-[#151b2b] text-[#f4f3e9] shadow-xs'
                : 'text-[#485642] hover:text-[#151b2b]'
            }`}
          >
            ● Live Engine
          </button>
          <button
            onClick={() => setIsLiveMode(false)}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              !isLiveMode
                ? 'bg-[#151b2b] text-[#f4f3e9] shadow-xs'
                : 'text-[#485642] hover:text-[#151b2b]'
            }`}
          >
            Demo Seeded
          </button>
        </div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Left Side: Headline, Subtitle, CTAs */}
        <div className="lg:col-span-7 pr-1">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#151b2b] tracking-tight leading-[1.12]">
            Make your next
            <br />
            AI workshop
            <br />
            a success.
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-[#4a5842] leading-relaxed max-w-lg font-medium">
            CampusPulse is an active growth engine to acquire and track{' '}
            <strong className="text-[#151b2b]">500 final-year engineering registrations</strong> for{' '}
            <span className="font-semibold text-[#151b2b]">
              “Build Your First AI Project in 60 Minutes.”
            </span>
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab('register')}
              className="ph-btn-orange text-xs sm:text-sm px-4 py-2 flex items-center space-x-2 cursor-pointer shadow-sm hover:scale-[1.02] transition-transform"
            >
              <UserPlus className="w-4 h-4 text-[#151b2b]" />
              <span>Register Student (Live Form)</span>
            </button>

            <button
              onClick={() => setWhatsAppModalOpen(true)}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-lg flex items-center space-x-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Outreach</span>
            </button>

            <button
              onClick={() => setActiveTab('ambassadors')}
              className="bg-[#dde6d3] hover:bg-[#d2ddc5] border border-[#bdcbaf] text-[#151b2b] text-xs sm:text-sm font-bold px-3 py-2 rounded-lg flex items-center space-x-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <UserCheck className="w-4 h-4" />
              <span>Ambassador Network</span>
            </button>
          </div>
        </div>

        {/* Right Side: Tree Stump Desk Hedgehog + Wooden Signpost Illustration */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative max-w-[360px] w-full">
            <img
              src="/assets/hero-hedgehog-signpost.png"
              alt="Hedgehog at tree stump desk with wooden signpost"
              className="w-full h-auto drop-shadow-md select-none pointer-events-none hover:scale-[1.01] transition-transform"
              onError={(e) => {
                e.target.src = '/hoggies/remote-work.svg';
              }}
            />
          </div>
        </div>
      </div>

      {/* ================= 3 CAMPAIGN SUMMARY METRIC CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
        {/* Metric 1: Target Registrations (Blue Target Icon) */}
        <div className="bg-[#fcfdfa] border border-[#dce4d0] rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5 shadow-xs transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-[#dbe8fd] flex items-center justify-center flex-shrink-0 text-[#2563eb]">
            <TargetIcon size={26} color="primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#151b2b] tracking-tight flex items-baseline space-x-1.5">
              <span>{isLiveMode ? liveStats.totalRegistrations : totalTarget}</span>
              {isLiveMode && (
                <span className="text-xs font-bold text-[#5a6a52]">/ 500 goal</span>
              )}
            </div>
            <div className="text-xs sm:text-[13px] font-bold text-[#151b2b] mt-0.5">
              {isLiveMode ? 'Live registrations' : 'Target registrations'}
            </div>
            <div className="text-[11px] sm:text-xs text-[#52604b] mt-0.5 truncate">
              {isLiveMode
                ? `${activeRemainingGap} spots left to 500 goal`
                : 'Final-year engineering students'}
            </div>
          </div>
        </div>

        {/* Metric 2: Campaign Budget (Green Rupee Pouch Icon) */}
        <div className="bg-[#fcfdfa] border border-[#dce4d0] rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5 shadow-xs transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-[#dcf2d8] flex items-center justify-center flex-shrink-0 text-[#16a34a]">
            <MoneyPouchIcon size={26} color="success" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#151b2b] tracking-tight">
              ₹{totalBudget.toLocaleString()}
            </div>
            <div className="text-xs sm:text-[13px] font-bold text-[#151b2b] mt-0.5">
              Campaign budget
            </div>
            <div className="text-[11px] sm:text-xs text-[#52604b] mt-0.5 truncate">
              Incl. ₹{reserveBudget} reserve
            </div>
          </div>
        </div>

        {/* Metric 3: Campaign Duration (Blue Calendar Icon) */}
        <div className="bg-[#fcfdfa] border border-[#dce4d0] rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5 shadow-xs transition-transform hover:-translate-y-0.5">
          <div className="w-12 h-12 rounded-full bg-[#dbe8fd] flex items-center justify-center flex-shrink-0 text-[#2563eb]">
            <CalendarIcon size={26} color="primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#151b2b] tracking-tight">
              7 days
            </div>
            <div className="text-xs sm:text-[13px] font-bold text-[#151b2b] mt-0.5">
              Campaign duration
            </div>
            <div className="text-[11px] sm:text-xs text-[#52604b] mt-0.5 truncate">
              Focused growth sprint
            </div>
          </div>
        </div>
      </div>

      {/* ================= 4 FEATURE CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        {featureCards.map((card) => {
          return (
            <div
              key={card.id}
              onClick={() => setActiveTab(card.id)}
              style={{ backgroundColor: card.bg, borderColor: card.border }}
              className="border rounded-2xl p-3.5 flex items-center space-x-3 cursor-pointer hover:shadow-md transition-all duration-150 hover:-translate-y-0.5 group"
            >
              {/* Mascot thumbnail */}
              <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center">
                <img
                  src={card.mascot}
                  alt={card.title}
                  className="w-full h-auto max-h-12 object-contain group-hover:scale-110 transition-transform drop-shadow-sm pointer-events-none select-none"
                  onError={(e) => {
                    e.target.src = card.fallbackSvg;
                  }}
                />
              </div>

              {/* Title & Desc */}
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-[13px] font-bold text-[#151b2b] group-hover:text-[#f5a623] transition-colors leading-snug flex items-center space-x-1">
                  <span>{card.title}</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#4a5842] mt-0.5 leading-snug">
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= TRANSPARENCY NOTICE ================= */}
      <div className="pt-1 flex justify-center">
        <div className="bg-[#fcfdfa]/95 border border-[#d2dbca] rounded-full px-4 py-1.5 flex items-center space-x-2 text-[11px] sm:text-xs text-[#485466] shadow-xs">
          <div className="w-4 h-4 rounded-full bg-[#151b2b] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
            i
          </div>
          <p className="leading-none">
            {isLiveMode ? (
              <span>
                <strong className="text-[#151b2b]">Live Campaign Engine:</strong> Registrations are persisted in local <code className="font-mono bg-[#eaefdf] px-1 rounded text-[#22311c]">database.json</code> with duplicate email validation and referral code attribution.
              </span>
            ) : (
              <span>
                This is a <strong className="text-[#151b2b]">decision-support prototype</strong>. It uses sample data and fixed rules. No real registrations are collected.
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
