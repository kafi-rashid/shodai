import React from 'react';
import { products, categories } from '../../fakedb/Data';

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

  getIcon = (category) => {
    const find = categories.find(cat => cat.name === category);
    if(find) return find.icon + '.png';
    else return 'grocery.png';
  }

  details = (product) => {
    this.props.history.push({
      pathname: '/home/products/add',
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
            placeholder='Search product by name or barcode'/>

          <div className='table-responsive table-sticky'>
            <table className='table'>
              <thead>
                <tr>
                  <th width="10">SN.</th>
                  <th>Category</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Brand</th>
                  <th className='text-right'>Price</th>
                  <th className='text-right'>Qty</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.filter(product => product.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())).map((product, i) => (
                    <tr onClick={ () => { this.details(product) } } key={ 'Product_' + i }>
                      <td>{ i + 1 }</td>
                      <td>
                        <img alt={ product.category} src={ require('../../assets/img/cat/'+this.getIcon(product.category) ) } style={{ width: 20, marginRight: 10 }} />
                        { product.category }
                      </td>
                      <td className='font-weight-bold'>{ product.name }</td>
                      <td>{ product.type }</td>
                      <td>{ product.brand }</td>
                      <td className='text-right'>৳ { product.price.toFixed(2) }</td>
                      <td className='text-right'>{ product.qty }</td>
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