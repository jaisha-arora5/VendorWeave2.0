import { AppSidebar } from "../../components/app-sidebar"
import { ChartAreaInteractive } from "../../components/chart-area-interactive"
import { DataTable } from "../../components/data-table"
import { SiteHeader } from "../../components/site-header"
import { SummaryKPI } from "../../components/ui/summary-kpi"
import { TopPerformers } from "../../components/top-performers"
import { Card, CardContent } from "../../components/ui/card"

import {
  SidebarInset,
  SidebarProvider,
} from "../../components/ui/sidebar"

import data from "../../app/dashboard/data.json"

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        {/* MAIN DASHBOARD CONTENT */}
        <main className="flex flex-1 justify-center bg-slate-50/50 dark:bg-black">
          <div className="w-full max-w-[1400px] px-4 py-6 space-y-6 lg:px-8">

            {/* --- TOP SECTION GRID (3 Columns Total) --- */}
            {/* items-stretch ensures the Right Column matches the Left Column's total height */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                
                {/* === LEFT SIDE (Takes 2 Columns) === */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    
                    {/* 1. Top Cards Row (Overview + Top Vendors) */}
                    {/* CHANGED: Removed h-[240px]. Used min-h-[320px] to ensure all 4 list items fit comfortably */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[320px]">
                        <div className="h-full">
                           <SummaryKPI />
                        </div>
                        <div className="h-full">
                            <TopPerformers />
                        </div>
                    </div>

                    {/* 2. Graph (Stacked Below Cards) */}
                    {/* gap-6 in the parent 'flex-col' above creates the space between this graph and the cards */}
                    <div className="w-full rounded-xl overflow-hidden h-[450px]">
                        <ChartAreaInteractive />
                    </div>
                </div>

                {/* === RIGHT SIDE (Takes 1 Column) === */}
                {/* 3. Blank Card (Spans full height of the left side content) */}
                <div className="lg:col-span-1 h-full">
                    <Card className="h-full w-full shadow-md border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-center text-slate-400">
                        <CardContent>
                            Blank Card (Widgets)
                        </CardContent>
                    </Card>
                </div>

            </div>

            {/* --- BOTTOM ROW: TABLE (Intact) --- */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 lg:p-6 shadow-sm">
              <DataTable data={data} />
            </div>

          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}