import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-gray-100 shadow-card ${hover ? 'hover:shadow-card-hover hover:-translate-y-0.5 transition-all cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
