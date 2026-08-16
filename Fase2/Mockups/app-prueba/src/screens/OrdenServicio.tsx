import { useState } from 'react'
import { ArrowLeft, CheckCircle, Save } from 'lucide-react'
import type { Screen } from '../types'
import { RECLAMOS } from '../data'
import { Breadcrumb, Btn, Textarea, Input } from '../components'

export default function OrdenServicio({
  navigate,
  reclamoId,
}: {
  navigate: (s: Screen, id?: string) => void
  reclamoId: string | null
}) {
  const reclamo = RECLAMOS.find(r => r.id === reclamoId) ?? RECLAMOS[0]

  const [diagnostico, setDiagnostico] = useState('Falla en compresor por pérdida de gas refrigerante R600a. Condensador con acumulación de polvo. Sistema de sellado comprometido.')
  const [repuestos, setRepuestos] = useState('Compresor Embraco NE2130GK, kit de recarga R600a, O-rings de sellado')
  const [costoEst, setCostoEst] = useState('₡85,000')
  const [tiempoEst, setTiempoEst] = useState('3 días hábiles')
  const [obs, setObs] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => setSaved(true)

  return (
    <div className="p-7 max-w-[960px] mx-auto">
      <Breadcrumb items={['Dashboard', 'Servicio Técnico', reclamo.id]} />

      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('dashboard-tecnico')}
          className="p-1.5 rounded-lg hover:bg-surface text-slate-400 transition-all"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800">Orden de servicio</h1>
            <span className="font-mono text-sm text-slate-400">{reclamo.id}</span>
          </div>
          <p className="text-sm text-slate-500">Técnico: Diego Vargas · San José Centro</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        {/* Datos del producto */}
        <div className="bg-white rounded-xl border border-surface-2 shadow-sm p-5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Producto recibido</h3>
          <p className="font-semibold text-slate-800 mb-1">{reclamo.producto}</p>
          <p className="text-sm text-slate-500">Modelo: {reclamo.modelo}</p>
          <p className="font-mono text-xs text-slate-400 mt-1">S/N: {reclamo.serie}</p>
          <div className="mt-3 pt-3 border-t border-surface-2 space-y-1">
            <p className="text-xs text-slate-400">Recepción: <span className="text-slate-600 font-medium">10/08/2026 14:30</span></p>
            <p className="text-xs text-slate-400">Técnico: <span className="text-slate-600 font-medium">Diego Vargas</span></p>
          </div>
        </div>

        {/* Condición al recibir */}
        <div className="bg-white rounded-xl border border-surface-2 shadow-sm p-5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Condición al recibir</h3>
          <ul className="space-y-1.5 text-sm text-slate-700">
            {['Equipo completo sin accesorios', 'Cuerpo con rayones menores laterales', 'Sin daño físico visible en componentes', 'Bandeja de hielo no recibida'].map(item => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle size={13} className="text-slate-300 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Accesorios */}
        <div className="bg-white rounded-xl border border-surface-2 shadow-sm p-5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Accesorios recibidos</h3>
          <ul className="space-y-1.5 text-sm text-slate-700">
            {[
              { item: 'Cable de poder', ok: true },
              { item: 'Manual de usuario', ok: false },
              { item: 'Bandeja de hielo', ok: false },
              { item: 'Gavetas internas', ok: true },
            ].map(({ item, ok }) => (
              <li key={item} className="flex items-center justify-between">
                <span className={ok ? 'text-slate-700' : 'text-slate-400 line-through'}>{item}</span>
                <span className={`text-xs font-medium ${ok ? 'text-emerald-600' : 'text-slate-400'}`}>{ok ? '✓' : '✗'}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Diagnóstico */}
      <div className="bg-white rounded-xl border border-surface-2 shadow-sm mb-5">
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-2">
          <h2 className="font-semibold text-slate-700">Diagnóstico técnico</h2>
          {saved && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
              <CheckCircle size={12} />
              Guardado 15/08/2026 09:30
            </span>
          )}
        </div>
        <div className="p-6 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Textarea
              label="Descripción técnica del diagnóstico"
              value={diagnostico}
              onChange={setDiagnostico}
              rows={4}
              required
            />
          </div>
          <Textarea
            label="Repuestos requeridos"
            value={repuestos}
            onChange={setRepuestos}
            rows={3}
          />
          <div className="space-y-4">
            <Input label="Costo estimado (₡)" value={costoEst} onChange={setCostoEst} />
            <Input label="Tiempo estimado de reparación" value={tiempoEst} onChange={setTiempoEst} />
          </div>
          <div className="col-span-2">
            <Textarea
              label="Observaciones adicionales"
              value={obs}
              onChange={setObs}
              rows={2}
              placeholder="Notas adicionales para el asesor o el cliente..."
            />
          </div>
          <div className="col-span-2 flex gap-3">
            <Btn variant="primary" onClick={handleSave}>
              <Save size={14} />
              Guardar diagnóstico
            </Btn>
            <Btn variant="secondary" onClick={() => navigate('detalle-reclamo', reclamo.id)}>
              Ver detalle del reclamo
            </Btn>
          </div>
        </div>
      </div>

      {/* Historial de versiones del diagnóstico */}
      <div className="bg-white rounded-xl border border-surface-2 shadow-sm">
        <div className="px-6 py-4 border-b border-surface-2">
          <h2 className="font-semibold text-slate-700 text-sm">Historial de diagnósticos</h2>
          <p className="text-xs text-slate-400 mt-0.5">Versiones anteriores — no se sobreescriben</p>
        </div>
        <div className="divide-y divide-surface-2">
          {[
            { version: 'v1', fecha: '11/08/2026 10:20', tecnico: 'Diego Vargas', resumen: 'Revisión inicial. Ruido anormal en compresor. Se requiere prueba de presión.' },
            { version: 'v2', fecha: '13/08/2026 14:45', tecnico: 'Diego Vargas', resumen: 'Confirmado: falla en compresor por pérdida de gas. Nivel de R600a al 40%. Se solicitan repuestos.' },
          ].map(v => (
            <div key={v.version} className="px-6 py-3 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-slate-400 font-mono bg-surface px-2 py-0.5 rounded">{v.version}</span>
                  <span className="text-xs text-slate-400">{v.fecha}</span>
                  <span className="text-xs text-slate-500 font-medium">{v.tecnico}</span>
                </div>
                <p className="text-sm text-slate-600">{v.resumen}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
