import React, {useState} from 'react';
import {connect} from "react-redux";
import './OneAd.scss'
import {Link} from "react-router-dom";
import Preloader from "../Preloader/Preloader";

const Comment = ({data})=>{
    console.log(data)
    return(
        <li className={'list-group-item d-flex'} style={{position:'relative'}}>
            <div className='login_holder' style={{minWidth:'70px',marginRight:'25px'}}>
                {data.owner.nick? <span className='user_nick'>{data.owner.nick}:</span>:<span className='user_login'>{data.owner.login}:</span>}
            </div>
            <div
                className='comment_text_holder' style={{flexGrow:'1'}}>{data.text}
            </div>
            <div className='answerTo_holder'>
                <ul>
                    {data.answers? data.answers.
                    map((answer)=><li className='answerTo_holder list-group-item' style={{backgroundColor:"#ccc"}}>
                        <div className='d-flex'>
                            <div>{answer.owner.login} ответил:</div>
                            <div>{answer.text}</div>
                            {/*<div>{new Date(+answer.createdAt).toLocaleDateString()}</div>*/}
                        </div>
                    </li>): null}
                </ul>
            </div>
            <div>
                {new Date(+data.createdAt).toLocaleDateString()}
            </div>

        </li>
    );
}

const OneAd = ({data})=>{
    const [btnState, setBtnState] = useState(false)

    if(typeof data === 'undefined'){
        return null
    }

    else {
        if(data.status === 'pending'){

            return (
                <Preloader />
            )
        }
        if(data.status === 'rejected'){
            return (
                <div className='wrapper'>something went wrong</div>
            )
        }
        if(data.status === 'fulfilled'){
            const issued = new Date(+data.payload.AdFindOne.createdAt).toLocaleDateString()
            const ownerissued = new Date(+data.payload.AdFindOne.owner.createdAt).toLocaleDateString()
            return (
                <div className='wrapper oneAd'>
                   <h1>{data.payload.AdFindOne.title}</h1>
                    <div className='oneAd_image_holder'>
                        {data.payload.AdFindOne.images ?
                            data.payload.AdFindOne.images.
                            map((pic)=> <div key={pic._id} className='add_image_holder'><img src={`http://marketplace.asmer.fs.a-level.com.ua/${pic.url}`} alt=""/></div>)
                            : null}

                    </div>
                    <div className='d-flex justify-content-between'>
                        <span className='price'>Цена: {data.payload.AdFindOne.price} грн.</span>
                        <span className='issued'>Добавлено: {issued}</span>
                    </div>

                    <h3>Описание:</h3>
                    <p className='description'>{data.payload.AdFindOne.description}</p>
                    <div className='owner_info'>
                        <Link to={'/singleUser/'+data.payload.AdFindOne.owner._id} className='d-block' style={{fontSize:'18px',fontWeight:'700'}}>Контактное лицо: {data.payload.AdFindOne.owner.login}</Link>
                        <span className='d-block'>Пользуется сайтом с {ownerissued}</span>
                        <span className='d-block'>{data.payload.AdFindOne.owner.adresses}</span>
                        <a href={`tel:${data.payload.AdFindOne.owner.phones}`} className='d-block'></a>

                    </div>
                    {data.payload.AdFindOne.comments ?
                        <div className='comments_holder'>
                            <button className='btn btn-success' style={{margin:'10px'}} onClick={()=>{
                                setBtnState(!btnState)
                            }}>Посмотреть комментарии</button>
                            <div className={btnState? 'comments_visible': 'comments_hide'}>
                                <div className='comment_owner'>
                                    <ul>
                                        {data.payload.AdFindOne.comments.map((comment)=> comment.answerTo? null: <Comment data={comment} key={comment._id} />
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>: null}
                </div>
            )
        }
    }
}



export default connect((s)=> ({data:s.promiseReducer.oneAd}))(OneAd)