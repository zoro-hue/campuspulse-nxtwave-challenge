import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  ChannelBarsIcon,
  PencilIcon,
  UsersGroupIcon,
  LightbulbIcon,
  SuccessCheckIcon,
  InfoCircleIcon,
  ArrowRightIcon,
} from '../components/Icons';
import Mascot from '../components/Mascot';
import { UserPlus, UserCheck, MessageSquare, Database, ShieldCheck } from 'lucide-react';

export default function AboutDocsScreen() {
  const { setActiveTab } = useCampaign();

  const growthCapabilities = [
    {
      id: 'register',
      title: 'Student Registration Form',
      desc: 'Live student form with email normalization and duplicate prevention.',
      icon: UserPlus,
      color: '#16a34a',
      bg: '#dcfce7',
    },
    {
      id: 'ambassadors',
      title: 'Ambassador Growth Network',
      desc: 'Collision-free referral codes, shareable links, click & sign-up tracking.',
      icon: UserCheck,
      color: '#3d82f6',
      bg: '#dbeafe',
    },
    {
      id: 'channels',
      title: 'Channel Planning Engine',
      desc: 'Compare 500 target against live acquired vs demo benchmark registrations.',
      icon: ChannelBarsIcon,
      color: '#85bb75',
      bg: '#e8f5e9',
    },
    {
      id: 'actions',
      title: 'Rules-Based Next-Action Engine',
      desc: 'Deterministic recommendations with Day 3 / Day 6 ₹350 reserve unlocking policy.',
      icon: LightbulbIcon,
      color: '#d97706',
      bg: '#fef3c7',
    },
  ];

  const implementedFeatures = [
    {
      title: 'Built and verified live registration & attribution engine',
      desc: 'Local persistent database in database.json tracks students, colleges, and attributed ambassadors in real time.',
      status: 'Shipped & Live',
    },
    {
      title: 'Unique collision-free ambassador referral system',
      desc: 'Generates unique codes (e.g. RAHUL-AI) with shareable ?ref=CODE links and 1-click wa.me invitation sharing.',
      status: 'Shipped & Live',
    },
    {
      title: 'Strict duplicate prevention by normalized email',
      desc: 'Server and client enforce email.trim().toLowerCase() checks to prevent multi-submissions and count inflation.',
      status: 'Shipped & Live',
    },
    {
      title: 'Pro-rata pacing checks & ₹350 reserve release rules',
      desc: 'Transparent deterministic evaluation prevents spending the ₹350 reserve unless Day 3 pace (150 signups) is satisfied.',
      status: 'Shipped & Live',
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#151b2b] tracking-tight">
          About CampusPulse
        </h1>
        <p className="mt-1 text-sm sm:text-base text-[#4d5c45] font-medium">
          A PostHog-inspired Growth Sprint Engine built for the NxtWave Growth Challenge.
        </p>
      </div>

      {/* Prominent Transparency Callout Banner */}
      <div className="bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5 shadow-xs">
        <div className="w-8 h-8 rounded-full bg-[#151b2b] text-[#cad5be] flex items-center justify-center flex-shrink-0 mt-0.5">
          <InfoCircleIcon size={20} />
        </div>
        <div className="text-xs sm:text-sm text-[#384632] leading-relaxed font-medium space-y-1">
          <p>
            <strong className="text-[#151b2b]">Architecture & Transparency Notice:</strong>{' '}
            CampusPulse uses <strong>deterministic rules, fixed templates, and local persistent JSON storage</strong>. It makes zero external AI API calls. All recommendations, pacing gates, and reserve unlocking rules are 100% deterministic, inspectable, and reproducible.
          </p>
        </div>
      </div>

      {/* Functional Growth Capabilities */}
      <div>
        <h2 className="text-sm sm:text-base font-bold text-[#151b2b] mb-3">
          Growth Engine Capabilities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {growthCapabilities.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => setActiveTab(feat.id)}
                className="ph-card p-4 sm:p-5 border border-[#dcdecb] flex items-start space-x-3.5 cursor-pointer hover:bg-[#ebf0e0]/70 transition-all duration-150 group shadow-xs"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: feat.bg }}
                >
                  <Icon className="w-5 h-5" style={{ color: feat.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm sm:text-base text-[#151b2b] group-hover:text-[#f5a623] transition-colors">
                      {feat.title}
                    </span>
                    <ArrowRightIcon size={14} color="gray" className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-[#54624d] mt-1 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed Roadmap Sprint Items & Mascot */}
      <div className="ph-card p-5 sm:p-6 border border-[#dcdecb] flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xs">
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-center space-x-2 text-[#151b2b] font-bold text-sm sm:text-base">
            <div className="w-5 h-5 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span>NxtWave Growth Sprint Upgrades (Implemented & Verified)</span>
          </div>

          <div className="space-y-2.5 pt-1 pl-1">
            {implementedFeatures.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#485466]">
                <div className="w-4 h-4 rounded-full bg-[#dcfce7] border border-[#86efac] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#166534]">
                  <SuccessCheckIcon size={12} />
                </div>
                <div>
                  <div className="font-bold text-[#151b2b] flex items-center space-x-2">
                    <span>{item.title}</span>
                    <span className="text-[10px] uppercase font-extrabold bg-[#dcfce7] text-[#166534] px-1.5 py-0.2 rounded border border-[#86efac]">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#5a6a52] leading-snug mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hedgehog holding survey/checklist on right */}
        <div className="flex-shrink-0 self-center md:self-auto pr-3">
          <Mascot name="survey" size={135} alt="Checklist Audit Hedgehog" />
        </div>
      </div>
    </div>
  );
}
