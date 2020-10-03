import React from 'react';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import CAllAd from "../../components/AllAds/AllAds";
import './AllAdsPage.scss'



const AllAdsPage = ()=> {
    return(
        <div>
            <Header/>
            <div className='main_content_wrapper'>
                <div className='wrapper'>
                    <CAllAd />
                </div>
            </div>
            <Footer/>
        </div>

    );
}

export default AllAdsPage