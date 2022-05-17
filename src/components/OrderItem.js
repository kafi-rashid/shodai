import React, { Component } from 'react';
import { categories } from '../fakedb/Data';

export default class OrderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item
    };
  }

  onChange = (event, result) => {
    const { name, value } = result || event.target;
    this.props.item.qty = value;
    value > -1 && this.setState({ item: this.props.item })
  };

  getIcon = (category) => {
    const find = categories.find(cat => cat.name === category);
    if(find) return find.icon + '.png';
    else return 'grocery.png';
  }

  getPrice = () => {
    return (this.props.item.qty * this.props.item.price).toFixed(2);
  }

  inc = () => {
    this.props.item.qty = parseInt(this.props.item.qty) + 1;
    this.setState({ item: this.props.item })
  }

  dec = () => {
    if(this.props.item.qty > 1) this.props.item.qty = parseInt(this.props.item.qty) - 1;
    this.setState({ item: this.props.item })
  }

  handleKeyPress = (event) => {
    if (event.key == '-') {
      this.props.manageOrderItem('d', event.target.getAttribute('prod-id'));
    }
  };

  render() {
    return (
      <button prod-id={ this.state.item.id } onKeyPress={ this.handleKeyPress } className={ 'order-item '+this.props.class } id={ 'OI_'+this.state.item.id }>
        <div className='image'>
          <img alt={ this.state.item.category } src={ require('../assets/img/cat/'+this.getIcon(this.state.item.category)) }/>
        </div>
        <div className='content'>
          <p className='name'>{ this.state.item.name }</p>
          <div className='qty'>
            <button className='dec' onClick={ () => { this.dec() } }>-</button>
            <input type='text' onChange={ this.onChange } value={ this.props.item.qty } />
            <button className='inc' onClick={ () => { this.inc() } }>+</button>
          </div>
        </div>
        <p className='price'>৳ { this.getPrice(this.state.item) }</p>
      </button>
    );
  }
}