import React  from 'react';
import './RegistrationPage.scss';
import Header from "../../components/header/header";
import Main from "../../components/main/main";
import Footer from "../../components/footer/footer";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";


const RegistrationPage = ()=>{
    const registration = async (l,p)=>{
        let registrationData = await fetch('http://marketplace.asmer.fs.a-level.com.ua/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `mutation reg{
            createUser(login:${l},password:${p}){_id}
            }
            `
            })
        })
        let res = await registrationData.json()
        console.log(res)
    }
    return(
        <React.Fragment>
            <Header />
            <Main>
                <RegistrationForm onRegister={(l,p)=>registration(l,p)}></RegistrationForm>
            </Main>
            <Footer />
        </React.Fragment>
    );
}

export default RegistrationPage