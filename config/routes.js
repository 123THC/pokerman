const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute'); // make sure use later
const oauth = require('../controllers/oauth');
const games = require('../controllers/games');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/games')
  .get(games.index)
  .post(games.create);

router.route('/games/new')
  .get(games.new);

router.route('/games/:id/attend')
  .get(games.show)
  .put(games.update)
  .post(games.createComment)
  .delete(secureRoute, games.delete);

router.route('/profile')
  .get(secureRoute, registrations.show);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/oauth/github')
  .get(oauth.github);

router.all('*', (req, res) => res.notFound());

module.exports = router;
