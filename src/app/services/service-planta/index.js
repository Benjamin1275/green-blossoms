const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./credentials/plantas-green-blossoms-firebase-adminsdk-2zl2u-b8562e89b1.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://plantas-green-blossoms.firebaseio.com'
});

const db = admin.firestore();
const app = express();
const port = 3002;

app.use(express.json());

app.get('/plantas', async (req, res) => {
  const snapshot = await db.collection('plantas').get();
  const plantas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(plantas);
});

app.post('/plantas', async (req, res) => {
  const planta = req.body;
  await db.collection('plantas').add(planta);
  res.status(201).send();
});

app.put('/plantas/:id', async (req, res) => {
  const { id } = req.params;
  const planta = req.body;
  await db.collection('plantas').doc(id).update(planta);
  res.status(200).send();
});

app.delete('/plantas/:id', async (req, res) => {
  const { id } = req.params;
  await db.collection('plantas').doc(id).delete();
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Planta service listening at http://localhost:${port}`);
});