// ===============================
// MediScript Appointments
// ===============================

let appointments =
JSON.parse(localStorage.getItem("appointments")) || [];

const container =
document.getElementById("appointmentContainer");

const saveBtn =
document.getElementById("saveAppointment");

const searchBox =
document.getElementById("searchBox");

// ===============================
// Save Appointment
// ===============================

saveBtn.addEventListener("click", saveAppointment);

function saveAppointment(){

    const appointment = {

        patient:
        document.getElementById("patientName").value,

        doctor:
        document.getElementById("doctorName").value,

        department:
        document.getElementById("department").value,

        hospital:
        document.getElementById("hospital").value,

        date:
        document.getElementById("appointmentDate").value,

        time:
        document.getElementById("appointmentTime").value,

        contact:
        document.getElementById("contactNumber").value,

        notes:
        document.getElementById("appointmentNotes").value

    };

    if(
        appointment.patient==="" ||
        appointment.doctor==="" ||
        appointment.date===""
    ){

        alert("Please fill required fields.");

        return;

    }

    appointments.push(appointment);

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    renderAppointments();

    clearForm();

}

// ===============================
// Render Appointments
// ===============================

function renderAppointments(){

    container.innerHTML="";

    appointments.forEach((item,index)=>{

        container.innerHTML+=`

        <div class="appointment-card">

            <div class="appointment-icon">

                <i class="fas fa-user-doctor"></i>

            </div>

            <div class="appointment-details">

                <h3>${item.doctor}</h3>

                <p><strong>Patient:</strong> ${item.patient}</p>

                <p>${item.department}</p>

                <p>${item.hospital}</p>

                <p>${item.date} | ${item.time}</p>

                <p>${item.contact}</p>

                <p>${item.notes}</p>

            </div>

            <div class="appointment-actions">

                <button onclick="deleteAppointment(${index})">

                    <i class="fas fa-trash"></i>

                </button>

            </div>

        </div>

        `;

    });

    updateStatistics();

}

// ===============================
// Delete Appointment
// ===============================

function deleteAppointment(index){

    if(confirm("Delete this appointment?")){

        appointments.splice(index,1);

        localStorage.setItem(
            "appointments",
            JSON.stringify(appointments)
        );

        renderAppointments();

    }

}

window.deleteAppointment=deleteAppointment;

// ===============================
// Clear Form
// ===============================

function clearForm(){

    document.getElementById("patientName").value="";
    document.getElementById("doctorName").value="";
    document.getElementById("department").value="";
    document.getElementById("hospital").value="";
    document.getElementById("appointmentDate").value="";
    document.getElementById("appointmentTime").value="";
    document.getElementById("contactNumber").value="";
    document.getElementById("appointmentNotes").value="";

}

// ===============================
// Search
// ===============================

searchBox.addEventListener("keyup",()=>{

    const value=searchBox.value.toLowerCase();

    document.querySelectorAll(".appointment-card")
    .forEach(card=>{

        if(card.innerText.toLowerCase().includes(value)){

            card.style.display="flex";

        }else{

            card.style.display="none";

        }

    });

});

// ===============================
// Statistics
// ===============================

function updateStatistics(){

    document.getElementById("totalAppointments").textContent=
    appointments.length;

    document.getElementById("upcomingAppointments").textContent=
    appointments.length;

    document.getElementById("todayAppointments").textContent=0;

    document.getElementById("completedAppointments").textContent=0;

}

// ===============================
// Load Page
// ===============================

window.onload=()=>{

    renderAppointments();

};