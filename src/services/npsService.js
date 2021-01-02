import axios from "axios";

//HERE I NEED TO MAKE A CALL TO THE BACKEND TO DEAL WITH THE API

const API_KEY = process.env.REACT_APP_NPS_API_KEY;
console.log(`API_KEY OUTSIDE`, API_KEY);

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
// export const getAllParks = () => {
//   return axios
//     .create({
//       baseURL: "https://developer.nps.gov/api/v1/",
//       headers: { "X-Api-Key": API_KEY },
//     })
//     .get("/parks?limit=497")
//     .then((response) => response.data)
//     .catch((error) => error);
// };

//Making the call on the backend to the NPS API
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

//Making the call on the Front end to the NPS API
// export const getAllParksByState = ({ singleStateAbbr }) => {
//   console.log(`API KEY INSIDE`, API_KEY);
//   return axios
//     .create({
//       baseURL: "https://developer.nps.gov/api/v1/",
//       headers: { "X-Api-Key": API_KEY },
//     })
//     .get(`/parks?statecode=${singleStateAbbr}`)
//     .then((response) => response.data)
//     .catch((error) => error);
// };

//Making the call on the Back End to the NPS API
export const getAllParksByState = ({ singleStateAbbr }) => {
  console.log(`API KEY INSIDE`, API_KEY);
  return service
    .get(`/state/${singleStateAbbr}`)
    .then((response) => response.data)
    .catch((error) => error);
};

// export const getQueue = () => {
//   return service
//     .get(`/queue`)
//     .then((response) => response.data)
//     .catch((error) => console.log(`Error getting queue`, error));
// };
