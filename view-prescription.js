import { auth, db } from "../firebase.js";

import {
    doc,
    getDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const prescriptionImage = document.getElementById("prescriptionImage");

const patientName = document.getElementById("patientName");
const patientAge = document.getElementById("patientAge");
const patientGender = document.getElementById("patientGender");

const doctorName = document.getElementById("doctorName");
const hospitalName = document.getElementById("hospitalName");
const prescriptionDate = document.getElementById("prescriptionDate");

const diagnosis = document.getElementById("diagnosis");

const medicineList = document.getElementById("medicineList");

const aiAnalysis = document.getElementById("aiAnalysis");

const followUpDate = document.getElementById("followUpDate");

const testList = document.getElementById("testList");

const downloadBtn = document.getElementById("downloadBtn");
const shareBtn = document.getElementById("shareBtn");
const deleteBtn = document.getElementById("deleteBtn");

const prescriptionId = localStorage.getItem("selectedPrescription");

if (!prescriptionId) {

    alert("No prescription selected.");

    window.location.href = "history.html";

}

async function loadPrescription() {

    if (!auth.currentUser) {

        alert("Please login.");

        return;

    }

    const ref = doc(
        db,
        "users",
        auth.currentUser.uid,
        "prescriptions",
        prescriptionId
    );

    const snap = await getDoc(ref);

    if (!snap.exists()) {

        alert("Prescription not found.");

        window.location.href = "history.html";

        return;

    }

    const data = snap.data();

    // Image

    if (data.imageUrl)
        prescriptionImage.src = data.imageUrl;

    // Patient

    patientName.innerHTML = data.patientName || "-";
    patientAge.innerHTML = data.patientAge || "-";
    patientGender.innerHTML = data.patientGender || "-";

    // Doctor

    doctorName.innerHTML = data.doctorName || "-";
    hospitalName.innerHTML = data.hospital || "-";
    prescriptionDate.innerHTML = data.date || "-";

    // Diagnosis

    diagnosis.innerHTML = data.diagnosis || "-";

    // Medicines

    medicineList.innerHTML = "";

    if (
        Array.isArray(data.medicines) &&
        data.medicines.length > 0
    ) {

        data.medicines.forEach((medicine) => {

            medicineList.innerHTML += `

<div class="medicine-card">

<h3>${medicine.name || "Medicine"}</h3>

<p><b>Dosage:</b> ${medicine.dosage || "-"}</p>

<p><b>Frequency:</b> ${medicine.frequency || "-"}</p>

<p><b>Duration:</b> ${medicine.duration || "-"}</p>

<p><b>Instructions:</b> ${medicine.instructions || "-"}</p>

</div>

`;

        });

    } else {

        medicineList.innerHTML =
        "<p class='empty'>No Medicines Found</p>";

    }

    // AI Analysis

    aiAnalysis.innerHTML =
        data.aiAnalysis ||
        "No AI Analysis Available.";

    // Follow-up

    followUpDate.innerHTML =
        data.followUpDate || "-";

    // Tests

    if (Array.isArray(data.tests)) {

        testList.innerHTML = "<ul>";

        data.tests.forEach(test => {

            testList.innerHTML += `<li>${test}</li>`;

        });

        testList.innerHTML += "</ul>";

    } else {

        testList.innerHTML =
        "No Recommended Tests";

    }

}

// Download

downloadBtn.onclick = () => {

    if (window.print) {

        window.print();

    }

};

// Share

shareBtn.onclick = async () => {

    const text = `

Patient : ${patientName.innerHTML}

Doctor : ${doctorName.innerHTML}

Diagnosis : ${diagnosis.innerHTML}

`;

    if (navigator.share) {

        await navigator.share({

            title: "MediScript Prescription",

            text: text

        });

    } else {

        await navigator.clipboard.writeText(text);

        alert("Prescription copied.");

    }

};

// Delete

deleteBtn.onclick = async () => {

    if (!confirm("Delete this prescription?"))

        return;

    await deleteDoc(

        doc(
            db,
            "users",
            auth.currentUser.uid,
            "prescriptions",
            prescriptionId
        )

    );

    alert("Prescription deleted.");

    window.location.href = "history.html";

};

loadPrescription();