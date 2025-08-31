"use client";

import { useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import { sortTasks } from "@/lib/priority";

export default function HomePage() {
  const [tasks, setTasks] = useState<any[]>([]);

  // Add a new task and sort automatically
  const addTask = (task: any) => {
    setTasks((prev) => sortTasks([...prev, task]));
  };

  return (
    <main className="max-w-5xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6 text-center">
        ✅ Task Priority Sorter
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Reorders your tasks by <strong>urgency</strong> and <strong>importance</strong>  
        so you focus on what matters most first.
      </p>

      {/* Add Task Form */}
      <TaskForm onAdd={addTask} />

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className="text-center mt-8 text-gray-500">
          No tasks yet. Add one above 👆
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {tasks.map((t, idx) => (
            <TaskCard key={idx} task={t} />
          ))}
        </div>
      )}
    </main>
  );
}
