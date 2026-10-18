# Campus Events Hub

A modern, responsive student event discovery platform MVP where students can discover events happening inside their own college (**My College**) as well as inter-college events happening at other colleges (**Inter-College**).

---

## Live Demo

**[Open Campus Events Hub](https://campus-events-hub.vercel.app/)**

Explore college events, discover inter-college competitions, filter by category, search for events, and save your favourites.


## Key Features

1. **Dual Core Navigation (Home Screen)**:
   - **My College**: Events happening inside the student's campus (*Apex Institute of Technology*).
   - **Inter-College**: Competitions, hackathons, and festivals at other colleges welcoming outside participation.
2. **Category Filtering**: 13 filter categories (*All, Arts, Drama, Singing, Dancing, Sports, Yoga, Hackathon, Technical, Cultural, Workshop, Competition, Other*).
3. **Live Search**: Instant search by event name, college, venue, or category.
4. **Interested / Saved Events**: Save favorite events with a single click, view saved events in a dedicated tab, and toggle off anytime.
5. **Event Details Modal**: View comprehensive event details, organizer info, dates, times, venues, and descriptions.
6. **Registration Deadline Urgency**: Prominently highlights deadlines, including approaching countdown badges (e.g., *"Registration closes in 2 days"*).
7. **Add Event Form**: Simple form to publish new events with client-side validation that immediately appear in the listings.
8. **Empty States**: Helpful guidance when searches or category filters have no matches.
9. **LocalStorage Persistence**: Events and saved interested IDs persist seamlessly across browser reloads.
10. **Responsive Design**: Designed with mobile-first principles, working across mobile, tablet, and desktop screens.

---

## Tech Stack

- **React 19** with **Vite**
- **JavaScript (ES6+ / JSX)**
- **CSS3** (CSS custom properties, CSS Grid, Flexbox, media queries)
- **Zero Heavy Dependencies** (Native SVG icons, standard web APIs)
- **Browser LocalStorage** (No backend, DB, or auth needed for this MVP)

---

## How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```
