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

// new user route
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

// new exercise route
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

// log access route
app.get('/api/users/:_id/logs', (req, res) => {
  User.findById({ _id: req.params._id })
    .then((foundUser) => {
      if(!foundUser){
        return res.send('User not found.')
      }

      // filter logs based on 'from' and 'to' queries, otherwise default to UNIX start time and max time supported by Date objects
      const dateFrom = new Date(req.query.from || 0).getTime();
      const dateTo = new Date(req.query.to || 8640000000000000).getTime();
      const filteredLogs = foundUser.log.filter((log) => log.date.getTime() >= dateFrom && log.date.getTime() <= dateTo)
                                        .map((log) => ({ description: log.description, duration: log.duration, date: log.date.toDateString() }));

      const logLimit = parseInt(req.query.limit);
      const limitedLogs = [];
      if(logLimit){
        for(let i = 0; i < logLimit; i++){
          if(filteredLogs[i]){
            limitedLogs.push(filteredLogs[i]);
          }
        }
      }

      res.json({
        _id: foundUser._id,
        username: foundUser.username,
        count: limitedLogs.length || filteredLogs.length,
        log: limitedLogs.length ? limitedLogs : filteredLogs
      })
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Something went wrong.');
    })
})

// list all users route
app.get('/api/users', (req, res) => {
  User.find()
    .then((usersArray) => {
      const formattedUsers = usersArray.map((user) => ({ _id: user._id, username: user.username }))
      res.send(formattedUsers);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Something went wrong.')
    })
})