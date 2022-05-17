import React from 'react';
import { Purchases } from '../../fakedb/Purchases';
import moment from 'moment';

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

  details = (purchase) => {
    this.props.history.push({
      pathname: '/home/purchases/add',
      state: purchase
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
            placeholder='Search by reference number'/>

          <div className='table-responsive table-sticky'>
            <table className='table'>
              <thead>
                <tr>
                  <th width="10">SN.</th>
                  <th>Date of Purchase</th>
                  <th>Reference #</th>
                  <th>Supplier</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  Purchases.filter(purchase => purchase.reference.toLowerCase().includes(this.state.searchTerm.toLowerCase())).map((purchase, i) => (
                    <tr onClick={ () => { this.details(purchase) } } key={ 'Purchase_' + i }>
                      <td>{ i + 1 }</td>
                      <td className='font-weight-bold'>{ moment(purchase.purchaseDate).format('DD MMMM YYYY') }</td>
                      <td>{ purchase.reference }</td>
                      <td>{ purchase.supplier }</td>
                      <td>{ purchase.status }</td>
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