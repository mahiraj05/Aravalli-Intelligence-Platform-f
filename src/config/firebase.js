const admin = require('firebase-admin');
const config = require('./config');
const logger = require('../utils/logger');

try {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: config.firebase.projectId,
                clientEmail: config.firebase.clientEmail,
                privateKey: config.firebase.privateKey,
            }),
            storageBucket: config.firebase.storageBucket,
        });
        logger.info('Firebase Admin Initialized successfully.');
    }
} catch (error) {
    logger.error('Firebase Admin Initialization Error: ' + error.message);
    // We do not exit process here to allow the server to start even if firebase fails (for testing),
    // but in production this should probably crash.
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };
