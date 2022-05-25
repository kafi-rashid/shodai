import React, { Component } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import { categories } from '../fakedb/Data';


export default class OrderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.product,
      qty: 1
    };
  }

  onChange = (event, result) => {
    event.preventDefault();
    const { name, value } = result || event.target;
    if(value >= 0 && !isNaN(value)) this.setState({ qty: parseInt(value) })
  };

  getIcon = (category) => {
    const find = categories.find(cat => cat.name === category);
    if(find) return find.icon + '.png';
    else return 'grocery.png';
  }

  enterToAdd = (event) => {
    if(event.key === 'Enter') this.addToCart()
  }

  addToCart = () => {
    const product = this.state.item;
    product.qty = this.state.qty;
    this.props.addToCart(product);
  }

  render() {
    return (
      <div
        tabIndex={ 1 }
        onDoubleClick={ this.addToCart } 
        onKeyPress={ this.enterToAdd }
        className={ 'product '+this.props.class }
        { ...this.props }
      >
        <div className='image'>
          <img alt={ this.state.item.category } src={ require('../assets/img/cat/'+this.getIcon(this.state.item.category) ) }/>
        </div>
        <div className='content'>
          <p className='name'>{ this.state.item.name }</p>
          <p className='price'>৳ { this.state.item.price }</p>
        </div>
        <div className='action'>
          <input onChange={ this.onChange } type='number' placeholder='Qty' value={ this.state.qty }/>
          <button className='button button-outline' onClick={ this.addToCart }>
            <i className='material-icons'>add</i>&nbsp;Add
          </button>
        </div>
      </div>
    );
  }
}