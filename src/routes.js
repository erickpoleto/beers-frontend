import  React from 'react';
import { isAuthenticated } from './services/auth'

import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/home';
import Items from './pages/items';
import About from './pages/about';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import ConfirmedEmail from './pages/emailConfirmed';
import Profile from './pages/profile';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );

export default function Router() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/items" component={Items}/>
                <Route path="/about" component={About}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/confirmed" component={ConfirmedEmail}/>
                <Route path="/forgotpassword" component={ForgotPassword}/>
                <Route path="/resetPassword" component={ResetPassword}/>
                <PrivateRoute path="/profile" component={Profile}/>
                
            </Switch>
        </BrowserRouter>
    );
}