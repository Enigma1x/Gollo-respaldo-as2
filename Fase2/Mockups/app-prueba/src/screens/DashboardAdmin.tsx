import { useState } from 'react'
import type { Screen } from '../types'
import { RECLAMOS, SUCURSALES } from '../data'
import { StatCard, Breadcrumb } from '../components'

const BAR_DATA = [
  { label: 'Lun', value: 8 },
  { label: 'Mar', value: 12 },
  { label: 'Mié', value: 7 },
  { label: 'Jue', value: 15 },
  { label: 'Vie', value: 10 },
  { label: 'Sáb', value: 5 },
  { label: 'Dom', value: 2 },
]

const TECNICO_DATA = [
  { nombre: 'Diego Vargas', ordenes: 8, completadas: 5, tasa: 62 },
  { nombre: 'Luis Cascante', ordenes: 6, completadas: 5, tasa: 83 },
  { nombre: 'Andrés Fonseca', ordenes: 5, completadas: 5, tasa: 100 },
]

const SUCURSAL_DATA = [
  { nombre: 'San José Centro', total: 18, pct: 45 },
  { nombre: 'Curridabat', total: 8, pct: 20 },
  { nombre: 'Heredia', total: 7, pct: 17 },
  { nombre: 'Liberia', total: 4, pct: 10 },
  { nombre: 'Cartago', total: 3, pct: 8 },
]

const ESTADO_DATA = [
  { label: 'En Taller', count: 2, color: '#D97706' },
  { label: 'En Diagnóstico', count: 1, color: '#EA580C' },
  { label: 'Escalado', count: 1, color: '#DC2626' },
  { label: 'Reparado', count: 1, color: '#16A34A' },
  { label: 'Entregado', count: 1, color: '#059669' },
  { label: 'Cerrado', count: 1, color: '#94A3B8' },
]
const totalEstados = ESTADO_DATA.reduce((a, b) => a + b.count, 0)

export default function DashboardAdmin({ navigate }: { navigate: (s: Screen) => void }) {
  const [periodo, setPeriodo] = useState('semana')

  const abiertos = RECLAMOS.filter(r => !['Cerrado', 'Entregado'].includes(r.estado))
  const escalados = RECLAMOS.filter(r => r.estado === 'Escalado')
  const cerrados = RECLAMOS.filter(r => ['Cerrado', 'Entregado'].includes(r.estado))
  const maxBar = Math.max(...BAR_DATA.map(d => d.value))

  return (
    <div className="p-7 max-w-[1300px] mx-auto">
      <Breadcrumb items={['Dashboard', 'Administrador']} />
      <div className="flex items-start justify-between mb-7">
        <div>
          <p className="text-xs text-slate-400 font-medium mb-0.5">Viernes 15 agosto, 2026</p>
          <h1 className="text-2xl font-bold text-slate-800">Panel administrativo</h1>
          <p className="text-sm text-slate-500 mt-0.5">Mariana Solano · San José Centro</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={periodo}
            onChange={e => setPeriodo(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none"
          >
            <option value="semana">Esta semana</option>
            <option value="mes">Este mes</option>
            <option value="trimestre">Este trimestre</option>
          </select>
          <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none">
            <option value="">Todas las sucursales</option>
            {SUCURSALES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-7">
        <StatCard label="Reclamos abiertos" value={abiertos.length} accent="red" />
        <StatCard label="Tiempo prom. atención" value="4.2d" sub="Días hábiles" accent="blue" />
        <StatCard label="Casos escalados" value={escalados.length} sub="Pendientes" accent="amber" />
        <StatCard label="Por vencer" value="2" sub="Próximos 7 días" accent="gold" />
        <StatCard label="Finalizados" value={cerrados.length} sub="Este mes" accent="green" />
        <StatCard label="Total reclamos" value={RECLAMOS.length} sub="Historial" accent="slate" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        {/* Evolución semanal */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-surface-2 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-slate-700 text-sm">Evolución de reclamos</h2>
            <span className="text-xs text-slate-400">semana actual</span>
          </div>
          <div className="flex items-end gap-2 h-36">
            {BAR_DATA.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-slate-500">{d.value}</span>
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{
                    height: `${(d.value / maxBar) * 100}%`,
                    backgroundColor: d.label === 'Jue' ? '#C41E3A' : '#EBF0F8',
                  }}
                />
                <span className="text-xs text-slate-400">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Estado donut */}
        <div className="bg-white rounded-xl border border-surface-2 shadow-sm p-5">
          <h2 className="font-semibold text-slate-700 text-sm mb-5">Reclamos por estado</h2>
          <div className="flex justify-center mb-4">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {(() => {
                  let offset = 0
                  return ESTADO_DATA.map((item, i) => {
                    const pct = (item.count / totalEstados) * 100
                    const el = (
                      <circle
                        key={i}
                        cx="18" cy="18" r="15.915"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="3.5"
                        strokeDasharray={`${pct} ${100 - pct}`}
                        strokeDashoffset={-offset}
                      />
                    )
                    offset += pct
                    return el
                  })
                })()}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800">{totalEstados}</p>
                  <p className="text-xs text-slate-400">total</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            {ESTADO_DATA.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-600">{item.label}</span>
                </div>
                <span className="text-xs font-semibold text-slate-700">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Productividad técnicos */}
        <div className="bg-white rounded-xl border border-surface-2 shadow-sm p-5">
          <h2 className="font-semibold text-slate-700 text-sm mb-5">Productividad por técnico</h2>
          <div className="space-y-4">
            {TECNICO_DATA.map(t => (
              <div key={t.nombre}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-700 font-medium">{t.nombre}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{t.completadas}/{t.ordenes}</span>
                    <span className="text-xs font-bold text-slate-700">{t.tasa}%</span>
                  </div>
                </div>
                <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${t.tasa}%`,
                      backgroundColor: t.tasa === 100 ? '#16A34A' : t.tasa >= 75 ? '#4A6FA5' : '#C41E3A',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reclamos por sucursal */}
        <div className="bg-white rounded-xl border border-surface-2 shadow-sm p-5">
          <h2 className="font-semibold text-slate-700 text-sm mb-5">Reclamos por sucursal</h2>
          <div className="space-y-3">
            {SUCURSAL_DATA.map(s => (
              <div key={s.nombre}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-700">{s.nombre}</span>
                  <span className="text-xs font-semibold text-slate-600">{s.total}</span>
                </div>
                <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-service transition-all"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick link to escalados */}
      {escalados.length > 0 && (
        <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 text-base">⚠</span>
            </div>
            <div>
              <p className="font-semibold text-red-700 text-sm">
                {escalados.length} caso{escalados.length > 1 ? 's' : ''} escalado{escalados.length > 1 ? 's' : ''} requiere{escalados.length > 1 ? 'n' : ''} atención
              </p>
              <p className="text-xs text-red-500 mt-0.5">Garantías no procedentes pendientes de resolución administrativa</p>
            </div>
          </div>
          <button
            onClick={() => navigate('casos-escalados')}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-all"
          >
            Revisar →
          </button>
        </div>
      )}
    </div>
  )
}
