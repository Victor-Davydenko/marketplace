import React from 'react';
import './header.scss';
import {Link} from "react-router-dom";
import {d, gql} from "../../functions/functions";
import {connect} from "react-redux";
import {logoutAction} from "../../store/store";


const Header = ({data,logout}) => {
    console.log(data)
    return (
        <header className='header'>
            <div className='wrapper'>
                <strong className='logo'>
                    {localStorage.authToken ? <Link to={'/allads'} className='logo_link'>
                        <span>
                        The best marketplace ever
                        </span>
                    </Link> : <Link to={'/'} className='logo_link'>
                        <span>
                        The best marketplace ever
                        </span>
                    </Link>}
                </strong>
                <div className='navigation d-flex justify-content-between align-items-center'>
                    {localStorage.authToken ? <span>
                        <Link to={'/singleUser/' + data.id} style={{color: 'FFF'}} className='profile_link btn btn-info btn-sm'>{data.login}</Link>
                  </span> : <span>
                       <Link to={'/login'} className='profile_link enter btn btn-info btn-sm'>Войти</Link>
                  </span>}
                    {localStorage.authToken ?
                        <span>
                           <Link to={'/singleUser/' + data.id} className='profile_link btn btn-info btn-sm'>Подать обьявление</Link>
                       </span> :null}
                    {localStorage.authToken? null:  <Link to="/registration" className='profile_link btn btn-info btn-sm'>Зарегистрироваться</Link>}
                    {localStorage.authToken? <Link to={'/'} className='btn btn-info btn-sm' onClick={()=>{logout()}}>Exit</Link>:null}
                </div>
            </div>
        </header>
    );
}


export default connect((s) => ({data: d`${s}authReducer.data.sub`}),{logout:logoutAction})(Header)


