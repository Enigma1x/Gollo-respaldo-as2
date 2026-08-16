# Gollo Respaldo — Análisis de Sistemas II

Proyecto académico orientado al análisis y diseño conceptual de un sistema para gestionar reclamos, garantías y servicios técnicos de Gollo Respaldo.

El repositorio reúne la documentación de análisis, planificación y diseño, además de un prototipo web funcional basado en el mockup original de Figma. El prototipo permite demostrar los principales recorridos de los perfiles asesor, técnico, administrador y cliente.

> **Importante:** este proyecto es un prototipo académico. Los datos, la autenticación y las operaciones del sistema son simulados.

## Objetivo

Diseñar una solución que permita registrar reclamos, validar garantías, asignar órdenes de servicio al taller, actualizar diagnósticos, consultar el estado de los casos y notificar oportunamente a los clientes.

## Funcionalidades principales

- Inicio de sesión, dashboard y navegación según el rol.
- Registro guiado de reclamos con validación y confirmación.
- Validación de garantías y escalamiento de casos administrativos.
- Consulta, filtrado, detalle e historial de reclamos.
- Gestión de órdenes de servicio y diagnósticos versionados.
- Resolución y cierre de casos escalados.
- Administración de reportes, usuarios, clientes y garantías.
- Centro de notificaciones.
- Portal responsive para que el cliente consulte el progreso de su caso.

## Tecnologías

- React 19.
- TypeScript.
- Vite 8.
- Tailwind CSS 4.
- Lucide React para la iconografía.

## Instalación y ejecución

Desde la raíz del repositorio, ingrese al directorio de la aplicación e instale las dependencias:

```bash
cd Fase2/Mockups/app-prueba
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local para acceder al prototipo.

### Validación de la entrega

```bash
npm run typecheck
npm run build
npm run preview
```

## Usuarios de demostración

Todos los usuarios utilizan la contraseña `demo123`.

| Perfil | Correo |
|---|---|
| Asesor | `asesor@gollo.demo` |
| Técnico | `tecnico@gollo.demo` |
| Administrador | `admin@gollo.demo` |

El portal del cliente no requiere iniciar sesión. Para probarlo, puede consultar el caso `GR-2026-00428` con alguno de estos datos:

- Cédula: `1-1456-0892`.
- Teléfono: `8812-4590`.

## Flujos demostrables

1. **Asesor:** iniciar sesión → abrir el dashboard → registrar un reclamo → validar la garantía → consultar el detalle.
2. **Técnico:** iniciar sesión → consultar los casos asignados → abrir la orden de servicio → registrar el diagnóstico → revisar el historial.
3. **Cliente:** ingresar al portal → consultar el caso de demostración → visualizar su progreso.
4. **Administrador:** iniciar sesión → revisar los casos escalados → registrar la resolución → cerrar el caso.

## Estructura del proyecto

```text
Gollo-respaldo-as2/
├── README.md
├── Docs/
├── Fase1/
│   ├── analisis_negocio.md
│   ├── diagrama_proceso.png
│   ├── requerimientos_actores.md
│   └── planificacion_fase1.md
└── Fase2/
    ├── backlog_sprints.md
    ├── diagrama_uml_vista_general.png
    ├── diagrama_uml_actores_funciones.png
    ├── diccionario_datos.md
    ├── Mockups/
    │   ├── mockups_funcionales.md
    │   └── app-prueba/
    │       └── src/
    │           ├── screens/
    │           ├── components.tsx
    │           └── data.ts
    └── RFC/
        ├── RFC-001.md
        └── RFC-002.md
```

## Integrantes

- Steven Miranda Esquivel.
- Andrew Barrantes James.
- Osman Gomez Jarquin.
- Cristel Quesada González.

## Estado del proyecto

El frontend funciona sin un backend. La persistencia en PostgreSQL, el envío real de correos y SMS, la carga de archivos adjuntos y la autenticación institucional se contemplan como integraciones futuras.
