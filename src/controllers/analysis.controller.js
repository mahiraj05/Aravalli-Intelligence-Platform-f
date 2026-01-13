const analysisService = require('../services/analysis.service');

class AnalysisController {

    async triggerAnalysis(req, res) {
        try {
            const { type, region } = req.body;

            if (!type || !region) {
                return res.status(400).json({ error: 'Missing required fields: type, region' });
            }

            if (!['deforestation', 'mining'].includes(type)) {
                return res.status(400).json({ error: 'Invalid type. Allowed: deforestation, mining' });
            }

            const result = await analysisService.runAnalysis(type, region);
            return res.status(200).json(result);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getAnalysisResults(req, res) {
        try {
            const filters = {
                type: req.query.type,
                region: req.query.region
            };

            const results = await analysisService.getAnalyses(filters);
            return res.status(200).json(results);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new AnalysisController();
