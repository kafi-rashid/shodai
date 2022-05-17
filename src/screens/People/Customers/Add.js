import React from 'react';
// import 'semantic-ui-css/semantic.css';
import { Form, Dropdown } from 'semantic-ui-react';
import { categories, productTypes, brands, units, purchaseUnits, saleUnits } from '../../../fakedb/Data';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',

      name: '',
      customerId: '',
      contactNumber: '',
      line1: '',
      line2: '',
      thana: '',
      district: '',
    };
  }

  componentDidMount = () => {
    if(this.props.location.state) {
      this.setState({
        name: this.props.location.state.name,
        customerId: this.props.location.state.customerId,
        contactNumber: this.props.location.state.contactNumber,
        line1: this.props.location.state.address.line1,
        line2: this.props.location.state.address.line2,
        thana: this.props.location.state.address.thana,
        district: this.props.location.state.address.district,
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
    // const product = {
    //   productType: this.state.productType,
    //   productCategory: this.state.productCategory,
    //   productName: this.state.productName,
    //   productBrand: this.state.productBrand,
    //   productCode: this.state.productCode,
    //   productPurchaseUnit: this.state.productPurchaseUnit,
    //   productSaleUnit: this.state.productSaleUnit,
    //   productUnit: this.state.productUnit,
    //   productAlertQty: this.state.productAlertQty,
    // }
    // console.log(product)
  }

  render() {
    return (
      <div className='col-md-12'>
        <div className='row content-body content-body-w-nav bg-transparent p-0'>
          <div className='col-md-12'>
            <div className='content-card p-4'>
              <p className='title'>Customer Details</p>
              <div className='mt-4 row'>
                <div className='col-md-8'>
                  <div className='row'>

                    <div className='form-group col-md-6'>
                      <label>Full Name</label>
                      <input
                        type='text'
                        className='form'
                        onChange={ this.onChange }
                        placeholder='Enter full name'
                        name='name'
                        value={ this.state.name }
                      />
                    </div>
                    
                    <div className='form-group col-md-6'>
                      <label>Customer ID</label>
                      <input
                        type='text'
                        className='form'
                        onChange={ this.onChange }
                        placeholder='Customer ID'
                        name='customerId'
                        value={ this.state.customerId }
                      />
                    </div>
                    
                    <div className='form-group col-md-6'>
                      <label>Contact No.</label>
                      <input
                        type='text'
                        className='form'
                        onChange={ this.onChange }
                        placeholder='+880'
                        name='contactNumber'
                        value={ this.state.contactNumber }
                      />
                    </div>
                    
                    <div className='form-group col-md-6'>
                      <label>Address Line 1</label>
                      <input
                        type='text'
                        className='form'
                        onChange={ this.onChange }
                        placeholder='Address Line 1'
                        name='line1'
                        value={ this.state.line1 }
                      />
                    </div>
                    
                    <div className='form-group col-md-6'>
                      <label>Address Line 2</label>
                      <input
                        type='text'
                        className='form'
                        onChange={ this.onChange }
                        placeholder='Address Line 2'
                        name='line2'
                        value={ this.state.line2 }
                      />
                    </div>
                    
                    <div className='form-group col-md-6'>
                      <label>Thana/ Ward</label>
                      <input
                        type='text'
                        className='form'
                        onChange={ this.onChange }
                        placeholder='Write here'
                        name='thana'
                        value={ this.state.thana }
                      />
                    </div>
                    
                    <div className='form-group col-md-6'>
                      <label>Zone</label>
                      <input
                        type='text'
                        className='form'
                        onChange={ this.onChange }
                        placeholder='Write here'
                        name='district'
                        value={ this.state.district }
                      />
                    </div>
                    
                    <div className='form-group col-md-12 pt-2'>
                      <button className='button button-green' onClick={ () => { this.proceed() } }>
                        <i className='material-icons'>add</i>&nbsp;Save Customer
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}