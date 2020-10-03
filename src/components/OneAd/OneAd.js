import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {actionGetOneAd} from "../../store/store";
import {store} from "../../store/store";
import './OneAd.scss'


const OneAd = ({data,match, getOneAd})=>{
    const [btnState, setBtnState] = useState(true)
    useEffect(()=>getOneAd(),[])
    console.log(match)
    console.log(store.getState())

    if(typeof data === 'undefined'){
        return null
    }
    else {
        if(data.status === 'pending'){
            console.log('loading')
            return (
                <div className='wrapper'>Loading</div>
            )
        }
        if(data.status === 'rejected'){
            console.log('something went wrong')
            return (
                <div className='wrapper'>something went wrong</div>
            )
        }
        if(data.status === 'fulfilled'){
            const issued = new Date(+data.payload.AdFindOne.createdAt).toLocaleDateString()
            const ownerissued = new Date(+data.payload.AdFindOne.owner.createdAt).toLocaleDateString()
            console.log(data.payload.AdFindOne)
            return (
                <div className='wrapper oneAd'>
                   <h1>{data.payload.AdFindOne.title}</h1>
                    <div className='oneAd_image_holder'>
                        {/*<img src={`http://marketplace.asmer.fs.a-level.com.ua/${data.payload.AdFindOne.images[0].url}`} alt=""/>*/}
                    </div>
                    <div className='d-flex justify-content-between'>
                        <span className='price'>Цена: {data.payload.AdFindOne.price} грн.</span>
                        <span className='issued'>Добавлено: {issued}</span>
                    </div>

                    <h3>Описание:</h3>
                    <p className='description'>{data.payload.AdFindOne.description}</p>
                    <div className='owner_info'>
                        <span className='d-block' style={{fontSize:'18px',fontWeight:'700'}}>Контактное лицо: {data.payload.AdFindOne.owner.login}</span>
                        <span className='d-block'>Пользуется сайтом с {ownerissued}</span>
                        <span className='d-block'>{data.payload.AdFindOne.owner.adresses}</span>
                        <a href={`tel:${data.payload.AdFindOne.owner.phones}`} className='d-block'></a>

                    </div>
                    <button href="" className='btn btn-success' onClick={()=>{

                        setBtnState(!btnState)
                        console.log(btnState)}}>Посмотреть комментарии</button>
                    <div className={btnState? 'comments_visible': 'comments_hide'}>
                        {/*<div className='comment_owner'>*/}
                        {/*    <ul>*/}
                        {/*        {data.payload.AdFindOne.comments.map((oneComment)=><li>*/}
                        {/*            <span>{oneComment.owner.nick? oneComment.owner.nick: oneComment.owner.login}</span>*/}
                        {/*            <span>*/}
                        {/*                {oneComment.text}*/}
                        {/*                <span>AnswerTo:{oneComment.answerTo? oneComment.answerTo.text: null}</span>*/}
                        {/*            </span>*/}
                        {/*            <span>{new Date(+oneComment.createdAt).toLocaleString()}</span>*/}
                        {/*        </li>)}*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                    </div>
                </div>
            )
        }
    }
}

const COneAd = connect((s)=> ({data:s.promiseReducer.oneAd}), {getOneAd:actionGetOneAd})(OneAd)

export default COneAd