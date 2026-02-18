# Frontend - Sistema de Gestión de Inventario

Este es el **frontend** del Sistema de Gestión de Inventario, desarrollado en **JavaScript, HTML y Bootstrap 5**.  
Permite la gestión de productos con operaciones de inventario, con validaciones y manejo de seguridad mediante JWT.

---

## Funcionalidades

- **Lista de productos** con información de nombre, descripción, precio y stock.  
- **Crear producto** mediante modal con validaciones de campos.  
- **Editar producto** con modal y validaciones.  
- **Eliminar producto** con confirmación.  
- **Validaciones reutilizables** en todos los formularios (`productValidation.js`).  
- **Seguridad:** todas las solicitudes a la API incluyen token JWT en headers.  
- **Modularidad:** código organizado en módulos (`products.js`, `productCreate.js`, `productEdit.js`, `productDelete.js`, `api.js`).  

---

##  Requisitos

- Navegador moderno con soporte ES6 (Chrome, Edge, Firefox).  
- Servidor backend corriendo con la API REST
- En este caso se utiliza para ejecutar el codigo "Open With Live Server"

> Nota: Este frontend está diseñado para conectarse al backend de .NET Core que maneja los datos y seguridad.

---

## Instrucciones de ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/tuUsuario/inventory-frontend.git
cd inventory-frontend
```
- Usuario: "admin"
- Contraseña "Admin123*"
