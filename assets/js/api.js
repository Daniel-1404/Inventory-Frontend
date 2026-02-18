const API_BASE = "http://localhost:5131/api"; // backend .NET manera local
const token = localStorage.getItem("jwtToken");

if (!token) {
    window.location.href = "index.html";
}

// Manejo de la respuesta
async function handleResponse(res) {
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error en la solicitud");
    }

    const contentType = res.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
        return res.json();
    }

    return null;
}

// GET
export async function apiGet(endpoint) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: { "Authorization": `Bearer ${token}` } // pasamos token jwt
    });
    return handleResponse(res);
}

// POST
export async function apiPost(endpoint, data) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // pasamos token jwt
        }, 
        body: JSON.stringify(data)
    });
    return handleResponse(res);
}

// PUT
export async function apiPut(endpoint, data) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // pasamos token jwt
        },
        body: JSON.stringify(data)
    });
    return handleResponse(res);
}

// DELETE
export async function apiDelete(endpoint) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` } // pasamos token jwt
    });
    return handleResponse(res);
}