import React,{useRef} from 'react'
import {connect} from 'react-redux'
import {d} from "../../../functions/functions";
import {actionUpload} from "../../../store/store";

const Uploader = ({onUpload})=>{
    const formRef = useRef()
    return(
        <form action="/upload" method="post" encType="multipart/form-data" id='form' ref={formRef}>
            <input type="file" name="photo" id='photo' onChange={()=>onUpload(formRef.current)}/>
        </form>
    );
}




export default connect((s)=>({data: d`${s}promiseReducer.upload`}),{onUpload:actionUpload})(Uploader)