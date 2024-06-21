import React,{useState,useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Biddernavbar({user}) {
	const navigate = useNavigate();

	const handleLogout = () => {
		toast.success('Logout successful!', {
		  position: 'top-right',
		  autoClose: 1000,
		  onClose: () => {
			navigate('/');
		  },
		});
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
        <>
            <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                <Link to="/" className="navbar-brand d-flex d-lg-none me-4">
                    <h2 className="text-primary mb-0"><i className="fa fa-hashtag"></i></h2>
                </Link>
               
                <div className="navbar-nav align-items-center ms-auto">
                    
                    
                    <div className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            
						<img
								className="rounded-circle me-lg-2"
								src={filteredData[0]?.image ? `http://localhost:4000/${filteredData[0].image}` : "/gi.jpg"}
								alt=""
								style={{ width: '40px', height: '40px' }}
							/>

                            <span className="d-none d-lg-inline-flex">{filteredData.length > 0 ? ` ${filteredData[0].name}` : 'Bidder'}</span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                            
                            <button className="dropdown-item" onClick={handleLogout}>Log Out</button>
                        </div>
                    </div>
                </div>
            </nav>
			<ToastContainer />
        </>
    );
}

export default Biddernavbar;

