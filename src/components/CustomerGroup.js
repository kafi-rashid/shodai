import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'
import { customerGroup } from '../fakedb/Data';

export default class CustomerGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: '',
    };
  }

  componentDidMount = () => {
    // const cust = [];
    // customers.map(item => {
    //   cust.push({
    //     key: item.name,
    //     value: item.customerId,
    //     text: (item.name.length > 7 ? (item.name.slice(0, 7) + '...') : item.name ) + ' (' + item.customerId + ')',
    //     image: { avatar: true, src: require('../assets/img/'+(item.gender && item.gender.toLowerCase() === 'female' ? 'female' : 'male')+'.png') }
    //   })
    // })
    // this.setState({
    //   customers: cust
    // })
  }

  onChange = (event, result) => {
    const { name, value } = result || event.target;
    this.setState({ [name]: value });
    // this.props.setCustomer(customers.find(cust => cust.customerId === value))
  };

  render() {
    return (
      <div className='form-group'>
        {/* <label>Customer Group</label> */}
        <Dropdown
          search
          name="group"
          onChange={ this.onChange }
          placeholder='Customer Group'
          fluid
          selection
          clearable
          options={ customerGroup }
          value={ this.state.group }
          className="orders-member"
        />
      </div>
    );
  }
}