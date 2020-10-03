import React from 'react';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import CLoginPage from "../../components/LoginForm/LoginForm"


const LoginPage = ()=> {
    return(
        <div>
            <Header/>
            <div className='main_content_wrapper'>
                <div className='wrapper'>
                    <CLoginPage/>
                </div>
            </div>
            <Footer/>
        </div>

    );
}

export default LoginPage