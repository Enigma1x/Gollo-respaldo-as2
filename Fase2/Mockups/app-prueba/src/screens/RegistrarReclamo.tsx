import { useState } from 'react'
import { Check, ChevronRight, User, Package, ShieldCheck, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import type { Screen } from '../types'
import { Breadcrumb, Btn, Input, Select, Textarea } from '../components'
import { SUCURSALES } from '../data'

const STEPS = [
  { label: 'Cliente', icon: <User size={14} /> },
  { label: 'Producto', icon: <Package size={14} /> },
  { label: 'Garantía', icon: <ShieldCheck size={14} /> },
  { label: 'Reclamo', icon: <FileText size={14} /> },
]

export default function RegistrarReclamo({ navigate }: { navigate: (s: Screen, id?: string) => void }) {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const [cedula, setCedula] = useState('')
  const [clienteEncontrado, setClienteEncontrado] = useState(false)
  const [producto, setProducto] = useState('')
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [serie, setSerie] = useState('')
  const [fechaCompra, setFechaCompra] = useState('')
  const [factura, setFactura] = useState('')
  const [numGarantia, setNumGarantia] = useState('')
  const [fechaInicioGar, setFechaInicioGar] = useState('')
  const [fechaFinGar, setFechaFinGar] = useState('')
  const [cobertura, setCobertura] = useState('')
  const [garantiaEstado, setGarantiaEstado] = useState('')
  const [motivo, setMotivo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [prioridad, setPrioridad] = useState('')
  const [sucursal, setSucursal] = useState('San José Centro')
  const [showErrors, setShowErrors] = useState(false)

  const buscarCliente = () => {
    if (cedula) setClienteEncontrado(true)
  }

  const productoValido = Boolean(producto && marca && modelo && serie && fechaCompra)
  const reclamoValido = Boolean(motivo && descripcion && prioridad && sucursal)
  const handleRegistrar = () => {
    if (!reclamoValido) return setShowErrors(true)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-7 max-w-[640px] mx-auto">
        <div className="bg-white rounded-2xl border border-surface-2 shadow-sm p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Reclamo registrado</h2>
          <p className="text-slate-500 text-sm mb-6">El reclamo ha sido creado correctamente.</p>
          <div className="bg-surface rounded-xl px-6 py-4 mb-6 inline-block">
            <p className="text-xs text-slate-400 mb-1">Número de reclamo</p>
            <p className="font-mono text-2xl font-bold text-slate-800">GR-2026-00449</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-left text-sm mb-6 bg-surface rounded-xl p-4">
            <div><span className="text-slate-400 text-xs">Asesor</span><p className="font-medium text-slate-700">Carlos Méndez</p></div>
            <div><span className="text-slate-400 text-xs">Sucursal</span><p className="font-medium text-slate-700">{sucursal || 'San José Centro'}</p></div>
            <div><span className="text-slate-400 text-xs">Prioridad</span><p className="font-medium text-slate-700">{prioridad || 'Media'}</p></div>
            <div><span className="text-slate-400 text-xs">Fecha</span><p className="font-medium text-slate-700">15/08/2026</p></div>
          </div>
          <div className="flex gap-3 justify-center">
            <Btn variant="secondary" onClick={() => navigate('lista-reclamos')}>Ver todos los reclamos</Btn>
            <Btn variant="primary" onClick={() => navigate('validar-garantia')}>Validar garantía →</Btn>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-7 max-w-[800px] mx-auto">
      <Breadcrumb items={['Dashboard', 'Reclamos', 'Registrar reclamo']} />
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">Registrar reclamo</h1>
        <p className="text-sm text-slate-500 mt-0.5">Asesor: Carlos Méndez · San José Centro · 15/08/2026</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-8">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                i === step
                  ? 'bg-gollo-red text-white'
                  : i < step
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-surface-2 text-slate-400'
              }`}
            >
              {i < step ? <Check size={14} /> : s.icon}
              {s.label}
            </button>
            {i < STEPS.length - 1 && (
              <ChevronRight size={16} className="mx-1 text-slate-300 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-surface-2 shadow-sm p-7">
        {/* Step 1: Cliente */}
        {step === 0 && (
          <div>
            <h2 className="font-semibold text-slate-800 mb-1">Paso 1 — Identificar cliente</h2>
            <p className="text-sm text-slate-500 mb-6">Busque al cliente por número de cédula o seleccione uno existente.</p>
            <div className="flex gap-3 mb-6">
              <div className="flex-1">
                <Input label="Cédula del cliente" placeholder="Ej: 1-1456-0892" value={cedula} onChange={setCedula} required />
              </div>
              <div className="flex items-end">
                <Btn onClick={buscarCliente}>Buscar</Btn>
              </div>
            </div>

            {clienteEncontrado && (
              <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={16} className="text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">Cliente encontrado</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Nombre completo" value="Laura Rodríguez Vargas" readonly />
                  <Input label="Teléfono" value="8812-4590" readonly />
                  <Input label="Correo electrónico" value="laura.rodriguez@gmail.com" readonly />
                  <Input label="Dirección" value="San José, Escazú" readonly />
                </div>
              </div>
            )}

            {!clienteEncontrado && (
              <div className="border border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400 mb-6">
                <p className="text-sm">Ingrese la cédula y presione Buscar para localizar al cliente</p>
                <button className="text-xs text-gollo-red mt-2 hover:underline font-medium">
                  + Registrar nuevo cliente
                </button>
              </div>
            )}

            <div className="flex justify-end">
              <Btn onClick={() => setStep(1)} disabled={!clienteEncontrado}>
                Continuar → Producto
              </Btn>
            </div>
          </div>
        )}

        {/* Step 2: Producto */}
        {step === 1 && (
          <div>
            <h2 className="font-semibold text-slate-800 mb-1">Paso 2 — Información del producto</h2>
            <p className="text-sm text-slate-500 mb-6">Ingrese los datos del equipo a revisar.</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Input label="Producto / Descripción" placeholder="Ej: Refrigeradora Samsung RT38" value={producto} onChange={setProducto} required />
              <Input label="Marca" placeholder="Ej: Samsung" value={marca} onChange={setMarca} required />
              <Input label="Modelo" placeholder="Ej: RT38K5000S8" value={modelo} onChange={setModelo} required />
              <Input label="Número de serie" placeholder="Ej: SN92K41058" value={serie} onChange={setSerie} required />
              <Input label="Fecha de compra" type="date" value={fechaCompra} onChange={setFechaCompra} required />
              <Input label="Número de factura" placeholder="Ej: FAC-2024-081922" value={factura} onChange={setFactura} />
            </div>
            <div className="flex justify-between">
              <Btn variant="secondary" onClick={() => setStep(0)}>← Atrás</Btn>
              <Btn onClick={() => setStep(2)} disabled={!productoValido}>Continuar → Garantía</Btn>
            </div>
          </div>
        )}

        {/* Step 3: Garantía */}
        {step === 2 && (
          <div>
            <h2 className="font-semibold text-slate-800 mb-1">Paso 3 — Garantía</h2>
            <p className="text-sm text-slate-500 mb-6">Registre la información de garantía del producto.</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Input label="N.º de garantía" placeholder="GAR-2024-041922" value={numGarantia} onChange={setNumGarantia} />
              <Select label="Estado de garantía" options={['Vigente', 'Vencida', 'Por vencer', 'No aplica']} value={garantiaEstado} onChange={setGarantiaEstado} required />
              <Input label="Fecha de inicio" type="date" value={fechaInicioGar} onChange={setFechaInicioGar} />
              <Input label="Fecha de vencimiento" type="date" value={fechaFinGar} onChange={setFechaFinGar} />
              <div className="col-span-2">
                <Input label="Cobertura" placeholder="Ej: Reparación por fallas de funcionamiento" value={cobertura} onChange={setCobertura} />
              </div>
            </div>
            <div className="flex justify-between">
              <Btn variant="secondary" onClick={() => setStep(1)}>← Atrás</Btn>
              <Btn onClick={() => setStep(3)}>Continuar → Reclamo</Btn>
            </div>
          </div>
        )}

        {/* Step 4: Reclamo */}
        {step === 3 && (
          <div>
            <h2 className="font-semibold text-slate-800 mb-1">Paso 4 — Detalle del reclamo</h2>
            <p className="text-sm text-slate-500 mb-6">Describa la falla reportada por el cliente.</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Input label="Motivo del reclamo" placeholder="Ej: No enfría" value={motivo} onChange={setMotivo} required />
              <Select label="Prioridad" options={['Alta', 'Media', 'Baja']} value={prioridad} onChange={setPrioridad} required />
              <Select label="Sucursal" options={SUCURSALES} value={sucursal} onChange={setSucursal} required />
              <div />
              <div className="col-span-2">
                <Textarea label="Descripción detallada de la falla" placeholder="Describa con detalle el problema reportado por el cliente..." value={descripcion} onChange={setDescripcion} rows={4} required />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Adjuntos / evidencias</label>
                <div className="border border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400 hover:border-gollo-red cursor-pointer transition-all">
                  <p className="text-sm">Arrastre archivos aquí o <span className="text-gollo-red font-medium">haga clic para seleccionar</span></p>
                  <p className="text-xs mt-1">Imágenes, PDF · máx 10 MB por archivo</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-4">Los campos con <span className="text-gollo-red">*</span> son obligatorios</p>
            {showErrors && !reclamoValido && (
              <div className="flex items-center gap-2 p-3 mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">
                <AlertCircle size={16} /> Complete motivo, prioridad, sucursal y descripción antes de registrar.
              </div>
            )}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex gap-2">
                <Btn variant="secondary" onClick={() => setStep(2)}>← Atrás</Btn>
                <Btn variant="ghost">Guardar borrador</Btn>
              </div>
              <div className="flex gap-2">
                <Btn variant="secondary">Validar datos</Btn>
                <Btn variant="primary" onClick={handleRegistrar}>
                  Registrar reclamo
                </Btn>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
