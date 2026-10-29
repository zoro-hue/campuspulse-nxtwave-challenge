import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  HomeIcon,
  ChannelBarsIcon,
  PencilIcon,
  UsersGroupIcon,
  LightbulbIcon,
  DocsIcon,
} from './Icons';
import { Gamepad2, UserCheck, UserPlus, MessageSquare } from 'lucide-react';

export default function LeftNavRail() {
  const { activeTab, setActiveTab, hedgehogMode, setHedgehogMode } = useCampaign();

  const navItems = [
    { id: 'overview', label: 'Home', icon: HomeIcon, isLucide: false },
    { id: 'channels', label: 'Channel planning', icon: ChannelBarsIcon, isLucide: false },
    { id: 'referrals', label: 'Referral scenarios', icon: UsersGroupIcon, isLucide: false },
    { id: 'actions', label: 'Next actions', icon: LightbulbIcon, isLucide: false },
    { id: 'docs', label: 'Docs', icon: DocsIcon, isLucide: false },
  ];

  return (
    <aside className="w-[84px] sm:w-[94px] flex-shrink-0 flex flex-col items-center py-1 select-none z-20">
      <div className="flex flex-col items-center space-y-1.5 w-full px-1 max-h-[calc(100vh-80px)] overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = activeTab === item.id || (item.id === 'registrations' && activeTab === 'register');
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all duration-150 group cursor-pointer ${
                isActive
                  ? 'text-[#151b2b] font-bold'
                  : 'text-[#364430] hover:text-[#151b2b]'
              }`}
            >
              {/* White/Cream rounded icon container */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                  isActive
                    ? 'bg-[#151b2b] text-[#cad5be] shadow-sm'
                    : 'bg-[#f4f3e9] text-[#364430] border border-[#d2d9c4] shadow-xs'
                }`}
              >
                {item.isLucide ? (
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#cad5be]' : 'text-[#364430]'
                    }`}
                  />
                ) : (
                  <Icon
                    size={18}
                    color={isActive ? '#cad5be' : '#364430'}
                    className="transition-colors"
                  />
                )}
              </div>

              {/* Centered label below icon */}
              <span
                className={`mt-1 text-[10px] leading-tight text-center max-w-[80px] break-words ${
                  isActive ? 'text-[#151b2b] font-bold' : 'text-[#364430] font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* DEMO Interactive Tile at bottom of rail */}
        <div className="pt-1 w-full px-1">
          <button
            onClick={() => setHedgehogMode(!hedgehogMode)}
            title="Toggle Animated Hedgehog Mode"
            className={`w-full p-1.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer group ${
              hedgehogMode
                ? 'bg-[#f5a623] border-[#ba760d] text-[#151b2b] shadow-md ring-2 ring-[#ffd56b]'
                : 'bg-[#68533c] hover:bg-[#7b6247] border-[#4a3928] text-white shadow-sm'
            }`}
          >
            {/* Retro 8-bit style badge */}
            <div className="w-full flex items-center justify-center space-x-1 py-0.5 px-1 bg-black/35 rounded border border-white/20">
              <Gamepad2 className="w-3 h-3 text-[#f5a623]" />
              <span className="font-extrabold text-[10px] tracking-wider text-[#ffd56b] font-mono">
                DEMO
              </span>
            </div>
            <span className="text-[9px] mt-0.5 font-semibold text-center leading-none text-[#f4f3e9]">
              {hedgehogMode ? 'Hogs Active!' : 'Demo'}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
