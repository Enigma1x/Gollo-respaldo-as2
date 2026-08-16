import { useState } from 'react'
import { Search, Filter, Plus } from 'lucide-react'
import type { Screen } from '../types'
import { RECLAMOS } from '../data'
import { Badge, PrioridadBadge, Breadcrumb, Btn } from '../components'

export default function ListaReclamos({ navigate }: { navigate: (s: Screen, id?: string) => void }) {
  const [search, setSearch] = useState('')
  const [filterEstado, setFilterEstado] = useState('')
  const [filterPrioridad, setFilterPrioridad] = useState('')
  const [filterSucursal, setFilterSucursal] = useState('')

  const filtered = RECLAMOS.filter(r => {
    const q = search.toLowerCase()
    const matchSearch = !q || r.id.toLowerCase().includes(q) || r.cliente.toLowerCase().includes(q) || r.producto.toLowerCase().includes(q)
    const matchEstado = !filterEstado || r.estado === filterEstado
    const matchPrioridad = !filterPrioridad || r.prioridad === filterPrioridad
    const matchSucursal = !filterSucursal || r.sucursal === filterSucursal
    return matchSearch && matchEstado && matchPrioridad && matchSucursal
  })

  return (
    <div className="p-7">
      <Breadcrumb items={['Dashboard', 'Reclamos']} />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Reclamos</h1>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length} resultados</p>
        </div>
        <Btn variant="primary" onClick={() => navigate('registrar-reclamo')}>
          <Plus size={15} />
          Nuevo reclamo
        </Btn>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-surface-2 shadow-sm mb-4 p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por N.º, cliente o producto..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gollo-red/30 focus:border-gollo-red transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
          </div>
          <select
            value={filterEstado}
            onChange={e => setFilterEstado(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gollo-red/30"
          >
            <option value="">Todos los estados</option>
            {['Registrado', 'Garantía validada', 'Ingresado', 'En Taller', 'En Diagnóstico', 'Reparado', 'Entregado', 'Escalado', 'Cerrado'].map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
          <select
            value={filterPrioridad}
            onChange={e => setFilterPrioridad(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gollo-red/30"
          >
            <option value="">Todas las prioridades</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
          <select
            value={filterSucursal}
            onChange={e => setFilterSucursal(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-gollo-red/30"
          >
            <option value="">Todas las sucursales</option>
            {['San José Centro', 'Curridabat', 'Heredia', 'Liberia', 'Cartago'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {(search || filterEstado || filterPrioridad || filterSucursal) && (
            <button
              onClick={() => { setSearch(''); setFilterEstado(''); setFilterPrioridad(''); setFilterSucursal('') }}
              className="text-xs text-gollo-red hover:underline font-medium"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-surface-2 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-2 bg-surface">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">N.º Reclamo</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Cliente</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Producto</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Estado</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Técnico</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Sucursal</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Prioridad</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Fecha</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-2">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-surface transition-all">
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => navigate('detalle-reclamo', r.id)}
                      className="font-mono text-xs text-gollo-red hover:underline font-semibold"
                    >
                      {r.id}
                    </button>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-slate-800">{r.cliente}</p>
                    <p className="text-xs text-slate-400">{r.cedula}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-slate-700">{r.producto}</p>
                    <p className="font-mono text-xs text-slate-400">{r.serie}</p>
                  </td>
                  <td className="px-4 py-3.5"><Badge estado={r.estado} /></td>
                  <td className="px-4 py-3.5 text-slate-600">{r.tecnico || <span className="text-slate-300">—</span>}</td>
                  <td className="px-4 py-3.5 text-slate-600 text-xs">{r.sucursal}</td>
                  <td className="px-4 py-3.5"><PrioridadBadge prioridad={r.prioridad} /></td>
                  <td className="px-4 py-3.5 text-slate-500 text-xs whitespace-nowrap">{r.fechaRegistro}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => navigate('detalle-reclamo', r.id)}
                        className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-surface hover:bg-surface-2 rounded-lg transition-all border border-surface-2"
                      >
                        Ver
                      </button>
                      {r.estado === 'Registrado' && (
                        <button
                          onClick={() => navigate('validar-garantia')}
                          className="px-2.5 py-1 text-xs font-medium text-blue-service bg-blue-service-light hover:bg-blue-100 rounded-lg transition-all"
                        >
                          Validar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-slate-400 text-sm">
                    No se encontraron reclamos con los filtros seleccionados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
