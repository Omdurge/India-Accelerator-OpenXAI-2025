"use client";

import React, { useState } from "react";
import { Task } from "@/lib/priority";

type Props = {
  onAdd: (task: Task) => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [urgency, setUrgency] = useState(1);
  const [importance, setImportance] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAI = async () => {
    if (!title.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: title }),
      });
      const data = await res.json();
      setUrgency(data.urgency);
      setImportance(data.importance);
    } catch (err) {
      console.error("AI failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      id: Date.now().toString(),
      title,
      urgency,
      importance,
    });

    setTitle("");
    setUrgency(1);
    setImportance(1);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Task title"
        className="border p-2 w-full rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex gap-2 items-center">
        <label>
          Urgency:
          <input
            type="number"
            min={1}
            max={5}
            value={urgency}
            onChange={(e) => setUrgency(Number(e.target.value))}
            className="border ml-2 p-1 w-16"
          />
        </label>

        <label>
          Importance:
          <input
            type="number"
            min={1}
            max={5}
            value={importance}
            onChange={(e) => setImportance(Number(e.target.value))}
            className="border ml-2 p-1 w-16"
          />
        </label>

        <button
          type="button"
          onClick={handleAI}
          disabled={loading}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          {loading ? "Analyzing..." : "Suggest with AI"}
        </button>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
}
