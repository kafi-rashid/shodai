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
      userType: '',
    };
  }

  componentDidMount = () => {
    if(this.props.location.state) {
      this.setState({
        username: this.props.location.state.username,
        name: this.props.location.state.name,
        userType: this.props.location.state.userType,
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
              <p className='title'>User Details</p>
              <div className='mt-4 row'>
                <div className='col-md-4'>
                  <div className='row'>

                    <div className='form-group col-md-12'>
                      <label>User Type</label>
                      <Dropdown
                        name="userType"
                        onChange={ this.onChange }
                        placeholder='Select'
                        fluid
                        selection
                        options={[
                          { key: 'Admin', value: 'Admin', text: 'Admin' },
                          { key: 'Manager', value: 'Manager', text: 'Manager' },
                          { key: 'Salesperson', value: 'Salesperson', text: 'Salesperson' },
                        ]}
                        value={ this.state.userType }
                      />
                    </div>
                    
                    <div className='form-group col-md-12'>
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
                    
                    <div className='form-group col-md-12'>
                      <label>Username</label>
                      <input
                        type='text'
                        className='form'
                        onChange={ this.onChange }
                        placeholder='Username'
                        name='username'
                        value={ this.state.username }
                      />
                    </div>

                    <div className='form-group col-md-12 pt-2'>
                      <button className='button button-green' onClick={ () => { this.proceed() } }>
                        <i className='material-icons'>add</i>&nbsp;Save User
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