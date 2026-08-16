import { useState } from 'react'
import { Eye, EyeOff, Shield } from 'lucide-react'
import type { Role, Screen } from '../types'

export default function Login({ navigate, setRole }: {
  navigate: (s: Screen) => void
  setRole: (r: Role) => void
}) {
  const [email, setEmail] = useState('asesor@gollo.demo')
  const [password, setPassword] = useState('demo123')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [demoRole, setDemoRole] = useState<Role>('asesor')

  const handleLogin = () => {
    if (email !== roleEmails[demoRole] || password !== 'demo123') {
      setError('Credenciales incorrectas. Use el correo del perfil seleccionado y demo123.')
      return
    }
    setError('')
    setRole(demoRole)
    const screens: Record<Role, Screen> = {
      asesor: 'dashboard-asesor',
      tecnico: 'dashboard-tecnico',
      admin: 'dashboard-admin',
    }
    navigate(screens[demoRole])
  }

  const roleEmails: Record<Role, string> = {
    asesor: 'asesor@gollo.demo',
    tecnico: 'tecnico@gollo.demo',
    admin: 'admin@gollo.demo',
  }

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: 'linear-gradient(135deg, #1A2332 0%, #243047 50%, #2d3d5c 100%)',
      }}
    >
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12">
        <img src="/gollo-respaldo-logo.png" alt="Gollo Respaldo" className="w-72 h-28 object-contain object-left" />

        <div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Gestión de reclamos<br />
            <span style={{ color: '#C9911E' }}>y garantías</span>
          </h1>
          <p className="text-slate-300 text-base leading-relaxed max-w-sm">
            Plataforma centralizada para el seguimiento de reclamos, órdenes de servicio técnico
            y validación de garantías de toda la red Gollo.
          </p>

          <div className="mt-8 space-y-3">
            {[
              { icon: '📋', text: 'Registro y seguimiento de reclamos' },
              { icon: '🛡', text: 'Validación automática de garantías' },
              { icon: '🔧', text: 'Gestión de órdenes de servicio técnico' },
              { icon: '📊', text: 'Indicadores y reportes en tiempo real' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                <span className="text-slate-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-500 text-xs">© 2026 Gollo · Solución interna de servicio técnico</p>
      </div>

      {/* Right panel — login form */}
      <div className="w-full lg:w-[440px] bg-white flex items-center justify-center p-8 shadow-2xl">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <img src="/gollo-respaldo-logo.png" alt="Gollo Respaldo" className="w-56 h-20 object-contain object-left mb-8 lg:hidden" />

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Iniciar sesión</h2>
            <p className="text-slate-500 text-sm mt-1">Acceda con sus credenciales institucionales</p>
          </div>

          {/* Demo role selector */}
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs font-semibold text-amber-700 mb-2 flex items-center gap-1.5">
              <Shield size={12} />
              Modo demo — seleccione un perfil
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(['asesor', 'tecnico', 'admin'] as Role[]).map(r => (
                <button
                  key={r}
                  onClick={() => { setDemoRole(r); setEmail(roleEmails[r]) }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all capitalize ${
                    demoRole === r
                      ? 'bg-gollo-red text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-gollo-red'
                  }`}
                >
                  {r === 'asesor' ? 'Asesor' : r === 'tecnico' ? 'Técnico' : 'Admin'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Correo institucional</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gollo-red/30 focus:border-gollo-red transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 pr-10 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gollo-red/30 focus:border-gollo-red transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 accent-gollo-red"
                />
                <span className="text-xs text-slate-600">Recordarme</span>
              </label>
              <button className="text-xs text-gollo-red hover:underline font-medium">
                ¿Olvidó su contraseña?
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-2.5 bg-gollo-red hover:bg-gollo-red-dark text-white font-semibold text-sm rounded-lg transition-all"
            >
              Iniciar sesión
            </button>
            {error && <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}
            <p className="text-xs text-slate-400 text-center">Contraseña demo: <strong className="text-slate-600">demo123</strong></p>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            ¿Problemas para acceder?{' '}
            <button className="text-gollo-red hover:underline font-medium">Contactar soporte</button>
          </p>
        </div>
      </div>
    </div>
  )
}
