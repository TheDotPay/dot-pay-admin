import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { injectModels } from "../../redux/injectModels";
import { toast } from "react-toastify";
import { collection, where, getDocs, query,doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { routes } from "../../constants/routes";
import { Link } from "react-router-dom";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Verifiers = (props) => {
   const [verifierAddress,setVerifierAddress] = useState("");
   const [verifierName,setVerifierName] = useState("");
   const [verifierEmail,setverifierEmail] = useState("");
   const [verifierPhone,setVerifierPhone] = useState("");
   const [showModal, setShow] = useState(false);
   const [error,setError] = useState("");
   const[verifer,setVerifer] = useState("");

   const getData = async () => {
    const q = query(
      collection(db, "Verifier"),
      where("isEnabeled", "==", true)
    );
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setVerifer(arr);
  };
  
  useEffect(() => {
    getData();
  }, []);



   const handleVerifierWalletAddress = (e) => {
     e.preventDefault();
     const val = e.target.value;
     if (val.trim() === "") {
       setError("You need to add Verifier Wallet Address");
     } else {
       setError("");
     }
     setVerifierAddress(val.trim());
   };

   const handleVerifierEmail = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val.trim() === "") {                                                                        //validations for email
      setError("Email is required");
    } else if (!emailRegex.test(val)) {
      setError("Enter a valid Email ");
    } else {
      setError("");
    }
    setverifierEmail(val.trim());
  };

  const handleVerifierName = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val.trim() === "") {
      setError("You need to add Verifier Name");
    } else {
      setError("");
    }
    setVerifierName(val.trim());
  };

  const handleVerifierPhone = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val.trim() === "") {
      setError("You need to add Verifier Phoone");
    } else {
      setError("");
    }
    setVerifierPhone(val.trim());
  };


   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   
  //  const handleRemoveVerifier = async() =>{
  //   try{
  //     props.application.setLoading(true)
  //      await props.admin.removeVerifier(verifierAddress);

  //      await setDoc(doc(db, "Verifier",  verifierAddress), {
  //       isEnabeled:false
  //     });
  //      props.application.setLoading(false)
  //      toast.success("Verifier Remove SuccessFully!", {
  //       position: toast.POSITION.TOP_CENTER,
  //     });

  //   }catch (err) {
  //     props.application.setLoading(false)
  //     console.log(err);
  //     return Promise.reject(err);
  //   }
  //   };
  

   const handleSubmit = async (e) => {
      e.preventDefault();
      let valid = true;
     if (verifierAddress === "") {
       setError("Form is not Valid");
       valid = false;
     }else {
       setError("");
     }
     if (verifierName === "") {
      setError("Form is not Valid");
      valid = false;
    }else {
      setError("");
    }
    if (verifierEmail === "") {
      setError("Form is not Valid");
      valid = false;
    }else {
      setError("");
    }
    if (verifierPhone === "") {
      setError("Form is not Valid");
      valid = false;
    }else {
      setError("");
    }
       if (!valid) {
       setError("Form is not Valid");
         return;
     } else {
      setError("")
      try {
       props.application.setLoading(true)
       await props.admin.addVerifier(verifierAddress);

       await setDoc(doc(db, "Verifier",  verifierAddress), {
        verifierAddress:verifierAddress,
        verifierName: verifierName,
        verifierEmail: verifierEmail,
        verifierPhone: verifierPhone,
        isEnabeled:true
      });
       props.application.setLoading(false)
       toast.success("Verifier Added SuccessFully!", {
        position: toast.POSITION.TOP_CENTER,
      });
       handleClose()
       getData();
     } catch (err) {
       props.application.setLoading(false)
       console.log(err);
       return Promise.reject(err);
     }
     }
   };
   
  return (
    <React.Fragment>
      <Button onClick={handleShow}>Add Verifier</Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add verifier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please Enter the Verifier Wallet Address
          <form>
            <div className="searchformfld">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Wallet Address*"
                onChange={handleVerifierWalletAddress}
              />
                 <input
                type="text"
                className="form-control mb-3"
                placeholder="Verifier Name*"
                onChange={handleVerifierName}
              />
                <input
                type="email"
                className="form-control mb-3"
                placeholder="Verifier Email*"
                onChange={handleVerifierEmail}
              />
              <input
                type="tel"
                className="form-control mb-3"
                placeholder="Verifier Phone*"
                onChange={handleVerifierPhone}
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
      </Modal>
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">verifierAddress</th>
            <th scope="col">verifierEmail</th>
            <th scope="col">verifierName </th>
            <th scope="col">verifierPhone</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {verifer && verifer.length > 0 ? (
            <React.Fragment>
              {verifer.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <b>{item.verifierAddress}</b>
                    </td>
                    <td>{item.verifierEmail}</td>
                    <td>{item.verifierName}</td>
                    <td>{item.verifierPhone}</td>
                    <td>{item.name}</td>
                    <td><Link to={routes.VERIFIERMERCHANTPROFILE  + "/" + item.verifierAddress}>View</Link></td>
                  </tr>
                );
              })}
            </React.Fragment>
          ) : (
            <tr>
              <td colSpan="10 mt-2">No results found!</td>
            </tr>
          )}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default injectModels(['admin','application'])(Verifiers);
