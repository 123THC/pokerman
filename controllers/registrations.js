const User = require('../models/user');
const rp = require('request-promise');

function newRoute(req, res) {
  return res.render('registrations/new');
}

function createRoute(req, res, next) {
  if(req.file) req.body.image = req.file.key;

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
      .create(req.body)
      .then((user) => {
        req.flash('success', `Thanks for registering, ${user.username}!`);
        res.redirect('/login');
      })
      .catch((err) => {
        if(err.name === 'ValidationError') return res.badRequest('/register', err.toString());
        next(err);
      });
  })
  .catch(next);
}

function deleteRoute(req, res, next) {
  req.user
    .remove()
    .then(() => {
      req.session.regenerate(() => res.unauthorized('/', 'Your account has been deleted'));
    })
    .catch(next);
}

// GET /register/checkUsername?username=mickyginger
// for jQuery validate plugin remote rule: https://jqueryvalidation.org/remote-method/
function checkUsernameRoute(req, res, next) {
  User
    .findOne({ username: req.query.username })
    .then((user) => res.json(!user)) // return a JSON boolean true if username has not been used already
    .catch(next);
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute,
  checkUsername: checkUsernameRoute
};
