import {BrowserRouter as Router, Switch } from 'react-router-dom';
import CustomAdminRoute from './CustomAdminRoute';
import { Dashboard, Merchants ,MerchantDetail ,VerifyMerchants,BlockMerchants} from './Components/admin';
import { Routes } from './constants';
import './App.css';


function App() {
  return (
    <Router>
        <Switch> 
          <CustomAdminRoute exact  path={Routes.DEFAULT} component={Dashboard} />
          <CustomAdminRoute exact path={Routes.DASHBOARD} component={Dashboard} />
          <CustomAdminRoute exact path={Routes.MERCHANT} component={Merchants} />
          <CustomAdminRoute exact path={Routes.MERCHANTDETAILS+"/:userId"} component={MerchantDetail} />
          <CustomAdminRoute exact path={Routes.VERIFYMERCHANTS} component={VerifyMerchants} />
          <CustomAdminRoute exact path={Routes.BLOCKMERCHANTS} component={BlockMerchants} />
        </Switch>  
    </Router>
  );
}

export default App;
