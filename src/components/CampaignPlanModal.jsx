import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  CalendarIcon,
  TargetIcon,
  MoneyPouchIcon,
  SuccessCheckIcon,
  ArrowRightIcon,
  InfoCircleIcon,
} from './Icons';
import { X } from 'lucide-react';

export default function CampaignPlanModal() {
  const { campaignPlanOpen, setCampaignPlanOpen, setActiveTab } = useCampaign();

  if (!campaignPlanOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#dcdecb]">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#cad5be] text-[#2d3a24] text-xs font-bold mb-2">
              <CalendarIcon size={14} color="navy" />
              <span>7-Day Growth Sprint Masterplan</span>
            </div>
            <h2 className="text-2xl font-bold text-[#151b2b]">
              Build Your First AI Project in 60 Minutes
            </h2>
            <p className="text-sm text-[#485466] mt-0.5">
              500 registrations · ₹2,000 budget · 45 planned student distribution nodes
            </p>
          </div>
          <button
            onClick={() => setCampaignPlanOpen(false)}
            className="p-1.5 rounded-lg text-[#485466] hover:bg-[#dfe5d2] hover:text-[#151b2b] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="py-5 space-y-6">
          {/* Key pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#e4ebd7] p-3.5 rounded-xl border border-[#bccab0]">
              <div className="text-xs font-semibold text-[#576949] uppercase tracking-wider">
                Audience Filter
              </div>
              <div className="text-base font-bold text-[#151b2b] mt-1">
                Final-Year Engineering
              </div>
              <div className="text-xs text-[#485466] mt-0.5">
                Focusing on immediate placement & resume needs
              </div>
            </div>

            <div className="bg-[#e4ebd7] p-3.5 rounded-xl border border-[#bccab0]">
              <div className="text-xs font-semibold text-[#576949] uppercase tracking-wider">
                Distribution Unit Math
              </div>
              <div className="text-base font-bold text-[#151b2b] mt-1">
                ≈45 Planned Nodes
              </div>
              <div className="text-xs text-[#485466] mt-0.5">
                20 clubs + 15 ambassadors + 10 WhatsApp admins
              </div>
            </div>

            <div className="bg-[#e4ebd7] p-3.5 rounded-xl border border-[#bccab0]">
              <div className="text-xs font-semibold text-[#576949] uppercase tracking-wider">
                Contingency Reserve
              </div>
              <div className="text-base font-bold text-[#151b2b] mt-1">
                ₹350 Protected
              </div>
              <div className="text-xs text-[#485466] mt-0.5">
                Released only to pace winners on Day 3 or Day 6
              </div>
            </div>
          </div>

          {/* 7-Day Day-by-Day Timeline */}
          <div>
            <h3 className="font-bold text-base text-[#151b2b] mb-3 flex items-center space-x-2">
              <TargetIcon size={18} color="warning" />
              <span>Sprint Execution Roadmap (Days 1–7)</span>
            </h3>

            <div className="space-y-2.5">
              {[
                {
                  day: 'Day 1',
                  title: 'Distribution Kickoff & Ambassador Briefing',
                  desc: 'Activate 15 recruited ambassadors with unique referral tracking links. Post initial announcements via 20 club heads and class reps.',
                  target: 'Cumulative 60 sign-ups (12% of goal)',
                  badge: 'Trust Launch',
                },
                {
                  day: 'Day 2',
                  title: 'WhatsApp Peer Broadcast & Social Teaser',
                  desc: 'Admins circulate workshop project syllabus in 10 verified student groups. Launch organic social reel with student testimonial.',
                  target: 'Cumulative 140 sign-ups (28% of goal)',
                  badge: 'Peer Amplification',
                },
                {
                  day: 'Day 3',
                  title: 'Mid-Sprint Pace Check & Reserve Gate 1',
                  desc: 'Deterministic audit: Flag any channel below 30% of target. If a channel exceeds pace, release up to ₹175 of the ₹350 reserve.',
                  target: 'Cumulative 230 sign-ups (46% of goal)',
                  badge: 'Decision Gate 1',
                  highlight: true,
                },
                {
                  day: 'Day 4',
                  title: 'A/B Message Test Optimization',
                  desc: 'Swap low-performing copy with winning Variant A (“Build your first AI project in 60 min”) across all ambassador messaging.',
                  target: 'Cumulative 310 sign-ups (62% of goal)',
                  badge: 'Copy Tuning',
                },
                {
                  day: 'Day 5',
                  title: 'Placement & Career Angle Retargeting',
                  desc: 'Push outcome-focused messages: recruiters value verified GitHub AI project proofs. Target non-CS engineering departments.',
                  target: 'Cumulative 390 sign-ups (78% of goal)',
                  badge: 'Outcome Push',
                },
                {
                  day: 'Day 6',
                  title: 'Second Reserve Gate & Ambassador Surge',
                  desc: 'Evaluate pace: Allocate remaining ₹175 reserve to highest-performing student ambassadors with referral incentives.',
                  target: 'Cumulative 460 sign-ups (92% of goal)',
                  badge: 'Decision Gate 2',
                  highlight: true,
                },
                {
                  day: 'Day 7',
                  title: 'Final Urgency & Live Workshop Pre-Check',
                  desc: 'Send countdown messages: “Workshop begins in 6 hours - limited cloud environment seats.” Conduct deduping on email/phone.',
                  target: 'Goal: 500 validated registrations',
                  badge: 'Final Sprint',
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-start space-x-3 ${
                    step.highlight
                      ? 'bg-[#e7efdc] border-[#9fb091]'
                      : 'bg-[#ecf0e4] border-[#d5dccb]'
                  }`}
                >
                  <div className="w-16 flex-shrink-0 text-xs font-bold px-2 py-1 bg-[#d5deca] text-[#2d3a24] rounded-lg text-center">
                    {step.day}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#151b2b]">
                        {step.title}
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#cad6be] text-[#34422e]">
                        {step.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#485466] mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                    <div className="text-[11px] font-semibold text-[#276e27] mt-1">
                      Target: {step.target}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transparency note */}
          <div className="bg-[#e6ecd9] p-3.5 rounded-xl border border-[#bccab0] flex items-center justify-between">
            <div className="flex items-center space-x-2.5 text-xs text-[#394931]">
              <InfoCircleIcon size={18} />
              <span>
                <strong>Plan Note:</strong> This strategy reflects the verified submission notes for the NxtWave Growth Challenge.
              </span>
            </div>
            <button
              onClick={() => {
                setCampaignPlanOpen(false);
                setActiveTab('channels');
              }}
              className="ph-btn-orange text-xs px-3.5 py-1.5 cursor-pointer whitespace-nowrap ml-3 flex items-center space-x-1"
            >
              <span>Explore Channels</span>
              <ArrowRightIcon size={12} color="navy" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
