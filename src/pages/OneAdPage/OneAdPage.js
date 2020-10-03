import React from 'react';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import COneAd from '../../components/OneAd/OneAd'



const OneAdPage = (props)=> {
    console.log(props)
    return(
        <div>
            <Header/>
            <div className='main_content_wrapper'>
                <div className='wrapper'>
                    <COneAd/>
                </div>
            </div>
            <Footer/>
        </div>

    );
}

export default OneAdPage