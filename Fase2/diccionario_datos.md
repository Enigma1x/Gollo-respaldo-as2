# Diccionario de Datos

**Proyecto:** Sistema de Gestión de Reclamos y Servicio Técnico para Gollo Respaldo  
**Responsable:** Andrew Barrantes James  
**Fase:** 2

## Convenciones

- **PK:** llave primaria.
- **FK:** llave foránea.
- **NN:** obligatorio.
- **UQ:** único.

## CLIENTE

| Campo | Tipo | Restricción | Descripción |
|---|---|---|---|
| id_cliente | INT | PK | Identificador del Cliente |
| nombre | VARCHAR(50) | NN | Nombre |
| apellidos | VARCHAR(100) | NN | Apellidos |
| cedula | VARCHAR(20) | NN, UQ | Identificación |
| telefono | VARCHAR(20) | NN | Teléfono |
| correo | VARCHAR(100) |  | Correo |
| direccion | VARCHAR(200) |  | Dirección |

## SUCURSAL

| Campo | Tipo | Restricción | Descripción |
|---|---|---|---|
| id_sucursal | INT | PK | Identificador |
| nombre | VARCHAR(100) | NN | Nombre |
| provincia | VARCHAR(50) | NN | Provincia |
| direccion | VARCHAR(200) | NN | Dirección |

## USUARIO

| Campo | Tipo | Restricción | Descripción |
|---|---|---|---|
| id_usuario | INT | PK | Identificador |
| nombre | VARCHAR(50) | NN | Nombre |
| apellidos | VARCHAR(100) | NN | Apellidos |
| correo | VARCHAR(100) | NN, UQ | Usuario de acceso |
| contrasena_hash | VARCHAR(255) | NN | Contraseña cifrada |
| rol | VARCHAR(30) | NN | Asesor, Técnico o Administrador |
| especialidad | VARCHAR(100) |  | Especialidad técnica |
| activo | BOOLEAN | NN | Estado de la cuenta |
| id_sucursal | INT | FK | Sucursal asociada |

## PRODUCTO

| Campo | Tipo | Restricción | Descripción |
|---|---|---|---|
| id_producto | INT | PK | Identificador |
| nombre | VARCHAR(100) | NN | Nombre |
| marca | VARCHAR(50) | NN | Marca |
| modelo | VARCHAR(50) | NN | Modelo |
| numero_serie | VARCHAR(100) | NN, UQ | Serie |
| fecha_compra | DATE | NN | Fecha de compra |
| id_cliente | INT | FK, NN | Propietario |

## GARANTIA

| Campo | Tipo | Restricción | Descripción |
|---|---|---|---|
| id_garantia | INT | PK | Identificador |
| fecha_inicio | DATE | NN | Inicio |
| fecha_vencimiento | DATE | NN | Vencimiento |
| cobertura | TEXT | NN | Condiciones |
| estado | VARCHAR(20) | NN | Vigente, vencida o anulada |
| id_producto | INT | FK, NN | Producto cubierto |

## RECLAMO

| Campo | Tipo | Restricción | Descripción |
|---|---|---|---|
| id_reclamo | INT | PK | Número del reclamo |
| fecha_registro | DATETIME | NN | Fecha y hora |
| motivo | VARCHAR(150) | NN | Motivo |
| descripcion | TEXT | NN | Descripción de la falla |
| prioridad | VARCHAR(20) | NN | Prioridad |
| estado | VARCHAR(30) | NN | Estado actual |
| id_cliente | INT | FK, NN | Cliente que reporta |
| id_producto | INT | FK, NN | Producto |
| id_garantia | INT | FK, NN | Garantía |
| id_asesor | INT | FK, NN | Asesor que registra |

## SERVICIO_TECNICO

| Campo | Tipo | Restricción | Descripción |
|---|---|---|---|
| id_servicio | INT | PK | Identificador |
| fecha_ingreso | DATETIME | NN | Ingreso |
| fecha_salida | DATETIME |  | Salida |
| estado | VARCHAR(30) | NN | Estado del servicio |
| id_reclamo | INT | FK, NN, UQ | Reclamo relacionado |
| id_tecnico | INT | FK | Técnico asignado |

## DIAGNOSTICO

| Campo | Tipo | Restricción | Descripción |
|---|---|---|---|
| id_diagnostico | INT | PK | Identificador |
| descripcion | TEXT | NN | Resultado técnico |
| repuestos | TEXT |  | Repuestos |
| costo_estimado | DECIMAL(10,2) |  | Costo |
| tiempo_estimado | INT |  | Horas estimadas |
| fecha_registro | DATETIME | NN | Fecha |
| version | INT | NN | Versión |
| id_servicio | INT | FK, NN | Servicio |
| id_tecnico | INT | FK, NN | Técnico |

## HISTORIAL

| Campo | Tipo | Restricción | Descripción |
|---|---|---|---|
| id_historial | INT | PK | Identificador |
| fecha_hora | DATETIME | NN | Momento |
| accion | VARCHAR(100) | NN | Acción |
| observaciones | TEXT |  | Detalle |
| estado_anterior | VARCHAR(30) |  | Estado anterior |
| estado_nuevo | VARCHAR(30) |  | Estado nuevo |
| id_reclamo | INT | FK, NN | Reclamo |
| id_responsable | INT | FK, NN | Usuario responsable |

## NOTIFICACION

| Campo | Tipo | Restricción | Descripción |
|---|---|---|---|
| id_notificacion | INT | PK | Identificador |
| tipo | VARCHAR(20) | NN | Correo o SMS |
| destinatario | VARCHAR(150) | NN | Destino |
| mensaje | TEXT | NN | Contenido |
| fecha_envio | DATETIME |  | Fecha del intento |
| estado_envio | VARCHAR(20) | NN | Pendiente, enviada o fallida |
| id_reclamo | INT | FK, NN | Reclamo |

