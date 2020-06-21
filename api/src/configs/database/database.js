const admin = require('firebase-admin');

let serviceAccount = require('./database.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin.firestore();
