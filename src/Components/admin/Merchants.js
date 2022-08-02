import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, where, getDocs, query } from "firebase/firestore";
import { db } from "../../Firebase/config";
import ToggleButton from "react-toggle-button";
import { routes } from "../../constants/routes";

const Merchants = (props) => {
  const [docData, setdocData] = useState({});

  const getData = async () => {
    const q = query(
      collection(db, "Merchants"),
      where("isKycComplete", "==", true)
    );
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setdocData(arr);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(docData,"docdata")
  return (
    <div>
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">UID</th>
            <th scope="col">UserName</th>
            <th scope="col">Email </th>
            <th scope="col">Phone</th>
            <th scope="col">Name</th>
            <th scope="col">Verify</th>
            <th scope="col">Image</th>
            <th scope="col">Profile</th>
          </tr>
        </thead>
        <tbody>
          {docData && docData.length > 0 ? (
            <React.Fragment>
              {docData.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <b>{item.uid}</b>
                    </td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.name}</td>
                    <td>
                      <ToggleButton value={item.isProfileVerified} />
                    </td>
                    <td>
                      <img src={item.image} alt="" className="avatar" />
                    </td>
                    <td>
                        <Link to={routes.MERCHANTDETAILS + "/" + item.uid}>
                          View
                        </Link>
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          ) : (
            <tr>
              <td colSpan="10 mt-2">No results found!</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="center">
        {docData.length > 10 ? (
          <button
            className="loadMore"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Load More Artist
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Merchants;

// File created by sourav mishra on 11/7/22
