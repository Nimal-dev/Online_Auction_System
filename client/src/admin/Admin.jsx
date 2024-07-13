import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Adminsidebar from "./Adminsidebar";
import Adminnavbar from "./Adminnavbar";
import Clock from "../Clock";
import Alert from "./Alert";
import Port from "../Port";

function Admin() {
  const airway = {
    color: "#880085",
  };
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetch(`${Port}/viewproduct`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log("Fetched data:", result);
      });

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const activeAuctions = data.filter((product) => {
    if (
      product.status === 1 &&
      product.AuctionDate &&
      product.StartTime &&
      product.EndTime
    ) {
      const auctionStartTime = new Date(
        `${product.AuctionDate}T${product.StartTime}:00`
      );
      const auctionEndTime = new Date(
        `${product.AuctionDate}T${product.EndTime}:00`
      );

      return currentTime >= auctionStartTime && currentTime <= auctionEndTime;
    }

    return false;
  });

  const upcomingAuctions = data.filter((product) => {
    const currentTime = new Date();
    const auctionStartTime = new Date(
      `${product.AuctionDate}T${product.StartTime}:00`
    );
    return (
      product.status === 1 &&
      product.AuctionDate &&
      currentTime < auctionStartTime
    );
  });

  const completedAuctions = data.filter((product) => {
    const currentTime = new Date();
    const auctionEndTime = new Date(
      `${product.AuctionDate}T${product.EndTime}:00`
    );
    return (
      product.status === 1 &&
      product.AuctionDate &&
      product.EndTime &&
      currentTime > auctionEndTime &&
      product.BidAmount &&
      product.BidderName
    );
  });

  const pendingItems = data.filter((item) => item.status === undefined);

  const scheduledAuctions = data.filter(
    (value) => value.status === 1 && !value.AuctionDate
  );

  const rescheduledAuctions = data.filter(
    (value) => value.AuctionDate && !value.BidAmount
  );

  return (
    <>
      <Adminsidebar />
      <div className="content">
        <Adminnavbar />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            {/* -----------Active Auction------------------ */}
            <div className="col-sm-12 col-xl-6">
              <div className="bg-light rounded h-100 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h6 className="mb-4">ACTIVE AUCTION</h6>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Bid Date</th>
                      <th scope="col">Bid Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeAuctions.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No Active Auctions
                        </td>
                      </tr>
                    ) : (
                      activeAuctions.map((auction, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{auction.ProductName}</td>
                          <td>
                            <img
                              src={`http://localhost:4000${auction.imageUrl}`}
                              alt={auction.ProductName}
                              style={{ width: "150px", height: "150px" }}
                            />
                          </td>
                          <td>{auction.AuctionDate}</td>
                          <td>
                            <b>₹</b>
                            {auction.Minamount}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* -----------Upcoming Auction------------------ */}
            <div className="col-sm-12 col-xl-6">
              <div className="bg-light rounded h-100 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h6 className="mb-4">UPCOMING AUCTION</h6>
                  <Link className="btn btn-primary" to="/adminupcoming">
                    View All
                  </Link>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Date</th>
                      <th scope="col">Bid Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingAuctions.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No Products Here.
                        </td>
                      </tr>
                    ) : (
                      upcomingAuctions.map((auction, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{auction.ProductName}</td>
                          <td>
                            <img
                              src={`http://localhost:4000/${auction.Images}`}
                              alt={auction.ProductName}
                              style={{ width: "70px", height: "70px" }}
                            />
                          </td>
                          <td>{auction.AuctionDate}</td>
                          <td>
                            <b>₹</b>
                            {auction.Minamount}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* -----------Auction History------------------ */}
            <div className="col-sm-12 col-xl-12">
              <div className="bg-light rounded h-100 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h6 className="mb-4">AUCTION HISTORY</h6>
                  <Link className="btn btn-primary" to="/admincompleted">
                    View All
                  </Link>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Bid Amount</th>
                      <th scope="col">Bidded Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedAuctions.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No Histories Found
                        </td>
                      </tr>
                    ) : (
                      completedAuctions.slice(0, 3).map((auction, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{auction.ProductName}</td>
                          <td>
                            <img
                              src={`http://localhost:4000/${auction.Images[0]}`}
                              alt={auction.ProductName}
                              style={{ width: "70px", height: "70px" }}
                            />
                          </td>
                          <td>
                            <b style={{ color: "green" }}>₹</b>
                            {auction.Minamount}
                          </td>
                          <td>
                            <b style={{ color: "Red" }}>₹</b>
                            {auction.BidAmount}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* ------------------------Auction Approval Request--------------- */}
            <div className="col-sm-12 col-xl-6">
              <div className="bg-light rounded h-100 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h6 className="mb-4">AUCTION APPROVAL REQUEST</h6>
                  <Link className="btn btn-primary" to="/adminpendingproduct">
                    View Requests
                  </Link>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Bid Amount</th>
                      <th scope="col">Auctioneer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingItems.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No Requests Found
                        </td>
                      </tr>
                    ) : (
                      pendingItems.slice(0, 4).map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.ProductName}</td>
                          <td>
                            <img
                              src={`http://localhost:4000/${item.Images}`}
                              alt={item.ProductName}
                              style={{ width: "70px", height: "70px" }}
                            />
                          </td>
                          <td>
                            <b style={{ color: "green" }}>₹</b>
                            {item.Minamount}
                          </td>
                          <td>{item.AuctioneerName}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* ------------------------Schedule Auction--------------- */}
            <div className="col-sm-12 col-xl-6">
  <div className="bg-light rounded h-100 p-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h6 className="mb-4">SCHEDULE/RE-SCHEDULE AUCTION</h6>
      <Link className="btn btn-primary" to="/adminschedulelist">View All</Link>
    </div>

    {/* Scheduled Auctions Table */}
    <h6 className="mb-4">Scheduled Auctions</h6>
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product Name</th>
          <th scope="col">Image</th>
          <th scope="col">Bid Amount</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {scheduledAuctions.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center">No Scheduled Auctions Found</td>
          </tr>
        ) : (
          scheduledAuctions.map((value, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{value.ProductName}</td>
              <td>
                <img
                  src={`http://localhost:4000/${value.Images}`}
                  alt={value.ProductName}
                  style={{ width: "70px", height: "70px" }}
                />
              </td>
              <td>₹{value.Minamount}</td>
              <td>
                <Link to={`/schedule/${value.ProductId}`} className="btn btn-primary">
                  Schedule
                </Link>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>

    {/* Rescheduled Auctions Table */}
    <h6 className="mb-4">Re-Scheduled Auctions</h6>
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product Name</th>
          <th scope="col">Image</th>
          <th scope="col">Bid Amount</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {rescheduledAuctions.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center">No Re-Scheduled Auctions Found</td>
          </tr>
        ) : (
          rescheduledAuctions.map((value, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{value.ProductName}</td>
              <td>
                <img
                  src={`http://localhost:4000/${value.Images}`}
                  alt={value.ProductName}
                  style={{ width: "70px", height: "70px" }}
                />
              </td>
              <td>₹{value.Minamount}</td>
              <td>
                <Link to={`/reschedule/${value.ProductId}`} className="btn btn-primary">
                  Re-Schedule
                </Link>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>


          </div>
        </div>
        <Alert />
      </div>
    </>
  );
}

export default Admin;




{/* --------------Jessy's Code--------------------- */}
      {/* <div class="container-fluid pt-4 px-4">
        <div class="row g-4">
          <div class="col-sm-12 col-xl-6 alert alert-primary">
            <div class="bg-light rounded h-100 p-4">
              <h6
                className="mb-4 text-center"
                style={{ ...airway, fontSize: "22px" }}
              >
                <div style={{ display: "inline-block", position: "relative" }}>
                  Active Auctions
                  {activeAuctions.length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-1px",
                        left: "103%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "50%",
                        width: "18px",
                        height: "18px",
                        backgroundColor: "red",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "15px",
                      }}
                    >
                      {activeAuctions.length}
                    </div>
                  )}
                </div>
              </h6>
              {activeAuctions.length > 0 ? (
                <div className="d-flex flex-wrap">
                  {activeAuctions.slice(0, 2).map((auction, index) => (
                    <div
                      key={index}
                      className="flex-grow-1 border rounded p-3 m-2 border-2 auction-box"
                    >
                      <div className="d-flex align-items-center">
                        {auction.Images && auction.Images.length > 0 && (
                          <img
                            src={`http://localhost:4000/${auction.Images[0]}`}
                            alt={auction.ProductName}
                            style={{
                              width: "100px",
                              height: "100px",
                              marginRight: "10px",
                            }}
                          />
                        )}
                        <div className="auction-details ms-3">
                          <h5>{auction.ProductName}</h5>
                          <p>
                            <b>Auction Date:</b> {auction.AuctionDate}
                          </p>
                          <p>
                            <b>Minimum Bid Amount:</b> {auction.Minamount}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center border rounded p-3 m-2 border-2 auction-box">
                  <p className="text-muted mb-3">No active auctions</p>
                  <p className="text-center">
                    Explore other sections or check back later for updates.
                  </p>
                </div>
              )}
              <Link
                to="/adminactiveauction"
                className="position-absolute bottom-0 end-0 p-4"
              >
                See more
              </Link>
            </div>
          </div>

          <div class="col-sm-12 col-xl-6 alert alert-success">
            <div class="bg-light rounded h-100 p-4">
              <h6
                class="mb-4 text-center"
                style={{ ...airway, fontSize: "22px" }}
              >
                <div style={{ display: "inline-block", position: "relative" }}>
                  Upcoming Auction
                  {upcomingAuctions.length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-1px",
                        left: "103%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "50%",
                        width: "18px",
                        height: "18px",
                        backgroundColor: "red",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "15px",
                      }}
                    >
                      {upcomingAuctions.length}
                    </div>
                  )}
                </div>
              </h6>
              {upcomingAuctions.length > 0 ? (
                <div className="d-flex flex-wrap">
                  {upcomingAuctions.slice(0, 2).map((auction, index) => (
                    <div
                      key={index}
                      className="flex-grow-1 border rounded p-3 m-2 border-2 auction-box"
                    >
                      <div className="d-flex align-items-center">
                        {auction.Images && auction.Images.length > 0 && (
                          <img
                            src={`http://localhost:4000/${auction.Images[0]}`}
                            alt={auction.ProductName}
                            style={{
                              width: "100px",
                              height: "100px",
                              marginRight: "10px",
                            }}
                          />
                        )}
                        <div className="auction-details ms-3">
                          <h5>{auction.ProductName}</h5>
                          <p>
                            <b>Auction Date:</b> {auction.AuctionDate}
                          </p>
                          <p>
                            <b>Minimum Bid Amount:</b> {auction.Minamount}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center border rounded p-3 m-2 border-2 auction-box">
                  <p className="text-muted mb-3">No upcoming auctions</p>
                  <p className="text-center">
                    Explore other sections or check back later for updates.
                  </p>
                </div>
              )}
              <Link
                to="/adminupcoming"
                className="position-absolute bottom-0 end-0 p-4"
              >
                See more
              </Link>
            </div>
          </div>

          <div class="col-sm-12 col-xl-6 alert alert-success">
            <div class="bg-light rounded h-100 p-4">
              <h6
                className="mb-4 text-center"
                style={{ ...airway, fontSize: "22px" }}
              >
                <div style={{ display: "inline-block", position: "relative" }}>
                  Auction History
                  {completedAuctions.length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-1px",
                        left: "103%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "50%",
                        width: "18px",
                        height: "18px",
                        backgroundColor: "red",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "15px",
                      }}
                    >
                      {completedAuctions.length}
                    </div>
                  )}
                </div>
              </h6>
              {completedAuctions.length > 0 ? (
                <div className="d-flex flex-wrap">
                  {completedAuctions.slice(0, 2).map((auction, index) => (
                    <div
                      key={index}
                      className="flex-grow-1 border rounded p-3 m-2 border-2 auction-box"
                    >
                      <div className="d-flex align-items-center">
                        {auction.Images && auction.Images.length > 0 && (
                          <img
                            src={`http://localhost:4000/${auction.Images[0]}`}
                            alt={auction.ProductName}
                            style={{
                              width: "100px",
                              height: "100px",
                              marginRight: "10px",
                            }}
                          />
                        )}
                        <div className="auction-details ms-3">
                          <h5>{auction.ProductName}</h5>
                          <p>
                            <b>Minimum Bid Amount:</b> {auction.Minamount}
                          </p>
                          <p>
                            <b>Bid Amount:</b> {auction.BidAmount}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center border rounded p-3 m-2 border-2 auction-box">
                  <p className="text-muted mb-3">No auctions history</p>
                  <p className="text-center">
                    Explore other sections or check back later for updates.
                  </p>
                </div>
              )}
              <Link
                to="/admincompleted"
                className="position-absolute bottom-0 end-0 p-4"
              >
                See more
              </Link>
            </div>
          </div>

          <div class="col-sm-12 col-xl-6 alert alert-danger">
            <div class="bg-light rounded h-100 p-4">
              <h6
                class="mb-4 text-center"
                style={{ ...airway, fontSize: "22px" }}
              >
                <div style={{ display: "inline-block", position: "relative" }}>
                  Pending Auction
                  {pendingItems.length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-1px",
                        left: "103%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "50%",
                        width: "18px",
                        height: "18px",
                        backgroundColor: "red",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "15px",
                      }}
                    >
                      {pendingItems.length}
                    </div>
                  )}
                </div>
              </h6>
              {pendingItems.length > 0 ? (
                <div className="d-flex flex-wrap">
                  {pendingItems.slice(0, 2).map((auction, index) => (
                    <div
                      key={index}
                      className="flex-grow-1 border rounded p-3 m-2 border-2 auction-box"
                    >
                      <div className="d-flex align-items-center">
                        {auction.Images && auction.Images.length > 0 && (
                          <img
                            src={`http://localhost:4000/${auction.Images[0]}`}
                            alt={auction.ProductName}
                            style={{
                              width: "100px",
                              height: "100px",
                              marginRight: "10px",
                            }}
                          />
                        )}
                        <div className="auction-details ms-3">
                          <h5>{auction.ProductName}</h5>
                          <p>
                            <b>Minimum Bid Amount:</b> {auction.Minamount}
                          </p>
                          <p>
                            <b>Seller Name:</b> {auction.Username}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center border rounded p-3 m-2 border-2 auction-box">
                  <p className="text-muted mb-3">
                    No Pending Product for Approval
                  </p>
                  <p className="text-center">
                    Explore other sections or check back later for updates.
                  </p>
                </div>
              )}
              <Link
                to="/adminpendingproduct"
                className="position-absolute bottom-0 end-0 p-4"
              >
                See more
              </Link>
            </div>
          </div>

          <div class="col-sm-12 col-xl-6 alert alert-warning">
            <div class="bg-light rounded h-100 p-4">
              <h6
                class="mb-4 text-center"
                style={{ ...airway, fontSize: "22px" }}
              >
                <div style={{ display: "inline-block", position: "relative" }}>
                  {scheduledAuction.length > 1 ? (
                    <>
                      Schedule Auctions
                      <div
                        style={{
                          position: "absolute",
                          top: "-1px",
                          left: "103%",
                          transform: "translate(-50%, -50%)",
                          borderRadius: "50%",
                          width: "18px",
                          height: "18px",
                          backgroundColor: "red",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "15px",
                        }}
                      >
                        {scheduledAuction.length}
                      </div>
                    </>
                  ) : (
                    <>
                      {scheduledAuction.length === 1 ? (
                        <>
                          Schedule and Reschedule Auctions
                          <div
                            style={{
                              position: "absolute",
                              top: "-1px",
                              left: "103%",
                              transform: "translate(-50%, -50%)",
                              borderRadius: "50%",
                              width: "18px",
                              height: "18px",
                              backgroundColor: "red",
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "15px",
                            }}
                          >
                            {scheduledAuction.length +
                              rescheduledAuctions.length}
                          </div>
                        </>
                      ) : (
                        <>
                          Reschedule Auctions
                          {rescheduledAuctions.length > 0 && (
                            <div
                              style={{
                                position: "absolute",
                                top: "-1px",
                                left: "103%",
                                transform: "translate(-50%, -50%)",
                                borderRadius: "50%",
                                width: "18px",
                                height: "18px",
                                backgroundColor: "red",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "15px",
                              }}
                            >
                              {rescheduledAuctions.length}
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </h6>
              {scheduledAuction.length > 0 ? (
                <div className="d-flex flex-wrap">
                  {scheduledAuction.slice(0, 2).map((auction, index) => (
                    <div
                      key={index}
                      className="flex-grow-1 border rounded p-3 m-2 border-2 auction-box"
                    >
                      <div className="d-flex align-items-center">
                        {auction.Images && auction.Images.length > 0 && (
                          <img
                            src={`http://localhost:4000/${auction.Images[0]}`}
                            alt={auction.ProductName}
                            style={{
                              width: "100px",
                              height: "100px",
                              marginRight: "10px",
                            }}
                          />
                        )}
                        <div className="auction-details ms-3">
                          <h5>{auction.ProductName}</h5>
                          <p>
                            <b>Minimum Bid Amount:</b> {auction.Minamount}
                          </p>
                          <p>
                            <b>Seller Name:</b> {auction.Username}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {scheduledAuction.length === 1 &&
                    rescheduledAuctions.length > 0 && (
                      <div className="flex-grow-1 border rounded p-3 m-2 border-2 auction-box">
                        <div className="d-flex align-items-center">
                          {rescheduledAuctions[0].Images &&
                            rescheduledAuctions[0].Images.length > 0 && (
                              <img
                                src={`http://localhost:4000/${rescheduledAuctions[0].Images[0]}`}
                                alt={rescheduledAuctions[0].ProductName}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  marginRight: "10px",
                                }}
                              />
                            )}
                          <div className="auction-details ms-3">
                            <h5>{rescheduledAuctions[0].ProductName}</h5>
                            <p>
                              <b>Minimum Bid Amount:</b>{" "}
                              {rescheduledAuctions[0].Minamount}
                            </p>
                            <p>
                              <b>Seller Name:</b>{" "}
                              {rescheduledAuctions[0].Username}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <div className="d-flex flex-wrap">
                  {rescheduledAuctions.slice(0, 2).map((auction, index) => (
                    <div
                      key={index}
                      className="flex-grow-1 border rounded p-3 m-2 border-2 auction-box"
                    >
                      <div className="d-flex align-items-center">
                        {auction.Images && auction.Images.length > 0 && (
                          <img
                            src={`http://localhost:4000/${auction.Images[0]}`}
                            alt={auction.ProductName}
                            style={{
                              width: "100px",
                              height: "100px",
                              marginRight: "10px",
                            }}
                          />
                        )}
                        <div className="auction-details ms-3">
                          <h5>{auction.ProductName}</h5>
                          <p>
                            <b>Minimum Bid Amount:</b> {auction.Minamount}
                          </p>
                          <p>
                            <b>Seller Name:</b> {auction.Username}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Link
                to="/adminschedulelist"
                className="position-absolute bottom-0 end-0 p-4"
              >
                See more
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      
      {/* </div> */}
//     </>
//   );
// }

// export default Admin;
