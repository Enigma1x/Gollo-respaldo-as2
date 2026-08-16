import { Plus, Search, AlertTriangle, Clock } from 'lucide-react'
import type { Screen } from '../types'
import { RECLAMOS } from '../data'
import { StatCard, Badge, PrioridadBadge } from '../components'

export default function DashboardAsesor({ navigate }: { navigate: (s: Screen, id?: string) => void }) {
  const abiertos = RECLAMOS.filter(r => !['Cerrado', 'Entregado'].includes(r.estado))
  const pendientesValidacion = RECLAMOS.filter(r => r.estado === 'Registrado')
  const enTaller = RECLAMOS.filter(r => ['En Taller', 'En Diagnóstico'].includes(r.estado))
  const escalados = RECLAMOS.filter(r => r.estado === 'Escalado')

  const recientes = RECLAMOS.slice(0, 5)

  return (
    <div className="p-7 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <p className="text-xs text-slate-400 font-medium mb-0.5">Viernes 15 agosto, 2026</p>
          <h1 className="text-2xl font-bold text-slate-800">Buenos días, Carlos</h1>
          <p className="text-sm text-slate-500 mt-0.5">San José Centro · Asesor de Tienda</p>
        </div>
        <button
          onClick={() => navigate('registrar-reclamo')}
          className="flex items-center gap-2 px-5 py-2.5 bg-gollo-red hover:bg-gollo-red-dark text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-gollo-red/20"
        >
          <Plus size={16} />
          Registrar reclamo
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-7">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar por N.º de reclamo, cliente, cédula o número de serie..."
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gollo-red/30 focus:border-gollo-red transition-all"
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Reclamos abiertos" value={abiertos.length} sub="Estado activo" accent="red" />
        <StatCard label="Pendientes validación" value={pendientesValidacion.length} sub="Sin garantía revisada" accent="gold" />
        <StatCard label="En servicio técnico" value={enTaller.length} sub="Taller activo" accent="blue" />
        <StatCard label="Casos escalados" value={escalados.length} sub="Esperando admin" accent="amber" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-surface-2 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-surface-2">
              <h2 className="font-semibold text-slate-700 text-sm">Reclamos recientes</h2>
              <button
                onClick={() => navigate('lista-reclamos')}
                className="text-xs text-gollo-red hover:underline font-medium"
              >
                Ver todos
              </button>
            </div>
            <div className="divide-y divide-surface-2">
              {recientes.map(r => (
                <button
                  key={r.id}
                  onClick={() => navigate('detalle-reclamo', r.id)}
                  className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-surface transition-all text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-xs text-slate-400">{r.id}</span>
                      <PrioridadBadge prioridad={r.prioridad} />
                    </div>
                    <p className="text-sm font-semibold text-slate-800 truncate">{r.cliente}</p>
                    <p className="text-xs text-slate-500 truncate">{r.producto} · {r.sucursal}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge estado={r.estado} />
                    <p className="text-xs text-slate-400 mt-1">{r.fechaActualizacion}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Side panels */}
        <div className="space-y-4">
          {/* Próximos a vencer */}
          <div className="bg-white rounded-xl border border-surface-2 shadow-sm">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-surface-2">
              <Clock size={14} className="text-amber-500" />
              <h2 className="font-semibold text-slate-700 text-sm">Próximos a vencer</h2>
            </div>
            <div className="divide-y divide-surface-2">
              {[
                { id: 'GR-2026-00415', cliente: 'Mario Jiménez', dias: 18 },
                { id: 'GR-2026-00441', cliente: 'Patricia Vega', dias: 45 },
              ].map(item => (
                <div key={item.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="font-mono text-xs text-slate-400">{item.id}</p>
                    <p className="text-sm text-slate-700 font-medium">{item.cliente}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${item.dias <= 20 ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                    {item.dias}d
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Escalados */}
          {escalados.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-red-200">
                <AlertTriangle size={14} className="text-red-500" />
                <h2 className="font-semibold text-red-700 text-sm">Casos escalados</h2>
              </div>
              <div className="divide-y divide-red-100">
                {escalados.map(r => (
                  <button
                    key={r.id}
                    onClick={() => navigate('detalle-reclamo', r.id)}
                    className="w-full flex items-center justify-between px-5 py-3 hover:bg-red-100/50 transition-all text-left"
                  >
                    <div>
                      <p className="font-mono text-xs text-red-400">{r.id}</p>
                      <p className="text-sm text-red-700 font-medium">{r.cliente}</p>
                    </div>
                    <span className="text-xs text-red-500 font-medium">Ver →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div className="bg-white rounded-xl border border-surface-2 shadow-sm p-5">
            <h2 className="font-semibold text-slate-700 text-sm mb-3">Acciones rápidas</h2>
            <div className="space-y-2">
              <button
                onClick={() => navigate('registrar-reclamo')}
                className="w-full flex items-center gap-2.5 px-3 py-2 bg-gollo-red-light hover:bg-red-100 text-gollo-red rounded-lg text-sm font-medium transition-all"
              >
                <Plus size={14} />
                Registrar nuevo reclamo
              </button>
              <button
                onClick={() => navigate('validar-garantia')}
                className="w-full flex items-center gap-2.5 px-3 py-2 bg-blue-service-light hover:bg-blue-100 text-blue-service rounded-lg text-sm font-medium transition-all"
              >
                <span className="text-xs">🛡</span>
                Validar garantía
              </button>
              <button
                onClick={() => navigate('lista-reclamos')}
                className="w-full flex items-center gap-2.5 px-3 py-2 bg-surface hover:bg-surface-2 text-slate-600 rounded-lg text-sm font-medium transition-all"
              >
                <span className="text-xs">📋</span>
                Ver todos los reclamos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
