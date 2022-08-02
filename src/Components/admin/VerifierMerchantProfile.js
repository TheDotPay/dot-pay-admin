import React ,{useState ,useEffect}from 'react';
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";

const VerifierMerchantProfile = () => {
    const params = useParams();
    const[verifer,setVerifer] = useState("");
    console.log(verifer,"verifier")

    const getData = async () => {
        const docRef = doc(db, "Verifier", params.Wallet);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          const data = docSnap.data() && docSnap.data();
          // console.log(data);
          setVerifer(data);
        } else {
          console.log("No such document!");
        }
      };

      useEffect(() => {
        getData();
      }, []);
      
  return (
    <div>VerifierMerchantProfile</div>
  )
}

export default VerifierMerchantProfile;