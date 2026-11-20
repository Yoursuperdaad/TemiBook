// ============================================
// 1. AOS INITIALIZATION
// ============================================
AOS.init({
  duration: 800,
  once: false,
  offset: 60,
});

// ============================================
// 2. DARK MODE TOGGLE
// ============================================
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Check saved preference
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  darkModeToggle.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
});

// ============================================
// 3. HAMBURGER MENU
// ============================================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// ============================================
// 4. ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll("section");
const navLinkItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinkItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  // Navbar shadow effect
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
  } else {
    navbar.style.boxShadow = "0 4px 6px rgba(0,0,0,0.03)";
  }
});

// ============================================
// 5. SELECT DOCTOR FROM DOCTOR CARDS
// ============================================
function selectDoctor(doctorName) {
  const doctorSelect = document.getElementById("doctorSelect");
  // Find and select the matching option
  for (let option of doctorSelect.options) {
    if (option.value === doctorName) {
      doctorSelect.value = doctorName;
      break;
    }
  }
  // Scroll to booking section smoothly
  document.getElementById("booking").scrollIntoView({ behavior: "smooth" });

  // Highlight the booking form
  const form = document.querySelector(".booking-form");
  form.style.borderColor = "#3b82f6";
  form.style.boxShadow = "0 0 0 4px rgba(59, 130, 246, 0.15)";
  setTimeout(() => {
    form.style.borderColor = "";
    form.style.boxShadow = "";
  }, 2000);
}

// ============================================
// 6. APPOINTMENT COUNTER
// ============================================
let appointmentCount = 0;
const counterElement = document.getElementById("counterNumber");

// Increment counter when form is submitted
function incrementCounter() {
  appointmentCount++;
  counterElement.textContent = appointmentCount;
  // Store in localStorage to persist across page reloads
  localStorage.setItem("appointmentCount", appointmentCount);
}

// Load saved counter
if (localStorage.getItem("appointmentCount")) {
  appointmentCount = parseInt(localStorage.getItem("appointmentCount"));
  counterElement.textContent = appointmentCount;
}

// ============================================
// 7. BOOKING FORM VALIDATION
// ============================================
const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get all form values
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("emailAddress").value.trim();
  const phone = document.getElementById("phoneNumber").value.trim();
  const doctor = document.getElementById("doctorSelect").value;
  const date = document.getElementById("appointmentDate").value;
  const time = document.getElementById("appointmentTime").value;
  const symptoms = document.getElementById("symptoms").value.trim();
  const terms = document.getElementById("termsCheck").checked;

  // Validation checks
  if (!fullName || !email || !phone || !doctor || !date || !time) {
    alert("⚠️ Please fill in all required fields (*) before submitting.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("⚠️ Please enter a valid email address (e.g., name@domain.com).");
    return;
  }

  if (phone.length < 7) {
    alert("⚠️ Please enter a valid phone number.");
    return;
  }

  if (!terms) {
    alert("⚠️ Please agree to the Terms & Conditions to proceed.");
    return;
  }

  // Success! Show confirmation
  const confirmation = `
✅ APPOINTMENT CONFIRMED!

Patient: ${fullName}
Doctor: ${doctor}
Date: ${date} at ${time}
Email: ${email}
Phone: ${phone}
Symptoms: ${symptoms || "None provided"}

You will receive a confirmation email within 1 hour.
    `;

  alert(confirmation);

  // Increment the counter
  incrementCounter();

  // Reset the form
  bookingForm.reset();

  // Log to console for developer reference
  console.log("📋 New Appointment Booked:", {
    fullName,
    email,
    phone,
    doctor,
    date,
    time,
    symptoms,
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// 8. SET MINIMUM DATE FOR APPOINTMENT (today + 1 day)
// ============================================
const dateInput = document.getElementById("appointmentDate");
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const minDate = tomorrow.toISOString().split("T")[0];
dateInput.setAttribute("min", minDate);

// ============================================
// 9. FAQ ACCORDION
// ============================================
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains("active");

    // Close all other FAQs
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Toggle the clicked one
    if (!isActive) {
      faqItem.classList.add("active");
    }
  });
});

// Open first FAQ by default for better UX
document.querySelector(".faq-item")?.classList.add("active");

// ============================================
// 10. CONSOLE WELCOME (for dev presentation)
// ============================================
console.log(
  "%c🏥 MediBook Hospital System",
  "font-size: 24px; font-weight: bold; color: #3b82f6;",
);
console.log(
  "%cStudent Project | Web Development Presentation",
  "font-size: 14px; color: #475569;",
);
console.log(
  "📌 Features: 7 Sections • AOS Animations • Dark Mode • Form Validation • Live Counter • FAQ Accordion",
);
console.log("👨‍💻 Built with HTML, CSS, JavaScript");
