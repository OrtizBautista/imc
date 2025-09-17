// -------------------- SELECCIÓN DE ELEMENTOS --------------------

// Guardamos en variables los elementos del HTML que vamos a usar
const form = document.getElementById("formulario");        // El formulario principal
const pesoInput = document.getElementById("npeso");        // Campo de entrada del peso
const alturaInput = document.getElementById("naltura");    // Campo de entrada de la altura
const imagen = document.getElementById("imagen");          // Imagen que se mostrará según el IMC
const resultadoTexto = document.getElementById("resultado-texto"); // Texto con el resultado
const slider = document.getElementById("pescc");           // Barra deslizante (no esencial pero interactiva)
const resetBtn = document.getElementById("resetBtn");      // Botón de reset

// -------------------- FUNCIÓN PRINCIPAL DE CÁLCULO --------------------
function Calculo(event) {
    event.preventDefault(); 
    // Evita que el formulario se recargue al presionar "Calcular" o Enter

    // Tomamos y convertimos a número decimal los valores ingresados
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);

    // Validación: si los valores no son correctos (NaN = Not a Number)
    if (isNaN(peso) || isNaN(altura) || altura <= 0) {
        imagen.style.display = "none";      // Ocultamos la imagen
        resultadoTexto.innerText = "";      // Borramos el resultado anterior
        alert("Por favor ingresa valores válidos"); // Avisamos al usuario
        return; // Salimos de la función
    }

    // Fórmula del Índice de Masa Corporal (IMC) = peso / altura²
    const imc = (peso / (altura * altura)).toFixed(2); 
    // .toFixed(2) → redondea a 2 decimales
    slider.value = imc; // Reflejamos el valor del IMC en el slider

    // Dependiendo del valor del IMC, mostramos resultados diferentes:
    if (imc < 18.5) {
        imagen.src = "./img/bajopeso.png"; // Imagen de bajo peso
        resultadoTexto.innerText = `IMC: ${imc} — Estás en bajo peso. Considera mejorar tu alimentación.`;
        resultadoTexto.style.color = "lightblue"; // Texto azul claro
    } else if (imc < 24.9) {
        imagen.src = "./img/normal.jpg"; // Imagen de peso normal
        resultadoTexto.innerText = `IMC: ${imc} — ¡Excelente! Tu peso está dentro de un rango saludable.`;
        resultadoTexto.style.color = "lightgreen"; // Texto verde
    } else if (imc < 29.9) {
        imagen.src = "./img/sobrepeso.jpg"; // Imagen de sobrepeso
        resultadoTexto.innerText = `IMC: ${imc} — Estás en sobrepeso. Intenta mantener hábitos más activos.`;
        resultadoTexto.style.color = "orange"; // Texto naranja
    } else {
        imagen.src = "./img/obesidad.jpg"; // Imagen de obesidad
        resultadoTexto.innerText = `IMC: ${imc} — Estás en obesidad. Es recomendable consultar con un profesional.`;
        resultadoTexto.style.color = "red"; // Texto rojo
    }

    // Mostramos la imagen
    imagen.style.display = "block";

    // Animación de aparición suave (fade-in) para la imagen
    imagen.classList.remove("fade-in"); // Quitamos si ya tenía la clase
    void imagen.offsetWidth; // Hack para reiniciar la animación
    imagen.classList.add("fade-in"); // Se agrega la clase de nuevo

    // Animación de aparición suave para el texto
    resultadoTexto.classList.remove("fade-in");
    void resultadoTexto.offsetWidth;
    resultadoTexto.classList.add("fade-in");
}

// -------------------- FUNCIÓN DE RESET --------------------
function resetear() {
    pesoInput.value = "";              // Borramos el valor del peso
    alturaInput.value = "";            // Borramos el valor de la altura
    resultadoTexto.innerText = "";     // Borramos el texto del resultado
    resultadoTexto.style.color = "white"; // Volvemos el color del texto a blanco
    imagen.style.display = "none";     // Ocultamos la imagen
}

// -------------------- EVENTOS --------------------

// Cuando el usuario envía el formulario → ejecuta Calculo()
form.addEventListener("submit", Calculo);

// Cuando hace clic en el botón de reset → ejecuta resetear()
resetBtn.addEventListener("click", resetear);

// Cuando el usuario presiona la tecla "Enter" en el campo altura
alturaInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") { // Si la tecla es Enter
        event.preventDefault();  // Evita el comportamiento por defecto (enviar formulario)
        Calculo(event);          // Ejecuta la función de cálculo directamente
    }
});
