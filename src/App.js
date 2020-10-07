import React from 'react';
import { Router, Route} from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import {Provider} from 'react-redux';
import {store} from './store/store'
import './App.scss';
import LoginPage from "./pages/LoginPage/LoginPage";
import AllAdsPage from "./pages/AllAdsPage/AllAdsPage";
import OneAdPage from "./pages/OneAdPage/OneAdPage";
import UserPage from "./pages/UserPage/UserPage"
import MainPage from "./pages/MainPage/MainPage";
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import {Switch} from 'react-router-dom'



function App() {
    // store.subscribe(() => console.log(store.getState()))
  return (
    <Router history={createHistory()}>
        <div className="App">
            <Switch>
                <Route path={'/'} component={MainPage} exact />
                <Route path={'/login'} component={LoginPage} />
                <Route path={'/registration'} component={RegistrationPage}/>
                <Route path={'/allads'} component = {AllAdsPage} exact/>
                <Route path={'/singleAd/:id'} component = {OneAdPage}/>
                <Route path = {'/singleUser/:id'} component = {UserPage}></Route>
                <Route >fdsgsh</Route>
            </Switch>
        </div>
    </Router>
  );
}

export default () => <Provider store={store}>
    <App/>
    < /Provider>

