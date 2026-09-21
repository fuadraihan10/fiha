# Quick Start Guide

## 1. Add Your Photos

Copy your 15 photos into `public/images/`:

```
1000046961.jpg
1000046962.jpg
1000046963.jpg
1000046964.jpg
1000046965.jpg (HERO - garden with roses)
1000046966.jpg
1000046967.jpg
1000046968.jpg (video call - remove black bar)
1000046969.jpg
1000046970.jpg
1000046971.jpg
1000046972.jpg
1000046973.jpg
1000046975.jpg
1000046976.jpg (garden kiss - keep timestamp)
```

## 2. Update Content

Search and replace these in the codebase:

- `Fiha` → her actual name (already in place)
- `[MY_APOLOGY_OPENING]` → your opening line
- `[OUR_MESSAGE]` → personal paragraph
- `[MEMORY_0X_DATE]` and `[MEMORY_0X_CAPTION]` → memory details
- `[COMPLIMENT_01]`, `[COMPLIMENT_02]` → compliments
- `[THING_I_LOVE_0X]` → 5 things you love
- `[APOLOGY_PARAGRAPH_0X]` → your apology
- `[FORGIVEN_REPLY]` → if she forgives
- `[MORE_TIME_REPLY]` → if she needs time

## 3. Set Video URL

Edit `.env.local`:
```
NEXT_PUBLIC_ROLL_VIDEO_URL=https://your-rickroll-url
```

## 4. Run Locally

```bash
npm run dev
```

Visit http://localhost:3000

## 5. Deploy

Build: `npm run build -- --webpack`

Deploy to Vercel:
```bash
npm install -g vercel
vercel
```

Or use any hosting platform that supports Next.js.

## File Structure

All component files are in `components/` with section-specific components in `components/sections/`. The main entry point is `app/page.tsx`.
