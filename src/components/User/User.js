import React, {useState} from 'react';
import {connect} from "react-redux";
import Preloader from "../Preloader/Preloader";
import Uploader from "../AdCreator/Uploader/Upload";
import './User.scss'
import {actionChangeUserInfo} from "../../store/store";


const User = ({data,dataId, changeUserInfo, avatarData}) => {
    const [nick, setNick] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    if (typeof data === 'undefined') {
        return (
            null
        )
    } else {
        if (data.status === 'pending') {
            return (
                <Preloader/>
            )
        }
        if (data.status === 'rejected') {
            return (
                <div className='wrapper'>something went wrong</div>
            )
        }
        if (data.status === 'fulfilled') {
            const phones = phone
            const addresses = address
            const issued = new Date(+data.payload.UserFindOne.createdAt).toLocaleDateString()
            return (
                <div className='user_holder'>

                    <div className='user'>
                        <div className='avatar_holder'>
                            {data.payload.UserFindOne.avatar && data.payload.UserFindOne.avatar.url ?
                                <img
                                    src={`http://marketplace.asmer.fs.a-level.com.ua/${data.payload.UserFindOne.avatar.url}`}
                                    alt=""/> :
                                <img src="http://placehold.it/200x200" alt=""/>}
                        </div>
                        <div className='userInfo_holder'>
                            <p className='login'>Логин: {data.payload.UserFindOne.login}</p>
                            <div className='login_holder'>
                                <span
                                    className='login'>Никнейм: {data.payload.UserFindOne.nick ? data.payload.UserFindOne.nick : data.payload.UserFindOne.login}</span>
                            </div>
                            <div className='issuedDate'>
                                <span className='login'>Пользуется сайтом с: {issued}</span>
                            </div>
                            {data.payload.UserFindOne.phones ? <div className='phonees_holder'>
                                <span>Контактные телефон: {data.payload.UserFindOne.phones}</span>
                            </div> : null}
                            {data.payload.UserFindOne.addresses ? <div className='address_holder'>
                                <span>Адрес: {data.payload.UserFindOne.addresses}</span>
                            </div> : null}
                        </div>
                    </div>
                    {dataId === data.payload.UserFindOne._id? <div className='user_changer'>
                        <h2>Заполните информацию о себе:</h2>
                        <div className='input_nick_holder'>
                            <span>Никнейм:</span>
                            <label>
                                <input type="text" onChange={(e)=>setNick(e.target.value)}/>
                            </label>
                        </div>
                        <div className='input_phones_holder'>
                            <span>Телефон :</span>
                            <label>
                                <input type="text"  onChange={(e)=>setPhone(e.target.value)}/>
                            </label>
                        </div>
                        <div className='input_addresses_holder'>
                            <span>Адрес:</span>
                            <label>
                                <input type="text" onChange={(e)=>setAddress(e.target.value)}/>
                            </label>
                        </div>
                        <div>
                            <p>Загрузите Ваше фото:</p>
                            <div className='uploader_holder'>
                                <Uploader />
                            </div>
                        </div>
                        <button className='btn btn-success' onClick={()=>changeUserInfo(data.payload.UserFindOne._id,nick,phones,addresses,{_id:avatarData.payload._id})}>Изменить</button>
                    </div>: null}

                </div>
            )
        }
    }
}


export default connect((s) => ({
    data: s.promiseReducer.User,
    avatarData: s.promiseReducer.upload,
    dataId: s.authReducer.data.sub.id
}), {changeUserInfo: actionChangeUserInfo})(User)