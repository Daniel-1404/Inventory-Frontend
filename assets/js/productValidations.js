// Validar un producto antes de crear o actualizar.
export function validateProduct({ name, price, stock }) {
    if (!name || name.trim() === "") {
        return { valid: false, message: "El nombre del producto es obligatorio." };
    }
    if (isNaN(price) || price < 0) {
        return { valid: false, message: "El precio debe ser un número válido y mayor o igual a 0." };
    }
    if (!Number.isInteger(stock) || stock < 0) {
        return { valid: false, message: "El stock debe ser un número entero mayor o igual a 0." };
    }
    return { valid: true, message: "" };
}

 // Validar ID de producto antes de editar o eliminar

export function validateProductId(id) {
    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
        return { valid: false, message: "ID de producto inválido." };
    }
    return { valid: true, message: "" };
}