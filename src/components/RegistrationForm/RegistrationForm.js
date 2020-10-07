import React,{useState, useEffect} from 'react';
import  './RegistrationForm.scss'
import {Link} from "react-router-dom";


const RegistrationForm = ({onRegister})=>{
    const[name, setName] = useState('');
    const [surName, setSurname] = useState('');
    const [buttonState, setButtonState] = useState(false)
    const regNumber = /[0-9]/
    useEffect(()=>{
        if (name !== ''){
            setName(name.split('')[0].toUpperCase()+name.slice(1).toLowerCase())
        }
        if(name.length<2 || surName.length<3 ){
            setButtonState(true)
        }
        else {
            setButtonState(false)
        }
        if( name.search(regNumber)!== -1 || surName.search(regNumber)!== -1){
            setButtonState(true)
        }
    },[name, surName,  regNumber])

    return(
        <div className='registrationFormHolder'>
            <h1>Регистрация</h1>
            <div className="input-group input-row-holder" >
                <span className="input-group-addon input-label">Введите Ваш логин:</span>
                <input type="text" className="form-control" placeholder="Ваш логин здесь" aria-describedby="basic-addon1" value={name}
                onChange={(e)=>setName(e.target.value)}/>
            </div>

            <div className="input-group input-row-holder">
                <span className="input-group-addon input-label">Введите Ваш пароль:</span>
                <input type="text" className="form-control" placeholder="Ваш пароль здесь" aria-describedby="basic-addon2" value={surName}
                       onChange={(e)=>setSurname(e.target.value)}/>

            </div>

            <Link to={'/login'} type="button" className="btn btn-info button" onClick={()=>onRegister(name,surName)}
                    disabled = {buttonState}>Зарегистрироваться</Link>
        </div>
    );

}

export default RegistrationForm