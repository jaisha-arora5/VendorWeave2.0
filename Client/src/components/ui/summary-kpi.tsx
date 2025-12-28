import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { TrendingUp, Users, Building2 } from "lucide-react"

export function SummaryKPI() {
  return (
    <Card className="h-full shadow-md border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-700 dark:text-slate-200">
          Platform Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        
        {/* Metric 1: Total Firms */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Firms</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">124</h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-lg">
            <TrendingUp className="w-4 h-4" />
            <span>+12%</span>
          </div>
        </div>

        {/* Metric 2: Total Vendors */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-teal-100 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Vendors</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">1,892</h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-lg">
            <TrendingUp className="w-4 h-4" />
            <span>+8.4%</span>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}