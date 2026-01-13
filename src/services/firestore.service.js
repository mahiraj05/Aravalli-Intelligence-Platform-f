const { db } = require('../config/firebase');
const logger = require('../utils/logger');

class FirestoreService {
    constructor() {
        this.collection = 'analyses';
    }

    /**
     * Save analysis metadata
     * @param {Object} data 
     * @returns {Promise<string>} docId
     */
    async saveAnalysis(data) {
        try {
            const docRef = await db.collection(this.collection).add({
                ...data,
                createdAt: new Date(), // Enforce server timestamp logic here or use Firestore.FieldValue.serverTimestamp()
            });
            logger.info(`Analysis saved with ID: ${docRef.id}`);
            return docRef.id;
        } catch (error) {
            logger.error(`Firestore Save Error: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get analyses with optional filters
     * @param {Object} filters - { type, region }
     * @returns {Promise<Array>}
     */
    async getAnalyses(filters = {}) {
        try {
            let query = db.collection(this.collection);

            if (filters.type) {
                query = query.where('type', '==', filters.type);
            }
            if (filters.region) {
                query = query.where('region', '==', filters.region);
            }

            // Order by created desc
            // Note: Requires composite index if filtering by equality and sorting range.
            // For MVP, we might skip 'orderBy' if it causes index errors without setup, or we try it.
            // query = query.orderBy('createdAt', 'desc'); 

            const snapshot = await query.get();

            if (snapshot.empty) {
                return [];
            }

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            logger.error(`Firestore Get Error: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new FirestoreService();
