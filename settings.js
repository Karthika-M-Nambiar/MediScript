const language=document.getElementById("language");

const theme=document.getElementById("theme");

language.value=localStorage.getItem("language") || "en";

theme.value=localStorage.getItem("theme") || "light";

document.getElementById("saveBtn").onclick=()=>{

localStorage.setItem("language",language.value);

localStorage.setItem("theme",theme.value);

if(theme.value=="dark"){

document.body.classList.add("dark");

}else{

document.body.classList.remove("dark");

}

alert("Settings Saved");

};