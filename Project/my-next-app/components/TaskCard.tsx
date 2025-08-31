import PriorityBadge from "./PriorityBadge";
import { getQuadrant } from "@/lib/priority";

export default function TaskCard({ task }: { task: any }) {
  return (
    <div className="p-4 rounded-2xl shadow bg-white border flex flex-col gap-2 hover:shadow-md transition">
      {/* Task Text */}
      <h3 className="font-medium text-lg">{task.text}</h3>

      {/* Footer with priority + quadrant */}
      <div className="flex justify-between items-center text-sm">
        <PriorityBadge urgency={task.urgency} importance={task.importance} />
        <span className="italic text-gray-500">
          {getQuadrant(task.urgency, task.importance)}
        </span>
      </div>
    </div>
  );
}
