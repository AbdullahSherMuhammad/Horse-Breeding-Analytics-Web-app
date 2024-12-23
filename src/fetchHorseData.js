const axios = require("axios");

const fetchHorseData = async (feifId) => {
  const apiUrl = `https://alendis.pythonanywhere.com/horse/?userid=gudjong&password=alendis&feifid=${feifId}`;
  try {
    console.log(`Fetching data for FEIF ID: ${feifId}`);
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for FEIF ID ${feifId}:`, error.message);
    return null;
  }
};

module.exports = fetchHorseData;
