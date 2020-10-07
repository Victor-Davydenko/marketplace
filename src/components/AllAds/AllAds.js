import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {ActionAllAd} from "../../store/store";
import Preloader from "../Preloader/Preloader";
import {d} from '../../functions/functions'
import {Link} from 'react-router-dom'



const Ad = ({data}) =>{
    const issued = new Date(+data.createdAt).toLocaleDateString()
    return(
        <li href='#' className='list-group-item single_ad'>
            <Link to={'/singleAd/' + data._id}>
                <div>
                     <h3>{data.title}</h3>
                    <div className='ad_image_holder'>
                        {data.images&&data.images[0]?
                            <img src={`http://marketplace.asmer.fs.a-level.com.ua/${data.images[0].url}`} alt=""/>:
                            <img src="http://placehold.it/200x200"  alt=""/>}
                    </div>
                    <div className='ad_bottom_row'>
                        <span>Цена: {data.price} грн.</span>
                        <span> Создано: {issued}</span>
                    </div>
                </div>
            </Link>
        </li>
    );
}


const AllAd = ({data, getData}) => {
    useEffect(()=>{
        async function fetchData() {
            await getData()
        }
        fetchData()
    },[])
    console.log(data)


    if(typeof data === 'undefined'){
        return(
            <Preloader />
        )
    }
    else {
        if( data.status === 'pending'){
            return (
                <Preloader />
            )
        }
        if(data.status === 'rejected'){
            return (
                <div>something went wrong</div>
            )
        }
        if(data.status === 'fulfilled'){
            console.log(data)
            return (

                <ul className='list-group'>
                    {data.payload.AdFind.map((ad) => <Ad data={ad} key={ad._id} >{ad.title}</Ad>)}
                </ul>
            )
        }
    }
}

const CAllAd = connect((s)=>({data: d`${s}promiseReducer.allAd`} ), {getData:ActionAllAd})(AllAd)

export default CAllAd