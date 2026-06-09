import Anthropic from "@anthropic-ai/sdk";

// dangerouslyAllowBrowser is required for client-side usage.
// In production, proxy this through a backend to keep the key server-side.
const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getMotivation(habitName, streak) {
  const streakContext =
    streak > 1
      ? `They're on a ${streak}-day streak!`
      : streak === 1
      ? "That's their first day of a new streak!"
      : "They completed it for the first time today!";

  const message = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 80,
    messages: [
      {
        role: "user",
        content: `A user just completed their habit: "${habitName}". ${streakContext} Write one short celebratory message (max 20 words). Be specific to the habit name. Warm and genuine, no hashtags or emojis. Reply with only the message.`,
      },
    ],
  });

  return message.content[0].text.trim();
}
