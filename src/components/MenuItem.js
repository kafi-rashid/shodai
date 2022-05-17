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
      <div className='menu-item'>
        {
          !this.props.children &&
          <NavLink
            to={ this.props.path }
          >
            { this.props.title }
          </NavLink>
        }
        {
          this.props.children &&
          <>
            <NavLink
              className="sub-menu-parent"
              to={ this.props.path }
              onClick={ () => { this.setState({ show: !this.state.show }) } }
            >
              { this.props.title }
              <i className={ this.state.show ? "material-icons rotate-acw-90" : "material-icons rotate-cw-90" }>keyboard_arrow_right</i>
            </NavLink>
          </>
        }
        {
          (this.props.children && this.state.show) &&
          <div className='sub-menu'>
            {
              this.props.children.map((child, i) => (
                <NavLink
                  to={ child.path }
                >
                  { child.title }
                </NavLink>
              ))
            }
          </div>
        }
      </div>
    );
  }
}