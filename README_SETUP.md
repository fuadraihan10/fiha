# Romantic Apology Website

A beautiful, mobile-first single-page romantic apology website built with Next.js, React, TypeScript, and Tailwind CSS.

## Setup Instructions

### 1. Install Dependencies

The dependencies have already been installed, but if you need to reinstall:

```bash
npm install
```

### 2. Add Your Photos

Place your 15 unique photographs in the `public/images/` directory with these exact filenames:

- `1000046961.jpg` - Sunny extreme close-up (back of flip card)
- `1000046962.jpg` - Sunny extreme close-up (front of flip card)
- `1000046963.jpg` - Elegant solo portrait with dark cinematic styling
- `1000046964.jpg` - Solo mirror selfie in white and red saree
- `1000046965.jpg` - Wide garden selfie with roses (HERO image)
- `1000046966.jpg` - Warm golden garden portrait
- `1000046967.jpg` - Wide close-up selfie with heads tilted together
- `1000046968.jpg` - Two-panel video-call collage
- `1000046969.jpg` - Couple in warm café
- `1000046970.jpg` - Casual mirror selfie
- `1000046971.jpg` - Couple in black in front of floral mural
- `1000046972.jpg` - Solo portrait in wine-red organza scarf
- `1000046973.jpg` - Vintage film-frame mirror selfie
- `1000046975.jpg` - Playful goofy selfie
- `1000046976.jpg` - Cheek kiss in garden (keep 4:54 PM timestamp visible)

### 3. Configure Environment Variables

Edit `.env.local` and update the video URL for the "NO" button:

```env
NEXT_PUBLIC_ROLL_VIDEO_URL=https://your-video-url.com/rickroll
```

If left as the example URL, clicking "NO" will show a fallback message.

### 4. Personalize Content

Edit the placeholders throughout the website by searching for these strings:

**Main Names:**
- `[HER NAME]` → Replace with "Fiha" (or her actual name)
- `[MY NAME]` → Replace with your name

**Opening & Hero:**
- `[MY_APOLOGY_OPENING]` → Your opening apology line

**Us Section:**
- `[OUR_MESSAGE]` → Personal paragraph about your relationship

**Memory Timeline:**
- `[MEMORY_01_DATE]` → First memory date
- `[MEMORY_01_CAPTION]` → First memory description
- (Repeat for 02, 03, 04)

**Silly Side:**
- `[FUNNY_CAPTION_01]` → Funny caption for goofy photo
- `[CALL_MEMORY]` → Caption for video call photo

**You Section:**
- `[COMPLIMENT_01]` → First compliment
- `[COMPLIMENT_02]` → Second compliment
- `[THING_I_LOVE_01]` through `[THING_I_LOVE_05]` → Five things you love about her

**Emotional Peak:**
- `[EMOTIONAL_MEMORY_CAPTION]` → Caption referencing the 4:54 PM timestamp

**Final Apology:**
- `[APOLOGY_PARAGRAPH_01]` → First apology paragraph
- `[APOLOGY_PARAGRAPH_02]` → Second apology paragraph
- `[APOLOGY_PARAGRAPH_03]` → Third apology paragraph
- `[FINAL_APOLOGY_LINE]` → Final heartfelt line

**Forgiveness Responses:**
- `[FORGIVEN_REPLY]` → Reply if she forgives
- `[MORE_TIME_REPLY]` → Reply if she needs more time

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
npm run build -- --webpack
npm start
```

## Visual Design

The website features:

- **Color Palette**: Maroon, Rose Red, Blush Pink, Cream, Sage Green, Warm Gold
- **Typography**: Playfair Display (headings), Inter/Poppins (body), Caveat (handwritten accents)
- **Animations**: Soft fades, gentle scaling, floating petals, typing effects
- **Responsive**: Optimized for mobile (360px+), tablets, and desktop
- **Accessibility**: WCAG compliant with reduced-motion support

## Features

✓ Beautiful opening question with romantic animations
✓ Cinematic vertical scrolling experience
✓ 7 sections: Opening Apology → Us → Our Days → Silly Side → You → Emotional Peak → Final Apology
✓ Film grain and vignette effects
✓ Floating rose petals and decorative elements
✓ Optional music toggle
✓ Responsive design for all devices
✓ Respects prefers-reduced-motion accessibility setting
✓ Graceful fallback for missing video URL

## Responsive Design

The website is optimized for:

- **Mobile**: 360px, 375px, 390px, 412px, 430px
- **Tablet**: 768px and above
- **Desktop**: Full-width with max-width constraints

All images maintain their aspect ratio without stretching or distortion.

## Accessibility

- Meaningful alt text for all images
- Semantic HTML and ARIA labels
- Keyboard navigation support
- High contrast text
- Reduced motion support via CSS media queries

## Project Structure

```
romantic-apology/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── OpeningQuestion.tsx
│   ├── MainExperience.tsx
│   ├── FilmGrain.tsx
│   ├── FloatingDecorations.tsx
│   ├── MusicToggle.tsx
│   └── sections/
│       ├── HeroApology.tsx
│       ├── UsSection.tsx
│       ├── OurDaysSection.tsx
│       ├── SillySideSection.tsx
│       ├── YouSection.tsx
│       ├── EmotionalPeak.tsx
│       ├── FinalApology.tsx
│       └── ForgivenessButtons.tsx
├── public/
│   └── images/
├── .env.local
└── tailwind.config.ts
```

## Tips

1. **Test on mobile first** - Open DevTools and test on various phone sizes
2. **Check image quality** - Ensure photos are high-quality and properly cropped
3. **Read the content aloud** - Make sure your apology feels sincere
4. **Test the NO button** - Ensure your video URL is correct before sharing
5. **Share responsibly** - Only share with the intended recipient

## Customization Beyond Placeholders

- Edit colors in `app/globals.css` CSS variables
- Modify animations in the `@keyframes` sections
- Adjust spacing and sizing in individual components
- Change fonts in `tailwind.config.ts`

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

---

Made with 💙 for your apology
