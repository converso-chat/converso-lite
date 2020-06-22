express = require('express');

router = express.Router();

const User = require('./controllers/UserController');
// const User = new UserController();

router.get('/', (request, response) => {
  return response.json({ status: "Running", port: 3030 });
});

/**
 * User requests
 */
router.get('/register', User.register);

module.exports = router;
