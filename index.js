const express = require('express');
const cors = require('cors');
const connection = require('./db');
const { SERVER_PORT } = require('./env');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/product', async (req, res) => {
  try {
    if (req.query) {
      const priceMin = req.query.min;
      const priceMax = req.query.max;
      console.log(req.query);
      const select = await connection.query(
        'SELECT pdt.id, pdt.name, pdt.price, pdt.description, pdt.image, pdt.quantity, pdt.duration_effect, pwr.power, afEff.effect FROM product pdt JOIN power pwr ON pwr.id = pdt.power_id JOIN after_effect afEff ON afEff.id = pdt.after_effect_id WHERE pdt.price BETWEEN ? AND ?',
        [priceMin, priceMax]
        );
      res.status(200).json(select[0]);  
    } else {
      const select = await connection.query('SELECT pdt.id, pdt.name, pdt.price, pdt.description, pdt.image, pdt.quantity, pdt.duration_effect, pwr.power, afEff.effect FROM product pdt JOIN power pwr ON pwr.id = pdt.power_id JOIN after_effect afEff ON afEff.id = pdt.after_effect_id');
      res.status(200).json(select[0]);
    }
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Error retrieving products').json({
      error: err.message
      })
  }
})

app.get('/product/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    const selectOne = await connection.query(
      'SELECT pdt.id, pdt.name, pdt.price, pdt.description, pdt.image, pdt.quantity, pdt.duration_effect, pwr.power, afEff.effect FROM product pdt JOIN power pwr ON pwr.id = pdt.power_id JOIN after_effect afEff ON afEff.id = pdt.after_effect_id WHERE pdt.id = ?',
      productId
      );
    res.status(200).json(selectOne[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error retrieving products').json({
      error: err.message
      });
  };
})

// https://www.zalando.fr/vetements/?price_from=1546
// /car/make/12/model?color=green&door=4
app.get('/product/price', async (req, res) => {
  try {
    // const priceMin = req.query.min;
    // const priceMax = req.query.max;
    const poil = req
    console.log(poil);
    // const select = await connection.query(
    //   'SELECT pdt.id, pdt.name, pdt.price, pdt.description, pdt.image, pdt.quantity, pdt.duration_effect, pwr.power, afEff.effect FROM product pdt JOIN power pwr ON pwr.id = pdt.power_id JOIN after_effect afEff ON afEff.id = pdt.after_effect_id WHERE pdt.price BETWEEN ? AND ?',
    //   [priceMin, priceMax]);
    res.status(200).json(poil);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Error retrieving products').json({
      error: err.message
      })
  }
}
)
//   connection.query('SELECT * FROM product WHERE price BETWEEN ? AND ?', [req.params.price, req.params.price])
//   if (err) {
//     console.error(err.message);
//     res.status(404).send('Product not');
//   } else {
//     return res.status(200).json(req.params.price);
//   }
// 

// app.get('/product/price', (req, res) => {
//   connection.query(allProducts, (err, result) => {
//     if (err) {
//       console.log(err)
//       res.status(200).send('Error retriving data');
//     } else {
//       const price = result.filter(result => {
//         return result.price <= req.query.price
//       })
//       if (price.length > 0) {
//         req.status(200).json(price)
//       } else {
//         res.status(404).send('No price found for this price')
//       }
//     }
//   })
// })

app.listen(SERVER_PORT, () => {
  console.log(`Server is runing on ${SERVER_PORT}`);
});
