import React, { Component } from 'react';
import AddPurchase from './AddPurchase';
import Calc from './Calc';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      showOptions: false,
      username: '',
      designation: 'Salesperson',
      calculator: false
    };
  }

  componentDidMount = () => {
    let isHidden = localStorage.getItem('isHidden');
    if(isHidden) {
      this.setState({
        isHidden: JSON.parse(isHidden)
      })
    }
    if(localStorage.getItem('username')) {
      this.setState({
        username: localStorage.getItem('username')
      })
    }
  }

  calculator = () => {
    this.setState({
      calculator: !this.state.calculator
    })
  }

  back = () => {
    this.props.history.push('/');
  }

  toggleMenu = () => {
    var sideBar = 'sidebar';
    if(!document.getElementById('sidebar')) sideBar = 'pos-menu';
    if(document.getElementById(sideBar).classList.contains('menu-toggle')) {
      document.getElementById(sideBar).classList.remove('menu-toggle')
      document.getElementById('child-navigator') && document.getElementById('child-navigator').classList.remove('full-width')
    }
    else {
      document.getElementById(sideBar).classList.add('menu-toggle')
      document.getElementById('child-navigator') && document.getElementById('child-navigator').classList.add('full-width')
    }
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  toggleOptions = () => {
    this.setState({
      showOptions: !this.state.showOptions
    })
    const bodyElem = document.getElementsByTagName('body')
  }

  render() {
    return (
      <div id="header">
        <div className='logo-container'>
          <i
            className="material-icons menu-icon"
            onClick={ () => { this.toggleMenu() } }
          >
            { this.state.isHidden ? 'menu' : 'menu_open' }
          </i>
          <img
            src={ require('../assets/img/shodai.png') }
            className="logo"
            alt="Logo"
          />
        </div>

        <div className='mid-container pl-5 pr-5'>
          <div className='header-search'>
            <AddPurchase
              icon='search'
              shadow={ false }
              addToCart={ this.props.addToCart }
              isHeader={ true }
              />
          </div>
          <button onClick={ () => { this.props.history.push('/home/products/add') } } className='button button-red pr-3 ml-3'>
            <i className='material-icons'>add</i> Add New Item
          </button>
        </div>

        <div
          className='right-container'
        >
          <button className='button button-blue mr-3' onClick={ () => this.calculator() }>
            <i className='material-icons'>calculate</i>
          </button>
          <button className='button button-orange mr-3'>
            <i className='material-icons'>shopping_basket</i>
          </button>
          <button className='button button-red mr-4'>
            <i className='material-icons'>notifications</i>
          </button>
          <div
            className='d-flex align-items-center cursor-pointer'
            onClick={ () => { this.toggleOptions() } }
          >
            <div className='profile-pic'></div>
            <div className='greetings'>
              <p>Hello { this.state.username }</p>
              <p className='designation'>{ this.state.designation }</p>
            </div>
          </div>
        </div>

        <div id='header-options' className={ this.state.showOptions ? 'active' : '' }>
          <button
            className='header-close'
            onClick={ () => { this.toggleOptions() } }>
            ✕
          </button>
          <div className='header-options-profile'>
            <p className='name'>{ this.state.username }</p>
            <p className='designation'>Salesperson</p>
          </div>
          <div className='header-options-inner'>
            <button className=''>
              <i className='material-icons'>face</i>
              <p>Profile</p>
            </button>
            <button className=''>
              <i className='material-icons'>settings</i>
              <p>Settings</p>
            </button>
            <button className=''>
              <i className='material-icons'>security</i>
              <p>Change Password</p>
            </button>
            <button
              className=''
              onClick={ () => { this.back() } }>
              <i className='material-icons'>exit_to_app</i>
              <p>Log Out</p>
            </button>
          </div>
        </div>

        {
          this.state.calculator &&
          <Calc calculator={ this.calculator }/>
        }
      </div>
    );
  }
}