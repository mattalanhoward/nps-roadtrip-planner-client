import axios from "axios";

// const API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;
const API_KEY = localStorage.getItem("mapBoxApiToken");
const service = axios.create({
  baseURL: "https://api.mapbox.com/tokens/v2/mattalanhoward",
  headers: { "X-Api-Key": API_KEY },
});

//total parks is 497
export const getAllParks = () => {
  return service
    .get("/parks?limit=497")
    .then((response) => response.data)
    .catch((error) => error);
};
