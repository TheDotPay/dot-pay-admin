import React, { useEffect, useState } from "react";
import { routes } from "../../constants/routes";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";
// import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MerchantDetail = () => {
  const params = useParams();
  const [kycInfo, setkycInfo] = useState({});
  const [docData, setdocData] = useState({});
  const [imageLoading, setImageLoading] = useState(false);

  const getKycData = async () => {
    const docRef = doc(db, "Kyc", params.userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() && docSnap.data();
      setkycInfo(data);
    } else {
      console.log("No such document!");
    }
  };

  const getData = async () => {
    const docRef = doc(db, "Merchants", params.userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() && docSnap.data();
      // console.log(data);
      setdocData(data);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getData();
    getKycData();
  }, []);

  const handleBlock = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Block it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateDoc(doc(db, "Merchants", params.userId), {
          isProfileBlocked: true,
        });
        getData();
        Swal.fire("Blocked!", "Merchant is blocked .", "success");
      }
    });
  };
  const handleUnBlock = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, UnBlock it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateDoc(doc(db, "Merchants", params.userId), {
          isProfileBlocked: false,
        });
        getData();
        Swal.fire("UnBlocked!", "Merchant is Unblocked .", "success");
      }
    });
  };

  const handleVerified = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "After verified !! merchant access all features.",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Verified it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateDoc(doc(db, "Merchants", params.userId), {
          isProfileVerified: true,
        });
        getData();
        Swal.fire("Verified!", "Merchant is Verified .", "success");
      }
    });
  };
  
  console.log(kycInfo, "kyc");
  console.log(docData, "docdata");
  // console.log(params.userId,"id")

  return (
    <React.Fragment>
      <div id="user-profile-2" className="user-profile">
        <div className="tabbable">
          <ul className="nav nav-tabs padding-18">
            <li className="active merchantsame-icon">
              <div className="merchant-icon">
                <Link to={routes.MERCHANT}>
                  <i className="fa-solid fa-arrow-left"></i>
                </Link>
              </div>
              Merchant Details
            </li>
          </ul>
          <div className="tab-content no-border padding-24">
            <div id="home" className="tab-pane in active">
              <div className="row">
                <div className="col-md-4">
                  <span className="profile-picture">
                    <img
                      className="editable  img-fluid"
                      alt=" Avatar"
                      id="avatar2"
                      // src={docData.image}
                      src={imageLoading 
                        ? "/assets/img/loader.svg" 
                        : docData.image 
                        ? docData.image
                        : "/assets/img/image-placeholder.svg"
                      }
                    />
                   {docData.isProfileVerified ? <img src="../assets/img/verified.png" alt="" className="verified-img"/> : ""}
                  </span>
                  
                </div>

                <div className="col-md-8 ">
                  <h4 className="blue">
                    <span className="middle">Personal Details</span>
                  </h4>
                  <div className="profile-user-info">
                    <div className="profile-info-row">
                      <div className="profile-info-name"> Name </div>
                      <div className="profile-info-value">
                        <span>{docData.name}</span>
                      </div>
                    </div>
                    <div className="profile-info-row">
                      <div className="profile-info-name"> Username </div>
                      <div className="profile-info-value">
                        <span>{docData.username}</span>
                      </div>
                    </div>
                    <div className="profile-info-row">
                      <div className="profile-info-name"> Email </div>
                      <div className="profile-info-value">
                        <span>{docData.email}</span>
                      </div>
                    </div>
                    <div className="profile-info-row">
                      <div className="profile-info-name"> Phone </div>
                      <div className="profile-info-value">
                        <span>{docData.phone}</span>
                      </div>
                    </div>
                    <div className="profile-info-row">
                      <div className="profile-info-name"> user Id </div>
                      <div className="profile-info-value">
                        <span>{docData.uid}</span>
                      </div>
                    </div>
                    <div className="button-kyc">
                      {docData.isProfileBlocked ? (
                        <button onClick={handleUnBlock}>UnBlock</button>
                      ) : (
                        <button className="block-btn" onClick={handleBlock}>
                          Block
                        </button>
                      )}
                      {docData.isProfileVerified ?  "" :<button className="btn-verfy" onClick={handleVerified}> Verify</button>}
                    </div>

                    <div className="hr hr-8 dotted" />
                  </div>
                </div>
                <hr className="mt-3"></hr>
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="blue">
                      <span className="middle">Buisness Details</span>
                    </h4>
                    <div className="profile-user-info">
                      <div className="profile-info-row">
                        <div className="profile-info-name"> Buisness Type </div>
                        <div className="profile-info-value">
                          <span>{kycInfo.BuisnessType}</span>
                        </div>
                      </div>
                      <div className="profile-info-row">
                        <div className="profile-info-name">
                          {" "}
                          Buisness Label{" "}
                        </div>
                        <div className="profile-info-value">
                          <span>{kycInfo.BillingLabel}</span>
                        </div>
                      </div>
                      <div className="profile-info-row">
                        <div className="profile-info-name">
                          {" "}
                          Business Category{" "}
                        </div>
                        <div className="profile-info-value">
                          <span>{kycInfo.buisnessCategory}</span>
                        </div>
                      </div>
                      <div className="profile-info-row">
                        <div className="profile-info-name">Site Url </div>
                        <div className="profile-info-value">
                          <span>
                            {kycInfo.SiteUrl
                              ? kycInfo.SiteUrl
                              : "Accept payments on Website"}
                          </span>
                        </div>
                      </div>
                      <div className="profile-info-row">
                        <div className="profile-info-name">
                          {" "}
                          Business Description{" "}
                        </div>
                        <div className="profile-info-value">
                          <span>{kycInfo.Description}</span>
                        </div>
                      </div>
                    </div>
                    <div className="hr hr-8 dotted" />
                  </div>
                  <div className="col-md-6">
                    <h4 className="blue">
                      <span className="middle">Kyc Details</span>
                    </h4>
                    <div className="profile-user-info">
                      <div className="profile-info-row">
                        <div className="profile-info-name"> Pan </div>
                        <div className="profile-info-value">
                          <span>{kycInfo.Pan}</span>
                        </div>
                      </div>
                      <div className="profile-info-row">
                        <div className="profile-info-name">
                          {" "}
                          Pan Holder Name{" "}
                        </div>
                        <div className="profile-info-value">
                          <span>{kycInfo.PanholderName}</span>
                        </div>
                      </div>
                      <div className="profile-info-row">
                        <div className="profile-info-name"> Pin Code </div>
                        <div className="profile-info-value">
                          <span>{kycInfo.Pincode}</span>
                        </div>
                      </div>
                      <div className="profile-info-row">
                        <div className="profile-info-name"> City </div>
                        <div className="profile-info-value">
                          <span>{kycInfo.City}</span>
                        </div>
                      </div>
                      <div className="profile-info-row">
                        <div className="profile-info-name"> State </div>
                        <div className="profile-info-value">
                          <span>{kycInfo.State}</span>
                        </div>
                      </div>
                      <div className="profile-info-row">
                        <div className="profile-info-name">
                          {" "}
                          Wallet Address{" "}
                        </div>
                        <div className="profile-info-value">
                          <span>{kycInfo.WalletAddress}</span>
                        </div>
                      </div>
                    </div>
                    <div className="hr hr-8 dotted" />
                  </div>
                </div>
              </div>
              <div className="space-20" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MerchantDetail;
