import {BrowserRouter as Router, Switch } from 'react-router-dom';
import CustomAdminRoute from './CustomAdminRoute';
import { Dashboard, Merchants  ,VerifyMerchants,BlockMerchants, Loader,Verifiers} from './Components/admin';
import MerchantDetail from './Components/admin/MerchantDetail'
import { Routes } from './constants';
import './App.css';
import { injectModels } from './redux/injectModels';


function App() {
  return (
    <Router>
      <Loader />
        <Switch> 
          <CustomAdminRoute exact  path={Routes.DEFAULT} component={Dashboard} />
          <CustomAdminRoute exact path={Routes.DASHBOARD} component={Dashboard} />
          <CustomAdminRoute exact path={Routes.MERCHANT} component={Merchants} />
          <CustomAdminRoute exact path={Routes.MERCHANTDETAILS+"/:userId"} component={MerchantDetail} />
          <CustomAdminRoute exact path={Routes.VERIFYMERCHANTS} component={VerifyMerchants} />
          <CustomAdminRoute exact path={Routes.BLOCKMERCHANTS} component={BlockMerchants} />
          <CustomAdminRoute exact path={Routes.VERIFIERS} component={Verifiers} />
        </Switch>  
    </Router>
  );
}

export default injectModels(['application'])(App);

/* file created by sourav mishra on /07/2022 */