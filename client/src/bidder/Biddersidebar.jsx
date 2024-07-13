import React,{useState,useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';
// import Chat from '../Chat';


const Biddersidebar = ({user}) => {

	const airway = {
		color: '#00cccc', 
	};
	const [users, setUser] = useState([]);
		useEffect(() => {
			fetch('http://localhost:4000/viewprofile')
				.then((res) => res.json())
				.then((result) => {
					setUser(result);
				});
		}, []);
		const filteredData = users.filter((value) => value._id=== user._id);
	
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
            <h3>Bidder</h3>
          </div>
        </div>
        <div className="navbar-nav w-100">
          <>
            <NavLink
              exact
              to="/bidder"
              className="nav-item nav-link"
              activeClassName="active"
              
            >
              <i className="fa fa-layer-group me-2"></i>Dashboard
            </NavLink>
            <NavLink
              exact
              to="/bidderhistory"
              className="nav-item nav-link"
              activeClassName="active"
            >
              <i className="fa fa-history me-2"></i>History
            </NavLink>
			<NavLink
              exact
              to="/messageview"
              className="nav-item nav-link"
              activeClassName="active"
            >
              <i className="fa fa-comments me-2"></i>Messages
            </NavLink>
          </>
          
         
        </div>
      </nav>
    </div>
    );
}

export default Biddersidebar;
