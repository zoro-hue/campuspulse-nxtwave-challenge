import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  FileText,
  Clock,
  BookOpen,
  ShoppingBag,
  Briefcase,
  Trash2,
  X,
  CheckCircle2,
} from 'lucide-react';

/**
 * RightNavRail — Faithful recreation of PostHog's right-side navigation rail
 * as seen in the official PostHog UI screenshot.
 */
export default function RightNavRail() {
  const { setActiveTab } = useCampaign();
  const [modalItem, setModalItem] = useState(null);

  const rightItems = [
    {
      id: 'about',
      label: 'About us',
      icon: FileText,
      title: 'About CampusPulse Team',
      desc: 'Built for the NxtWave Growth Challenge — campus-first distribution system targeting 500 final-year engineering students for the 60-minute AI workshop.',
    },
    {
      id: 'changelog',
      label: 'Changelog',
      icon: Clock,
      title: 'Sprint Changelog (v1.2)',
      desc: '• Exact PostHog UI recreation with sage grass canvas & outline icon set.\n• Deterministic rules engine with pro-rata pacing gates.\n• Integrated PixiJS Hedgehog Mode animations.',
    },
    {
      id: 'handbook',
      label: 'Company handbook',
      icon: BookOpen,
      title: 'Growth Sprint Playbook',
      desc: 'Transparent guidelines: 20 clubs + 15 ambassadors + 10 WhatsApp admins. Zero external AI API calls. Fixed ₹350 reserve release rules.',
    },
    {
      id: 'store',
      label: 'Store',
      icon: ShoppingBag,
      title: 'Campus Ambassador Swag',
      desc: 'Physical stickers, certificates of completion, and placement referral credits for high-performing student ambassadors.',
    },
    {
      id: 'careers',
      label: 'Careers',
      icon: Briefcase,
      title: 'NxtWave Growth Roles',
      desc: 'Campus Growth Lead & Student Community Ambassador roles available across participating engineering colleges.',
    },
    {
      id: 'trash',
      label: 'Trash',
      icon: Trash2,
      title: 'Archived Experiments',
      desc: 'No discarded experiments yet. All active variants and assumptions are preserved in localStorage.',
    },
  ];

  return (
    <>
      <aside className="w-[78px] flex-shrink-0 hidden xl:flex flex-col items-center py-2 select-none z-20">
        <div className="flex flex-col items-center space-y-3 w-full px-1">
          {rightItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setModalItem(item)}
                className="w-full flex flex-col items-center justify-center py-2 px-1 rounded-2xl text-[#364430] hover:bg-[#b9c8ad]/60 hover:text-[#151b2b] transition-all group cursor-pointer"
              >
                {/* Outlined Icon Container */}
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#f4f3e9]/80 border border-[#d2d9c4] text-[#364430] group-hover:scale-105 group-hover:bg-[#f4f3e9] transition-transform shadow-xs">
                  <Icon className="w-4 h-4 stroke-[2]" />
                </div>
                {/* Short Label */}
                <span className="mt-1 text-[10px] font-medium leading-tight text-center max-w-[70px] truncate">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Info Modal on Click */}
      {modalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl w-full max-w-md shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#dcdecb]">
              <div className="flex items-center space-x-2 text-[#151b2b] font-bold">
                <modalItem.icon className="w-4 h-4 text-[#3d82f6]" />
                <span>{modalItem.title}</span>
              </div>
              <button
                onClick={() => setModalItem(null)}
                className="text-[#485466] hover:text-[#151b2b] p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="py-4 text-xs sm:text-sm text-[#485466] whitespace-pre-line leading-relaxed">
              {modalItem.desc}
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setModalItem(null)}
                className="ph-btn-orange text-xs px-4 py-1.5 font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

