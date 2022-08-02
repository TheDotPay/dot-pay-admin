import React, { useEffect, useState } from "react";
import { routes } from "../../constants/routes";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";
// import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { injectModels } from "../../redux/injectModels";


const MerchantDetail = (props) => {
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



  // const isMerchantBlocked =   props.admin.isMerchantBlocked(docData.merchantContractAddress);
  // console.log(isMerchantBlocked,"checkblock")
  const checkBlockStatus = async() => {
     const isMerchantBlocked =   await props.admin.isMerchantBlocked(docData.merchantContractAddress);
     const status = isMerchantBlocked?"Blocked":"Unblocked";
     const antistatus = isMerchantBlocked?"Unblock":"Block";
        Swal.fire({
      title: `${docData.name}`,
      text: `${docData.name} is ${status}, you can ${antistatus} by clicking button below.`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${antistatus} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if(isMerchantBlocked){
            try {
              props.application.setLoading(true)
              await props.admin.unBlockMerchant(docData.merchantContractAddress);
              getData();
              props.application.setLoading(false)
              Swal.fire("unBlocked!", "Merchant is Unblocked .", "success");
            } catch (err) {
              props.application.setLoading(false)
              console.log(err);
              return Promise.reject(err);
            }
            getData();
            Swal.fire("unBlocked!", "Merchant is Unblocked .", "success");
          }
          else{
          
            try {
              props.application.setLoading(true)
              await props.admin.blockMerchant(docData.merchantContractAddress);
              getData();
              props.application.setLoading(false)
              
              Swal.fire("Blocked!", "Merchant is blocked .", "success");
            } catch (err) {
              props.application.setLoading(false)
              console.log(err);
              return Promise.reject(err);
            }
            getData();
            Swal.fire("Blocked!", "Merchant is Blocked .", "success");
          }
        
        } catch (err) {
          console.log(err);
          return Promise.reject(err);
        }
      }
    });
    console.log(isMerchantBlocked,"....")
     return isMerchantBlocked;
  }

  useEffect(() => {
    getData();
    getKycData();
  }, []);
  


  // const handleBlock = () => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Block it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         await props.admin.blockMerchant(docData.merchantContractAddress);
  //         getData();
  //         Swal.fire("Blocked!", "Merchant is blocked .", "success");
  //       } catch (err) {
  //         console.log(err);
  //         return Promise.reject(err);
  //       }
  //     }
  //   });
  // };

  // const handleUnBlock = async() => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, UnBlock it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         await props.admin.unBlockMerchant(docData.merchantContractAddress);
  //         getData();
  //         Swal.fire("unBlocked!", "Merchant is Unblocked .", "success");
  //       } catch (err) {
  //         console.log(err);
  //         return Promise.reject(err);
  //       }
  //     }
  //   });
  // };

  const handleVerified = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "After verified !! merchant access all features.",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Verified it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          props.application.setLoading(true)
          // add a field to take the below values later
          let event = await props.admin.addMerchant(
            kycInfo.WalletAddress,
            "100000000000000000",
            "5000000000000000000"
          );
          let merchantContractAddress = event.topics[2];
          console.log(merchantContractAddress);
          let verifierAddress = event.topics[1];
          console.log(verifierAddress);
          props.application.setLoading(true)
          await updateDoc(doc(db, "Merchants", params.userId), {
            merchantContractAddress: merchantContractAddress,
            isProfileVerified: true,
            verifiedBy: verifierAddress
          });
          getData();
          props.application.setLoading(false)
          Swal.fire("Verified!", "Merchant is Verified .", "success");
        } catch (err) {
          console.log(err);
          return Promise.reject(err);
        }
      }
    });
  };

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
                      src={
                        imageLoading
                          ? "/assets/img/loader.svg"
                          : docData.image
                          ? docData.image
                          : "/assets/img/image-placeholder.svg"
                      }
                    />
                    {docData.isProfileVerified ? (
                      <img
                        src="../assets/img/verified.png"
                        alt=""
                        className="verified-img"
                      />
                    ) : (
                      ""
                    )}
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
                      <div className="profile-info-name"> User Id </div>
                      <div className="profile-info-value">
                        <span>{docData.uid}</span>
                      </div>
                    </div>
                    <div className="profile-info-row">
                      <div className="profile-info-name">
                        {" "}
                        Merchant Contract Address{" "}
                      </div>
                      <div className="profile-info-value">
                        <span>
                          {docData.merchantContractAddress
                            ? docData.merchantContractAddress
                            : "Yet Not Verified"}
                        </span>
                      </div>
                    </div>

                    <div className="button-kyc">
                    
                        <button className="block-btn" onClick={checkBlockStatus}>
                        <i className="fa-solid fa-gear"></i>
                        </button>
                        {/* :<button>UnBlock</button> */}
                      {docData.isProfileVerified ? (
                        ""
                      ) : (
                        <button className="btn-verfy" onClick={handleVerified}>
                          {" "}
                          Verify
                        </button>
                      )}
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

export default injectModels(['admin','application'])(MerchantDetail);

/* file created by sourav mishra on 22/07/2022 */