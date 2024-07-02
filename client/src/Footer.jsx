import React from 'react'

function Footer() {
  return (
    <>
      <footer class="footer">
        <div class="containers">
            <div class="row">
                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12">
                    <div class="footer-logo-col">
                    <h3 style={{fontFamily:"unset", padding:"20px"}}>ONLINE AUCTION SYSTEM</h3>
                        {/* <a href="#"><img src="../assets/images/logo.png" style={{width:"150px"}}/></a> */}
                        <p class="blue-light mb-0 fs-7 fw-500">Online Auction System is a multi faced platform for Auction lovers to have their auction in their hand devices from home.</p>
                        <div class="callus text-dark fw-500 fs-7">
                        Opp. Technopark Phase-1, Pallinada, Kazhakkoottam, Thiruvananthapuram, Kerala 695582
                            <div class="blue-light">Call us: <a href="tel:+918921866155" class="text-warning fw-500 fs-7 text-decoration-none">+91 89430 43767</a></div>
                        </div>
                    </div>
                </div>
                <div class="col-xxl-2 col-xl-2 col-lg-2 col-md-6 col-sm-12">
                    <h5 class="text-dark">Social</h5>
                    <ul class="list-unstyled mb-0 pl-0">
                        <li><a href="https://www.facebook.com/logipromptproacademy/">Facebook</a></li>
                        <li><a href="https://www.instagram.com/logiprompt_pro_academy/">Instagram</a></li>
                    </ul>
                </div>
                
                
            </div>
            <div class="copyrights text-center blue-light  fw-500">@<span id="autodate">2024</span> - All Rights Reserved by <a href="https://logipromptproacademy.com/" class="text-decoration-none" style={{color:"lightgreen"}}>Logiprompt Pro Academy</a></div>
        </div>
    </footer>
    </>
  )
}

export default Footer