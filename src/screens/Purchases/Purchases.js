import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { Routes } from '../../config/Routes';

const List = lazy(() => import('./List'));
const Add = lazy(() => import('./Add'));

class Purchases extends Component {
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
      if(route.title === 'Purchases') {
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
                <Route path={ '/home/purchases' } render={({ match: { url } }) => 
                  (
                    <>
                      <Route exact path={`${ url }`} render={() => (<Redirect to="/home/purchases/list" />)} />
                      <Route exact path={`${ url }/list`} component={ List } />
                      <Route exact path={`${ url }/add`} component={ Add } />
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

export default Purchases;