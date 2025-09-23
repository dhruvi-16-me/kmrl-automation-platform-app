"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Invoices", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Reports", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Policies", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Manuals", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Circulars", value: 8, color: "hsl(var(--chart-5))" },
]

export function DocumentTypesChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
