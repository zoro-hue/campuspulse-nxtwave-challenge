import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import {
  UsersGroupIcon,
  SuccessCheckIcon,
  WarningIcon,
  ArrowRightIcon,
} from '../components/Icons';
import {
  UserPlus,
  Share2,
  Copy,
  ExternalLink,
  Award,
  TrendingUp,
  MousePointerClick,
  Sparkles,
  Check,
  Power,
  PowerOff,
  Search,
} from 'lucide-react';

export default function AmbassadorScreen() {
  const {
    ambassadors,
    addAmbassadorApi,
    toggleAmbassadorStatusApi,
    setActiveTab,
    setReferralParam,
    showToast,
    liveLoading,
  } = useCampaign();

  const [modalOpen, setModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    contact: '',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Calculations across stored ambassadors
  const totalAmbs = ambassadors.length;
  const activeAmbs = ambassadors.filter((a) => a.status !== 'deactivated');
  const totalClicks = ambassadors.reduce((s, a) => s + (a.clicks || 0), 0);
  const totalRegistrations = ambassadors.reduce((s, a) => s + (a.registrations || 0), 0);
  const overallConvRate = totalClicks > 0 ? ((totalRegistrations / totalClicks) * 100).toFixed(1) : '0.0';

  // Find top ambassador among active
  const topAmbassador = [...ambassadors]
    .filter((a) => a.status === 'active')
    .sort((a, b) => (b.registrations || 0) - (a.registrations || 0))[0];

  const filteredAmbassadors = ambassadors.filter((a) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      a.name.toLowerCase().includes(q) ||
      a.code.toLowerCase().includes(q) ||
      a.college.toLowerCase().includes(q) ||
      (a.phone && a.phone.toLowerCase().includes(q))
    );
  });

  const getShareUrl = (code) => {
    const savedDomain = localStorage.getItem('campuspulse_custom_domain') || '';
    const base = (savedDomain.trim() || window.location.origin).replace(/\/$/, '');
    return `${base}?ref=${code}#registrations`;
  };

  const handleCopyLink = (code) => {
    const url = getShareUrl(code);
    navigator.clipboard.writeText(url);
    setCopiedCode(code);
    showToast(`Referral link for ${code} copied!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleShareWhatsApp = (amb) => {
    if (amb.status === 'deactivated') {
      showToast('Cannot share deactivated ambassador code.', 'error');
      return;
    }
    const url = getShareUrl(amb.code);
    const message = `Hey engineers! 🚀 Join me for "Build Your First AI Project in 60 Minutes" — a completely free hands-on workshop by NxtWave for final-year engineering students.

We will build, test, and deploy a live working AI application you can showcase on your resume & GitHub!

🎟️ Free registration via my ambassador invite:
${url}

Seats are capped at 500 across campuses. Reserve your spot before Friday!`;

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleToggleStatus = async (amb) => {
    const nextStatus = amb.status === 'active' ? 'deactivated' : 'active';
    await toggleAmbassadorStatusApi(amb.id, nextStatus);
  };

  const handleCreateAmbassador = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Please provide the ambassador name.');
      return;
    }

    if (!formData.college.trim()) {
      setFormError('Please specify their engineering campus.');
      return;
    }

    if (!formData.contact.trim()) {
      setFormError('Please provide a contact identifier (phone or email).');
      return;
    }

    setFormSubmitting(true);
    const isEmail = formData.contact.includes('@');
    const res = await addAmbassadorApi(
      formData.name.trim(),
      formData.college.trim(),
      isEmail ? '' : formData.contact.trim(),
      isEmail ? formData.contact.trim() : ''
    );
    setFormSubmitting(false);

    if (res.success) {
      setFormData({ name: '', college: '', contact: '' });
      setModalOpen(false);
    } else {
      setFormError(res.error || 'Failed to create ambassador.');
    }
  };

  return (
    <div className="w-full space-y-5">
      {/* Header with Title and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151b2b] tracking-tight">
              Ambassador Management System
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#dcfce7] text-[#166534] border border-[#86efac]">
              Live Engine
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#485642] font-medium">
            Generate collision-free referral codes, track verified student registrations, and manage ambassador activation.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setModalOpen(true)}
            className="ph-btn-orange text-xs sm:text-sm px-3.5 py-2 flex items-center space-x-1.5 shadow-sm cursor-pointer whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Ambassador</span>
          </button>
        </div>
      </div>

      {/* Top 4 Performance Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Active Ambassadors */}
        <div className="bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#596951] text-xs font-semibold">
            <span>Ambassadors</span>
            <UsersGroupIcon size={16} color="blue" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#151b2b]">
            {activeAmbs.length}
            <span className="text-xs font-medium text-[#64745c] ml-1">
              ({totalAmbs} total)
            </span>
          </div>
          <div className="mt-1 text-[11px] text-[#4d5d45]">
            Target: 15 active campus reps
          </div>
        </div>

        {/* Card 2: Attributed Registrations */}
        <div className="bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#596951] text-xs font-semibold">
            <span>Attributed Sign-ups</span>
            <Award className="w-4 h-4 text-[#16a34a]" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#151b2b]">
            {totalRegistrations}
            <span className="text-xs font-bold text-[#596951] ml-1">/ 150 goal</span>
          </div>
          <div className="mt-1 text-[11px] text-[#4d5d45]">
            {Math.round((totalRegistrations / 150) * 100)}% of ambassador target
          </div>
        </div>

        {/* Card 3: Link Clicks */}
        <div className="bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#596951] text-xs font-semibold">
            <span>Tracked Clicks</span>
            <MousePointerClick className="w-4 h-4 text-[#f5a623]" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#151b2b]">
            {totalClicks}
          </div>
          <div className="mt-1 text-[11px] text-[#4d5d45]">
            Real incoming link visits
          </div>
        </div>

        {/* Card 4: Overall Conversion */}
        <div className="bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#596951] text-xs font-semibold">
            <span>Conv. Rate</span>
            <TrendingUp className="w-4 h-4 text-[#f46b9b]" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#151b2b]">
            {overallConvRate}%
          </div>
          <div className="mt-1 text-[11px] text-[#4d5d45]">
            {totalClicks > 0 ? 'Based on verified visits' : 'Awaiting initial visits'}
          </div>
        </div>
      </div>

      {/* Ambassadors Table Card */}
      <div className="bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl shadow-ph-panel overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#dcdecb] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h2 className="text-base font-extrabold text-[#151b2b]">
              Campus Ambassador Roster & Attribution Ledger
            </h2>
            <p className="text-xs text-[#52634b]">
              Unique links with <code className="font-mono bg-[#e5ecd9] px-1 py-0.5 rounded text-[#2c3d23]">?ref=CODE</code> attribute registrations automatically.
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ambassador or code..."
                className="bg-[#eaedda] border border-[#bccab0] rounded-xl pl-8 pr-3 py-1.5 text-xs font-medium text-[#151b2b] placeholder-[#7d8c75] focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
              />
              <Search className="w-3.5 h-3.5 text-[#6c7d65] absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {topAmbassador && topAmbassador.registrations > 0 && (
              <span className="hidden md:inline-flex text-xs font-bold text-[#151b2b] bg-[#e1ebd3] px-2.5 py-1 rounded-lg border border-[#c1d2b1]">
                🏆 Leader: {topAmbassador.name} ({topAmbassador.registrations})
              </span>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredAmbassadors.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-[#e2e7d5] rounded-full mx-auto flex items-center justify-center text-[#55654d]">
              <UsersGroupIcon size={24} />
            </div>
            <div className="text-sm font-bold text-[#151b2b]">No ambassadors found</div>
            <p className="text-xs text-[#52634b] max-w-sm mx-auto">
              {searchQuery
                ? `No ambassadors match "${searchQuery}". Clear your search query to view all.`
                : 'No student ambassadors added yet. Click "Add Ambassador" to generate the first referral code.'}
            </p>
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-[#2563eb] hover:underline"
              >
                Clear Search
              </button>
            ) : (
              <button
                onClick={() => setModalOpen(true)}
                className="ph-btn-orange text-xs px-3.5 py-1.5 font-bold cursor-pointer inline-flex items-center space-x-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Add First Ambassador</span>
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#e9eedc] border-b border-[#d8e0cc] text-[11px] font-bold text-[#44533e] uppercase tracking-wider">
                  <th className="py-3 px-4">Ambassador</th>
                  <th className="py-3 px-3">Unique Code</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Shareable Link</th>
                  <th className="py-3 px-3 text-center">Visits</th>
                  <th className="py-3 px-3 text-center">Sign-ups</th>
                  <th className="py-3 px-3 text-center">Conv. Rate</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dcdecb] text-[#151b2b]">
                {filteredAmbassadors.map((amb, idx) => {
                  const isActive = amb.status === 'active';
                  const conv =
                    amb.clicks > 0
                      ? `${((amb.registrations / amb.clicks) * 100).toFixed(1)}%`
                      : '0.0%';
                  const isCopied = copiedCode === amb.code;

                  return (
                    <tr
                      key={amb.id || amb.code}
                      className={`hover:bg-[#eaefdf]/60 transition-colors ${
                        !isActive ? 'opacity-65 bg-[#f0f0e8]/50' : ''
                      }`}
                    >
                      {/* Ambassador name & college */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#151b2b] flex items-center space-x-1.5">
                          {idx === 0 && amb.registrations > 0 && isActive && (
                            <span title="Leader">🏆</span>
                          )}
                          <span>{amb.name}</span>
                        </div>
                        <div className="text-[11px] text-[#55654e]">
                          {amb.college} {amb.phone ? `• ${amb.phone}` : amb.email ? `• ${amb.email}` : ''}
                        </div>
                      </td>

                      {/* Code */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`font-mono font-extrabold px-2 py-0.5 rounded border text-xs ${
                            isActive
                              ? 'text-[#23351d] bg-[#e1ebce] border-[#bdccab]'
                              : 'text-[#6b7280] bg-[#e5e7eb] border-[#d1d5db] line-through'
                          }`}
                        >
                          {amb.code}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3">
                        {isActive ? (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase tracking-wider text-[#166534] bg-[#dcfce7] px-2 py-0.5 rounded-full border border-[#86efac]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]"></span>
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase tracking-wider text-[#991b1b] bg-[#fee2e2] px-2 py-0.5 rounded-full border border-[#fca5a5]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]"></span>
                            <span>Deactivated</span>
                          </span>
                        )}
                      </td>

                      {/* Shareable Link preview */}
                      <td className="py-3.5 px-3 max-w-[180px]">
                        {isActive ? (
                          <div
                            onClick={() => handleCopyLink(amb.code)}
                            className="truncate text-[11px] text-[#3d82f6] font-mono hover:underline cursor-pointer flex items-center space-x-1"
                            title="Click to copy full referral link"
                          >
                            <span className="truncate">?ref={amb.code}</span>
                            <Copy className="w-3 h-3 flex-shrink-0 text-[#6d7f66]" />
                          </div>
                        ) : (
                          <span className="text-[11px] text-[#9ca3af] italic">
                            Link deactivated
                          </span>
                        )}
                      </td>

                      {/* Visits */}
                      <td className="py-3.5 px-3 text-center font-bold text-[#151b2b]">
                        {amb.clicks || 0}
                      </td>

                      {/* Registrations */}
                      <td className="py-3.5 px-3 text-center">
                        <span className="font-extrabold text-[#166534] bg-[#dcfce7] px-2 py-0.5 rounded-full text-xs border border-[#86efac]">
                          {amb.registrations || 0}
                        </span>
                      </td>

                      {/* Conversion Rate */}
                      <td className="py-3.5 px-3 text-center font-bold text-[#151b2b]">
                        {conv}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {/* Copy Link */}
                          <button
                            onClick={() => handleCopyLink(amb.code)}
                            disabled={!isActive}
                            title={isActive ? 'Copy referral URL' : 'Code is deactivated'}
                            className="p-1.5 rounded-lg border border-[#c4d2b2] hover:bg-[#e1ebd3] text-[#151b2b] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-[#16a34a]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {/* WhatsApp Share */}
                          <button
                            onClick={() => handleShareWhatsApp(amb)}
                            disabled={!isActive}
                            title={isActive ? 'Share invite via WhatsApp' : 'Code is deactivated'}
                            className="bg-[#25D366] hover:bg-[#20ba59] text-white p-1.5 rounded-lg shadow-2xs transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Toggle Active/Deactivate Button */}
                          <button
                            onClick={() => handleToggleStatus(amb)}
                            title={isActive ? 'Deactivate ambassador code' : 'Reactivate ambassador code'}
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer text-xs flex items-center space-x-1 font-bold ${
                              isActive
                                ? 'border-[#e0a8a8] text-[#991b1b] hover:bg-[#fee2e2]'
                                : 'border-[#86efac] text-[#166534] hover:bg-[#dcfce7]'
                            }`}
                          >
                            {isActive ? (
                              <>
                                <PowerOff className="w-3 h-3" />
                                <span className="hidden lg:inline text-[10px]">Deactivate</span>
                              </>
                            ) : (
                              <>
                                <Power className="w-3 h-3" />
                                <span className="hidden lg:inline text-[10px]">Activate</span>
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Ambassador Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-[#f4f3e9] border border-[#dcdecb] rounded-2xl w-full max-w-md shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#dcdecb]">
              <div className="flex items-center space-x-2 text-[#151b2b]">
                <UserPlus className="w-5 h-5 text-[#f5a623]" />
                <h3 className="font-extrabold text-base">Add Student Ambassador</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#64745c] hover:text-[#151b2b] font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="mt-3 p-2.5 bg-[#fee2e2] border border-[#fca5a5] rounded-xl text-xs text-[#991b1b] font-semibold flex items-center space-x-1.5">
                <WarningIcon size={14} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateAmbassador} className="space-y-3.5 mt-3.5">
              <div>
                <label className="block text-[11px] font-bold text-[#3d4b37] mb-1">
                  Ambassador Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sneha Reddy"
                  required
                  className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#151b2b] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#3d4b37] mb-1">
                  Engineering College / Campus <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. NIT Warangal"
                  required
                  className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#151b2b] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#3d4b37] mb-1">
                  Contact Identifier (WhatsApp Phone or Email) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="e.g. +91 98765 00000 or sneha@nitw.ac.in"
                  required
                  className="w-full bg-[#eaedda] border border-[#bccab0] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#151b2b] focus:outline-none focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>

              <div className="p-2.5 bg-[#e4ecda] border border-[#cad7be] rounded-xl text-[11px] text-[#475740]">
                A unique, collision-free referral code (e.g. <code className="font-mono font-bold text-[#151b2b]">SNEHA-AI</code>) is generated and saved to the live database.
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-2 rounded-xl border border-[#c4d2b2] text-xs font-bold text-[#44533e] hover:bg-[#e1ebd3] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="ph-btn-orange px-4 py-2 text-xs font-bold flex items-center space-x-1.5 cursor-pointer disabled:opacity-60"
                >
                  {formSubmitting ? (
                    <span>Creating Code...</span>
                  ) : (
                    <>
                      <span>Save & Generate Link</span>
                      <ArrowRightIcon size={14} color="navy" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
