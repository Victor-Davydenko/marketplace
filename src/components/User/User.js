import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {actionGetUser} from "../../store/store";
import {store} from "../../store/store";



const User = ({data, getUser})=>{

    useEffect(()=>getUser(),[])
    console.log(data)
    console.log(store.getState())
    if(typeof data === 'undefined'){
        return(
            <div>Empty</div>
        )
    }
    else {
        if(data.status === 'pending'){
            return (
                <div className='wrapper'>Loading</div>
            )
        }
        if(data.status === 'rejected'){
            return (
                <div className='wrapper'>something went wrong</div>
            )
        }
        if(data.status === 'fulfilled'){
            const issued = new Date(+data.payload.UserFindOne.createdAt).toLocaleDateString()
            return (
                <div className='user'>
                    <div className='avatar_holder'>
                        {data.payload.UserFindOne.avatar && data.payload.UserFindOne.avatar.url ?
                            <img src={`http://marketplace.asmer.fs.a-level.com.ua/${data.payload.UserFindOne.avatar.url}`} alt=""/>:
                            <img src="http://placehold.it/200x200"  alt=""/>}
                    </div>
                    <p className='login'>Логин: {data.payload.UserFindOne.login}</p>
                    <span className='login'>Никнейм: {data.payload.UserFindOne.nick? data.payload.UserFindOne.nick: data.payload.UserFindOne.login}</span>
                    <span className='login'>Зарегистрирован: {issued}</span>
                    {data.payload.UserFindOne.phones? <span>Контактный телефон: {data.payload.UserFindOne.phones}</span>:<span></span>}
                    {data.payload.UserFindOne.addresses? <span>Адрес: {data.payload.UserFindOne.addresses}</span>:<span></span>}
                </div>
            )
        }
    }
}

const CUser = connect((s)=> ({data:s.promiseReducer.User}), {getUser:actionGetUser})(User)

export default CUser