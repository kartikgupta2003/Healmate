const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// It gives you access to Google’s Gemini API client, so you can call the AI model.

// async function listModels() {
//   try {
//     const res = await genAI.models.list();
//     //(res.data); // prints all available models
//   } catch (error) {
//     console.error("Error listing models:", error);
//   }
// }

// listModels();

module.exports = genAI;