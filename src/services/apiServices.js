import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const getApiTokens = () => {
  return service
    .post(`/`)
    .then((response) => response)
    .catch((err) => err);
};
