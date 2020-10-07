import React, {useEffect} from 'react';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import OneAd from '../../components/OneAd/OneAd'
import {connect} from "react-redux";
import {actionGetOneAd} from "../../store/store";



const OneAdPage = ({data,match: {params: {id}}, getOneAd})=> {
    console.log(id, data)
    useEffect(()=>{
        async function fetchData() {
            await getOneAd(id)
        }
        fetchData()
    },[id])
    return(
        <div>
            <Header/>
            <div className='main_content_wrapper'>
                <div className='wrapper'>
                    <OneAd/>
                </div>
            </div>
            <Footer/>
        </div>

    );
}


export  default connect(null, {getOneAd:actionGetOneAd})(OneAdPage)
