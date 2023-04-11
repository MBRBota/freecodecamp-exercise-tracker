require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')
const { Exercise } = require('./models/exercise')

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    const listener = app.listen(PORT, () => {
      console.log(`Listening on port ${listener.address().port}`);
    })
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send('Something went wrong.');
  });

// Cross-origin resource sharing middleware for freeCodeCamp remote testing
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`)
});

app.post('/api/users', (req, res) => {
  const user = new User({ username: req.body.username })

  user.save()
    .then((savedUser) => {
      res.json({ username: savedUser.username, _id: savedUser._id })
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Something went wrong.')
    });
})

app.post('/api/users/:_id/exercises', (req, res) => {
  User.findById({ _id: req.params._id })
    .then((foundUser) => {
      if(!foundUser){
        return res.status(404).send('User not found.')
      }

      const exerciseToAdd = new Exercise({
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date
      })

      foundUser.log.push(exerciseToAdd);
      foundUser.save()
        .then((savedUser) => {
          res.json({
            _id: savedUser._id,
            username: savedUser.username,
            description: savedUser.log.at(-1).description,
            duration: savedUser.log.at(-1).duration,
            date: savedUser.log.at(-1).date.toDateString()
          })
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send('Something went wrong.')
        })
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Something went wrong.')
    })
})
