const asyncHandler = require("express-async-handler");
const genAI = require("../Config/gemini.js");
const SymptomCheck = require("../Models/symptomsModel.js");
const User = require("../Models/userModel.js");

const symptomChecker = asyncHandler(async (req, res  , next) => {
    let { symptoms } = req.body;

    symptoms = symptoms
               .split(',')
               .map((s)=>{
                return s.trim();
               })
               .filter((s)=>{
                return (s.length >0)
               })
               .join(', ');

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const user = req.user;
        const prompt = `The user reports the following symptoms: "${symptoms}".
        User details: Age: ${user.age}, Gender: ${user.gender}, Weight: ${user.weight}kg , Medical History : ${user.medicalHistory}.
    Please analyze and provide:
    1. Possible common illnesses (in a list).
    2. Medical advice (when to see a doctor).
    Format response as JSON with keys: conditions, advice.
    `
    // You’re constructing a prompt — the instruction you’ll send to the Gemini model.

        const result = await model.generateContent(prompt);
        let text = result.response.text();
        // result.response.text() returns a string, try parsing as JSON . It gives the raw text output from Gemini.

        // 🔧 Clean up markdown formatting if Gemini wraps response in ```json ... ```
        text = text.replace(/```json|```/g, "").trim();
//         Gemini often returns output wrapped like this:

// ```json
// {
//   "conditions": [...],
//   "advice": "..."
// }
// ```


// This code removes:

// The backticks ```

// The json tag

// Extra spaces or newlines

// So now you have pure JSON text.

        let diagnosis;
        try {
            diagnosis = JSON.parse(text);
        } catch {
            diagnosis = { raw: result.response.text() }; // fallback if not valid JSON
        }

        const symptom_doc = await SymptomCheck.create({
            userId : user._id ,
            symptoms : symptoms ,
            apiResponse : diagnosis 
        })

        await User.updateOne({_id : user._id} , { $push: { symptomChecks :  symptom_doc._id}})

        return res.json({ diagnosis });
    }
    catch(error){
        //("Gemini API error:" , error);
        const err = new Error("AI service failed");
        next(err);
    }


}) 

module.exports = symptomChecker;