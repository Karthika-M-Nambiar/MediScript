import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth,(user)=>{

setTimeout(()=>{

if(user){

window.location="dashboard.html";

}

else{

window.location="login.html";

}

},3000);

});