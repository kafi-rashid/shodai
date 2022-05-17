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

  details = (product) => {
    this.props.history.push({
      pathname: '/home/people/add-suppliers',
      state: product
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
            placeholder='Search by name'/>

          <div className='table-responsive table-sticky'>
            <table className='table'>
              <thead>
                <tr>
                  <th width="10">SN.</th>
                  <th>Name</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {
                  customers.filter(supplier => supplier.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())).map((supplier, i) => (
                    <tr onClick={ () => { this.details(supplier) } } key={ 'Supplier_' + i }>
                      <td>{ i + 1 }</td>
                      <td className='font-weight-bold'>
                        { supplier.name }
                      </td>
                      <td>{ supplier.address.line1 }</td>
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