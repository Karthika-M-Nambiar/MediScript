async function analyzePrescription(){

const file=document.getElementById("imageInput").files[0];

if(!file){
alert("Please upload a prescription.");
return;
}

// OCR will extract text here

// Send extracted text to Gemini API

// Display AI explanation

}