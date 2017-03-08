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
      country: 'England'
    },
    latitude: 51.403634,
    longitude: -0.081172,
    image: 'http://euniv.shooliniuniversity.com/erp/required/images/mprofile.png',
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'PokerKing1985',
    email: 'a@a',
    address: {
      line1: '15 Mallard Crescent',
      line2: 'Poynton',
      city: 'Cheshire East',
      postcode: 'SK12 1HT',
      country: 'England'
    },
    latitude: 53.348997,
    longitude: -2.143133,
    image: 'http://euniv.shooliniuniversity.com/erp/required/images/mprofile.png',
    password: 'a',
    passwordConfirmation: 'a'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);
    return Game
      .create([{
        buyIn: 250,
        players: 6,
        date: '2017-03-20',
        time: '18:00',
        latitude: 51.403634,
        longitude: -0.081172,
        description: 'This is a high stakes game so lots of beers will be provided and my wife will be providing table service',
        createdBy: users[0]
      }, {
        buyIn: 20,
        players: 4,
        date: '2017-03-21',
        time: '20:00',
        latitude: 53.348997,
        longitude: -2.143133,
        description: 'Lots of cheese strings will be provided, please bring your own drinks',
        createdBy: users[1]
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
