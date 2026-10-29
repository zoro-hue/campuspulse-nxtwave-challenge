import React, { useState, useEffect, useMemo } from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  SuccessCheckIcon,
  WarningIcon,
  CalendarIcon,
  ArrowRightIcon,
  UsersGroupIcon,
  TargetIcon,
} from '../components/Icons';
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Share2,
  Copy,
  Search,
  Filter,
  Eye,
  EyeOff,
  UserCheck,
  UserPlus,
  RefreshCw,
  FileSpreadsheet,
} from 'lucide-react';

export default function RegistrationsScreen() {
  const {
    referralParam,
    registerStudentApi,
    setActiveTab,
    ambassadors,
    registrations,
    liveStats,
    fetchLiveCampaignData,
    showToast,
  } = useCampaign();

  // Active view: 'register' (student form) or 'organizer' (ledger table)
  const [activeSubTab, setActiveSubTab] = useState('register');

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    year: 'Final Year (2026)',
    branch: 'Computer Science & Engineering',
    referralCode: referralParam || '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('campuspulse_last_registration');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [copiedLink, setCopiedLink] = useState(false);

  const updateSuccessData = (val) => {
    setSuccessData(val);
    try {
      if (val) {
        sessionStorage.setItem('campuspulse_last_registration', JSON.stringify(val));
      } else {
        sessionStorage.removeItem('campuspulse_last_registration');
      }
    } catch {}
  };

  // Organizer table filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('All');
  const [showMaskedEmails, setShowMaskedEmails] = useState(true);

  // Sync if referralParam changes from URL
  useEffect(() => {
    if (referralParam) {
      setFormData((prev) => ({ ...prev, referralCode: referralParam }));
    }
  }, [referralParam]);

  // Referring ambassador lookup
  const referringAmbassador = useMemo(() => {
    const code = (formData.referralCode || '').trim().toUpperCase();
    if (!code || code === 'DIRECT') return null;
    return ambassadors.find((a) => a.code.toUpperCase() === code);
  }, [formData.referralCode, ambassadors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid student email address.');
      return;
    }

    const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
    if (phoneDigits.length < 10) {
      setErrorMessage('Please enter a valid 10-digit WhatsApp phone number.');
      return;
    }

    if (!formData.college.trim()) {
      setErrorMessage('Please enter your engineering college name.');
      return;
    }

    setSubmitting(true);
    const result = await registerStudentApi({
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      college: formData.college.trim(),
      year: `${formData.year} — ${formData.branch}`,
      referralCode: formData.referralCode.trim().toUpperCase() || 'DIRECT',
    });

    setSubmitting(false);

    if (result.success) {
      updateSuccessData(result.registration);
    } else {
      setErrorMessage(result.error || 'Registration failed. Please try again.');
    }
  };

  const handleShareWhatsApp = () => {
    const codePart = formData.referralCode ? `?ref=${formData.referralCode}` : '';
    const shareUrl = `${window.location.origin}${window.location.pathname}${codePart}#registrations`;
    const message = `Hey! I just registered for "Build Your First AI Project in 60 Minutes" — a free hands-on workshop by NxtWave for final-year engineering students. Grab a free seat before the 500 cap fills: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCopyLink = () => {
    const codePart = formData.referralCode ? `?ref=${formData.referralCode}` : '';
    const shareUrl = `${window.location.origin}${window.location.pathname}${codePart}#registrations`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    showToast('Workshop invitation link copied!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Mask email for privacy
  const formatEmail = (email) => {
    if (!showMaskedEmails) return email;
    if (!email) return '';
    const [user, domain] = email.split('@');
    if (!domain) return email;
    const maskedUser = user.length > 2 ? `${user[0]}***${user[user.length - 1]}` : `${user[0]}***`;
    return `${maskedUser}@${domain}`;
  };

  // Filtered registrations for organizer view
  const filteredRegistrations = useMemo(() => {
    return (registrations || []).filter((r) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        (r.fullName && r.fullName.toLowerCase().includes(q)) ||
        (r.email && r.email.toLowerCase().includes(q)) ||
        (r.college && r.college.toLowerCase().includes(q)) ||
        (r.referralCode && r.referralCode.toLowerCase().includes(q));

      const matchChannel =
        selectedChannel === 'All' ||
        (r.channel && r.channel.toLowerCase().includes(selectedChannel.toLowerCase()));

      return matchQuery && matchChannel;
    });
  }, [registrations, searchQuery, selectedChannel]);

  return (
    <div className="w-full space-y-5">
      {/* Top Breadcrumb & Dual View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dcdecb] pb-3">
        <div className="flex items-center space-x-1.5 bg-[#e4ebdb] p-1 rounded-xl border border-[#c5d3b6] text-xs font-bold self-start">
          <button
            onClick={() => setActiveSubTab('register')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer ${
              activeSubTab === 'register'
                ? 'bg-[#151b2b] text-[#f4f3e9] shadow-xs'
                : 'text-[#485642] hover:text-[#151b2b]'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-[#f5a623]" />
            <span>Student Registration Flow</span>
          </button>

          <button
            onClick={() => setActiveSubTab('organizer')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer ${
              activeSubTab === 'organizer'
                ? 'bg-[#151b2b] text-[#f4f3e9] shadow-xs'
                : 'text-[#485642] hover:text-[#151b2b]'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>Organizer Records ({registrations.length})</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-[#485642]">
          <span>Live Stored:</span>
          <span className="font-extrabold text-[#151b2b] bg-[#e1ebd3] px-2.5 py-0.5 rounded-lg border border-[#c1d2b1]">
            {liveStats.totalRegistrations} / 500 Goal ({liveStats.remainingGap} spots left)
          </span>
        </div>
      </div>

      {activeSubTab === 'register' ? (
        /* ================= STUDENT REGISTRATION VIEW ================= */
        successData ? (
          /* Confirmed Registration Card */
          <div className="bg-[#f4f3e9] border-2 border-[#16a34a] rounded-2xl p-6 sm:p-8 shadow-ph-card animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center max-w-xl mx-auto space-y-4">
              <div className="w-16 h-16 bg-[#dcfce7] border border-[#86efac] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-[#16a34a]" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#dcfce7] text-[#166534] border border-[#86efac]">
                Registration Confirmed #{successData.id ? successData.id.slice(-6) : 'LIVE'}
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151b2b] tracking-tight">
                Seat Confirmed for {successData.fullName}!
              </h2>

              <p className="text-sm sm:text-base text-[#475740] font-medium leading-relaxed">
                Your registration for{' '}
                <strong className="text-[#151b2b]">
                  "Build Your First AI Project in 60 Minutes"
                </strong>{' '}
                is officially recorded. Registration details have been saved for{' '}
                <strong className="text-[#151b2b]">{successData.email}</strong>.
              </p>

              {/* Receipt Summary Card */}
              <div className="bg-[#e9eedc] border border-[#cad7be] rounded-xl p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#cad7be]/60">
                  <span className="text-[#596a51] font-medium">Workshop</span>
                  <span className="font-bold text-[#151b2b]">
                    Build Your First AI Project in 60 Minutes
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#cad7be]/60">
                  <span className="text-[#596a51] font-medium">Session Format</span>
                  <span className="font-bold text-[#151b2b]">
                    60-Minute Hands-On Build (Online)
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#cad7be]/60">
                  <span className="text-[#596a51] font-medium">College</span>
                  <span className="font-bold text-[#151b2b]">{successData.college}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#cad7be]/60">
                  <span className="text-[#596a51] font-medium">Attributed Source</span>
                  <span className="font-bold text-[#3d82f6]">
                    {successData.channel} ({successData.referralCode || 'DIRECT'})
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={handleShareWhatsApp}
                  className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Invite Batchmates on WhatsApp</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="bg-[#e4ebdb] hover:bg-[#d8e3cc] text-[#151b2b] border border-[#bdcbaf] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedLink ? 'Copied Link!' : 'Copy Link'}</span>
                </button>

                <button
                  onClick={() => {
                    updateSuccessData(null);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      college: '',
                      year: 'Final Year (2026)',
                      branch: 'Computer Science & Engineering',
                      referralCode: referralParam || '',
                    });
                  }}
                  className="bg-[#eaedda] hover:bg-[#dbe3cc] text-[#151b2b] border border-[#bccab0] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#596951]" />
                  <span>Register Another</span>
                </button>

                <button
                  onClick={() => {
                    updateSuccessData(null);
                    setActiveSubTab('organizer');
                  }}
                  className="ph-btn-orange text-xs sm:text-sm px-4 py-2.5 flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>View in Organizer Ledger</span>
                  <ArrowRightIcon size={14} color="navy" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Active Registration Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Workshop Pitch & Guarantee */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl p-5 shadow-xs space-y-4">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#e1ebd3] text-[#2c3d24] border border-[#bed0ad]">
                  <Sparkles className="w-3.5 h-3.5 text-[#f5a623]" />
                  <span>NxtWave Live Workshop</span>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151b2b] tracking-tight leading-tight">
                    Build Your First AI Project in 60 Minutes
                  </h1>
                  <p className="mt-2 text-xs sm:text-sm text-[#475740] font-medium leading-relaxed">
                    A hands-on coding sprint designed specifically for final-year engineering students preparing for technical placement drives.
                  </p>
                </div>

                {/* Highlights Pill List */}
                <div className="space-y-2 pt-1 border-t border-[#dcdecb]">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#151b2b]">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0" />
                    <span>Build a working AI web app for your GitHub & resume</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#151b2b]">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0" />
                    <span>100% Free registration (capped at 500 seats)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#151b2b]">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0" />
                    <span>Hands-on coding proof for technical placement interviews</span>
                  </div>
                </div>

                {/* Schedule Info Box */}
                <div className="bg-[#eaedda] border border-[#cad5be] rounded-xl p-3 flex items-center space-x-3 text-xs">
                  <div className="p-2 bg-[#d7e2c5] rounded-lg text-[#151b2b]">
                    <CalendarIcon size={20} color="navy" />
                  </div>
                  <div>
                    <div className="font-bold text-[#151b2b]">60-Minute Interactive Session</div>
                    <div className="text-[#596951]">Online hands-on build sprint for final-year engineers</div>
                  </div>
                </div>
              </div>

              {/* Anti-spam / Data policy badge */}
              <div className="p-3 bg-[#e8eddc] border border-[#cfdac2] rounded-xl flex items-start space-x-2 text-[11px] text-[#485642]">
                <ShieldCheck className="w-4 h-4 text-[#16a34a] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Student Privacy Notice:</strong> Contact information is strictly used for workshop access and source code delivery. Contact details are never exposed publicly.
                </span>
              </div>
            </div>

            {/* Right Column: Registration Form */}
            <div className="lg:col-span-7 bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl p-5 sm:p-6 shadow-ph-panel">
              {/* Referral Attribution Banner */}
              {formData.referralCode && (
                <div className="mb-4 p-3 bg-[#e4edd8] border border-[#b8cbab] rounded-xl flex items-center justify-between text-xs animate-in fade-in duration-150">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
                    <span className="font-semibold text-[#293822]">
                      Referred by:{' '}
                      <strong className="text-[#151b2b]">
                        {referringAmbassador ? referringAmbassador.name : formData.referralCode}
                      </strong>{' '}
                      ({formData.referralCode})
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      referringAmbassador && referringAmbassador.status === 'deactivated'
                        ? 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]'
                        : 'bg-[#dcfce7] text-[#166534] border-[#86efac]'
                    }`}
                  >
                    {referringAmbassador && referringAmbassador.status === 'deactivated'
                      ? 'Deactivated Code'
                      : 'Verified Ambassador Code'}
                  </span>
                </div>
              )}

              <div className="border-b border-[#dcdecb] pb-3 mb-4">
                <h2 className="text-lg font-extrabold text-[#151b2b]">
                  Register for the Free Workshop
                </h2>
                <p className="text-xs text-[#52634b]">
                  Complete your details below to secure your seat.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 bg-[#fee2e2] border border-[#fca5a5] rounded-xl flex items-center space-x-2 text-xs text-[#991b1b] font-semibold">
                  <WarningIcon size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-bold text-[#3d4b37] mb-1">
                    Student Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    required
                    className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#151b2b] placeholder-[#7d8c75] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
                  />
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#3d4b37] mb-1">
                      Student / College Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@college.edu"
                      required
                      className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#151b2b] placeholder-[#7d8c75] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
                    />
                    <span className="text-[10px] text-[#5e7056] mt-0.5 block">
                      Enforces unique email deduplication
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#3d4b37] mb-1">
                      WhatsApp Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      required
                      className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#151b2b] placeholder-[#7d8c75] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
                    />
                    <span className="text-[10px] text-[#5e7056] mt-0.5 block">
                      For live Zoom invite & code files
                    </span>
                  </div>
                </div>

                {/* College Name */}
                <div>
                  <label className="block text-[11px] font-bold text-[#3d4b37] mb-1">
                    College / Institute Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="e.g. SRM Institute of Science and Technology"
                    required
                    className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#151b2b] placeholder-[#7d8c75] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
                  />
                </div>

                {/* Year & Branch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#3d4b37] mb-1">
                      Year of Study
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#151b2b] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
                    >
                      <option value="Final Year (2026)">Final Year (2026 Batch)</option>
                      <option value="Pre-Final Year (2027)">Pre-Final Year (2027 Batch)</option>
                      <option value="Recent Graduate">Recent Graduate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#3d4b37] mb-1">
                      Branch / Discipline
                    </label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#151b2b] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
                    >
                      <option value="Computer Science & Engineering">Computer Science / IT</option>
                      <option value="Electronics & Communication (ECE)">Electronics (ECE/EEE)</option>
                      <option value="Mechanical / Civil Engineering">Mechanical / Civil</option>
                      <option value="AI / Data Science Specialization">AI / Data Science</option>
                      <option value="Other Engineering Branch">Other Engineering</option>
                    </select>
                  </div>
                </div>

                {/* Referral Code */}
                <div>
                  <label className="block text-[11px] font-bold text-[#3d4b37] mb-1">
                    Referral / Ambassador Code (Optional)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      name="referralCode"
                      value={formData.referralCode}
                      onChange={handleChange}
                      placeholder="e.g. RAHUL-AI or leave blank for Direct"
                      className="flex-1 bg-[#eaedda] border border-[#bccab0] rounded-xl px-3 py-2 text-xs sm:text-sm font-mono font-bold text-[#151b2b] placeholder-[#7d8c75] uppercase focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
                    />
                    {formData.referralCode && (
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, referralCode: '' }))}
                        className="text-xs px-2.5 py-1 text-[#6e7d66] hover:text-[#151b2b] hover:bg-[#e1ebd3] rounded-lg cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full ph-btn-orange py-2.5 sm:py-3 text-sm font-extrabold flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer disabled:opacity-60"
                  >
                    {submitting ? (
                      <span>Verifying & Confirming Seat...</span>
                    ) : (
                      <>
                        <span>Complete Free Registration</span>
                        <ArrowRightIcon size={16} color="navy" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      ) : (
        /* ================= ORGANIZER RECORDS LEDGER ================= */
        <div className="bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl shadow-ph-panel overflow-hidden space-y-4 p-4 sm:p-5">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-[#151b2b]">
                Workshop Registration Ledger & Attribution Records
              </h2>
              <p className="text-xs text-[#52634b]">
                Persistent registrations stored with channel attribution and duplicate prevention.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowMaskedEmails(!showMaskedEmails)}
                className="px-2.5 py-1.5 rounded-xl border border-[#c4d2b2] text-xs font-semibold text-[#151b2b] hover:bg-[#e1ebd3] flex items-center space-x-1.5 cursor-pointer"
              >
                {showMaskedEmails ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{showMaskedEmails ? 'Reveal Emails' : 'Mask Emails'}</span>
              </button>

              <button
                onClick={fetchLiveCampaignData}
                title="Refresh registrations"
                className="p-1.5 rounded-xl border border-[#c4d2b2] text-[#151b2b] hover:bg-[#e1ebd3] cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Search & Channel Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student name, college, email, or code..."
                className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl pl-8 pr-3 py-2 text-xs font-medium text-[#151b2b] placeholder-[#7d8c75] focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
              />
              <Search className="w-3.5 h-3.5 text-[#6c7d65] absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-3.5 h-3.5 text-[#6c7d65]" />
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="bg-[#eaedda] border border-[#bccab0] rounded-xl px-3 py-2 text-xs font-semibold text-[#151b2b] focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
              >
                <option value="All">All Channels ({registrations.length})</option>
                <option value="Student Ambassadors">Student Ambassadors</option>
                <option value="Clubs & Class Reps">Clubs & Class Reps</option>
                <option value="WhatsApp Communities">WhatsApp Communities</option>
                <option value="Social & Paid Test">Social & Paid Test</option>
                <option value="Direct">Direct / Other</option>
              </select>
            </div>
          </div>

          {/* Registrations Table */}
          {filteredRegistrations.length === 0 ? (
            <div className="p-8 text-center space-y-3 bg-[#eef2e4]/50 rounded-xl border border-[#d8e0cc]">
              <div className="w-12 h-12 bg-[#e2e7d5] rounded-full mx-auto flex items-center justify-center text-[#55654d]">
                <UsersGroupIcon size={24} />
              </div>
              <div className="text-sm font-bold text-[#151b2b]">No registrations found</div>
              <p className="text-xs text-[#52634b] max-w-sm mx-auto">
                {searchQuery || selectedChannel !== 'All'
                  ? 'No records match your current search and channel filter.'
                  : 'No student registrations recorded yet. Test the registration form to add the first student.'}
              </p>
              {(searchQuery || selectedChannel !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedChannel('All');
                  }}
                  className="text-xs font-bold text-[#2563eb] hover:underline"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[#d8e0cc]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#e9eedc] border-b border-[#d8e0cc] text-[11px] font-bold text-[#44533e] uppercase tracking-wider">
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">College & Degree</th>
                    <th className="py-2.5 px-3">Contact Email</th>
                    <th className="py-2.5 px-3">Acquisition Channel</th>
                    <th className="py-2.5 px-3">Attribution</th>
                    <th className="py-2.5 px-3 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dcdecb] text-[#151b2b] bg-white/40">
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-[#eaefdf]/60 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-[#151b2b]">
                        {reg.fullName}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-[#151b2b]">{reg.college}</div>
                        <div className="text-[10px] text-[#5a6a52]">{reg.year}</div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-[#334155]">
                        {formatEmail(reg.email)}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-semibold text-[#151b2b] bg-[#e1ebd3] px-2 py-0.5 rounded border border-[#bccab0] text-[11px]">
                          {reg.channel}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px]">
                        {reg.ambassadorName ? (
                          <span className="text-[#166534] font-bold">
                            {reg.ambassadorName} ({reg.referralCode})
                          </span>
                        ) : (
                          <span className="text-[#64748b]">
                            {reg.referralCode || 'DIRECT'}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right text-[10px] text-[#64748b]">
                        {reg.registeredAt ? new Date(reg.registeredAt).toLocaleString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
