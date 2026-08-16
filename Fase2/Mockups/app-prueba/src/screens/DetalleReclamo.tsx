import { useState } from 'react'
import { ArrowLeft, CheckCircle, Clock, AlertTriangle, Bell, Wrench, UserRound, Package, ShieldCheck } from 'lucide-react'
import type { Screen } from '../types'
import { RECLAMOS } from '../data'
import { Badge, PrioridadBadge, Breadcrumb, Btn } from '../components'

const TABS = ['Resumen', 'Cliente', 'Producto y garantía', 'Servicio técnico', 'Diagnóstico', 'Historial', 'Notificaciones']

const TIMELINE_STEPS = [
  { label: 'Registrado', done: true, date: '10/08/2026 09:14', user: 'Carlos Méndez' },
  { label: 'Garantía validada', done: true, date: '10/08/2026 09:22', user: 'Carlos Méndez' },
  { label: 'Ingresado', done: true, date: '10/08/2026 14:30', user: 'Carlos Méndez' },
  { label: 'En Taller', done: true, date: '11/08/2026 08:00', user: 'Diego Vargas' },
  { label: 'Reparado', done: false, date: null, user: null },
  { label: 'Entregado', done: false, date: null, user: null },
  { label: 'Cerrado', done: false, date: null, user: null },
]

export default function DetalleReclamo({
  navigate,
  reclamoId,
}: {
  navigate: (s: Screen, id?: string) => void
  reclamoId: string | null
}) {
  const [tab, setTab] = useState(0)
  const [showActualizarModal, setShowActualizarModal] = useState(false)

  const reclamo = RECLAMOS.find(r => r.id === reclamoId) ?? RECLAMOS[0]

  return (
    <div className="p-7 max-w-[1100px] mx-auto">
      <Breadcrumb items={['Dashboard', 'Reclamos', reclamo.id]} />

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4">
          <button
            onClick={() => navigate('lista-reclamos')}
            className="mt-1 p-1.5 rounded-lg hover:bg-surface text-slate-400 transition-all"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-2xl font-bold text-slate-800">{reclamo.id}</span>
              <Badge estado={reclamo.estado} />
              <PrioridadBadge prioridad={reclamo.prioridad} />
            </div>
            <p className="text-sm text-slate-500">Registrado el {reclamo.fechaRegistro} · Asesor: {reclamo.asesor}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Btn variant="secondary" size="sm">
            <Bell size={13} />
            Notificar
          </Btn>
          <Btn variant="primary" size="sm" onClick={() => setShowActualizarModal(true)}>
            Actualizar estado
          </Btn>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-surface-2 shadow-sm p-5 mb-5">
        <div className="flex items-start gap-0 overflow-x-auto">
          {TIMELINE_STEPS.map((step, i) => (
            <div key={i} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${
                  step.done
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : i === TIMELINE_STEPS.findIndex(s => !s.done)
                    ? 'bg-amber-400 border-amber-400 text-white animate-pulse'
                    : 'bg-white border-slate-200 text-slate-300'
                }`}>
                  {step.done ? <CheckCircle size={14} /> : <Clock size={12} />}
                </div>
                <p className={`text-xs mt-1.5 font-medium whitespace-nowrap ${step.done ? 'text-slate-700' : 'text-slate-300'}`}>
                  {step.label}
                </p>
                {step.date && (
                  <p className="text-xs text-slate-400 mt-0.5 whitespace-nowrap">{step.date.split(' ')[0]}</p>
                )}
              </div>
              {i < TIMELINE_STEPS.length - 1 && (
                <div className={`h-0.5 w-14 mx-1 flex-shrink-0 ${
                  TIMELINE_STEPS[i + 1].done || (i === TIMELINE_STEPS.findIndex(s => !s.done) - 1) ? 'bg-emerald-300' : 'bg-slate-100'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-surface-2 shadow-sm">
        <div className="flex border-b border-surface-2 overflow-x-auto">
          {TABS.map((t, i) => (
            <button
              key={i}
              onClick={() => setTab(i)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                tab === i
                  ? 'border-gollo-red text-gollo-red'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Resumen */}
          {tab === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { icon: UserRound, label: 'Cliente', value: reclamo.cliente },
                  { icon: Package, label: 'Producto', value: reclamo.producto },
                  { icon: ShieldCheck, label: 'Garantía', value: reclamo.garantiaVigente ? 'Vigente' : 'Revisión requerida' },
                  { icon: Wrench, label: 'Técnico asignado', value: reclamo.tecnico || 'Sin asignar' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-xl border border-surface-2 bg-surface/50 p-4">
                    <Icon size={16} className="text-gollo-red mb-2" /><p className="text-xs text-slate-400">{label}</p><p className="text-sm font-semibold text-slate-700 mt-0.5 line-clamp-2">{value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Información general</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-slate-400">Motivo</dt><dd className="font-medium text-slate-700">{reclamo.motivo}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-400">Sucursal</dt><dd className="font-medium text-slate-700">{reclamo.sucursal}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-400">Asesor</dt><dd className="font-medium text-slate-700">{reclamo.asesor}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-400">Técnico</dt><dd className="font-medium text-slate-700">{reclamo.tecnico || '—'}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-400">Garantía</dt><dd>{reclamo.garantiaVigente ? <span className="text-emerald-600 font-semibold">Vigente</span> : <span className="text-red-600 font-semibold">No válida</span>}</dd></div>
                </dl>
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Descripción de la falla</h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-surface rounded-xl p-4">{reclamo.descripcion}</p>
              </div>
              </div>
              <div className="flex gap-3">
                <Btn variant="secondary" size="sm" onClick={() => navigate('orden-servicio', reclamo.id)}>
                  <Wrench size={13} />
                  Ver orden de servicio
                </Btn>
                <Btn variant="secondary" size="sm" onClick={() => navigate('validar-garantia')}>
                  Ver garantía
                </Btn>
              </div>
            </div>
          )}

          {/* Cliente */}
          {tab === 1 && (
            <div className="grid grid-cols-2 gap-4 text-sm max-w-lg">
              <div><p className="text-slate-400 text-xs mb-0.5">Nombre</p><p className="font-semibold text-slate-800">{reclamo.cliente}</p></div>
              <div><p className="text-slate-400 text-xs mb-0.5">Cédula</p><p className="font-medium text-slate-700">{reclamo.cedula}</p></div>
              <div><p className="text-slate-400 text-xs mb-0.5">Teléfono</p><p className="font-medium text-slate-700">{reclamo.telefono}</p></div>
              <div><p className="text-slate-400 text-xs mb-0.5">Correo</p><p className="font-medium text-slate-700">{reclamo.correo}</p></div>
            </div>
          )}

          {/* Producto y garantía */}
          {tab === 2 && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Producto</h3>
                <dl className="space-y-2 text-sm">
                  <div><dt className="text-slate-400 text-xs">Descripción</dt><dd className="font-medium text-slate-700">{reclamo.producto}</dd></div>
                  <div><dt className="text-slate-400 text-xs">Marca</dt><dd className="font-medium text-slate-700">{reclamo.marca}</dd></div>
                  <div><dt className="text-slate-400 text-xs">Modelo</dt><dd className="font-medium text-slate-700">{reclamo.modelo}</dd></div>
                  <div><dt className="text-slate-400 text-xs">Número de serie</dt><dd className="font-mono text-sm text-slate-700">{reclamo.serie}</dd></div>
                </dl>
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Garantía</h3>
                {reclamo.garantiaVigente ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={16} className="text-emerald-600" />
                      <span className="font-semibold text-emerald-700">Garantía vigente</span>
                    </div>
                    <p className="text-sm text-emerald-600">Vence: {reclamo.garantiaVencimiento}</p>
                    <p className="text-sm text-emerald-600">Cobertura: Fallas de funcionamiento</p>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle size={16} className="text-red-500" />
                      <span className="font-semibold text-red-700">Garantía no procede</span>
                    </div>
                    <p className="text-sm text-red-600">{reclamo.motivoEscalamiento}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Historial */}
          {tab === 5 && (
            <div className="space-y-1">
              <p className="text-xs text-slate-400 mb-4 font-medium">Registro inmutable de auditoría</p>
              {[
                { fecha: '14/08/2026', hora: '08:12', usuario: 'Diego Vargas', de: 'Ingresado', a: 'En Taller', obs: 'Equipo ingresado al taller. Compresor con síntomas de falla en gas refrigerante.' },
                { fecha: '10/08/2026', hora: '14:30', usuario: 'Carlos Méndez', de: 'Garantía validada', a: 'Ingresado', obs: 'Equipo recibido físicamente en sucursal.' },
                { fecha: '10/08/2026', hora: '09:22', usuario: 'Carlos Méndez', de: 'Registrado', a: 'Garantía validada', obs: 'Garantía GAR-2025-041922 verificada y aprobada.' },
                { fecha: '10/08/2026', hora: '09:14', usuario: 'Carlos Méndez', de: '—', a: 'Registrado', obs: 'Reclamo creado por el asesor.' },
              ].map((e, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-surface transition-all">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-slate-300 mt-1.5" />
                    {i < 3 && <div className="w-px flex-1 bg-slate-100 mt-1" />}
                  </div>
                  <div className="flex-1 min-w-0 pb-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono text-slate-400">{e.fecha} {e.hora}</span>
                      <span className="text-xs font-semibold text-slate-600">{e.usuario}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{e.de}</span>
                      <span className="text-slate-300 text-xs">→</span>
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">{e.a}</span>
                    </div>
                    {e.obs && <p className="text-sm text-slate-600">{e.obs}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Other tabs placeholder */}
          {(tab === 3 || tab === 4 || tab === 6) && (
            <div className="py-4">
              <div className="rounded-xl border border-surface-2 bg-surface/50 p-5 mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{tab === 6 ? 'Última comunicación' : tab === 4 ? 'Diagnóstico técnico' : 'Orden de servicio'}</p>
                <p className="text-sm font-semibold text-slate-700">{tab === 6 ? 'Actualización de ingreso al taller enviada por correo y SMS.' : tab === 4 ? 'Revisión de sistema de refrigeración en curso; pendiente confirmar presión del compresor.' : `OS-2026-00428 · Asignada a ${reclamo.tecnico || 'técnico pendiente'}`}</p>
                <p className="text-xs text-slate-400 mt-1">Actualizado el {reclamo.fechaActualizacion}</p>
              </div>
              <button
                onClick={() => navigate('orden-servicio', reclamo.id)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-2 text-slate-600 rounded-xl text-sm font-medium transition-all"
              >
                <Wrench size={15} />
                {tab === 3 || tab === 4 ? 'Ver orden de servicio técnico' : 'Ver notificaciones enviadas'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Actualizar Estado Modal */}
      {showActualizarModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-5 border-b border-surface-2">
              <h2 className="font-bold text-slate-800">Actualizar estado del reclamo</h2>
              <p className="text-sm text-slate-500 mt-0.5">{reclamo.id}</p>
            </div>
            <div className="px-6 py-5">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                <p className="text-xs text-amber-600 font-semibold mb-1">Estado actual</p>
                <p className="font-bold text-amber-700">{reclamo.estado}</p>
              </div>
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-600 mb-2">Siguiente estado permitido</p>
                <div className="space-y-2">
                  {['Reparado'].map(s => (
                    <label key={s} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:border-gollo-red hover:bg-gollo-red-light transition-all">
                      <input type="radio" name="estado" value={s} className="accent-gollo-red" defaultChecked />
                      <span className="text-sm font-medium text-slate-700">{s}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                  <AlertTriangle size={11} />
                  Para marcar como Reparado debe existir un diagnóstico registrado
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Observación</label>
                <textarea rows={3} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gollo-red/30 resize-none" placeholder="Observación del cambio de estado..." />
              </div>
              <div className="flex items-center gap-2 mb-5">
                <input type="checkbox" id="notif" className="accent-gollo-red w-4 h-4" />
                <label htmlFor="notif" className="text-sm text-slate-600 cursor-pointer">
                  Notificar al cliente sobre este cambio
                </label>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowActualizarModal(false)} className="flex-1 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-surface transition-all">
                  Cancelar
                </button>
                <button onClick={() => setShowActualizarModal(false)} className="flex-1 py-2 bg-gollo-red hover:bg-gollo-red-dark text-white rounded-xl text-sm font-semibold transition-all">
                  Confirmar cambio de estado
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
