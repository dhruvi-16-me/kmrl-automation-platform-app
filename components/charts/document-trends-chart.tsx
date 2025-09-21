"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { date: "Jan 1", processed: 45, successful: 43, failed: 2 },
  { date: "Jan 5", processed: 67, successful: 65, failed: 2 },
  { date: "Jan 10", processed: 89, successful: 87, failed: 2 },
  { date: "Jan 15", processed: 123, successful: 120, failed: 3 },
  { date: "Jan 20", processed: 156, successful: 152, failed: 4 },
  { date: "Jan 25", processed: 178, successful: 175, failed: 3 },
  { date: "Jan 30", processed: 201, successful: 198, failed: 3 },
]

export function DocumentTrendsChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="date" className="text-xs fill-muted-foreground" />
          <YAxis className="text-xs fill-muted-foreground" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="processed"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            name="Total Processed"
          />
          <Line type="monotone" dataKey="successful" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Successful" />
          <Line type="monotone" dataKey="failed" stroke="hsl(var(--destructive))" strokeWidth={2} name="Failed" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
