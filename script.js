// --- Initial Room Data ---
const ROOMS_DATA = [
  {
    id: "room-1",
    name: "Oceanfront Deluxe Room",
    type: "Deluxe",
    description:
      "Enjoy views of the ocean with a private balcony and luxury king bed.",
    price: 250,
    maxGuests: 2,
    rating: 4.8,
    amenities: ["WiFi", "Balcony", "Ocean View", "King Bed"],
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "room-2",
    name: "Executive Skyline Suite",
    type: "Executive",
    description:
      "Spacious layout with a dedicated workspace and panoramic city skyline view.",
    price: 420,
    maxGuests: 3,
    rating: 4.9,
    amenities: ["WiFi", "Workstation", "Lounge Access", "Minibar"],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "room-3",
    name: "Royal Presidential Suite",
    type: "Presidential",
    description:
      "The peak of luxury featuring a dining area, private hot tub, and butler service.",
    price: 750,
    maxGuests: 4,
    rating: 5.0,
    amenities: [
      "Hot Tub",
      "Butler Service",
      "Free Airport Transfer",
      "Kitchenette",
    ],
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "room-4",
    name: "Grand Horizon Penthouse",
    type: "Penthouse",
    description:
      "Top-floor penthouse suite with full private terrace and outdoor plunge pool.",
    price: 980,
    maxGuests: 5,
    rating: 5.0,
    amenities: ["Private Pool", "360 View", "Helipad Access", "Terrace"],
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
  },
];

// --- App State ---
let userBookings = JSON.parse(localStorage.getItem("aura_bookings")) || [];
let selectedRoomForBooking = null;

// --- DOM Elements ---
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

const initApp = () => {
  hideLoader();
  setupDateConstraints();
  renderRooms(ROOMS_DATA);
  renderBookings();
  setupEventListeners();
  animateCounters();
};

// --- Hide Loader ---
const hideLoader = () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => (loader.style.display = "none"), 500);
  }, 400);
};

// --- Dynamic Date Setup ---
const setupDateConstraints = () => {
  const today = new Date().toISOString().split("T")[0];
  const checkinInputs = [
    document.getElementById("search-checkin"),
    document.getElementById("modal-checkin"),
  ];
  const checkoutInputs = [
    document.getElementById("search-checkout"),
    document.getElementById("modal-checkout"),
  ];

  checkinInputs.forEach((input) => {
    if (input) {
      input.min = today;
      input.addEventListener("change", (e) => {
        const checkinVal = e.target.value;
        checkoutInputs.forEach((outInput) => {
          outInput.min = checkinVal;
          if (outInput.value && outInput.value <= checkinVal) {
            outInput.value = "";
          }
        });
      });
    }
  });
};

// --- Toast Notifications ---
const showToast = (message) => {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3500);
};

// --- Render Rooms ---
const renderRooms = (rooms) => {
  const container = document.getElementById("room-grid");
  container.innerHTML = "";

  if (rooms.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">No rooms found matching your criteria.</p>`;
    return;
  }

  rooms.forEach((room) => {
    const card = document.createElement("div");
    card.className = "room-card";
    card.innerHTML = `
      <div class="room-img-wrapper">
        <img src="${room.image}" alt="${room.name}" />
        <span class="room-badge">${room.type}</span>
      </div>
      <div class="room-details">
        <h3>${room.name}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted);">${room.description}</p>
        <div class="room-amenities">
          ${room.amenities.map((a) => `<span><i class="fas fa-check"></i> ${a}</span>`).join("")}
        </div>
        <div class="room-footer">
          <div class="room-price">$${room.price} <span>/ night</span></div>
          <button class="btn btn-gold btn-book-now" data-id="${room.id}">Book Now</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Attach event listeners to book buttons
  document.querySelectorAll(".btn-book-now").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const roomId = e.target.getAttribute("data-id");
      openBookingModal(roomId);
    });
  });
};

// --- Modal Handling ---
const openBookingModal = (roomId) => {
  selectedRoomForBooking = ROOMS_DATA.find((r) => r.id === roomId);
  if (!selectedRoomForBooking) return;

  const summary = document.getElementById("modal-room-summary");
  summary.innerHTML = `
    <img src="${selectedRoomForBooking.image}" alt="${selectedRoomForBooking.name}" style="width:100%; border-radius:6px; margin-bottom:15px;" />
    <h3>${selectedRoomForBooking.name}</h3>
    <p style="color:var(--text-muted); margin: 10px 0;">${selectedRoomForBooking.description}</p>
    <p><strong>Max Guests:</strong> ${selectedRoomForBooking.maxGuests}</p>
    <p><strong>Rate:</strong> $${selectedRoomForBooking.price} / night</p>
  `;

  document.getElementById("modal-room-id").value = selectedRoomForBooking.id;
  document.getElementById("calc-rate").innerText = selectedRoomForBooking.price;

  // Pre-fill dates from search bar if available
  const searchCheckin = document.getElementById("search-checkin").value;
  const searchCheckout = document.getElementById("search-checkout").value;

  if (searchCheckin)
    document.getElementById("modal-checkin").value = searchCheckin;
  if (searchCheckout)
    document.getElementById("modal-checkout").value = searchCheckout;

  calculateModalPrice();
  document.getElementById("booking-modal").style.display = "flex";
};

const calculateModalPrice = () => {
  const checkin = new Date(document.getElementById("modal-checkin").value);
  const checkout = new Date(document.getElementById("modal-checkout").value);

  if (checkin && checkout && checkout > checkin) {
    const timeDiff = checkout.getTime() - checkin.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const total = nights * selectedRoomForBooking.price;

    document.getElementById("calc-nights").innerText = nights;
    document.getElementById("calc-total").innerText = total;
  } else {
    document.getElementById("calc-nights").innerText = "0";
    document.getElementById("calc-total").innerText = "0";
  }
};

// --- LocalStorage Booking Logic ---
const saveBooking = (booking) => {
  userBookings.push(booking);
  localStorage.setItem("aura_bookings", JSON.stringify(userBookings));
  renderBookings();
};

const deleteBooking = (id) => {
  userBookings = userBookings.filter((b) => b.bookingId !== id);
  localStorage.setItem("aura_bookings", JSON.stringify(userBookings));
  renderBookings();
  showToast("Booking cancelled successfully.");
};

const renderBookings = (filterText = "") => {
  const container = document.getElementById("user-bookings-list");
  container.innerHTML = "";

  const filtered = userBookings.filter(
    (b) =>
      b.bookingId.toLowerCase().includes(filterText.toLowerCase()) ||
      b.guestName.toLowerCase().includes(filterText.toLowerCase()),
  );

  if (filtered.length === 0) {
    container.innerHTML = `<p style="text-align:center; color: var(--text-muted);">No active reservations found.</p>`;
    return;
  }

  filtered.forEach((b) => {
    const item = document.createElement("div");
    item.className = "booking-item-card";
    item.innerHTML = `
      <div class="booking-info">
        <h4>ID: ${b.bookingId} - ${b.roomName}</h4>
        <p><strong>Guest:</strong> ${b.guestName} (${b.guestEmail})</p>
        <p><strong>Dates:</strong> ${b.checkin} to ${b.checkout} (${b.nights} Nights)</p>
        <p><strong>Total Paid:</strong> $${b.totalPrice}</p>
      </div>
      <div class="booking-actions">
        <button class="btn btn-dark" onclick="deleteBooking('${b.bookingId}')"><i class="fas fa-trash"></i> Cancel</button>
      </div>
    `;
    container.appendChild(item);
  });
};

// --- Show Receipt Modal ---
const showReceiptModal = (booking) => {
  const container = document.getElementById("receipt-details");
  container.innerHTML = `
    <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
    <p><strong>Guest Name:</strong> ${booking.guestName}</p>
    <p><strong>Room:</strong> ${booking.roomName}</p>
    <p><strong>Check-in:</strong> ${booking.checkin}</p>
    <p><strong>Check-out:</strong> ${booking.checkout}</p>
    <p><strong>Duration:</strong> ${booking.nights} Night(s)</p>
    <p><strong>Total Amount:</strong> $${booking.totalPrice}</p>
  `;
  document.getElementById("receipt-modal").style.display = "flex";
};

// --- Global Event Listeners Setup ---
const setupEventListeners = () => {
  // Sticky Nav & Scroll Top Visibility
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    const scrollTopBtn = document.getElementById("scroll-top");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 300) {
      scrollTopBtn.style.display = "flex";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  // Scroll to Top action
  document.getElementById("scroll-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Mobile Hamburger Toggle
  document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("nav-links").classList.toggle("active");
  });

  // Dark/Light Theme Switcher
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const icon = document.querySelector("#theme-toggle i");
    if (currentTheme === "light") {
      document.body.removeAttribute("data-theme");
      icon.className = "fas fa-moon";
    } else {
      document.body.setAttribute("data-theme", "light");
      icon.className = "fas fa-sun";
    }
  });

  // Filters setup
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      filterRooms();
    });
  });

  document.getElementById("price-range").addEventListener("input", (e) => {
    document.getElementById("price-val").innerText = e.target.value;
    filterRooms();
  });

  // Date updates calculation trigger in Modal
  document
    .getElementById("modal-checkin")
    .addEventListener("change", calculateModalPrice);
  document
    .getElementById("modal-checkout")
    .addEventListener("change", calculateModalPrice);

  // Quick Search Submission
  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const type = document.getElementById("search-room-type").value;
    filterRooms(type);
    document.getElementById("rooms").scrollIntoView({ behavior: "smooth" });
  });

  // Modal Form Submit (Confirm Booking)
  document
    .getElementById("modal-booking-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const checkin = document.getElementById("modal-checkin").value;
      const checkout = document.getElementById("modal-checkout").value;

      if (!checkin || !checkout || new Date(checkout) <= new Date(checkin)) {
        showToast("Please enter valid check-in and check-out dates.");
        return;
      }

      const nights = parseInt(document.getElementById("calc-nights").innerText);
      const totalPrice = parseInt(
        document.getElementById("calc-total").innerText,
      );

      const booking = {
        bookingId: "AG-" + Math.floor(100000 + Math.random() * 900000),
        roomName: selectedRoomForBooking.name,
        guestName: document.getElementById("guest-name").value,
        guestEmail: document.getElementById("guest-email").value,
        guestPhone: document.getElementById("guest-phone").value,
        guestsCount: document.getElementById("guest-count").value,
        checkin: checkin,
        checkout: checkout,
        nights: nights,
        totalPrice: totalPrice,
        requests: document.getElementById("guest-requests").value,
      };

      saveBooking(booking);
      document.getElementById("booking-modal").style.display = "none";
      document.getElementById("modal-booking-form").reset();
      showReceiptModal(booking);
    });

  // Close Modals
  document.getElementById("modal-close-btn").addEventListener("click", () => {
    document.getElementById("booking-modal").style.display = "none";
  });
  document.getElementById("receipt-close-btn").addEventListener("click", () => {
    document.getElementById("receipt-modal").style.display = "none";
  });
  document.getElementById("close-receipt-btn").addEventListener("click", () => {
    document.getElementById("receipt-modal").style.display = "none";
  });

  // Search Bookings
  document
    .getElementById("btn-search-booking")
    .addEventListener("click", () => {
      const query = document.getElementById("booking-search-input").value;
      renderBookings(query);
    });

  // FAQ Accordion
  document.querySelectorAll(".faq-question").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.parentElement;
      item.classList.toggle("active");
    });
  });

  // Lightbox Handler
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("data-src");
      document.getElementById("lightbox-img").src = src;
      document.getElementById("lightbox").style.display = "flex";
    });
  });

  document.querySelector(".lightbox-close").addEventListener("click", () => {
    document.getElementById("lightbox").style.display = "none";
  });
};

// --- Room Filtering Helper ---
const filterRooms = (overrideType = null) => {
  const selectedType =
    overrideType ||
    document.querySelector(".filter-btn.active").getAttribute("data-filter");
  const maxPrice = parseInt(document.getElementById("price-range").value);

  const filtered = ROOMS_DATA.filter((room) => {
    const matchesType = selectedType === "all" || room.type === selectedType;
    const matchesPrice = room.price <= maxPrice;
    return matchesType && matchesPrice;
  });

  renderRooms(filtered);
};

// --- Number Counter Animation ---
const animateCounters = () => {
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const speed = target / 50;

    const updateCount = () => {
      count += speed;
      if (count < target) {
        counter.innerText = Math.ceil(count);
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};
