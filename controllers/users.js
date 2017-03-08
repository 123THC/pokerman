const User = require('../models/user');
const Game = require('../models/game');
const Promise = require('bluebird');
const rp = require('request-promise');

function indexRoute(req, res, next) {
  User
    .find()
    .exec()
    .then((users) => res.render('users/index', { users }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('users/new');
}

function showRoute(req, res, next) {

  Promise.props({
    user: User.findById(req.params.id).populate('comments.createdBy').exec(),
    games: Game.find({ going: req.params.id }).exec(),
    hosting: Game.find({ createdBy: req.user.id }).exec()
  })
  .then((result) => {
    return res.render('users/show', result);
  })
  .catch(next);
}

function editRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      return res.render(`users/edit`, { user });
    })
    .catch(next);
}

function updateRoute(req, res, next) {

  return rp({
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    qs: {
      address: req.body.address.postcode,
      key: process.env.GEOCODING_KEY
    },
    json: true
  })
  .then((response) => {

    req.body.lat = response.results[0].geometry.location.lat;
    req.body.lng = response.results[0].geometry.location.lng;

    User
    .findById(req.params.id)
    .exec()
    .then((user) => {

      for(const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then((user) => {
      req.flash('alert', `Thanks ${user.username} we've updated your details!`);
      res.redirect(`/users/${req.params.id}`);
    })
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/users/${req.params.id}/edit`, err.toString());
      next(err);
    });
  });
}

function deleteRoute(req, res, next) {

  User
    .findById(req.user.id)
    .exec()
    .then((user) => user.remove())
    .then(() => req.session.regenerate(() => res.redirect('/')))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
