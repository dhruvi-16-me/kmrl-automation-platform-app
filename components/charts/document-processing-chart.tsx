"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { day: "Mon", documents: 186, processed: 180, errors: 6 },
  { day: "Tue", documents: 205, processed: 198, errors: 7 },
  { day: "Wed", documents: 237, processed: 230, errors: 7 },
  { day: "Thu", documents: 198, processed: 195, errors: 3 },
  { day: "Fri", documents: 278, processed: 270, errors: 8 },
  { day: "Sat", documents: 156, processed: 152, errors: 4 },
  { day: "Sun", documents: 247, processed: 243, errors: 4 },
]

export function DocumentProcessingChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="day" className="text-xs fill-muted-foreground" />
          <YAxis className="text-xs fill-muted-foreground" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
          <Line
            type="monotone"
            dataKey="documents"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            name="Total Documents"
          />
          <Line
            type="monotone"
            dataKey="processed"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            name="Successfully Processed"
          />
          <Line
            type="monotone"
            dataKey="errors"
            stroke="hsl(var(--destructive))"
            strokeWidth={2}
            name="Processing Errors"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
