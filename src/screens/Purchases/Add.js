import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { supplier } from '../../fakedb/Data';
import UploadFile from '../../components/UploadFile';
import DatePicker from "react-datepicker";
import AddPurchase from '../../components/AddPurchase';
import moment from 'moment';

const statuses = [
  { key: 'Received', value: 'Received', text: 'Received' },
  { key: 'Pending', value: 'Pending', text: 'Pending' },
  { key: 'Ordered', value: 'Ordered', text: 'Ordered' },
]

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isViewOnly: false,
      
      purchaseDate: new Date(),
      reference: '',
      status: '',
      supplier: '',
      file: '',
      products: [],
      note: '',

      subTotal: 0,
      totalQty: 0,
      totalPrice: 0,
    };
  }

  componentDidMount = () => {
    if(this.props.location.state) {
      this.setState({
        purchaseDate: new Date(this.props.location.state.purchaseDate),
        reference: this.props.location.state.reference,
        status: this.props.location.state.status,
        supplier: this.props.location.state.supplier,
        file: this.props.location.state.file,
        products: this.props.location.state.products,
        note: this.props.location.state.note,

        isViewOnly: true
      }, () => {
        this.calculate();
      })
    }
  }

  onChange = (event, result) => {
    const { name, value } = result || event.target;
    this.setState({ [name]: value });
  };

  onChangeProd = (stateName, propName, index, event) => {
    let arr = this.state[stateName];
    arr[index][propName] = event.target.value;
    this.setState({ [stateName]: arr });
    this.calculate();
  }

  calculate = () => {
    let totalQty = this.state.products.reduce(function(prev, current) { return prev + (+current.qty) }, 0);
    let subTotal = this.state.products.reduce(function(prev, current) { return prev + (+current.price) }, 0);

    let totalPrice = 0;
    this.state.products.map(item => {
      totalPrice += (item.qty * item.price) + (item.qty * item.price * (item.vat / 100))
    })

    this.setState({
      totalQty,
      subTotal,
      totalPrice
    })
  }

  back = () => {
    this.props.history.push('/');
  }

  proceed = () => {
    const purchase = {
      purchaseDate: this.state.purchaseDate,
      reference: this.state.reference,
      status: this.state.status,
      supplier: this.state.supplier,
      file: this.state.file,
      products: this.state.products,
      note: this.state.note,
    }
    console.log(purchase)
  }

  selectedProduct = (event) => {
    const addedProducts = this.state.products;
    let find = addedProducts.find(item => item.id === event.id);
    if(find) {
      find.qty++;
    }
    else addedProducts.push(event);
    this.setState({
      products: addedProducts
    })
    this.calculate();
  }

  deleteProduct = (id) => {
    const all = this.state.products;
    this.setState({
      products: all.filter(item => item.id !== id)
    }, () => {
      this.calculate();
    })
  }

  render() {
    return (
      <div className='col-md-12'>
        <div className='row content-body content-body-w-nav bg-transparent p-0'>
          <div className='col-md-12'>
            <div className='content-card p-4'>
              <p className='title'>
                { this.state.isViewOnly ? "Purchase Details" : "New Purchase" }
              </p>
              <div className='mt-4 row'>
                <div className='col-md-12'>
                  <div className='row'>

                    <div className='form-group col-md-4'>
                      <label>Date</label>
                      <DatePicker
                        disabled={ this.state.isViewOnly }
                        name='purchaseDate'
                        className='form'
                        dateFormat="dd-MM-yyyy"
                        selected={ this.state.purchaseDate }
                        onChange={ date => this.setState({ purchaseDate: date }) }
                      />
                    </div>
                    
                    <div className='form-group col-md-4'>
                      <label>Reference #</label>
                      <input
                        disabled={ this.state.isViewOnly }
                        type='text'
                        className='form'
                        onChange={ this.onChange }
                        placeholder='Enter ref/ invoice number'
                        name='reference'
                        value={ this.state.reference }
                      />
                    </div>
                    
                    <div className='form-group col-md-4'>
                      <label>Status</label>
                      <Dropdown
                        disabled={ this.state.isViewOnly }
                        name="status"
                        onChange={ this.onChange }
                        placeholder='Select'
                        fluid
                        selection
                        options={ statuses }
                        value={ this.state.status }
                      />
                    </div>

                    <div className='form-group col-md-4'>
                      <label>Supplier</label>
                      <Dropdown
                        disabled={ this.state.isViewOnly }
                        search
                        name="supplier"
                        onChange={ this.onChange }
                        placeholder='Select'
                        fluid
                        selection
                        options={ supplier }
                        value={ this.state.supplier }
                      />
                    </div>

                    <div className='form-group col-md-4'>
                      <label>Attachment</label>
                      {
                        !this.state.isViewOnly &&
                        <UploadFile/>
                      }
                    </div>

                    <div className='col-md-12 mb-3 mt-3'>

                      {
                        !this.state.isViewOnly &&
                        <>
                          <div className='form-group pb-0 m-0'>
                            <label>Add Product</label>
                          </div>
                          <AddPurchase selectedProduct={ this.selectedProduct } />
                        </>
                      }

                      <div className={ 'table-sticky reset-height max-height-300px ' + (this.state.isViewOnly ? 'mt-1' : 'mt-3') } >
                        <table className='table w-100 table-dense table-v-center'>
                          <thead>
                            <tr>
                              <th width="20">SN.</th>
                              <th>Name</th>
                              <th>Type</th>
                              <th>Brand</th>
                              <th>Price</th>
                              <th>Qty</th>
                              <th>VAT</th>
                              <th>Total</th>
                              <th width="20">
                                <i className='material-icons'>keyboard_control</i>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.state.products.map((product, i) => (
                                <tr key={ 'Prod_' + i }>
                                  <td>{ i + 1 }</td>
                                  <td>{ product.name }</td>
                                  <td>{ product.type }</td>
                                  <td>{ product.brand }</td>
                                  <td>
                                    <input
                                      disabled={ this.state.isViewOnly }
                                      className='form width-small text-right m-0 h-35px'
                                      type='text'
                                      onChange={ (e) => { this.onChangeProd('products', 'price', i, e) } }
                                      value={ product.price }/>
                                  </td>
                                  <td>
                                    <input
                                      disabled={ this.state.isViewOnly }
                                      className='form width-small text-right m-0 h-35px'
                                      type='text'
                                      onChange={ (e) => { this.onChangeProd('products', 'qty', i, e) } }
                                      value={ product.qty }/>
                                  </td>
                                  <td>
                                    <input
                                      disabled={ this.state.isViewOnly }
                                      className='form width-small text-right m-0 h-35px'
                                      type='text'
                                      onChange={ (e) => { this.onChangeProd('products', 'vat', i, e) } }
                                      value={ product.vat }/>
                                    &nbsp;%
                                  </td>
                                  <td>
                                    { (product.qty * product.price) + (product.qty * product.price * (product.vat / 100)) }
                                  </td>
                                  <td>
                                    {
                                      !this.state.isViewOnly &&
                                      <i
                                        onClick={ () => { this.deleteProduct(product.id) } }
                                        className='material-icons'>
                                        close
                                      </i>
                                    }
                                  </td>
                                </tr>
                              ))
                            }
                            <tr className='footer-row'>
                              <td className='text-right' colSpan="4">Total</td>
                              <td className=''>{ this.state.subTotal }</td>
                              <td>{ this.state.totalQty }</td>
                              <td></td>
                              <td colSpan='2'>{ this.state.totalPrice }</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className='form-group col-md-12 mt-2'>
                      <label>Note</label>
                      <textarea
                        disabled={ this.state.isViewOnly }
                        className='form'
                        placeholder={ this.state.isViewOnly ? '' : '(Optional)'}
                      >
                      </textarea>
                    </div>

                    {
                      !this.state.isViewOnly &&
                      <div className='form-group col-md-12 pt-2'>
                        <button className='button button-green' onClick={ () => { this.proceed() } }>
                          <i className='material-icons'>add</i>&nbsp;Save Purchase
                        </button>
                      </div>
                    }

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