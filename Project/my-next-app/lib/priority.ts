export type Quadrant = "Do First" | "Schedule" | "Delegate" | "Eliminate";
export type TaskInput = {
id: string;
title: string;
dueDate?: string;
importance: number; // 1–5
impact?: number;
effort?: number;
notes?: string;
createdAt: string;
};
export type ScoredTask = TaskInput & {
urgency: number;
quadrant: Quadrant;
score: number;
};


function daysUntil(dateISO?: string): number | undefined {
if (!dateISO) return undefined;
const now = new Date();
const tgt = new Date(dateISO);
const diff = tgt.getTime() - now.getTime();
return Math.ceil(diff / (1000 * 60 * 60 * 24));
}


function urgencyFromDue(due?: string) {
const d = daysUntil(due);
if (d === undefined) return 3;
if (d <= 0) return 5;
if (d <= 3) return 4;
if (d <= 7) return 3;
if (d <= 14) return 2;
return 1;
}


function quadrantOf(imp: number, urg: number): Quadrant {
if (imp >= 4 && urg >= 4) return "Do First";
if (imp >= 4) return "Schedule";
if (urg >= 4) return "Delegate";
return "Eliminate";
}


export function scoreTask(t: TaskInput): ScoredTask {
const urgency = urgencyFromDue(t.dueDate);
const impact = t.impact ?? t.importance;
const effort = t.effort ?? 3;


const score =
t.importance * 4 + urgency * 3 + impact * 2 - effort * 1;


return { ...t, urgency, quadrant: quadrantOf(t.importance, urgency), score };
}


export function sortTasks(list: ScoredTask[]) {
return [...list].sort((a, b) => b.score - a.score);
}