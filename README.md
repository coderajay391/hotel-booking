# 🌙 The Night Hotel & Resort

A fully responsive, interactive luxury hotel booking website built with vanilla HTML, CSS, and JavaScript. This single-page application features a rich UI with dark/light mode, room filtering, a complete booking flow with local storage persistence, and an elegant visual design inspired by high-end hospitality.

![Preview](https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80)

## Preview 
<image src="./assets/hotel-bookin1.png"></image>
<image src="./assets/hotel-bookin2.png"></image>
<image src="./assets/hotel-bookin3.png"></image>
<image src="./assets/hotel-bookin4.png"></image>
<image src="./assets/hotel-bookin5.png"></image>
<image src="./assets/hotel-bookin6.png"></image>
<image src="./assets/hotel-bookin7.png"></image>
<image src="./assets/hotel-bookin8.png"></image>
---

## ✨ Features

- **Luxury Hero Section** – Full-screen background with an animated quick-search widget for dates, guests, and room type.
- **Responsive Room Gallery** – Filterable room cards with category buttons and a price range slider.
- **Complete Booking Flow** – Modal-based booking form with real-time price calculation (nights × rate).
- **Local Storage Persistence** – All bookings saved in `localStorage` and rendered in "My Bookings" section.
- **Booking Management** – Search bookings by ID or guest name; cancel bookings with a single click.
- **Print-Friendly Receipt** – After booking, a receipt modal with a "Print Receipt" button.
- **Photo Gallery with Lightbox** – Clickable gallery images open in a full-screen lightbox.
- **FAQ Accordion** – Expandable FAQ section for common guest questions.
- **Dark/Light Theme Toggle** – Switch between a dark sophisticated theme and a clean light theme.
- **Animated Counters** – Statistics section (rooms, satisfaction, awards, chefs) with animated number counters.
- **Mobile-First Responsive Design** – Hamburger menu, adaptive grids, and touch-friendly controls.
- **Toast Notifications** – Non-intrusive toast messages for user actions.
- **Loading Screen** – A branded spinner that fades out on page load.

---

## 🛠️ Tech Stack

| Technology                             | Purpose                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------- |
| **HTML5**                              | Semantic page structure & accessibility                                       |
| **CSS3**                               | Custom properties, glassmorphism, flexbox/grid, animations, responsive design |
| **JavaScript (Vanilla ES6+)**          | DOM manipulation, event handling, local storage, dynamic rendering            |
| **Font Awesome 6**                     | Icon library for UI elements                                                  |
| **Google Fonts (Cinzel + Montserrat)** | Typography – serif for headings, sans-serif for body                          |

No frameworks, no build tools, no external dependencies beyond icon/font CDNs.

---

## 🚀 Getting Started

1. **Clone or download** this repository.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).
3. No build step required – everything runs directly in the browser.

```bash
git clone https://github.com/your-username/the-night-hotel.git
cd the-night-hotel
open index.html
```

---

## 📁 Project Structure

```
hotel-booking/
├── index.html          # Main HTML document with all sections
├── style.css           # Full stylesheet (theming, layout, components, responsive)
├── script.js           # Application logic (data, state, rendering, events)
├── DOCUMENTATION.md    # Technical documentation for developers
├── README.md           # You are here
└── assets/             # Directory for local assets (currently empty)
```

---

## 🏠 Room Data

Four featured room types are available in the demo data:

| Room                     | Type         | Price/Night | Max Guests |
| ------------------------ | ------------ | ----------- | ---------- |
| Oceanfront Deluxe Room   | Deluxe       | ₹899        | 2          |
| Executive Skyline Suite  | Executive    | ₹799        | 3          |
| Royal Presidential Suite | Presidential | ₹1,099      | 4          |
| Grand Horizon Penthouse  | Penthouse    | ₹1,199      | 5          |

Rooms can be filtered by **type** (All / Deluxe / Executive / Presidential / Penthouse) and by **maximum price** via the range slider.

---

## 🧭 How to Use

### 1. Quick Search (Hero)

- Set your check-in / check-out dates, guest count, and preferred room type.
- Click **Search** to scroll to the rooms section with pre-applied filters.

### 2. Browse & Filter Rooms

- Use the **category filter buttons** to show only specific room types.
- Drag the **price slider** to hide rooms above your budget.

### 3. Book a Room

- Click **Book Now** on any room card to open the booking modal.
- Fill in your details, adjust dates, and see the total price calculated in real time.
- Click **Proceed to Payment** to confirm (simulated – no real payment).

### 4. Manage Bookings

- Navigate to the **My Bookings** section.
- Search your bookings by booking ID or guest name.
- Click **Cancel** to remove a booking.

### 5. Toggle Theme

- Click the **moon/sun icon** in the top-right navigation to switch between dark and light mode.

---

## 🎨 Theming

The design uses **CSS custom properties** for a dual-theme system:

| Variable        | Dark Theme            | Light Theme             |
| --------------- | --------------------- | ----------------------- |
| `--bg-primary`  | `#0b1325` (deep navy) | `#f4f6f9` (light gray)  |
| `--accent-gold` | `#c5a059` (warm gold) | `#b38738` (darker gold) |
| `--text-main`   | `#f0f4f8` (off-white) | `#1a202c` (near-black)  |

The light theme is activated by adding `data-theme="light"` to the `<body>` tag.

---

## 🔮 Future Enhancements

- [ ] Backend integration with Node.js/Express for real booking persistence.
- [ ] User authentication (login/signup) for personalized booking history.
- [ ] Payment gateway integration (Stripe/PayPal simulation).
- [ ] Room availability calendar with real-time date blocking.
- [ ] Multi-language support (i18n).
- [ ] Admin dashboard for managing rooms and reservations.
- [ ] Image lazy loading and advanced gallery features.

---

## 📄 License

This project is for demonstration and educational purposes. Feel free to use, modify, and adapt it for your own projects.

---
