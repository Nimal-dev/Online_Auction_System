import React, { useState } from "react";

function Messages({ user }) {
  const [sendMessage, setSendMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = (event) => {
    event.preventDefault();
    let params = {
      userId: user, // Ensure userId matches server-side field name
      sendmessage: sendMessage,
    };
    fetch("http://localhost:4000/sendMessage", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // Show success message
        setMessage("Message has been Sent");
      })
      .catch((error) => {
        console.error("Error sending Message:", error);
        // Show error message
        setMessage("Failed to send message. Please try again later!");
      });
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
  };

  return (
    <div className="container-fluid">
      <div className="row h-100 align-items-center justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
          <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <h3>CHAT MESSAGES</h3>
            </div>
            {/*------------------------- ALERT MESSAGE ---------------------------------*/}
            {message && (
              <div className="alert alert-success" role="alert">
                {message}
              </div>
            )}
            <form>
              {/*------------------------- Address Input ---------------------------------*/}
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Enter your message"
                  id="floatingTextarea"
                  name="Auctioneer Message"
                  style={{ height: "150px" }}
                  onChange={(event) => setSendMessage(event.target.value)}
                ></textarea>
                <label htmlFor="floatingTextarea">Send Message</label>
              </div>
              {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
              <button
                type="button"
                className="btn btn-primary py-3 w-100 mb-4"
                onClick={handleSendMessage}
              >
                <strong>SEND MESSAGE</strong>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
