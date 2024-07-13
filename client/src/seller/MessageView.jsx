import React, { useEffect, useState } from 'react';
import Biddersidebar from "../bidder/Biddersidebar";
import Biddernavbar from "../bidder/Biddernavbar";
function MessageView({ user }) {
  const [messageview, setMessageView] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/messageview")
      .then((res) => res.json())
      .then((data) => {
        const sortedmessages = data.sort((a, b) => new Date(b.messageviewdate) - new Date(a.messageviewdate));
        setMessageView(sortedmessages);
        setLoading(false);
        console.log(sortedmessages);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
    <Biddersidebar user={user} />

<div class="content">
  <Biddernavbar user={user}/>
        <div className="container-fluid">
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
              <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                <h3 className="text-center">Messages</h3>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <div className="list-group">
                    {messageview.length > 0 ? (
                      messageview.map((request, index) => (
                        <div 
                          key={request._id} 
                          className="d-flex align-items-center border-bottom py-3"
                          style={{ 
                            color: '#6C7293' // Ensuring text color is readable
                          }}
                        >
                          <div className="w-100 ms-3">
                            <div className="d-flex w-100 justify-content-between">
                              <h5 className="mb-0">{request.userId.name}</h5>
                              <small>{new Date(request.messageviewdate).toLocaleString()}</small>
                            </div>
                            <span><h6>💬{request.sendmessage}</h6></span>
                          </div>
                        </div>
                      ))
                    ) : ( 
                      <p>No Messages found.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default MessageView;
