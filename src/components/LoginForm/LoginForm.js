import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getGQL} from "../../functions/functions";
import {store,authAction,logoutAction,pendingAction,fullfilledAction,rejectedAction} from "../../store/store";
import {Link} from 'react-router-dom'


const LoginForm = ({onLogin, onLogout}) => {
    const [name, setName] = useState('');
    const [surName, setSurname] = useState('');
    const [buttonState, setButtonState] = useState(false)
    const regNumber = /[0-9]/
    useEffect(() => {
        if (name !== '') {
            setName(name.split('')[0].toUpperCase() + name.slice(1))
        }
        if (name.length < 2 || surName.length < 3) {
            setButtonState(true)
        } else {
            setButtonState(false)
        }
        if (name.search(regNumber) !== -1 || surName.search(regNumber) !== -1) {
            setButtonState(true)
        }
    }, [name, surName, regNumber])

    return (
        <div className='registrationFormHolder'>
            <h1>Войдите в свой аккаунт</h1>
            <div className="input-group input-row-holder">
                <span className="input-group-addon input-label">Введите Ваш логин:</span>
                <input type="text" className="form-control" placeholder="Ваш логин здесь"
                       aria-describedby="basic-addon1" value={name}
                       onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="input-group input-row-holder">
                <span className="input-group-addon input-label">Введите Ваш пароль:</span>
                <input type="text" className="form-control" placeholder="Ваш пароль здесь"
                       aria-describedby="basic-addon2" value={surName}
                       onChange={(e) => setSurname(e.target.value)}/>

            </div>

            <button type="button" className="btn btn-info button" onClick={async ()=>{
                  await  onLogin(name, surName)}}
               disabled={buttonState}>Войти</button>

        </div>
    );

}

const LoginPage = ({cn,authAction,logoutAction}) => {
    const login = async (l, p) => {
        try {
            // pendingAction()
            let loginData = await getGQL('http://marketplace.asmer.fs.a-level.com.ua/graphql')
            (`query auth {
            login(login: "${l}", password: "${p}")
            }`)
            const token = loginData.login
            await authAction(token)
            // fullfilledAction(loginData)
            console.log(store.getState())
        }
        catch (e) {
            // rejectedAction(e)
            console.log(store.getState())
        }
    }
    const logout = ()=>{
        logoutAction()
        console.log(store.getState())
        console.log(localStorage)

    }

    return (
        <React.Fragment>
            <LoginForm onLogin={(l, p) => login(l, p)} onLogout={logout}></LoginForm>
        </React.Fragment>
    );
}

const mapStateToProps = (s) => {
    if (s.authReducer.data) {
        return {cn: s.authReducer.data.sub.login}
    } else {
        return {cn: 'Anon'}
    }
}

const mapDispatchToProps = {
    authAction,
    logoutAction,
    pendingAction,
    fullfilledAction,
    rejectedAction,

}

const CLoginPage =  connect(mapStateToProps,mapDispatchToProps)(LoginPage)

export default CLoginPage