export type Role = 'asesor' | 'tecnico' | 'admin'

export type Screen =
  | 'login'
  | 'dashboard-asesor'
  | 'registrar-reclamo'
  | 'validar-garantia'
  | 'lista-reclamos'
  | 'detalle-reclamo'
  | 'dashboard-tecnico'
  | 'orden-servicio'
  | 'portal-cliente'
  | 'casos-escalados'
  | 'dashboard-admin'
  | 'usuarios-roles'
  | 'garantias'
  | 'notificaciones'
  | 'clientes'

export type ReclamoEstado =
  | 'Registrado'
  | 'Garantía validada'
  | 'Ingresado'
  | 'En Taller'
  | 'Reparado'
  | 'Entregado'
  | 'Cerrado'
  | 'Escalado'
  | 'En Diagnóstico'

export type Prioridad = 'Alta' | 'Media' | 'Baja'

export interface Reclamo {
  id: string
  cliente: string
  cedula: string
  telefono: string
  correo: string
  producto: string
  marca: string
  modelo: string
  serie: string
  sucursal: string
  asesor: string
  tecnico: string
  prioridad: Prioridad
  estado: ReclamoEstado
  fechaRegistro: string
  fechaActualizacion: string
  motivo: string
  descripcion: string
  motivoEscalamiento?: string
  garantiaVigente?: boolean
  garantiaVencimiento?: string
}

export interface Usuario {
  id: string
  nombre: string
  correo: string
  sucursal: string
  rol: Role
  estado: 'Activo' | 'Inactivo'
  ultimoAcceso: string
}

export interface NavItem {
  label: string
  screen: Screen
  roles: Role[]
}

export interface AppState {
  role: Role
  screen: Screen
  selectedReclamoId: string | null
  navigate: (screen: Screen, reclamoId?: string) => void
}
