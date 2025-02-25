const axios = require("axios");
const captainModel = require("../models/captain.model");

const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API;

// 🗺️ Convert Address to Coordinates (Geocoding)
module.exports.getAddressCoordinate = async (address) => {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    address
  )}&apiKey=${GEOAPIFY_API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.features.length > 0) {
      const location = response.data.features[0].geometry.coordinates;
      return {
        ltd: location[1],
        lng: location[0],
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 🚗 Get Distance & Time between Two Locations (Routing API)
module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  let originCoords = origin;
  let destinationCoords = destination;

  if (typeof origin === "string") {
    const originResult = await module.exports.getAddressCoordinate(origin);
    originCoords = `${originResult.ltd},${originResult.lng}`;
  }
  if (typeof destination === "string") {
    const destinationResult = await module.exports.getAddressCoordinate(
      destination
    );
    destinationCoords = `${destinationResult.ltd},${destinationResult.lng}`;
  }

  const url = `https://api.geoapify.com/v1/routing?waypoints=${originCoords}|${destinationCoords}&mode=drive&apiKey=${GEOAPIFY_API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.features.length > 0) {
      const summary = response.data.features[0].properties;
      return {
        distance: {
          text: `${(summary.distance / 1000).toFixed(1)} km`,
          value: summary.distance,
        },
        duration: {
          text: `${Math.floor(summary.time / 60)} min`,
          value: summary.time,
        },
      };
    } else {
      throw new Error("No routes found");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 🔍 Get Autocomplete Suggestions
module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
      throw new Error("Query is required");
    }
  
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      input
    )}&apiKey=${GEOAPIFY_API_KEY}`;
  
    try {
      const response = await axios.get(url);
       // Log full response
  
      if (response.data.features && response.data.features.length > 0) {
        return response.data.features.map((item) => {
          const { properties } = item;
 // Log place_id
  
          return {
            place_id: properties.place_id || "N/A",
            description: [
              properties.name,
              properties.street,
              properties.district,
              properties.city,
              properties.state,
              properties.country,
            ]
              .filter(Boolean)
              .join(", "),
            structured_formatting: {
              main_text: properties.name || "N/A",
              secondary_text: [
                properties.street,
                properties.district,
                properties.city,
                properties.state,
                properties.country,
              ]
                .filter(Boolean)
                .join(", "),
            },
            location_details: {
              country: properties.country || "N/A",
              state: properties.state || "N/A",
              city: properties.city || "N/A",
              district: properties.district || "N/A",
              postal_code: properties.postcode || "N/A",
            },
            matched_substrings: [],
            terms: [
              { offset: 0, value: properties.name || "N/A" },
              { offset: 1, value: properties.street || "N/A" },
              { offset: 2, value: properties.city || "N/A" },
              { offset: 3, value: properties.state || "N/A" },
            ].filter((term) => term.value !== "N/A"),
          };
        });
      } else {
        throw new Error("No autocomplete suggestions found");
      }
    } catch (error) {
      console.error("Geoapify API Error:", error.response?.data || error.message);
      throw new Error("Unable to fetch suggestions. Please check your input or API key.");
    }
  };
  

// 🛑 Find Captains Within Radius (MongoDB Query Remains Unchanged)
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 3963.2],
      },
    },
  });

  return captains;
};
