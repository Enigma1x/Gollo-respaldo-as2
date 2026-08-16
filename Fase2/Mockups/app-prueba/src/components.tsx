import type { ReclamoEstado, Prioridad } from './types'

export function Badge({ estado }: { estado: ReclamoEstado }) {
  const map: Record<ReclamoEstado, { label: string; cls: string }> = {
    'Registrado': { label: 'Registrado', cls: 'bg-slate-100 text-slate-700 border-slate-200' },
    'Garantía validada': { label: '✓ Garantía validada', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
    'Ingresado': { label: 'Ingresado', cls: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    'En Taller': { label: '⚙ En Taller', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
    'En Diagnóstico': { label: '🔍 En Diagnóstico', cls: 'bg-orange-50 text-orange-700 border-orange-200' },
    'Reparado': { label: '✓ Reparado', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    'Entregado': { label: '✓ Entregado', cls: 'bg-green-50 text-green-700 border-green-200' },
    'Cerrado': { label: 'Cerrado', cls: 'bg-gray-100 text-gray-500 border-gray-200' },
    'Escalado': { label: '⚠ Escalado', cls: 'bg-red-50 text-red-700 border-red-200' },
  }
  const { label, cls } = map[estado] ?? { label: estado, cls: 'bg-gray-100 text-gray-600 border-gray-200' }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {label}
    </span>
  )
}

export function PrioridadBadge({ prioridad }: { prioridad: Prioridad | string }) {
  const map: Record<string, string> = {
    Alta: 'bg-red-50 text-red-700 border-red-200',
    Media: 'bg-amber-50 text-amber-700 border-amber-200',
    Baja: 'bg-slate-50 text-slate-600 border-slate-200',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${map[prioridad] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      {prioridad}
    </span>
  )
}

export function StatCard({
  label,
  value,
  sub,
  accent = 'slate',
}: {
  label: string
  value: string | number
  sub?: string
  accent?: 'red' | 'gold' | 'blue' | 'green' | 'slate' | 'amber'
}) {
  const accents: Record<string, string> = {
    red: 'border-l-gollo-red',
    gold: 'border-l-gollo-gold',
    blue: 'border-l-blue-service',
    green: 'border-l-emerald-500',
    slate: 'border-l-slate-400',
    amber: 'border-l-amber-500',
  }
  return (
    <div className={`bg-white rounded-xl border border-surface-2 border-l-4 ${accents[accent]} p-5 shadow-sm`}>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  )
}

export function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold text-slate-800">{title}</h1>
      {sub && <p className="text-sm text-slate-500 mt-0.5">{sub}</p>}
    </div>
  )
}

export function Breadcrumb({ items }: { items: string[] }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span>/</span>}
          <span className={i === items.length - 1 ? 'text-slate-600 font-medium' : ''}>{item}</span>
        </span>
      ))}
    </div>
  )
}

export function EmptyState({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <p className="font-semibold text-slate-700">{title}</p>
      <p className="text-sm text-slate-400 mt-1">{desc}</p>
    </div>
  )
}

export function Btn({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled,
  type,
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
}) {
  const vars: Record<string, string> = {
    primary: 'bg-gollo-red hover:bg-gollo-red-dark text-white',
    secondary: 'bg-white hover:bg-surface border border-surface-2 text-slate-700',
    ghost: 'bg-transparent hover:bg-surface text-slate-600',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    gold: 'bg-gollo-gold hover:opacity-90 text-white',
  }
  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-sm',
  }
  return (
    <button
      type={type ?? 'button'}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 font-semibold rounded-lg transition-all ${vars[variant]} ${sizes[size]} disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}

export function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required,
  readonly,
}: {
  label: string
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  type?: string
  required?: boolean
  readonly?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">
        {label}{required && <span className="text-gollo-red ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readonly}
        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gollo-red/30 focus:border-gollo-red transition-all read-only:bg-surface read-only:text-slate-500"
      />
    </div>
  )
}

export function Select({
  label,
  options,
  value,
  onChange,
  required,
}: {
  label: string
  options: string[]
  value?: string
  onChange?: (v: string) => void
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">
        {label}{required && <span className="text-gollo-red ml-0.5">*</span>}
      </label>
      <select
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-gollo-red/30 focus:border-gollo-red transition-all"
      >
        <option value="">Seleccionar...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

export function Textarea({
  label,
  placeholder,
  value,
  onChange,
  rows = 3,
  required,
}: {
  label: string
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  rows?: number
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">
        {label}{required && <span className="text-gollo-red ml-0.5">*</span>}
      </label>
      <textarea
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gollo-red/30 focus:border-gollo-red transition-all resize-none"
      />
    </div>
  )
}
