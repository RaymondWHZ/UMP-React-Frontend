import axios from "axios";

const GIS_TOKEN_KEY = "gis-token"
const API_TOKEN_KEY = "api-token"
const SET_API_TOKEN_KEY = "set-api-token";

const request = axios.create({
  baseURL: "http://127.0.0.1:5000/api"
})

const getGISToken = () => localStorage.getItem(GIS_TOKEN_KEY);

const removeGISToken = () => localStorage.removeItem(GIS_TOKEN_KEY);

const setAPIToken = (token: string) => localStorage.setItem(API_TOKEN_KEY, token);

const getAPIToken = () => localStorage.getItem(API_TOKEN_KEY);

const removeAPIToken = () => localStorage.removeItem(API_TOKEN_KEY);

request.interceptors.request.use((config) => {
  const gisToken = getGISToken();
  if (gisToken) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers[GIS_TOKEN_KEY] = gisToken;
    removeGISToken();
  }
  const apiToken = getAPIToken();
  if (apiToken) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers[API_TOKEN_KEY] = apiToken;
  }
  return config;
});

request.interceptors.response.use((response) => {
  console.log(response);
  const newToken = response.headers[SET_API_TOKEN_KEY];
  if (newToken) {
    if (newToken == "") {
      removeAPIToken();
    } else {
      setAPIToken(newToken);
    }
  }
  return response;
});

export default request;
