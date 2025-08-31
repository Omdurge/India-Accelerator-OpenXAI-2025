export default function PriorityBadge({ urgency, importance }: { urgency: number; importance: number }) {
  let color = "bg-gray-300 text-black";
  const score = urgency + importance;

  if (score >= 8) color = "bg-red-500 text-white";
  else if (score >= 6) color = "bg-orange-500 text-white";
  else if (score >= 4) color = "bg-yellow-400 text-black";
  else color = "bg-green-400 text-black";

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-lg ${color}`}>
      ⏱ {urgency} | ⭐ {importance}
    </span>
  );
}
