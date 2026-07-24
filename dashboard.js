// =========================================
// MediScript Dashboard
// dashboard.js - Part 1
// =========================================

// Welcome username
document.addEventListener("DOMContentLoaded", () => {

    const username = localStorage.getItem("username") || "User";

    const usernameElement = document.getElementById("username");

    if (usernameElement) {
        usernameElement.textContent = username + " 👋";
    }

    loadDashboardStats();

    loadTheme();

});

// =========================================
// Dashboard Statistics
// =========================================

function loadDashboardStats() {

    const patients =
        JSON.parse(localStorage.getItem("patients")) || [];

    const prescriptions =
        JSON.parse(localStorage.getItem("prescriptions")) || [];

    const reminders =
        JSON.parse(localStorage.getItem("reminders")) || [];

    setValue("patients", patients.length);
    setValue("totalPrescription", prescriptions.length);
    setValue("activeMedicine", reminders.length);

    const today = new Date().toLocaleDateString();

    const todayCount = reminders.filter(r => r.date === today).length;

    setValue("todayReminder", todayCount);

}

function setValue(id, value) {

    const element = document.getElementById(id);

    if (element) {

        element.textContent = value;

    }

}

// =========================================
// Notification Button
// =========================================

const notificationBtn = document.querySelector(".notification-btn");

if (notificationBtn) {

    notificationBtn.addEventListener("click", () => {

        alert("🔔 No new notifications.");

    });

}

// =========================================
// Logout
// =========================================

function logout() {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("username");

        window.location.href = "login.html";

    }

}

// Make logout accessible
window.logout = logout;
// =========================================
// dashboard.js - Part 2
// =========================================

// Theme
function loadTheme() {

    const theme = localStorage.getItem("theme");

    if (theme === "dark") {

        document.body.classList.add("dark");

    }

}

// =========================================
// Language
// =========================================

function changeLanguage() {

    const language = document.getElementById("language").value;

    localStorage.setItem("language", language);

    if (language === "ml") {

        alert("മലയാളം ഭാഷ തിരഞ്ഞെടുത്തു");

    } else {

        alert("English selected");

    }

}

window.changeLanguage = changeLanguage;

// =========================================
// Search
// =========================================

const searchBox = document.querySelector(".search-box");

if (searchBox) {

    searchBox.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".quick-card");

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(value)) {

                card.style.display = "flex";

            } else {

                card.style.display = "none";

            }

        });

    });

}

// =========================================
// Loading Screen
// =========================================

window.addEventListener("load", () => {

    const loader = document.getElementById("loadingScreen");

    if (loader) {

        loader.style.display = "flex";

        setTimeout(() => {

            loader.style.display = "none";

        }, 1000);

    }

});

// =========================================
// Card Animation
// =========================================

const cards = document.querySelectorAll(".stat-card, .quick-card");

cards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform = "translateY(30px)";

    setTimeout(() => {

        card.style.transition = "0.5s ease";

        card.style.opacity = "1";

        card.style.transform = "translateY(0)";

    }, index * 100);

});

// =========================================
// Auto Refresh Dashboard
// =========================================

setInterval(() => {

    loadDashboardStats();

}, 5000);

// =========================================
// Greeting
// =========================================

const hour = new Date().getHours();

let greeting = "Welcome";

if (hour < 12) {

    greeting = "Good Morning ☀️";

} else if (hour < 17) {

    greeting = "Good Afternoon 🌤️";

} else {

    greeting = "Good Evening 🌙";

}

const heading = document.querySelector(".top-header h3");

if (heading) {

    heading.textContent = greeting;

}

// =========================================
// End
// =========================================

console.log("✅ MediScript Dashboard Loaded Successfully");