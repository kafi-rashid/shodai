import React, { Component } from 'react';
import PosMenuItem from './PosMenuItem';
import { Routes } from '../config/Routes' 

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div id="pos-menu">
        {
          Routes.map((item, i) => (
            <PosMenuItem
              key={ 'Menu_' + i }
              title={ item.title }
              path={ item?.path }
              children={ item?.children }
              icon={ item?.icon }
            />
          ))
        }
      </div>
    );
  }
}