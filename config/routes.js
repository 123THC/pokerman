const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute'); // make sure use later
const oauth = require('../controllers/oauth');
const games = require('../controllers/games');
const users = require('../controllers/users');
const upload = require('../lib/upload');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/users/:id')
  .get(secureRoute, users.show)
  .delete(secureRoute, users.delete);

router.route('/users/:id/edit')
  .get(secureRoute, users.edit)
  .post(secureRoute, users.update);

router.route('/games')
  .get(secureRoute, games.index)
  .post(secureRoute, games.create);

router.route('/games/new')
  .get(secureRoute, games.new);

router.route('/games/:id')
  .get(secureRoute, games.show)
  .put(secureRoute, games.update)
  .delete(secureRoute, games.deleteComment);

router.route('/games/:id/delete')
  .delete(secureRoute, games.delete);

router.route('/games/:id/attend')
  .post(secureRoute, games.going);

router.route('/games/:id/comments')
  .post(secureRoute, games.createComment);

router.route('/games/:id/comments/:commentId')
  .put(secureRoute, games.reply)
  .delete(secureRoute, games.deleteComment);

router.route('/register')
  .get(registrations.new)
  .post(upload.single('image'), registrations.create);

router.route('/register/checkUsername')
  .get(registrations.checkUsername);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/oauth/github')
  .get(oauth.github);

router.all('*', (req, res) => res.notFound());

module.exports = router;
