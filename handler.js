const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(bodyParser.json());

// Función para calcular la moda de un conjunto de números
function calcularModa(numeros) {
  // Objeto para almacenar la frecuencia de cada número
  let frecuencia = {};

  // Calcular la frecuencia de cada número
  for (let i = 0; i < numeros.length; i++) {
      let num = numeros[i];
      frecuencia[num] = (frecuencia[num] || 0) + 1;
  }

  // Encontrar el número con la frecuencia más alta
  let moda;
  let maxFrecuencia = 0;
  for (let num in frecuencia) {
      if (frecuencia[num] > maxFrecuencia) {
          moda = num;
          maxFrecuencia = frecuencia[num];
      }
  }

  return moda;
}

// Ruta POST para calcular la moda
app.post("/moda", (req, res) => {
  // Obtener el conjunto de números del cuerpo de la solicitud
  const numeros = req.body.numeros;

  // Verificar si se proporcionaron números
  if (!numeros || !Array.isArray(numeros) || numeros.length === 0) {
      return res.status(400).json({ error: "Se requiere un conjunto de números." });
  }

  // Calcular la moda
  const moda = calcularModa(numeros);

  // Enviar la moda como respuesta JSON
  return res.status(200).json({ moda: moda });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
