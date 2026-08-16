import { useState } from 'react'
import { AlertTriangle, Clock, CheckCircle, X } from 'lucide-react'
import type { Screen } from '../types'
import { RECLAMOS } from '../data'
import { Breadcrumb, Btn, Textarea } from '../components'

export default function CasosEscalados({ navigate }: { navigate: (s: Screen, id?: string) => void }) {
  const escalados = RECLAMOS.filter(r => r.estado === 'Escalado')
  const [selected, setSelected] = useState<string | null>(null)
  const [resolucion, setResolucion] = useState('')
  const [resolved, setResolved] = useState(false)

  const caso = RECLAMOS.find(r => r.id === selected)

  return (
    <div className="p-7 max-w-[1100px] mx-auto">
      <Breadcrumb items={['Dashboard', 'Casos escalados']} />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Casos escalados</h1>
          <p className="text-sm text-slate-500 mt-0.5">{escalados.length} caso{escalados.length !== 1 ? 's' : ''} pendiente{escalados.length !== 1 ? 's' : ''} de resolución</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-surface-2 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-surface-2 bg-red-50">
              <AlertTriangle size={14} className="text-red-500" />
              <h2 className="font-semibold text-red-700 text-sm">Requieren atención</h2>
            </div>
            <div className="divide-y divide-surface-2">
              {escalados.map(r => (
                <button
                  key={r.id}
                  onClick={() => { setSelected(r.id); setResolved(false); setResolucion('') }}
                  className={`w-full flex flex-col gap-1 px-5 py-4 text-left transition-all ${selected === r.id ? 'bg-gollo-red-light' : 'hover:bg-surface'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400">{r.id}</span>
                    <span className="text-xs text-red-500 font-semibold flex items-center gap-1">
                      <Clock size={11} />
                      {r.id === 'GR-2026-00431' ? '3 días' : '8 días'}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{r.cliente}</p>
                  <p className="text-xs text-slate-500 truncate">{r.producto}</p>
                  <p className="text-xs text-slate-400 truncate">Asesor: {r.asesor}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs bg-red-50 border border-red-200 text-red-600 px-2 py-0.5 rounded-full font-medium">
                      Escalado
                    </span>
                    <span className="text-xs text-slate-400">{r.fechaRegistro}</span>
                  </div>
                </button>
              ))}
              {escalados.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-sm">No hay casos escalados</div>
              )}
            </div>
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {caso && !resolved ? (
            <div className="bg-white rounded-xl border border-surface-2 shadow-sm">
              <div className="px-6 py-5 border-b border-surface-2">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-mono text-sm text-slate-400">{caso.id}</p>
                    <h2 className="font-bold text-slate-800">{caso.cliente}</h2>
                  </div>
                </div>
              </div>

              <div className="px-6 py-5 space-y-5">
                {/* Antecedentes */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Antecedentes del caso</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                    <div><span className="text-slate-400">Producto</span><p className="font-medium text-slate-700">{caso.producto}</p></div>
                    <div><span className="text-slate-400">Serie</span><p className="font-mono text-slate-700">{caso.serie}</p></div>
                    <div><span className="text-slate-400">Sucursal</span><p className="font-medium text-slate-700">{caso.sucursal}</p></div>
                    <div><span className="text-slate-400">Asesor</span><p className="font-medium text-slate-700">{caso.asesor}</p></div>
                    <div><span className="text-slate-400">Fecha reclamo</span><p className="font-medium text-slate-700">{caso.fechaRegistro}</p></div>
                  </div>

                  {/* Motivo de escalamiento */}
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-red-700 mb-1">Motivo del escalamiento</p>
                        <p className="text-sm text-red-600">{caso.motivoEscalamiento}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registrar resolución */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Registrar resolución</h3>
                  <Textarea
                    label="Resolución del administrador"
                    value={resolucion}
                    onChange={setResolucion}
                    rows={4}
                    placeholder="Describa la decisión tomada: si se aprueba cobertura especial, si se rechaza definitivamente, acuerdo con el cliente, etc."
                    required
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Btn variant="primary" onClick={() => setResolved(true)} disabled={!resolucion}>
                    <CheckCircle size={14} />
                    Registrar resolución y cerrar
                  </Btn>
                  <Btn variant="secondary">
                    Notificar al cliente
                  </Btn>
                  <Btn variant="ghost" onClick={() => navigate('detalle-reclamo', caso.id)}>
                    Ver detalle completo
                  </Btn>
                </div>
              </div>
            </div>
          ) : resolved ? (
            <div className="bg-white rounded-xl border border-surface-2 shadow-sm p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-emerald-500" />
              </div>
              <h2 className="text-lg font-bold text-slate-800 mb-2">Resolución registrada</h2>
              <p className="text-slate-500 text-sm mb-4">El caso {caso?.id} ha sido resuelto y el cliente será notificado.</p>
              <div className="bg-surface rounded-xl p-4 text-left text-sm mb-5">
                <p className="text-xs text-slate-400 mb-1">Resolución</p>
                <p className="text-slate-700">{resolucion}</p>
              </div>
              <div className="flex gap-3 justify-center">
                <Btn variant="secondary" onClick={() => setSelected(null)}>Ver otros casos</Btn>
                <Btn variant="primary" onClick={() => navigate('dashboard-admin')}>Ir al dashboard</Btn>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-surface-2 shadow-sm flex items-center justify-center h-64">
              <div className="text-center text-slate-400">
                <AlertTriangle size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Seleccione un caso de la lista para revisarlo</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
