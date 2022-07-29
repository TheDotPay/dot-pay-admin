import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from "react-bootstrap"
import { useState } from "react";
import { toast } from "react-toastify";
import { ethers } from "ethers";

const Header = () => {

  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const handleToggle = () => {
    const list = document.querySelector("body").classList;
    //console.log(list.contains,"list");
    if (list.contains("toggle-sidebar")) {
      list.remove("toggle-sidebar");
    } else {
      list.add("toggle-sidebar");
    }
  };
  const btnhandler = () => {
    // Asking if metamask is already present or not
    if (window.ethereum) {
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };
  const getbalance = (address) => {
    // Requesting balance method
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance) => {
        // Setting balance
        setBalance(ethers.utils.formatEther(balance));
      });
  };

  const accountChangeHandler = (account) => {
    localStorage.setItem("wallet", account);
    localStorage.setItem("wallet_type", process.env.REACT_APP_WALLET_TYPE_METAMASK);
    // console.log("account",account)
    // Setting an address data
    toast.success("Connect with MetaMask!", {
      position: toast.POSITION.TOP_CENTER,
    });
    setAddress(account);
    
    // Setting a balance
    getbalance(account);
  };



  const disconnect = () =>{
    setAddress();
    setBalance();
   }

  return (
  <header id="header" className="header fixed-top d-flex align-items-center">
  <div className="d-flex align-items-center justify-content-between">
    <Link to="/" className="logo d-flex align-items-center">
      <img src="../assets/img/logo.png" alt="true" />
    </Link>
    <i className="fa-solid fa-bars toggle-sidebar-btn"  onClick={handleToggle}/>
  </div>{/* End Logo */}
  {/* <div class="search-bar">
<form class="search-form d-flex align-items-center" method="POST" action="#">
  <input type="text" name="query" placeholder="Search" title="Enter search keyword">
  <button type="submit" title="Search"><i class="bi bi-search"></i></button>
</form>
    </div> */}{/* End Search Bar */}
  <nav className="header-nav ms-auto">

    <ul className="d-flex align-items-center">
      <li className="nav-item dropdown">
        <Link className="nav-link nav-icon" to="#" data-bs-toggle="dropdown">
          <i className="fa-regular fa-bell" />
          <span className="badge  badge-number">4</span>
        </Link>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
          <li className="dropdown-header">
            You have 4 new notifications
            <Link to="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li className="notification-item">
            <i className="bi bi-exclamation-circle text-warning" />
            <div>
              <h4>Lorem Ipsum</h4>
              <p>Quae dolorem earum veritatis oditseno</p>
              <p>30 min. ago</p>
            </div>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li className="notification-item">
            <i className="bi bi-x-circle text-danger" />
            <div>
              <h4>Atque rerum nesciunt</h4>
              <p>Quae dolorem earum veritatis oditseno</p>
              <p>1 hr. ago</p>
            </div>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li className="notification-item">
            <i className="bi bi-check-circle text-success" />
            <div>
              <h4>Sit rerum fuga</h4>
              <p>Quae dolorem earum veritatis oditseno</p>
              <p>2 hrs. ago</p>
            </div>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li className="notification-item">
            <i className="bi bi-info-circle text-primary" />
            <div>
              <h4>Dicta reprehenderit</h4>
              <p>Quae dolorem earum veritatis oditseno</p>
              <p>4 hrs. ago</p>
            </div>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li className="dropdown-footer">
            <Link to="#">Show all notifications</Link>
          </li>
        </ul>
      </li>
      {/* <li class="nav-item dropdown">

    <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
      <i class="bi bi-chat-left-text"></i>
      <span class="badge bg-success badge-number">3</span>
    </a>

    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
      <li class="dropdown-header">
        You have 3 new messages
        <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
      </li>
      <li>
        <hr class="dropdown-divider">
      </li>

      <li class="message-item">
        <a href="#">
          <img src="assets/img/messages-1.jpg" alt="" class="rounded-circle">
          <div>
            <h4>Maria Hudson</h4>
            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
            <p>4 hrs. ago</p>
          </div>
        </a>
      </li>
      <li>
        <hr class="dropdown-divider">
      </li>

      <li class="message-item">
        <a href="#">
          <img src="assets/img/messages-2.jpg" alt="" class="rounded-circle">
          <div>
            <h4>Anna Nelson</h4>
            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
            <p>6 hrs. ago</p>
          </div>
        </a>
      </li>
      <li>
        <hr class="dropdown-divider">
      </li>

      <li class="message-item">
        <a href="#">
          <img src="assets/img/messages-3.jpg" alt="" class="rounded-circle">
          <div>
            <h4>David Muldon</h4>
            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
            <p>8 hrs. ago</p>
          </div>
        </a>
      </li>
      <li>
        <hr class="dropdown-divider">
      </li>

      <li class="dropdown-footer">
        <a href="#">Show all messages</a>
      </li>

    </ul>

  </li> */}
      <li className="nav-item dropdown pe-3">
        <Link className=" nav-link nav-icon nav-profile d-flex align-items-center pe-0" to="#" data-bs-toggle="dropdown">
          <i className="fa-regular fa-user" />
          {/* <span class="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span> */}
        </Link>{/* End Profile Iamge Icon */}
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
          <li className="dropdown-header">
            <h6>Kevin Anderson</h6>
            <span>Web Designer</span>
          </li>
        </ul>{/* End Profile Dropdown Items */}
      </li>{/* End Profile Nav */}
      <li className="nav-item dropdown pe-3">
            <Link
              className=" nav-link nav-icon nav-profile d-flex align-items-center pe-0 "  
              to="#"
              data-bs-toggle="dropdown"
            >
              <i className="fa-solid fa-wallet" />
              {/* <span class="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span> */}
            </Link>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <Card className="text-center">
                  <Card.Header>
                    <strong>Address: </strong>
                    {address && address}
                  </Card.Header>
                  <Card.Body>
                  <Card.Text>
                      <strong>Balance: </strong>
                      {balance}
                    </Card.Text>
                   {!address && <Button onClick={btnhandler} variant="primary">
                      Connect to wallet
                    </Button>}
                    {address && <Button onClick={disconnect} variant="primary">
                     Disconnect Wallet
                    </Button>}
                  </Card.Body>
                </Card>
              </li>
            </ul>
          </li>
    </ul>
  </nav>{/* End Icons Navigation */}
</header>

  )
}

export default Header