express = require('express');

router = express.Router();

router.get('/', (request, response) => {
  return response.json({ status: "Running", port: 3030 });
});

module.exports = router;
