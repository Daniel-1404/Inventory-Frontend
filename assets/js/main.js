const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");

loginBtn.addEventListener("click", async () => {
  // Limpiar mensajes
  loginMessage.classList.add("d-none");
  loginMessage.textContent = "";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validaciones simples
  if (!username || !password) {
    loginMessage.textContent = "Usuario y contraseña son requeridos.";
    loginMessage.classList.remove("d-none");
    return;
  }

  try {
    const response = await fetch("http://localhost:5131/api/Auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "text/plain"
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const errorText = await response.text();
      loginMessage.textContent = errorText || "Error al iniciar sesión.";
      loginMessage.classList.remove("d-none");
      return;
    }

    const token = await response.text();

    // Guardar token en localStorage
    localStorage.setItem("jwtToken", token);

    // Redirigir a la página de productos
    window.location.href = "products.html";

  } catch (error) {
    console.error(error);
    loginMessage.textContent = "No se pudo conectar con el servidor.";
    loginMessage.classList.remove("d-none");
  }
});