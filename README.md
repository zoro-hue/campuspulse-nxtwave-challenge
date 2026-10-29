# CampusPulse — PostHog-Inspired Growth Engine for NxtWave Challenge

> **NxtWave Growth Challenge — Primary Working Growth Asset**  
> An interactive decision-support and campaign execution platform targeting **500 final-year engineering student registrations** for *"Build Your First AI Project in 60 Minutes"* with a **₹2,000 budget cap**.

---

## 🦔 1. What is CampusPulse?

CampusPulse is a PostHog-inspired campaign execution platform and growth engine combining:
1. **Ambassador Referral System:** Programmatic collision-free code generation (`generateUniqueCode`), tracking links (`?ref=CODE`), click counting, and attributed registration tracking.
2. **Student Registration Portal:** Live form with client & server validation, email normalization (`toLowerCase()`), and strict duplicate email prevention.
3. **WhatsApp Outreach Dispatcher:** Multi-audience (Batch groups, Club leads, Ambassadors, 1-on-1 classmates), multi-goal (Invitation, 48h reminder, 6h final call, Placement focus) generator with 1-click `wa.me` sharing.
4. **Live Mode vs Seeded Demo Mode:** Real-time persistence in local `database.json` toggleable with the baseline 205 seeded demo benchmark across Overview, Channels, and Next Actions.
5. **Deterministic Next-Action Engine:** Transparent pro-rata pacing checks (Day 3 milestone: 150 registrations) and strict enforcement of the ₹350 reserve unlocking policy.

---

## 🎨 2. PostHog Visual Recreation

CampusPulse closely recreates the distinctive visual personality of PostHog:
- **Grassy Painted Meadow Canvas:** Soft sage background (`#8DA871`) with illustrated natural grass blades and edge foliage clusters.
- **Top Navigation Bar:** Compact pale header (`#d4dfc4`) with geometric 3-bar brand mark, wordmark, search/help dialogs, and primary orange action button (`#f5a623`).
- **Left Navigation Rail:** Standardized vertical rail with rounded icon containers, cream active pill treatments, and retro 8-bit **DEMO** launcher.
- **Pale Rounded Application Panel:** Centered `#eaedda` rounded surface with subtle borders and shadow.
- **Standardized SVG Icon System:** Handcrafted 2px stroke icons matching the official PostHog reference sheet (Brand mark, Search, Target, Rupee pouch, Calendar, Channels, Pencil, Users group, Lightbulb, Docs).
- **Official Hedgehog Illustrations & PixiJS Mascot Mode:** Integrated `@posthog/brand` assets and live interactive walking hedgehogs powered by `@posthog/hedgehog-mode`.

---

## ⚡ 3. Live Growth Asset Architecture

```
CampusPulse/
├── data/
│   └── database.json          # Persistent local storage (ambassadors, registrations)
├── server/
│   ├── db.js                  # Deduplication, code generator, attribution, stats engine
│   └── apiMiddleware.js       # Vite middleware REST API endpoints (/api/*)
├── src/
│   ├── components/
│   │   ├── GrassBackground.jsx        # Grassy painted meadow background
│   │   ├── Icons.jsx                  # Standardized PostHog SVG icon system
│   │   ├── LeftNavRail.jsx            # Vertical navigation rail
│   │   ├── Navbar.jsx                 # Top navbar with search & rules modal
│   │   ├── WhatsAppOutreachModal.jsx  # Prefilled wa.me dispatcher
│   │   ├── CampaignPlanModal.jsx      # 7-day sprint execution roadmap
│   │   └── InteractiveHedgehogMode.jsx# Animated hedgehogs
│   ├── screens/
│   │   ├── OverviewScreen.jsx         # Live stats, remaining gap, quick triggers
│   │   ├── RegistrationsScreen.jsx    # Live student registration form & organizer ledger
│   │   ├── AmbassadorScreen.jsx       # Ambassador roster, referral links, leaderboard
│   │   ├── WhatsAppOutreachScreen.jsx # Ready-to-Share WhatsApp copy composer
│   │   ├── ChannelPlanningScreen.jsx  # Targets vs live stored sign-ups vs demo
│   │   ├── ReferralScenariosScreen.jsx# Dynamic 7-day referral modeling & assumptions
│   │   ├── NextActionsScreen.jsx      # Deterministic pacing gates & ₹350 reserve rule
│   │   └── AboutDocsScreen.jsx        # Architecture, compliance & verification docs
│   └── context/
│       └── CampaignContext.jsx        # Unified reactive state & API synchronizer
└── vite.config.js             # Vite config with campusPulseApiMiddleware()
```

---

## 🔗 4. API Endpoints (Built into Vite Server)

All endpoints run on the same dev server without needing separate backend terminals:

- `GET /api/stats` — Returns total registrations, remaining gap to 500, active ambassadors, and channel breakdown.
- `GET /api/ambassadors` — Returns the full roster of ambassadors, unique codes, clicks, and registrations.
- `POST /api/ambassadors` — Creates a new ambassador with a collision-free code (e.g. `RAHUL-AI`, `SNEHA-AI`).
- `POST /api/track-click` — Increments the visit count for a given referral code.
- `POST /api/register` — Registers a student, validates inputs, rejects duplicates by normalized email, and attributes the sign-up to the referring ambassador.
- `GET /api/registrations` — Lists all registered students with college and attribution channel.
- `POST /api/reset-live` — Resets local storage back to clean baseline data.

---

## 🚦 5. Next-Action Deterministic Rules & ₹350 Reserve Policy

- **Day 3 Pro-Rata Milestone:** Pacing threshold is set at **30% of target (150 registrations)**.
- **Pacing Gate:**
  - If total registrations < 150: System warns that the campaign is behind pace and prescribes targeted WhatsApp outreach to club representatives.
  - If total registrations >= 150: System marks the sprint as on-track.
- **₹350 Reserve Protection:**
  - The ₹350 reserve is strictly locked and cannot be released until Day 3 or Day 6 milestones are met.
  - If behind pace: *"Hold ₹350 reserve unspent. Do not unlock reserve until pacing reaches >= 150 registrations."*
  - If on pace: *"Eligible to unlock ₹350 reserve to amplify high-performing ambassadors."*

---

## 🚀 6. Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Launch Vite dev server with integrated API middleware
npm run dev

# 3. Open in browser
http://localhost:3000/
```

### Try Live Referral & Registration Flow
1. Open `http://localhost:3000/#ambassadors` (or click **Ambassador Network**).
2. Click **Add Ambassador** to create a new campus rep (e.g., *Sneha Reddy* from *NIT Warangal*).
3. Click **Copy Link** on their card.
4. Paste the link into a new browser tab (`http://localhost:3000/?ref=SNEHA-AI#register`).
5. Notice the **Referral Attribution Banner** automatically recognizes the code!
6. Fill in student details and click **Complete Free Registration**.
7. Check `http://localhost:3000/#overview` or `/api/stats`: The registration counter, ambassador leaderboard, and channel breakdown reflect the new sign-up immediately!
8. Try submitting the same email again: The system will block it with a duplicate email error.

---

## 🛡️ 7. Truthfulness & Disclosure

- **Local & Persistent:** Live student registrations and ambassador referral data are persisted locally in `data/database.json`.
- **No Mock AI API Calls:** All message drafting and next-action decisions use deterministic logic, proven copywriting frameworks, and pro-rata rules.
- **Explicit Labeling:** Benchmark seeded figures (205 demo sign-ups) are clearly distinguished from live stored registrations using the **Live Engine vs Demo Seeded** mode switcher.
