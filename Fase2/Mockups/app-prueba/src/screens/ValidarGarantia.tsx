import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import type { Screen } from '../types'
import { Breadcrumb, Btn } from '../components'

export default function ValidarGarantia({ navigate }: { navigate: (s: Screen, id?: string) => void }) {
  return (
    <div className="p-7 max-w-[900px] mx-auto">
      <Breadcrumb items={['Dashboard', 'Reclamos', 'GR-2026-00449', 'Validar garantía']} />
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">Validación de garantía</h1>
        <p className="text-sm text-slate-500 mt-0.5">Reclamo GR-2026-00449 · 15/08/2026</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        {/* Cliente */}
        <div className="bg-white rounded-xl border border-surface-2 shadow-sm p-5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Cliente</h3>
          <p className="font-semibold text-slate-800">Laura Rodríguez Vargas</p>
          <p className="text-sm text-slate-500 mt-0.5">Cédula: 1-1456-0892</p>
          <p className="text-sm text-slate-500">Tel: 8812-4590</p>
          <p className="text-sm text-slate-500">laura.rodriguez@gmail.com</p>
        </div>
        {/* Producto */}
        <div className="bg-white rounded-xl border border-surface-2 shadow-sm p-5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Producto</h3>
          <p className="font-semibold text-slate-800">Refrigeradora Samsung RT38</p>
          <p className="text-sm text-slate-500 mt-0.5">Modelo: RT38K5000S8</p>
          <p className="font-mono text-xs text-slate-400 mt-1">S/N: SN92K41058</p>
          <p className="text-sm text-slate-500">Compra: 18/04/2025</p>
          <p className="text-sm text-slate-500">Factura: FAC-2025-081922</p>
        </div>
        {/* Garantía */}
        <div className="bg-white rounded-xl border border-surface-2 shadow-sm p-5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Garantía registrada</h3>
          <p className="font-semibold text-slate-800">GAR-2025-041922</p>
          <p className="text-sm text-slate-500 mt-0.5">Inicio: 18/04/2025</p>
          <p className="text-sm text-slate-500">Vence: 18/04/2027</p>
          <p className="text-sm text-slate-500">Cobertura: Fallas de funcionamiento</p>
        </div>
      </div>

      {/* Resultado válido */}
      <div className="bg-white rounded-2xl border border-surface-2 shadow-sm mb-5">
        <div className="border-b border-surface-2 px-6 py-4 bg-emerald-50 rounded-t-2xl flex items-center gap-3">
          <CheckCircle size={20} className="text-emerald-600" />
          <div>
            <p className="font-bold text-emerald-800 text-base">Garantía vigente</p>
            <p className="text-sm text-emerald-600">El producto está cubierto por garantía de fábrica</p>
          </div>
        </div>
        <div className="px-6 py-5 grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Vencimiento</p>
            <p className="font-semibold text-slate-800">18/04/2027</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Días restantes</p>
            <p className="font-semibold text-slate-800">612 días</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Cobertura</p>
            <p className="font-semibold text-slate-800">Reparación por fallas de funcionamiento</p>
          </div>
        </div>
        <div className="px-6 pb-5 flex gap-3">
          <Btn variant="primary" size="lg" onClick={() => navigate('detalle-reclamo', 'GR-2026-00449')}>
            <CheckCircle size={15} />
            Aprobar y generar ticket
          </Btn>
          <Btn variant="secondary">Agregar observación</Btn>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 border-t border-dashed border-slate-200" />
        <span className="text-xs text-slate-400 font-medium">Escenario alternativo — garantía no procede</span>
        <div className="flex-1 border-t border-dashed border-slate-200" />
      </div>

      {/* Resultado inválido (reference) */}
      <div className="bg-white rounded-2xl border border-surface-2 shadow-sm opacity-80">
        <div className="border-b border-surface-2 px-6 py-4 bg-red-50 rounded-t-2xl flex items-center gap-3">
          <XCircle size={20} className="text-red-600" />
          <div>
            <p className="font-bold text-red-800 text-base">Garantía no procede</p>
            <p className="text-sm text-red-600">No se puede cubrir este reclamo bajo garantía</p>
          </div>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-700 mb-1">Motivo de rechazo</p>
              <p className="text-sm text-red-600">La garantía de fábrica venció el <strong>10/07/2026</strong>. El producto excede el período de cobertura estándar de 12 meses desde la fecha de compra.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Btn variant="danger" onClick={() => navigate('casos-escalados')}>
              <AlertTriangle size={14} />
              Escalar al Administrador
            </Btn>
            <Btn variant="secondary">Notificar al cliente</Btn>
          </div>
        </div>
      </div>
    </div>
  )
}
