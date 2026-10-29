import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  UsersGroupIcon,
  ChannelBarsIcon,
  PencilIcon,
  ResetIcon,
} from '../components/Icons';
import Mascot from '../components/Mascot';

export default function ChannelPlanningScreen() {
  const {
    channels,
    updateChannel,
    totalTarget,
    totalBudget,
    resetAllData,
    isLiveMode,
    setIsLiveMode,
    liveStats,
    resetLiveCampaignApi,
    showToast,
  } = useCampaign();

  const getChannelIcon = (id) => {
    switch (id) {
      case 'clubs':
        return <UsersGroupIcon size={16} color="#ffffff" />;
      case 'ambassadors':
        return <UsersGroupIcon size={16} color="#ffffff" />;
      case 'whatsapp':
        return <ChannelBarsIcon size={16} color="#ffffff" />;
      case 'social':
        return <PencilIcon size={16} color="#ffffff" />;
      default:
        return <ChannelBarsIcon size={16} color="#ffffff" />;
    }
  };

  const getLiveChannelCount = (id) => {
    switch (id) {
      case 'clubs':
        return liveStats.channelBreakdown['Clubs & Class Reps'] || 0;
      case 'ambassadors':
        return liveStats.channelBreakdown['Student Ambassadors'] || 0;
      case 'whatsapp':
        return liveStats.channelBreakdown['WhatsApp Communities'] || 0;
      case 'social':
        return liveStats.channelBreakdown['Social & Paid Test'] || 0;
      default:
        return 0;
    }
  };

  return (
    <div className="w-full space-y-5">
      {/* Header with Mascot & Live Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#151b2b] tracking-tight">
              Channel planning
            </h1>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${
                isLiveMode
                  ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]'
                  : 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]'
              }`}
            >
              {isLiveMode ? 'Live Mode' : 'Demo Mode'}
            </span>
          </div>
          <p className="mt-1 text-sm sm:text-base text-[#4d5c45] font-medium">
            Compare planned targets with {isLiveMode ? 'live acquired' : 'demo'} registrations and pace across channels.
          </p>
        </div>

        {/* View Toggle Pill */}
        <div className="flex items-center space-x-1.5 bg-[#eaefdf] p-1 rounded-xl border border-[#c5d3b6] text-xs font-bold self-start sm:self-center">
          <button
            onClick={() => setIsLiveMode(true)}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              isLiveMode
                ? 'bg-[#151b2b] text-[#f4f3e9] shadow-xs'
                : 'text-[#485642] hover:text-[#151b2b]'
            }`}
          >
            ● Live Stored
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

      {/* Main Table Card */}
      <div className="ph-card overflow-hidden shadow-sm border border-[#dcdecb]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#dcdecb] bg-[#eef1e6]/80 text-[#54624d] font-bold">
                <th className="py-3 px-3.5 sm:px-4">Channel</th>
                <th className="py-3 px-3 text-center sm:text-left">Target registrations</th>
                <th className="py-3 px-3 text-center sm:text-left">
                  {isLiveMode ? (
                    <span className="text-[#166534]">Live Stored Sign-ups</span>
                  ) : (
                    <span>
                      Demo registrations{' '}
                      <span className="text-[10px] font-normal text-[#73826b]">(seeded)</span>
                    </span>
                  )}
                </th>
                <th className="py-3 px-3 text-center sm:text-left">Budget (₹)</th>
                <th className="py-3 px-3 text-center sm:text-left">Gap to target</th>
                <th className="py-3 px-3.5 sm:px-4 min-w-[120px]">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e7d7]">
              {channels.map((c) => {
                const currentCount = isLiveMode ? getLiveChannelCount(c.id) : c.demo;
                const gap = Math.max(0, c.target - currentCount);
                const progressPct =
                  c.target > 0 ? Math.min(100, Math.round((currentCount / c.target) * 100)) : 0;

                return (
                  <tr key={c.id} className="hover:bg-[#eaeedf]/50 transition-colors">
                    {/* Channel name + icon */}
                    <td className="py-3.5 px-3.5 sm:px-4 font-bold text-[#151b2b] flex items-center space-x-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 shadow-xs"
                        style={{ backgroundColor: c.color }}
                      >
                        {getChannelIcon(c.id)}
                      </div>
                      <span className="truncate">{c.name}</span>
                    </td>

                    {/* Target registrations */}
                    <td className="py-3.5 px-3 text-center sm:text-left font-semibold text-[#151b2b]">
                      <div className="flex items-center space-x-1 sm:space-x-1.5 justify-center sm:justify-start">
                        <input
                          type="number"
                          value={c.target}
                          onChange={(e) => updateChannel(c.id, 'target', e.target.value)}
                          className="w-16 bg-[#e4ebd7] border border-[#bccab0] rounded-md px-2 py-1 text-center sm:text-left font-bold text-xs sm:text-sm text-[#151b2b] focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
                          min="0"
                        />
                      </div>
                    </td>

                    {/* Current registrations (Live vs Demo) */}
                    <td className="py-3.5 px-3 text-center sm:text-left">
                      {isLiveMode ? (
                        <div className="font-extrabold text-[#166534] bg-[#dcfce7] inline-block px-2.5 py-0.5 rounded-full text-xs border border-[#86efac]">
                          {currentCount} verified
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 sm:space-x-1.5 justify-center sm:justify-start">
                          <input
                            type="number"
                            value={c.demo}
                            onChange={(e) => updateChannel(c.id, 'demo', e.target.value)}
                            className="w-16 bg-[#e4ebd7] border border-[#bccab0] rounded-md px-2 py-1 text-center sm:text-left font-bold text-xs sm:text-sm text-[#151b2b] focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
                            min="0"
                          />
                        </div>
                      )}
                    </td>

                    {/* Budget */}
                    <td className="py-3.5 px-3 text-center sm:text-left font-semibold text-[#151b2b]">
                      ₹{c.budget.toLocaleString()}
                    </td>

                    {/* Gap to target */}
                    <td className="py-3.5 px-3 text-center sm:text-left font-semibold text-[#54624d]">
                      {gap}
                    </td>

                    {/* Progress bar */}
                    <td className="py-3.5 px-3.5 sm:px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-[#d6dec7] h-2.5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${progressPct}%`,
                              backgroundColor: c.color,
                            }}
                          ></div>
                        </div>
                        <span className="text-[11px] font-bold text-[#151b2b] min-w-[32px] text-right">
                          {progressPct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table footer with totals and reset button */}
        <div className="bg-[#eef1e6]/60 border-t border-[#dcdecb] px-4 py-2.5 flex flex-wrap items-center justify-between text-xs text-[#54624d] gap-2">
          <div className="flex items-center space-x-3">
            <span>
              Target Total: <strong className="text-[#151b2b]">{totalTarget}</strong>
            </span>
            <span>·</span>
            <span>
              {isLiveMode ? 'Live Total: ' : 'Demo Total: '}
              <strong className="text-[#151b2b]">
                {isLiveMode
                  ? liveStats.totalRegistrations
                  : channels.reduce((sum, c) => sum + c.demo, 0)}
              </strong>
            </span>
            <span>·</span>
            <span>
              Allocated Budget:{' '}
              <strong className="text-[#151b2b]">
                ₹{channels.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
              </strong>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {isLiveMode ? (
              <button
                onClick={resetLiveCampaignApi}
                className="flex items-center space-x-1.5 text-xs font-semibold text-[#8b3d3d] hover:text-[#661d1d] transition-colors py-1 cursor-pointer"
              >
                <ResetIcon size={14} color="red" />
                <span>Reset Live Database</span>
              </button>
            ) : (
              <button
                onClick={resetAllData}
                className="flex items-center space-x-1.5 text-xs font-semibold text-[#54624d] hover:text-[#151b2b] transition-colors py-1 cursor-pointer"
              >
                <ResetIcon size={14} color="gray" />
                <span>Reset Demo Numbers</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Dedicated Reserve Policy Callout */}
      <div className="bg-[#e7ecdc] p-3.5 rounded-xl border border-[#bccab0] flex items-center justify-between text-xs text-[#394931]">
        <div>
          <strong className="text-[#151b2b]">₹350 Reserve Allocation Rule:</strong>{' '}
          Release ₹350 only on Day 3 or Day 6 to a channel at or above pace; otherwise leave it unspent.
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#cad5be] text-[11px] font-bold text-[#2d3a24] whitespace-nowrap ml-3">
          Rule-Protected
        </span>
      </div>

      {/* Two Breakdown Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Visualization 1: Registration Mix */}
        <div className="ph-card p-4 sm:p-5 border border-[#dcdecb]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-base font-bold text-[#151b2b]">
              Registration mix (target {totalTarget})
            </h2>
            <span className="text-[11px] font-semibold text-[#54624d]">100% Planned</span>
          </div>

          {/* Segmented bar */}
          <div className="h-9 w-full rounded-xl overflow-hidden flex shadow-xs border border-[#bccab0]/50">
            {channels.map((c) => {
              const pct = totalTarget > 0 ? (c.target / totalTarget) * 100 : 25;
              return (
                <div
                  key={c.id}
                  style={{
                    width: `${pct}%`,
                    backgroundColor: c.color,
                  }}
                  className="h-full flex items-center justify-center text-[11px] font-bold text-white transition-all overflow-hidden"
                  title={`${c.name}: ${c.target} (${pct.toFixed(0)}%)`}
                >
                  <span className="truncate px-1 drop-shadow-xs">{c.target}</span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#54624d]">
            {channels.map((c) => (
              <div key={c.id} className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c.color }}></span>
                <span className="truncate font-medium">{c.name}</span>
                <span className="font-bold text-[#151b2b]">
                  ({totalTarget > 0 ? Math.round((c.target / totalTarget) * 100) : 0}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visualization 2: Budget Allocation */}
        <div className="ph-card p-4 sm:p-5 border border-[#dcdecb]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-base font-bold text-[#151b2b]">
              Budget allocation (₹{totalBudget.toLocaleString()} total)
            </h2>
            <span className="text-[11px] font-semibold text-[#54624d]">₹2,000 Cap</span>
          </div>

          {/* Segmented bar */}
          <div className="h-9 w-full rounded-xl overflow-hidden flex shadow-xs border border-[#bccab0]/50">
            {/* Student ambassadors */}
            <div
              style={{ width: `${(500 / totalBudget) * 100}%`, backgroundColor: '#3d82f6' }}
              className="h-full flex flex-col items-center justify-center text-[10px] font-bold text-white px-1"
              title="Student ambassadors: ₹500"
            >
              <span>₹500</span>
              <span className="text-[8px] opacity-90">(25%)</span>
            </div>

            {/* Social + paid test */}
            <div
              style={{ width: `${(1150 / totalBudget) * 100}%`, backgroundColor: '#f46b9b' }}
              className="h-full flex flex-col items-center justify-center text-[10px] font-bold text-white px-1"
              title="Social + paid test: ₹1,150"
            >
              <span>₹1,150</span>
              <span className="text-[8px] opacity-90">(57.5%)</span>
            </div>

            {/* Reserve */}
            <div
              style={{ width: `${(350 / totalBudget) * 100}%`, backgroundColor: '#f5a623' }}
              className="h-full flex flex-col items-center justify-center text-[10px] font-bold text-white px-1"
              title="Reserve: ₹350"
            >
              <span>₹350</span>
              <span className="text-[8px] opacity-90">(17.5%)</span>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-3 flex items-center justify-between text-xs text-[#54624d]">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#3d82f6]"></span>
              <span className="font-medium">Ambassadors</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#f46b9b]"></span>
              <span className="font-medium">Social + paid</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#f5a623]"></span>
              <span className="font-medium">Reserve</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
