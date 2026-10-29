import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  MessageSquare,
  Send,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  Users,
  Target,
} from 'lucide-react';

export default function WhatsAppOutreachScreen() {
  const { ambassadors, showToast } = useCampaign();

  const [audience, setAudience] = useState('Clubs & Class Reps'); // 'Clubs & Class Reps' | 'Ambassadors' | 'Student Communities'
  const [messageType, setMessageType] = useState('Initial Invitation'); // 'Initial Invitation' | '48h Reminder' | 'Final-Day Reminder'
  const [tone, setTone] = useState('Friendly'); // 'Friendly' | 'Concise' | 'Enthusiastic'
  const [selectedAmbassadorCode, setSelectedAmbassadorCode] = useState(
    ambassadors.length > 0 ? ambassadors[0].code : ''
  );
  const [copied, setCopied] = useState(false);
  const [customDomain, setCustomDomain] = useState(() => {
    return localStorage.getItem('campuspulse_custom_domain') || '';
  });

  const activeAmbassadors = ambassadors.filter((a) => a.status === 'active');

  const effectiveOrigin = (customDomain.trim() || window.location.origin).replace(/\/$/, '');
  const referralSuffix = selectedAmbassadorCode
    ? `?ref=${selectedAmbassadorCode}#registrations`
    : `#registrations`;
  const liveWorkshopUrl = `${effectiveOrigin}${referralSuffix}`;

  // Deterministic copy matrix based on (Audience, Message Type, Tone)
  const getTemplate = () => {
    // 1. Initial Invitation
    if (messageType === 'Initial Invitation') {
      if (audience === 'Clubs & Class Reps') {
        if (tone === 'Concise') {
          return `Hi Class Reps & Club Leads,
Sharing a free 60-minute practical AI workshop for our final-year engineering students:
📌 *Build Your First AI Project in 60 Minutes*
📅 Upcoming Saturday @ 6:00 PM IST (Online)
💡 Outcome: Deploy a working AI web project for placement portfolios
🎟️ Free Pass: ${liveWorkshopUrl}
Please forward this to your department batch groups!`;
        }
        if (tone === 'Enthusiastic') {
          return `🔥 *HUGE OPPORTUNITY FOR FINAL YEAR ENGINEERS!* 🔥
Respected Club Leads & Placement Coordinators,
NxtWave is hosting an exclusive high-impact hands-on build sprint:
🚀 *"Build Your First AI Project in 60 Minutes"*
Students code and deploy a live working AI application from scratch to stand out in upcoming placement drives.
📅 Saturday @ 6:00 PM IST | 100% Free
👉 Share this registration pass in your batch groups: ${liveWorkshopUrl}
Let's ensure 100% of our final-year batch has verified AI project proof!`;
        }
        // Friendly (default)
        return `Hello Club Leads & Class Representatives! 👋
We are organizing a dedicated skill-building sprint for final-year engineering students:
*"Build Your First AI Project in 60 Minutes"*
Students walk away with a live deployed AI project on GitHub for upcoming tech interviews.
📅 Upcoming Saturday @ 6:00 PM IST (Free)
🎟️ Registration Link: ${liveWorkshopUrl}
Kindly share this with your batch groups so seniors can grab a seat before slots cap out. Thank you!`;
      }

      if (audience === 'Ambassadors') {
        if (tone === 'Concise') {
          return `Ambassador Sprint Update:
Target: 500 final-year registrations.
Your custom referral link: ${liveWorkshopUrl}
Share this in your college WhatsApp groups. Every registration via your link credits your campus leaderboard!`;
        }
        if (tone === 'Enthusiastic') {
          return `🚀 *AMBASSADOR SPRINT LAUNCH!* 🚀
Team, our 7-day sprint to reach 500 final-year engineers is LIVE!
Your dedicated referral link:
👉 ${liveWorkshopUrl}
Share this with your branch groups and classmates. Every student who registers using your link is tracked in real-time on our leaderboard. Let's make this our highest-converting workshop cohort!`;
        }
        // Friendly
        return `Hey Ambassador Team! 🌟
Our sprint for *"Build Your First AI Project in 60 Minutes"* is officially open.
Here is your unique referral link to share:
👉 ${liveWorkshopUrl}
Share this with your engineering classmates. All registrations are automatically attributed to you in the live ledger. Happy spreading!`;
      }

      // Student Communities
      if (tone === 'Concise') {
        return `🚨 Free AI Workshop for Final-Year Engineers:
Build and deploy a working AI app in 60 minutes for placement resumes.
📅 Saturday @ 6:00 PM IST
🎟️ Register Free: ${liveWorkshopUrl}
Capped at 500 seats.`;
      }
      if (tone === 'Enthusiastic') {
        return `⚡ *Attention Final-Year Engineering Students (2026 Batch)!* ⚡
Want a real, working AI project on your resume and GitHub before technical placement interviews?
Join NxtWave's live 60-minute building sprint:
🔥 *"Build Your First AI Project in 60 Minutes"* 🔥
✅ Build & deploy code live
✅ Verified certificate of completion
✅ 100% Free registration
📅 Upcoming Saturday @ 6:00 PM IST
👉 Claim your free seat here: ${liveWorkshopUrl}`;
      }
      // Friendly
      return `Hey everyone! 👋
If you're in final year engineering, check out this free hands-on workshop:
*"Build Your First AI Project in 60 Minutes"*
In just one hour, you code and deploy a working AI project you can talk about in placement rounds.
📅 Saturday @ 6:00 PM IST
🎟️ Free Registration: ${liveWorkshopUrl}
Seats are filling quickly across campuses!`;
    }

    // 2. 48h Reminder
    if (messageType === '48h Reminder') {
      if (tone === 'Concise') {
        return `⏳ 48 Hours Remaining:
Registration for "Build Your First AI Project in 60 Minutes" closes soon.
📅 Saturday @ 6:00 PM IST
👉 Secure seat: ${liveWorkshopUrl}`;
      }
      if (tone === 'Enthusiastic') {
        return `⏳ *ONLY 48 HOURS LEFT TO REGISTER!*
The 500-seat limit for *"Build Your First AI Project in 60 Minutes"* is nearly reached across colleges!
Build and deploy your verified AI project this Saturday.
👉 Lock in your free registration: ${liveWorkshopUrl}
Don't wait until spots close!`;
      }
      return `Quick reminder! Only 48 hours left to reserve your spot for *"Build Your First AI Project in 60 Minutes"*.
Free for final-year engineering students.
📅 Saturday @ 6:00 PM IST
👉 Register here: ${liveWorkshopUrl}`;
    }

    // 3. Final-Day Reminder
    if (tone === 'Concise') {
      return `🔴 FINAL CALL:
Workshop starts today at 6:00 PM IST!
Build your first AI project in 60 minutes.
👉 Final spots: ${liveWorkshopUrl}`;
    }
    if (tone === 'Enthusiastic') {
      return `🚨 *FINAL CALL: WORKSHOP GOES LIVE TODAY!* 🚨
Tonight at 6:00 PM IST: *"Build Your First AI Project in 60 Minutes"*!
Last chance to confirm your attendance and get the live Zoom invite + starter repository:
👉 Register now: ${liveWorkshopUrl}
See you live inside the build session! 🚀`;
    }
    return `Final call for today's live workshop!
*"Build Your First AI Project in 60 Minutes"* starts tonight at 6:00 PM IST.
If you haven't confirmed your seat yet, grab the final spots here:
👉 ${liveWorkshopUrl}`;
  };

  const [customMessage, setCustomMessage] = useState(getTemplate());

  const handleRegenerate = () => {
    setCustomMessage(getTemplate());
    showToast('Message template refreshed!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(customMessage);
    setCopied(true);
    showToast('Outreach message copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(customMessage);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151b2b] tracking-tight">
            WhatsApp Outreach Composer
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#25D366]/20 text-[#166534] border border-[#25D366]/40">
            Ready-to-Share Outreach
          </span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-[#485642] font-medium">
          Draft and dispatch personalized outreach copy with embedded referral attribution links directly to WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Selectors & Controls */}
        <div className="lg:col-span-5 bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-[#dcdecb] pb-3">
            <h2 className="text-sm font-extrabold text-[#151b2b] flex items-center space-x-1.5">
              <Target className="w-4 h-4 text-[#f5a623]" />
              <span>Outreach Parameters</span>
            </h2>
          </div>

          {/* 1. Target Audience */}
          <div>
            <label className="block text-[11px] font-bold text-[#3d4b37] mb-1">
              1. Target Audience
            </label>
            <select
              value={audience}
              onChange={(e) => {
                setAudience(e.target.value);
              }}
              className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#151b2b] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
            >
              <option value="Clubs & Class Reps">Clubs & Class Representatives</option>
              <option value="Ambassadors">Student Ambassadors</option>
              <option value="Student Communities">Student Communities & Groups</option>
            </select>
          </div>

          {/* 2. Message Type / Timing */}
          <div>
            <label className="block text-[11px] font-bold text-[#3d4b37] mb-1">
              2. Campaign Timing & Message Type
            </label>
            <select
              value={messageType}
              onChange={(e) => {
                setMessageType(e.target.value);
              }}
              className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#151b2b] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
            >
              <option value="Initial Invitation">Initial Invitation (Campaign Kickoff)</option>
              <option value="48h Reminder">48-Hour Urgency Reminder</option>
              <option value="Final-Day Reminder">Final-Day / 6-Hour Last Call</option>
            </select>
          </div>

          {/* 3. Tone of Voice */}
          <div>
            <label className="block text-[11px] font-bold text-[#3d4b37] mb-1">
              3. Tone of Voice
            </label>
            <select
              value={tone}
              onChange={(e) => {
                setTone(e.target.value);
              }}
              className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#151b2b] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
            >
              <option value="Friendly">Friendly & Approachable</option>
              <option value="Concise">Concise & Direct (Bullet points)</option>
              <option value="Enthusiastic">Enthusiastic & High Urgency</option>
            </select>
          </div>

          {/* 4. Embed Referral Code */}
          <div>
            <label className="block text-[11px] font-bold text-[#3d4b37] mb-1">
              4. Embed Referral Link
            </label>
            <select
              value={selectedAmbassadorCode}
              onChange={(e) => {
                setSelectedAmbassadorCode(e.target.value);
              }}
              className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#151b2b] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
            >
              <option value="">General Direct Link</option>
              {activeAmbassadors.map((amb) => (
                <option key={amb.code} value={amb.code}>
                  {amb.name} ({amb.code}) • {amb.college}
                </option>
              ))}
            </select>
            <span className="text-[10px] text-[#55654d] mt-1 block">
              Embedded: <code className="font-mono text-[#151b2b]">{liveWorkshopUrl}</code>
            </span>

            {window.location.origin.includes('localhost') && (
              <div className="mt-2 pt-2 border-t border-[#dcdecb]/70">
                <label className="block text-[10px] font-bold text-[#55654d] mb-0.5">
                  Production Domain (for shareable links)
                </label>
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCustomDomain(val);
                    localStorage.setItem('campuspulse_custom_domain', val);
                  }}
                  placeholder="e.g. https://campuspulse.vercel.app"
                  className="w-full bg-[#eaedda] border border-[#bccab0] rounded-lg px-2 py-1 text-[11px] text-[#151b2b] placeholder-[#8a9984] focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleRegenerate}
            className="w-full ph-btn-orange py-2 px-3 text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate Message Copy</span>
          </button>
        </div>

        {/* Right Column: Editable Message Preview & Action Buttons */}
        <div className="lg:col-span-7 bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl p-5 shadow-ph-panel space-y-4">
          <div className="flex items-center justify-between border-b border-[#dcdecb] pb-3">
            <div>
              <h2 className="text-sm font-extrabold text-[#151b2b]">
                Editable WhatsApp Message
              </h2>
              <p className="text-xs text-[#52634b]">
                You can edit the text below before copying or opening WhatsApp.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#5f7058]">
              {customMessage.length} characters
            </span>
          </div>

          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            rows={10}
            className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl p-3.5 text-xs sm:text-sm font-sans text-[#151b2b] leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
          />

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="text-[11px] text-[#4a5a44] flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-[#16a34a] flex-shrink-0" />
              <span>User-initiated dispatch. No automated bulk sending.</span>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-xl border border-[#c4d2b2] text-xs font-bold text-[#151b2b] hover:bg-[#d8e3cc] flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#16a34a]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handleOpenWhatsApp}
                className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open in WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
