import { loadProducts } from "./products.js";
import { apiPost } from "./api.js";
import { validateProduct } from "./productValidations.js";

document.getElementById("createProductBtn")?.addEventListener("click", async () => {
    const name = document.getElementById("productName").value.trim();
    const description = document.getElementById("productDescription").value.trim();
    const price = parseFloat(document.getElementById("productPrice").value);
    const stock = parseInt(document.getElementById("productStock").value);
    const messageEl = document.getElementById("createProductMessage");

    // Validaciones
    const { valid, message } = validateProduct({ name, price, stock });
    if (!valid) {
        messageEl.textContent = message;
        messageEl.classList.remove("d-none");
        return;
    }

    if (!name || isNaN(price) || isNaN(stock)) {
        messageEl.textContent = "Todos los campos son obligatorios y deben ser válidos.";
        messageEl.classList.remove("d-none");
        return;
    }

    try {
        await apiPost("/products", { name, description, price, stock });

        bootstrap.Modal.getInstance(document.getElementById("createProductModal")).hide();

        // Limpiar campos
        ["productName", "productDescription", "productPrice", "productStock"].forEach(id =>
            document.getElementById(id).value = ""
        );

        loadProducts();
    } catch (err) {
        messageEl.textContent = err.message || "Error de conexión con el servidor.";
        messageEl.classList.remove("d-none");
    }
});