const express = require('express');
const cors = require('cors');
const connection = require('./config');
const { SERVER_PORT } = require('./env');

const app = express();
app.use(cors());
app.use(express.json());

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});









app.listen(SERVER_PORT, () => {
  console.log(`Server is runing on ${SERVER_PORT}`);
});