import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  icon?: ReactNode
}

const variants = {
  primary: 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg active:scale-95',
  secondary: 'bg-blue-50 text-primary hover:bg-blue-100 active:scale-95',
  outline: 'border border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95',
  ghost: 'text-gray-600 hover:bg-gray-100 active:scale-95',
  danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md active:scale-95',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({ variant = 'primary', size = 'md', children, icon, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </button>
  )
}
