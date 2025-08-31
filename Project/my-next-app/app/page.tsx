"use client";
import { useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskTable from "@/components/TaskTable";
import { ScoredTask } from "@/lib/priority";
import ScoreLegend from "@/components/ScoreLegend";


export default function Page() {
const [tasks, setTasks] = useState<ScoredTask[]>([]);


return (
<div>
<TaskForm onAdd={(t) => setTasks([...tasks, t])} />
<TaskTable tasks={tasks} />
<ScoreLegend />
</div>
);
}