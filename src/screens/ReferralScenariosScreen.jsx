import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { Calculator, Users, TrendingUp, Info, UserCheck } from 'lucide-react';
import Mascot from '../components/Mascot';
import AmbassadorScreen from './AmbassadorScreen';

export default function ReferralScenariosScreen() {
  const { assumptions, setAssumptions, referralCalculations } = useCampaign();
  const [subTab, setSubTab] = useState('ambassadors'); // 'ambassadors' | 'calculator'

  const handleAssumptionChange = (field, val) => {
    setAssumptions((prev) => ({
      ...prev,
      [field]: Math.max(0, Number(val) || 0),
    }));
  };

  const {
    consRate,
    consRegistrations,
    baseRate,
    baseRegistrations,
    optRate,
    optRegistrations,
    chartData,
  } = referralCalculations;

  // Compute SVG chart coordinates
  const maxVal = Math.max(50, Math.ceil(optRegistrations * 1.25));
  const svgWidth = 600;
  const svgHeight = 180;
  const paddingX = 45;
  const paddingY = 25;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  const getX = (idx) => paddingX + (idx / 6) * chartW;
  const getY = (val) => paddingY + chartH - (val / maxVal) * chartH;

  const consPoints = chartData.map((d, i) => `${getX(i)},${getY(d.conservative)}`).join(' ');
  const basePoints = chartData.map((d, i) => `${getX(i)},${getY(d.base)}`).join(' ');
  const optPoints = chartData.map((d, i) => `${getX(i)},${getY(d.optimistic)}`).join(' ');

  return (
    <div className="w-full space-y-5">
      {/* Top Sub-Tab Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dcdecb] pb-3">
        <div className="flex items-center space-x-1.5 bg-[#e4ebdb] p-1 rounded-xl border border-[#c5d3b6] text-xs font-bold">
          <button
            onClick={() => setSubTab('ambassadors')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer ${
              subTab === 'ambassadors'
                ? 'bg-[#151b2b] text-[#f4f3e9] shadow-xs'
                : 'text-[#485642] hover:text-[#151b2b]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-[#85bb75]" />
            <span>Ambassador Growth Network (Live)</span>
          </button>

          <button
            onClick={() => setSubTab('calculator')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer ${
              subTab === 'calculator'
                ? 'bg-[#151b2b] text-[#f4f3e9] shadow-xs'
                : 'text-[#485642] hover:text-[#151b2b]'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-[#f5a623]" />
            <span>Scenario Projections (7-Day Model)</span>
          </button>
        </div>

        <div className="text-xs text-[#52634b] font-medium hidden sm:block">
          {subTab === 'ambassadors'
            ? 'Active Growth Asset • 150 Target Registrations'
            : 'Planning Simulation • Editable Sensitivity Assumptions'}
        </div>
      </div>

      {subTab === 'ambassadors' ? (
        <AmbassadorScreen />
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#151b2b] tracking-tight">
              Referral scenarios
            </h1>
            <p className="mt-1 text-sm sm:text-base text-[#4d5c45] font-medium">
              Model conservative, base and optimistic outcomes from editable assumptions.
            </p>
          </div>

          {/* Edit Assumptions Card */}
          <div className="ph-card p-4 sm:p-5 border border-[#dcdecb]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Inputs Section */}
              <div className="md:col-span-8">
                <h2 className="text-sm font-bold text-[#151b2b] mb-3">Edit assumptions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#54624d] mb-1">
                      Number of ambassadors
                    </label>
                    <input
                      type="number"
                      value={assumptions.ambassadors}
                      onChange={(e) => handleAssumptionChange('ambassadors', e.target.value)}
                      className="w-full bg-[#e7ecd9] border border-[#bccab0] rounded-xl px-3 py-1.5 text-sm font-bold text-[#151b2b] focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#54624d] mb-1">
                      Invites per ambassador
                    </label>
                    <input
                      type="number"
                      value={assumptions.invitesPerAmbassador}
                      onChange={(e) =>
                        handleAssumptionChange('invitesPerAmbassador', e.target.value)
                      }
                      className="w-full bg-[#e7ecd9] border border-[#bccab0] rounded-xl px-3 py-1.5 text-sm font-bold text-[#151b2b] focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#54624d] mb-1">
                      Sign-up rate from invites
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={assumptions.signupRate}
                        onChange={(e) => handleAssumptionChange('signupRate', e.target.value)}
                        className="w-full bg-[#e7ecd9] border border-[#bccab0] rounded-xl pl-3 pr-7 py-1.5 text-sm font-bold text-[#151b2b] focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
                        min="1"
                        max="100"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#54624d]">
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formula Sidebar Note */}
              <div className="md:col-span-4 bg-[#e7ecd9]/70 border border-[#bccab0] rounded-xl p-3 text-[11px] text-[#4d5c45] space-y-1">
                <span className="font-bold text-[#151b2b] block">Formula (for reference)</span>
                <p className="leading-snug">
                  Total registrations = Number of ambassadors × Invites per ambassador × Sign-up rate
                </p>
              </div>
            </div>
          </div>

          {/* Three Projected Outcomes Cards */}
          <div>
            <h2 className="text-sm font-bold text-[#151b2b] mb-3">
              Projected registrations{' '}
              <span className="text-xs font-normal text-[#54624d]">
                (modelled estimates, not forecasts)
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Conservative */}
              <div className="bg-[#fde8e8] border border-[#f6d2d2] rounded-2xl p-4 text-center shadow-xs">
                <div className="text-xs font-bold text-[#e04f4f]">Conservative</div>
                <div className="text-[11px] text-[#73826b] mt-0.5">{consRate}% sign-up rate</div>
                <div className="text-3xl font-extrabold text-[#151b2b] my-1">
                  {consRegistrations}
                </div>
                <div className="text-[11px] text-[#54624d]">registrations</div>
                <div className="mt-2 flex justify-center">
                  <Mascot name="inspect" size={60} alt="Conservative Hedgehog" />
                </div>
              </div>

              {/* Base case */}
              <div className="bg-[#e4effc] border border-[#cadff9] rounded-2xl p-4 text-center shadow-xs">
                <div className="text-xs font-bold text-[#2563eb]">Base case</div>
                <div className="text-[11px] text-[#73826b] mt-0.5">{baseRate}% sign-up rate</div>
                <div className="text-3xl font-extrabold text-[#151b2b] my-1">
                  {baseRegistrations}
                </div>
                <div className="text-[11px] text-[#54624d]">registrations</div>
                <div className="mt-2 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#3d82f6]/15 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[#2563eb]" />
                  </div>
                </div>
              </div>

              {/* Optimistic */}
              <div className="bg-[#e7f6e4] border border-[#cbeac7] rounded-2xl p-4 text-center shadow-xs">
                <div className="text-xs font-bold text-[#16a34a]">Optimistic</div>
                <div className="text-[11px] text-[#73826b] mt-0.5">{optRate}% sign-up rate</div>
                <div className="text-3xl font-extrabold text-[#151b2b] my-1">
                  {optRegistrations}
                </div>
                <div className="text-[11px] text-[#54624d]">registrations</div>
                <div className="mt-2 flex justify-center">
                  <Mascot name="celebrate" size={60} alt="Optimistic Hedgehog" />
                </div>
              </div>
            </div>
          </div>

          {/* 7-Day Cumulative Trajectory Chart */}
          <div className="ph-card p-4 sm:p-5 border border-[#dcdecb]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h2 className="text-sm font-bold text-[#151b2b]">
                7-day cumulative referral trajectory
              </h2>

              {/* Chart Legend */}
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f46b9b]"></span>
                  <span className="text-[#54624d]">Conservative</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3d82f6]"></span>
                  <span className="text-[#54624d]">Base case</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a]"></span>
                  <span className="text-[#54624d]">Optimistic</span>
                </div>
              </div>
            </div>

            {/* Responsive SVG Chart */}
            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[500px]">
                {/* Horizontal Grid lines & Y-axis labels */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                  const y = paddingY + chartH - ratio * chartH;
                  const val = Math.round(ratio * maxVal);
                  return (
                    <g key={idx}>
                      <line
                        x1={paddingX}
                        y1={y}
                        x2={svgWidth - paddingX}
                        y2={y}
                        stroke="#d6dec8"
                        strokeDasharray={idx === 0 ? 'none' : '3,3'}
                        strokeWidth="1"
                      />
                      <text
                        x={paddingX - 10}
                        y={y + 3}
                        fontSize="10"
                        fill="#6c7c64"
                        textAnchor="end"
                        fontWeight="600"
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* X-axis Days labels */}
                {chartData.map((d, idx) => {
                  const x = getX(idx);
                  return (
                    <text
                      key={idx}
                      x={x}
                      y={svgHeight - 6}
                      fontSize="10"
                      fill="#6c7c64"
                      textAnchor="middle"
                      fontWeight="600"
                    >
                      {d.day}
                    </text>
                  );
                })}

                {/* Trajectory Lines */}
                <polyline
                  fill="none"
                  stroke="#f46b9b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={consPoints}
                />
                <polyline
                  fill="none"
                  stroke="#3d82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={basePoints}
                />
                <polyline
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={optPoints}
                />

                {/* Data Points */}
                {chartData.map((d, i) => (
                  <g key={i}>
                    <circle cx={getX(i)} cy={getY(d.conservative)} r="3.5" fill="#f46b9b" />
                    <circle cx={getX(i)} cy={getY(d.base)} r="3.5" fill="#3d82f6" />
                    <circle cx={getX(i)} cy={getY(d.optimistic)} r="3.5" fill="#16a34a" />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
