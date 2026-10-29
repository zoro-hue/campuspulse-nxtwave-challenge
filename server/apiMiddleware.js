import {
  readDb,
  writeDb,
  addAmbassador,
  registerStudent,
  trackReferralClick,
  getLiveStats,
  toggleAmbassadorStatus,
} from './db.js';

export function campusPulseApiMiddleware() {
  return {
    name: 'campuspulse-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
        const pathname = url.pathname;

        if (!pathname.startsWith('/api/')) {
          return next();
        }

        // Helper to send JSON
        const sendJson = (status, payload) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.end(JSON.stringify(payload));
        };

        if (req.method === 'OPTIONS') {
          return sendJson(200, { success: true });
        }

        // Helper to parse JSON body
        const parseBody = () => {
          return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
              try {
                resolve(body ? JSON.parse(body) : {});
              } catch (e) {
                reject(new Error('Invalid JSON'));
              }
            });
            req.on('error', reject);
          });
        };

        try {
          // 1. GET /api/ambassadors
          if (pathname === '/api/ambassadors' && req.method === 'GET') {
            const db = readDb();
            return sendJson(200, { success: true, ambassadors: db.ambassadors || [] });
          }

          // 2. POST /api/ambassadors
          if (pathname === '/api/ambassadors' && req.method === 'POST') {
            const body = await parseBody();
            const payload = {
              ...body,
              phone: body.phone || (body.contact && !body.contact.includes('@') ? body.contact : undefined),
              email: body.email || (body.contact && body.contact.includes('@') ? body.contact : undefined),
            };
            const ambassador = addAmbassador(payload);
            return sendJson(201, { success: true, ambassador });
          }

          // 3. POST /api/ambassadors/toggle-status
          if (pathname === '/api/ambassadors/toggle-status' && (req.method === 'POST' || req.method === 'PATCH')) {
            const body = await parseBody();
            const ambassador = toggleAmbassadorStatus(body.id || body.code, body.status);
            return sendJson(200, { success: true, ambassador });
          }

          // 4. POST /api/register or /api/registrations
          if ((pathname === '/api/register' || pathname === '/api/registrations') && req.method === 'POST') {
            const body = await parseBody();
            const result = registerStudent(body);
            return sendJson(201, { success: true, ...result });
          }

          // 5. GET /api/registrations (with optional search & channel filter)
          if (pathname === '/api/registrations' && req.method === 'GET') {
            const db = readDb();
            let regs = db.registrations || [];

            const search = (url.searchParams.get('search') || '').toLowerCase().trim();
            const channel = url.searchParams.get('channel') || '';

            if (search) {
              regs = regs.filter(
                (r) =>
                  (r.fullName && r.fullName.toLowerCase().includes(search)) ||
                  (r.email && r.email.toLowerCase().includes(search)) ||
                  (r.college && r.college.toLowerCase().includes(search)) ||
                  (r.referralCode && r.referralCode.toLowerCase().includes(search))
              );
            }

            if (channel && channel !== 'All') {
              regs = regs.filter((r) => r.channel === channel);
            }

            return sendJson(200, {
              success: true,
              total: regs.length,
              registrations: regs,
            });
          }

          // 6. POST /api/track-click or /api/referral/click
          if ((pathname === '/api/track-click' || pathname === '/api/referral/click') && req.method === 'POST') {
            const body = await parseBody();
            const code = body.code || body.referralCode;
            const result = trackReferralClick(code);
            return sendJson(200, { ...result, code });
          }

          // 7. GET /api/stats
          if (pathname === '/api/stats' && req.method === 'GET') {
            const stats = getLiveStats();
            return sendJson(200, { success: true, stats });
          }

          // 8. POST /api/reset-live (Safe reset for live test data)
          if (pathname === '/api/reset-live' && req.method === 'POST') {
            const body = await parseBody().catch(() => ({}));
            const db = readDb();
            if (body && body.mode === 'clear-registrations-only') {
              // Keep created ambassadors, but reset verified clicks & registrations to 0
              db.registrations = [];
              db.ambassadors = (db.ambassadors || []).map((a) => ({
                ...a,
                clicks: 0,
                registrations: 0,
              }));
              writeDb(db);
              return sendJson(200, {
                success: true,
                message: 'All test registrations cleared. Ambassadors preserved with 0 counts.',
              });
            }

            // Default: reset to clean 0-state (no misleading seeded figures in live mode)
            const cleanState = {
              ambassadors: [],
              registrations: [],
            };
            writeDb(cleanState);
            return sendJson(200, {
              success: true,
              message: 'Live campaign database reset to clean 0-state. No seeded figures.',
            });
          }

          // Fallthrough
          return next();
        } catch (err) {
          console.error('API Error in middleware:', err);
          return sendJson(400, {
            success: false,
            error: err.message || 'Server error',
            message: err.message || 'Server error',
          });
        }
      });
    },
  };
}
