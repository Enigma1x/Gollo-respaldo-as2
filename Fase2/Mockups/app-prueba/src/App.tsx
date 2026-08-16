import { useState } from 'react'
import type { Role, Screen } from './types'
import Sidebar from './Sidebar'
import Login from './screens/Login'
import DashboardAsesor from './screens/DashboardAsesor'
import RegistrarReclamo from './screens/RegistrarReclamo'
import ValidarGarantia from './screens/ValidarGarantia'
import ListaReclamos from './screens/ListaReclamos'
import DetalleReclamo from './screens/DetalleReclamo'
import DashboardTecnico from './screens/DashboardTecnico'
import OrdenServicio from './screens/OrdenServicio'
import PortalCliente from './screens/PortalCliente'
import CasosEscalados from './screens/CasosEscalados'
import DashboardAdmin from './screens/DashboardAdmin'
import UsuariosRoles from './screens/UsuariosRoles'
import { Bell, Menu, Monitor } from 'lucide-react'
import { USUARIOS_ACTIVOS } from './data'
import { Clientes, Garantias, Notificaciones } from './screens/OperationalScreens'

const STANDALONE_SCREENS: Screen[] = ['login', 'portal-cliente']

function Header({ role, navigate, openMenu }: { role: Role; navigate: (s: Screen) => void; openMenu:()=>void }) {
  const user = USUARIOS_ACTIVOS[role]
  const roleLabel = role === 'asesor' ? 'Asesor' : role === 'tecnico' ? 'Técnico' : 'Administrador'

  return (
    <header className="h-14 bg-white border-b border-surface-2 flex items-center px-5 gap-4 sticky top-0 z-30 shadow-sm">
      <button className="lg:hidden p-2 rounded-lg hover:bg-surface" onClick={openMenu} aria-label="Abrir menú"><Menu size={19}/></button><div className="flex-1" />
      <div className="flex items-center gap-1">
        <button className="p-2 rounded-lg hover:bg-surface text-slate-400 hover:text-slate-600 transition-all relative">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gollo-red rounded-full" />
        </button>
        <button
          onClick={() => navigate('portal-cliente')}
          className="p-2 rounded-lg hover:bg-surface text-slate-400 hover:text-slate-600 transition-all"
          title="Portal cliente"
        >
          <Monitor size={17} />
        </button>
      </div>
      <div className="flex items-center gap-2.5 pl-3 border-l border-surface-2">
        <div className="w-8 h-8 rounded-full bg-gollo-red flex items-center justify-center">
          <span className="text-white text-xs font-bold">
            {user.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </span>
        </div>
        <div className="hidden sm:block">
          <p className="text-xs font-semibold text-slate-700 leading-none">{user.nombre}</p>
          <p className="text-xs text-slate-400 leading-none mt-0.5">{roleLabel}</p>
        </div>
      </div>
    </header>
  )
}

function RoleSwitcher({ role, setRole, navigate }: {
  role: Role
  setRole: (r: Role) => void
  navigate: (s: Screen) => void
}) {
  const roles: { r: Role; label: string; screen: Screen }[] = [
    { r: 'asesor', label: 'Asesor', screen: 'dashboard-asesor' },
    { r: 'tecnico', label: 'Técnico', screen: 'dashboard-tecnico' },
    { r: 'admin', label: 'Admin', screen: 'dashboard-admin' },
  ]

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-xl border border-surface-2 shadow-lg p-3 z-50">
      <p className="text-xs text-slate-400 mb-2 font-semibold px-1">Cambiar perfil demo</p>
      <div className="flex gap-1.5">
        {roles.map(({ r, label, screen }) => (
          <button
            key={r}
            onClick={() => { setRole(r); navigate(screen) }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              role === r
                ? 'bg-gollo-red text-white'
                : 'bg-surface text-slate-600 hover:bg-surface-2'
            }`}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => navigate('portal-cliente')}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-surface text-slate-600 hover:bg-surface-2 transition-all"
        >
          Portal
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('login')
  const [role, setRole] = useState<Role>('asesor')
  const [reclamoId, setReclamoId] = useState<string | null>(null)
  const [menuOpen,setMenuOpen]=useState(false)

  const navigate = (s: Screen, id?: string) => {
    setScreen(s)
    if (id !== undefined) setReclamoId(id)
  }

  const isStandalone = STANDALONE_SCREENS.includes(screen)

  if (screen === 'login') {
    return (
      <Login
        navigate={navigate}
        setRole={setRole}
      />
    )
  }

  if (screen === 'portal-cliente') {
    return (
      <div>
        <PortalCliente />
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => navigate(role === 'asesor' ? 'dashboard-asesor' : role === 'tecnico' ? 'dashboard-tecnico' : 'dashboard-admin')}
            className="px-4 py-2 bg-navy text-white text-xs font-semibold rounded-xl shadow-lg hover:bg-navy-light transition-all"
          >
            ← Volver al sistema interno
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar role={role} screen={screen} navigate={(s)=>{navigate(s);setMenuOpen(false)}} open={menuOpen} close={()=>setMenuOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header role={role} navigate={navigate} openMenu={()=>setMenuOpen(true)} />

        <main className="flex-1 overflow-auto">
          {screen === 'dashboard-asesor' && <DashboardAsesor navigate={navigate} />}
          {screen === 'registrar-reclamo' && <RegistrarReclamo navigate={navigate} />}
          {screen === 'validar-garantia' && <ValidarGarantia navigate={navigate} />}
          {screen === 'lista-reclamos' && <ListaReclamos navigate={navigate} />}
          {screen === 'detalle-reclamo' && <DetalleReclamo navigate={navigate} reclamoId={reclamoId} />}
          {screen === 'dashboard-tecnico' && <DashboardTecnico navigate={navigate} />}
          {screen === 'orden-servicio' && <OrdenServicio navigate={navigate} reclamoId={reclamoId} />}
          {screen === 'casos-escalados' && <CasosEscalados navigate={navigate} />}
          {screen === 'dashboard-admin' && <DashboardAdmin navigate={navigate} />}
          {screen === 'usuarios-roles' && <UsuariosRoles />}
          {screen === 'clientes' && <Clientes />}
          {screen === 'garantias' && <Garantias />}
          {screen === 'notificaciones' && <Notificaciones />}
        </main>
      </div>

      <RoleSwitcher role={role} setRole={setRole} navigate={navigate} />
    </div>
  )
}
