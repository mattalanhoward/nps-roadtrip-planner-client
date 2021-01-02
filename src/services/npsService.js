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

//Making the call on the backend to the NPS API
// export const getAllParks = () => {
//   console.log(`GET ALL PARKS`);
//   return axios
//     .create({
//       baseURL: "https://developer.nps.gov/api/v1/",
//       headers: { "X-Api-Key": API_KEY },
//     })
//     .get("/")
//     .then((response) => response.data)
//     .catch((error) => error);
// };

//Making the call on the Back End to the NPS API
export const getAllParksByState = ({ singleStateAbbr }) => {
  return service
    .get(`/state/${singleStateAbbr}`)
    .then((response) => response.data)
    .catch((error) => error);
};
