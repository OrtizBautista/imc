// -------------------- SELECCIÓN DE ELEMENTOS --------------------
const form = document.getElementById("formulario");
const pesoInput = document.getElementById("npeso");
const alturaInput = document.getElementById("naltura");
const imagen = document.getElementById("imagen");
const resultadoTexto = document.getElementById("resultado-texto");
const slider = document.getElementById("pescc");
const resetBtn = document.getElementById("resetBtn");

// -------------------- FUNCIÓN PRINCIPAL DE CÁLCULO --------------------
function Calculo(event) {
    event.preventDefault();

    // valores crudos del input
    const peso = parseFloat(pesoInput.value);
    const alturaRaw = parseFloat(alturaInput.value);

    if (isNaN(peso) || isNaN(alturaRaw) || alturaRaw <= 0) {
        imagen.style.display = "none";
        resultadoTexto.innerText = "";
        alert("Por favor ingresa valores válidos");
        return;
    }

    // Si altura se ingresó en cm (ej: 170), convertir a metros.
    // Criterio simple: si alturaRaw > 3 suponemos cm.
    let altura = alturaRaw;
    if (alturaRaw > 3) altura = alturaRaw / 100;

    // IMC numérico para comparar, y string para mostrar
    const imcNum = peso / (altura * altura);
    const imc = imcNum.toFixed(2);
    slider.value = imc;

    // DEBUG útil (abre la consola del navegador)
    console.log({ peso, alturaRaw, altura, imcNum, imc });

    // ---- Easter egg: comprobamos PRIMERO la combinación secreta (inputs crudos)
    if (peso === 67 && alturaRaw === 67) {
        imagen.src = "./img/GMAIL.jpg"; // revisá nombre y mayúsculas/minúsculas del archivo
        resultadoTexto.innerText = `IMC: ${imc} — GMAAAAAILL`;
        resultadoTexto.style.color = "orange";
    }
    // ---- Luego las ramas normales usando imcNum (número)
    else if (imcNum < 18.5) {
        imagen.src = "./img/bajopeso.png";
        resultadoTexto.innerText = `IMC: ${imc} — Estás en bajo peso. Considera mejorar tu alimentación.`;
        resultadoTexto.style.color = "lightblue";
    } else if (imcNum < 24.9) {
        imagen.src = "./img/normal.jpg";
        resultadoTexto.innerText = `IMC: ${imc} — ¡Excelente! Tu peso está dentro de un rango saludable.`;
        resultadoTexto.style.color = "lightgreen";
    } else if (imcNum < 29.9) {
        imagen.src = "./img/sobrepeso.jpg";
        resultadoTexto.innerText = `IMC: ${imc} — Estás en sobrepeso. Intenta mantener hábitos más activos.`;
        resultadoTexto.style.color = "orange";
    } else {
        imagen.src = "./img/obesidad.jpg";
        resultadoTexto.innerText = `IMC: ${imc} — Estás en obesidad. Es recomendable consultar con un profesional.`;
        resultadoTexto.style.color = "red";
    }

    imagen.style.display = "block";
    imagen.classList.remove("fade-in"); void imagen.offsetWidth; imagen.classList.add("fade-in");
    resultadoTexto.classList.remove("fade-in"); void resultadoTexto.offsetWidth; resultadoTexto.classList.add("fade-in");
}

// -------------------- RESET Y EVENTOS --------------------
function resetear() {
    pesoInput.value = "";
    alturaInput.value = "";
    resultadoTexto.innerText = "";
    resultadoTexto.style.color = "white";
    imagen.style.display = "none";
}

form.addEventListener("submit", Calculo);
resetBtn.addEventListener("click", resetear);
alturaInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        Calculo(event);
    }
});
