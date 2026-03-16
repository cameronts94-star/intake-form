# AI Enablement Discovery — Intake Form

A polished multi-step client onboarding questionnaire for an AI enablement company. Built with Next.js 14 App Router, Tailwind CSS, and Resend for email delivery.

---

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** for utility styling
- **Resend** for transactional email
- **Vercel** for deployment (free tier compatible)

---

## Setup

### 1. Install dependencies

```bash
cd clients/intake-form
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
RESEND_API_KEY=re_your_actual_key_here
NOTIFICATION_EMAIL=you@yourdomain.com
```

**Getting a Resend API key:**
1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys → Create API Key
3. Paste it into `RESEND_API_KEY`

> **Note on From Address:** The default from address is `onboarding@resend.dev`, which works on Resend's free tier without domain verification. To use your own domain (e.g. `intake@yourdomain.com`), add and verify your domain in the Resend dashboard, then update the `from` field in `app/api/submit/route.js`.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the form will be live.

---

## Deployment to Vercel

### Option A: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts, then add environment variables:

```bash
vercel env add RESEND_API_KEY
vercel env add NOTIFICATION_EMAIL
```

### Option B: Vercel Dashboard

1. Push this project to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. In **Environment Variables**, add:
   - `RESEND_API_KEY` → your Resend API key
   - `NOTIFICATION_EMAIL` → email where submissions should be sent
4. Click **Deploy**

---

## Project Structure

```
intake-form/
├── app/
│   ├── api/
│   │   └── submit/
│   │       └── route.js        # Resend email API route
│   ├── components/
│   │   └── IntakeForm.jsx      # Multi-step form (7 steps)
│   ├── globals.css             # Global styles + DM Sans font
│   ├── layout.js               # Root layout with metadata
│   └── page.js                 # Home page (renders IntakeForm)
├── .env.example                # Environment variable template
├── .env.local                  # Your local env vars (gitignored)
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Form Steps

| # | Step | Fields |
|---|------|--------|
| 1 | Contact Information | Name, Company, Email, Phone |
| 2 | Company Profile | Industry, Revenue, Team Size, Years, Description |
| 3 | Current Operations | Time-consuming processes, Admin hours, Bottlenecks |
| 4 | Technology & Tools | Tools used, Data storage, API access |
| 5 | Pain Points | Checkboxes, Most costly process |
| 6 | Goals & Readiness | Vision, Timeline, Budget, Experience, Readiness |
| 7 | Review & Submit | Full summary + submit button |

---

## Customization

- **Colors**: Edit the `COLORS` object at the top of `IntakeForm.jsx`
- **Steps/Fields**: Add or remove fields in the relevant Step component
- **Email template**: Edit `buildEmailHtml()` in `app/api/submit/route.js`
- **From address**: Change the `from` field in `route.js` (requires verified domain)
- **Branding**: Update the header logo/text in `IntakeForm.jsx`

---

## Notes

- The form uses React state only — no external form library needed
- Tailwind is configured but most styling uses inline styles for portability
- The confirmation screen appears after a successful API response
- Error messages surface to the UI if the submission fails
