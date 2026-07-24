const API_KEY = "AQ.Ab8RN6LshZqnE08dAJrsSSnTvh1i25U5FYyBTIStzC6U_Xe1Rw";

export async function analyzeText(text) {

    const prompt = `
You are a medical AI assistant.

The following OCR text may contain spelling mistakes,
mixed English and Malayalam characters,
missing letters and OCR errors.

First reconstruct the prescription into correct English.

Then analyze it.

Return:

1. Disease
2. Medicines
3. Dosage
4. Morning/Afternoon/Night
5. Duration
6. Side Effects
7. Precautions
8. Simple English explanation
9. Malayalam explanation

Prescription:

${text}
`;

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            })
        }
    );
    console.log("HTTP Status:", response.status);

console.log("Status:", response.status);

const data = await response.json();

console.log("Gemini Response:", data);

if (!response.ok) {
    return JSON.stringify(data, null, 2);
}

return data.candidates[0].content.parts[0].text;
}