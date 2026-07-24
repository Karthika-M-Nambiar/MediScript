import { auth, db } from "../firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const medicineName = document.getElementById("medicineName");
const dosage = document.getElementById("dosage");
const time = document.getElementById("time");
const frequency = document.getElementById("frequency");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");

const saveReminder = document.getElementById("saveReminder");
const reminderList = document.getElementById("reminderList");

const totalMedicine = document.getElementById("totalMedicine");
const takenMedicine = document.getElementById("takenMedicine");
const missedMedicine = document.getElementById("missedMedicine");

let total = 0;
let taken = 0;
let missed = 0;

saveReminder.addEventListener("click", async () => {

    if (!auth.currentUser) {
        alert("Please login first.");
        return;
    }

    if (
        medicineName.value === "" ||
        dosage.value === "" ||
        time.value === ""
    ) {
        alert("Please fill all required fields.");
        return;
    }

    await addDoc(
        collection(
            db,
            "users",
            auth.currentUser.uid,
            "reminders"
        ),
        {
            medicineName: medicineName.value,
            dosage: dosage.value,
            time: time.value,
            frequency: frequency.value,
            startDate: startDate.value,
            endDate: endDate.value,
            status: "Pending",
            createdAt: new Date()
        }
    );

    alert("Reminder Saved Successfully");

    medicineName.value = "";
    dosage.value = "";
    time.value = "";
    startDate.value = "";
    endDate.value = "";

    loadReminders();

});

async function loadReminders() {

    reminderList.innerHTML = "";

    total = 0;
    taken = 0;
    missed = 0;

    if (!auth.currentUser) return;

    const snapshot = await getDocs(
        collection(
            db,
            "users",
            auth.currentUser.uid,
            "reminders"
        )
    );

    if (snapshot.empty) {

        reminderList.innerHTML =
            "<p class='empty'>No reminders available.</p>";

    }

    snapshot.forEach((docSnap) => {

        total++;

        const data = docSnap.data();

        if (data.status === "Taken")
            taken++;

        if (data.status === "Skipped")
            missed++;

        reminderList.innerHTML += `

        <div class="reminder-item">

            <h3>${data.medicineName}</h3>

            <p><b>Dosage:</b> ${data.dosage}</p>

            <p><b>Time:</b> ${data.time}</p>

            <p><b>Frequency:</b> ${data.frequency}</p>

            <p><b>Status:</b> ${data.status}</p>

            <div class="actions">

                <button
                class="taken"
                onclick="markTaken('${docSnap.id}')">

                Taken

                </button>

                <button
                class="snooze"
                onclick="snoozeReminder()">

                Snooze

                </button>

                <button
                class="delete"
                onclick="deleteReminder('${docSnap.id}')">

                Delete

                </button>

            </div>

        </div>

        `;

    });

    totalMedicine.innerHTML = total;
    takenMedicine.innerHTML = taken;
    missedMedicine.innerHTML = missed;

}

window.deleteReminder = async function (id) {

    await deleteDoc(
        doc(
            db,
            "users",
            auth.currentUser.uid,
            "reminders",
            id
        )
    );

    loadReminders();

};

window.markTaken = async function (id) {

    await updateDoc(
        doc(
            db,
            "users",
            auth.currentUser.uid,
            "reminders",
            id
        ),
        {
            status: "Taken"
        }
    );

    loadReminders();

};

window.snoozeReminder = function () {

    alert("Reminder Snoozed for 10 minutes.");

};

if ("Notification" in window) {

    Notification.requestPermission();

}

setInterval(() => {

    const now = new Date();

    const currentTime =
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0");

    document.querySelectorAll(".reminder-item").forEach((item) => {

        const text = item.innerHTML;

        if (text.includes(currentTime)) {

            if (Notification.permission === "granted") {

                new Notification("Medicine Reminder", {

                    body: "Time to take your medicine."

                });

            }

        }

    });

}, 60000);

loadReminders();