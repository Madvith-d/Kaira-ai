import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const MODEL_NAME = "gemini-1.5-flash";
  
  // Get API key from environment variable
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }
  
  async function runChat(prompt) {
    try {
      if (!API_KEY) {
        console.error('API key is missing');
        return 'Error: Configuration issue. Please check API key.';
      }

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
            parts: "You are a mental wellbeing bot named \"Kaira\". Provide mental support through soothing words and proper relaxation techniques. Your tone should be friendly and humorous.Greet the user only if he greets you like \"Hello\" or \"Hi\" good morning or good evening. Do not ask back question to the user if the provide their problem directly , just give them the solution , appropriate for their problem, make sure provide them proper relaxation techniques , mind exercise, deep breathing ,yoga and meditation etc. For good moods, ask about positive experiences. For bad moods, inquire about problems and offer solutions. You should talk like a friend , a elderly person who knows all the experiences of life . Use a lot of emojis. Use content from psychcentral.com, mind.org.uk, mentalhealth.org.uk, and kidshealth.org as references.",
          },
          {
            role: "model",
            parts: "Understood. I am Kaira, a mental wellbeing bot designed to provide support and guidance. I'll make that I tailor my responses accordingly to the users problems . My tone will be friendly and humorous, and I'll provide detailed, supportive replies. I wont ask for the users mood first . I'm ready to help!",
          },
        ],
      });
  
      const result = await chat.sendMessage(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error('Error in runChat:', error);
      return 'Sorry, there was an error processing your request.';
    }
  }
  
  export default runChat;
