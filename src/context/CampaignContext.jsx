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

  // Live data fetched from backend
  const [liveStats, setLiveStats] = useState({
    target: 500,
    totalRegistrations: 4,
    remainingGap: 496,
    progressPercentage: 1,
    channelBreakdown: {
      'Clubs & Class Reps': 1,
      'Student Ambassadors': 3,
      'WhatsApp Communities': 0,
      'Social & Paid Test': 0,
    },
    ambassadorsCount: 3,
    activeAmbassadors: 3,
  });
  const [ambassadors, setAmbassadors] = useState([]);
  const [registrations, setRegistrations] = useState([]);
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

  // Fetch live campaign data from backend
  const fetchLiveCampaignData = useCallback(async () => {
    try {
      setLiveLoading(true);
      const [statsRes, ambRes, regRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/ambassadors'),
        fetch('/api/registrations'),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        if (statsData.success) {
          setLiveStats(statsData.stats);
        }
      }

      if (ambRes.ok) {
        const ambData = await ambRes.json();
        if (ambData.success) {
          setAmbassadors(ambData.ambassadors || []);
        }
      }

      if (regRes.ok) {
        const regData = await regRes.json();
        if (regData.success) {
          setRegistrations(regData.registrations || []);
        }
      }
    } catch (err) {
      console.warn('CampusPulse API sync notice:', err.message);
    } finally {
      setLiveLoading(false);
    }
  }, []);

  // Track referral click via backend API
  const trackReferralClick = useCallback(async (code) => {
    if (!code) return;
    try {
      await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referralCode: code }),
      });
    } catch (err) {
      console.warn('Track click failed:', err);
    }
  }, []);

  // Add a new Ambassador via API
  const addAmbassadorApi = useCallback(async (name, college, phone, email) => {
    try {
      const res = await fetch('/api/ambassadors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, college, phone, email }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create ambassador');
      }
      await fetchLiveCampaignData();
      showToast(`Ambassador code ${data.ambassador.code} created!`);
      return { success: true, ambassador: data.ambassador };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [fetchLiveCampaignData, showToast]);

  // Toggle ambassador status (active <-> deactivated)
  const toggleAmbassadorStatusApi = useCallback(async (ambassadorId, newStatus) => {
    try {
      const res = await fetch('/api/ambassadors/toggle-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: ambassadorId, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update ambassador status');
      }
      await fetchLiveCampaignData();
      showToast(`Ambassador ${data.ambassador.code} is now ${newStatus}.`);
      return { success: true, ambassador: data.ambassador };
    } catch (err) {
      showToast(err.message, 'error');
      return { success: false, error: err.message };
    }
  }, [fetchLiveCampaignData, showToast]);

  // Submit Student Registration via API
  const registerStudentApi = useCallback(async (studentData) => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Registration failed');
      }
      await fetchLiveCampaignData();
      showToast('Registration successful! Spot reserved.');
      return { success: true, registration: data.registration };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [fetchLiveCampaignData, showToast]);

  // Reset live campaign data (for demo/testing convenience)
  const resetLiveCampaignApi = useCallback(async () => {
    try {
      const res = await fetch('/api/reset-live', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        await fetchLiveCampaignData();
        showToast('Live database reset to clean baseline.');
      }
    } catch (err) {
      console.error('Reset failed:', err);
    }
  }, [fetchLiveCampaignData, showToast]);

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
