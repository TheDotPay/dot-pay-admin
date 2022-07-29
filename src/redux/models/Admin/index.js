import store from '../../store';
import { blockMerchant,addMerchant,unBlockMerchant ,isMerchantBlocked} from './action';

const obj = {

    blockMerchant:(merchantContractAddress)=>store.dispatch(blockMerchant(merchantContractAddress)),
    unBlockMerchant:(merchantContractAddress)=>store.dispatch(unBlockMerchant(merchantContractAddress)),
    isMerchantBlocked:(merchantContractAddress)=>store.dispatch(isMerchantBlocked(merchantContractAddress)),
    addMerchant:(walletAddress, currentShare, sharingCliffValue)=>store.dispatch(addMerchant(walletAddress, currentShare, sharingCliffValue))
}

export default obj;
