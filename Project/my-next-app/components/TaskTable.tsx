"use client";
import PriorityBadge from "./PriorityBadge";
import { ScoredTask, sortTasks } from "@/lib/priority";


export default function TaskTable({ tasks }: { tasks: ScoredTask[] }) {
const sorted = sortTasks(tasks);


return (
<table border={1} cellPadding={6} style={{ marginTop: 12, width: "100%" }}>
<thead>
<tr>
<th>Title</th>
<th>Due</th>
<th>Importance</th>
<th>Urgency</th>
<th>Quadrant</th>
<th>Score</th>
</tr>
</thead>
<tbody>
{sorted.map((t) => (
<tr key={t.id}>
<td>{t.title}</td>
<td>{t.dueDate ?? "—"}</td>
<td>{t.importance}</td>
<td>{t.urgency}</td>
<td><PriorityBadge quadrant={t.quadrant} /></td>
<td>{t.score}</td>
</tr>
))}
</tbody>
</table>
);
}