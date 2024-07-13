import React, { useState, useEffect } from "react";
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
  const [categories, setCategories] = useState([]); // State to hold categories
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!category.trim()) {
      newErrors.categoryName = "Category name is required.";
    } else if (category.length < 3) {
      newErrors.categoryName = "Category name must be at least 3 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${Port}/category`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const result = await response.json();
      setCategories(result); // Set categories to state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Prevent submission if validation fails

    let params = { category: category };
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
      setErrors({});
      fetchCategories(); // Refresh the category list
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
                  style={{ background: "white", border: "1px solid black" }}
                  type="text"
                  className={`form-control ${errors.categoryName ? "is-invalid" : ""}`}
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

            {/* Categories Table */}
            <div className="mt-4">
              <h5>All Categories</h5>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Category Name</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length === 0 ? (
                    <tr>
                      <td className="text-center">No categories found.</td>
                    </tr>
                  ) : (
                    categories.map((cat, index) => (
                      <tr key={index}>
                        <td>{cat.Categoryname}</td>
                      </tr>
                    ))
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

export default Admincategory;
