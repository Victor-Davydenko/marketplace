import React,{useState} from 'react'
import './AdCreaator.scss'
import {connect} from "react-redux";
import {actionCreateAd} from '../../store/store'
import Uploader from "./Uploader/Upload";

const AdCreator = ({createAd,imageData})=>{
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [address,setAddress] = useState('')
    imageData && imageData.payload ? console.log(imageData.payload._id):console.log('fff')
    let pics = []
    imageData && imageData.payload ? pics.push({_id:imageData.payload._id}):console.log('hgldshg')
    console.log(pics)
    return(
        <div className='ad_creator_holder'>
            <h2>Заполните следующие поля:</h2>
            <div className='input_title_holder'>
                <span>Заголовок обьявления:</span>
                <label>
                    <input type="text" onChange={(e)=>setTitle(e.target.value)}/>
                </label>
            </div>
            <div className='input_description_holder'>
                <span>Описание:</span>
                <label>
                    <textarea type="text" maxLength={500} onChange={(e)=>setDescription(e.target.value)}/>
                </label>
            </div>
            <div className='input_price_holder'>
                <span>Цена:</span>
                <label>
                    <input type="text" onChange={(e)=>setPrice(e.target.value)}/>
                </label>
            </div>
            <div className='input_addresses_holder'>
                <span>Адрес:</span>
                <label>
                    <input type="text" onChange={(e)=>setAddress(e.target.value)}/>
                </label>
            </div>
            <div className='uploader_holder'>
                <Uploader />
            </div>
            <button className='btn btn-success' onClick={()=>createAd(title,description,+price,address,[{_id: imageData.payload._id}] )}>Разместить обьявление</button>
        </div>
    );
}

export default connect((s)=>({imageData: s.promiseReducer.upload}),{createAd: actionCreateAd})(AdCreator)