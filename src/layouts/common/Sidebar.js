import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Routes } from "../../constants";

const Sidebar = () => {
  const { pathname } = useLocation();
  const splitLocation = pathname.split("/");

  return (

    <aside id="sidebar" className="sidebar">
    <ul className="sidebar-nav" id="sidebar-nav">

        {/* <li className="nav-item">
        <Link
            className={`nav-link  ${
              splitLocation[1] === "Dashboard" ? "collapsed" : ""
            } `}
            to={routes.DASHBOARD}
          >
            <i className="fa-solid fa-dashboard" />
            <span>Dashboard</span>
          </Link>
        </li> */}

        <li className="nav-item">
            <Link
              className={`nav-link  ${
                splitLocation[1] === "" ? "collapsed" : ""
              } `}
              to={Routes.DASHBOARD}
            >
              <i className="fa-solid fa-dashboard" />
              <span>Dashboard</span>
            </Link>
          </li>

        <li className="nav-item">
        <Link
            className={`nav-link  ${
              splitLocation[1] === "merchants" ? "collapsed" : ""
            } `}
            to={Routes.MERCHANT}
          >
             <i className="fa-solid fa-users"></i>
            <span>Merchants</span>
          </Link>
        </li>
          <li className="nav-item">
            <Link
              className={`nav-link  ${
                splitLocation[1] === "verify-merchant" ? "collapsed" : ""
              } `}
              to={Routes.VERIFYMERCHANTS}
            >
             <i className="fa-solid fa-user-check"></i>
              <span>Verify Merchants</span>
            </Link>
          </li>
        
        <li className="nav-item">
         <Link
            className={`nav-link  ${
              splitLocation[1] === "block-merchant" ? "collapsed" : ""
            } `}
            to={Routes.BLOCKMERCHANTS}
          >
            <i className="fa-solid fa-ban"></i>
            <span>Block Merchants</span>
          </Link>
        </li>
     
        <li className="nav-item">
         <Link
            className={`nav-link  ${
              splitLocation[1] === "activity" ? "collapsed" : ""
            } `}
            to={"#"}
          >
            <i className="fa-solid fa-chart-line"></i>
            <span>Activity</span>
          </Link>
        </li>
 
        <li className="nav-item">
         <Link
            className={`nav-link  ${
              splitLocation[1] === "login" ? "collapsed" : ""
            } `}
            to={"#"}
          >
            <i className="fa-solid fa-arrow-right-to-bracket" />
            <span>Login</span>
          </Link>
        </li>
  
        <li className="nav-item">
         <Link
            className={`nav-link  ${
              splitLocation[1] === "error" ? "collapsed" : ""
            } `}
            to={"#"}
          >
            <i className="fa-solid fa-triangle-exclamation" />
            <span>Error 404</span>
          </Link>
        </li>

        <li className="nav-item">
         <Link
            className={`nav-link  ${
              splitLocation[1] === "blank" ? "collapsed" : ""
            } `}
            to={"#"}
          >
            <i className="fa-solid fa-briefcase-blank" />
            <span>Blank</span>
          </Link>
        </li>

      </ul>
    </aside>
  );
};

export default Sidebar;
