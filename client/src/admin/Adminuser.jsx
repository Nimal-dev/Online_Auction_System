import React, { useState, useEffect } from "react";
import Adminsidebar from "./Adminsidebar";
import Adminnavbar from "./Adminnavbar";
import Clock from "../Clock";
import Alert from "./Alert";
import Port from "../Port";

function Adminuser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${Port}/adminuser`)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching user details:', error));
  }, []);

  return (
    <>
      <Adminsidebar />
      <div className="content">
        <Adminnavbar />
        <div className="col-12">
          <div className="bg-light rounded h-100 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="mb-0">USERS LIST</h6>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">User Type</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No users are registered.
                      </td>
                    </tr>
                  ) : (
                    users.map((user, index) =>
                      (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{getUserType(user.status)}</td>
                          
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Clock />
        <Alert />
      </div>
    </>
  );
}
function getUserType(status) {
	switch (status) {
		case '0':
			return 'Admin';
	  case '1':
		return 'Bidder';
	  case '2':
		return 'Auctioneer';
	  default:
		return '';
	}
  }
export default Adminuser;
