import React,{useEffect} from 'react';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import User from "../../components/User/User";
import {connect} from "react-redux";
import {actionGetUser} from "../../store/store";
import {d} from "../../functions/functions";
import AdCreator from "../../components/AdCreator/AdCreator";
import Uploader from "../../components/AdCreator/Uploader/Upload";


const UserPage = ({getUser, match: {params: {id}},userId})=> {
    useEffect(()=>{
        async function fetchData() {
            await getUser(id)
        }
        fetchData()
    },[id])
    return(
        <div>
            <Header/>
            <div className='main_content_wrapper'>
                <div className='wrapper'>
                    <User />
                    {id===userId? <AdCreator />: null}
                </div>
            </div>
            <Footer/>
        </div>

    );
}

export default connect((s)=>({userId: d`${s}authReducer.data.sub.id`}),{getUser:actionGetUser})(UserPage)