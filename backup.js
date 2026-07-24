// =========================================
// MediScript Backup & Restore
// =========================================

const backupBtn = document.getElementById("backupNow");
const restoreBtn = document.getElementById("restoreBackup");
const backupFile = document.getElementById("backupFile");
const lastBackup = document.getElementById("lastBackup");

// Load last backup date
window.addEventListener("DOMContentLoaded", () => {

    const date = localStorage.getItem("lastBackup");

    if(lastBackup){

        lastBackup.innerHTML = date || "No Backup Available";

    }

});

// -----------------------------
// Backup Data
// -----------------------------

if(backupBtn){

backupBtn.addEventListener("click",()=>{

const backupData={

settings:{

theme:localStorage.getItem("theme"),

language:localStorage.getItem("language"),

medicineReminder:localStorage.getItem("medicineReminder"),

appointmentReminder:localStorage.getItem("appointmentReminder"),

healthTips:localStorage.getItem("healthTips"),

notificationSound:localStorage.getItem("notificationSound"),

vibration:localStorage.getItem("vibration")

},

patients:JSON.parse(localStorage.getItem("patients"))||[],

prescriptions:JSON.parse(localStorage.getItem("prescriptions"))||[],

reminders:JSON.parse(localStorage.getItem("reminders"))||[],

backupDate:new Date().toLocaleString()

};

const blob=new Blob(

[JSON.stringify(backupData,null,4)],

{type:"application/json"}

);

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="MediScript_Backup.json";

a.click();

URL.revokeObjectURL(url);

localStorage.setItem(

"lastBackup",

backupData.backupDate

);

if(lastBackup)

lastBackup.innerHTML=backupData.backupDate;

alert("Backup Completed Successfully.");

});

}

// -----------------------------
// Restore Backup
// -----------------------------

if(restoreBtn){

restoreBtn.addEventListener("click",()=>{

backupFile.click();

});

}

if(backupFile){

backupFile.addEventListener("change",(event)=>{

const file=event.target.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=(e)=>{

try{

const data=JSON.parse(e.target.result);

// Restore Settings

if(data.settings){

Object.keys(data.settings).forEach(key=>{

localStorage.setItem(

key,

data.settings[key]

);

});

}

// Restore Patients

localStorage.setItem(

"patients",

JSON.stringify(data.patients||[])

);

// Restore Prescriptions

localStorage.setItem(

"prescriptions",

JSON.stringify(data.prescriptions||[])

);

// Restore Reminders

localStorage.setItem(

"reminders",

JSON.stringify(data.reminders||[])

);

localStorage.setItem(

"lastBackup",

data.backupDate

);

if(lastBackup)

lastBackup.innerHTML=data.backupDate;

alert("Backup Restored Successfully.");

location.reload();

}

catch(error){

alert("Invalid Backup File.");

}

};

reader.readAsText(file);

});

}

console.log("Backup Module Loaded");