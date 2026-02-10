import { Link } from 'react-router-dom'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'outline'
  href?: string
  to?: string
  onClick?: () => void
  className?: string
}

export default function Button({
  children,
  variant = 'primary',
  href,
  to,
  onClick,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer'
  const variants = {
    primary:
      'bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/10',
    outline:
      'border-2 border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
