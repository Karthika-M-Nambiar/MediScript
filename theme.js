// ===============================
// MediScript Theme Settings
// ===============================

const themeSelect = document.getElementById("theme");

// Load saved theme
window.addEventListener("DOMContentLoaded", () => {

    const savedTheme =
        localStorage.getItem("theme") || "system";

    if (themeSelect) {
        themeSelect.value = savedTheme;
    }

    applyTheme(savedTheme);

});

// Change Theme

if (themeSelect) {

    themeSelect.addEventListener("change", () => {

        const theme = themeSelect.value;

        localStorage.setItem("theme", theme);

        applyTheme(theme);

    });

}

// Apply Theme

function applyTheme(theme){

    document.body.classList.remove("dark");

    if(theme === "light"){

        document.body.classList.remove("dark");

    }

    else if(theme === "dark"){

        document.body.classList.add("dark");

    }

    else{

        // System Theme

        if(window.matchMedia("(prefers-color-scheme: dark)").matches){

            document.body.classList.add("dark");

        }

    }

}

// Detect System Theme Change

window.matchMedia("(prefers-color-scheme: dark)")
.addEventListener("change", () => {

    const currentTheme =
        localStorage.getItem("theme") || "system";

    if(currentTheme === "system"){

        applyTheme("system");

    }

});

console.log("Theme Loaded Successfully");