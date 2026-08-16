import { Clock, Wrench, Package, AlertTriangle, ArrowUpRight } from 'lucide-react'
import type { Screen } from '../types'
import { RECLAMOS } from '../data'
import { StatCard, PrioridadBadge } from '../components'

export default function DashboardTecnico({ navigate }: { navigate: (s: Screen, id?: string) => void }) {
  const misOrdenes = RECLAMOS.filter(r => r.tecnico === 'Diego Vargas')
  const pendientesDiag = misOrdenes.filter(r => r.estado === 'En Diagnóstico')
  const enReparacion = misOrdenes.filter(r => r.estado === 'En Taller')
  const listos = misOrdenes.filter(r => r.estado === 'Reparado')

  const prioridadOrden = { Alta: 0, Media: 1, Baja: 2 }
  const hoy = [...pendientesDiag, ...enReparacion].sort((a, b) => prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad])

  const estadoColor: Record<string, string> = {
    'En Diagnóstico': 'bg-orange-50 text-orange-700 border-orange-200',
    'En Taller': 'bg-amber-50 text-amber-700 border-amber-200',
    'Reparado': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  }

  return (
    <div className="p-7 max-w-[1200px] mx-auto">
      <div className="flex items-start justify-between mb-7">
        <div>
          <p className="text-xs text-slate-400 font-medium mb-0.5">Viernes 15 agosto, 2026</p>
          <h1 className="text-2xl font-bold text-slate-800">Hola, Diego</h1>
          <p className="text-sm text-slate-500 mt-0.5">San José Centro · Técnico de Taller</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Mis órdenes asignadas" value={misOrdenes.length} accent="blue" />
        <StatCard label="Pendientes diagnóstico" value={pendientesDiag.length} sub="Sin iniciar" accent="gold" />
        <StatCard label="En reparación" value={enReparacion.length} accent="amber" />
        <StatCard label="Listas para entrega" value={listos.length} accent="green" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Mis casos de hoy */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-surface-2 shadow-sm">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-surface-2">
              <Wrench size={15} className="text-gollo-red" />
              <h2 className="font-semibold text-slate-700 text-sm">Mis casos de hoy</h2>
              <span className="ml-auto text-xs text-slate-400">{hoy.length} activos</span>
            </div>
            {hoy.some(r => r.prioridad === 'Alta') && (
              <div className="mx-5 mt-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3">
                <AlertTriangle size={17} className="text-red-600" />
                <div className="flex-1"><p className="text-sm font-semibold text-red-800">Atención prioritaria</p><p className="text-xs text-red-600">Hay un caso de prioridad alta pendiente de diagnóstico.</p></div>
              </div>
            )}
            <div className="divide-y divide-surface-2">
              {hoy.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">Sin órdenes para hoy</div>
              ) : (
                hoy.map(r => (
                  <button
                    key={r.id}
                    onClick={() => navigate('orden-servicio', r.id)}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:bg-surface transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-surface-2 flex-shrink-0">
                      <Package size={18} className="text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-xs text-slate-400">{r.id}</span>
                        <PrioridadBadge prioridad={r.prioridad} />
                      </div>
                      <p className="text-sm font-semibold text-slate-800 truncate">{r.producto}</p>
                      <p className="text-xs text-slate-500">{r.cliente} · {r.motivo}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${estadoColor[r.estado] ?? 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                        {r.estado}
                      </span>
                      <div className="flex items-center gap-1 mt-1.5 justify-end">
                        <Clock size={11} className="text-slate-300" />
                        <span className="text-xs text-slate-400">
                          {r.id === 'GR-2026-00428' ? '5 días' : '1 día'}
                        </span>
                      </div>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-service">Abrir orden <ArrowUpRight size={11} /></span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar panels */}
        <div className="space-y-4">
          {/* Todas las órdenes */}
          <div className="bg-white rounded-xl border border-surface-2 shadow-sm">
            <div className="px-5 py-4 border-b border-surface-2">
              <h2 className="font-semibold text-slate-700 text-sm">Todas mis órdenes</h2>
            </div>
            <div className="divide-y divide-surface-2">
              {misOrdenes.map(r => (
                <button
                  key={r.id}
                  onClick={() => navigate('orden-servicio', r.id)}
                  className="w-full flex items-center justify-between px-5 py-3 hover:bg-surface transition-all text-left"
                >
                  <div>
                    <p className="font-mono text-xs text-slate-400">{r.id}</p>
                    <p className="text-sm font-medium text-slate-700 truncate max-w-[160px]">{r.producto}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${estadoColor[r.estado] ?? 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                    {r.estado}
                  </span>
                </button>
              ))}
              {misOrdenes.length === 0 && (
                <div className="py-8 text-center text-slate-400 text-sm">Sin órdenes asignadas</div>
              )}
            </div>
          </div>

          {/* Resumen rápido */}
          <div className="bg-white rounded-xl border border-surface-2 shadow-sm p-5">
            <h2 className="font-semibold text-slate-700 text-sm mb-3">Resumen rápido</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400" />
                  <span className="text-sm text-slate-600">Pendiente diagnóstico</span>
                </div>
                <span className="font-bold text-slate-800">{pendientesDiag.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-sm text-slate-600">En reparación</span>
                </div>
                <span className="font-bold text-slate-800">{enReparacion.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-sm text-slate-600">Lista para entrega</span>
                </div>
                <span className="font-bold text-slate-800">{listos.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
