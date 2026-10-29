import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  LightbulbIcon,
  SuccessCheckIcon,
  InfoCircleIcon,
  WarningIcon,
  ArrowRightIcon,
} from '../components/Icons';
import Mascot from '../components/Mascot';
import { ShieldCheck, MessageSquare, UserCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function NextActionsScreen() {
  const {
    nextActionAnalysis,
    setActiveTab,
    isLiveMode,
    setIsLiveMode,
    setWhatsAppModalOpen,
  } = useCampaign();

  return (
    <div className="w-full space-y-5">
      {/* Header with Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#151b2b] tracking-tight">
              Next-action engine
            </h1>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${
                isLiveMode
                  ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]'
                  : 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]'
              }`}
            >
              {isLiveMode ? 'Live Rules Engine' : 'Demo Benchmark'}
            </span>
          </div>
          <p className="mt-1 text-sm sm:text-base text-[#4d5c45] font-medium">
            Rules-based recommendations derived deterministically from {isLiveMode ? 'live stored campaign data' : 'demo benchmarks'}.
          </p>
        </div>

        {/* Toggle Pill */}
        <div className="flex items-center space-x-1.5 bg-[#eaefdf] p-1 rounded-xl border border-[#c5d3b6] text-xs font-bold self-start sm:self-center">
          <button
            onClick={() => setIsLiveMode(true)}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              isLiveMode
                ? 'bg-[#151b2b] text-[#f4f3e9] shadow-xs'
                : 'text-[#485642] hover:text-[#151b2b]'
            }`}
          >
            ● Live Engine
          </button>
          <button
            onClick={() => setIsLiveMode(false)}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              !isLiveMode
                ? 'bg-[#151b2b] text-[#f4f3e9] shadow-xs'
                : 'text-[#485642] hover:text-[#151b2b]'
            }`}
          >
            Demo Seeded
          </button>
        </div>
      </div>

      {/* Prominent Recommendation Card */}
      <div className="ph-card p-5 sm:p-6 border border-[#dcdecb] flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xs">
        <div className="flex items-start space-x-4 flex-1">
          {/* Standardized Lightbulb Icon */}
          <div className="w-12 h-12 rounded-2xl bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center flex-shrink-0 text-[#d97706] shadow-xs">
            <LightbulbIcon size={26} color="warning" />
          </div>

          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#d97706] flex items-center space-x-1.5">
              <span>Recommended Next Growth Action</span>
              <span className="text-[10px] bg-[#fde68a] text-[#78350f] px-2 py-0.5 rounded font-extrabold">
                {isLiveMode ? 'Real-Time Rule' : 'Benchmark Rule'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#151b2b] leading-snug">
              {nextActionAnalysis.recommendationTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#485466] max-w-xl leading-relaxed pt-0.5">
              {nextActionAnalysis.recommendationReason}
            </p>

            {/* Direct Action Shortcuts */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setWhatsAppModalOpen(true)}
                className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Launch WhatsApp Outreach</span>
              </button>

              <button
                onClick={() => setActiveTab('ambassadors')}
                className="bg-[#e4ebdb] hover:bg-[#d8e3cc] border border-[#bdcbaf] text-[#151b2b] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 cursor-pointer transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Manage Ambassadors</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mascot on Right */}
        <div className="flex-shrink-0 self-center md:self-auto pr-2">
          <Mascot name="research" size={130} alt="Next Action Decision Hedgehog" />
        </div>
      </div>

      {/* Pacing Gate & Reserve Allocation Callout */}
      <div className="bg-[#eaf0de] border border-[#bcd0ad] rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#bcd0ad]/60">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#16a34a]" />
            <h3 className="font-extrabold text-sm sm:text-base text-[#151b2b]">
              7-Day Sprint Pro-Rata Pacing Check & ₹350 Reserve Gate
            </h3>
          </div>
          <span className="text-xs font-bold text-[#35482e] bg-[#d9e5ca] px-2.5 py-1 rounded-lg">
            Day 3 Gate: 150 Registrations (30%)
          </span>
        </div>

        <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-[#596d50] font-semibold">Current Progress Against Day 3 Target</span>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-extrabold text-[#151b2b]">
                {nextActionAnalysis.currentTotal} / 150 sign-ups
              </span>
              {nextActionAnalysis.isDay3PaceMet ? (
                <span className="text-[11px] font-bold text-[#166534] bg-[#dcfce7] px-2 py-0.5 rounded border border-[#86efac]">
                  ✓ On Track
                </span>
              ) : (
                <span className="text-[11px] font-bold text-[#9a3412] bg-[#ffedd5] px-2 py-0.5 rounded border border-[#fed7aa]">
                  ⚠️ Needs Sprint Acceleration
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[#596d50] font-semibold">Deterministic Reserve Policy Status</span>
            <div className="font-medium text-[#151b2b] leading-relaxed">
              {nextActionAnalysis.reserveActionText}
            </div>
          </div>
        </div>
      </div>

      {/* Other Checks Table */}
      <div className="ph-card overflow-hidden border border-[#dcdecb] shadow-xs">
        <div className="p-4 sm:p-5 border-b border-[#dcdecb] bg-[#eef1e6]/70 flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#151b2b]">
              Automated Growth Checks & Gates
            </h2>
            <p className="text-xs text-[#54624d]">
              Pre-programmed compliance rules protecting budget efficiency and channel conversion
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#dcdecb] bg-[#eef1e6]/40 text-[#54624d] font-bold">
                <th className="py-3 px-4 w-1/3">Compliance Check</th>
                <th className="py-3 px-4">Evaluation & Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e7d7]">
              {/* Check 1: Budget Status */}
              <tr className="hover:bg-[#eaeedf]/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#151b2b]">Budget cap compliance</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center space-x-2">
                    {nextActionAnalysis.budgetOk ? (
                      <SuccessCheckIcon size={18} />
                    ) : (
                      <WarningIcon size={18} />
                    )}
                    <span className="font-semibold text-[#151b2b]">
                      {nextActionAnalysis.budgetStatusText}
                    </span>
                  </div>
                </td>
              </tr>

              {/* Check 2: Channel Performance */}
              <tr className="hover:bg-[#eaeedf]/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#151b2b]">Channel attribution status</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center space-x-2">
                    <SuccessCheckIcon size={18} />
                    <span className="font-semibold text-[#151b2b]">
                      {nextActionAnalysis.channelStatusText}
                    </span>
                  </div>
                </td>
              </tr>

              {/* Check 3: Reserve Rule */}
              <tr className="hover:bg-[#eaeedf]/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#151b2b]">₹350 reserve unlocking policy</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center space-x-2">
                    <InfoCircleIcon size={18} />
                    <span className="font-semibold text-[#151b2b]">
                      {nextActionAnalysis.reserveActionText}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Decision Engine Transparency Callout */}
      <div className="bg-[#e7ecdc] p-4 rounded-xl border border-[#bccab0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#3d4d34]">
        <div className="space-y-0.5">
          <div className="font-bold text-[#151b2b]">Deterministic Execution Rule:</div>
          <div>
            Recommendations are computed using fixed thresholds, unit economics, and pro-rata pacing. No mock AI API calls or fabricated forecasting models are used.
          </div>
        </div>
        <button
          onClick={() => setActiveTab('channels')}
          className="ph-btn-orange text-xs px-3.5 py-1.5 font-bold cursor-pointer whitespace-nowrap self-start sm:self-auto flex items-center space-x-1"
        >
          <span>Adjust Channels</span>
          <ArrowRightIcon size={13} color="navy" />
        </button>
      </div>
    </div>
  );
}
