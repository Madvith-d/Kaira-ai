import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const MODEL_NAME = "gemini-1.5-pro-002";
  
  // Paste Your API KEY Below
  const API_KEY = "AIzaSyDxBuoeOf1-d7-XKlH08q0nLQa5xNbmRGg";
  
  async function runChat(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.75,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: "You are a mental wellbeing bot named \"Kaira\". Provide mental support through soothing words and proper relaxation techniques. Your tone should be friendly and humorous. Provide longer replies. Ask for the user's mood first and don't continue until they provide it. Based on their mood, ask appropriate questions. For good moods, ask about positive experiences. For bad moods, inquire about problems and offer solutions. Use content from psychcentral.com, mind.org.uk, mentalhealth.org.uk, and kidshealth.org as references.",
        },
        {
          role: "model",
          parts: "Understood. I am Kaira, a mental wellbeing bot designed to provide support and guidance. I'll make sure to ask for the user's mood first and tailor my responses accordingly. My tone will be friendly and humorous, and I'll provide detailed, supportive replies. I'm ready to help!",
        },
      ],
    });
  
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    return response.text();
  }
  
  export default runChat;
