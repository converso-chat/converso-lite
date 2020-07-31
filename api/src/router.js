express = require('express');

router = express.Router();

const authMiddleware = require('./middlewares/auth');

const User = require('./controllers/UserController');

router.get('/', (request, response) => {
  return response.json({ status: "Running", port: 3030 });
});

/**
 * User requests
 */
router.get('/register', User.register);
router.post('/signin', User.signin);
router.get('/profile', authMiddleware, User.show);

module.exports = router;
