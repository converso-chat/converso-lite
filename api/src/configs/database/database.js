const admin = require('firebase-admin');

let serviceAccount = require('../credentials/database.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin.firestore();
