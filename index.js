const express = require('express');
const cors = require('cors');
const connection = require('./db');
const { SERVER_PORT } = require('./env');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/product', async (req, res) => {
  console.log('object')
  try {
    const select = await connection.query('SELECT pdt.id, pdt.name, pdt.price, pdt.description, pdt.image, pdt.quantity, pdt.duration_effect, pwr.power, afEff.effect FROM product pdt JOIN power pwr ON pwr.id = pdt.power_id JOIN after_effect afEff ON afEff.id = pdt.after_effect_id');
    res.status(200).json(select[0]);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Error retrieving products').json({
      error: err.message
      })
  }
})

app.get('/product/price', async (req, res) => {
  try {
      const priceMin = req.query.min;
      const priceMax = req.query.max;
      console.log(req.query);
      const select = await connection.query(
        'SELECT pdt.id, pdt.name, pdt.price, pdt.description, pdt.image, pdt.quantity, pdt.duration_effect, pwr.power, afEff.effect FROM product pdt JOIN power pwr ON pwr.id = pdt.power_id JOIN after_effect afEff ON afEff.id = pdt.after_effect_id WHERE pdt.price BETWEEN ? AND ?',
        [priceMin, priceMax]
        );
      res.status(200).json(select[0]);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Error retrieving products').json({
      error: err.message
      })
  }
})

app.get('/product/duration', async (req, res) => {
  try {
      const durationH = req.query.h;
      console.log(req.query);
      const select = await connection.query(
        'SELECT pdt.id, pdt.name, pdt.price, pdt.description, pdt.image, pdt.quantity, pdt.duration_effect, pwr.power, afEff.effect FROM product pdt JOIN power pwr ON pwr.id = pdt.power_id JOIN after_effect afEff ON afEff.id = pdt.after_effect_id WHERE pdt.duration_effect = ?',
        [durationH]
        );
      res.status(200).json(select[0]);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Error retrieving products').json({
      error: err.message
      })
  }
})

app.get('/product/:slug', async (req, res) => {
  try {
    const productSlug = req.params.slug;
    console.log(productSlug);
    const selectOne = await connection.query(
      'SELECT pdt.slug, pdt.name, pdt.price, pdt.description, pdt.image, pdt.quantity, pdt.duration_effect, pwr.power, afEff.effect FROM product pdt JOIN power pwr ON pwr.id = pdt.power_id JOIN after_effect afEff ON afEff.id = pdt.after_effect_id WHERE pdt.slug = ?',
      productSlug
      );
    res.status(200).json(selectOne[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error retrieving products').json({
      error: err.message
      });
  };
})

app.listen(SERVER_PORT, () => {
  console.log(`Server is runing on ${SERVER_PORT}`);
});
