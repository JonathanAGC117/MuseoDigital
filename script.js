document.addEventListener("DOMContentLoaded", () => {
  const primeraObra = document.querySelector("#obra-menu li");
  if (primeraObra) {
    mostrarObra(primeraObra);
  }

  const btnIA = document.getElementById("btn-reimaginar");
  if (btnIA) {
    btnIA.addEventListener("click", reimaginar);
  }
});

function mostrarObra(elemento) {
  const imagen = elemento.getAttribute("data-imagen");
  const titulo = elemento.getAttribute("data-titulo");
  const descripcion = elemento.getAttribute("data-descripcion");

  document.getElementById("imagen-obra").src = imagen;
  document.getElementById("imagen-obra").alt = titulo;
  document.getElementById("descripcion-obra").textContent = descripcion;

  const resultado = document.getElementById("resultado");
  if (resultado) resultado.innerHTML = "";
}

async function reimaginar() {
  const promptUsuario = prompt("Describe cómo te gustaría reimaginar esta obra:");
  if (!promptUsuario) return;

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "🧠 Generando imagen con IA... por favor espera...";

  try {
    const response = await fetch("https://api.deepai.org/api/text2img", {
      method: "POST",
      headers: {
        "api-key": "f84a1ee8-36de-4ff7-94ed-cdc24b9461f6", // ✅ SOLO para pruebas
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({ text: promptUsuario })
    });

    const data = await response.json();

    if (data.output_url) {
      resultado.innerHTML = `
        <h3>🎨 Imagen generada por IA:</h3>
        <img src="${data.output_url}" alt="Imagen generada por IA" class="imagen-ia" />
      `;
    } else {
      resultado.innerHTML = "❌ No se pudo generar la imagen.";
    }

  } catch (error) {
    console.error("Error al generar:", error);
    resultado.innerHTML = "❌ Error al generar la imagen.";
  }
}
