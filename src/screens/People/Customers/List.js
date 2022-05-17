import React from 'react';
import { customers, categories } from '../../../fakedb/Data';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      searchTerm: ''
    };
  }

  componentDidMount = () => {
    
  }

  onChange = (event, result) => {
    const { name, value } = result || event.target;
    this.setState({ [name]: value });
  };

  details = (user) => {
    user['userType'] = user.role[0].roleName;
    this.props.history.push({
      pathname: '/home/people/add-customers',
      state: user
    })
  }

  back = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className='col-md-12'>
        <div className='content-body content-body-w-nav'>
          <input
            className='input-w-bg w-100 mb-15px h-40px'
            type='text'
            name='searchTerm'
            onChange={ this.onChange }
            placeholder='Search customer by name'/>

          <div className='table-responsive table-sticky'>
            <table className='table'>
              <thead>
                <tr>
                  <th width="10">SN.</th>
                  <th>Name</th>
                  <th>Customer ID</th>
                  <th>Contact No.</th>
                  <th>Street Address</th>
                  <th>Zone</th>
                </tr>
              </thead>
              <tbody>
                {
                  customers.filter(customer => customer.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())).map((customer, i) => (
                    <tr onClick={ () => { this.details(customer) } } key={ 'Customer_' + i }>
                      <td>{ i + 1 }</td>
                      <td className='font-weight-bold'>
                        <img
                          alt={ customer.gender}
                          src={ require('../../../assets/img/'+(customer.gender && customer.gender.toLowerCase() === 'female' ? 'female' : 'male')+'.png') }
                          style={{ width: 20, marginRight: 10 }} />
                        { customer.name }
                      </td>
                      <td>{ customer.customerId }</td>
                      <td>{ customer.contactNumber }</td>
                      <td>{ customer.address.line1 + ', ' + customer.address.line2 }</td>
                      <td>{ customer.address.district }</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}