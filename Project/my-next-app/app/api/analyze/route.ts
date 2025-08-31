import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { task } = await req.json();

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3:latest", // or "mistral"
        prompt: `Analyze this task and ONLY return valid JSON.
Task: "${task}"
Rules:
- Return nothing except JSON.
- JSON must have two integers: urgency (1-5) and importance (1-5).

Example:
{ "urgency": 5, "importance": 3 }`,
      }),
    });

    // 🟢 Fix: Ollama returns NDJSON stream, so we must read line by line
    const reader = response.body?.getReader();
    let output = "";

    if (reader) {
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        if (value) {
          const chunk = decoder.decode(value);
          try {
            const json = JSON.parse(chunk);
            if (json.response) output += json.response;
          } catch {
            // Ignore partial JSON errors
          }
        }
        done = streamDone;
      }
    }

    // 🟢 Now parse the final output
    let urgency = 3;
    let importance = 3;

    try {
      const parsed = JSON.parse(output.trim());
      urgency = parsed.urgency ?? 3;
      importance = parsed.importance ?? 3;
    } catch (err) {
      console.warn("⚠️ Ollama returned non-JSON:", output);
    }

    return NextResponse.json({ urgency, importance });
  } catch (err) {
    console.error("❌ API Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
