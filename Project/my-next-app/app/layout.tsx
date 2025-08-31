import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
title: "Task Priority Sorter",
description: "Prioritize tasks by urgency & importance",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body>
<div style={{ maxWidth: 960, margin: "0 auto", padding: "24px" }}>
<h1>🧭 Task Priority Sorter</h1>
{children}
</div>
</body>
</html>
);
}