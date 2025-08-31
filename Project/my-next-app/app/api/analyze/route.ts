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
        model: "llama3:latest",
        prompt: `You are a task manager assistant.
Task: "${task}"
Return a JSON object with two fields:
urgency (1-5) and importance (1-5).`,
      }),
    });

    const data = await response.json();
    const output = data.response || "";

    let urgency = 3;
    let importance = 3;

    try {
      const parsed = JSON.parse(output);
      urgency = parsed.urgency || 3;
      importance = parsed.importance || 3;
    } catch {
      console.warn("Failed to parse Ollama response:", output);
    }

    return NextResponse.json({ urgency, importance });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
