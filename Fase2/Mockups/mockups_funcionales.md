# Mockups Funcionales de los Módulos Principales

**Proyecto:** Sistema de Gestión de Reclamos y Servicio Técnico para Gollo Respaldo  
**Responsable:** Andrew Barrantes James  
**Fase:** 2  
**Estado:** Propuesta corregida, sujeta a la aprobación de la RFC-002

## 1. Propósito

Los mockups funcionales representan el diseño conceptual de la interfaz antes de su desarrollo. Permiten validar la navegación, la distribución de información y las funciones principales.

> Corrección aplicada: el **Cliente reporta la falla o solicita la garantía**, mientras que el **Asesor de Tienda registra el reclamo en el sistema**.

## 2. Módulo 1 — Gestión de Reclamos

### 2.1 Registrar reclamo

**Actor:** Asesor de Tienda.

**Campos:**

- Cliente.
- Producto y número de serie.
- Factura.
- Garantía.
- Motivo.
- Descripción.
- Prioridad.
- Sucursal.
- Adjuntos.

**Acciones:**

- Validar datos.
- Registrar reclamo.
- Cancelar.
- Generar número único.
- Continuar con la validación de la garantía.

**Reglas:**

- Los campos obligatorios deben completarse.
- El registro guarda fecha, hora y Asesor responsable.
- El Cliente no registra directamente el reclamo en la plataforma interna.

### 2.2 Consultar estado

**Actor:** Cliente.

**Datos de entrada:**

- Número de reclamo.
- Dato adicional de validación.

**Información mostrada:**

- Estado actual.
- Fecha del último cambio.
- Producto.
- Resumen del avance.

### 2.3 Consulta interna de reclamos

**Actores:** Asesor de Tienda y Administrador del Sistema.

**Columnas:**

- Número de reclamo.
- Cliente.
- Producto.
- Estado.
- Técnico asignado.
- Fecha.
- Prioridad.
- Acciones.

### 2.4 Detalle del reclamo

**Actores:** Asesor de Tienda, Técnico del Taller y Administrador del Sistema, según permisos.

Muestra datos del Cliente, producto, garantía, diagnóstico, historial, observaciones y notificaciones.

## 3. Módulo 2 — Servicio Técnico

### 3.1 Recepción del equipo

- Confirmar recepción.
- Registrar condición física y accesorios.
- Cambiar el estado.
- Guardar fecha, hora y responsable.

### 3.2 Asignación de Técnico

- Consultar técnicos disponibles.
- Asignar o reasignar.
- Registrar el cambio en el historial.

### 3.3 Diagnóstico

**Actor:** Técnico del Taller.

Campos: descripción, repuestos, costo estimado, tiempo estimado, observaciones y versión.

### 3.4 Actualización de estado

```text
Ingresado → En Taller → Reparado → Entregado
```

Reglas:

- No se permiten saltos inválidos.
- Para marcar `Reparado` debe existir diagnóstico.
- Cada cambio guarda fecha, hora y responsable.
- Cada cambio puede generar una notificación.

## 4. Módulo 3 — Administración y Seguimiento

### 4.1 Gestión de usuarios

- Crear usuarios.
- Asignar roles.
- Modificar permisos.
- Activar o desactivar cuentas.

### 4.2 Gestión de clientes

- Consultar clientes.
- Actualizar datos.
- Consultar productos y reclamos relacionados.

### 4.3 Panel de seguimiento

- Reclamos por estado.
- Tiempo promedio.
- Casos escalados.
- Casos próximos a vencer.
- Productividad por Técnico.
- Reclamos por sucursal.

### 4.4 Reportes

- Filtrar por fecha, estado, Técnico o sucursal.
- Consultar KPIs.
- Exportar a PDF o Excel.

## 5. Flujo principal corregido

```text
Cliente reporta la falla o solicita la garantía
        ↓
Asesor de Tienda registra el reclamo
        ↓
Asesor de Tienda valida la garantía
        ↓
Garantía válida ─────────────── Garantía no válida
        ↓                              ↓
Se genera ticket                 Se escala al Administrador
        ↓                              ↓
Recepción del equipo             Resolución y notificación
        ↓
Asignación del Técnico del Taller
        ↓
Diagnóstico
        ↓
Reparación
        ↓
Actualización de estados y notificaciones
        ↓
Entrega del producto
        ↓
Cierre del caso
```

## 6. Pendiente visual

Este archivo documenta las pantallas y su comportamiento. Las imágenes o prototipos navegables deben añadirse posteriormente dentro de esta carpeta.
