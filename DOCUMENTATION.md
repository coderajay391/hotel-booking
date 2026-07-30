The Night Hotel & Resort — Technical Documentation
📋 Overview
The Night Hotel & Resort is a fully responsive, single-page luxury hotel booking website built with vanilla HTML, CSS, and JavaScript (ES6+). The application simulates a complete hotel booking experience with a modern, elegant UI featuring dark/light theme support, real-time price calculations, local storage persistence, and interactive UI components.

This documentation provides a comprehensive technical reference for developers, covering architecture, component details, data flow, theming system, and extension guidelines.

🏗️ Architecture
Application Structure
hotel-booking/
├── index.html              # Main HTML document — single-page layout with all sections
├── style.css               # Complete stylesheet — theming, layout, components, responsive
├── script.js               # Application logic — data, state, DOM manipulation, events
├── DOCUMENTATION.md        # This file — technical documentation
├── README.md               # Project overview and user guide
└── assets/                 # Local assets directory (currently empty)
Design Pattern
The application follows a procedural event-driven architecture without any frameworks or libraries:

Global State: Room data and user bookings are stored in module-level variables (ROOMS_DATA, userBookings).
Local Storage: Booking state is persisted via localStorage under the key "aura_bookings".
DOM Rendering: All dynamic content (room cards, booking lists, modals) is rendered imperatively via JavaScript DOM methods.
Event Delegation: Event listeners are attached during initialization for modals, filters, forms, and interactive elements.
🗂️ Files & Modules
1. index.html — Document Structure
The HTML file serves as the single-page container with the following sections:

Section ID / Class	Purpose
#loader	Loading screen with branded spinner animation
#toast-container	Fixed-position container for toast notifications
.navbar / #navbar	Fixed navigation bar with logo, links, theme toggle, CTA
#home / .hero	Full-screen hero with background image, tagline, quick search form
.stats-section	Animated statistics counters (rooms, satisfaction, awards, chefs)
.about-section / #about	Hotel introduction with image and highlights
#rooms / .rooms-section	Filterable room cards with category and price filters
#services / .services-section	Service cards grid (WiFi, pool, spa, dining, gym, etc.)
#gallery / .gallery-section	Clickable photo gallery with lightbox modal
.testimonials-section	Guest testimonial card
#bookings / .bookings-section	Booking management with search and list
.faq-section	Accordion-style FAQ
#contact / .contact-section	Contact information and message form
.footer	Footer with brand, newsletter subscription, social links
#scroll-top	Fixed scroll-to-top button
#lightbox	Full-screen image lightbox modal
#booking-modal	Booking form modal with room summary and price calculation
#receipt-modal	Confirmation receipt modal with print capability
External Dependencies (CDN):

Font Awesome 6.4.0 — Icon library for UI elements
Google Fonts — Cinzel (serif headings) + Montserrat (sans-serif body)
2. style.css — Styling System
CSS Custom Properties (Theming)
The entire visual system is driven by CSS custom properties defined in :root and toggled via [data-theme="light"]:

Variable	Dark Theme	Light Theme	Usage
--bg-primary	#0b1325 (deep navy)	#f4f6f9 (light gray)	Page background
--bg-secondary	#111c35 (dark blue)	#ffffff (white)	Section/card backgrounds
--bg-card	#172442 (card blue)	#ffffff (white)	Card backgrounds
--accent-gold	#c5a059 (warm gold)	#b38738 (dark gold)	Primary accent, CTAs
--accent-gold-hover	#e0b86c (light gold)	#966f28 (dark gold)	Button hover states
--text-main	#f0f4f8 (off-white)	#1a202c (near-black)	Primary text color
--text-muted	#a0aec0 (gray)	#64748b (gray)	Secondary/muted text
--border-color	Gold-tinted transparent	Gold-tinted transparent	Borders, dividers
--shadow	Strong dark shadow	Soft light shadow	Card/elevation shadows
--glass-bg	Semi-transparent dark	Semi-transparent white	Glassmorphism backgrounds
--glass-border	White-tinted transparent	Black-tinted transparent	Glassmorphism borders
--transition	Cubic-bezier 0.3s	Same	Global transition timing
Key CSS Components
Glassmorphism: Achieved via backdrop-filter: blur(12px) combined with translucent --glass-bg backgrounds. Applied to .navbar.scrolled, .search-form, .modal-content.glass.
Grid Systems: .grid-2 (2-column grid), .room-grid (auto-fill responsive grid), .services-grid, .gallery-grid.
Animation: @keyframes spin (loader spinner), @keyframes slideIn (toast notifications), hover transforms on cards.
Responsive Breakpoint: @media (max-width: 768px) — collapses nav to hamburger menu, stacks grid layouts to single column.
Responsive Design Strategy
Navigation: Desktop flex layout → mobile slide-in menu (right: -100% to right: 0 via .nav-links.active).
Grids: All auto-fill grids (repeat(auto-fill, minmax(...))) naturally adapt. The .grid-2 wrapper collapses to 1-column.
Search Form: 5-column desktop grid → single-column mobile.
Modal Form: 2-column grid → single-column mobile.
3. script.js — Application Logic
Data Layer
const ROOMS_DATA = [
  {
    id: "room-1",
    name: "Oceanfront Deluxe Room",
    type: "Deluxe",
    description: "...",
    price: 899,
    maxGuests: 2,
    rating: 4.8,
    amenities: ["WiFi", "Balcony", "Ocean View", "King Bed"],
    image: "https://images.unsplash.com/...",
  },
  // ... 3 more rooms (Executive, Presidential, Penthouse)
];

let userBookings = JSON.parse(localStorage.getItem("aura_bookings")) || [];
Room Data Fields:

Field	Type	Description
id	string	Unique identifier (e.g., "room-1")
name	string	Display name
type	string	Category: Deluxe / Executive / Presidential / Penthouse
description	string	Short description
price	number	Price per night in USD
maxGuests	number	Maximum occupancy
rating	number	Star rating (1.0 – 5.0)
amenities	string[]	List of amenity labels
image	string	Unsplash image URL
State Management
Variable	Type	Description	Persistence
ROOMS_DATA	array	Static room data (immutable)	None (hardcoded)
userBookings	array	Dynamic booking records	localStorage
selectedRoomForBooking	object	Currently selected room for booking modal	None (runtime)
Booking Object Structure:

javascript
{
  bookingId: "AG-784512",        // Auto-generated: "AG-" + 6 random digits
  roomName: "Oceanfront Deluxe Room",
  guestName: "John Doe",
  guestEmail: "john@example.com",
  guestPhone: "+1234567890",
  guestsCount: "2",
  checkin: "2026-05-15",         // ISO date string
  checkout: "2026-05-18",        // ISO date string
  nights: 3,                     // Calculated from dates
  totalPrice: 2697,              // nights × room.price
  requests: "Late check-in, high floor please"
}
Key Functions
Function	Description	Dependencies
initApp()	Application entry point — initializes all subsystems	DOMContentLoaded event
hideLoader()	Fades out loading screen after 400ms delay	DOM, setTimeout
setupDateConstraints()	Sets min attribute on date inputs, links checkin → checkout	DOM
renderRooms(rooms)	Renders room cards to #room-grid	DOM, ROOMS_DATA
openBookingModal(roomId)	Opens booking modal with room details and pre-filled dates	DOM, selectedRoomForBooking
calculateModalPrice()	Computes total price from dates × rate	DOM, selectedRoomForBooking
saveBooking(booking)	Persists booking to local storage and re-renders list	localStorage, userBookings
deleteBooking(id)	Removes booking by ID, updates storage and UI	localStorage, userBookings
renderBookings(filterText)	Renders filtered booking list to #user-bookings-list	DOM, userBookings
showReceiptModal(booking)	Displays confirmation receipt modal	DOM
setupEventListeners()	Attaches all DOM event listeners (scroll, clicks, forms, etc.)	DOM
filterRooms(overrideType)	Filters rooms by type + max price and re-renders	DOM, ROOMS_DATA
animateCounters()	Animates statistics counters from 0 to target values	DOM
showToast(message)	Creates and auto-removes a toast notification	DOM, setTimeout
Event Flow
1. DOMContentLoaded → initApp()
   ↓
2. hideLoader() → fade out #loader
3. setupDateConstraints() → min dates, checkin→checkout linkage
4. renderRooms(ROOMS_DATA) → display all room cards
5. renderBookings() → display saved bookings from localStorage
6. setupEventListeners() → attach all event handlers
7. animateCounters() → start number animations
Booking Flow:

User clicks "Book Now" on room card
  → openBookingModal(roomId)
    → populate modal-room-summary with room details
    → pre-fill dates from hero search if available
    → calculate price
  → User fills form + clicks "Proceed to Payment"
    → saveBooking(booking)
      → push to userBookings[]
      → localStorage.setItem("aura_bookings", ...)
      → renderBookings() refresh list
    → hide booking modal
    → showReceiptModal(booking)
      → display booking details
      → User can "Print Receipt" or "Done"
🧩 Component Details
1. Navigation Bar (.navbar)
Sticky Behavior: Fixed positioning; .scrolled class applied when scrollY > 50px, adding glassmorphism background and reducing padding.
Theme Toggle: Toggles data-theme="light" on <body> and switches moon/sun icons.
Mobile Menu: .hamburger button toggles .active class on .nav-links, sliding menu in from right.
Active Link Highlight: JS can highlight current section; CSS provides :hover and .active gold color.
2. Hero Quick Search (#search-form)
Fields: Check-in date, check-out date, guest count (select), room type (select).
Behavior: On submit, prevents default, calls filterRooms(type) with selected type, scrolls to #rooms.
Date Constraints: Check-in minimum = today; check-out minimum = check-in date.
3. Room Cards Grid (#room-grid)
Rendering: Dynamic cards from ROOMS_DATA array.
Card Structure: Image wrapper (with type badge) → details (name, description, amenities) → footer (price + Book Now button).
Book Now Button: Custom data-id attribute; click triggers openBookingModal().
4. Filters (#rooms)
Category Filter: Buttons with data-filter values: all, Deluxe, Executive, Presidential, Penthouse. Active button gets .active class.
Price Range: Input type="range" with live value display (#price-val). Filters rooms where room.price <= maxPrice.
Filter Logic: filterRooms() reads active filter button + price slider to compute filtered subset, then calls renderRooms().
5. Booking Modal (#booking-modal)
Trigger: openBookingModal(roomId) — finds room by ID, pre-fills date inputs from hero search if set.
Room Summary: Left panel shows room image, name, description, max guests, rate.
Form Fields: Name, email, phone, guest count (1–6), check-in, check-out, special requests.
Price Calculator: calculateModalPrice() — computes nights = (checkout - checkin) / msPerDay, then total = nights × room.price. Updates #calc-nights, #calc-rate, #calc-total.
Validation: Ensures both dates present, checkout > checkin.
Submission: Creates booking object → saveBooking() → close modal → showReceiptModal().
6. Receipt Modal (#receipt-modal)
Content: Success icon, "Booking Confirmed!" heading, booking details (ID, guest, room, dates, total).
Actions: "Print Receipt" (calls window.print()), "Done" (closes modal).
7. Bookings Management (#bookings)
Search: Text input + search button filters bookings by bookingId or guestName (case-insensitive includes).
Booking Cards: Each card shows ID, room name, guest info, dates, total. Cancel button calls deleteBooking().
Empty State: "No active reservations found." message when no bookings match.
8. Photo Gallery (#gallery)
Gallery Items: Each .gallery-item has data-src attribute with full-resolution image URL.
Lightbox: Click opens #lightbox modal with full image. Close via × button or overlay click.
9. FAQ Accordion (.faq-section)
Behavior: Clicking .faq-question toggles .active class on parent .faq-item, which controls max-height and padding of .faq-answer via CSS transitions.
10. Statistics Counters (.stats-section)
Animation: animateCounters() targets all .counter elements. Each counter has data-target (final number). Counts up incrementally using setTimeout loops with a speed factor of target / 50.
11. Toast Notifications
Container: #toast-container positioned fixed at bottom-right.
Behavior: showToast(message) creates a .toast div with slide-in animation. Auto-removed after 3500ms.
🎨 Theming System Details
Toggle Mechanism
document.getElementById("theme-toggle").addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-theme");
  const icon = document.querySelector("#theme-toggle i");
  if (currentTheme === "light") {
    document.body.removeAttribute("data-theme"); // Revert to dark
    icon.className = "fas fa-moon";
  } else {
    document.body.setAttribute("data-theme", "light");
    icon.className = "fas fa-sun";
  }
});
CSS Variable Cascade
:root — Dark theme defaults (always applied).
[data-theme="light"] — Overrides specific variables for light theme.
var(--variable) — Used throughout stylesheet for consistent theming.
All colors, backgrounds, borders, shadows, and glass effects automatically adapt on theme switch without additional JavaScript.

🔄 State Persistence
Local Storage Schema
Key	Type	Content
aura_bookings	string	JSON-serialized array of booking objects
Data Lifecycle
Page Load → JSON.parse(localStorage.getItem("aura_bookings")) || []
  ↓
User Books → push(booking) → JSON.stringify() → setItem()
  ↓
User Cancels → filter() → JSON.stringify() → setItem()
  ↓
Page Reload → read from localStorage → render
🌐 External Dependencies
Resource	Version	Integration	Purpose
Font Awesome	6.4.0	CDN stylesheet + JS	UI icons throughout the application
Google Fonts (Cinzel)	-	CDN stylesheet	Serif font for headings, logo
Google Fonts (Montserrat)	-	CDN stylesheet	Sans-serif font for body text
Unsplash	-	Remote image URLs	Background and room images
🔮 Extension Guide
Adding a New Room
Add a new object to the ROOMS_DATA array in script.js:
javascript
{
  id: "room-5",
  name: "Your New Room Name",
  type: "Deluxe", // or Executive, Presidential, Penthouse
  description: "Room description here",
  price: 599,
  maxGuests: 2,
  rating: 4.7,
  amenities: ["WiFi", "TV", "Air Conditioning"],
  image: "https://images.unsplash.com/your-image-id?auto=format&fit=crop&w=600&q=80"
}
If adding a new type category, add a corresponding filter button in index.html:
html
<button class="filter-btn" data-filter="NewType">New Type</button>
Adding a New Service
Add a new .service-card inside the .services-grid in index.html:

html
<div class="service-card">
  <i class="fas fa-icon-name"></i>
  <h3>Service Name</h3>
  <p>Service description.</p>
</div>
Adding a New FAQ Item
Add inside .faq-accordion in index.html:

html
<div class="faq-item">
  <button class="faq-question">
    Your question?
    <i class="fas fa-chevron-down"></i>
  </button>
  <div class="faq-answer">
    <p>Your answer here.</p>
  </div>
</div>
Theme Color Customization
Edit the CSS variables in :root (dark) and [data-theme="light"] blocks in style.css:

:root {
  --bg-primary: #your-color;
  --accent-gold: #your-accent;
  /* ... */
}
Integrating a Backend
To replace localStorage with a real backend:

Create an API service module (e.g., api.js):
javascript
export const fetchBookings = async (userId) => { /* GET /api/bookings */ };
export const createBooking = async (booking) => { /* POST /api/bookings */ };
export const deleteBooking = async (id) => { /* DELETE /api/bookings/:id */ };
Replace localStorage calls in script.js with async API calls.
Add user authentication (JWT/sessions) for personalized booking management.
Add a server-side route layer (Node.js/Express, Python/Flask, etc.).
📱 Browser Compatibility
Browser	Support
Chrome 90+	✅ Full support
Firefox 88+	✅ Full support
Safari 14+	✅ Full support (prefixed -webkit-backdrop-filter)
Edge 90+	✅ Full support
IE 11	❌ Not supported (no CSS custom properties)
Polyfills required for IE11: CSS custom properties (ponyfill), backdrop-filter, Array.from, forEach, Object.assign.

⚙️ Performance Considerations
No build tools: Zero configuration needed — open index.html directly in browser.
CDN images: All images loaded from Unsplash CDN — ensure reliable internet connection.
CSS variables: Minimal repaints during theme toggle (only CSS custom properties change).
DOM manipulation: Imperative rendering is efficient for this scale (< 50 nodes dynamically created).
localStorage: Synchronous API — adequate for small booking datasets (< 100 entries).
Event listeners: Attached during initialization only — no dynamic re-attachment.
🧪 Testing Notes
Booking Flow: Book a room → verify receipt modal → check "My Bookings" for persistence → refresh page → verify bookings persist → cancel booking → verify removal.
Filters: Click each category filter → verify correct rooms display → adjust price slider → verify range filtering.
Theme Toggle: Switch theme → verify all sections update → switch back.
Responsive: Resize browser to < 768px → verify hamburger menu, stacked grids, single-column modals.
Date Validation: Try past dates → try checkout before checkin → verify error handling.
Gallery: Click images → verify lightbox opens/closes correctly.
FAQ: Click questions → verify accordion expand/collapse.
Search Bookings: Type booking ID or guest name → verify filtering.
📄 License
This project is for demonstration and educational purposes. See the README.md file for full license information.
