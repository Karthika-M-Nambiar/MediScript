import { auth, db } from "../firebase.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const historyList = document.getElementById("historyList");
const searchPrescription = document.getElementById("searchPrescription");

const totalPrescription = document.getElementById("totalPrescription");
const activePrescription = document.getElementById("activePrescription");
const completedPrescription = document.getElementById("completedPrescription");

let prescriptions = [];

// Load Prescriptions
async function loadHistory() {

    if (!auth.currentUser) {
        alert("Please login first.");
        return;
    }

    historyList.innerHTML = "";

    prescriptions = [];

    let total = 0;
    let active = 0;
    let completed = 0;

    const snapshot = await getDocs(
        collection(
            db,
            "users",
            auth.currentUser.uid,
            "prescriptions"
        )
    );

    if (snapshot.empty) {

        historyList.innerHTML =
            "<p class='empty'>No Prescription Uploaded</p>";

        return;

    }

    snapshot.forEach((docSnap) => {

        const data = docSnap.data();

        prescriptions.push({
            id: docSnap.id,
            ...data
        });

        total++;

        if (data.status === "Completed")
            completed++;
        else
            active++;

        historyList.innerHTML += createCard(docSnap.id, data);

    });

    totalPrescription.innerHTML = total;
    activePrescription.innerHTML = active;
    completedPrescription.innerHTML = completed;

}

// Create Card
function createCard(id, data) {

    return `

<div class="history-card">

<h3>${data.patientName || "Unknown Patient"}</h3>

<p><b>Doctor:</b> ${data.doctorName || "-"}</p>

<p><b>Hospital:</b> ${data.hospital || "-"}</p>

<p><b>Date:</b> ${data.date || "-"}</p>

<p><b>Diagnosis:</b> ${data.diagnosis || "-"}</p>

<p><b>Status:</b> ${data.status || "Active"}</p>

<div class="history-buttons">

<button onclick="viewPrescription('${id}')">

View

</button>

<button onclick="downloadPDF('${id}')">

PDF

</button>

<button onclick="sharePrescription('${id}')">

Share

</button>

<button class="delete"

onclick="deletePrescription('${id}')">

Delete

</button>

</div>

</div>

`;

}

// Delete
window.deletePrescription = async function(id){

    if(!confirm("Delete this prescription?"))
        return;

    await deleteDoc(
        doc(
            db,
            "users",
            auth.currentUser.uid,
            "prescriptions",
            id
        )
    );

    loadHistory();

}

// View
window.viewPrescription = function(id){

    localStorage.setItem("selectedPrescription",id);

    window.location.href="view-prescription.html";

}

// Download
window.downloadPDF=function(id){

    alert("PDF Download will be added in Phase 9.");

}

// Share
window.sharePrescription=function(id){

    navigator.clipboard.writeText(
        "Prescription ID : "+id
    );

    alert("Prescription ID copied.");

}

// Search

searchPrescription.addEventListener("keyup",()=>{

const value=
searchPrescription.value.toLowerCase();

const cards=
document.querySelectorAll(".history-card");

cards.forEach(card=>{

if(card.innerText.toLowerCase().includes(value))

card.style.display="block";

else

card.style.display="none";

});

});

loadHistory();