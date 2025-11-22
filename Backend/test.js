const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function run() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  console.log("Testing key permissions...");
  try {
    const result = await model.generateContent("Hello");
    console.log(" SUCCESS! Your key has permission.");
    console.log("Response:", result.response.text());
  } catch (error) {
    console.log(" ERROR:", error.message);
    console.log("Details:", error.statusText);
  }
}

run();