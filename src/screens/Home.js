import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { basename } from '../config/server';
import Loader from '../components/Loader';

import Header from '../components/Header';
import PosMenu from '../components/PosMenu';

const POS = lazy(() => import('./POS'));
const Products = lazy(() => import('./Products/Products'));
const People = lazy(() => import('./People/People'));
const Purchases = lazy(() => import('./Purchases/Purchases'));
const Reports = lazy(() => import('./Reports/Reports'));

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this.child = React.createRef();
  }

  componentDidMount = () => {
    
  }

  addToCart = (event) => {
    this.child.current && this.child.current.addToCart(event);
  }

  render() {
    return (
      <div className='super-container'>
        <Header history={ this.props.history } addToCart={ this.addToCart }/>
        <div className='content-container'>
          <PosMenu/>
          <div className='content'>
            <Switch>
              <Suspense fallback={ <Loader/> }>
                <Route path="/home/dashboard" render={ (props) => <POS ref={ this.child }/> } />
                <Route path="/home/products" component={ Products } />
                <Route path="/home/people" component={ People } />
                <Route path="/home/purchases" component={ Purchases } />
                <Route path="/home/reports" component={ Reports } />
                {/* <Route path="**" render={() => (<Redirect to="/home" />)} /> */}
              </Suspense>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}