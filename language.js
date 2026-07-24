// ===============================
// MediScript Language Settings
// ===============================

// Language selector
const languageSelect = document.getElementById("language");

// Load saved language
window.addEventListener("DOMContentLoaded", () => {

    const savedLanguage =
        localStorage.getItem("language") || "en";

    languageSelect.value = savedLanguage;

    changeLanguage(savedLanguage);

});

// Change language when user selects another
languageSelect.addEventListener("change", () => {

    const language = languageSelect.value;

    localStorage.setItem("language", language);

    changeLanguage(language);

});

// Language Function
function changeLanguage(language){

    switch(language){

        case "en":
            setEnglish();
            break;

        case "ml":
            setMalayalam();
            break;

        case "hi":
            setHindi();
            break;

        case "ta":
            setTamil();
            break;

        case "kn":
            setKannada();
            break;

        case "te":
            setTelugu();
            break;

        case "bn":
            setBengali();
            break;

        case "mr":
            setMarathi();
            break;

        default:
            setEnglish();

    }

}

// ===============================
// English
// ===============================

function setEnglish(){

    document.documentElement.lang="en";

    document.title="MediScript";

}

// ===============================
// Malayalam
// ===============================

function setMalayalam(){

    document.documentElement.lang="ml";

    document.title="മെഡിസ്ക്രിപ്റ്റ്";

}

// ===============================
// Hindi
// ===============================

function setHindi(){

    document.documentElement.lang="hi";

    document.title="मेडिस्क्रिप्ट";

}

// ===============================
// Tamil
// ===============================

function setTamil(){

    document.documentElement.lang="ta";

    document.title="மெடிஸ்கிரிப்ட்";

}

// ===============================
// Kannada
// ===============================

function setKannada(){

    document.documentElement.lang="kn";

    document.title="ಮೆಡಿಸ್ಕ್ರಿಪ್ಟ್";

}

// ===============================
// Telugu
// ===============================

function setTelugu(){

    document.documentElement.lang="te";

    document.title="మెడిస్క్రిప్ట్";

}

// ===============================
// Bengali
// ===============================

function setBengali(){

    document.documentElement.lang="bn";

    document.title="মেডিস্ক্রিপ্ট";

}

// ===============================
// Marathi
// ===============================

function setMarathi(){

    document.documentElement.lang="mr";

    document.title="मेडिस्क्रिप्ट";

}

console.log("Language Settings Loaded");