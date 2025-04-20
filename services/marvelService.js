import api from "./api";
import CryptoJS from "crypto-js";
import { REACT_APP_PUBLIC_KEY, REACT_APP_PRIVATE_KEY } from "@env";

const PUBLIC_KEY = REACT_APP_PUBLIC_KEY;
const PRIVATE_KEY = REACT_APP_PRIVATE_KEY;
const TS = new Date().getTime().toString();
const message = TS + PRIVATE_KEY + PUBLIC_KEY;
const HASH = CryptoJS.MD5(message).toString();

const buildAuthParams = () => ({
  ts: TS,
  apikey: PUBLIC_KEY,
  hash: HASH
});

export const getCharacters = async (offset = 0) => {
  const response = await api.get('/characters', {
    params: {
      ...buildAuthParams(),
      limit: 20,
      offset
    }
  });

  return response.data.data.results;
}
