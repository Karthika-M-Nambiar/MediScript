import { auth, db } from "./firebase.js";

import {
collection,
addDoc
}
from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const form=document.getElementById("patientForm");

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const user=auth.currentUser;

if(!user){

alert("Login First");

return;

}

await addDoc(

collection(db,"users",user.uid,"patients"),

{

name:document.getElementById("name").value,

age:document.getElementById("age").value,

gender:document.getElementById("gender").value,

bloodGroup:document.getElementById("bloodGroup").value,

phone:document.getElementById("phone").value,

emergencyContact:document.getElementById("emergencyContact").value,

address:document.getElementById("address").value,

allergies:document.getElementById("allergies").value,

medicalHistory:document.getElementById("medicalHistory").value,

createdAt:new Date()

}

);

alert("Patient Added");

form.reset();

});