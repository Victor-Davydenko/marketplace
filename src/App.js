import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Provider} from 'react-redux';
import {store} from './store/store'
import './App.scss';
import LoginPage from "./pages/LoginPage/LoginPage";
import AllAdsPage from "./pages/AllAdsPage/AllAdsPage";
import OneAdPage from "./pages/OneAdPage/OneAdPage";
import UserPage from "./pages/UserPage/UserPage"
import COneAd from "./components/OneAd/OneAd";



function App() {
  return (
    <Router>
        <div className="App">
            {/*<LoginPage/>*/}
            <Route path={'/'} component = {AllAdsPage} exact/>
            <Route path={'/singleAd/5dc9bfae79064d79bb6ba068'} component = {COneAd}/>
            {/*<UserPage />*/}
        </div>
    </Router>
  );
}

export default () => <Provider store={store}>
    <App/>
    < /Provider>

