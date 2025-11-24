# Design Guidelines: Legal Refund Quiz Landing Page

## User-Provided Specifications (Must Be Followed Exactly)

### Color Scheme
- **Primary**: #0A2540 (deep sapphire)
- **Accent**: #00D4FF (bright cyan)
- **Secondary**: #6E56CF (purple)
- **Background**: #F7FAFC
- **Success/Green**: #10B981

### Typography
- **Headings**: Inter Bold (700-800), 32-48px
- **Subheadings**: Inter SemiBold (600), 20-24px
- **Body Text**: Inter Regular (400), 16-18px
- **Buttons**: Manrope Bold (700), 16px, uppercase with letter-spacing 0.5px

### Visual Style
- **Glassmorphism** effects on cards: backdrop-filter: blur(10px)
- **Shadows**: box-shadow: 0 10px 40px rgba(10, 37, 64, 0.1)
- **Border Radius**: 16-24px
- **Button Gradients**: linear-gradient(135deg, #00D4FF 0%, #6E56CF 100%)
- **Hover Effects**: scale(1.02) with enhanced shadow
- **Transitions**: 0.3s ease on all interactive elements

### Design References
- Stripe.com (clean typography)
- Revolut (bold accents, animations)
- Apple (minimalism, premium feel)

### Mood
Premium fintech service that builds trust through modern, clean design and professional visual hierarchy. Balance between legal seriousness and service accessibility.

## Page Structure

### Main Hero Section
- Headline with brand promise about money recovery
- 3 rotating case studies (FINIKO example provided) with automatic cycling
- Trust indicators: "$68M returned", "250+ cases", "92% success"
- Primary CTA button leading to quiz
- Real-time counter: "17 people applied in last 24 hours"
- Sub-text: "Free evaluation in 24 hours | Pay only for results"

### Exit-Intent Popup
Triggered when user attempts to leave without starting quiz:
- Emotional headline questioning if they want to give up
- Statistics showcase
- Direct CTA to quiz

### 6-Step Quiz Flow
Each step includes:
- Progress indicator: "Step X of 6 | ~X minutes remaining"
- Clear question with icon-labeled options
- Helpful tip below options
- "Continue" button with remaining questions counter
- Footer with trust badges: "$68M returned | ⭐ 4.9/5 | 187 reviews"

Quiz questions (in order):
1. Type of fraud company (Investment/Betting/Casino/Forex/Crypto)
2. When fraud occurred (timeframe options)
3. Current status of money (Frozen/Zeroed/No contact/No access)
4. Amount lost (ranges from <$5K to >$500K)
5. Payment method used (Card/Wire/ACH/Crypto/Apps/Check/Cash)
6. Available documentation (Originals/Digital/Messages only/None)

### Final Lead Capture Form
- Success message header
- Name, Phone, Email fields
- Two checkboxes: Data processing consent & 18+ age confirmation
- Gradient CTA button
- Security reassurance text
- Social proof: Today's applicants count + average recovery amount

## Images
Use provided screenshots for:
- Main landing screen hero background
- Each of the 6 quiz step backgrounds/visual elements
- Images should have glassmorphism overlay effects to maintain readability of white/light text
- Hero section uses large background image with blurred button backgrounds for CTAs

## Layout System
- Tailwind spacing: predominantly p-4, p-6, p-8, m-4, m-6 for consistency
- Container max-width: max-w-4xl for quiz steps
- Full-width hero with centered content

## Interactive Elements
- Smooth 0.3s transitions on all buttons and cards
- Hover scale effect (1.02) with shadow enhancement
- Quiz option cards with hover states
- Progress bar animation as user advances through quiz
- Real-time counter with periodic update animation

## Technical Requirements
- Save leads to leads_log.txt locally
- POST to webhook: https://hook.eu2.make.com/mjdxoefdh8c4itgjpirwchafiyhaqixk
- Webhook payload includes: email, full_name, phone, quiz answers in description field, plus static fields (landing, country: "US", user_id: 3, source: "Google")