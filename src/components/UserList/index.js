import React, { useEffect, useState } from "react";
import DetailCard from "../Card";

const UserList = () => {
  const [userList, setUserList] = useState("");

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("indexed_db"));
    setUserList(localData && localData.results);
  }, [localStorage.getItem("indexed_db")]);

  const onDeleteUser = (email) => {
    const userData = JSON.parse(localStorage.getItem("indexed_db"));
    const newResults = userData.results.filter((item) => item.email !== email);
    userData.results = newResults;
    localStorage.setItem("indexed_db", JSON.stringify(userData));
    setUserList(newResults);
  };

  return (
    <div>
      <h5 style={{ textAlign: "center" }}>
        Total User Count: {(userList && userList.length) || 0}
      </h5>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: "0 20px",
        }}
      >
        {userList &&
          userList.map((data, i) => {
            return (
              <div style={{ padding: "5px" }}>
                <DetailCard key={i} data={data} onDeleteUser={onDeleteUser} />
              </div>
            );
          })}
      </div>

      {userList && userList.length === 0 && <div>No Records Found</div>}
    </div>
  );
};

export default UserList;
