import React, { Suspense, lazy } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { basename } from './config/server';
import Loader from './components/Loader'
import Splash from './screens/Splash';

const Login = lazy(() => import('./screens/Login'));
const Home = lazy(() => import('./screens/Home'));

const AllRoutes = () => (
  <HashRouter basename={ basename }>
    <Suspense fallback={ <Loader/> }>
      <Switch>
        <Route path="/" component={ Splash } exact />
        <Route path="/login" component={ Login } exact />
        <Route path="/home" component={ Home } />
      </Switch>
    </Suspense>
  </HashRouter>
)

export default AllRoutes;