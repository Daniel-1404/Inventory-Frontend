import { loadProducts } from "./products.js";
import { apiDelete } from "./api.js";
import { validateProductId } from "./productValidations.js";

export async function deleteProduct(id) {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {

        // Validaciones
        const idValidation = validateProductId(id);
        if (!idValidation.valid) {
            alert(idValidation.message);
            return;
        }
        await apiDelete(`/products/${id}`);
        loadProducts();
    } catch (err) {
        console.error(err);
        alert("Error al eliminar producto: " + err.message);
    }
}