import React from 'react';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import CUser from "../../components/User/User";


const UserPage = ()=> {
    return(
        <div>
            <Header/>
            <div className='main_content_wrapper'>
                <div className='wrapper'>
                    <CUser />
                </div>
            </div>
            <Footer/>
        </div>

    );
}

export default UserPage