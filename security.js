// =======================================
// MediScript Security Settings
// =======================================

const securityEnabled = document.getElementById("securityEnabled");
const autoLogout = document.getElementById("autoLogout");
const sessionTimeout = document.getElementById("sessionTimeout");

const savePinBtn = document.getElementById("savePin");
const removePinBtn = document.getElementById("removePin");

const pinInput = document.getElementById("pin");

// Load Security Settings
window.addEventListener("DOMContentLoaded", () => {

    if (securityEnabled) {
        securityEnabled.checked =
            localStorage.getItem("securityEnabled") === "true";
    }

    if (autoLogout) {
        autoLogout.checked =
            localStorage.getItem("autoLogout") === "true";
    }

    if (sessionTimeout) {
        sessionTimeout.value =
            localStorage.getItem("sessionTimeout") || "30";
    }

});

// Enable Security
if (securityEnabled) {

    securityEnabled.addEventListener("change", () => {

        localStorage.setItem(
            "securityEnabled",
            securityEnabled.checked
        );

        alert(
            securityEnabled.checked
                ? "Security Enabled"
                : "Security Disabled"
        );

    });

}

// Auto Logout
if (autoLogout) {

    autoLogout.addEventListener("change", () => {

        localStorage.setItem(
            "autoLogout",
            autoLogout.checked
        );

    });

}

// Session Timeout
if (sessionTimeout) {

    sessionTimeout.addEventListener("change", () => {

        localStorage.setItem(
            "sessionTimeout",
            sessionTimeout.value
        );

    });

}

// Save PIN
if (savePinBtn) {

    savePinBtn.addEventListener("click", () => {

        const pin = pinInput.value.trim();

        if (pin.length !== 4 || isNaN(pin)) {

            alert("PIN must be exactly 4 digits.");

            return;

        }

        localStorage.setItem("appPin", pin);

        alert("PIN Saved Successfully.");

        pinInput.value = "";

    });

}

// Remove PIN
if (removePinBtn) {

    removePinBtn.addEventListener("click", () => {

        if (confirm("Remove App PIN?")) {

            localStorage.removeItem("appPin");

            alert("PIN Removed.");

        }

    });

}

// Auto Logout Timer
let timeout;

function resetTimer() {

    clearTimeout(timeout);

    if (
        localStorage.getItem("autoLogout") !== "true"
    ) return;

    const minutes =
        parseInt(
            localStorage.getItem("sessionTimeout") || 30
        );

    timeout = setTimeout(() => {

        alert("Session Expired.");

        localStorage.removeItem("user");

        window.location.href = "login.html";

    }, minutes * 60 * 1000);

}

document.addEventListener("mousemove", resetTimer);
document.addEventListener("keydown", resetTimer);
document.addEventListener("click", resetTimer);

resetTimer();

console.log("Security Module Loaded");