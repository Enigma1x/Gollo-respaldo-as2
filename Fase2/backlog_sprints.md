# Backlog y Planificación de Sprints

**Proyecto:** Sistema de Gestión de Garantías “Gollo Respaldo”  
**Fase:** 2  
**Metodología:** Scrum

---

## Introducción

El presente documento tiene como propósito presentar la planificación del proyecto bajo la metodología Scrum, incluyendo el Product Backlog priorizado, la organización de las historias de usuario en un tablero de Jira o Trello y la planificación de los sprints.

Esta planificación permite organizar el trabajo de forma iterativa, priorizar las funcionalidades de mayor valor y facilitar el seguimiento del avance durante el desarrollo del Sistema de Gestión de Garantías “Gollo Respaldo”.

---

## 1. Product Backlog Priorizado

| Prioridad | ID | Historia | Puntos de Historia | Estado |
|---|---|---|---:|---|
| Alta | HU2 | Registrar reclamo | 5 | Pendiente |
| Alta | HU1 | Consultar estado | 3 | Pendiente |
| Alta | HU3 | Actualizar diagnóstico | 8 | Pendiente |
| Alta | HU7 | Cambiar estado de la orden | 8 | Pendiente |
| Alta | HU8 | Validar garantía | 5 | Pendiente |
| Media | HU5 | Enviar notificaciones | 3 | Pendiente |
| Media | HU6 | Consultar historial | 5 | Pendiente |
| Media | HU9 | Resolver casos escalados | 5 | Pendiente |
| Baja | HU4 | Administrar usuarios | 5 | Pendiente |
| Baja | HU10 | Generar reportes KPI | 5 | Pendiente |

---

## 2. Propuesta de Tablero Jira/Trello

### Backlog

- HU2 — Registrar reclamo.
- HU1 — Consultar estado.
- HU3 — Actualizar diagnóstico.
- HU7 — Cambiar estado.
- HU8 — Validar garantía.
- HU5 — Enviar notificaciones.
- HU6 — Consultar historial.
- HU9 — Resolver casos escalados.
- HU4 — Administrar usuarios.
- HU10 — Reportes KPI.

### Sprint 1

- HU2 — Registrar reclamo.
- HU1 — Consultar estado.
- HU8 — Validar garantía.

### Sprint 2

- HU3 — Actualizar diagnóstico.
- HU7 — Cambiar estado.
- HU5 — Enviar notificaciones.

### Sprint 3

- HU6 — Consultar historial.
- HU9 — Resolver casos escalados.
- HU4 — Administrar usuarios.
- HU10 — Reportes KPI.

### Columnas de seguimiento

- Pendiente.
- En progreso.
- En revisión.
- Completado.

---

## 3. Planificación de Sprints

### Sprint 1 — Registro y Validación de Garantías

**Duración:** 2 semanas.

**Objetivo:** Desarrollar las funcionalidades esenciales que permitan registrar las solicitudes de garantía de los clientes, validar la vigencia y cobertura de la garantía y ofrecer una consulta del estado del reclamo.

Este sprint tiene como finalidad entregar un Producto Mínimo Viable (MVP) que permita iniciar el proceso de gestión de garantías de manera digital, eliminando registros manuales y mejorando la atención al cliente desde la primera interacción.

| Historia | Puntos de Historia |
|---|---:|
| HU2 — Registrar reclamo | 5 |
| HU1 — Consultar estado | 3 |
| HU8 — Validar garantía | 5 |
| **Total** | **13** |

---

### Sprint 2 — Gestión del Taller y Seguimiento de Órdenes

**Duración:** 2 semanas.

**Objetivo:** Implementar las funcionalidades relacionadas con el trabajo del taller técnico, permitiendo registrar y actualizar el diagnóstico de los productos, controlar el avance de cada orden de servicio mediante cambios de estado y mantener informado al cliente mediante notificaciones automáticas.

Con este sprint se busca garantizar la trazabilidad completa del proceso de reparación y mejorar la comunicación entre las áreas involucradas.

| Historia | Puntos de Historia |
|---|---:|
| HU3 — Actualizar diagnóstico | 8 |
| HU7 — Cambiar estado | 8 |
| HU5 — Notificaciones | 3 |
| **Total** | **19** |

---

### Sprint 3 — Administración, Auditoría y Cierre del Proyecto

**Duración:** 2 semanas.

**Objetivo:** Finalizar el desarrollo del sistema mediante la incorporación de las funcionalidades administrativas y de control, permitiendo gestionar usuarios y permisos, resolver casos escalados, consultar el historial completo de los reclamos y generar reportes de desempeño.

Además, durante este sprint se realizarán las pruebas integrales del sistema, la corrección de incidencias detectadas y la preparación del producto para su entrega final.

| Historia | Puntos de Historia |
|---|---:|
| HU6 — Historial | 5 |
| HU9 — Resolver casos escalados | 5 |
| HU4 — Administrar usuarios | 5 |
| HU10 — Reportes KPI | 5 |
| **Total** | **20** |

---

## 4. Resumen de Carga por Sprint

| Sprint | Historias | Total de Puntos |
|---|---|---:|
| Sprint 1 | HU2, HU1, HU8 | 13 |
| Sprint 2 | HU3, HU7, HU5 | 19 |
| Sprint 3 | HU6, HU9, HU4, HU10 | 20 |
| **Total del proyecto** | **10 historias de usuario** | **52** |

---

## 5. Observación

Se recomienda incluir la historia de usuario **HU8 — Validar garantía** en el Sprint 1, ya que es una funcionalidad de prioridad Alta y forma parte del proceso principal de gestión de garantías.

En su lugar, **HU4 — Administrar usuarios**, al ser de prioridad Baja, puede desarrollarse en un sprint posterior sin afectar el funcionamiento del Producto Mínimo Viable (MVP).

---

## 6. Estado Inicial del Backlog

Al momento de crear esta planificación, todas las historias se encuentran en estado **Pendiente**. Durante el desarrollo deberán moverse entre las columnas del tablero según su progreso:

```text
Pendiente → En progreso → En revisión → Completado
```

