const mapService = require('../services/maps.services');
const { validationResult } = require('express-validator');

// 🗺️ Get Coordinates (Geocoding)
module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { address } = req.query;
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        res.status(500).json({ message: error.message || 'Failed to fetch coordinates' });
    }
};

// 🚗 Get Distance & Time (Routing)
module.exports.getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { origin, destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (error) {
        console.error('Error fetching distance & time:', error.message);
        res.status(500).json({ message: error.message || 'Failed to fetch distance & time' });
    }
};

// 🔍 Get Autocomplete Suggestions (Places API)
module.exports.getAutoCompleteSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { input } = req.query;
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error.message);
        res.status(500).json({ message: error.message || 'Failed to fetch suggestions' });
    }
};
