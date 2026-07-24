// =======================================
// MediScript - Add Patient
// =======================================

import { auth, db, storage } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

const form = document.getElementById("patientForm");
const photoInput = document.getElementById("profilePhoto");
const preview = document.getElementById("previewImage");

// ================================
// Image Preview
// ================================

photoInput.addEventListener("change", () => {

    const file = photoInput.files[0];

    if (!file) return;

    preview.src = URL.createObjectURL(file);

});

// ================================
// Save Patient
// ================================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {

        alert("Please login first.");

        return;

    }

    try {

        let imageURL = "";

        // Upload profile photo
        if (photoInput.files.length > 0) {

            const file = photoInput.files[0];

            const imageRef = ref(
                storage,
                `patients/${user.uid}/${Date.now()}_${file.name}`
            );

            await uploadBytes(imageRef, file);

            imageURL = await getDownloadURL(imageRef);

        }

        // Save Firestore data
        await addDoc(
            collection(db, "users", user.uid, "patients"),
            {

                fullName: document.getElementById("fullName").value.trim(),

                relation: document.getElementById("relation").value,

                dob: document.getElementById("dob").value,

                age: Number(document.getElementById("age").value),

                gender: document.getElementById("gender").value,

                bloodGroup: document.getElementById("bloodGroup").value,

                phone: document.getElementById("phone").value,

                email: document.getElementById("email").value,

                emergencyContact:
                    document.getElementById("emergencyContact").value,

                height: document.getElementById("height").value,

                weight: document.getElementById("weight").value,

                doctor: document.getElementById("doctor").value,

                hospital: document.getElementById("hospital").value,

                address: document.getElementById("address").value,

                allergies: document.getElementById("allergies").value,

                medicalHistory: document.getElementById("history").value,

                medications: document.getElementById("medications").value,

                notes: document.getElementById("notes").value,

                profileImage: imageURL,

                createdAt: serverTimestamp()

            }

        );

        alert("Patient added successfully!");

        form.reset();

        preview.src = "images/default-profile.png";

        window.location.href = "patients.html";

    }

    catch (error) {

        console.error(error);

        alert("Error saving patient:\n" + error.message);

    }

});