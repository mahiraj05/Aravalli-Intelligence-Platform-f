const { bucket } = require('../config/firebase');
const logger = require('../utils/logger');
const path = require('path');

class StorageService {
    /**
     * Uploads a JSON object (GeoJSON) to Firebase Storage
     * @param {Object} jsonData - The GeoJSON object
     * @param {string} destinationPath - Path in bucket (e.g., 'analyses/123.json')
     * @returns {Promise<string>} - The signed URL or public URL
     */
    async uploadGeoJSON(jsonData, destinationPath) {
        try {
            const file = bucket.file(destinationPath);
            const jsonString = JSON.stringify(jsonData);

            await file.save(jsonString, {
                contentType: 'application/json',
                public: true, // Making it public for MVP dashboard simplicity
            });

            // Get public URL
            // Note: In a stricter env, use signed URLs. 
            // For this MVP with 'public: true', we can construct the URL directly or get it from metadata.
            // Standard public URL format for Firebase Storage:
            // https://storage.googleapis.com/BUCKET_NAME/PATH

            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destinationPath}`;

            logger.info(`Uploaded GeoJSON to ${destinationPath}`);
            return publicUrl;
        } catch (error) {
            logger.error(`Storage Upload Error: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new StorageService();
