import { auth, db } from "../firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Form Fields
const patientName = document.getElementById("patientName");
const patientAge = document.getElementById("patientAge");
const patientGender = document.getElementById("patientGender");
const bloodGroup = document.getElementById("bloodGroup");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const phone = document.getElementById("phone");
const emergencyContact = document.getElementById("emergencyContact");
const address = document.getElementById("address");
const allergies = document.getElementById("allergies");
const history = document.getElementById("history");

const savePatient = document.getElementById("savePatient");
const patientList = document.getElementById("patientList");
const searchPatient = document.getElementById("searchPatient");

let editId = null;

// Save / Update Patient
savePatient.addEventListener("click", async () => {

    if (!auth.currentUser) {
        alert("Please login first.");
        return;
    }

    if (
        patientName.value === "" ||
        patientAge.value === "" ||
        patientGender.value === ""
    ) {
        alert("Please fill all required fields.");
        return;
    }

    const patientData = {

        name: patientName.value,
        age: patientAge.value,
        gender: patientGender.value,
        bloodGroup: bloodGroup.value,
        height: height.value,
        weight: weight.value,
        phone: phone.value,
        emergencyContact: emergencyContact.value,
        address: address.value,
        allergies: allergies.value,
        history: history.value,
        createdAt: new Date()

    };

    if (editId === null) {

        await addDoc(
            collection(
                db,
                "users",
                auth.currentUser.uid,
                "patients"
            ),
            patientData
        );

        alert("Patient Added Successfully");

    } else {

        await updateDoc(
            doc(
                db,
                "users",
                auth.currentUser.uid,
                "patients",
                editId
            ),
            patientData
        );

        alert("Patient Updated Successfully");

        editId = null;

        savePatient.innerHTML = "Save Patient";

    }

    clearForm();

    loadPatients();

});

// Load Patients
async function loadPatients() {

    if (!auth.currentUser) return;

    patientList.innerHTML = "";

    const snapshot = await getDocs(
        collection(
            db,
            "users",
            auth.currentUser.uid,
            "patients"
        )
    );

    if (snapshot.empty) {

        patientList.innerHTML =
            "<p class='empty'>No Patient Added</p>";

        return;

    }

    snapshot.forEach((patient) => {

        const data = patient.data();

        patientList.innerHTML += `

        <div class="patient-card">

            <h3>${data.name}</h3>

            <p><b>Age:</b> ${data.age}</p>

            <p><b>Gender:</b> ${data.gender}</p>

            <p><b>Blood Group:</b> ${data.bloodGroup}</p>

            <p><b>Phone:</b> ${data.phone}</p>

            <div class="patient-actions">

                <button
                class="view-btn"
                onclick="viewPatient('${patient.id}')">

                View

                </button>

                <button
                class="edit-btn"
                onclick="editPatient('${patient.id}')">

                Edit

                </button>

                <button
                class="delete-btn"
                onclick="deletePatient('${patient.id}')">

                Delete

                </button>

            </div>

        </div>

        `;

    });

}

// Delete Patient
window.deletePatient = async function(id){

    if(!confirm("Delete this patient?"))
        return;

    await deleteDoc(
        doc(
            db,
            "users",
            auth.currentUser.uid,
            "patients",
            id
        )
    );

    loadPatients();

}

// Edit Patient
window.editPatient = async function(id){

    const snap = await getDoc(
        doc(
            db,
            "users",
            auth.currentUser.uid,
            "patients",
            id
        )
    );

    const data = snap.data();

    patientName.value = data.name;
    patientAge.value = data.age;
    patientGender.value = data.gender;
    bloodGroup.value = data.bloodGroup;
    height.value = data.height;
    weight.value = data.weight;
    phone.value = data.phone;
    emergencyContact.value = data.emergencyContact;
    address.value = data.address;
    allergies.value = data.allergies;
    history.value = data.history;

    editId = id;

    savePatient.innerHTML = "Update Patient";

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

// View Patient
window.viewPatient = async function(id){

    localStorage.setItem("selectedPatient",id);

    window.location.href="patient-details.html";

}

// Search Patient
searchPatient.addEventListener("keyup",()=>{

    const search = searchPatient.value.toLowerCase();

    const cards =
    document.querySelectorAll(".patient-card");

    cards.forEach(card=>{

        if(
            card.innerText.toLowerCase().includes(search)
        ){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

});

// Clear Form
function clearForm(){

    patientName.value="";
    patientAge.value="";
    patientGender.value="";
    bloodGroup.value="A+";
    height.value="";
    weight.value="";
    phone.value="";
    emergencyContact.value="";
    address.value="";
    allergies.value="";
    history.value="";

}

// Load on Startup
loadPatients();