import axios from "axios";

const API = axios.create({
  baseURL: "https://randomuser.me",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getUserData() {
  const response = await API.get("/api").then((res) => res);
  return response;
}
