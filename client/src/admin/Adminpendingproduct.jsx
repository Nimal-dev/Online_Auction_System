import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Adminsidebar from "./Adminsidebar";
import Adminnavbar from "./Adminnavbar";
import Clock from "../Clock"; 
import Alert from "./Alert";
import Port from "../Port";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Adminpendingproduct() {
    
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0);
	

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
        fetch('http://localhost:4000/viewproduct')
            .then((res) => res.json())
            .then((result) => setData(result));
    }, [refresh]);

    return (
		<>
			<Adminsidebar />
			<div className="content">
				<Adminnavbar />
	
				<div className="col-sm-12 col-xl-12" style={{ margin: '2px' }}>
					<div className="bg-light rounded h-100 p-4">
						<h3 className="mb-4">Product Approval</h3>
						{data.some((value) => value.status === undefined) ? (
							<table className="table table-bordered" style={{ border: '2px solid' }}>
								<thead >
									<tr>
										<th scope="col">Auctioneer Name</th>
										<th scope="col">Product Name</th>
										<th scope="col">Minimum Bid_Amount</th>
										<th scope="col">Category</th>
										<th colSpan={3} style={{ textAlign: 'center' }}>Status</th>
									</tr>
								</thead>
								<tbody>
									{data.map((value, index) => (
										(value.status === undefined) && (
											<tr key={index}>
												<td>{value.Username}</td>
												<td>{value.ProductName}</td>
												<td>{value.Minamount}</td>
												<td>{value.Category}</td>
												<td>
													<Link to="/viewsingleproduct" state={{ id: value._id }} style={{ background: '#007bff', color: 'white', padding: '7px', textDecoration: 'none', borderRadius: '5px', display: 'inline-block', margin:"10px",
														padding:"10px 20px"
													 }}>View</Link>
												
												
													<button onClick={() => handleApprove(value._id)} style={{ background: 'green', color: 'white', padding: '7px', borderRadius: '5px', border: 'none', cursor: 'pointer',padding:"10px 20px", margin:"10px" }}>Approve</button>
												
												
													<button onClick={() => handleReject(value._id)} style={{ background: 'red', color: 'white', borderRadius: '5px',padding:"10px 20px", border: 'none', cursor: 'pointer', margin:"10px" }}>Reject</button>
													</td>
											</tr>
										)
									))}
								</tbody>
							</table>
						) : (
							<div style={{ textAlign: 'center', padding: '20px', background: '#f8d7da', color: '#721c24', borderRadius: '10px', border: '2px solid #f5c6cb', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
								<p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>No pending products for approval</p>
								<p style={{ fontSize: '16px', color: '#721c24' }}>Check back later for updates.</p>
							</div>
						)}
					</div>
				</div>
				<Clock /> 
				<Alert />
			</div>
		</>
	);
	
}

export default Adminpendingproduct;
