import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { products as allProducts } from '../fakedb/Data';
import '../assets/css/Search.css';

const products = JSON.parse(JSON.stringify(allProducts));
products.map(item => item.qty = 1);

export default class AddPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      products: [],
    };
    this.searchRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.searchRef && !this.searchRef.current.contains(event.target)) {
      this.setState({
        searchTerm: '',
        products: [],
      })
    }
  }
  
  onChange = (event, result) => {
    const { name, value } = result || event.target;
    this.setState({
      searchTerm: value
    })
    if(value && value.trim().length > 0) {
      const results = products.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
      this.setState({
        products: results
      })
    }
    else {
      this.setState({
        products: []
      })
    }
  }

  itemSelected = (product) => {
    this.props.selectedProduct && this.props.selectedProduct(product)
    this.props.addToCart && this.props.addToCart(product)
    this.setState({
      searchTerm: '',
      products: [],
    })
  }

  render() {
    return (
      <div className='search-container' ref={ this.searchRef }>
        <div className="search-input-container form-group w-100 pb-0 mb-0">
          <input
            onChange={ this.onChange }
            className={ 'form border-radius-8 h-40px w-100 ' + (this.state.products.length > 0 ? 'on-focus' : '') + (this.props.shadow === false ? ' no-shadow' : '') }
            value={ this.state.searchTerm }
            type="text"
            placeholder="Scan barcode or search by product name"/>
          <button className='button button-orange'>
            <i
              style={{ fontSize: this.props.isHeader ? '14px' : '18px' }}
              className={ (this.props.icon ? this.props.icon : 'barcode') + ' icon'}
            ></i>
          </button>
        </div>
        {
          this.state.products.length > 0 &&
          <div className='search-result'>
            {
              this.state.products.map((product, i) => (
                <div
                  key={ 'SearchItem_' + i }
                  onClick={ () => { this.itemSelected(product) } }
                  className='result-item'
                >
                  { product.name }
                </div>
              ))
            }
          </div>
        }
      </div>
    );
  }
}