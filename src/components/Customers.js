import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'
import { customers } from '../fakedb/Data';

export default class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: '',
      customers: []
    };
  }

  componentDidMount = () => {
    const cust = [];
    customers.map(item => {
      cust.push({
        key: item.name,
        value: item.customerId,
        text: (item.name.length > 7 ? (item.name.slice(0, 7) + '...') : item.name ) + ' (' + item.customerId + ')',
        image: { avatar: true, src: require('../assets/img/'+(item.gender && item.gender.toLowerCase() === 'female' ? 'female' : 'male')+'.png') }
      })
    })
    this.setState({
      customers: cust
    })
  }

  onChange = (event, result) => {
    const { name, value } = result || event.target;
    this.setState({ [name]: value });
    this.props.setCustomer(customers.find(cust => cust.customerId === value))
  };

  render() {
    return (
      <div className='form-group'>
        {/* <label>Customer</label> */}
        <Dropdown
          search
          name="customerId"
          onChange={ this.onChange }
          placeholder='Customer'
          fluid
          selection
          clearable
          options={ this.state.customers.slice(0, 3) }
          value={ this.state.customerId }
          className="orders-member"
        />
      </div>
    );
  }
}