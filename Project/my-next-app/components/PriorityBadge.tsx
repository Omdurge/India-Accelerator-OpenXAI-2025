import { Quadrant } from "@/lib/priority";


export default function PriorityBadge({ quadrant }: { quadrant: Quadrant }) {
const colors: Record<Quadrant, string> = {
"Do First": "#ef4444",
"Schedule": "#3b82f6",
"Delegate": "#10b981",
"Eliminate": "#6b7280",
};
return (
<span style={{ background: colors[quadrant], color: "white", padding: "2px 8px", borderRadius: 8 }}>
{quadrant}
</span>
);
}