import React,{useEffect,useState} from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { collection, getDocs,where, query } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { Routes } from '../../constants';
import BlockMerchants from './BlockMerchants';

const Dashboard = () => {
  const [docData, setdocData] = useState({});
  const [verifiedData, setVerifiedData] = useState({});
  const [BlockedMerchant, setBlockedMerchants] = useState({});

  const getData = async () => {
    const q = query(collection(db, "Merchants"), where("isKycComplete", "==", true));
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setdocData(arr);
  };
  const getVerifiedData = async () => {
    const q = query(collection(db, "Merchants"), where("isProfileVerified", "==", true));
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setVerifiedData(arr);
  };

  const getBlockedData = async () => {
    const q = query(collection(db, "Merchants"), where("isProfileBlocked", "==", true));
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setBlockedMerchants(arr);
  };



  useEffect(() => {
    getData();
    getVerifiedData();
    getBlockedData();
  }, []);

  return (
<React.Fragment>
<section className="content">
    <div className="row">
      <div className="col-lg-3 col-xs-6">
         <div className="small-box bg-aqua ">
          <div className="inner">
            <p> Merchants </p>
              <h3>{ docData.length}</h3>
           </div>
              <div className="icon">
                <i className="ion ion-person"></i>
              </div>
            <NavLink to={routes.MERCHANT} className="small-box-footer">
                <i className="fa fa-arrow-circle-right"></i> <span>View Details</span>
            </NavLink>
          </div>
      </div>
      <div className="col-lg-3 col-xs-6">
            <div className="small-box bg-green">
              <div className="inner">
                <p>verified Merchants </p>
                <h3>{verifiedData.length}</h3>
              </div>
                <NavLink to={routes.VERIFYMERCHANTS} className="small-box-footer">
                <i className="fa fa-arrow-circle-right"></i> <span>View Details</span>
              </NavLink>
              </div>
        </div>
      <div className="col-lg-3 col-xs-6">
          <div className="small-box bg-red">
            <div className="inner">
              <p>Block Merchants</p>
              <h3>{BlockedMerchant.length}</h3>
            </div>
            <NavLink to={Routes.BLOCKMERCHANTS} className="small-box-footer">
                <i className="fa fa-arrow-circle-right"></i> <span>View Details</span>
              </NavLink>
            </div>
        </div>
      <div className="col-lg-3 col-xs-6">
          <div className="small-box bg-yellow">
            <div className="inner">
              <p>Total Collectibles</p>
              <h3>{"#"}</h3>
              </div>
                <NavLink to={"#"} className="small-box-footer ">
                <i className="fa fa-arrow-circle-right"></i> <span className='active'>View Details</span>
              </NavLink>
          </div>
        </div>
      </div>
    </section>
</React.Fragment>
  )
}

export default Dashboard