// ==========================================
// MediScript Patient Profile
// ==========================================

import { auth, db } from "./firebase.js";

import {
doc,
getDoc,
deleteDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// --------------------------------------
// Get Patient ID
// --------------------------------------

const params = new URLSearchParams(window.location.search);

const patientId = params.get("id");

// --------------------------------------
// HTML Elements
// --------------------------------------

const profileImage = document.getElementById("profileImage");
const patientName = document.getElementById("patientName");
const relation = document.getElementById("relation");
const age = document.getElementById("age");
const gender = document.getElementById("gender");
const bloodGroup = document.getElementById("bloodGroup");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const address = document.getElementById("address");
const doctor = document.getElementById("doctor");
const hospital = document.getElementById("hospital");
const allergies = document.getElementById("allergies");
const history = document.getElementById("history");
const medications = document.getElementById("medications");
const notes = document.getElementById("notes");

// --------------------------------------
// Load Patient
// --------------------------------------

async function loadPatient(){

const user = auth.currentUser;

if(!user){

window.location="login.html";

return;

}

try{

const patientRef = doc(
db,
"users",
user.uid,
"patients",
patientId
);

const snap = await getDoc(patientRef);

if(!snap.exists()){

alert("Patient not found.");

window.location="patients.html";

return;

}

const data = snap.data();

profileImage.src =
data.profileImage || "images/default-profile.png";

patientName.textContent = data.fullName;

relation.textContent = data.relation;

age.textContent = data.age;

gender.textContent = data.gender;

bloodGroup.textContent = data.bloodGroup;

phone.textContent = data.phone;

email.textContent = data.email;

address.textContent = data.address;

doctor.textContent = data.doctor;

hospital.textContent = data.hospital;

allergies.textContent = data.allergies;

history.textContent = data.medicalHistory;

medications.textContent = data.medications;

notes.textContent = data.notes;

}

catch(error){

console.error(error);

alert(error.message);

}

}

// --------------------------------------
// Edit Patient
// --------------------------------------

document
.getElementById("editPatient")
.addEventListener("click",()=>{

window.location=
`edit-patient.html?id=${patientId}`;

});

// --------------------------------------
// Delete Patient
// --------------------------------------

document
.getElementById("deletePatient")
.addEventListener("click",async()=>{

const confirmDelete=
confirm("Delete this patient?");

if(!confirmDelete) return;

const user=auth.currentUser;

try{

await deleteDoc(

doc(
db,
"users",
user.uid,
"patients",
patientId
)

);

alert("Patient Deleted");

window.location="patients.html";

}

catch(error){

alert(error.message);

}

});

// --------------------------------------
// Load Page
// --------------------------------------

window.onload=loadPatient;