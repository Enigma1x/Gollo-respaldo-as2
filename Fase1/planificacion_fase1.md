# Planificación del Proyecto — Fase 1

**Proyecto:** Sistema de Gestión de Garantías “Gollo Respaldo”  
**Responsable:** Osman Gomez Jarquin  
**Metodología:** Scrum

---

## 1. Introducción

La planificación del proyecto se desarrolla bajo la metodología Scrum, incorporando estimaciones, priorización de historias de usuario, organización por sprints, gestión de cambios, estrategia de control de versiones y evaluación de riesgos.

El propósito es organizar el trabajo de forma iterativa, controlar los cambios del alcance y facilitar la entrega progresiva de las funcionalidades del sistema.

---

## 2. Objetivo de la planificación

Planificar el desarrollo del Sistema de Gestión de Garantías “Gollo Respaldo” de forma incremental, priorizando las funcionalidades de mayor valor para el negocio y estableciendo mecanismos para medir el esfuerzo, controlar los cambios y reducir los riesgos del proyecto.

---

## 3. Metodología Scrum

Scrum permite dividir el trabajo en períodos cortos llamados **sprints**, dentro de los cuales se desarrollan y revisan grupos de funcionalidades.

La metodología propuesta contempla:

- Product Backlog.
- Priorización MoSCoW.
- Historias de usuario.
- Estimación mediante Planning Poker.
- Estimaciones PERT.
- Planificación de sprints.
- Seguimiento mediante reuniones breves.
- Gestión formal de cambios.
- Control de versiones con Git.

---

## 4. Estimación mediante Planning Poker

Para estimar el esfuerzo de las historias de usuario se utiliza la escala Fibonacci:

**1, 2, 3, 5, 8, 13**

| Historia | Descripción | Story Points |
|---|---|---:|
| **HU1** | Consultar estado | 3 |
| **HU2** | Registrar reclamo | 5 |
| **HU3** | Actualizar diagnóstico | 8 |
| **HU4** | Administrar usuarios | 5 |
| **HU5** | Enviar notificaciones | 3 |
| **HU6** | Consultar historial | 5 |
| **HU7** | Cambiar estado de la orden | 8 |

Los Story Points representan el esfuerzo relativo de cada historia, considerando complejidad, incertidumbre y cantidad de trabajo.

---

## 5. Estimaciones PERT

Para estimar la duración esperada de algunas actividades se utiliza la fórmula:

```text
PERT = (O + 4M + P) / 6
```

Donde:

- **O:** estimación optimista.
- **M:** estimación más probable.
- **P:** estimación pesimista.

| Actividad | O | M | P | Estimación PERT |
|---|---:|---:|---:|---:|
| Registrar reclamo | 2 h | 4 h | 8 h | 4.3 h |
| Actualizar diagnóstico | 1 h | 3 h | 5 h | 3 h |
| Consultar garantía | 2 h | 3 h | 4 h | 3 h |

---

## 6. Priorización del Product Backlog

Las historias de usuario se priorizan mediante la metodología **MoSCoW**:

- **Must have:** requisito indispensable.
- **Should have:** requisito importante, pero no crítico para la primera entrega.
- **Could have:** requisito deseable.
- **Won’t have:** requisito excluido temporalmente.

### Backlog inicial

| ID Jira | Módulo | Historia de usuario | Prioridad | SP | Impacto operativo |
|---|---|---|---|---:|---|
| **GOL-01** | Gestión de Reclamos | HU2: Registrar un reclamo en formato digital | Alta (Must) | 5 | Reduce errores del registro manual y centraliza la información |
| **GOL-02** | Seguimiento de Órdenes | HU1: Consultar el estado de la garantía en tiempo real | Alta (Must) | 3 | Reduce llamadas y visitas a la sucursal |
| **GOL-03** | Diagnósticos | HU3: Registrar y actualizar el diagnóstico | Alta (Must) | 8 | Evita información desactualizada sobre el producto |
| **GOL-04** | Seguimiento de Órdenes | HU7: Actualizar el estado de la orden | Alta (Must) | 8 | Mantiene la trazabilidad y el historial de cambios |
| **GOL-05** | Diagnósticos | HU5: Enviar notificaciones automáticas | Media (Should) | 3 | Mejora la comunicación entre tienda, taller y Cliente |
| **GOL-06** | Seguimiento de Órdenes | HU6: Consultar el historial completo del reclamo | Media (Should) | 5 | Facilita la auditoría y el control de tiempos |
| **GOL-07** | Control de Acceso | HU4: Gestionar usuarios, roles y permisos | Baja (Could) | 5 | Restringe el acceso según el perfil del usuario |

### Resumen por prioridad

| Prioridad | Elementos |
|---|---|
| **Alta** | Registrar reclamo, consultar estado, actualizar diagnóstico y cambiar estado |
| **Media** | Enviar notificaciones y consultar historial |
| **Baja** | Administrar usuarios y generar reportes KPI |

---

## 7. Planificación de sprints

### Sprint 1 — Núcleo de Registro y Consulta Pública

**Objetivo:** implementar el Producto Mínimo Viable enfocado en registrar reclamos, permitir la consulta pública del estado y establecer el control de acceso inicial.

| Historia | Descripción | SP |
|---|---|---:|
| GOL-01 / HU2 | Registrar reclamo | 5 |
| GOL-02 / HU1 | Consultar estado | 3 |
| GOL-07 / HU4 | Administrar usuarios | 5 |
|  | **Total** | **13** |

### Sprint 2 — Gestión de Taller y Trazabilidad

**Objetivo:** digitalizar la operación del taller y permitir el seguimiento de las órdenes durante las distintas etapas de reparación.

| Historia | Descripción | SP |
|---|---|---:|
| GOL-03 / HU3 | Actualizar diagnóstico | 8 |
| GOL-04 / HU7 | Cambiar estado de la orden | 8 |
| GOL-05 / HU5 | Enviar notificaciones | 3 |
|  | **Total** | **19** |

### Sprint 3 — Auditoría, Reportes y Cierre

**Objetivo:** incorporar mecanismos de control, historial de cumplimiento, reportes e indicadores, además de realizar las pruebas integrales previas al cierre del proyecto.

| Elemento | Descripción | SP |
|---|---|---:|
| GOL-06 / HU6 | Consultar historial | 5 |
| Pruebas integrales | Validación general del sistema | Por estimar |
| Reportes KPI | Indicadores de desempeño | Por estimar |
| Ajustes finales | Corrección de incidencias y preparación de entrega | Por estimar |

---

## 8. Gestión de cambios

Todo cambio solicitado durante el proyecto debe documentarse mediante una **Solicitud de Cambio o RFC**.

Cada RFC debe incluir:

- Número de solicitud.
- Persona solicitante.
- Fecha.
- Descripción del cambio.
- Justificación.
- Elementos afectados.
- Impacto estimado.
- Prioridad.
- Responsable.
- Decisión de aprobación o rechazo.
- Firmas de aprobación.

Los cambios aprobados que afecten el alcance pueden provocar que tareas de menor prioridad sean trasladadas a un sprint posterior.

---

## 9. Estrategia de control de versiones

El repositorio utilizará un modelo de ramas jerárquico.

### Ramas principales

- **`main`:** contiene únicamente versiones estables y aprobadas.
- **`develop`:** integra el trabajo completado por el equipo.
- **`feature/`:** ramas temporales utilizadas para desarrollar historias o documentos específicos.

Ejemplo:

```text
feature/GOL-01-registro-reclamo
```

### Convención de commits

Los commits deben seguir una estructura descriptiva:

```text
tipo(alcance): descripción breve
```

Ejemplos:

```text
feat(reclamos): registrar modelo de datos para HU2
fix(seguimiento): corregir búsqueda por número de orden
docs(readme): añadir documentación del proyecto
docs(planificacion): agregar planificación de la fase 1
```

### Integración del trabajo

1. Crear una rama `feature/` desde `develop`.
2. Realizar los cambios correspondientes.
3. Crear commits descriptivos.
4. Subir la rama al repositorio remoto.
5. Crear un Pull Request hacia `develop`.
6. Solicitar revisión de otro integrante.
7. Fusionar los cambios aprobados.

---

## 10. Riesgos de planificación

| Riesgo | Probabilidad | Impacto | Estrategia de mitigación |
|---|---|---|---|
| Cambios frecuentes en el alcance | Alta | Alto | Utilizar RFC y trasladar tareas de menor prioridad a otro sprint |
| Dependencias e incomunicación entre integrantes | Media | Alto | Realizar reuniones breves para identificar bloqueos |
| Conflictos o pérdida de información en Git | Alta | Medio | Utilizar Pull Requests y revisión por pares antes de fusionar |
| Falta de disponibilidad de usuarios clave | Media | Medio | Programar las revisiones con anticipación y compartir prototipos |
| Retrasos en las actividades | Media | Alto | Revisar el avance del sprint y reasignar tareas cuando sea necesario |

---

## 11. Seguimiento del proyecto

El avance del proyecto debe revisarse periódicamente mediante:

- Revisión del Product Backlog.
- Seguimiento de historias completadas.
- Actualización de Story Points.
- Registro de bloqueos.
- Revisión de cambios aprobados.
- Validación de entregables al final de cada sprint.
- Evidencia de commits y Pull Requests.

---

## 12. Conclusión

La planificación propuesta permite organizar el trabajo, priorizar las funcionalidades más importantes y controlar los cambios mediante Scrum. El uso de estimaciones, sprints, gestión de riesgos y control de versiones facilita el seguimiento del proyecto y reduce la posibilidad de pérdida de información o conflictos durante la integración.

