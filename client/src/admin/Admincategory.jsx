import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Adminsidebar from "./Adminsidebar";
import Adminnavbar from "./Adminnavbar";
import Clock from "../Clock";
import Alert from "./Alert";
import Port from "../Port";

function Admincategory() {
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let params = {
      category: category,
    };
    try {
      const response = await fetch(`${Port}/categoryinsert`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(params)
      });
      if (!response.ok) {
        throw new Error("Failed to add category");
      }
      const result = await response.json();
      setMessage("Category added successfully.");
      setCategory('');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error adding category:", error);
      setMessage("Failed to add category. Please try again.");
    }
  };

  return (
    <>
      <Adminsidebar />
      <div className="content">
        <Adminnavbar />
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div className="bg-light rounded p-3 p-sm-5 my-4 mx-4">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <h3>ADD CATEGORY</h3>
            </div>
            {message && (
              <div className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"}`} role="alert">
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
				style={{background:"white", border:"1px solid black"}}
                  type="text"
                  className="form-control"
                  id="categoryNameInput"
                  placeholder="Category Name"
                  name="categoryName"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                />
                <label htmlFor="categoryNameInput">Category Name</label>
                {errors.categoryName && (
                  <small className="text-danger">{errors.categoryName}</small>
                )}
              </div>
              <button type="submit" className="btn btn-primary py-3 w-100 mb-4">
                <strong>CREATE</strong>
                <i className="fa fa-plus"></i>
              </button>
            </form>
          </div>
        </div>
        <Clock />
        <Alert />
      </div>
    </>
  );
}

export default Admincategory;
