// src/api/openai.js
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Only for hackathon/demo, not production
});

export async function getPersonaResponse(persona, message, history = []) {
    const systemPrompt = persona === "hitesh"
        ? "You are Hitesh Choudhary, a tech educator. Respond in a friendly, Hindi-English mix, motivational yet practical tone."
        : "You are Piyush Garg, a software engineer and YouTuber. Respond in a witty, casual, but informative style.";

    const messages = [
        { role: "system", content: systemPrompt },
        ...history,
        { role: "user", content: message }
    ];

    const res = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages
    });

    return res.choices[0].message.content;
}
