import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
<<<<<<< Updated upstream
import { ToastContainer, toast } from "react-toastify";
=======
import { ToastContainer, toast } from 'react-toastify';
>>>>>>> Stashed changes
import { Carousel } from "react-bootstrap";
import Adminsidebar from "./Adminsidebar";
import Adminnavbar from "./Adminnavbar";
import Clock from "../Clock";
import Alert from "./Alert";
import Port from "../Port";

function Adminsingleproduct() {
<<<<<<< Updated upstream
  const location = useLocation();
  const [data, setData] = useState({ Images: [] });
  const [refresh, setRefresh] = useState(0);
  const airway = {
    color: "#880085",
  };

  useEffect(() => {
    let params = {
      id: location.state.id,
    };

    fetch(`${Port}/viewproductbyid`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, [location.state.id, refresh]);
=======
    const location = useLocation();
    const [refresh, setRefresh] = useState(0);
    const [data, setData] = useState({ Images: [] });
    const airway = {
        color: '#880085',
    };

    const handleApprove = (id) => {
        fetch(`${Port}/approveproduct/${id}`, {
            method: 'POST',
        })
        .then((res) => res.json())
        .then(() => {
            toast.success('Product approved successfully');
            setRefresh((prev) => prev + 1);
        })
        .catch((error) => {
            console.error('Error approving product:', error);
            toast.error('Error approving product');
        });
    };

    const handleReject = (id) => {
        fetch(`${Port}/rejectproduct/${id}`, {
            method: 'POST',
        })
        .then((res) => res.json())
        .then(() => {
            toast.warn('Product rejected');
            setRefresh((prev) => prev + 1);
        })
        .catch((error) => {
            console.error('Error rejecting product:', error);
            toast.error('Error rejecting product');
        });
    };

    useEffect(() => {
        let params = {
            id: location.state.id,
        };

        fetch(`${Port}/viewproductbyid`, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        })
        .then((res) => res.json())
        .then((result) => {
            setData(result);
        });
    }, [location.state.id, refresh]);
>>>>>>> Stashed changes

  const handleApprove = (id) => {
    fetch(`${Port}/approveproduct/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Product approved successfully");
        setRefresh((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Error approving product:", error);
        toast.error("Error approving product");
      });
  };

<<<<<<< Updated upstream
  const handleReject = (id) => {
    fetch(`${Port}/rejectproduct/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(() => {
        toast.warn("Product rejected");
        setRefresh((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Error rejecting product:", error);
        toast.error("Error rejecting product");
      });
  };

  return (
    <>
      <Adminsidebar />
      <div className="content">
        <Adminnavbar />

        <div className="col-sm-12 col-xl-12" style={{ margin: "2px" }}>
          <div className="bg-light rounded h-100 p-4">
            <h3 className="mb-4" style={airway}>
              Product Details
            </h3>
            <div className="row">
              <div className="col-md-5">
                <p>
                  <b style={airway}>Product Name:</b> {data.ProductName}
                </p>
                <p>
                  <b style={airway}>Description: </b> {data.Description}
                </p>
                <p>
                  <b style={airway}>Minimum Bid Amount: </b> {data.Minamount}
                </p>
                <p>
                  <b style={airway}>Manufacturing Date:</b> {data.Date}
                </p>
                <p>
                  <b style={airway}>Category:</b> {data.Category}
                </p>
                <p>
                  <b style={airway}>Seller Name:</b> {data.Username}
                </p>

                <button
                  onClick={() => handleApprove(data._id)}
                  style={{
                    background: "green",
                    color: "white",
                    padding: "7px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "10px"
                  }}
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(data._id)}
                  style={{
                    background: "red",
                    color: "white",
                    padding: "7px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Reject
                </button>
              </div>
              <div className="col-md-7">
                <Carousel interval={1000}>
                  {data.Images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        style={{ width: "500px", height: "500px" }}
                        src={`http://localhost:4000/${image}`}
                        alt={`Slide ${index}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
=======
                <div className="col-sm-12 col-xl-12" style={{ margin: '2px' }}>
                    <div className="bg-light rounded h-100 p-4">
                        <h3 className="mb-4" style={airway}>Product Details</h3>
                        <div className="row">
                            <div className="col-md-5">
                                <p><b style={airway}>Product Name:</b>{data.ProductName}</p>
                                <p><b style={airway}>Description: </b>{data.Description}</p>
                                <p><b style={airway}>Minimum Bid Amount: </b>{data.Minamount}</p>
                                <p><b style={airway}>Manufacturing Date:</b> {data.Date}</p>
                                <p><b style={airway}>Category:</b> {data.Category}</p>
                                <p><b style={airway}>Auctioneer Name:</b> {data.Username}</p>
                            </div>
                            <div className="col-md-7">
                                <Carousel interval={1000}>
                                    {data.Images.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                style={{ width: '500px', height: '500px' }}
                                                src={`http://localhost:4000/${image}`}
                                                alt={`Slide ${index}`}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button onClick={() => handleApprove(location.state.id)} style={{ background: 'green', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginRight: '10px' }}>
                                Approve
                            </button>
                            <button onClick={() => handleReject(location.state.id)} style={{ background: 'red', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                                Reject
                            </button>
                        </div>
                        <div className="mt-4">
                            <Link to="/adminpendingproduct">Back</Link>
                        </div>
                    </div>
                </div>

                <Clock />
                <Alert /> 
>>>>>>> Stashed changes
            </div>
            <div>
              <Link to="/adminpendingproduct">Back</Link>
            </div>
          </div>
        </div>

        <Clock />
        <Alert />
      </div>
      <ToastContainer />
    </>
  );
}

export default Adminsingleproduct;
