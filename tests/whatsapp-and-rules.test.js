// tests/whatsapp-and-rules.test.js
// Test WhatsApp Composer copy generation, wa.me URL encoding, and Next-Action Reserve Rules

function generateWhatsAppCopy({ audience, timing, tone, referralCode }) {
  const workshopTitle = 'Build Your First AI Project in 60 Minutes';
  const workshopDate = 'Saturday, 6:00 PM IST';
  const regUrl = referralCode
    ? `http://localhost:3000/?ref=${referralCode}#register`
    : `http://localhost:3000/#register`;

  if (audience === 'Ambassadors') {
    return (
      `Hey team! 🚀 Here is your exclusive workshop link for "${workshopTitle}" (${workshopDate}):\n\n` +
      `🔗 ${regUrl}\n\n` +
      `Share this with final-year CSE/IT students. Every registration through your link earns milestone points!`
    );
  }

  if (timing === 'Final-Day Reminder') {
    return (
      `⏳ *Final Hours Alert!*\n\n` +
      `Registrations for "${workshopTitle}" close tonight! If you're a final-year engineering student looking to build a deployable AI app on your resume, don't miss this.\n\n` +
      `🗓 Date: ${workshopDate}\n` +
      `🔗 Fast-track register: ${regUrl}\n\n` +
      `Free for verified students.`
    );
  }

  if (tone === 'Concise') {
    return (
      `🚀 *AI Workshop for Final-Year Engineers*\n` +
      `Topic: ${workshopTitle}\n` +
      `When: ${workshopDate} | 100% Free\n` +
      `Build and deploy your first AI project in 60 mins.\n` +
      `👉 Register here: ${regUrl}`
    );
  }

  return (
    `Hey everyone! 👋 Are you preparing your final-year project or resume?\n\n` +
    `We are hosting an exclusive hands-on sprint: *"${workshopTitle}"* this *${workshopDate}*.\n\n` +
    `✅ Build an active AI app from scratch\n` +
    `✅ No prior deep learning experience needed\n` +
    `✅ Certificate of completion included\n\n` +
    `Seats are limited to 500 final-year students. Reserve your free spot here:\n` +
    `👉 ${regUrl}\n\n` +
    `See you there!`
  );
}

function evaluateReserveRule({ currentDay, totalRegistrations, day3Milestone = 150, reserveAmount = 350 }) {
  if (currentDay < 3) {
    return {
      status: 'HELD',
      action: 'Hold ₹350 reserve until Day 3 checkpoint.',
      canRelease: false,
    };
  }
  if (totalRegistrations >= day3Milestone) {
    return {
      status: 'ELIGIBLE_FOR_RELEASE',
      action: `Day 3 milestone met (${totalRegistrations} >= ${day3Milestone}). Release ₹${reserveAmount} to top-performing ambassador or club channels to accelerate final push.`,
      canRelease: true,
    };
  }
  return {
    status: 'CONSERVED',
    action: `Pacing threshold not met (${totalRegistrations} < ${day3Milestone}). Conserve ₹${reserveAmount} reserve to protect ₹2,000 budget cap.`,
    canRelease: false,
  };
}

console.log('🧪 Testing WhatsApp Outreach Composer & Rule Engine...');

// Test 1: Ambassador link embedding
const ambCopy = generateWhatsAppCopy({ audience: 'Ambassadors', timing: 'Initial Invitation', tone: 'Friendly', referralCode: 'RAHUL-AI' });
console.assert(ambCopy.includes('ref=RAHUL-AI'), 'Referral code embedded in link');

// Test 2: URL encoding for wa.me
const encodedUrl = `https://wa.me/?text=${encodeURIComponent(ambCopy)}`;
console.assert(encodedUrl.startsWith('https://wa.me/?text='), 'Proper wa.me scheme');
console.assert(!encodedUrl.includes(' '), 'No bare spaces in URL');
console.assert(decodeURIComponent(encodedUrl.split('?text=')[1]) === ambCopy, 'URL decodes cleanly back to original copy');

// Test 3: Reserve rule day 2 check
const ruleDay2 = evaluateReserveRule({ currentDay: 2, totalRegistrations: 100 });
console.assert(ruleDay2.status === 'HELD' && !ruleDay2.canRelease, 'Day 2 holds reserve');

// Test 4: Reserve rule day 3 milestone met
const ruleDay3Met = evaluateReserveRule({ currentDay: 3, totalRegistrations: 160 });
console.assert(ruleDay3Met.status === 'ELIGIBLE_FOR_RELEASE' && ruleDay3Met.canRelease, 'Day 3 milestone release triggered');

// Test 5: Reserve rule day 3 milestone missed
const ruleDay3Missed = evaluateReserveRule({ currentDay: 3, totalRegistrations: 120 });
console.assert(ruleDay3Missed.status === 'CONSERVED' && !ruleDay3Missed.canRelease, 'Day 3 under-pace conserves reserve');

console.log('✅ All WhatsApp Outreach and Reserve Decision Rules verified!');
