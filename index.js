const express = require('express');
const axios = require('axios');

const app = express();
const port = 4000;

app.use(express.json());

// Ruta de prueba para la raíz
app.get('/', (req, res) => {
  res.send('API Gateway funcinando');
});

// Rutas para el servicio de plantas
app.get('/plantas', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3002/plantas');
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/plantas', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3002/plantas', req.body);
    res.status(response.status).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put('/plantas/:id', async (req, res) => {
  try {
    const response = await axios.put(`http://localhost:3002/plantas/${req.params.id}`, req.body);
    res.status(response.status).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/plantas/:id', async (req, res) => {
  try {
    const response = await axios.delete(`http://localhost:3002/plantas/${req.params.id}`);
    res.status(response.status).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Agrega rutas para otros servicios de la misma manera

app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});