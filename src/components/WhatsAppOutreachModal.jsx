import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { Share2, Copy, Check, MessageSquare, Send, Sparkles } from 'lucide-react';
import { ArrowRightIcon } from './Icons';

export default function WhatsAppOutreachModal() {
  const {
    whatsAppModalOpen,
    setWhatsAppModalOpen,
    ambassadors,
    showToast,
  } = useCampaign();

  const [selectedAudience, setSelectedAudience] = useState('Engineering Batch Groups');
  const [selectedGoal, setSelectedGoal] = useState('Initial Workshop Invitation');
  const [selectedAmbassadorCode, setSelectedAmbassadorCode] = useState(
    ambassadors.length > 0 ? ambassadors[0].code : ''
  );
  const [copied, setCopied] = useState(false);

  if (!whatsAppModalOpen) return null;

  const currentOrigin = window.location.origin;
  const currentPath = window.location.pathname;
  const referralSuffix = selectedAmbassadorCode
    ? `?ref=${selectedAmbassadorCode}#register`
    : `#register`;
  const liveWorkshopUrl = `${currentOrigin}${currentPath}${referralSuffix}`;

  const templates = {
    'Initial Workshop Invitation': {
      'Engineering Batch Groups': `🚨 *ATTENTION FINAL YEAR ENGINEERS (2026 Batch)* 🚨

Are you looking to add a genuine, hands-on *AI project* to your resume for upcoming tech placements?

NxtWave is organizing a live hands-on workshop:
🔥 *"Build Your First AI Project in 60 Minutes"* 🔥

What you get:
✅ Build & deploy a working AI web project from scratch
✅ Live code along with senior AI engineers
✅ GitHub-ready repository proof for technical interviews
✅ 100% FREE for final-year students (zero fees)

📅 *Upcoming Saturday @ 6:00 PM IST (Live Online)*
🎟️ *Reserve your seat before spots close:*
👉 ${liveWorkshopUrl}

_Capped at 500 registrations across colleges. Grab your spot today!_`,

      'Club Heads & Placement Cell': `Respected Placement Coordinators & Technical Club Heads,

We are sharing an exclusive free skill-building initiative for our final-year engineering students:

📌 *Session:* "Build Your First AI Project in 60 Minutes"
📌 *Outcome:* Students build a verified AI application they can showcase in placement technical interviews.
📌 *Cost:* 100% Free for final-year engineering students.

Kindly share this registration link with your batch groups:
👉 ${liveWorkshopUrl}

Thank you for supporting hands-on practical skills!`,

      'Student Ambassadors': `Hey team! 🚀 Our sprint target is 500 verified final-year registrations.

Here is your custom ambassador invite link with your tracking code:
👉 ${liveWorkshopUrl}

Share this with your college WhatsApp groups and department circles. Every student who signs up will be credited to your ambassador leaderboard. Let's make this session packed!`,

      'Direct 1-on-1 Classmates': `Hey! 👋 Check this out — NxtWave is doing a free hands-on workshop this Saturday called *"Build Your First AI Project in 60 Minutes"*.

We actually code and deploy a working AI app live that we can put on our GitHub and resume before placement drives.

I just registered. You can grab a free seat here:
👉 ${liveWorkshopUrl}`,
    },

    '48-Hour Countdown / Seat Cap Reminder': {
      'Engineering Batch Groups': `⏳ *48 HOURS LEFT: 500-Seat Cap Reaching Limit!*

If you haven't registered for *"Build Your First AI Project in 60 Minutes"*, seats are filling up rapidly across campuses.

🎯 Walk away with a deployed AI project on your GitHub
⏰ Saturday @ 6:00 PM IST (60 mins live coding)
🎟️ Free Registration Link:
👉 ${liveWorkshopUrl}

Don't miss out on verified placement project proof!`,

      'Club Heads & Placement Cell': `Reminder for Class Representatives & Club Heads:
Only 48 hours remaining to register for the free 60-Minute AI Project Workshop. Please circulate this final link in class groups:
👉 ${liveWorkshopUrl}`,

      'Student Ambassadors': `⚡ 48h Sprint Check: Share the 48-hour reminder now! Students who hesitate on Day 1 will register when they see the cohort is filling up. Your link: ${liveWorkshopUrl}`,

      'Direct 1-on-1 Classmates': `Hey, reminder about that 60-min AI workshop on Saturday! Slots are closing soon. Register your seat here before they cap it: ${liveWorkshopUrl}`,
    },

    '6-Hour Final Call / Registration Closing': {
      'Engineering Batch Groups': `🔴 *FINAL CALL: REGISTRATIONS CLOSE IN 6 HOURS!* 🔴

The live workshop *"Build Your First AI Project in 60 Minutes"* goes live tonight at 6:00 PM IST!

If you want a working AI project on your resume, this is your last window to grab a free pass:
👉 ${liveWorkshopUrl}

See you inside the session! 🚀`,

      'Club Heads & Placement Cell': `Final call reminder: Workshop links lock in 6 hours. Final-year students can complete instant confirmation here: ${liveWorkshopUrl}`,

      'Student Ambassadors': `🔥 Final push! Send the 6-hour countdown now to convert any pending clicks into verified registrations: ${liveWorkshopUrl}`,

      'Direct 1-on-1 Classmates': `Hey! Last call for the AI project workshop today at 6 PM. Form is closing in a few hours: ${liveWorkshopUrl}`,
    },

    'Placement & Career Readiness Focus': {
      'Engineering Batch Groups': `💼 *AI PROJECT PROOF FOR PLACEMENT INTERVIEWS* 💼

Most recruiters in 2026 expect final-year engineering students to have built at least one practical AI project with live demo code.

In just 60 minutes, build and deploy yours with NxtWave:
🔗 Free Registration: ${liveWorkshopUrl}
💡 Live architecture, deployment, and resume bullet points included.`,

      'Club Heads & Placement Cell': `Elevate batch placement outcomes with verified practical AI project experience: ${liveWorkshopUrl}`,

      'Student Ambassadors': `Highlight placement readiness to seniors! Emphasize that this provides a live project for tech rounds: ${liveWorkshopUrl}`,

      'Direct 1-on-1 Classmates': `Hey bro, if you need an AI project to talk about in tech placement interviews, this 60-minute workshop gives you live code to show: ${liveWorkshopUrl}`,
    },
  };

  const currentText =
    templates[selectedGoal]?.[selectedAudience] ||
    templates['Initial Workshop Invitation']['Engineering Batch Groups'];

  const handleCopyText = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    showToast('WhatsApp message template copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLaunchWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(currentText)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-3 sm:p-4">
      <div className="bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#dcdecb] flex items-center justify-between bg-[#e9eedc]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-xs">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-[#151b2b]">
                WhatsApp Outreach Dispatcher
              </h3>
              <p className="text-xs text-[#52634b]">
                Generate high-converting messages with prefilled live tracking URLs and 1-click wa.me dispatch.
              </p>
            </div>
          </div>
          <button
            onClick={() => setWhatsAppModalOpen(false)}
            className="text-[#5b6a53] hover:text-[#151b2b] p-1.5 rounded-lg hover:bg-[#dbe4ce] font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Controls: Audience & Goal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Target Audience */}
            <div>
              <label className="block text-[11px] font-bold text-[#3c4a35] mb-1">
                Target Audience
              </label>
              <select
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
                className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#151b2b] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
              >
                <option value="Engineering Batch Groups">Engineering Batch Groups</option>
                <option value="Club Heads & Placement Cell">Club Heads & Placement Cell</option>
                <option value="Student Ambassadors">Student Ambassadors</option>
                <option value="Direct 1-on-1 Classmates">Direct 1-on-1 Classmates</option>
              </select>
            </div>

            {/* Campaign Goal */}
            <div>
              <label className="block text-[11px] font-bold text-[#3c4a35] mb-1">
                Message Goal / Timing
              </label>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#151b2b] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
              >
                <option value="Initial Workshop Invitation">Initial Workshop Invitation</option>
                <option value="48-Hour Countdown / Seat Cap Reminder">48-Hour Countdown</option>
                <option value="6-Hour Final Call / Registration Closing">6-Hour Final Call</option>
                <option value="Placement & Career Readiness Focus">Placement & Career Readiness</option>
              </select>
            </div>

            {/* Embed Ambassador Referral Code */}
            <div>
              <label className="block text-[11px] font-bold text-[#3c4a35] mb-1">
                Embed Tracking Code
              </label>
              <select
                value={selectedAmbassadorCode}
                onChange={(e) => setSelectedAmbassadorCode(e.target.value)}
                className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#151b2b] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
              >
                <option value="">General Direct Link</option>
                {ambassadors.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.name} ({a.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Live Message Preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-[#3c4a35] flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-[#f5a623]" />
                <span>Prefilled WhatsApp Message Preview</span>
              </span>
              <span className="text-[10px] text-[#5c6d54] font-mono">
                {currentText.length} characters
              </span>
            </div>

            <div className="bg-[#eaedda] border border-[#bccab0] rounded-xl p-3.5 text-xs font-sans text-[#151b2b] whitespace-pre-wrap leading-relaxed shadow-inner max-h-[220px] overflow-y-auto">
              {currentText}
            </div>
          </div>

          <div className="text-[11px] text-[#485642] bg-[#e3ecda] p-2.5 rounded-xl border border-[#c4d2b2]">
            💡 Clicking <strong>Open in WhatsApp</strong> will launch WhatsApp Web or the WhatsApp Desktop App with this message prefilled and ready to send.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[#dcdecb] bg-[#e9eedc] flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="text-xs text-[#52634b]">
            Target Link: <code className="font-mono text-[#151b2b] font-bold">{liveWorkshopUrl}</code>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopyText}
              className="px-3.5 py-2 rounded-xl border border-[#c4d2b2] text-xs font-bold text-[#151b2b] hover:bg-[#d8e3cc] flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#16a34a]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Template!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleLaunchWhatsApp}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Open in WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

