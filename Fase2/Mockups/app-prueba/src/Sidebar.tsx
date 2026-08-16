import {
  LayoutDashboard, FileText, Wrench, Users, ShieldCheck,
  Bell, BarChart3, UserCog, Settings, LogOut, ChevronRight
} from 'lucide-react'
import type { Role, Screen } from './types'
import { USUARIOS_ACTIVOS } from './data'

interface NavItem {
  label: string
  screen: Screen
  icon: React.ReactNode
  roles: Role[]
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', screen: 'dashboard-asesor', icon: <LayoutDashboard size={16} />, roles: ['asesor'] },
  { label: 'Dashboard', screen: 'dashboard-tecnico', icon: <LayoutDashboard size={16} />, roles: ['tecnico'] },
  { label: 'Dashboard', screen: 'dashboard-admin', icon: <LayoutDashboard size={16} />, roles: ['admin'] },
  { label: 'Reclamos', screen: 'lista-reclamos', icon: <FileText size={16} />, roles: ['asesor', 'admin'] },
  { label: 'Servicio Técnico', screen: 'orden-servicio', icon: <Wrench size={16} />, roles: ['tecnico', 'admin'] },
  { label: 'Clientes', screen: 'clientes', icon: <Users size={16} />, roles: ['asesor', 'admin'] },
  { label: 'Garantías', screen: 'garantias', icon: <ShieldCheck size={16} />, roles: ['asesor', 'admin'] },
  { label: 'Notificaciones', screen: 'notificaciones', icon: <Bell size={16} />, roles: ['asesor', 'tecnico', 'admin'] },
  { label: 'Casos Escalados', screen: 'casos-escalados', icon: <ShieldCheck size={16} />, roles: ['admin'] },
  { label: 'Reportes', screen: 'dashboard-admin', icon: <BarChart3 size={16} />, roles: ['admin'] },
  { label: 'Usuarios y Permisos', screen: 'usuarios-roles', icon: <UserCog size={16} />, roles: ['admin'] },
]

export default function Sidebar({
  role, screen, navigate, open, close,
}: {
  role: Role
  screen: Screen
  navigate: (s: Screen) => void
  open: boolean
  close: () => void
}) {
  const user = USUARIOS_ACTIVOS[role]
  const roleLabel = role === 'asesor' ? 'Asesor de Tienda' : role === 'tecnico' ? 'Técnico de Taller' : 'Administrador'

  const dashboardScreen: Screen = role === 'asesor' ? 'dashboard-asesor' : role === 'tecnico' ? 'dashboard-tecnico' : 'dashboard-admin'

  const items = NAV_ITEMS.filter(item => {
    if (!item.roles.includes(role)) return false
    if (item.screen === 'dashboard-asesor' || item.screen === 'dashboard-tecnico' || item.screen === 'dashboard-admin') {
      return item.screen === dashboardScreen
    }
    return true
  })

  const isActive = (item: NavItem) => {
    if (screen === item.screen) return true
    if (item.screen === dashboardScreen && screen === dashboardScreen) return true
    return false
  }

  return (<><button aria-label="Cerrar menú" onClick={close} className={`fixed inset-0 bg-black/40 z-40 lg:hidden ${open?'block':'hidden'}`}/>
    <aside className={`w-60 min-h-screen flex flex-col fixed lg:sticky top-0 z-50 lg:z-20 transition-transform ${open?'translate-x-0':'-translate-x-full lg:translate-x-0'}`} style={{ backgroundColor: '#1A2332' }}>
      {/* Logo */}
      <div className="px-4 py-4 border-b" style={{ borderColor: '#243047' }}>
        <img src="/gollo-respaldo-logo.png" alt="Gollo Respaldo" className="w-full h-14 object-contain" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {items.map((item) => {
          const active = isActive(item)
          return (
            <button
              key={item.screen + item.label}
              onClick={() => navigate(item.screen)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left group ${
                active
                  ? 'bg-gollo-red text-white'
                  : 'text-slate-300 hover:bg-navy-light hover:text-white'
              }`}
              style={!active ? {} : undefined}
            >
              <span className={active ? 'text-white' : 'text-slate-400 group-hover:text-white'}>
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight size={12} className="opacity-70" />}
            </button>
          )
        })}
      </nav>

      {/* User info */}
      <div className="px-3 py-4 border-t" style={{ borderColor: '#243047' }}>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1" style={{ backgroundColor: '#243047' }}>
          <div className="w-8 h-8 rounded-full bg-gollo-red flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">
              {user.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">{user.nombre}</p>
            <p className="text-slate-400 text-xs truncate">{roleLabel}</p>
          </div>
        </div>
        <button
          onClick={() => navigate('login')}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-red-300 hover:bg-navy-light transition-all"
        >
          <LogOut size={14} />
          Cerrar sesión
        </button>
      </div>
    </aside></>
  )
}
