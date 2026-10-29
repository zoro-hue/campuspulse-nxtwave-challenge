// tests/growth-engine.test.js
// Automated End-to-End Test Suite for CampusPulse Growth Engine

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('🚀 Starting CampusPulse Growth Engine Comprehensive Test Suite...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // ----------------------------------------------------
    // TEST 1: Ambassador creation & collision prevention
    // ----------------------------------------------------
    console.log('--- TEST 1: Ambassador Creation & Uniqueness ---');
    const testAmbassadorName = 'Test Ambassador ' + Date.now();
    const createRes = await fetch(`${BASE_URL}/api/ambassadors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: testAmbassadorName,
        contact: 'ambassador@college.edu',
        college: 'Test Tech Institute',
      }),
    });
    const createData = await createRes.json();
    assert(createRes.status === 201 && createData.success, 'Created ambassador successfully');
    assert(Boolean(createData.ambassador?.code), `Ambassador assigned unique code: ${createData.ambassador?.code}`);
    assert(createData.ambassador?.status === 'active', 'Ambassador status is active by default');

    const ambCode = createData.ambassador.code;

    // Verify record persistence by fetching list
    const listRes = await fetch(`${BASE_URL}/api/ambassadors`);
    const listData = await listRes.json();
    const found = listData.ambassadors?.find((a) => a.code === ambCode);
    assert(Boolean(found), 'Ambassador persisted in database');

    // ----------------------------------------------------
    // TEST 2: Referral click tracking & Registration attribution
    // ----------------------------------------------------
    console.log('\n--- TEST 2: Referral Tracking & Registration Attribution ---');
    // Track click
    const clickRes = await fetch(`${BASE_URL}/api/referral/click`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: ambCode }),
    });
    const clickData = await clickRes.json();
    assert(clickRes.status === 200 && clickData.success, 'Referral click tracked successfully');

    // Submit registration using this referral code
    const uniqueEmail = `test.student.${Date.now()}@college.edu`;
    const regRes = await fetch(`${BASE_URL}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Aarav Patel',
        email: uniqueEmail,
        phone: '9876543210',
        college: 'Test Tech Institute',
        branch: 'Computer Science',
        year: 'Final Year (2025/2026)',
        referralCode: ambCode,
      }),
    });
    const regData = await regRes.json();
    assert(regRes.status === 201 && regData.success, 'Student registered successfully');
    assert(regData.registration?.referralCode === ambCode, 'Registration properly attributed to referral code');
    assert(regData.registration?.channel === 'Student Ambassadors', 'Channel categorized under Student Ambassadors');

    // Verify ambassador registration count incremented
    const verifyAmbRes = await fetch(`${BASE_URL}/api/ambassadors`);
    const verifyAmbData = await verifyAmbRes.json();
    const updatedAmb = verifyAmbData.ambassadors.find((a) => a.code === ambCode);
    assert(updatedAmb.registrations >= 1, `Ambassador registration count incremented (now ${updatedAmb.registrations})`);
    assert(updatedAmb.clicks >= 1, `Ambassador clicks recorded (now ${updatedAmb.clicks})`);

    // ----------------------------------------------------
    // TEST 3: Deactivated ambassador code handling
    // ----------------------------------------------------
    console.log('\n--- TEST 3: Deactivated Ambassador Code Handling ---');
    // Toggle ambassador status to deactivated
    const toggleRes = await fetch(`${BASE_URL}/api/ambassadors/toggle-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: ambCode, status: 'deactivated' }),
    });
    const toggleData = await toggleRes.json();
    assert(toggleRes.status === 200 && toggleData.ambassador?.status === 'deactivated', 'Ambassador successfully deactivated');

    // Attempt referral click on deactivated code
    const deactClickRes = await fetch(`${BASE_URL}/api/referral/click`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: ambCode }),
    });
    const deactClickData = await deactClickRes.json();
    assert(!deactClickData.success || deactClickData.active === false, 'Referral click rejected or flagged as inactive for deactivated code');

    // Attempt registration with deactivated code
    const deactEmail = `student.deact.${Date.now()}@college.edu`;
    const deactRegRes = await fetch(`${BASE_URL}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Rohan Sharma',
        email: deactEmail,
        phone: '9876543211',
        college: 'Test Tech Institute',
        branch: 'Electronics',
        year: 'Final Year (2025/2026)',
        referralCode: ambCode,
      }),
    });
    const deactRegData = await deactRegRes.json();
    // Verify that the deactivated code does NOT attribute to the ambassador
    const postDeactAmbRes = await fetch(`${BASE_URL}/api/ambassadors`);
    const postDeactAmbData = await postDeactAmbRes.json();
    const postDeactAmb = postDeactAmbData.ambassadors.find((a) => a.code === ambCode);
    assert(postDeactAmb.registrations === updatedAmb.registrations, 'Deactivated ambassador registrations did NOT increment');

    // Reactivate the ambassador
    await fetch(`${BASE_URL}/api/ambassadors/toggle-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: ambCode, status: 'active' }),
    });
    console.log('  ℹ️ Reactivated ambassador for subsequent checks.');

    // ----------------------------------------------------
    // TEST 4: Duplicate prevention & email normalization
    // ----------------------------------------------------
    console.log('\n--- TEST 4: Duplicate Prevention & Email Normalization ---');
    // Try registering with the exact same email but with UPPERCASE and whitespace
    const dupEmail = `  ${uniqueEmail.toUpperCase()}  `;
    const dupRes = await fetch(`${BASE_URL}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Duplicate Attempt',
        email: dupEmail,
        phone: '9999999999',
        college: 'Some College',
        branch: 'IT',
        year: 'Final Year',
      }),
    });
    const dupData = await dupRes.json();
    assert(dupRes.status === 400 && !dupData.success, 'Duplicate registration was rejected with HTTP 400');
    assert(dupData.message && dupData.message.toLowerCase().includes('already registered'), `Received clear duplicate message: "${dupData.message}"`);

    // ----------------------------------------------------
    // TEST 5: Live Stats and Channel Attribution
    // ----------------------------------------------------
    console.log('\n--- TEST 5: Live Stats and Channel Attribution ---');
    const statsRes = await fetch(`${BASE_URL}/api/stats`);
    const statsData = await statsRes.json();
    assert(statsRes.status === 200 && statsData.success, 'Live stats endpoint returned successfully');
    const stats = statsData.stats;
    assert(typeof stats.totalRegistrations === 'number', `Total verified registrations count: ${stats.totalRegistrations}`);
    assert(Boolean(stats.channelBreakdown), 'Channel breakdown returned');
    assert(stats.target === 500, 'Campaign target is correctly set to 500');
    assert(stats.activeAmbassadors >= 1, `Active ambassadors tracked (${stats.activeAmbassadors})`);

    // ----------------------------------------------------
    // TEST 6: Edge Cases & Validation Rejections
    // ----------------------------------------------------
    console.log('\n--- TEST 6: Edge Cases & Validation Rejections ---');
    // Missing required fields
    const emptyRes = await fetch(`${BASE_URL}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: '' }),
    });
    const emptyData = await emptyRes.json();
    assert(emptyRes.status === 400, 'Empty submission rejected with HTTP 400');

    // Invalid email format
    const badEmailRes = await fetch(`${BASE_URL}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Bad Email User',
        email: 'not-an-email',
        phone: '9876543210',
        college: 'College',
      }),
    });
    assert(badEmailRes.status === 400, 'Invalid email rejected with HTTP 400');

    // Missing ambassador name
    const badAmbRes = await fetch(`${BASE_URL}/api/ambassadors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '   ' }),
    });
    assert(badAmbRes.status === 400, 'Blank ambassador name rejected with HTTP 400');

    // ----------------------------------------------------
    // SUMMARY
    // ----------------------------------------------------
    console.log('\n=============================================');
    console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('=============================================\n');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  }
}

runTests();
