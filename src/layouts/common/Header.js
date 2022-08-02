import React from "react";
import { Link } from "react-router-dom";
import { Button, Card,Modal } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import {injectModels} from '../../redux/injectModels'

const Header = (props) => {
  
  const [address, setAddress] = useState("");
  // const [verifierAddress,setVerifierAddress] = useState("");
  const [balance, setBalance] = useState("");
  // const [showModal, setShow] = useState(false);
  // const [error,setError] = useState("")


  // const handleVerifierWalletAddress = (e) => {
  //   e.preventDefault();
  //   const val = e.target.value;
  //   if (val.trim() === "") {
  //     setError("You need to add Verifier Wallet Address");                                                  
  //   } else {
  //     setError("");
  //   }
  //   setVerifierAddress(val.trim());
  // };

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const handleSubmit = async (e) => {
  //    e.preventDefault();
  //    let valid = true;
  //   if (verifierAddress === "") {
  //     setError("Wallet Address is Required");
  //     valid = false;
  //   }else {
  //     setError("");
  //   }
  //     if (!valid) {
  //     setError("You need to add Verifier Wallet Address");  
  //       return;
  //   } else {
  //    setError("")
  //    try {
  //     props.application.setLoading(true)
  //     await props.admin.addVerifier(verifierAddress);
  //     props.application.setLoading(false)
  //     handleClose() 
  //   } catch (err) {
  //     props.application.setLoading(false)
  //     console.log(err);
  //     return Promise.reject(err);
  //   }
  //   }
  // };

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
    localStorage.setItem(
      "wallet_type",
      process.env.REACT_APP_WALLET_TYPE_METAMASK
    );
    // console.log("account",account)
    // Setting an address data
    toast.success("Connect with MetaMask!", {
      position: toast.POSITION.TOP_CENTER,
    });
    setAddress(account);

    // Setting a balance
    getbalance(account);
  };

  const disconnect = () => {
    setAddress();
    setBalance();
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center">
          <img src="../assets/img/logo.png" alt="true" />
        </Link>
        <i
          className="fa-solid fa-bars toggle-sidebar-btn"
          onClick={handleToggle}
        />
      </div>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
          {/* <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div  className="nav-link nav-icon nav-profile  align-items-center pe-0"
       onClick={handleShow}>
        <i className="fa-solid fa-person-circle-plus" />
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add verifier</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please Enter the Verifier Wallet Address
          <form>
        <div className="searchformfld">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Wallet Address*"
                        onChange={handleVerifierWalletAddress}
                      />
                    </div>
                    </form>
        </Modal.Body>
        {error && (
                    <div className="col-xs-12 col-md-12 col-lg-12">
                      <div className="alert alert-danger">{error}</div>
                    </div>
                  )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
          </li>
          <li className="nav-item dropdown">
            <Link
              className="nav-link nav-icon"
              to="#"
              data-bs-toggle="dropdown"
            >
              <i className="fa-regular fa-bell" />
              <span className="badge  badge-number">4</span>
            </Link>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have 4 new notifications
                <Link to="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                </Link>
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
          <li className="nav-item dropdown pe-3">
            <Link
              className=" nav-link nav-icon nav-profile d-flex align-items-center pe-0"
              to="#"
              data-bs-toggle="dropdown"
            >
              <i className="fa-regular fa-user" />
              {/* <span class="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span> */}
            </Link>
            {/* End Profile Iamge Icon */}
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>Kevin Anderson</h6>
                <span>Web Designer</span>
              </li>
            </ul>
            {/* End Profile Dropdown Items */}
          </li>
          {/* End Profile Nav */}
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
                    {!address && (
                      <Button onClick={btnhandler} variant="primary">
                        Connect to wallet
                      </Button>
                    )}
                    {address && (
                      <Button onClick={disconnect} variant="primary">
                        Disconnect Wallet
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      {/* End Icons Navigation */}
    </header>
  );
};

export default injectModels (['admin','application'])(Header) ;
