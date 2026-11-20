import { geteapi } from './local.js';

export async function generatePlan(prompt) {
    const apiKey = geteapi();
    if (!apiKey) throw new Error("API key manquante");

    const response = await fetch("[https://api.groq.com/openai/v1/chat/completions](https://api.groq.com/openai/v1/chat/completions)", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "openai/gpt-oss-120b",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        })
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error("Erreur API Groq : " + (err.error?.message || response.status));
    }
    
    const data = await response.json();
    const plan = JSON.parse(data.choices[0].message.content);
    
    if (!plan.projectName || !plan.tasks) throw new Error("Plan invalide");

    localStorage.setItem("papa", JSON.stringify(plan));
    localStorage.setItem("tasks", JSON.stringify(plan.tasks));

    return plan;
}