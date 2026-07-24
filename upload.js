import { analyzeText } from "./gemini.js";
import { storage } from "./firebase.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
const preview = document.getElementById("preview");
const pdfViewer = document.getElementById("pdfViewer");

function openCamera() {
  document.getElementById("cameraInput").click();
}

function openGallery() {
  document.getElementById("galleryInput").click();
}

function openPDF() {
  document.getElementById("pdfInput").click();
}

document.getElementById("cameraInput").addEventListener("change", showImage);
document.getElementById("galleryInput").addEventListener("change", showImage);
document.getElementById("pdfInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    pdfViewer.src = URL.createObjectURL(file);
    pdfViewer.style.display = "block";
    preview.style.display = "none";
  }
});
const input=document.getElementById("galleryInput");
document.getElementById("uploadBtn").onclick = async () => {

    const file = document.getElementById("galleryInput").files[0];

    // STEP 6 STARTS HERE

    const storageRef = ref(storage, "prescriptions/" + file.name);

    await uploadBytes(storageRef, file);

    const imageURL = await getDownloadURL(storageRef);

    console.log(imageURL);

    // STEP 6 ENDS HERE

    // OCR Code comes here

};
const preview=document.getElementById("preview");

input.onchange=e=>{

const file=e.target.files[0];

preview.src=URL.createObjectURL(file);

}
Tesseract.recognize(file,"eng")

.then(result=>{

output.innerHTML=result.data.text;

});

async function showImage(e) {
  const file = e.target.files[0];
  if (!file) return;

  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
  pdfViewer.style.display = "none";

  const output = document.getElementById("ocrOutput");
  output.innerHTML = "🔍 Reading prescription...";

  try {
    const resultData = await
    Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    });
    const text = resultData.data?.text || "";
    const analysis = await analyzeText(text);

    output.innerHTML = `
<h3>📄 OCR Text</h3>
<pre>${text}</pre>
<hr>
<h3>🤖 AI Analysis</h3>
${analysis}
`;
    console.log(text);
  } catch (err) {
    output.innerHTML = "OCR Failed";
    console.error(err);
  }
}

window.openCamera = openCamera;
window.openGallery = openGallery;
window.openPDF = openPDF;
