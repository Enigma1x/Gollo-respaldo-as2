# Requerimientos y Actores

**Sistema de Gestión de Reclamos y Servicio Técnico para “Gollo Respaldo”**

Este documento define los actores del sistema, sus responsabilidades, los requerimientos funcionales y no funcionales, y las historias de usuario asociadas al proyecto.

---

## 1. Actores y roles

| Actor | Tipo | Objetivo principal |
|---|---|---|
| **Cliente** | Primario, externo | Resolver su falla y conocer el estado del caso sin tener que llamar o visitar la tienda |
| **Asesor de Tienda** | Primario, interno | Recibir la solicitud, validar la garantía y derivar correctamente el caso |
| **Técnico del Taller** | Primario, interno | Diagnosticar el producto y mantener actualizado el estado de la orden durante todas sus etapas |
| **Administrador del Sistema** | Primario, interno | Administrar la plataforma, supervisar el servicio y resolver casos escalados |
| **Sistema de Notificaciones** | Secundario, sistema | Informar automáticamente al Cliente sobre cambios de estado y alertas relevantes |

La nomenclatura de estos actores fue unificada con los diagramas UML mediante la RFC-001.

---

## 2. Descripción detallada de los actores

### 2.1 Cliente

Persona que adquirió un producto con garantía extendida Gollo Respaldo y necesita reportar una falla o dar seguimiento a su caso.

**Responsabilidades:**

- Solicitar la aplicación de la garantía.
- Reportar la falla al Asesor de Tienda.
- Consultar el estado de su reclamo o reparación.
- Recibir notificaciones automáticas.

**Restricciones:**

- No registra directamente el reclamo en el sistema.
- No valida la procedencia de la garantía.
- No diagnostica ni repara productos.
- No accede a casos de otros clientes.
- No consulta reportes administrativos.

### 2.2 Asesor de Tienda

Colaborador de la sucursal y primer punto de contacto con el Cliente. Recibe la solicitud, valida la garantía y direcciona el caso.

**Responsabilidades:**

- Recibir y registrar la solicitud del Cliente.
- Validar vigencia, cobertura y condiciones de la garantía.
- Crear el expediente o ticket de servicio.
- Asignar el caso al taller cuando la garantía es válida.
- Escalar el caso al Administrador del Sistema cuando la garantía no es válida.
- Informar al Cliente sobre el resultado de la validación.

**Restricciones:**

- No diagnostica ni repara productos.
- No resuelve casos escalados.
- No administra usuarios, roles o permisos.
- No configura catálogos del sistema.

### 2.3 Técnico del Taller

Encargado de diagnosticar el producto y mantener actualizado el estado de la orden durante su ciclo de atención: **Ingresado → En Taller → Reparado → Entregado**.

**Responsabilidades:**

- Consultar los casos asignados.
- Registrar y actualizar el diagnóstico.
- Actualizar el estado de la orden.
- Registrar información sobre la reparación.
- Generar el evento que activa las notificaciones al Cliente.

**Restricciones:**

- No valida garantías.
- No resuelve casos escalados por garantía inválida.
- No gestiona usuarios ni permisos.
- No configura el sistema.

### 2.4 Administrador del Sistema

Responsable de la operación general de la plataforma, la supervisión del servicio y la resolución de situaciones especiales.

**Responsabilidades:**

- Gestionar usuarios, roles y permisos.
- Configurar catálogos del sistema.
- Revisar y resolver casos escalados.
- Cerrar casos una vez resuelta la situación.
- Consultar el historial completo de los reclamos.
- Controlar tiempos de atención.
- Reasignar casos cuando sea necesario.
- Consultar indicadores y generar reportes.

**Restricciones:**

- No diagnostica ni repara productos.
- No atiende directamente al Cliente en la sucursal.

### 2.5 Sistema de Notificaciones

Servicio externo no humano, como correo electrónico o SMS, utilizado para mantener informado al Cliente.

**Responsabilidades:**

- Enviar notificaciones ante cambios de estado.
- Enviar alertas por vencimientos próximos.
- Registrar errores cuando una notificación no puede enviarse.

**Restricciones:**

- No toma decisiones.
- No valida información.
- No modifica reclamos ni diagnósticos.
- Solo ejecuta los envíos solicitados por el sistema.

---

## 3. Catálogo de requerimientos funcionales

| ID | Requerimiento funcional | Actor(es) | Prioridad | Trazabilidad |
|---|---|---|---|---|
| **RF-01** | El sistema debe permitir al Asesor de Tienda registrar un reclamo de garantía sobre un producto comprado por el Cliente | Asesor de Tienda | Alta (Must) | GOL-01 / HU2 |
| **RF-02** | El sistema debe permitir al Cliente consultar en tiempo real el estado de su reclamo o reparación | Cliente | Alta (Must) | GOL-02 / HU1 |
| **RF-03** | El sistema debe permitir al Asesor de Tienda validar si la garantía reportada está vigente y es procedente | Asesor de Tienda | Alta (Must) | HU8 / UML |
| **RF-04** | El sistema debe permitir al Asesor de Tienda generar un ticket de servicio y asignarlo al taller cuando la garantía es válida | Asesor de Tienda, Técnico del Taller | Alta (Must) | HU8 / UML |
| **RF-05** | El sistema debe permitir al Asesor de Tienda escalar el caso al Administrador del Sistema cuando la garantía no es válida | Asesor de Tienda, Administrador del Sistema | Alta (Must) | HU8 / HU9 |
| **RF-06** | El sistema debe permitir al Técnico del Taller registrar y actualizar el diagnóstico del producto | Técnico del Taller | Alta (Must) | GOL-03 / HU3 |
| **RF-07** | El sistema debe permitir al Técnico del Taller actualizar el estado de la orden en sus etapas: Ingresado, En Taller, Reparado y Entregado | Técnico del Taller | Alta (Must) | GOL-04 / HU7 |
| **RF-08** | El sistema debe enviar una notificación automática por correo electrónico o SMS al Cliente cada vez que cambie el estado de su caso | Sistema de Notificaciones, Cliente | Media (Should) | GOL-05 / HU5 |
| **RF-09** | El sistema debe permitir al Administrador del Sistema revisar y resolver los casos escalados por garantía inválida | Administrador del Sistema | Media (Should) | HU9 / UML |
| **RF-10** | El sistema debe permitir al Administrador del Sistema cerrar un caso una vez resuelta la situación | Administrador del Sistema | Alta (Must) | HU9 |
| **RF-11** | El sistema debe permitir al Administrador del Sistema gestionar usuarios, roles y permisos de asesores y técnicos | Administrador del Sistema | Baja (Could) | GOL-07 / HU4 |
| **RF-12** | El sistema debe permitir al Administrador del Sistema configurar catálogos como tipos de falla, sucursales y SLA de garantía | Administrador del Sistema | Baja (Could) | Tabla de problemáticas |
| **RF-13** | El sistema debe permitir al Administrador del Sistema consultar el historial completo de acciones de un reclamo para fines de auditoría | Administrador del Sistema | Media (Should) | GOL-06 / HU6 |
| **RF-14** | El sistema debe generar reportes e indicadores de desempeño del servicio técnico | Administrador del Sistema | Baja (Could) | HU10 |
| **RF-15** | El sistema debe controlar los tiempos de garantía y emitir alertas ante vencimientos próximos | Sistema de Notificaciones, Administrador del Sistema | Media (Should) | Tabla de problemáticas |

---

## 4. Catálogo de requerimientos no funcionales

| ID | Requerimiento no funcional | Categoría | Métrica verificable |
|---|---|---|---|
| **RNF-01** | El sistema debe responder a las consultas de estado en tiempos aceptables bajo carga normal | Rendimiento | Tiempo de respuesta menor o igual a 3 segundos con hasta 200 usuarios concurrentes |
| **RNF-02** | La plataforma debe estar disponible durante el horario de atención | Disponibilidad | Disponibilidad igual o superior al 99 % entre las 8:00 y las 18:00, de lunes a sábado |
| **RNF-03** | El acceso debe estar controlado según el perfil del usuario | Seguridad | Autenticación obligatoria y control de acceso basado en roles |
| **RNF-04** | La información sensible debe protegerse en tránsito y en reposo | Seguridad | Uso de TLS 1.2 o superior y cifrado de datos sensibles en la base de datos |
| **RNF-05** | El registro de un reclamo debe ser fácil de utilizar para personal nuevo | Usabilidad | Un Asesor de Tienda nuevo completa el registro en un máximo de 5 minutos |
| **RNF-06** | El sistema debe soportar el crecimiento esperado de reclamos | Escalabilidad | Soporta un crecimiento anual del 20 % sin degradar el RNF-01 |
| **RNF-07** | Cada cambio de estado debe quedar registrado de forma inmodificable | Trazabilidad y auditoría | Bitácora con fecha, hora y usuario responsable, sin opción de edición o eliminación |
| **RNF-08** | El portal del Cliente debe funcionar desde distintos dispositivos | Compatibilidad | Diseño responsive en Chrome, Edge y Safari, tanto en escritorio como en móvil |
| **RNF-09** | Las notificaciones automáticas deben llegar oportunamente | Confiabilidad | Tiempo máximo de 5 minutos entre el cambio de estado y el envío |

---

## 5. Resumen de historias de usuario

| ID | Actor | Historia | Prioridad | Story Points |
|---|---|---|---|---|
| **HU1** | Cliente | Consultar estado | Alta (Must) | 3 |
| **HU2** | Asesor de Tienda | Registrar reclamo | Alta (Must) | 5 |
| **HU3** | Técnico del Taller | Actualizar diagnóstico | Alta (Must) | 8 |
| **HU4** | Administrador del Sistema | Administrar usuarios | Baja (Could) | 5 |
| **HU5** | Sistema de Notificaciones | Enviar notificaciones | Media (Should) | 3 |
| **HU6** | Administrador del Sistema | Consultar historial | Media (Should) | 5 |
| **HU7** | Técnico del Taller | Cambiar estado de la orden | Alta (Must) | 8 |
| **HU8** | Asesor de Tienda | Validar garantía | Alta (Must) | 5 |
| **HU9** | Administrador del Sistema | Resolver casos escalados | Media (Should) | 5 |
| **HU10** | Administrador del Sistema | Generar reportes de desempeño | Baja (Could) | 5 |

---

## 6. Historias de usuario y criterios de aceptación

### HU1 — Consultar estado

**Como** Cliente de Gollo Respaldo,  
**deseo** consultar el estado de mi garantía en tiempo real mediante una plataforma web,  
**para** no tener que llamar o visitar la sucursal.

**Criterios de aceptación:**

- Dado un número de reclamo válido, cuando el Cliente lo ingresa, el sistema muestra el estado actual en menos de 3 segundos.
- Dado un número inexistente o incorrecto, el sistema muestra un mensaje claro sin exponer datos de otros clientes.
- La consulta muestra la fecha del último cambio de estado.

### HU2 — Registrar reclamo

**Como** Asesor de Tienda,  
**deseo** registrar un reclamo en formato digital,  
**para** eliminar la duplicidad de datos en sistemas aislados.

**Criterios de aceptación:**

- Al completar los campos obligatorios, el sistema genera un número de reclamo único.
- Si falta información obligatoria, el sistema impide guardar y señala los campos faltantes.
- El reclamo queda disponible para consulta y validación inmediatamente después del registro.

### HU3 — Actualizar diagnóstico

**Como** Técnico del Taller,  
**deseo** registrar y actualizar el diagnóstico de reparación,  
**para** que la información esté disponible inmediatamente.

**Criterios de aceptación:**

- El diagnóstico se guarda con fecha, hora y Técnico responsable.
- Las actualizaciones conservan el historial de versiones anteriores.
- Cada actualización puede activar una notificación al Cliente.

### HU4 — Administrar usuarios

**Como** Administrador del Sistema,  
**deseo** gestionar usuarios, roles y permisos,  
**para** garantizar la seguridad de la información.

**Criterios de aceptación:**

- Cada usuario nuevo recibe un rol definido.
- Un usuario desactivado no puede iniciar sesión.
- Todo cambio de permisos queda registrado en la bitácora.

### HU5 — Enviar notificaciones

**Como** Sistema de Notificaciones,  
**deseo** enviar mensajes automáticos cuando cambie el estado del artículo,  
**para** mantener informado al Cliente.

**Criterios de aceptación:**

- La notificación se envía en un máximo de 5 minutos.
- Si el envío falla, el sistema registra el error sin detener el reclamo.
- El mensaje incluye número de reclamo, estado actual y fecha.

### HU6 — Consultar historial

**Como** Administrador del Sistema,  
**deseo** consultar el historial completo de un reclamo,  
**para** auditar tiempos de respuesta y desempeño.

**Criterios de aceptación:**

- El historial muestra los cambios en orden cronológico.
- Cada registro incluye fecha, hora y responsable.
- La información no puede editarse ni eliminarse.
- Se puede filtrar por fechas o Técnico.

### HU7 — Cambiar estado de la orden

**Como** Técnico del Taller,  
**deseo** actualizar el estado de la orden,  
**para** mantener la trazabilidad completa del proceso.

**Criterios de aceptación:**

- No se permiten saltos inválidos entre estados.
- Cada cambio se registra en el historial.
- Cada cambio activa la notificación correspondiente.
- Para marcar un producto como Reparado debe existir un diagnóstico previo.

### HU8 — Validar garantía

**Como** Asesor de Tienda,  
**deseo** validar la vigencia y cobertura de la garantía,  
**para** decidir si genero un ticket o escalo el caso.

**Criterios de aceptación:**

- El sistema muestra la vigencia y cobertura de la garantía.
- Si la garantía es válida, se genera un ticket y se asigna al taller.
- Si no es válida, se escala al Administrador del Sistema indicando el motivo.

### HU9 — Resolver casos escalados

**Como** Administrador del Sistema,  
**deseo** revisar y resolver casos escalados por garantía inválida,  
**para** dar una respuesta formal al Cliente.

**Criterios de aceptación:**

- El Administrador puede consultar el motivo de escalamiento.
- La resolución queda registrada.
- El Cliente recibe una notificación con el resultado.
- El caso puede cerrarse una vez resuelto.

### HU10 — Generar reportes de desempeño

**Como** Administrador del Sistema,  
**deseo** generar reportes e indicadores del servicio técnico,  
**para** identificar cuellos de botella y tiempos de respuesta.

**Criterios de aceptación:**

- El reporte incluye tiempo promedio de respuesta, reclamos por estado y casos escalados.
- Los reportes pueden exportarse en PDF o Excel.
- Cuando no hay datos, el sistema muestra un mensaje claro.

---

## 7. Regla transversal de trazabilidad

Cada cambio de estado debe registrar:

- Fecha.
- Hora.
- Usuario responsable.
- Estado anterior.
- Estado nuevo.

Además, cada cambio puede generar una notificación automática para el Cliente.

