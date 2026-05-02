'use client'

import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
}

const VARIANTS = {
  primary:   'bg-brand-green text-white border-brand-green hover:bg-green-800 active:bg-green-900',
  secondary: 'bg-brand-gold text-brand-dark border-brand-gold hover:bg-yellow-600 active:bg-yellow-700',
  danger:    'bg-red-600 text-white border-red-600 hover:bg-red-700 active:bg-red-800',
  ghost:     'bg-transparent text-brand-green border-brand-green hover:bg-brand-light active:bg-green-100',
}

const SIZES = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${fullWidth ? 'w-full' : ''}
        font-semibold border-2 rounded-xl
        transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      {loading && (
        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}
