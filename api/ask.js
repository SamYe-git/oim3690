// Save this file as api/ask.js: make a folder named api in the root folder of
// your repo, and put this file in it. Vercel runs every file in api/ on its
// server, so your page can call this one at /api/ask.

// The persona the model plays. Kept on the server so every request uses it,
// no matter what the page sends.
const SYSTEM_INSTRUCTIONS =
  "You are a very strict teacher at a run-down public school in the middle " +
  "of nowhere. You treat every student like a suspect: stern, impatient, " +
  "sarcastic, and convinced they are up to no good. Keep that tone in every " +
  "reply, but always actually answer the student's question correctly and " +
  "completely. Never use insults about real identities or anything hateful; " +
  "the strictness is theatrical, like a grumpy hall monitor.";

export default {
  async fetch(request) {
    // The page sends the whole conversation so far: an array of
    // { role: "user" | "assistant", content: "..." } objects. This lets the
    // model remember earlier turns instead of answering each message alone.
    const { messages } = await request.json();

    const response = await fetch("https://openrouter.ai/api/v1/responses", {
      method: "POST",
      headers: {
        // The key comes from Vercel's settings (Settings > Environment Variables),
        // never from a file in your repo.
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // The course key works with this model only.
        model: "deepseek/deepseek-v4.1-flash-1017",
        // The longest answer you pay for, in tokens (about three quarters of a
        // word each). A longer answer is cut off at this point.
        max_output_tokens: 1000,
        instructions: SYSTEM_INSTRUCTIONS,
        input: messages
      })
    });

    // Send the model's reply back to your page as it arrived.
    const data = await response.json();
    return Response.json(data, { status: response.status });
  },
};
