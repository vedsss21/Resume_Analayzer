import model from "../config/gemini.js";

export async function analyzeResume(resumeText, jobDescription) {
  const prompt = `
You are an AI resume screening assistant. 
Compare the following resume with the given job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return the result ONLY in strict JSON format with this schema:
{
  "match_score": "number (0-100)",
  "missing_skills": ["list of missing skills"],
  "suggestions": ["list of 3-5 improvement suggestions"]
}
`;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // 🧹 Clean code block formatting (remove ```json ... ```)
    text = text.replace(/```json\s*([\s\S]*?)```/i, "$1").trim();
    text = text.replace(/```([\s\S]*?)```/g, "$1").trim();

    try {
      return JSON.parse(text); // ✅ Now should work
    } catch (err) {
      console.error("❌ Failed to parse AI JSON:", text);
      return { error: "Invalid JSON format", raw: text };
    }
  } catch (error) {
    console.error("❌ Error analyzing resume:", error);
    return { error: "Resume analysis failed" };
  }
}
