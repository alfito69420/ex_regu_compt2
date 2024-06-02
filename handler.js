const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type,Authorization',
  exposedHeaders: 'Content-Length, X-Kuma-Revision, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset'
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


//app.use(cors());
//app.options("*", cors());

// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(bodyParser.json());

// Middleware para habilitar CORS
/* app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // Aquí se configuran los encabezados expuestos
  res.header("Access-Control-Expose-Headers", "Content-Length, X-Kuma-Revision, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset");

  next();
}); */

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

// Ruta para calcular la moda
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

// Ruta para calcular la mediana
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

// Ruta para calcular la media (promedio)
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

// Ruta para calcular la varianza
app.post("/varianza", (req, res) => {
  // Obtener el conjunto de números del cuerpo de la solicitud
  const numeros = req.body.numeros;

  // Verificar si se proporcionaron números
  if (!numeros || !Array.isArray(numeros) || numeros.length === 0) {
      return res.status(400).json({ error: "Se requiere un conjunto de números." });
  }

  // Calcular la media (promedio)
  const media = numeros.reduce((acc, num) => acc + num, 0) / numeros.length;

  // Calcular la suma de los cuadrados de las diferencias con la media
  const sumaCuadradosDiferencias = numeros.reduce((acc, num) => acc + Math.pow(num - media, 2), 0);

  // Calcular la varianza como la suma de los cuadrados de las diferencias dividida por el número de elementos
  const varianza = sumaCuadradosDiferencias / numeros.length;

  // Enviar la varianza como respuesta JSON
  return res.status(200).json({ varianza: varianza });
});

// Ruta para calcular la desviación estándar
app.post("/desviacion-estandar", (req, res) => {
  // Obtener el conjunto de números del cuerpo de la solicitud
  const numeros = req.body.numeros;

  // Verificar si se proporcionaron números
  if (!numeros || !Array.isArray(numeros) || numeros.length === 0) {
      return res.status(400).json({ error: "Se requiere un conjunto de números." });
  }

  // Calcular la media (promedio)
  const media = numeros.reduce((acc, num) => acc + num, 0) / numeros.length;

  // Calcular la suma de los cuadrados de las diferencias con la media
  const sumaCuadradosDiferencias = numeros.reduce((acc, num) => acc + Math.pow(num - media, 2), 0);

  // Calcular la varianza como la suma de los cuadrados de las diferencias dividida por el número de elementos
  const varianza = sumaCuadradosDiferencias / numeros.length;

  // Calcular la desviación estándar como la raíz cuadrada de la varianza
  const desviacionEstandar = Math.sqrt(varianza);

  // Enviar la desviación estándar como respuesta JSON
  return res.status(200).json({ desviacionEstandar: desviacionEstandar });
});

// Ruta para calcular el rango
app.post("/rango", (req, res) => {
  // Obtener el conjunto de números del cuerpo de la solicitud
  const numeros = req.body.numeros;

  // Verificar si se proporcionaron números
  if (!numeros || !Array.isArray(numeros) || numeros.length === 0) {
      return res.status(400).json({ error: "Se requiere un conjunto de números." });
  }

  // Encontrar el valor máximo y el valor mínimo en el conjunto de números
  const maximo = Math.max(...numeros);
  const minimo = Math.min(...numeros);

  // Calcular el rango como la diferencia entre el valor máximo y el valor mínimo
  const rango = maximo - minimo;

  // Enviar el rango como respuesta JSON
  return res.status(200).json({ rango: rango });
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
