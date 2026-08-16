import { useMemo, useState } from 'react'
import { Bell, CheckCircle, Mail, MessageSquare, Search, ShieldCheck, UserPlus, Users } from 'lucide-react'
import { Breadcrumb, Btn, EmptyState } from '../components'
import { RECLAMOS } from '../data'

const clients = Array.from(new Map(RECLAMOS.map(r => [r.cedula, r])).values())

export function Clientes() {
  const [query, setQuery] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const filtered = clients.filter(c => `${c.cliente} ${c.cedula} ${c.telefono}`.toLowerCase().includes(query.toLowerCase()))
  return <div className="page-shell">
    <Breadcrumb items={['Dashboard', 'Clientes']} />
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6"><div><h1 className="text-xl font-bold">Clientes</h1><p className="text-sm text-slate-500">Consulta centralizada de clientes y sus reclamos.</p></div><Btn onClick={() => setShowCreate(true)}><UserPlus size={15}/> Crear cliente</Btn></div>
    <div className="panel p-4 mb-4"><label className="sr-only" htmlFor="client-search">Buscar clientes</label><div className="relative"><Search size={16} className="absolute left-3 top-3 text-slate-400"/><input id="client-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar por nombre, cédula o teléfono" className="field pl-10"/></div></div>
    <div className="panel overflow-x-auto"><table className="data-table"><thead><tr><th>Cliente</th><th>Cédula</th><th>Contacto</th><th>Último reclamo</th><th>Sucursal</th></tr></thead><tbody>{filtered.map(c=><tr key={c.cedula}><td className="font-semibold">{c.cliente}</td><td className="font-mono text-xs">{c.cedula}</td><td>{c.telefono}<span className="block text-xs text-slate-400">{c.correo}</span></td><td className="font-mono text-xs">{c.id}</td><td>{c.sucursal}</td></tr>)}</tbody></table>{!filtered.length&&<EmptyState icon="⌕" title="Sin resultados" desc="Pruebe con otro nombre o identificación."/>}</div>
    {showCreate&&<SimpleModal title="Crear cliente" close={()=>setShowCreate(false)}><div className="grid sm:grid-cols-2 gap-3"><input className="field" placeholder="Nombre completo"/><input className="field" placeholder="Cédula"/><input className="field" placeholder="Teléfono"/><input className="field" placeholder="Correo"/></div><ModalActions close={()=>setShowCreate(false)} action="Guardar cliente"/></SimpleModal>}
  </div>
}

export function Garantias() {
  const [query,setQuery]=useState('')
  const rows=useMemo(()=>RECLAMOS.filter(r=>`${r.id} ${r.serie} ${r.cliente}`.toLowerCase().includes(query.toLowerCase())),[query])
  return <div className="page-shell"><Breadcrumb items={['Dashboard','Garantías']}/><div className="mb-6"><h1 className="text-xl font-bold">Garantías</h1><p className="text-sm text-slate-500">Vigencia y cobertura asociada a cada producto.</p></div><div className="panel p-4 mb-4"><div className="relative"><Search size={16} className="absolute left-3 top-3 text-slate-400"/><input aria-label="Buscar garantías" className="field pl-10" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Reclamo, cliente o número de serie"/></div></div><div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{rows.map(r=><article className="panel p-5" key={r.id}><div className="flex justify-between gap-3"><ShieldCheck className={r.garantiaVigente?'text-emerald-600':'text-red-500'} size={20}/><span className={`status ${r.garantiaVigente?'status-success':'status-error'}`}>{r.garantiaVigente?'Vigente':'No procede'}</span></div><h2 className="font-semibold mt-3">{r.producto}</h2><p className="text-xs font-mono text-slate-400 mt-1">{r.serie}</p><dl className="text-sm mt-4 space-y-2"><div><dt className="text-xs text-slate-400">Cliente</dt><dd>{r.cliente}</dd></div><div><dt className="text-xs text-slate-400">Vencimiento</dt><dd>{r.garantiaVencimiento??'Cobertura vencida'}</dd></div><div><dt className="text-xs text-slate-400">Reclamo</dt><dd className="font-mono text-xs">{r.id}</dd></div></dl></article>)}</div></div>
}

const initialNotifications = RECLAMOS.slice(0,5).map((r,i)=>({id:i+1,claim:r.id,client:r.cliente,channel:i%2?'SMS':'Correo',message:`Actualización del caso: ${r.estado}.`,status:i===4?'Error':i===3?'Pendiente':i===0?'Leída':'Enviada',date:r.fechaActualizacion}))
export function Notificaciones() {
  const [items,setItems]=useState(initialNotifications)
  const [filter,setFilter]=useState('Todas')
  const shown=filter==='Todas'?items:items.filter(n=>n.status===filter)
  return <div className="page-shell"><Breadcrumb items={['Dashboard','Notificaciones']}/><div className="flex flex-wrap justify-between gap-3 mb-6"><div><h1 className="text-xl font-bold">Centro de notificaciones</h1><p className="text-sm text-slate-500">Seguimiento de comunicaciones enviadas al cliente.</p></div><Btn variant="secondary" onClick={()=>setItems(v=>v.map(n=>({...n,status:'Leída'})))}><CheckCircle size={15}/> Marcar leídas</Btn></div><div className="flex gap-2 overflow-x-auto mb-4">{['Todas','Enviada','Pendiente','Error','Leída'].map(x=><button key={x} onClick={()=>setFilter(x)} className={`filter-chip ${filter===x?'filter-chip-active':''}`}>{x}</button>)}</div><div className="panel divide-y divide-slate-100">{shown.map(n=><article key={n.id} className="p-4 flex gap-4 items-start"><div className="icon-box">{n.channel==='SMS'?<MessageSquare size={17}/>:<Mail size={17}/>}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap justify-between gap-2"><p className="font-semibold text-sm">{n.client} <span className="font-mono text-xs text-slate-400 ml-2">{n.claim}</span></p><span className={`status ${n.status==='Error'?'status-error':n.status==='Pendiente'?'status-warning':'status-success'}`}>{n.status}</span></div><p className="text-sm text-slate-600 mt-1">{n.message}</p><p className="text-xs text-slate-400 mt-1">{n.channel} · {n.date}</p></div></article>)}{!shown.length&&<EmptyState icon="✓" title="No hay notificaciones" desc="No existen comunicaciones en este estado."/>}</div></div>
}

function SimpleModal({title,close,children}:{title:string;close:()=>void;children:React.ReactNode}){return <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="modal-card"><div className="flex justify-between mb-5"><h2 className="font-bold">{title}</h2><button aria-label="Cerrar" onClick={close}>×</button></div>{children}</div></div>}
function ModalActions({close,action}:{close:()=>void;action:string}){return <div className="flex justify-end gap-2 mt-5"><Btn variant="secondary" onClick={close}>Cancelar</Btn><Btn onClick={close}>{action}</Btn></div>}
