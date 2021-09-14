express = require('express');

router = express.Router();

const authMiddleware = require('./middlewares/auth');

const User = require('./controllers/UserController');
const Messaging = require('./controllers/MessagingController');

router.get('/', (request, response) => {
  return response.json({ status: "Running", port: 3030 });
});

/**
 * User requests
 */
router.get('/register', User.register);
router.post('/signin', User.signin);
router.get('/profile', authMiddleware, User.show);

/**
 * Messaging requests
 */
router.post('/chat/message', authMiddleware, Messaging.create);

module.exports = router;
