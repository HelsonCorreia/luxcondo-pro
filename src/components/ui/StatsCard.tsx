import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  iconBg?: string
  iconColor?: string
  label: string
  value: string
  subtitle?: string
  trend?: string
  trendUp?: boolean
}

export function StatsCard({ icon: Icon, iconBg = 'bg-blue-50', iconColor = 'text-primary', label, value, subtitle, trend, trendUp }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card hover:shadow-card-hover transition-all">
      <div className="flex justify-between items-start mb-3">
        <div className={`${iconBg} ${iconColor} w-12 h-12 rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  )
}
