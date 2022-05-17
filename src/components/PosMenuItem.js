import React, { Component } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import { server } from '../config/server';

export default class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  back = () => {
    this.props.history.push('/');
  }

  showSubmenu = () => {
    
  }

  render() {
    return (
      <NavLink
        className='pos-menu-item'
        to={ this.props.path }
      >
        <i className='material-icons'>{ this.props.icon ? this.props.icon : 'label' }</i>
        <p>{ this.props.title }</p>
      </NavLink>
    );
  }
}