import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { Routes } from '../../config/Routes';

const ListUser = lazy(() => import('./Users/List'));
const AddUser = lazy(() => import('./Users/Add'));
const ListCustomer = lazy(() => import('./Customers/List'));
const AddCustomer = lazy(() => import('./Customers/Add'));
const ListSupplier= lazy(() => import('./Suppliers/List'));
const AddSupplier= lazy(() => import('./Suppliers/Add'));

class Peoples extends Component {
	constructor() {
		super();
		this.state = {
      childRoutes: []
		}
	}

  componentDidMount = () => {
    this.getChildRoutes();
    document.getElementById('child-navigator').addEventListener('wheel', this.onMouseWheel);
  }

  componentWillUnmount = () => {
    document.getElementById('child-navigator').removeEventListener('wheel', this.onMouseWheel);
  }

  onMouseWheel(event) {
    event.preventDefault();
    const elem = document.getElementById('child-navigator');
    if(elem) {
      elem.scrollBy({
        left: event.deltaY < 0 ? -50 : 50,
      });
    }
  }

  getChildRoutes = () => {
    Routes.map(route => {
      if(route.title === 'People') {
        this.setState({
          childRoutes: route.children
        })
      }
    })
  }

	render() {
		return (
      <div className='flex-grow-1'>

        <div className='d-flex flex-grow-1'>
          <div className='flex-grow-1'>
            <div id='child-navigator'>
              {
                this.state.childRoutes.map((item, i) => (
                  <NavLink
                    key={ 'Child_' + i }
                    to={ item.path }
                  >
                    <i className='material-icons'>{ (!item.icon || item.icon === '') ? 'chevron_right' : item.icon  }</i>&nbsp;{ item.title }
                  </NavLink>
                ))
              }
            </div>
            <div className='row'>
              <Switch>
                <Route path={ '/home/people' } render={({ match: { url } }) => 
                  (
                    <>
                      <Route exact path={`${ url }`} render={() => (<Redirect to="/home/people/list-users" />)} />
                      <Route exact path={`${ url }/list-users`} component={ ListUser } />
                      <Route exact path={`${ url }/add-users`} component={ AddUser } />
                      <Route exact path={`${ url }/list-customers`} component={ ListCustomer } />
                      <Route exact path={`${ url }/add-customers`} component={ AddCustomer } />
                      <Route exact path={`${ url }/list-suppliers`} component={ ListSupplier } />
                      <Route exact path={`${ url }/add-suppliers`} component={ AddSupplier } />
                    </>
                  )
                }
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
		);
	}
}

export default Peoples;