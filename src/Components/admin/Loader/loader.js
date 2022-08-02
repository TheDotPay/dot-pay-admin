import React from 'react';
import { injectModels } from '../../../redux/injectModels';
import './loader.css';
const Loader = ({application}) => {
    return (
        <React.Fragment>
            { application.loading ? 
                 <React.Fragment>
                    <div className='loader-overlay'></div>
                    <div className="loader-generic">
                    <img src={`assets/img/loader.svg`} alt="" />
                    {application.loadingMessage && <p>{`${application.loadingMessage}`}</p>}
                    </div>
                 </React.Fragment>
                 : null 
            }
        </React.Fragment>
    );
};

export default injectModels (['application'])(Loader);