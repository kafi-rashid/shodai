import React from 'react';
// import 'semantic-ui-css/semantic.css';
import { Form, Dropdown } from 'semantic-ui-react';
import { categories, productTypes, brands, units, purchaseUnits, saleUnits } from '../../fakedb/Data';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      categories: [],
      saleUnits: [],
      purchaseUnits: [],

      productType: '',
      productCategory: '',
      productName: '',
      productPrice: 0,
      productBrand: '',
      productCode: '',
      productPurchaseUnit: '',
      productSaleUnit: '',
      productUnit: '',
      productAlertQty: 0,
    };
  }

  componentDidMount = () => {
    const cat = [];
    categories.map(item => {
      cat.push({ key: item.name, text: item.name, value: item.name })
    })
    this.setState({
      categories: cat
    })
    if(this.props.location.state) {
      this.setState({
        productType: this.props.location.state.type,
        productCategory: this.props.location.state.category,
        productName: this.props.location.state.name,
        productPrice: this.props.location.state.price,
        productBrand: this.props.location.state.brand,
        // productCode: this.props.location.state.productCode,
        // productPurchaseUnit: this.props.location.state.productPurchaseUnit,
        // productSaleUnit: this.props.location.state.productSaleUnit,
        // productUnit: this.props.location.state.productUnit,
        productAlertQty: this.props.location.state.qty,
      })
    }
  }

  onChange = (event, result) => {
    const { name, value } = result || event.target;
    this.setState({ [name]: value });
  };

  back = () => {
    this.props.history.push('/');
  }

  proceed = () => {
    const product = {
      productType: this.state.productType,
      productCategory: this.state.productCategory,
      productName: this.state.productName,
      productBrand: this.state.productBrand,
      productCode: this.state.productCode,
      productPurchaseUnit: this.state.productPurchaseUnit,
      productSaleUnit: this.state.productSaleUnit,
      productUnit: this.state.productUnit,
      productAlertQty: this.state.productAlertQty,
    }
    console.log(product)
  }

  render() {
    return (
      <div className='col-md-12'>
        <div className='row content-body content-body-w-nav bg-transparent p-0'>
          <div className='col-md-12'>
            <div className='content-card p-4'>
              <p className='title'>Product Details</p>
              <div className='mt-4 row'>
                <div className='col-md-8'>
                  <div className='row'>

                    <div className='form-group col-md-6'>
                      <label>Product Type</label>
                      <Dropdown
                        name="productType"
                        onChange={ this.onChange }
                        placeholder='Select'
                        fluid
                        selection
                        options={ productTypes }
                        value={ this.state.productType }
                      />
                    </div>

                    <div className='form-group col-md-6'>
                      <label>Product Category</label>
                      <Dropdown
                        search
                        name="productCategory"
                        onChange={ this.onChange }
                        placeholder='Select'
                        fluid
                        selection
                        options={ this.state.categories }
                        value={ this.state.productCategory }
                      />
                    </div>
                    
                    <div className='form-group col-md-12'>
                      <label>Product Name</label>
                      <input
                        type='text'
                        className='form'
                        onChange={ this.onChange }
                        placeholder='Name'
                        name='productName'
                        value={ this.state.productName }
                      />
                    </div>
                    
                    {/* <div className='form-group col-md-4'>
                      <label>Product Price</label>
                      <input
                        type='number'
                        className='form'
                        onChange={ this.onChange }
                        placeholder='Price'
                        name='productPrice'
                        value={ this.state.productPrice }
                      />
                    </div> */}

                    <div className='form-group col-md-6'>
                      <label>Brand</label>
                      <Dropdown
                        search
                        name="productBrand"
                        onChange={ this.onChange }
                        placeholder='Select'
                        fluid
                        selection
                        options={ brands }
                        value={ this.state.productBrand }
                      />
                    </div>
                    
                    <div className='form-group col-md-6'>
                      <label>Product Code</label>
                      <input
                        type='text'
                        className='form'
                        onChange={ this.onChange }
                        placeholder='Write or scan'
                        name='productCode'
                        value={ this.state.productCode }
                      />
                    </div>

                    <div className='form-group col-md-6'>
                      <label>Unit</label>
                      <Dropdown
                        name="productUnit"
                        onChange={ this.onChange }
                        placeholder='Select'
                        fluid
                        selection
                        options={ units }
                        value={ this.state.productUnit }
                      />
                    </div>

                    <div className='form-group col-md-6'>
                      <label>Purchase Unit</label>
                      <Dropdown
                        disabled={ !this.state.productUnit }
                        name="productPurchaseUnit"
                        onChange={ this.onChange }
                        placeholder='Select'
                        fluid
                        selection
                        options={ purchaseUnits[this.state.productUnit] }
                        value={ this.state.productPurchaseUnit }
                      />
                    </div>

                    <div className='form-group col-md-6'>
                      <label>Sale Unit</label>
                      <Dropdown
                        disabled={ !this.state.productUnit }
                        name="productSaleUnit"
                        onChange={ this.onChange }
                        placeholder='Select'
                        fluid
                        selection
                        options={ saleUnits[this.state.productUnit] }
                        value={ this.state.productSaleUnit }
                      />
                    </div>

                    <div className='form-group col-md-6'>
                      <label>Alert Qty</label>
                      <input
                        type='number'
                        className='form'
                        onChange={ this.onChange }
                        placeholder='Qty'
                        name='productAlertQty'
                        value={ this.state.productAlertQty }
                      />
                    </div>

                    <div className='form-group col-md-12 pt-2'>
                      <button className='button button-green' onClick={ () => { this.proceed() } }>
                        <i className='material-icons'>add</i>&nbsp;{ this.props.location.state ? 'Save Product' : 'Add Product' }
                      </button>
                    </div>

                  </div>
                </div>
              </div>

              {/* <div className='row'>
                <div className='col-md-8'>
                  <hr className='mt-20px mb-30px'/>
                </div>
              </div> */}

              {/* <p className='title'>Supplier Details</p>
              <div className='mt-4 row'>
                <div className='col-md-8'>
                  <div className='row'>

                    <div className='form-group col-md-6'>
                      <label>Product Type</label>
                      <Dropdown
                        name="productType"
                        onChange={ this.onChange }
                        placeholder='Select'
                        fluid
                        selection
                        options={ productTypes }
                      />
                    </div>

                    <div className='form-group col-md-12 d-flex justify-content-center pt-3'>
                      <button className='button button-green' onClick={ () => { this.proceed() } }>
                        <i className='material-icons'>add</i>&nbsp;Add Product
                      </button>
                    </div>

                  </div>
                </div>
              </div> */}

            </div>
          </div>
        </div>
      </div>
    );
  }
}