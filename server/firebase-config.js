const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Replace with your file path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'firebase_realtime_database_url' // Replace with your Firebase project URL
});

const db = admin.firestore();

module.exports = { admin, db };