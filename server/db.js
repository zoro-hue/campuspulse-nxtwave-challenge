import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '../data/database.json');

// Ensure data directory exists
const DATA_DIR = path.dirname(DB_PATH);
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initial = { ambassadors: [], registrations: [] };
      fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const data = JSON.parse(raw);
    data.ambassadors = data.ambassadors || [];
    data.registrations = data.registrations || [];
    // Ensure all ambassadors have a valid status and strictly verified registration counts
    data.ambassadors.forEach((a) => {
      if (!a.status) a.status = 'active';
      const verifiedCount = data.registrations.filter(
        (r) =>
          r.ambassadorId === a.id ||
          (r.referralCode && r.referralCode.toUpperCase() === a.code.toUpperCase())
      ).length;
      a.registrations = verifiedCount;
      if (typeof a.clicks !== 'number') a.clicks = 0;
    });
    return data;
  } catch (err) {
    console.error('Failed to read database file:', err);
    return { ambassadors: [], registrations: [] };
  }
}

export function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to write database file:', err);
    return false;
  }
}

// Generate collision-free referral code
export function generateUniqueCode(name) {
  const db = readDb();
  const cleanName = (name || 'AMB')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 6) || 'AMB';

  let code = `${cleanName}-AI`;
  let counter = 1;
  const existingCodes = new Set((db.ambassadors || []).map((a) => a.code.toUpperCase()));

  while (existingCodes.has(code.toUpperCase())) {
    counter++;
    code = `${cleanName}${counter}-AI`;
  }
  return code;
}

// Add new ambassador
export function addAmbassador({ name, college, phone, email }) {
  if (!name || name.trim().length < 2) {
    throw new Error('Ambassador name is required (at least 2 characters).');
  }

  const contact = (phone || email || '').trim();
  if (!contact) {
    throw new Error('A contact identifier (phone or email) is required.');
  }

  const db = readDb();
  const code = generateUniqueCode(name);
  const newAmbassador = {
    id: `amb-${Date.now()}`,
    name: name.trim(),
    code,
    college: (college || 'Engineering College').trim(),
    phone: (phone || '').trim(),
    email: (email || '').trim().toLowerCase(),
    status: 'active', // 'active' | 'deactivated'
    clicks: 0,
    registrations: 0,
    createdAt: new Date().toISOString(),
  };

  db.ambassadors = [newAmbassador, ...(db.ambassadors || [])];
  writeDb(db);
  return newAmbassador;
}

// Toggle ambassador active/deactivated status
export function toggleAmbassadorStatus(ambassadorId, newStatus) {
  const db = readDb();
  const ambassador = (db.ambassadors || []).find(
    (a) => a.id === ambassadorId || a.code.toUpperCase() === String(ambassadorId).toUpperCase()
  );

  if (!ambassador) {
    throw new Error('Ambassador not found.');
  }

  const validStatus = newStatus
    ? (newStatus === 'deactivated' ? 'deactivated' : 'active')
    : (ambassador.status === 'active' ? 'deactivated' : 'active');
  ambassador.status = validStatus;
  writeDb(db);
  return ambassador;
}

// Track referral link click (only for active ambassadors)
export function trackReferralClick(code) {
  if (!code) return { success: false, reason: 'No code provided' };
  const db = readDb();
  const normalizedCode = code.trim().toUpperCase();
  const ambassador = (db.ambassadors || []).find(
    (a) => a.code.toUpperCase() === normalizedCode
  );

  if (!ambassador) {
    return { success: false, reason: 'Ambassador code not found' };
  }

  if (ambassador.status === 'deactivated') {
    return { success: false, reason: 'Ambassador code is deactivated', active: false };
  }

  ambassador.clicks = (ambassador.clicks || 0) + 1;
  writeDb(db);
  return { success: true, active: true, clicks: ambassador.clicks };
}

// Register a student with attribution and deduplication
export function registerStudent({
  fullName,
  email,
  phone,
  college,
  year,
  referralCode,
  channel,
}) {
  // Validate inputs
  if (!fullName || fullName.trim().length < 2) {
    throw new Error('Full name is required (min 2 characters).');
  }

  const normalizedEmail = (email || '').trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!normalizedEmail || !emailRegex.test(normalizedEmail)) {
    throw new Error('Please enter a valid student email address.');
  }

  if (!college || college.trim().length < 2) {
    throw new Error('College/University name is required.');
  }

  const db = readDb();
  db.registrations = db.registrations || [];
  db.ambassadors = db.ambassadors || [];

  // Deduplication check: Normalized email
  const existing = db.registrations.find(
    (r) => (r.email || '').toLowerCase() === normalizedEmail
  );
  if (existing) {
    throw new Error(
      `Duplicate registration: The email address "${normalizedEmail}" is already registered for this workshop.`
    );
  }

  // Attribution resolution
  const ref = (referralCode || '').trim().toUpperCase();
  let attributedChannel = channel || 'Clubs & Class Reps';
  let matchedAmbassador = null;
  let codeStatusNotice = null;

  if (ref && ref !== 'DIRECT') {
    const foundAmb = db.ambassadors.find(
      (a) => a.code.toUpperCase() === ref
    );

    if (foundAmb) {
      if (foundAmb.status === 'active') {
        matchedAmbassador = foundAmb;
        attributedChannel = 'Student Ambassadors';
        foundAmb.registrations = (foundAmb.registrations || 0) + 1;
      } else {
        // Ambassador code is deactivated - do not attribute registration to ambassador
        codeStatusNotice = `Ambassador code ${ref} is deactivated. Registration recorded under Clubs & Class Reps (Direct).`;
        attributedChannel = 'Clubs & Class Reps';
      }
    } else {
      attributedChannel = 'Clubs & Class Reps';
    }
  }

  const registrationRecord = {
    id: `reg-${Date.now()}`,
    fullName: fullName.trim(),
    email: normalizedEmail,
    phone: (phone || '').trim(),
    college: (college || 'Engineering College').trim(),
    year: (year || 'Final Year (2026)').trim(),
    referralCode: matchedAmbassador
      ? matchedAmbassador.code
      : (ref ? `${ref}${codeStatusNotice ? ' (Inactive)' : ''}` : 'DIRECT'),
    channel: attributedChannel,
    ambassadorId: matchedAmbassador ? matchedAmbassador.id : null,
    ambassadorName: matchedAmbassador ? matchedAmbassador.name : null,
    registeredAt: new Date().toISOString(),
  };

  db.registrations = [registrationRecord, ...db.registrations];
  writeDb(db);

  return {
    registration: registrationRecord,
    attributedAmbassador: matchedAmbassador
      ? { name: matchedAmbassador.name, code: matchedAmbassador.code }
      : null,
    notice: codeStatusNotice,
  };
}

// Calculate live campaign metrics
export function getLiveStats() {
  const db = readDb();
  const regs = db.registrations || [];
  const ambs = db.ambassadors || [];

  const totalRegistrations = regs.length;
  const target = 500;
  const remainingGap = Math.max(0, target - totalRegistrations);

  // Group by channel (strictly matching the 4 planned channels, summing to totalRegistrations)
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
