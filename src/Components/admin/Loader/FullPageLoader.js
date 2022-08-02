import React from 'react'
import { injectModels } from '../../redux/injectModels'


const FullPageLoader = () => {
  return (
    <div class="loader-container">
                <div className="loader">
                    <img src="/assets/img/loader.gif" alt="" />
                </div>
            </div>
  )
}

export default injectModels(['application']) (FullPageLoader);