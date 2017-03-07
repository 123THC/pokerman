const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);

const User = require('../models/user');
const Game = require('../models/game');

User.collection.drop();
Game.collection.drop();

User
  .create([{
    username: 'Bencurrie',
    email: 'ben.w.currie@gmail.com',
    address: {
      line1: '101 South Norwood Hill',
      line2: 'South Norwood',
      city: 'London',
      postcode: 'SE25 6BY',
      country: 'Engalnd'
    },
    image: 'src/assets/images/ben.png',
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'a',
    email: 'a@a',
    address: {
      line1: '64 Zoo Lane',
      line2: 'Stockport',
      city: 'Manchester',
      postcode: 'SK12 1HT',
      country: 'Engalnd'
    },
    image: 'src/assets/images/ben.png',
    password: 'a',
    passwordConfirmation: 'a'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);
    return Game
      .create([{
        buyIn: 25,
        players: 6,
        date: '2016-03-20',
        latitude: 51.470327,
        longitude: -0.061524,
        description: 'Lots of beers will be provided',
        createdBy: users[0]
      }, {
        buyIn: 20,
        players: 4,
        date: '2016-03-21',
        latitude: 51.433464,
        longitude: -0.166956,
        description: 'Lots of cheese will be provided',
        createdBy: users[0]
      }]);
  })
  .then((games) => {
    console.log(`${games.length} games created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
