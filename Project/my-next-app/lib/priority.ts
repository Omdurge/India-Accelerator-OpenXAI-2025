// lib/priority.ts

// Calculate a priority score (importance weighs more than urgency)
export function getPriorityScore(urgency: number, importance: number): number {
  return importance * 10 + urgency;
}

// Sort tasks so that higher priority ones come first
export function sortTasks(tasks: any[]) {
  return [...tasks].sort((a, b) => {
    return getPriorityScore(b.urgency, b.importance) -
           getPriorityScore(a.urgency, a.importance);
  });
}

// Eisenhower Matrix Quadrants
export function getQuadrant(urgency: number, importance: number): string {
  if (importance >= 4 && urgency >= 4) return "Do Now";       // Urgent + Important
  if (importance >= 4 && urgency < 4) return "Plan";          // Important but not urgent
  if (importance < 4 && urgency >= 4) return "Delegate";      // Urgent but not important
  return "Eliminate";                                         // Neither urgent nor important
}
