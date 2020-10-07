import React  from 'react';
import './RegistrationPage.scss';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import {connect} from "react-redux";
import {registrationAction} from '../../store/store'
import {getGQL} from "../../functions/functions";


const RegistrationPage = ({dataReg,reg})=>{
    const registration = async (l,p)=>{
        let registrationData = await getGQL('http://marketplace.asmer.fs.a-level.com.ua/graphql')
        (`mutation reg{
            createUser(login:"${l}",password:"${p}"){_id}
            }
            `)

    }
    return(
        <React.Fragment>
            <Header />
            <div className='main_content_wrapper'>
                <div className='wrapper'>
                    <RegistrationForm onRegister={(login,password)=>registration(login,password)}/>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default connect((s)=>({dataReg: s.promiseReducer.registration}),{reg:registrationAction})(RegistrationPage)