/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Orders from '../Pages/Orders';
import NewOrder from '../Pages/NewOrder';
import Signup from '../Auth/Signup';
import Signin from '../Auth/Signin';


const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);
const UnauthenticatedLayout = (props) => (
  <>
    {props.children}
  </>
);


const MainRouter = ({ channel }) => (
  <Switch>
    {/* Authenticated Routes */}
    <Route exact path="/orders" component={Orders} />
    <Route exact path="/new-order" component={NewOrder} />


    {/* Un-authenticated Routes */}
    <AppRoute exact path="/" layout={UnauthenticatedLayout} component={Signup} />
    <AppRoute exact path="/login" layout={UnauthenticatedLayout} component={Signin} />

  </Switch>
);

export default MainRouter;
