"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { department: "Engineering", avgTime: 3.2, target: 5.0 },
  { department: "Finance", avgTime: 4.8, target: 5.0 },
  { department: "HR", avgTime: 2.1, target: 3.0 },
  { department: "Safety", avgTime: 6.2, target: 7.0 },
  { department: "Compliance", avgTime: 5.5, target: 6.0 },
]

export function ProcessingTimeChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="department" className="text-xs fill-muted-foreground" />
          <YAxis
            className="text-xs fill-muted-foreground"
            label={{ value: "Minutes", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
          <Legend />
          <Bar dataKey="avgTime" fill="hsl(var(--primary))" name="Average Time" radius={[4, 4, 0, 0]} />
          <Bar dataKey="target" fill="hsl(var(--muted))" name="Target Time" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
