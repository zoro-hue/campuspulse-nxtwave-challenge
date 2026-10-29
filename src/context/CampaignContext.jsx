import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const CampaignContext = createContext(null);

const DEFAULT_CHANNELS = [
  {
    id: 'clubs',
    name: 'Clubs & class reps',
    icon: 'users',
    color: '#85bb75',
    target: 200,
    demo: 60,
    budget: 0,
  },
  {
    id: 'ambassadors',
    name: 'Student ambassadors',
    icon: 'user-check',
    color: '#3d82f6',
    target: 150,
    demo: 90,
    budget: 500,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp groups',
    icon: 'message-circle',
    color: '#85bb75',
    target: 100,
    demo: 40,
    budget: 0,
  },
  {
    id: 'social',
    name: 'Social + paid test',
    icon: 'share-2',
    color: '#f46b9b',
    target: 50,
    demo: 15,
    budget: 1150,
  },
];

const DEFAULT_ASSUMPTIONS = {
  ambassadors: 15,
  invitesPerAmbassador: 10,
  signupRate: 20, // percent
};

const DEFAULT_MESSAGES = {
  variantA: {
    text: 'Build your first AI project in 60 minutes. Free for final-year engineering students. Limited seats!',
    visits: 200,
    signups: 28,
  },
  variantB: {
    text: 'Kickstart your AI journey with a hands-on project in 60 minutes. Free. Made for final-year students.',
    visits: 200,
    signups: 18,
  },
};

export const INITIAL_AMBASSADORS = [
  {
    id: 'amb-1',
    name: 'Rahul Sharma',
    code: 'RAHUL-AI',
    college: 'IIT Madras',
    phone: '9876543210',
    email: 'rahul.s@iitm.ac.in',
    status: 'active',
    clicks: 14,
    registrations: 2,
    createdAt: '2026-10-25T10:00:00.000Z',
  },
  {
    id: 'amb-2',
    name: 'Priya Patel',
    code: 'PRIYA-AI',
    college: 'BITS Pilani',
    phone: '9876543211',
    email: 'priya.p@pilani.bits-pilani.ac.in',
    status: 'active',
    clicks: 9,
    registrations: 1,
    createdAt: '2026-10-25T11:30:00.000Z',
  },
  {
    id: 'amb-3',
    name: 'Karthik Raja',
    code: 'KARTHIK-AI',
    college: 'NIT Trichy',
    phone: '9876543212',
    email: 'karthik.r@nitt.edu',
    status: 'active',
    clicks: 6,
    registrations: 0,
    createdAt: '2026-10-25T14:15:00.000Z',
  },
];

export const INITIAL_REGISTRATIONS = [
  {
    id: 'reg-1',
    fullName: 'Aarav Verma',
    email: 'aarav.v@iitm.ac.in',
    phone: '9812345670',
    college: 'IIT Madras',
    year: 'Final Year (2026) — Computer Science & Engineering',
    referralCode: 'RAHUL-AI',
    channel: 'Student Ambassadors',
    ambassadorId: 'amb-1',
    ambassadorName: 'Rahul Sharma',
    registeredAt: '2026-10-26T09:20:00.000Z',
  },
  {
    id: 'reg-2',
    fullName: 'Sneha Reddy',
    email: 'sneha.r@iitm.ac.in',
    phone: '9812345671',
    college: 'IIT Madras',
    year: 'Final Year (2026) — Information Technology',
    referralCode: 'RAHUL-AI',
    channel: 'Student Ambassadors',
    ambassadorId: 'amb-1',
    ambassadorName: 'Rahul Sharma',
    registeredAt: '2026-10-26T11:45:00.000Z',
  },
  {
    id: 'reg-3',
    fullName: 'Vikram Joshi',
    email: 'vikram.j@bits-pilani.ac.in',
    phone: '9812345672',
    college: 'BITS Pilani',
    year: 'Final Year (2026) — Electronics & Communication',
    referralCode: 'PRIYA-AI',
    channel: 'Student Ambassadors',
    ambassadorId: 'amb-2',
    ambassadorName: 'Priya Patel',
    registeredAt: '2026-10-26T14:10:00.000Z',
  },
  {
    id: 'reg-4',
    fullName: 'Ananya Deshmukh',
    email: 'ananya.d@coep.ac.in',
    phone: '9812345673',
    college: 'COEP Pune',
    year: 'Final Year (2026) — Computer Science & Engineering',
    referralCode: 'DIRECT',
    channel: 'Clubs & Class Reps',
    ambassadorId: null,
    ambassadorName: null,
    registeredAt: '2026-10-27T10:05:00.000Z',
  },
];

export function computeStatsFromData(regs = [], ambs = []) {
  const totalRegistrations = regs.length;
  const target = 500;
  const remainingGap = Math.max(0, target - totalRegistrations);

  const channelBreakdown = {
    'Clubs & Class Reps': 0,
    'Student Ambassadors': 0,
    'WhatsApp Communities': 0,
    'Social & Paid Test': 0,
  };

  regs.forEach((r) => {
    const ch = r.channel || '';
    if (ch.includes('Ambassador')) {
      channelBreakdown['Student Ambassadors']++;
    } else if (ch.includes('WhatsApp')) {
      channelBreakdown['WhatsApp Communities']++;
    } else if (ch.includes('Social') || ch.includes('Paid')) {
      channelBreakdown['Social & Paid Test']++;
    } else {
      channelBreakdown['Clubs & Class Reps']++;
    }
  });

  return {
    target,
    totalRegistrations,
    remainingGap,
    progressPercentage: Math.min(100, Math.round((totalRegistrations / target) * 100)),
    channelBreakdown,
    ambassadorsCount: ambs.length,
    activeAmbassadors: ambs.filter((a) => a.status === 'active').length,
    deactivatedAmbassadors: ambs.filter((a) => a.status === 'deactivated').length,
  };
}

async function safeFetchJson(url, options = {}) {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      return { ok: res.ok, status: res.status, data };
    }
    return { ok: false, status: res.status, htmlResponse: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

export function CampaignProvider({ children }) {
  // Navigation tab state ('overview', 'channels', 'experiments', 'referrals', 'actions', 'docs', 'register', 'ambassadors')
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '').split('?')[0];
    return hash || 'overview';
  });

  // Campaign mode: 'live' (real stored in database.json) vs 'demo' (benchmark 205)
  const [isLiveMode, setIsLiveMode] = useState(() => {
    const saved = localStorage.getItem('campuspulse_is_live_mode');
    return saved !== null ? saved === 'true' : true;
  });

  // Modals state
  const [campaignPlanOpen, setCampaignPlanOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  // Hedgehog mode (walking animated hedgehogs)
  const [hedgehogMode, setHedgehogMode] = useState(() => {
    return localStorage.getItem('campuspulse_hh_mode') === 'true';
  });

  // Referral param from URL (?ref=CODE)
  const [referralParam, setReferralParam] = useState('');

  // Live data store with hybrid persistent client + backend sync
  const [ambassadors, setAmbassadors] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspulse_live_ambassadors');
      return saved ? JSON.parse(saved) : INITIAL_AMBASSADORS;
    } catch {
      return INITIAL_AMBASSADORS;
    }
  });

  const [registrations, setRegistrations] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspulse_live_registrations');
      return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  });

  const [liveStats, setLiveStats] = useState(() => {
    let currentRegs = INITIAL_REGISTRATIONS;
    let currentAmbs = INITIAL_AMBASSADORS;
    try {
      const r = localStorage.getItem('campuspulse_live_registrations');
      const a = localStorage.getItem('campuspulse_live_ambassadors');
      if (r) currentRegs = JSON.parse(r);
      if (a) currentAmbs = JSON.parse(a);
    } catch {}
    return computeStatsFromData(currentRegs, currentAmbs);
  });

  const [liveLoading, setLiveLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Channels state (user editable planning numbers)
  const [channels, setChannels] = useState(() => {
    const saved = localStorage.getItem('campuspulse_channels');
    return saved ? JSON.parse(saved) : DEFAULT_CHANNELS;
  });

  // Referral assumptions
  const [assumptions, setAssumptions] = useState(() => {
    const saved = localStorage.getItem('campuspulse_assumptions');
    return saved ? JSON.parse(saved) : DEFAULT_ASSUMPTIONS;
  });

  // Message experiments
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('campuspulse_messages');
    return saved ? JSON.parse(saved) : DEFAULT_MESSAGES;
  });

  // Generator selections
  const [generatorGoal, setGeneratorGoal] = useState('Increase sign-ups');
  const [generatorTone, setGeneratorTone] = useState('Friendly');
  const [generatorAudience, setGeneratorAudience] = useState('Final-year students');

  // Trigger Toast Notification helper
  const showToast = useCallback((msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Fetch live campaign data from backend or local persistent store
  const fetchLiveCampaignData = useCallback(async () => {
    try {
      setLiveLoading(true);
      const [statsRes, ambRes, regRes] = await Promise.all([
        safeFetchJson('/api/stats'),
        safeFetchJson('/api/ambassadors'),
        safeFetchJson('/api/registrations'),
      ]);

      if (statsRes.ok && ambRes.ok && regRes.ok && statsRes.data?.success && ambRes.data?.success && regRes.data?.success) {
        const fetchedAmbs = ambRes.data.ambassadors || [];
        const fetchedRegs = regRes.data.registrations || [];
        setLiveStats(statsRes.data.stats);
        setAmbassadors(fetchedAmbs);
        setRegistrations(fetchedRegs);
        try {
          localStorage.setItem('campuspulse_live_ambassadors', JSON.stringify(fetchedAmbs));
          localStorage.setItem('campuspulse_live_registrations', JSON.stringify(fetchedRegs));
        } catch {}
      } else {
        // Fallback to client-side localStorage store (handles static hosting like Vercel previews)
        let localAmbs = [];
        let localRegs = [];
        try {
          const rawAmbs = localStorage.getItem('campuspulse_live_ambassadors');
          const rawRegs = localStorage.getItem('campuspulse_live_registrations');
          localAmbs = rawAmbs ? JSON.parse(rawAmbs) : INITIAL_AMBASSADORS;
          localRegs = rawRegs ? JSON.parse(rawRegs) : INITIAL_REGISTRATIONS;
          if (!rawAmbs) localStorage.setItem('campuspulse_live_ambassadors', JSON.stringify(INITIAL_AMBASSADORS));
          if (!rawRegs) localStorage.setItem('campuspulse_live_registrations', JSON.stringify(INITIAL_REGISTRATIONS));
        } catch {
          localAmbs = INITIAL_AMBASSADORS;
          localRegs = INITIAL_REGISTRATIONS;
        }

        localAmbs.forEach((a) => {
          a.registrations = localRegs.filter(
            (r) => r.ambassadorId === a.id || (r.referralCode && r.referralCode.toUpperCase() === a.code.toUpperCase())
          ).length;
        });

        const stats = computeStatsFromData(localRegs, localAmbs);
        setAmbassadors(localAmbs);
        setRegistrations(localRegs);
        setLiveStats(stats);
      }
    } catch (err) {
      console.warn('CampusPulse API sync notice:', err.message);
    } finally {
      setLiveLoading(false);
    }
  }, []);

  // Track referral click via backend API or local store
  const trackReferralClick = useCallback(async (code) => {
    if (!code) return;
    const cleanCode = code.trim().toUpperCase();
    try {
      const apiRes = await safeFetchJson('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referralCode: cleanCode }),
      });
      if (apiRes.ok) return;

      // Local fallback: increment clicks for active ambassador
      setAmbassadors((prev) => {
        const updated = prev.map((a) => {
          if (a.code.toUpperCase() === cleanCode && a.status === 'active') {
            return { ...a, clicks: (a.clicks || 0) + 1 };
          }
          return a;
        });
        try {
          localStorage.setItem('campuspulse_live_ambassadors', JSON.stringify(updated));
        } catch {}
        return updated;
      });
    } catch (err) {
      console.warn('Track click notice:', err);
    }
  }, []);

  // Add a new Ambassador via API or local store
  const addAmbassadorApi = useCallback(async (name, college, phone, email) => {
    try {
      const apiRes = await safeFetchJson('/api/ambassadors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, college, phone, email }),
      });

      if (apiRes.ok && apiRes.data?.success) {
        await fetchLiveCampaignData();
        showToast(`Ambassador code ${apiRes.data.ambassador.code} created!`);
        return { success: true, ambassador: apiRes.data.ambassador };
      }

      if (!apiRes.ok && apiRes.data?.error) {
        return { success: false, error: apiRes.data.error };
      }

      // Local resilient fallback
      if (!name || name.trim().length < 2) {
        return { success: false, error: 'Ambassador name is required (at least 2 characters).' };
      }

      const contact = (phone || email || '').trim();
      if (!contact) {
        return { success: false, error: 'A contact identifier (phone or email) is required.' };
      }

      const cleanName = (name || 'AMB').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 6) || 'AMB';
      let code = `${cleanName}-AI`;
      let counter = 1;
      const existingCodes = new Set(ambassadors.map((a) => a.code.toUpperCase()));
      while (existingCodes.has(code.toUpperCase())) {
        counter++;
        code = `${cleanName}${counter}-AI`;
      }

      const newAmbassador = {
        id: `amb-${Date.now()}`,
        name: name.trim(),
        code,
        college: (college || 'Engineering College').trim(),
        phone: (phone || '').trim(),
        email: (email || '').trim().toLowerCase(),
        status: 'active',
        clicks: 0,
        registrations: 0,
        createdAt: new Date().toISOString(),
      };

      const updatedAmbs = [newAmbassador, ...ambassadors];
      const updatedStats = computeStatsFromData(registrations, updatedAmbs);

      setAmbassadors(updatedAmbs);
      setLiveStats(updatedStats);

      try {
        localStorage.setItem('campuspulse_live_ambassadors', JSON.stringify(updatedAmbs));
      } catch {}

      showToast(`Ambassador code ${code} created!`);
      return { success: true, ambassador: newAmbassador };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [ambassadors, registrations, fetchLiveCampaignData, showToast]);

  // Toggle ambassador status (active <-> deactivated)
  const toggleAmbassadorStatusApi = useCallback(async (ambassadorId, newStatus) => {
    try {
      const apiRes = await safeFetchJson('/api/ambassadors/toggle-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: ambassadorId, status: newStatus }),
      });

      if (apiRes.ok && apiRes.data?.success) {
        await fetchLiveCampaignData();
        showToast(`Ambassador ${apiRes.data.ambassador.code} is now ${newStatus}.`);
        return { success: true, ambassador: apiRes.data.ambassador };
      }

      // Local fallback
      const updatedAmbs = ambassadors.map((a) => {
        if (a.id === ambassadorId || a.code.toUpperCase() === String(ambassadorId).toUpperCase()) {
          const nextStatus = newStatus || (a.status === 'active' ? 'deactivated' : 'active');
          return { ...a, status: nextStatus };
        }
        return a;
      });

      const updatedStats = computeStatsFromData(registrations, updatedAmbs);
      setAmbassadors(updatedAmbs);
      setLiveStats(updatedStats);

      try {
        localStorage.setItem('campuspulse_live_ambassadors', JSON.stringify(updatedAmbs));
      } catch {}

      showToast(`Ambassador status updated.`);
      return { success: true };
    } catch (err) {
      showToast(err.message, 'error');
      return { success: false, error: err.message };
    }
  }, [ambassadors, registrations, fetchLiveCampaignData, showToast]);

  // Submit Student Registration via API or resilient local engine
  const registerStudentApi = useCallback(async (studentData) => {
    try {
      // 1. Try sending to backend API if available
      const apiRes = await safeFetchJson('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });

      if (apiRes.ok && apiRes.data?.success) {
        await fetchLiveCampaignData();
        showToast('Registration successful! Spot reserved.');
        return { success: true, registration: apiRes.data.registration };
      }

      // If backend returned a functional validation error (like duplicate email HTTP 400), return it directly!
      if (!apiRes.ok && apiRes.data?.error) {
        return { success: false, error: apiRes.data.error };
      }

      // 2. Resilient local registration engine (for Vercel static deployments or offline)
      const fullName = (studentData.fullName || '').trim();
      if (fullName.length < 2) {
        return { success: false, error: 'Full name is required (min 2 characters).' };
      }

      const normalizedEmail = (studentData.email || '').trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!normalizedEmail || !emailRegex.test(normalizedEmail)) {
        return { success: false, error: 'Please enter a valid student email address.' };
      }

      const college = (studentData.college || '').trim();
      if (college.length < 2) {
        return { success: false, error: 'College/University name is required.' };
      }

      // Deduplication check
      const currentRegs = [...registrations];
      const currentAmbs = [...ambassadors];

      const isDuplicate = currentRegs.some((r) => (r.email || '').toLowerCase() === normalizedEmail);
      if (isDuplicate) {
        return {
          success: false,
          error: `Duplicate registration: The email address "${normalizedEmail}" is already registered for this workshop.`,
        };
      }

      // Referral code attribution
      const ref = (studentData.referralCode || '').trim().toUpperCase();
      let attributedChannel = 'Clubs & Class Reps';
      let matchedAmb = null;
      let codeNotice = null;

      if (ref && ref !== 'DIRECT') {
        const found = currentAmbs.find((a) => a.code.toUpperCase() === ref);
        if (found) {
          if (found.status === 'active') {
            matchedAmb = found;
            attributedChannel = 'Student Ambassadors';
            found.registrations = (found.registrations || 0) + 1;
          } else {
            codeNotice = `Ambassador code ${ref} is deactivated. Registration recorded under Clubs & Class Reps (Direct).`;
            attributedChannel = 'Clubs & Class Reps';
          }
        }
      }

      const newRegistration = {
        id: `reg-${Date.now()}`,
        fullName,
        email: normalizedEmail,
        phone: (studentData.phone || '').trim(),
        college,
        year: (studentData.year || 'Final Year (2026)').trim(),
        referralCode: matchedAmb
          ? matchedAmb.code
          : ref && ref !== 'DIRECT'
          ? `${ref}${codeNotice ? ' (Inactive)' : ''}`
          : 'DIRECT',
        channel: attributedChannel,
        ambassadorId: matchedAmb ? matchedAmb.id : null,
        ambassadorName: matchedAmb ? matchedAmb.name : null,
        registeredAt: new Date().toISOString(),
      };

      const updatedRegs = [newRegistration, ...currentRegs];
      const updatedStats = computeStatsFromData(updatedRegs, currentAmbs);

      setRegistrations(updatedRegs);
      setAmbassadors(currentAmbs);
      setLiveStats(updatedStats);

      try {
        localStorage.setItem('campuspulse_live_registrations', JSON.stringify(updatedRegs));
        localStorage.setItem('campuspulse_live_ambassadors', JSON.stringify(currentAmbs));
      } catch {}

      showToast('Registration successful! Spot reserved.');
      return { success: true, registration: newRegistration, notice: codeNotice };
    } catch (err) {
      return { success: false, error: err.message || 'Registration failed' };
    }
  }, [ambassadors, registrations, fetchLiveCampaignData, showToast]);

  // Reset live campaign data (for demo/testing convenience)
  const resetLiveCampaignApi = useCallback(async () => {
    try {
      await safeFetchJson('/api/reset-live', { method: 'POST' });
    } catch {}

    try {
      localStorage.setItem('campuspulse_live_ambassadors', JSON.stringify(INITIAL_AMBASSADORS));
      localStorage.setItem('campuspulse_live_registrations', JSON.stringify(INITIAL_REGISTRATIONS));
    } catch {}

    setAmbassadors(INITIAL_AMBASSADORS);
    setRegistrations(INITIAL_REGISTRATIONS);
    setLiveStats(computeStatsFromData(INITIAL_REGISTRATIONS, INITIAL_AMBASSADORS));
    showToast('Live database reset to clean baseline.');
  }, [showToast]);

  // Parse URL parameters on load for ?ref=CODE
  useEffect(() => {
    fetchLiveCampaignData();

    // Check query params in window.location.search or window.location.hash
    let refCode = '';
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('ref')) {
      refCode = searchParams.get('ref');
    } else if (window.location.hash.includes('?')) {
      const hashQuery = window.location.hash.split('?')[1];
      const hashParams = new URLSearchParams(hashQuery);
      if (hashParams.has('ref')) {
        refCode = hashParams.get('ref');
      }
    }

    if (refCode) {
      const cleanCode = refCode.trim().toUpperCase();
      setReferralParam(cleanCode);
      trackReferralClick(cleanCode);
      // Auto-open student registration tab if arriving with referral link
      setActiveTab('registrations');
    }
  }, []);

  // Sync hash on activeTab change
  useEffect(() => {
    const currentHash = window.location.hash.replace('#', '').split('?')[0];
    const targetHash = activeTab === 'register' ? 'registrations' : activeTab;
    if (currentHash !== targetHash) {
      window.location.hash = targetHash;
    }
  }, [activeTab]);

  // Handle hashchange from browser back/forward
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '').split('?')[0];
      const VALID_TABS = [
        'overview',
        'channels',
        'referrals',
        'actions',
        'docs',
        'register',
        'registrations',
        'ambassadors',
        'whatsapp',
      ];
      if (VALID_TABS.includes(hash)) {
        setActiveTab(hash === 'register' ? 'registrations' : hash);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Save live mode preference
  useEffect(() => {
    localStorage.setItem('campuspulse_is_live_mode', String(isLiveMode));
  }, [isLiveMode]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('campuspulse_channels', JSON.stringify(channels));
  }, [channels]);

  useEffect(() => {
    localStorage.setItem('campuspulse_assumptions', JSON.stringify(assumptions));
  }, [assumptions]);

  useEffect(() => {
    localStorage.setItem('campuspulse_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('campuspulse_hh_mode', String(hedgehogMode));
  }, [hedgehogMode]);

  // Channel helper to update
  const updateChannel = (id, field, value) => {
    setChannels((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: Number(value) || 0 } : c))
    );
  };

  const resetAllData = () => {
    setChannels(DEFAULT_CHANNELS);
    setAssumptions(DEFAULT_ASSUMPTIONS);
    setMessages(DEFAULT_MESSAGES);
  };

  // Derived Channel metrics
  const totalTarget = useMemo(() => channels.reduce((sum, c) => sum + Number(c.target), 0), [channels]);
  const totalDemo = useMemo(() => channels.reduce((sum, c) => sum + Number(c.demo), 0), [channels]);
  const totalSpend = useMemo(() => channels.reduce((sum, c) => sum + Number(c.budget), 0), [channels]);
  const reserveBudget = 350;
  const totalBudget = totalSpend + reserveBudget;

  // Active registration count depending on Live Mode vs Demo Mode
  const activeRegistrationsCount = isLiveMode ? liveStats.totalRegistrations : totalDemo;
  const activeRemainingGap = Math.max(0, 500 - activeRegistrationsCount);
  const activeProgressPercentage = Math.min(100, Math.round((activeRegistrationsCount / 500) * 100));

  // Message calculations
  const rateA = useMemo(() => {
    return messages.variantA.visits > 0
      ? (messages.variantA.signups / messages.variantA.visits) * 100
      : 0;
  }, [messages]);

  const rateB = useMemo(() => {
    return messages.variantB.visits > 0
      ? (messages.variantB.signups / messages.variantB.visits) * 100
      : 0;
  }, [messages]);

  const diffRate = useMemo(() => {
    return Number((rateA - rateB).toFixed(1));
  }, [rateA, rateB]);

  // Referral Calculations (Model projections)
  const referralCalculations = useMemo(() => {
    const totalInvites = assumptions.ambassadors * assumptions.invitesPerAmbassador;
    const consRate = assumptions.signupRate * 0.5;
    const consRegistrations = Math.round((totalInvites * consRate) / 100);

    const baseRate = assumptions.signupRate;
    const baseRegistrations = Math.round((totalInvites * baseRate) / 100);

    const optRate = assumptions.signupRate * 1.5;
    const optRegistrations = Math.round((totalInvites * optRate) / 100);

    const days = [1, 2, 3, 4, 5, 6, 7];
    const weights = [0.12, 0.25, 0.42, 0.58, 0.74, 0.88, 1.0];

    const chartData = days.map((day, idx) => ({
      day: `Day ${day}`,
      conservative: Math.round(consRegistrations * weights[idx]),
      base: Math.round(baseRegistrations * weights[idx]),
      optimistic: Math.round(optRegistrations * weights[idx]),
    }));

    return {
      consRate,
      consRegistrations,
      baseRate,
      baseRegistrations,
      optRate,
      optRegistrations,
      chartData,
    };
  }, [assumptions]);

  // Message Generator
  const generateNewMessages = () => {
    const templates = {
      'Increase sign-ups': {
        Friendly: {
          A: `Ready to build your first AI project in 60 minutes? Free for final-year engineering students. Limited seats!`,
          B: `Kickstart your AI journey with a hands-on project in 60 minutes. Free. Made for final-year students.`,
        },
        Urgent: {
          A: `Only 48 hours left to register! Build your first AI project in 60 minutes. Final-year spots filling quickly.`,
          B: `Final call for engineering seniors: Build your live AI demo in 60 minutes before registrations close!`,
        },
        Professional: {
          A: `Add a functional AI project to your resume in 60 minutes. Free hands-on session for final-year engineers.`,
          B: `Equip yourself with practical AI skills. Build a verified 60-minute portfolio project. Free registration.`,
        },
        'Peer-to-peer / Casual': {
          A: `Don't miss this! We're building our first working AI project together this week in 60 min. Free for seniors.`,
          B: `Hands-on AI without the fluff: Build your first project in 60 minutes with fellow final-year students.`,
        },
      },
      'Build urgency': {
        Friendly: {
          A: `Seats are almost full! Reserve your spot to build your first AI project in 60 minutes this weekend.`,
          B: `Last chance to join your classmates for the 60-minute live AI building sprint. Free registration!`,
        },
        Urgent: {
          A: `Urgent: Final 25 seats remaining for the 60-minute AI builder workshop. Register before tonight.`,
          B: `Registration closing soon! Build your verified AI project in 60 minutes. Don't get left behind.`,
        },
        Professional: {
          A: `Registration cutoff approaching: Confirm your attendance for the 60-minute AI project workshop.`,
          B: `Capacity constraint: Reserve your final-year seat for the hands-on AI project masterclass now.`,
        },
        'Peer-to-peer / Casual': {
          A: `Grab a seat quick! The 60-minute AI workshop cohort is nearly capped for our college branch.`,
          B: `Save your spot before tomorrow! Free 60-minute AI build session for final-year students.`,
        },
      },
      'Highlight outcome': {
        Friendly: {
          A: `Walk away with a deployed AI project you can show recruiters in just 60 minutes. Free workshop!`,
          B: `Turn AI theory into a live, working project in 60 minutes. Free for final-year engineers.`,
        },
        Urgent: {
          A: `Build, deploy, and showcase your first AI project in 60 minutes flat. Register before slots expire!`,
          B: `Get interview-ready AI project proof in 60 minutes. Zero cost, high impact. Register now!`,
        },
        Professional: {
          A: `Produce an industry-relevant AI artifact for placement interviews in 60 minutes. Free entry.`,
          B: `Demonstrate hands-on machine learning competence with a completed 60-minute project.`,
        },
        'Peer-to-peer / Casual': {
          A: `Skip the boring tutorials: Build a real AI project with working code in 60 minutes. Free for seniors.`,
          B: `In just one hour, build a working AI project you can literally put on your GitHub. Free!`,
        },
      },
      'Emphasize career readiness': {
        Friendly: {
          A: `Boost your placement portfolio: Build a real-world AI project in 60 minutes. Free for seniors!`,
          B: `Prepare for technical AI interviews by building a practical project in 60 minutes. Free access.`,
        },
        Urgent: {
          A: `Placement season is here: Build and showcase a working AI project in 60 minutes. Register today!`,
          B: `Stand out to recruiters right now. Join the 60-minute hands-on AI build workshop for free.`,
        },
        Professional: {
          A: `Elevate your engineering profile with an evaluated hands-on AI build completed in 60 minutes.`,
          B: `Gain competitive placement advantage through practical AI project implementation in 60 minutes.`,
        },
        'Peer-to-peer / Casual': {
          A: `Placement flex: Build a working AI project in 60 minutes and talk about it in your interviews.`,
          B: `Get that AI project done for your resume in just 60 minutes. Free for final-year engineers.`,
        },
      },
    };

    const goalMap = templates[generatorGoal] || templates['Increase sign-ups'];
    const toneMap = goalMap[generatorTone] || goalMap['Friendly'];

    setMessages((prev) => ({
      ...prev,
      variantA: {
        ...prev.variantA,
        text: toneMap.A,
      },
      variantB: {
        ...prev.variantB,
        text: toneMap.B,
      },
    }));
  };

  // Next-Action engine logic (Deterministic, transparent rules based on live or demo data)
  const nextActionAnalysis = useMemo(() => {
    const isLive = isLiveMode;
    const currentTotal = isLive ? liveStats.totalRegistrations : totalDemo;
    const currentAmbs = isLive ? (liveStats.channelBreakdown['Student Ambassadors'] || 0) : 90;
    const currentClubs = isLive ? (liveStats.channelBreakdown['Clubs & Class Reps'] || 0) : 60;

    // Day 3 pro-rata threshold = 30% of target (150 registrations)
    const day3Threshold = 150;
    const isDay3PaceMet = currentTotal >= day3Threshold;

    let recommendationTitle = '';
    let recommendationReason = '';
    let reserveActionText = '';

    if (isLive) {
      if (currentTotal === 0) {
        recommendationTitle = 'Kick off ambassador outreach links';
        recommendationReason =
          'Zero registrations recorded so far. Generate and share unique referral links with your first 5 student ambassadors.';
        reserveActionText = 'Keep ₹350 reserve strictly locked until Day 3 pace check.';
      } else if (currentTotal < 50) {
        recommendationTitle = 'Activate WhatsApp communities and club reps';
        recommendationReason =
          `You currently have ${currentTotal} verified registration(s). Dispatch pre-filled WhatsApp announcements to 20 engineering branch groups to accelerate to 150 by Day 3.`;
        reserveActionText = `Reserve policy: Hold ₹350 unspent. Current progress (${currentTotal}/500) has not reached the Day 3 pacing gate (${day3Threshold}).`;
      } else if (!isDay3PaceMet) {
        recommendationTitle = 'Double down on high-performing ambassadors';
        recommendationReason =
          `At ${currentTotal} registrations, campaign is tracking slightly below Day 3 pace (${day3Threshold}). Run a mini-contest for the top 3 ambassadors.`;
        reserveActionText = 'Hold ₹350 reserve unspent. Do not unlock reserve until pacing reaches >= 150 registrations.';
      } else {
        recommendationTitle = 'Release ₹350 reserve to Student Ambassadors';
        recommendationReason =
          `Pacing target exceeded with ${currentTotal} registrations! Channel data confirms Student Ambassadors has the lowest acquisition cost.`;
        reserveActionText = 'Reserve policy: Eligible to unlock ₹350 reserve at Day 3 milestone to amplify high-performing ambassadors.';
      }
    } else {
      // Demo mode benchmark logic
      recommendationTitle = 'Focus more effort on student ambassadors';
      recommendationReason =
        'Student ambassadors is at or above pace (90/150) and has the lowest planned cost per registration. Allocate more outreach effort here.';
      reserveActionText =
        'Release ₹350 only at Day 3 or Day 6 to a channel at or above pace; otherwise keep unspent.';
    }

    const budgetStatusText =
      totalSpend <= 2000
        ? `Total planned spend is within ₹2,000.`
        : `Total planned spend (₹${totalSpend.toLocaleString()}) exceeds ₹2,000 budget!`;

    const channelStatusText = isLive
      ? `Live mode: ${currentTotal} registered out of 500 target across 4 live channels.`
      : `Demo mode: 2 channels are behind pace (based on sample data).`;

    return {
      recommendationTitle,
      recommendationReason,
      reserveActionText,
      budgetStatusText,
      budgetOk: totalSpend <= 2000,
      channelStatusText,
      channelsOk: true,
      currentTotal,
      isDay3PaceMet,
    };
  }, [isLiveMode, liveStats, totalDemo, totalSpend]);

  const value = {
    activeTab,
    setActiveTab,
    isLiveMode,
    setIsLiveMode,
    campaignPlanOpen,
    setCampaignPlanOpen,
    whatsAppModalOpen,
    setWhatsAppModalOpen,
    registerModalOpen,
    setRegisterModalOpen,
    hedgehogMode,
    setHedgehogMode,
    referralParam,
    setReferralParam,
    liveStats,
    ambassadors,
    registrations,
    liveLoading,
    fetchLiveCampaignData,
    addAmbassadorApi,
    toggleAmbassadorStatusApi,
    registerStudentApi,
    trackReferralClick,
    resetLiveCampaignApi,
    toastMessage,
    showToast,
    channels,
    updateChannel,
    totalTarget,
    totalDemo,
    totalSpend,
    reserveBudget,
    totalBudget,
    activeRegistrationsCount,
    activeRemainingGap,
    activeProgressPercentage,
    assumptions,
    setAssumptions,
    referralCalculations,
    messages,
    setMessages,
    rateA,
    rateB,
    diffRate,
    generatorGoal,
    setGeneratorGoal,
    generatorTone,
    setGeneratorTone,
    generatorAudience,
    setGeneratorAudience,
    generateNewMessages,
    nextActionAnalysis,
    resetAllData,
  };

  return <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>;
}

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
}
