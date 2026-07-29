# Análisis del Negocio

**Proyecto:** Sistema de Gestión de Garantías “Gollo Respaldo”  
**Responsable:** Andrew Barrantes James  
**Fase:** 1

---

## 1. Introducción

En la actualidad, las empresas dedicadas a la comercialización de electrodomésticos y artículos tecnológicos requieren sistemas de información que les permitan gestionar de forma eficiente los procesos relacionados con la atención al cliente.

Uno de estos procesos es la administración de garantías, el cual implica el registro, seguimiento y resolución de las solicitudes presentadas por los clientes.

El presente proyecto propone el desarrollo de un sistema de gestión de garantías para Gollo, con el propósito de mejorar el control de las solicitudes, reducir los tiempos de respuesta y facilitar el seguimiento de cada caso.

La implementación de este sistema permitirá centralizar la información, optimizar el trabajo de los colaboradores y brindar un mejor servicio a los clientes.

---

## 2. Objetivo general

Diseñar y desarrollar un sistema de gestión de garantías para Gollo que permita registrar, administrar y dar seguimiento a las solicitudes de garantía de los clientes, optimizando los procesos internos y mejorando la calidad del servicio.

---

## 3. Justificación

Actualmente, el proceso de gestión de garantías puede presentar dificultades relacionadas con el seguimiento de los casos, el acceso a la información y la comunicación entre las diferentes áreas involucradas.

El desarrollo de un sistema especializado permitirá automatizar gran parte del proceso, reducir errores administrativos, mantener un historial de cada garantía y facilitar la consulta del estado de cada solicitud.

Además, el sistema contribuirá a mejorar la experiencia del cliente al ofrecer una gestión más rápida, organizada y eficiente.

---

## 4. Alcance

El sistema permitirá administrar el proceso completo de garantías, desde el registro inicial hasta el cierre del caso.

Las principales funcionalidades incluyen:

- Registro de clientes.
- Registro de productos.
- Registro de solicitudes de garantía.
- Consulta del estado de cada solicitud.
- Asignación de técnicos.
- Registro del diagnóstico.
- Actualización del estado del servicio.
- Reparación o reemplazo del producto, según corresponda.
- Almacenamiento del historial de garantías.
- Administración de usuarios.
- Generación de reportes básicos.

### 4.1 Dentro del alcance

- Análisis y documentación del sistema.
- Diseño conceptual de la solución.
- Levantamiento de requerimientos funcionales y no funcionales.
- Definición de actores y roles.
- Historias de usuario con criterios de aceptación.
- Diagramas UML.
- Estimaciones mediante Planning Poker y PERT.
- Planificación Scrum.
- Product Backlog y planificación de sprints.
- Mockups funcionales.
- Modelo entidad-relación.
- Diccionario de datos.
- Gestión de cambios mediante RFC.
- Repositorio Git con control de versiones.

### 4.2 Fuera del alcance

- Desarrollo de código fuente funcional.
- Implementación de una base de datos operativa.
- Hosting o despliegue en servidores.
- Pruebas formales de software.
- Diseño gráfico avanzado o branding.
- Integración con APIs externas reales.
- Reparación física de productos.
- Transporte de productos.
- Procesos de venta y facturación.
- Administración del inventario general.
- Contabilidad y compras.

---

## 5. Ficha de la empresa

| Campo | Detalle |
|---|---|
| **Empresa** | Gollo |
| **Actividad** | Venta de electrodomésticos, tecnología, muebles, línea blanca, motocicletas y productos para el hogar |
| **Sector** | Comercio minorista |
| **Ubicación** | Sucursales en todo Costa Rica |
| **Servicios** | Venta de productos, financiamiento, servicio postventa, garantías y atención al cliente |
| **Necesidad identificada** | Mejorar la gestión y el seguimiento de las garantías mediante un sistema informático |

---

## 6. Problema actual

El proceso actual de gestión de garantías presenta dificultades para localizar la información de los clientes y productos, conocer el estado de las solicitudes, mantener un historial centralizado y coordinar la comunicación entre asesores y técnicos.

Estas limitaciones pueden generar:

- Retrasos en la atención.
- Errores administrativos.
- Información desactualizada.
- Dificultades para dar seguimiento a los casos.
- Problemas de comunicación entre áreas.
- Disminución en la calidad del servicio al cliente.

---

## 7. Gestión actual de garantías

El proceso de gestión de garantías se desarrolla mediante las siguientes etapas:

1. Recepción de la solicitud del cliente.
2. Verificación de la factura de compra.
3. Validación de la garantía.
4. Registro del producto.
5. Envío del producto al área técnica.
6. Diagnóstico del producto.
7. Reparación o reemplazo, según corresponda.
8. Comunicación del resultado al cliente.
9. Entrega del producto al cliente.

---

## 8. Procesos dentro del sistema

El sistema permitirá realizar las siguientes funciones:

- Inicio de sesión de usuarios.
- Administración de usuarios.
- Registro de clientes.
- Registro de productos.
- Registro de solicitudes de garantía.
- Validación de garantías.
- Asignación de técnicos.
- Registro de diagnósticos.
- Actualización del estado de las solicitudes.
- Consulta del historial de garantías.
- Búsqueda de información.
- Envío de notificaciones.
- Generación de reportes básicos.

---

## 9. Procesos fuera del sistema

Las siguientes actividades no serán administradas directamente por el sistema:

- Reparación física de los productos.
- Transporte de los productos.
- Proceso de ventas.
- Facturación.
- Administración del inventario general.
- Contabilidad.
- Compras.

---

## 10. Beneficios esperados

La implementación del sistema permitirá obtener los siguientes beneficios:

- Mayor rapidez en la atención de las garantías.
- Reducción de errores administrativos.
- Centralización de la información.
- Seguimiento de solicitudes en tiempo real.
- Mejor comunicación entre asesores y técnicos.
- Historial completo de cada garantía.
- Generación de reportes para la toma de decisiones.
- Mayor control sobre los tiempos de atención.
- Mayor satisfacción de los clientes.

---

## 11. Identificación de la solución

Se propone el análisis y diseño conceptual de un **Sistema de Gestión de Reclamos y Servicio Técnico para “Gollo Respaldo”**, orientado a mejorar el proceso de atención de garantías extendidas y brindar una mayor trazabilidad durante el ciclo de servicio de los productos.

La solución consiste en una plataforma centralizada con módulos para:

- Gestión de reclamos.
- Validación de garantías.
- Seguimiento de órdenes de servicio.
- Asignación de técnicos.
- Actualización de diagnósticos.
- Control de estados.
- Consulta de historial.
- Envío de notificaciones.
- Generación de reportes.

---

## 12. Identificación de stakeholders

Los principales interesados en el proyecto son:

| Stakeholder | Tipo | Interés principal |
|---|---|---|
| **Cliente** | Externo | Obtener una respuesta rápida y conocer el estado de su garantía |
| **Asesor de Tienda** | Interno | Registrar y validar correctamente las solicitudes |
| **Técnico del Taller** | Interno | Consultar casos y actualizar diagnósticos y estados |
| **Administrador del Sistema** | Interno | Supervisar el servicio, administrar usuarios y resolver casos especiales |
| **Gerencia** | Interno | Consultar indicadores para la toma de decisiones |
| **Sistema de Notificaciones** | Externo, no humano | Enviar avisos automáticos al cliente |

---

## 13. Evaluación de riesgos

Durante el desarrollo del proyecto pueden presentarse diferentes riesgos que afecten el cumplimiento de los objetivos.

| Riesgo | Posible consecuencia | Medida de prevención |
|---|---|---|
| Retrasos en el desarrollo | Incumplimiento de fechas | Planificar tareas y revisar periódicamente el avance |
| Cambios en los requerimientos | Modificación del alcance | Documentar los cambios mediante una RFC |
| Pérdida de información | Retrabajo o pérdida de avances | Realizar respaldos y utilizar control de versiones |
| Errores durante el desarrollo | Fallos en el sistema | Aplicar revisiones y pruebas continuas |
| Resistencia al cambio | Baja adopción por parte de los usuarios | Capacitar a los usuarios finales |
| Problemas con el servidor | Interrupción del servicio | Definir mecanismos de respaldo y recuperación |
| Falta de comunicación en el equipo | Duplicación de tareas o inconsistencias | Realizar reuniones breves de seguimiento |

---

## 14. Conclusión

El análisis realizado evidencia la necesidad de contar con un sistema centralizado para mejorar la gestión de garantías de Gollo Respaldo.

La propuesta permitirá organizar la información, facilitar el seguimiento de los casos, mejorar la comunicación entre las áreas involucradas y brindar al cliente una atención más rápida, clara y eficiente.

