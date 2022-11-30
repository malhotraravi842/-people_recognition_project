import axios from "axios";

const API = axios.create({
  baseURL: "https://randomuser.me/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getUserData() {
  const response = await API.get("/", { params: { results: 50 } }).then(
    (res) => res
  );
  return response;
}
