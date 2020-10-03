import React from 'react';
import './header.scss';


const Header = ()=>{
    return(
        <header className='header'>
            <div className='wrapper'>
                <strong className='logo'>
                    <a href="#" className='logo_link'>
                        <span>
                        The best marketplace ever
                        </span>
                    </a>
                </strong>
               <div className='navigation d-flex justify-content-between align-items-center'>
                   <a href="#"className='profile_link'>Мой профиль</a>
                   <a className='btn btn-info '>Подать обьявление</a>
                   <a href="#"className='profile_link'>Зарегистрироваться</a>
               </div>
            </div>
        </header>
    );
}


export default Header