// Selección de elementos
const form = document.getElementById("formulario");
const pesoInput = document.getElementById("npeso");
const alturaInput = document.getElementById("naltura");
const imagen = document.getElementById("imagen");
const resultadoTexto = document.getElementById("resultado-texto");
const slider = document.getElementById("pescc");
const resetBtn = document.getElementById("resetBtn");

// Función principal de cálculo
function Calculo(event) {
    event.preventDefault();

    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);

    if (isNaN(peso) || isNaN(altura) || altura <= 0) {
        imagen.style.display = "none";
        resultadoTexto.innerText = "";
        alert("Por favor ingresa valores válidos");
        return;
    }

    const imc = (peso / (altura * altura)).toFixed(2);
    slider.value = imc;

    if (imc < 18.5) {
        imagen.src = "./img/bajopeso.png";
        resultadoTexto.innerText = `IMC: ${imc} — Estás en bajo peso. Considera mejorar tu alimentación.`;
        resultadoTexto.style.color = "lightblue";
    } else if (imc < 24.9) {
        imagen.src = "./img/normal.jpg";
        resultadoTexto.innerText = `IMC: ${imc} — ¡Excelente! Tu peso está dentro de un rango saludable.`;
        resultadoTexto.style.color = "lightgreen";
    } else if (imc < 29.9) {
        imagen.src = "./img/sobrepeso.jpg";
        resultadoTexto.innerText = `IMC: ${imc} — Estás en sobrepeso. Intenta mantener hábitos más activos.`;
        resultadoTexto.style.color = "orange";
    } else {
        imagen.src = "./img/obesidad.jpg";
        resultadoTexto.innerText = `IMC: ${imc} — Estás en obesidad. Es recomendable consultar con un profesional.`;
        resultadoTexto.style.color = "red";
    }

    imagen.style.display = "block";
    imagen.classList.remove("fade-in");
    void imagen.offsetWidth;
    imagen.classList.add("fade-in");

    resultadoTexto.classList.remove("fade-in");
    void resultadoTexto.offsetWidth;
    resultadoTexto.classList.add("fade-in");
}

// Función reset
function resetear() {
    pesoInput.value = "";
    alturaInput.value = "";
    resultadoTexto.innerText = "";
    resultadoTexto.style.color = "white";
    imagen.style.display = "none";
}

// Eventos
form.addEventListener("submit", Calculo);
resetBtn.addEventListener("click", resetear);
alturaInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        Calculo(event);
    }
});
