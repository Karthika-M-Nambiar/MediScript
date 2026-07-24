// ========================================
// MediScript Forgot Password
// ========================================

import { auth } from "../firebase.js";

import {
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const forgotForm = document.getElementById("forgotForm");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

forgotForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = emailInput.value.trim();

    if(email === ""){

        showMessage("Please enter your email address.","red");

        return;

    }

    resetBtn.disabled = true;
    resetBtn.innerText = "Sending...";

    try{

        await sendPasswordResetEmail(auth,email);

        showMessage(
            "Password reset email sent successfully. Please check your inbox.",
            "green"
        );

        forgotForm.reset();

    }

    catch(error){

        let errorMessage="Something went wrong.";

        switch(error.code){

            case "auth/user-not-found":
                errorMessage="No account found with this email.";
                break;

            case "auth/invalid-email":
                errorMessage="Invalid email address.";
                break;

            case "auth/too-many-requests":
                errorMessage="Too many requests. Try again later.";
                break;

            case "auth/network-request-failed":
                errorMessage="Network error. Check your internet.";
                break;

            default:
                errorMessage=error.message;

        }

        showMessage(errorMessage,"red");

    }

    resetBtn.disabled = false;
    resetBtn.innerText = "Send Reset Link";

});

// ================================
// Message Function
// ================================

function showMessage(text,color){

    message.innerText=text;

    message.style.color=color;

    setTimeout(()=>{

        message.innerText="";

    },5000);

}

console.log("Forgot Password Module Loaded");