import debounce from "lodash.debounce";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserItem } from "../redux/userAction";

const MainComponent = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const debouncedSave = useCallback(
    debounce((userCount) => dispatch(fetchUserItem(userCount)), 700),
    []
  );

  const handleSearch = (e) => {
    const userCount = e.target.value;
    debouncedSave(userCount);
  };
  return (
    <div>
      <center>
        <h1 style={{ backgroundColor: "bisque", color: "blue" }}>
          GET USER DETAILS
        </h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-0"></div>
            <div className="col-lg-4 col-sm-12">
              <input
                className="form-control"
                type="number"
                placeholder="Enter the number of users you wish to see"
                onChange={(e) => handleSearch(e)}
              />
            </div>
          </div>
        </div>
      </center>
      <div className="container">
        {userData.loading ? (
          <h1>Loading...</h1>
        ) : userData.data ? (
          <div className="row">
            {userData.data.map((data, index) => (
              <div key={index} className="col-md-4 p-2">
                <div className="border border-danger rounded">
                  <div className="p-2">
                    <img src={data.picture.large} width="100%" alt="img" />
                    <b>Name: </b>
                    {data.name.first}&nbsp;{data.name.last}
                    <br />
                    <b>Email: </b>
                    {data.email}
                    <br />
                    <b>Gender: </b>
                    {data.gender}
                    <br />
                    <b>Dob & Age: </b>
                    {data.dob.date} & {data.dob.age}
                    <br />
                    <b>Contact: </b>
                    {data.phone}
                    <br />
                    <b>Alternate Contact: </b>
                    {data.cell}
                    <br />
                    <b>Address: </b>
                    {data.location.street.number}, {data.location.street.name},
                    {data.location.userCount}, {data.location.state},
                    {data.location.country}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1>Enter valid number of users</h1>
        )}
      </div>
    </div>
  );
};

export default MainComponent;
