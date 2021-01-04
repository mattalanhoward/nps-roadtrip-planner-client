import axios from "axios";

const API_KEY = process.env.REACT_APP_NPS_API_KEY;

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// // const API_KEY = process.env.REACT_APP_NPS_API_KEY;
// const service = axios.create({
//   baseURL: "https://developer.nps.gov/api/v1/",
//   headers: { "X-Api-Key": API_KEY },
// });

//total parks is 497
//Making the call on the frontend to the NPS API
export const getAllParks = () => {
  return axios
    .create({
      baseURL: "https://developer.nps.gov/api/v1/",
      headers: { "X-Api-Key": API_KEY },
    })
    .get("/parks?limit=497")
    .then((response) => response.data)
    .catch((error) => error);
};

//Making the call on the Back End to the NPS API
export const getAllParksByState = ({ singleStateAbbr }) => {
  return service
    .get(`/state/${singleStateAbbr}`)
    .then((response) => response.data)
    .catch((error) => error);
};

//Get Favorite
export const getFavorites = (userId) => {
  console.log(`/park/getFavorites `, userId);
  return service
    .post("/park/usersFavorites", { userId })
    .then((response) => response.data)
    .catch((error) => (`Error getting favorite parks`, error));
};

//Add Favorite
export const addFavoritePark = (parkCode, userId) => {
  console.log(parkCode, userId);
  return service
    .post("/park/favorites", { parkCode, userId })
    .then((response) => response.data)
    .catch((error) => (`Error Adding Favorite`, error));
};
