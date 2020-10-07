import {createStore, combineReducers, applyMiddleware} from 'redux';
import jwt_decode from "jwt-decode";
import thunk from 'redux-thunk';
import { gql} from "../functions/functions";

function actionPromise(name, promise){
    return async dispatch => {
        dispatch(pendingAction(name))
        try {
            let result = await promise
            dispatch(fullfilledAction(name, result))
            return result;
        }
        catch(e){
            dispatch(rejectedAction(name, e))
        }
    }
}

const authAction = (token)=>{
    return {
        type:'LOGGED',
        token:token
    }
}

const registrationAction = (login, password)=>{
    return actionPromise('registration',gql(`mutation reg{
             createUser(login: "${login}", password: "${password}"){
                _id
                }
             }`))
}

const logoutAction = ()=>{
    return {
        type:'LOGOUT'
    }
}

const ActionAllAd = ()=>{
    return actionPromise('allAd', gql(`query goods {
            AdFind(query: "[{},{\\"sort\\":[{\\"_id\\":-1}]}]") {
                _id, 
                title,
                comments{
                    _id,
            
                }, 
                description, 
                price,
                createdAt,
                images {
                    _id,
                    url
                } 
                owner {
                    _id,
                    login,
                    phones,
                    createdAt    
                }
            }
        }`))
}

const actionGetOneAd = (id) => {
    return actionPromise('oneAd', gql(`query goods{
        AdFindOne(query: "[{\\"_id\\": \\"${id}\\"}]") {
       
            _id,
            title,
            description,
            price,
            comments{
                answers{
                    _id,
                    text
                    owner{
                        login
                    }
                }
                answerTo{
                    _id,
                    text
                    owner{
                    login
                    }
                }
                _id,
                text,
               createdAt
               owner{
                    login,
                    nick
               }
            }
            images {
            _id,
            url,
            },
            createdAt,
            owner {
                _id,
                login,
                phones,
                addresses,
                createdAt
            }
        }
    }`))
}

const actionGetUser = (id) =>{
    return actionPromise('User', gql(`query User{
        UserFindOne(query: "[{\\"_id\\": \\"${id}\\"}]") {
       
            _id,
            createdAt,
            login,
            phones,
            addresses,
            nick,
            avatar{
                _id,
                url
            },
            incomings{
                owner{
                    _id
                }
            }
          
        }
    }`))
}

const actionCreateAd = (title,description,price,address,images)=>{
    return actionPromise('CreateAd',gql(
        `mutation createAd($input: AdInput!){
            AdUpsert(ad: $input) {
                _id,
                title,
                description,
                price,
                address,
                images{
                _id
                }
            }
        }`, {input:{title: title, description: description, price: +price, address:address, images:images}})
    )
}

const actionUpload = (form)=>{
    return actionPromise('upload',fetch('http://marketplace.asmer.fs.a-level.com.ua/upload', {
        method: "POST",
        headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
        body: new FormData(form)
    }).then(res=>res.json()))
}

const actionChangeUserInfo = (id,nick,phones,addresses,avatar)=>{
    return actionPromise('changeUserInfo',gql(`mutation updateUserInfo($input: UserInput){
      UserUpsert(user: $input){
        _id,
        login
      }
    }`,{input: {_id:id,nick:nick,phones: phones, addresses: addresses,avatar:avatar}}))
}

const pendingAction =(name)=>{
    return{
        type:'PROMISE',
        status: "pending",
        payload: null,
        error: null,
        name
    }
}

const fullfilledAction =(name, payload)=>{
    return{

        type:'PROMISE',
        status: "fulfilled",
        payload: payload,
        error: null,
        name

    }
}

const rejectedAction =(name,error)=>{
    return{
        type:'PROMISE',
        status: 'rejected',
        payload: null,
        error: error,
        name

    }
}

const authReducer =(state, action)=>{
    if (state === undefined) {

        return {
            data:''
        }

    }
    if(action.type ==='LOGGED'){
        localStorage.authToken = action.token
        return {
            data: jwt_decode(action.token),
            token:action.token
        }
    }
    if(action.type === 'LOGOUT'){
        console.log('logout')
        localStorage.removeItem('authToken')
        return {

        }

    }
    return state
}


const promiseReducer = (state={}, {type, name, status, payload, error})=>{

    if (type === "PROMISE") {
        return {
            ...state, [name]:{
                status,
                payload,
                error,
            }
        }
    }
    return state
}

const reducers = combineReducers({
    authReducer,
    promiseReducer,

})

const store = createStore(reducers,applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()))

if(localStorage.authToken) {
    store.dispatch(authAction(localStorage.authToken))
}


export {store, authAction,
    logoutAction,
    registrationAction,
    pendingAction,
    fullfilledAction,
    rejectedAction,
    ActionAllAd,
    actionGetOneAd,
    actionGetUser,
    actionCreateAd,
    actionPromise,
    actionUpload,
    actionChangeUserInfo}

