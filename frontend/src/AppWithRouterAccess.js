import './App.css';
import React, {Component} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {NavigationBar} from './components/NavigationBar';
import { withRouter, Route } from "react-router-dom";
import { Home } from './pages/home';
import RegularCharity from './pages/RegularCharity';
import registerSpot from './pages/registerSpot';
import SpotCharity from './pages/SpotCharity';
import Login from './pages/Login';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import AdminDashboard from "./pages/AdminDashboard";

class AppWithRouterAccess extends Component {
    constructor(props) {
        super(props);
        this.onAuthRequired = this.onAuthRequired.bind(this);
    }

    onAuthRequired() {
        this.props.history.push('/login')
    }

    render() {
        return (
            <Security issuer={`${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`}
                      clientId={process.env.REACT_APP_OKTA_CLIENT_ID}
                      redirectUri={window.location.origin + '/login/callback'}
                      onAuthRequired={this.onAuthRequired}>
                <NavigationBar/>
                <Route path="/" exact={true} component={Home}/>
                <SecureRoute exact path="/regular" component={RegularCharity}/>
                <Route exact path="/spot" component={SpotCharity}/>
                <Route exact path="/registerSpot" component={registerSpot}/>
                <SecureRoute path='/admin' render={() => <AdminDashboard apiToken={process.env.REACT_APP_OKTA_API_TOKEN} hostName={process.env.REACT_APP_OKTA_ORG_URL} />} />
                <Route path='/login' render={() => <Login baseUrl={process.env.REACT_APP_OKTA_ORG_URL} />} />
                <Route path='/login/callback' component={LoginCallback} />
            </Security>
        );
    }
}
export default withRouter(AppWithRouterAccess);

