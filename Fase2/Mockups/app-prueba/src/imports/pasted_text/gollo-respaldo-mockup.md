## OBJETIVO

Diseña un **mockup/prototipo web de alta fidelidad, moderno y profesional** para **Gollo Respaldo**, un sistema conceptual para la gestión y seguimiento de reclamos, garantías y servicio técnico.

No diseñes una landing page de marketing. Diseña una **aplicación web empresarial realista**, pensada para ser utilizada diariamente por personal de tienda, técnicos de taller y administradores, además de un portal simplificado para que el Cliente consulte el estado de su caso.

El resultado debe verse suficientemente completo y coherente para presentarlo como proyecto final universitario de **Análisis de Sistemas II**, pero también suficientemente profesional como para visualizar cómo podría convertirse posteriormente en un producto real.

---

# CONTEXTO DEL PRODUCTO

Gollo Respaldo busca centralizar un proceso que actualmente involucra clientes, sucursales, asesores, garantías, talleres, técnicos y seguimiento de reparaciones.

La solución debe permitir principalmente:

1. Registrar reclamos.
2. Consultar clientes y productos.
3. Validar la vigencia y cobertura de una garantía.
4. Generar un ticket u orden de servicio.
5. Asignar el caso a un taller o técnico.
6. Confirmar la recepción del producto.
7. Registrar y actualizar diagnósticos.
8. Actualizar el estado de la orden.
9. Consultar el historial completo del caso.
10. Enviar y consultar notificaciones.
11. Resolver casos escalados.
12. Administrar usuarios, roles y permisos.
13. Consultar indicadores y reportes.

---

# REGLA DE NEGOCIO CRÍTICA

NO diseñes una pantalla donde el Cliente cree directamente el reclamo dentro del sistema interno.

El flujo correcto es:

**Cliente reporta la falla o solicita la garantía → Asesor de Tienda registra el reclamo → Asesor valida la garantía.**

Si la garantía es válida:

**Generar ticket → recibir equipo → asignar técnico → diagnóstico → reparación → actualizar estados → notificar al Cliente → entregar producto → cerrar caso.**

Si la garantía NO es válida:

**Escalar al Administrador → revisar motivo → registrar resolución → notificar al Cliente → cerrar caso cuando corresponda.**

El Técnico no valida garantías.

El Asesor no realiza diagnósticos.

El Administrador no repara productos.

---

# USUARIOS Y ROLES

Diseña la experiencia considerando cuatro perfiles principales.

### Asesor de Tienda

Es el primer contacto con el Cliente.

Debe poder registrar reclamos, buscar clientes, consultar productos, validar garantías, generar tickets, consultar reclamos y escalar casos.

### Técnico del Taller

Debe tener una interfaz enfocada en productividad.

Debe consultar los casos que tiene asignados, confirmar recepción, registrar diagnóstico, indicar repuestos u observaciones y cambiar el estado de la orden.

### Administrador del Sistema

Debe supervisar toda la operación.

Debe consultar reclamos, resolver casos escalados, reasignar técnicos, consultar historial, gestionar usuarios y roles, revisar tiempos de atención y visualizar indicadores.

### Cliente

Debe utilizar un portal mucho más simple que la aplicación interna.

Su principal objetivo es introducir su número de reclamo más un dato de validación y conocer rápidamente el estado de su solicitud, fecha de última actualización y progreso de la reparación.

---

# ARQUITECTURA DE NAVEGACIÓN

Para la plataforma interna utiliza una estructura de aplicación web con:

**Sidebar izquierda fija + header superior + contenido principal.**

Sidebar:

Dashboard
Reclamos
Servicio técnico
Clientes
Garantías
Notificaciones
Reportes
Usuarios y permisos
Configuración

En la parte inferior del sidebar mostrar usuario conectado, rol y opción para cerrar sesión.

El contenido debe variar según permisos del usuario.

No mostrar opciones administrativas a un Técnico o Asesor si no corresponden a su rol.

---

# PANTALLAS A DISEÑAR

Crea frames completos y separados, conectados como un prototipo navegable.

## 01 — Inicio de sesión

Pantalla limpia.

Mostrar Gollo Respaldo, correo/usuario, contraseña, “Recordarme”, recuperar contraseña e iniciar sesión.

No sobrecargar visualmente esta pantalla.

---

## 02 — Dashboard del Asesor

Debe permitir comprender el estado de la operación en segundos.

Mostrar:

Reclamos abiertos.
Pendientes de validación.
En servicio técnico.
Casos escalados.
Casos próximos a vencer.

Agregar una sección de “Actividad reciente” y una lista de reclamos recientes.

CTA principal destacado:

**+ Registrar reclamo**

Agregar buscador global para localizar por número de reclamo, cliente, cédula o número de serie.

---

## 03 — Registrar Reclamo

Esta es una de las pantallas más importantes.

Diseñarla como un flujo guiado o formulario dividido en pasos para reducir errores.

### Paso 1 — Cliente

Buscar cliente por cédula.

Mostrar nombre, teléfono, correo y dirección.

Permitir seleccionar un cliente existente o agregar uno nuevo.

### Paso 2 — Producto

Producto.
Marca.
Modelo.
Número de serie.
Fecha de compra.
Factura.

### Paso 3 — Garantía

Número o identificación de garantía.
Fecha de inicio.
Fecha de vencimiento.
Cobertura.
Estado.

### Paso 4 — Reclamo

Motivo.
Descripción detallada de la falla.
Prioridad.
Sucursal.
Adjuntos/evidencias.

Mostrar indicador de campos obligatorios.

Acciones:

**Cancelar**
**Guardar borrador**
**Validar datos**
**Registrar reclamo**

Al registrar correctamente, generar un número único de reclamo y mostrar un estado de éxito claro.

Registrar visualmente que el reclamo fue creado por el Asesor actualmente conectado.

---

## 04 — Validación de Garantía

Mostrar la información principal del Cliente, producto y garantía sin obligar al Asesor a cambiar de pantalla.

Crear una tarjeta destacada de resultado.

Ejemplo válido:

**Garantía vigente**
Vence: 18/04/2027
Cobertura: reparación por fallas de funcionamiento.

CTA principal:

**Aprobar y generar ticket**

Ejemplo inválido:

**Garantía no procede**

Mostrar claramente el motivo.

CTA:

**Escalar al Administrador**

Nunca dejar estados ambiguos.

---

## 05 — Lista de Reclamos

Crear una tabla profesional y escaneable.

Columnas:

N.º Reclamo
Cliente
Producto
Estado
Técnico
Sucursal
Prioridad
Fecha
Acciones

Agregar filtros por:

Estado
Prioridad
Sucursal
Técnico
Fecha

Agregar búsqueda.

Utilizar badges para los estados y no depender solamente del color para comunicar información.

---

## 06 — Detalle del Reclamo

Esta debe ser una pantalla central dentro del sistema.

Header con:

Número de reclamo.
Estado actual.
Prioridad.
Fecha de registro.
Asesor responsable.

Organizar la información mediante tabs o secciones:

**Resumen**
**Cliente**
**Producto y garantía**
**Servicio técnico**
**Diagnóstico**
**Historial**
**Notificaciones**

Mostrar una **timeline vertical u horizontal** del proceso:

Registrado
→ Garantía validada
→ Ingresado
→ En Taller
→ Reparado
→ Entregado
→ Cerrado

Cada evento del historial debe mostrar:

Fecha.
Hora.
Usuario responsable.
Estado anterior.
Estado nuevo.
Observación cuando corresponda.

El historial debe percibirse como información de auditoría que no se modifica.

---

## 07 — Dashboard del Técnico

Crear una vista más simple y orientada a tareas.

Mostrar:

Mis órdenes asignadas.
Pendientes de diagnóstico.
En reparación.
Listas para entrega.

Agregar una lista priorizada llamada:

**Mis casos de hoy**

Cada tarjeta o fila debe mostrar:

Número de orden.
Producto.
Cliente.
Prioridad.
Tiempo transcurrido.
Estado.

---

## 08 — Orden de Servicio Técnico

Mostrar:

Datos del producto.
Número de serie.
Condición al recibirlo.
Accesorios recibidos.
Fecha y hora de recepción.
Técnico asignado.

Sección **Diagnóstico**:

Descripción técnica.
Repuestos requeridos.
Costo estimado.
Tiempo estimado.
Observaciones.

Botón:

**Guardar diagnóstico**

Mostrar historial de versiones del diagnóstico en lugar de reemplazar silenciosamente diagnósticos anteriores.

---

## 09 — Actualizar Estado

Diseñar un modal o panel lateral.

Estados permitidos:

**Ingresado → En Taller → Reparado → Entregado**

Visualizar claramente el estado actual y el siguiente estado permitido.

No permitir saltos inválidos.

Para seleccionar **Reparado**, indicar que debe existir previamente un diagnóstico.

Agregar:

Observación.
Fecha/hora automática.
Técnico responsable.

Checkbox:

**Notificar al Cliente sobre este cambio**

CTA:

**Confirmar cambio de estado**

---

## 10 — Portal de Seguimiento del Cliente

Esta interfaz debe ser diferente a la aplicación interna.

Debe ser extremadamente simple, amigable y responsive.

Título:

**Consulta tu reparación**

Campos:

Número de reclamo.
Dato de validación.

CTA:

**Consultar estado**

Después de consultar mostrar:

Producto.
Número de reclamo.
Estado actual.
Fecha de última actualización.

Mostrar una línea de progreso visual:

Solicitud recibida
→ En revisión
→ En Taller
→ Reparado
→ Entregado

Incluir un resumen corto del avance.

Nunca mostrar información administrativa, técnica sensible o información de otros clientes.

Diseñar también una versión mobile de esta pantalla.

---

## 11 — Casos Escalados

Vista para Administrador.

Mostrar casos donde la garantía no fue aprobada.

Tabla con:

Reclamo.
Cliente.
Motivo del escalamiento.
Asesor.
Fecha.
Tiempo abierto.
Estado.

Al abrir un caso mostrar todos los antecedentes y permitir:

Registrar resolución.
Agregar observaciones.
Notificar al Cliente.
Cerrar caso.

---

## 12 — Dashboard Administrativo

Crear una vista analítica moderna pero sobria.

KPIs:

Reclamos abiertos.
Tiempo promedio de atención.
Casos escalados.
Casos próximos a vencer.
Reclamos finalizados.
Reclamos por sucursal.

Agregar gráficos útiles, no decorativos:

Reclamos por estado.
Tiempo promedio de resolución.
Productividad por Técnico.
Reclamos por sucursal.
Evolución semanal o mensual.

Agregar filtros de fecha y sucursal.

---

## 13 — Usuarios y Roles

Tabla con:

Nombre.
Correo.
Sucursal.
Rol.
Estado.
Último acceso.
Acciones.

Roles:

Asesor
Técnico
Administrador

Permitir:

Crear usuario.
Editar.
Asignar rol.
Activar/desactivar.

Mostrar visualmente que los permisos dependen del rol.

---

# SISTEMA VISUAL

La apariencia debe tener relación visual con la presentación de **Gollo Respaldo** utilizada como referencia.

Usar un estilo corporativo, moderno, limpio y ligeramente tecnológico.

Evitar que parezca un template genérico de Bootstrap.

Utilizar como dirección visual:

**Fondo:** blanco o gris cálido muy claro.
**Texto principal:** gris carbón casi negro.
**Color primario:** rojo profundo relacionado con Gollo Respaldo.
**Acento:** dorado/amarillo cálido.
**Color secundario:** azul grisáceo para servicio técnico, información y estados neutrales.
**Verde:** exclusivamente para éxito, garantía válida o procesos completados.
**Rojo de alerta:** errores, garantía inválida o acciones críticas.

Puede utilizarse de manera muy sutil una trama de puntos o elementos geométricos similares a la presentación, pero dentro de la aplicación debe mantenerse la legibilidad y no convertirse en decoración excesiva.

---

# DISEÑO UI

Utiliza:

Grid consistente.
Espaciado basado en múltiplos de 8 px.
Border radius moderado de aproximadamente 8–12 px.
Sombras muy ligeras.
Cards con jerarquía clara.
Tablas limpias.
Badges de estado.
Breadcrumbs cuando sea útil.
Modales y drawers consistentes.
Iconografía lineal coherente.

Usa Auto Layout.

Construye elementos reutilizables como componentes y variantes.

Crear componentes para:

Botones.
Inputs.
Selectores.
Date picker.
Search bar.
Cards KPI.
Badges.
Alertas.
Tablas.
Modal.
Tabs.
Sidebar.
Topbar.
Timeline.
Toast notifications.
Empty states.
Skeleton/loading states.

Crear estados:

Default.
Hover.
Focus.
Disabled.
Error.
Success.

---

# DATOS REALISTAS

No utilices únicamente “Lorem ipsum”.

Utiliza ejemplos en español y datos ficticios realistas de Costa Rica.

Ejemplo:

Reclamo: GR-2026-00428
Cliente: Laura Rodríguez Vargas
Producto: Refrigeradora Samsung RT38
Serie: SN92K41058
Sucursal: San José Centro
Asesor: Carlos Méndez
Técnico: Diego Vargas
Prioridad: Media
Estado: En Taller

Utiliza formatos de fecha como:

14/08/2026

Los ejemplos deben mantener consistencia entre las distintas pantallas.

---

# UX Y ACCESIBILIDAD

Priorizar claridad sobre decoración.

Las acciones principales deben ser inmediatamente identificables.

Los formularios largos deben dividirse en secciones o pasos.

Mostrar validaciones cerca del campo correspondiente.

Confirmar operaciones importantes.

Utilizar mensajes de error descriptivos.

No depender únicamente del color para indicar un estado.

Mantener buen contraste.

Los elementos interactivos deben tener tamaños cómodos.

El portal del Cliente debe ser responsive.

---

# PROTOTIPO

Conecta las pantallas principales para poder demostrar este recorrido:

**Login → Dashboard del Asesor → Registrar reclamo → Validar garantía → Generar ticket → Detalle del reclamo → Servicio Técnico → Registrar diagnóstico → Cambiar estado → Historial → Notificación → Cierre.**

Crear también una rama alternativa:

**Validar garantía → Garantía no válida → Escalar → Administrador revisa → Registra resolución → Notifica → Cierra caso.**

Y una tercera experiencia:

**Portal Cliente → Introducir número de reclamo → Consultar → Ver progreso.**

Utiliza interacciones simples y profesionales. No agregar animaciones extravagantes.

---

# ORGANIZACIÓN DEL ARCHIVO FIGMA

Organiza el archivo en páginas:

**00 — Foundations**
Paleta, tipografía, espaciado, iconografía y grid.

**01 — Components**
Todos los componentes y variantes.

**02 — Asesor**
Pantallas del Asesor de Tienda.

**03 — Técnico**
Pantallas de Servicio Técnico.

**04 — Administrador**
Administración, escalados y reportes.

**05 — Cliente**
Portal responsive del Cliente.

**06 — Prototype**
Flujo preparado para presentación.

Nombrar los frames y componentes correctamente.

---

# RESTRICCIONES IMPORTANTES

No inventar funcionalidades de ventas, facturación, inventario general, contabilidad, compras o transporte.

No convertirlo en una tienda online.

No agregar carrito de compras.

No permitir que el Cliente administre internamente el reclamo.

No usar dashboards cargados de gráficos sin utilidad.

No llenar las pantallas de texto académico.

No diseñar la interfaz como si fuera una presentación de PowerPoint.

El resultado debe parecer **el producto digital que estamos proponiendo en la presentación**, no otra presentación.

Mantener coherencia total entre roles, estados, reclamos, garantías y órdenes de servicio.

---

# RESULTADO ESPERADO

Genera un **prototipo high-fidelity coherente, navegable y visualmente consistente de Gollo Respaldo**, preparado para demostrar ante un profesor cómo funcionaría realmente la solución propuesta.

Debe ser evidente, sin necesidad de explicación extensa:

**qué problema resuelve, quién utiliza el sistema, cómo se registra y procesa un reclamo, cómo se valida una garantía, cómo trabaja el taller, cómo se mantiene la trazabilidad y cómo el Cliente consulta su progreso.**
