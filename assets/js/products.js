import { deleteProduct } from "./productDelete.js"; 
import { openEditModal } from "./productEdit.js";
import { apiGet } from "./api.js";

const productsContainer = document.getElementById("productsContainer");

// Cargar productos desde API
export async function loadProducts() {
    try {
        const products = await apiGet("/products");
        displayProducts(products);
    } catch (err) {
        console.error(err);
        productsContainer.innerHTML = `<p class="text-danger">Error al cargar productos.</p>`;
    }
}

// Render de productos
function displayProducts(products) {
    productsContainer.innerHTML = "";

    products.forEach(product => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description || "Sin descripción"}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Precio:</strong> $${product.price.toFixed(2)}</li>
                    <li class="list-group-item"><strong>Stock:</strong> ${product.stock}</li>
                </ul>
                <div class="card-body d-flex justify-content-between">
                    <button class="btn btn-sm btn-primary edit-btn" data-id="${product.id}">Editar</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${product.id}">Eliminar</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(col);
    });

    // Eventos
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", e => openEditModal(e.target.dataset.id));
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", e => deleteProduct(e.target.dataset.id));
    });
}

// Logout
document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "index.html";
});

// Carga inicial
loadProducts();