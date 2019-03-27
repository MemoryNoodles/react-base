import {Route, Switch, Router, Redirect} from "react-router-dom";
import React, {Component} from "react";
import history from "./history";
import Loadable from 'react-loadable';
import MyLoadingComponent from '~/components/common/loadComponents';

const Login = Loadable({
    loader: () => import('~/container/Login/Login'),
    loading: MyLoadingComponent
});

const Dashboard = Loadable({
    loader: () => import('~/container/Dashboard/Dashboard'),
    loading: MyLoadingComponent
});
const SecurityCenter = Loadable({
    loader: () => import('~/container/SecurityCenter/SecurityCenter'),
    loading: MyLoadingComponent
})

const Routes = () => {
    return <Router history={history}>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/Login" component={Login}/>
            <Route exact path="/SecurityCenter" component={SecurityCenter}/>
            <Route path="/Dashboard" component={Dashboard}/>
            <Redirect
                to="/Login"
            />
        </Switch>
    </Router>
}

export default Routes