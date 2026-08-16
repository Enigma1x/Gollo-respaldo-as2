import { useState } from 'react'
import { Search, CheckCircle, Clock, ShieldCheck, MessageCircle, MapPin } from 'lucide-react'
import { RECLAMOS } from '../data'

const PROGRESS_LABELS = ['Solicitud recibida', 'Garantía revisada', 'En taller', 'Reparado', 'Entregado']
const ESTADO_INDEX: Record<string, number> = { Registrado: 0, 'Garantía validada': 1, Ingresado: 1, 'En Diagnóstico': 2, 'En Taller': 2, Reparado: 3, Entregado: 4, Cerrado: 4 }

export default function PortalCliente() {
  const [numero, setNumero] = useState('')
  const [validacion, setValidacion] = useState('')
  const [consultado, setConsultado] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [reclamoId, setReclamoId] = useState('')

  const handleConsultar = () => {
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const encontrado = RECLAMOS.find(r => r.id.toLowerCase() === numero.trim().toLowerCase() && (r.cedula === validacion.trim() || r.telefono === validacion.trim()))
      if (!encontrado) return setError('No encontramos un caso con esos datos. Revise el número de reclamo y la identificación.')
      setReclamoId(encontrado.id)
      setConsultado(true)
    }, 800)
  }

  const reclamo = RECLAMOS.find(r => r.id === reclamoId) ?? RECLAMOS[0]
  const currentStep = ESTADO_INDEX[reclamo.estado] ?? 0
  const progressSteps = PROGRESS_LABELS.map((label, index) => ({ label, done: index <= currentStep }))

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #f9f8f7 0%, #f0eeec 100%)' }}
    >
      {/* Header */}
      <header className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <img src="/gollo-respaldo-logo.png" alt="Gollo Respaldo" className="w-44 h-16 object-contain object-left" />
          <p className="text-xs text-slate-400">Portal de seguimiento al cliente</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {!consultado ? (
          <div>
            {/* Hero */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gollo-red-light mb-4">
                <Search size={28} className="text-gollo-red" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Consulta tu reparación</h1>
              <p className="text-slate-500 text-base">
                Ingresa tu número de reclamo para conocer el estado actual de tu equipo.
              </p>
            </div>

            {/* Search form */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-7">
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                    Número de reclamo
                  </label>
                  <input
                    type="text"
                    value={numero}
                    onChange={e => setNumero(e.target.value)}
                    placeholder="Ej: GR-2026-00428"
                    className="w-full px-4 py-3 text-base border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gollo-red/30 focus:border-gollo-red transition-all font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                    Dato de validación
                  </label>
                  <input
                    type="text"
                    value={validacion}
                    onChange={e => setValidacion(e.target.value)}
                    placeholder="Número de cédula o teléfono registrado"
                    className="w-full px-4 py-3 text-base border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gollo-red/30 focus:border-gollo-red transition-all"
                  />
                </div>
              </div>
              <button
                onClick={handleConsultar}
                disabled={loading || !numero || !validacion}
                className="w-full py-3.5 bg-gollo-red hover:bg-gollo-red-dark text-white font-semibold text-base rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? 'Consultando...' : 'Consultar estado'}
              </button>
              {error && <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3">{error}</p>}
              <p className="text-center text-xs text-slate-400 mt-4">
                El número de reclamo fue entregado por el asesor al momento del registro.
              </p>
            </div>

            {/* Demo tip */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <p className="text-xs text-amber-700 text-center">
                <strong>Demo:</strong> Use GR-2026-00428 con la cédula 1-1456-0892 o el teléfono 8812-4590
              </p>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setConsultado(false)}
              className="text-sm text-slate-500 hover:text-slate-700 mb-6 flex items-center gap-1.5 transition-all"
            >
              ← Nueva consulta
            </button>

            {/* Result card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-md mb-5 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 bg-surface">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Número de reclamo</p>
                    <p className="font-mono text-xl font-bold text-slate-800">{reclamo.id}</p>
                  </div>
                  <span className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold rounded-full">
                    {reclamo.estado}
                  </span>
                </div>
              </div>
              <div className="px-6 py-5">
                <div className="grid grid-cols-2 gap-4 text-sm mb-5">
                  <div>
                    <p className="text-slate-400 text-xs mb-0.5">Producto</p>
                    <p className="font-semibold text-slate-700">{reclamo.producto}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-0.5">Última actualización</p>
                    <p className="font-semibold text-slate-700">{reclamo.fechaActualizacion}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    {progressSteps.map((step, i) => (
                      <div key={i} className="flex flex-col items-center flex-1">
                        <div className="flex items-center w-full">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-all ${
                            step.done
                              ? 'bg-gollo-red border-gollo-red text-white'
                              : i === currentStep + 1
                              ? 'bg-white border-slate-200 text-slate-300'
                              : 'bg-white border-slate-100 text-slate-200'
                          }`}>
                            {step.done ? <CheckCircle size={14} /> : <Clock size={13} />}
                          </div>
                          {i < progressSteps.length - 1 && (
                            <div className={`flex-1 h-0.5 ${step.done && progressSteps[i + 1]?.done ? 'bg-gollo-red' : step.done ? 'bg-gradient-to-r from-gollo-red to-slate-200' : 'bg-slate-100'}`} />
                          )}
                        </div>
                        <p className={`text-xs mt-2 text-center leading-tight ${step.done ? 'text-slate-700 font-medium' : 'text-slate-300'}`}>
                          {step.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="text-sm font-semibold text-amber-800 mb-1">Estado actual: {reclamo.estado}</p>
                  <p className="text-sm text-amber-700">
                    Su equipo se encuentra bajo seguimiento en {reclamo.sucursal}. El personal responsable actualizará este portal cuando el caso avance.
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 mt-4">
                  <div className="rounded-xl bg-surface p-3"><MapPin size={15} className="text-gollo-red mb-1"/><p className="text-xs text-slate-400">Sucursal</p><p className="text-xs font-semibold text-slate-700">{reclamo.sucursal}</p></div>
                  <div className="rounded-xl bg-surface p-3"><ShieldCheck size={15} className="text-emerald-600 mb-1"/><p className="text-xs text-slate-400">Garantía</p><p className="text-xs font-semibold text-slate-700">{reclamo.garantiaVigente ? 'Vigente' : 'En revisión'}</p></div>
                  <div className="rounded-xl bg-surface p-3"><MessageCircle size={15} className="text-blue-service mb-1"/><p className="text-xs text-slate-400">Próximo paso</p><p className="text-xs font-semibold text-slate-700">Recibirá una notificación</p></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
              <p className="text-sm text-slate-500 mb-2">¿Tiene alguna consulta adicional?</p>
              <p className="text-sm font-semibold text-slate-700">Llame al <span className="text-gollo-red">0800-GOLLO-1</span> o visítenos en sucursal.</p>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 pb-8 text-center">
        <p className="text-xs text-slate-400">© 2026 Gollo · Gollo Respaldo · Portal de seguimiento de reparaciones</p>
      </footer>
    </div>
  )
}
