import { useState } from 'react'
import { Plus, Search, UserCog } from 'lucide-react'
import type { Role } from '../types'
import { USUARIOS } from '../data'
import { Breadcrumb, Btn } from '../components'

const ROL_LABEL: Record<Role, string> = {
  asesor: 'Asesor',
  tecnico: 'Técnico',
  admin: 'Administrador',
}

const ROL_COLOR: Record<Role, string> = {
  asesor: 'bg-blue-service-light text-blue-service border-blue-200',
  tecnico: 'bg-amber-50 text-amber-700 border-amber-200',
  admin: 'bg-gollo-red-light text-gollo-red border-red-200',
}

export default function UsuariosRoles() {
  const [search, setSearch] = useState('')
  const [filterRol, setFilterRol] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = USUARIOS.filter(u => {
    const q = search.toLowerCase()
    const matchSearch = !q || u.nombre.toLowerCase().includes(q) || u.correo.toLowerCase().includes(q)
    const matchRol = !filterRol || u.rol === filterRol
    return matchSearch && matchRol
  })

  return (
    <div className="p-7 max-w-[1100px] mx-auto">
      <Breadcrumb items={['Dashboard', 'Usuarios y permisos']} />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Usuarios y permisos</h1>
          <p className="text-sm text-slate-500 mt-0.5">{USUARIOS.length} usuarios registrados</p>
        </div>
        <Btn variant="primary" onClick={() => setShowModal(true)}>
          <Plus size={15} />
          Crear usuario
        </Btn>
      </div>

      {/* Role legend */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {(['asesor', 'tecnico', 'admin'] as Role[]).map(r => (
          <div key={r} className="bg-white rounded-xl border border-surface-2 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <UserCog size={15} className="text-slate-400" />
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${ROL_COLOR[r]}`}>{ROL_LABEL[r]}</span>
            </div>
            <ul className="text-xs text-slate-500 space-y-0.5">
              {r === 'asesor' && ['Registrar reclamos', 'Validar garantías', 'Ver clientes', 'Escalar casos'].map(p => <li key={p}>• {p}</li>)}
              {r === 'tecnico' && ['Ver órdenes asignadas', 'Registrar diagnóstico', 'Cambiar estado de orden', 'Sin acceso a garantías'].map(p => <li key={p}>• {p}</li>)}
              {r === 'admin' && ['Acceso completo', 'Resolver escalados', 'Gestionar usuarios', 'Ver reportes y KPIs'].map(p => <li key={p}>• {p}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-surface-2 shadow-sm mb-4 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gollo-red/30"
          />
        </div>
        <select
          value={filterRol}
          onChange={e => setFilterRol(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none"
        >
          <option value="">Todos los roles</option>
          <option value="asesor">Asesor</option>
          <option value="tecnico">Técnico</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-surface-2 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-2 bg-surface">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Nombre</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Correo</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Sucursal</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Rol</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Estado</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Último acceso</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-2">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-surface transition-all">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gollo-red flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">
                          {u.nombre.split(' ').slice(0, 2).map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{u.nombre}</p>
                        <p className="text-xs text-slate-400">{u.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600">{u.correo}</td>
                  <td className="px-4 py-3.5 text-slate-600 text-xs">{u.sucursal}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${ROL_COLOR[u.rol]}`}>
                      {ROL_LABEL[u.rol]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      u.estado === 'Activo'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}>
                      {u.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-400 whitespace-nowrap">{u.ultimoAcceso}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex gap-1.5">
                      <button className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-surface hover:bg-surface-2 rounded-lg border border-surface-2 transition-all">
                        Editar
                      </button>
                      <button className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-surface hover:bg-surface-2 rounded-lg border border-surface-2 transition-all">
                        Rol
                      </button>
                      <button className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all ${
                        u.estado === 'Activo'
                          ? 'text-red-500 bg-red-50 border-red-200 hover:bg-red-100'
                          : 'text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
                      }`}>
                        {u.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create user modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-5 border-b border-surface-2">
              <h2 className="font-bold text-slate-800">Crear nuevo usuario</h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre <span className="text-gollo-red">*</span></label>
                  <input type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gollo-red/30" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Apellidos <span className="text-gollo-red">*</span></label>
                  <input type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gollo-red/30" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Correo institucional <span className="text-gollo-red">*</span></label>
                <input type="email" placeholder="usuario@gollo.cr" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gollo-red/30" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Rol <span className="text-gollo-red">*</span></label>
                  <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none">
                    <option value="">Seleccionar...</option>
                    <option value="asesor">Asesor</option>
                    <option value="tecnico">Técnico</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Sucursal <span className="text-gollo-red">*</span></label>
                  <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none">
                    <option value="">Seleccionar...</option>
                    {['San José Centro', 'Curridabat', 'Heredia', 'Liberia', 'Cartago'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-surface transition-all">
                  Cancelar
                </button>
                <button onClick={() => setShowModal(false)} className="flex-1 py-2 bg-gollo-red hover:bg-gollo-red-dark text-white rounded-xl text-sm font-semibold transition-all">
                  Crear usuario
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
