// src/api/openai.js
import OpenAI from "openai";
import { personas } from "../data/personas";

const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Only for hackathon/demo
});

export async function getPersonaResponse(personaKey, message, history = []) {
    const persona = personas[personaKey];

    const messages = [
        { role: "system", content: persona.systemPrompt },
        ...persona.examples, // Add few-shot examples
        ...history,
        { role: "user", content: message }
    ];

    const res = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages
    });

    return res.choices[0].message.content;
}
