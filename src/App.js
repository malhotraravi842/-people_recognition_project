import React, { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import UserList from "./components/UserList";
import { getUserData } from "./lib/api";
import Button from "@mui/material/Button";

export default function App() {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("indexed_db");
    if (!userData) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = () => {
    setIsFetching(true);
    getUserData()
      .then((res) => {
        localStorage.setItem("indexed_db", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 100px",
        }}
      >
        <h1>Users Data</h1>
        <Button size="small" onClick={() => fetchUserData()}>
          Refresh
        </Button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {isFetching ? <Spinner /> : <UserList />}
      </div>
    </div>
  );
}
