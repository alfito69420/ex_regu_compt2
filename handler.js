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

// Función para calcular la mediana de un conjunto de números
function calcularMediana(numeros) {
  // Ordenar los números de menor a mayor
  numeros.sort((a, b) => a - b);

  const cantidadNumeros = numeros.length;
  // Verificar si la cantidad de números es impar
  if (cantidadNumeros % 2 !== 0) {
      // Si es impar, la mediana es el número en el medio
      return numeros[Math.floor(cantidadNumeros / 2)];
  } else {
      // Si es par, la mediana es el promedio de los dos números del medio
      const medio1 = numeros[cantidadNumeros / 2 - 1];
      const medio2 = numeros[cantidadNumeros / 2];
      return (medio1 + medio2) / 2;
  }
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

// Ruta POST para calcular la mediana
app.post("/mediana", (req, res) => {
  // Obtener el conjunto de números del cuerpo de la solicitud
  const numeros = req.body.numeros;

  // Verificar si se proporcionaron números
  if (!numeros || !Array.isArray(numeros) || numeros.length === 0) {
      return res.status(400).json({ error: "Se requiere un conjunto de números." });
  }

  // Calcular la mediana
  const mediana = calcularMediana(numeros);

  // Enviar la mediana como respuesta JSON
  return res.status(200).json({ mediana: mediana });
});

// Ruta POST para calcular la media (promedio)
app.post("/media", (req, res) => {
  // Obtener el conjunto de números del cuerpo de la solicitud
  const numeros = req.body.numeros;

  // Verificar si se proporcionaron números
  if (!numeros || !Array.isArray(numeros) || numeros.length === 0) {
      return res.status(400).json({ error: "Se requiere un conjunto de números." });
  }

  // Calcular la suma de los números
  const suma = numeros.reduce((acc, num) => acc + num, 0);

  // Calcular la media (promedio)
  const media = suma / numeros.length;

  // Enviar la media como respuesta JSON
  return res.status(200).json({ media: media });
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
