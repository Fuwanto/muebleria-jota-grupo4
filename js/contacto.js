document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contacto-derecha form");
  const nombre = document.getElementById("nombre");
  const email  = document.getElementById("email");
  const mensaje = document.getElementById("mensaje");

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  function setError(input, msg){
    clearError(input);
    input.setAttribute("aria-invalid","true");
    const span = document.createElement("span");
    span.className = "error-msg";
    span.textContent = msg;
    input.insertAdjacentElement("afterend", span);
  }

  function clearError(input){
    input.removeAttribute("aria-invalid");
    const next = input.nextElementSibling;
    if(next && next.classList.contains("error-msg")){
      next.remove();
    }
  }

  function clearAllErrors(){
    [nombre, email, mensaje].forEach(clearError);
  }

  function showSuccess(message){
    const old = form.previousElementSibling;
    if(old && old.classList && old.classList.contains("success-banner")){
      old.remove();
    }
    const div = document.createElement("div");
    div.className = "success-banner";
    div.textContent = message;
    form.parentElement.insertBefore(div, form);

    setTimeout(() => {
      div.classList.add("fade-out");

      setTimeout(() => div.remove(), 350);
      }, 3000);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearAllErrors();

    let ok = true;

    if(!nombre.value.trim()){
      setError(nombre, "Por favor, ingresá tu nombre.");
      ok = false;
    } else if(nombre.value.trim().length < 2){
      setError(nombre, "El nombre debe tener al menos 2 caracteres.");
      ok = false;
    }

    if(!email.value.trim()){
      setError(email, "El email es obligatorio.");
      ok = false;
    } else if(!emailRegex.test(email.value.trim())){
      setError(email, "Ingresá un email válido (ej: nombre@dominio.com).");
      ok = false;
    }

    if(!mensaje.value.trim()){
      setError(mensaje, "Escribí tu mensaje.");
      ok = false;
    } else if(mensaje.value.trim().length < 10){
      setError(mensaje, "El mensaje debe tener al menos 10 caracteres.");
      ok = false;
    }

    if(!ok) return;

    showSuccess("¡Gracias! Tu mensaje fue enviado correctamente.");
    form.reset();
  });
});