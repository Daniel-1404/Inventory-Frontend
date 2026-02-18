import { loadProducts } from "./products.js";
import { apiGet, apiPut } from "./api.js";
import { validateProduct, validateProductId } from "./productValidations.js";

// Abrir modal con datos del producto
export async function openEditModal(id) {
    try {
        const product = await apiGet(`/products/${id}`);
        document.getElementById("editProductId").value = product.id;
        document.getElementById("editProductName").value = product.name;
        document.getElementById("editProductDescription").value = product.description || "";
        document.getElementById("editProductPrice").value = product.price;
        document.getElementById("editProductStock").value = product.stock;

        new bootstrap.Modal(document.getElementById("editProductModal")).show();
    } catch (err) {
        console.error(err);
        alert("Error al cargar producto: " + err.message);
    }
}

// Actualizar producto
document.getElementById("updateProductBtn")?.addEventListener("click", async () => {
    const id = document.getElementById("editProductId").value;
    const name = document.getElementById("editProductName").value.trim();
    const description = document.getElementById("editProductDescription").value.trim();
    const price = parseFloat(document.getElementById("editProductPrice").value);
    const stock = parseInt(document.getElementById("editProductStock").value);
    const messageEl = document.getElementById("editProductMessage");


    // Validar campos
    const idValidation = validateProductId(id);
    if (!idValidation.valid) {
        messageEl.textContent = idValidation.message;
        messageEl.classList.remove("d-none");
        return;
    }

    const { valid, message } = validateProduct({ name, price, stock });
    if (!valid) {
        messageEl.textContent = message;
        messageEl.classList.remove("d-none");
        return;
    }

    if (!name || isNaN(price) || isNaN(stock)) {
        messageEl.textContent = "Todos los campos son obligatorios y válidos.";
        messageEl.classList.remove("d-none");
        return;
    }

    try {
        await apiPut(`/products/${id}`, { id, name, description, price, stock });

        bootstrap.Modal.getInstance(document.getElementById("editProductModal")).hide();
        loadProducts();
    } catch (err) {
        messageEl.textContent = err.message;
        messageEl.classList.remove("d-none");
    }
});