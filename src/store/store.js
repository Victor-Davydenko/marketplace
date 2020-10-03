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

const logoutAction = ()=>{
    return {
        type:'LOGGOUT'
    }
}

const ActionAllAd = ()=>{
    return actionPromise('allAd', gql(`query goods {
            AdFind(query: "[{}]") {
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
        AdFindOne(query: "[{\\"_id\\": \\"5dc9bfae79064d79bb6ba068 \\"}]") {
       
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

const actionGetUser = () =>{
    return actionPromise('User', gql(`query User{
        UserFindOne(query: "[{\\"_id\\": \\"5f5901476ab8aa131017a59f\\"}]") {
       
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
    if(action.type === 'LOGGOUT'){
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


export {store, authAction,logoutAction,pendingAction,fullfilledAction,rejectedAction,ActionAllAd,actionGetOneAd,actionGetUser}

