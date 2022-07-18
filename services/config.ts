import axios from "axios";
export const BASE_URL = " https://api.github.com";

export const getAction = (url: string) => {
  try {
    return axios.get(`${BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API_TOKEN}`,
      },
    });
  } catch (error) {
    return error;
  }
};
