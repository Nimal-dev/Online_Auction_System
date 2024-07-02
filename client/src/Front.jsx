import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import AboutUs from "./AboutUs";
import Footer from "./Footer";

function Front() {
  return (
    <>
    <Header/>
     <section class="hero-banner position-relative overflow-hidden">
        <div class="containers">
            <div class="row d-flex flex-wrap align-items-center">
                <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="position-relative left-hero-color">
                        <h1 class="mb-0 fw-bold">
                            Explore the Auction World 
                        </h1>
                        <p>Now you can Participate in Auctions digitally in you devices at home! </p>
                        {/* <a href="#" class="btn btn-warning btn-hover-secondery"><span class="d-inline-block me-2"><i class="ti ti-playstation-triangle"></i></span> Discover this Video</a> */}
                    </div>
                </div>
                <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="position-relative right-hero-color">
                        <img src="../assets/images/auction1.jpg" style={{borderRadius:"20px"}} class="img-fluid"/> 
                    </div>          
                </div>
            </div>
        </div>
    </section>
    <AboutUs/>
    <Footer/>
   
      {/* <Navbar /> */}
	  {/* <div style={{ backgroundImage: `url(/all.avif)`, backgroundSize: 'cover',width: '100%', height: '100vh',backgroundPosition: 'center',  }} /> */}


    </>
  );
}

export default Front;
