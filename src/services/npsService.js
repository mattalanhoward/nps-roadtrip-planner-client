import axios from "axios";
// const API_KEY = localStorage.getItem("npsApiToken");

// // const API_KEY = process.env.REACT_APP_NPS_API_KEY;
// const service = axios.create({
//   baseURL: "https://developer.nps.gov/api/v1/",
//   headers: { "X-Api-Key": API_KEY },
// });

//total parks is 497
// export const getAllParks = (API_KEY) => {
//   return axios
//     .create({
//       baseURL: "https://developer.nps.gov/api/v1/",
//       headers: { "X-Api-Key": API_KEY },
//     })
//     .get("/parks?limit=497")
//     .then((response) => response.data)
//     .catch((error) => error);
// };

export const getAllParksByState = ({ singleStateAbbr, API_KEY }) => {
  return axios
    .create({
      baseURL: "https://developer.nps.gov/api/v1/",
      headers: { "X-Api-Key": API_KEY },
    })
    .get(`/parks?statecode=${singleStateAbbr}`)
    .then((response) => response.data)
    .catch((error) => error);
};
