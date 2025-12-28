"use client"

import * as React from "react"
import { Line, LineChart, Area, CartesianGrid, XAxis, YAxis } from "recharts"
import { cn } from "../lib/utils"

import { useIsMobile } from "../hooks/use-mobile"
import {
  Card,
  CardContent,
  CardHeader,
} from "../components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../components/ui/toggle-group"

// --- 1. DATA GENERATOR (Unchanged) ---
const generateDailyData = (baseHealth: number, basePoints: number) => {
  const data = []
  const startDate = new Date("2024-04-01")
  
  for (let i = 0; i < 90; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    
    const noiseHealth = Math.floor(Math.random() * 5) - 2
    const noisePoints = Math.floor(Math.random() * 20) - 10
    const trend = Math.sin(i / 10) * 2 

    data.push({
      date: currentDate.toISOString().split('T')[0],
      healthScore: Math.max(50, Math.min(100, baseHealth + noiseHealth + trend)),
      points: Math.max(200, basePoints + noisePoints + (trend * 5)),
    })
  }
  return data
}

// --- 2. HARDCODED DATA (Unchanged) ---
const firmsData: Record<string, { name: string; vendors: Record<string, { name: string; data: any[] }> }> = {
  "alpha_corp": {
    name: "Alpha Corp",
    vendors: {
      "vendor_alpha": { name: "Vendor Alpha", data: generateDailyData(82, 420) },
      "vendor_alpha_2": { name: "Alpha Logistics", data: generateDailyData(75, 380) },
    }
  },
  "nimbus_ltd": {
    name: "Nimbus Ltd",
    vendors: {
      "vendor_beta": { name: "Vendor Beta", data: generateDailyData(75, 380) },
    }
  },
  "orion_group": {
    name: "Orion Group",
    vendors: {
      "vendor_gamma": { name: "Vendor Gamma", data: generateDailyData(88, 450) },
    }
  },
  "vertex_inc": {
    name: "Vertex Inc",
    vendors: {
      "vendor_delta": { name: "Vendor Delta", data: generateDailyData(68, 320) },
    }
  }
}

// --- 3. CONFIG & COLORS (UPDATED PALETTE) ---
const chartConfig = {
  visitors: { label: "Metrics" },
  // Muted Emerald (Sophisticated Green)
  healthScore: { label: "Health Score", color: "hsl(160, 60%, 45%)" }, 
  // Deep Royal Blue (Professional Blue)
  points: { label: "Points", color: "hsl(220, 70%, 50%)" }, 
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  
  // State
  const [selectedFirm, setSelectedFirm] = React.useState("alpha_corp")
  const [selectedVendor, setSelectedVendor] = React.useState("vendor_alpha")
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) setTimeRange("30d")
  }, [isMobile])

  const handleFirmChange = (value: string) => {
    setSelectedFirm(value)
    const firstVendorOfFirm = Object.keys(firmsData[value].vendors)[0]
    setSelectedVendor(firstVendorOfFirm)
  }

  // --- DATA FILTERING ---
  const fullData = firmsData[selectedFirm].vendors[selectedVendor]?.data || []
  const filteredData = fullData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") daysToSubtract = 30
    else if (timeRange === "15d") daysToSubtract = 15
    else if (timeRange === "7d") daysToSubtract = 7

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  // --- KPI & Date Range Calculations ---
  const currentData = filteredData[filteredData.length - 1] || { healthScore: 0, points: 0 }
  const startDateStr = filteredData[0]?.date ? new Date(filteredData[0].date).toLocaleDateString("en-US", { day: 'numeric', month: 'long' }) : "";
  const endDateStr = filteredData[filteredData.length - 1]?.date ? new Date(filteredData[filteredData.length - 1].date).toLocaleDateString("en-US", { day: 'numeric', month: 'long' }) : "";
  const dateRangeStr = startDateStr && endDateStr ? `${startDateStr} - ${endDateStr}` : "";

  // Calculate Y-Axis Domain
  const allValues = filteredData.flatMap(d => [d.healthScore, d.points]);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const yDomain = [Math.floor(minValue * 0.95), Math.ceil(maxValue * 1.05)];

  return (
    <Card className="@container/card w-full h-full shadow-lg border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden flex flex-col">
      {/* HEADER: Made padding tighter (pt-4 pb-2) to save space */}
      <CardHeader className="pb-2 pt-4 px-6 space-y-2 shrink-0">
        
        {/* ROW 1: KPI, Date, Legend & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
                {/* Main KPI Value */}
                <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
                    {Math.round(currentData.healthScore)}%
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    {dateRangeStr}
                </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
                {/* Time Toggles */}
                <ToggleGroup type="single" value={timeRange} onValueChange={(v) => v && setTimeRange(v)} className="bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
                    {['90d', '30d', '15d'].map((range) => (
                        <ToggleGroupItem key={range} value={range} className="h-6 px-2 text-[10px] font-medium data-[state=on]:bg-white dark:data-[state=on]:bg-slate-700 data-[state=on]:text-slate-900 dark:data-[state=on]:text-slate-50 data-[state=on]:shadow-sm transition-all">
                            {range === '90d' ? '3 Months' : range === '30d' ? '30 Days' : '15 Days'}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>

                {/* Legend */}
                <div className="flex items-center gap-3 text-xs font-medium text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chartConfig.healthScore.color }}></div>
                        Health Score
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chartConfig.points.color }}></div>
                        Points
                    </div>
                </div>
            </div>
        </div>

        {/* ROW 2: Selectors */}
        <div className="flex items-center gap-2 pt-1">
            <Select value={selectedFirm} onValueChange={handleFirmChange}>
                <SelectTrigger className="w-[130px] h-8 text-xs rounded-md bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm" aria-label="Select Firm">
                    <SelectValue placeholder="Select Firm" />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(firmsData).map(([key, firm]) => (
                        <SelectItem key={key} value={key}>{firm.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                <SelectTrigger className="w-[130px] h-8 text-xs rounded-md bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm" aria-label="Select Vendor">
                    <SelectValue placeholder="Select Vendor" />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(firmsData[selectedFirm].vendors).map(([key, vendor]) => (
                        <SelectItem key={key} value={key}>{vendor.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

      </CardHeader>

      {/* CHART CONTENT */}
      <CardContent className="px-4 pb-4 flex-1 min-h-0">
        <ChartContainer config={chartConfig} className="aspect-auto h-[260px] w-full">
          <LineChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartConfig.healthScore.color} stopOpacity={0.2} />
                <stop offset="100%" stopColor={chartConfig.healthScore.color} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="pointsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartConfig.points.color} stopOpacity={0.1} />
                <stop offset="100%" stopColor={chartConfig.points.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.6} />
            
            <YAxis 
                domain={yDomain}
                tickLine={false} 
                axisLine={false} 
                tickMargin={10}
                width={35} 
                className="text-[10px] text-slate-400 font-medium"
                tickFormatter={(value) => `${value}`}
            />

            <XAxis 
                dataKey="date" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={10} 
                minTickGap={50}
                className="text-[10px] text-slate-400 font-medium"
                tickFormatter={(val) => new Date(val).toLocaleDateString("en-US", { month: "short" })}
            />

            <ChartTooltip 
                cursor={{ stroke: "#94a3b8", strokeWidth: 1, strokeDasharray: "4 4" }} 
                content={
                    <ChartTooltipContent 
                        labelFormatter={(v) => new Date(v).toLocaleDateString("en-US", { month: "long", day: "numeric" })} 
                        className="bg-white/95 backdrop-blur-sm shadow-xl border-slate-100 rounded-lg"
                    />
                } 
            />

            <Area type="monotone" dataKey="healthScore" stroke="none" fill="url(#healthGradient)" />
            <Area type="monotone" dataKey="points" stroke="none" fill="url(#pointsGradient)" />

            <Line
              dataKey="points"
              type="monotone"
              stroke={chartConfig.points.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Line
              dataKey="healthScore"
              type="monotone"
              stroke={chartConfig.healthScore.color}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}