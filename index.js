require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Cross-origin resource sharing middleware for freeCodeCamp remote testing
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`)
});

const listener = app.listen(PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
