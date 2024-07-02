import React from 'react'

function Header() {
  return (
    <>
    
    <header class="main-header position-fixed w-100">
            <div class="containers">
                <nav class="navbars navbar-expand-xl py-0">
                    <div class="logo">
                        <h3 style={{fontFamily:"unset", padding:"20px"}}>ONLINE AUCTION SYSTEM</h3>
                        {/* <a class="navbar-brand py-0 me-0" ><img src="../assets/images/logo.png" style={{width:"100px"}} alt=""/></a> */}
                    </div>
                    <a class="d-inline-block d-lg-block d-xl-none d-xxl-none  nav-toggler text-decoration-none"  data-bs-toggle="offcanvas" href="#offcanvasExample" aria-controls="offcanvasExample">
                        <i class="ti ti-menu-2 text-warning"></i>
                    </a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">                                             
                            <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                    <a class="nav-link text-capitalize" aria-current="page" href="/">Home</a>
                                </li>
                               
                                <li class="nav-item">
                                    <a class="nav-link text-capitalize" aria-current="page" href="#hero">About us</a>
                                </li>
                               
                            </ul>
                            <div class="d-flex align-items-center">
                           <a class="btn btn-warning btn-hover-secondery text-capitalize " href="/register">register</a>
                           <a class="btn btn-hover-secondery text-capitalize" style={{marginLeft:"10px", backgroundColor:"#06C755", color:"white", padding:"15px 20px", borderRadius:"15px"}} href="/Login">Login</a>
                            </div>
                    </div>
                </nav>
            </div>

            <div class="offcanvas offcanvas-start"  tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <div class="logo">
                        <a class="navbar-brand py-0 me-0" href="#"><img src="../assets/images/Creato-logo.svg" alt=""/></a>
                    </div> 
                    <button type="button" class="btn-close text-reset  ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"><i class="ti ti-x text-warning"></i></button>
                </div>
                <div class="offcanvas-body pt-0">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link text-capitalize" aria-current="page" href="#">Services</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-capitalize" href="#">Pricing</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-capitalize" href="#">Pricing </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-capitalize" href="#">Elements </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-capitalize" href="#">blog </a>
                        </li>
                        </ul>
                        <div class="login d-block align-items-center mt-3">
                            <a class="btn btn-warning text-capitalize w-100" href="#">contact us</a>
                        </div>
                </div>
            </div>
    </header>
    </>
  )
}

export default Header