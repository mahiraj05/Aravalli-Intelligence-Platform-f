const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysis.controller');

// Trigger a new analysis
router.post('/analyze', analysisController.triggerAnalysis);

// Get past analysis results
router.get('/areas', analysisController.getAnalysisResults);

module.exports = router;
