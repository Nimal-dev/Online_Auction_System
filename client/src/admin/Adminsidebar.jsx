import React from "react";
import { Link, NavLink } from "react-router-dom";

const airway = {
  color: "#880085",
};

const Adminsidebar = () => {
  return (
    <div className="sidebar pe-4 pb-3">
      <nav className="navbar bg-light navbar-light">
        <Link to="/admin" className="navbar-brand mx-4 mb-3">
          <h3 style={airway}>
            <i className="fa me-2"></i>AuctionElite
          </h3>
        </Link>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="ms-3">
            <h3>Admin</h3>
          </div>
        </div>
        <div className="navbar-nav w-100">
          <>
            <NavLink
              exact
              to="/admin"
              className="nav-item nav-link"
              activeClassName="active"
              
            >
              <i className="fa fa-layer-group me-2"></i>Dashboard
            </NavLink>
            <NavLink
              exact
              to="/admincategory"
              className="nav-item nav-link"
              activeClassName="active"
            >
              <i className="fa fa-list me-2"></i>Category
            </NavLink>
            <NavLink
              exact
              to="/adminactiveauction"
              className="nav-item nav-link"
              activeClassName="active"
            >
              <i className="fa fa-hammer me-2"></i>Auctions
            </NavLink>
            <NavLink
              exact
              to="/adminuser"
              className="nav-item nav-link"
              activeClassName="active"
            >
              <i className="fa fa-users me-2"></i>Users
            </NavLink>
          </>
          
         
        </div>
      </nav>
    </div>
  );
};

export default Adminsidebar;
