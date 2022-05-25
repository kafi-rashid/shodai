import React from 'react';
import Product from '../components/Product';
import Customers from '../components/Customers';
import { products, categories } from '../fakedb/Data';
import { Modal } from 'semantic-ui-react'
import CustomerGroup from '../components/CustomerGroup';

export default class POS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      category: '',
      products: products,

      isSearching: false,

      // order items
      orderItems: localStorage.getItem('orderItems') ? JSON.parse(localStorage.getItem('orderItems')) : [],
      subTotal: 0,
      totalQty: 0,
      totalPrice: 0,

      paymentMethod: 'Cash',
      scrollLeft: 0,
      scrollRight: 100,

      // modal
      open: false,

      // customer
      customer: undefined,

      // checkout
      payable: 0,
      cashGiven: 0,
      toReturn: 0,
      discount: '',

      mfs: '',
    };
  }

  componentDidMount = () => {
    document.getElementById('navigator') && document.getElementById('navigator').addEventListener('scroll', this.onScroll);
    document.getElementById('navigator') && document.getElementById('navigator').addEventListener('wheel', this.onMouseWheel);
    document.getElementById('order-payment').addEventListener('wheel', this.onMouseWheel2);
    this.calculate()
  }

  componentWillUnmount = () => {
    document.getElementById('navigator') && document.getElementById('navigator').removeEventListener('scroll', this.onScroll);
    document.getElementById('navigator') && document.getElementById('navigator').removeEventListener('wheel', this.onMouseWheel);
    document.getElementById('order-payment').removeEventListener('wheel', this.onMouseWheel2);
  }

  componentDidUpdate() {
    document.getElementById('navigator') && document.getElementById('navigator').addEventListener('scroll', this.onScroll);
    document.getElementById('navigator') && document.getElementById('navigator').addEventListener('wheel', this.onMouseWheel);
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function(event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }

  storeOrderItems = () => {
    const orderItems = this.state.orderItems;
    localStorage.setItem('orderItems', JSON.stringify(orderItems));
  }

  searching = (event) => {
    // if(event) {
      this.setState({
        isSearching: event
      })
    // }
    // else {
    //   setTimeout(() => {
    //     this.setState({
    //       isSearching: event
    //     })
    //   }, 1000);
    // }
  }

  onScroll = (event) => {
    this.setState({
      scrollLeft: event.target.scrollLeft,
      scrollRight: event.target.scrollWidth - event.target.offsetWidth
    })
  }

  onMouseWheel(event) {
    event.preventDefault();
    const elem = document.getElementById('navigator');
    if(elem) {
      elem.scrollBy({
        left: event.deltaY < 0 ? -50 : 50,
      });
    }
  }

  onMouseWheel2(event) {
    event.preventDefault();
    const elem = document.getElementById('order-payment');
    if(elem) {
      elem.scrollBy({
        left: event.deltaY < 0 ? -50 : 50,
      });
    }
  }

  onChange = (event, result) => {
    const { name, value } = result || event.target;
    this.setState({ [name]: value });
  }

  onChangeQty = (product, event) => {
    const value = event.target.value;
    const orderItems = this.state.orderItems;
    orderItems.map(item => {
      if(item.id === product.id) item.qty = value
    })
    this.setState({ orderItems }, () => {
      this.calculate();
    })
  }

  inc = (product) => {
    const orderItems = this.state.orderItems;
    orderItems.map(item => {
      if(item.id === product.id) item.qty = parseInt(item.qty) + 1;
    })
    this.setState({ orderItems }, () => {
      this.calculate();
    })
  }

  dec = (product) => {
    const orderItems = this.state.orderItems;
    orderItems.map(item => {
      if(item.id === product.id && item.qty > 1) item.qty = parseInt(item.qty) - 1;
    })
    this.setState({ orderItems }, () => {
      this.calculate();
    })
  }

  deleteProduct = (id) => {
    const orderItems = this.state.orderItems;
    this.setState({
      orderItems: orderItems.filter(item => item.id !== id)
    }, () => {
      this.calculate();
    })
  }

  calculate = () => {
    let totalQty = this.state.orderItems.reduce(function(prev, current) { return prev + (+current.qty) }, 0);
    let subTotal = this.state.orderItems.reduce(function(prev, current) { return prev + (+current.price) }, 0);
    let totalPrice = 0;
    this.state.orderItems.map(item => {
      totalPrice += (item.qty * item.price)
    })
    this.setState({
      totalQty,
      subTotal,
      totalPrice
    })
    this.storeOrderItems();
  }

  setCustomer = (event) => {
    this.setState({
      customer: event
    })
  }

  setReturnAmount = (event, result) => {
    const { name, value } = result || event.target;
    this.setState({
      [name]: value,
      toReturn: value - this.state.payable
    });
  };

  resetForm = () => {
    this.setState({
      payable: 0,
      cashGiven: 0,
      toReturn: 0,
      mfs: ''
    })
  }
  
  setOpen = (state) => {
    this.resetForm();
    this.setState({
      open: state,
      payable: (this.state.orderItems.reduce(function(prev, current) { return prev + (+current.price * current.qty) }, 0) + this.state.orderItems.reduce(function(prev, current) { return prev + (+current.price * current.qty) }, 0) * 0.05).toFixed(2),
      toReturn: this.state.paymentMethod === 'Credit' ? (this.state.cashGiven - this.state.payable) : 0
    })
  }

  getIcon = (name) => {
    if(!name || name === '') return 'grocery.png';
    else return name.toLowerCase().replace(/ /g, '_') + '.png'; 
  }

  getProducts = (category) => {
    const cat = (category === 'All Items') ? '' : category;
    this.setState({
      category: cat,
      products: products.filter(item => item.category.includes(cat))
    })
  }

  getIcon = (category) => {
    const find = categories.find(cat => cat.name === category);
    if(find) return find.icon + '.png';
    else return 'grocery.png';
  }

  addToCart = (event) => {
    const orderItems = JSON.parse(JSON.stringify(this.state.orderItems));
    const isExist = orderItems.find(item => item.id === event.id);
    if(!isExist) orderItems.push(event);
    else {
      orderItems.forEach(item => {
        if(item.id === event.id) item.qty = parseInt(item.qty) + parseInt(event.qty)
      });
    }
    this.setState({
      orderItems: orderItems
    }, () => {
      var element = document.getElementById('OI_'+event.id);
      element && element.classList.add('active');
      element && element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        element && element.classList.remove('active')
      }, 1000);
      this.calculate()
      this.setState({
        isSearching: false
      })
    })
  }

  manageOrderItem = (action, id) => {
    if(action === 'd') {
      var orderItems = this.state.orderItems;
      orderItems = orderItems.filter(item => item.id != id);
      this.setState({
        orderItems
      })
    }
  }

  handleKeyPress = (event) => {
    if (event.key == '-') {
      this.props.manageOrderItem('d', event.target.getAttribute('prod-id'));
    }
  };

  render() {
    return (
      <div className='d-flex flex-grow-1'>
        <div className='flex-grow-1 mr-20px'>

          {
            this.state.isSearching &&
            <div className='d-flex' id='navigator-container'>
              <div className='navigate navigate-left' style={{ visibility: this.state.scrollLeft > 60 ? 'unset' : 'hidden' }}>
                <i className='material-icons'>chevron_left</i>
              </div>
              <div className='navigator scroll-horiz' id='navigator' onScroll={ this.onScroll }>
                <button
                  onClick={ () => { this.setState({ isSearching: false }) } }
                  style={{ marginRight: 0, minWidth: 'unset', padding: '1px', marginRight: '10px' }}
                >
                  <div style={{ marginRight: 0, backgroundColor: 'red' }}>
                    <i className='material-icons color-white'>close</i>
                  </div>
                </button>
                {
                  categories.map((item, i) => (
                    <button
                      key={ 'CAT_' + item.id }
                      onClick={ () => { this.getProducts(item.name) } }
                      className={ (this.state.category === '' && item.name === 'All Items') ? 'active' : item.name === this.state.category ? 'active' : '' }
                      style={{ marginRight: i === categories.length - 1 ? 0 : 10 }}
                    >
                      <div>
                        <img alt={ item.name } src={ require('../assets/img/cat/'+item.icon+'.png') }/>
                      </div>
                      { item.name }
                    </button>
                  ))
                }
              </div>
              <div className='navigate navigate-right' style={{ visibility: this.state.scrollLeft + 60 < this.state.scrollRight ? 'unset' : 'hidden' }}>
                <i className='material-icons'>chevron_right</i>
              </div>
            </div>
          }

          <div className={ 'content-body bg-transparent border-radius-0 p-0' + (this.state.isSearching ? ' content-body-w-nav pos-products' : '') }>
            {
              this.state.isSearching ?
              this.state.products.map((product, i) => (
                <Product 
                  addToCart={ this.addToCart }
                  // onDoubleClick={ this.addToCart }
                  // onClick={ () => { this.itemSelected(product) } } 
                  key={ 'P_' + product.id }
                  product={ product }
                />
              ))
              :
              <div className='table-sticky content-body-max-height'>
                <table className='table table-v-center' style={{ tableLayout: 'fixed' }}>
                  <thead>
                    <tr>
                      <th width="20">SN.</th>
                      <th>Name</th>
                      <th width="100" className='text-right'>Price</th>
                      <th width="110" className='text-center'>Qty</th>
                      <th width="100" className='text-right'>Total</th>
                      <th width="50"><i className='material-icons'>keyboard_control</i></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.orderItems.map((product, i) => (
                        <tr key={ 'Prod_' + i } id={ 'OI_' + product.id }>
                          <td>{ i + 1 }</td>
                          <td className='font-weight-bold text-overflow-hidden'>
                            <img
                              alt={ product.category }
                              src={ require('../assets/img/cat/'+this.getIcon(product.category) ) }
                              style={{ width: 20, marginRight: 10 }} />
                            { product.name }
                          </td>
                          <td className='text-right'>
                            ৳&nbsp;{ (product.price).toFixed(2) }
                          </td>
                          <td className='text-center'>
                            <div className='order-item-qty'>
                              <button className='dec' onClick={ () => { this.dec(product) } }>-</button>
                              <input type='text' onChange={ (e) => { this.onChangeQty(product, e) } } value={ product.qty } />
                              <button className='inc' onClick={ () => { this.inc(product) } }>+</button>
                            </div>
                          </td>
                          <td className='text-right'>
                            ৳&nbsp;{ (product.qty * product.price).toFixed(2) }
                          </td>
                          <td>
                            <i
                              onClick={ () => { this.deleteProduct(product.id) } }
                              className='material-icons'>
                              close
                            </i>
                          </td>
                        </tr>
                      ))
                    }
                    {
                      this.state.orderItems.length === 0 &&
                      <tr className='no-hover'>
                        <td className='text-center' colSpan={ 6 }>
                          <div className='p-5 d-flex justify-content-center align-items-center'>
                            <img src={ require('../assets/img/misc/package.png') } className="empty-cart mr-4" alt="Cart is empty" />
                            <p className='text-left'>Cart is empty!<br/>Search for some products or scan barcode.</p>
                          </div>
                        </td>
                      </tr>
                    }
                  </tbody>
                  {
                    this.state.orderItems.length > 0 &&
                    <tfoot>
                      <tr>
                        <th colSpan={ 3 }><p className='font-small font-weight-bold'>Total</p></th>
                        <th className='text-center'>{ this.state.totalQty }</th>
                        <th className='text-right'>৳&nbsp;{ (this.state.totalPrice).toFixed(2) }</th>
                        <th className='text-right'></th>
                      </tr>
                    </tfoot>
                  }
                  </table>
              </div>
            }
          </div>
        </div>

        <div className='content-body orders-container p-0'>
          
          <div className='orders-header'>
            <p className='title'>Order & Payment</p>
          </div>

          <div className='orders-items' id='orders-items'>
            <Customers setCustomer={ this.setCustomer } />
            <CustomerGroup/>
            <div className='form-group '>
              <input
                type='number'
                className='form'
                onChange={ this.onChange }
                placeholder='Discount'
                name='discount'
                value={ this.state.discount }
              />
            </div>
          </div>

          <div className='order-summary'>
            <p>
              <span>Sub Total</span>
              <span>৳ { (this.state.totalPrice).toFixed(2) }</span>
            </p>
            <p>
              <span>VAT</span>
              <span>৳ { (this.state.totalQty * 0.05).toFixed(2) }</span>
            </p>
            <p className='order-total'>
              <span>Total</span>
              <span>৳ { (this.state.totalPrice + (this.state.totalPrice * 0.05)).toFixed(2) }</span>
            </p>
            <p>
              <span>Discount</span>
              <span>৳ { (parseFloat(this.state.discount) || 0).toFixed(2) }</span>
            </p>
            <p className='order-total'>
              <span>Net Payable</span>
              <span>৳ { (this.state.totalPrice + (this.state.totalPrice * 0.05) - (parseFloat(this.state.discount) || 0)).toFixed(2) }</span>
            </p>
          </div>

          <div className='order-payment scroll-horiz' id='order-payment'>
            <div onClick={ () => { this.setState({ paymentMethod: 'Cash' }) } } className={ 'payment-method' + (this.state.paymentMethod === 'Cash' ? ' active' : '') }>
              <i className='material-icons'>folder_open</i>
              <p>Cash</p>
            </div>
            <div onClick={ () => { this.setState({ paymentMethod: 'E-Wallet' }) } } className={ 'payment-method' + (this.state.paymentMethod === 'E-Wallet' ? ' active' : '') }>
              <i className='material-icons'>fiber_smart_record</i>
              <p>E-Wallet</p>
            </div>
            <div onClick={ () => { this.setState({ paymentMethod: 'Card' }) } } className={ 'payment-method' + (this.state.paymentMethod === 'Card' ? ' active' : '') }>
              <i className='material-icons'>credit_card</i>
              <p>Card</p>
            </div>
            {
              this.state.customer &&
              <div onClick={ () => { this.setState({ paymentMethod: 'Credit' }) } } className={ 'payment-method' + (this.state.paymentMethod === 'Credit' ? ' active' : '') }>
                <i className='material-icons'>wallet_membership</i>
                <p>Credit</p>
              </div>
            }
          </div>

          <div className='order-checkout'>
            <button
              className='button button-green'
              onClick={ () => this.setOpen(true) }
            >
              Confirm Order
            </button>
          </div>
          
        </div>

        <Modal
          open={ this.state.open }
          onClose={ () => this.setOpen(false) }
          onOpen={ () => this.setOpen(true) }
          className='modal-large'
        >
          <Modal.Header>
            Checkout
          </Modal.Header>

          <Modal.Content>
            <div className='col-md-12 p-0'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='table-sticky reset-height'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>No. of Products</th>
                          <th>Total Units</th>
                          <th>Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{ this.state.orderItems.length }</td>
                          <td>
                            { (this.state.orderItems.reduce(function(prev, current) { return prev + current.qty }, 0)) }
                          </td>
                          <td>
                            ৳ { this.state.payable }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className='col-md-12 pt-4'>
                  <div className='row'>
                    <div className='form-group col-md-4'>
                      <label>Payment Method</label>
                      <input
                        readOnly
                        type='text'
                        className='form'
                        onChange={ this.onChange }
                        placeholder='Name'
                        name='productName'
                        value={ this.state.paymentMethod }
                      />
                    </div>
                    {
                      this.state.paymentMethod === 'Cash' &&
                      <>
                        <div className='form-group col-md-4'>
                          <label>Cash Given</label>
                          <input
                            type='number'
                            name='cashGiven'
                            className='form'
                            onChange={ this.setReturnAmount }
                            placeholder='Enter amount'
                            value={ this.state.cashGiven }
                          />
                        </div>
                        <div className='form-group col-md-4'>
                          <label className={ this.state.toReturn < 0 ? 'color-red' : '' }>Return</label>
                          <input
                            type='text'
                            name='toReturn'
                            className={ this.state.toReturn < 0 ? 'form color-red' : 'form' }
                            onChange={ this.onChange }
                            placeholder=''
                            value={ this.state.toReturn }
                          />
                        </div>
                      </>
                    }

                    {
                      this.state.paymentMethod === 'E-Wallet' &&
                      <div className='form-group col-md-8'>
                        <label>MFS Provider *</label>
                        {/* <Dropdown
                          name="mfs"
                          onChange={ this.onChange }
                          placeholder='Select'
                          fluid
                          selection
                          options={ mfs }
                          value={ this.state.productCategory }
                        /> */}
                        <button className={ 'mfs' + (this.state.mfs === 'bkash' ? ' active' : '') } onClick={ () => { this.setState({ mfs: 'bkash' }) } }>
                          <img src={ require('../assets/img/mfs/bkash.png') } />
                        </button>
                        <button className={ 'mfs' + (this.state.mfs === 'rocket' ? ' active' : '') } onClick={ () => { this.setState({ mfs: 'rocket' }) } }>
                          <img src={ require('../assets/img/mfs/rocket.png') } />
                        </button>
                        <button className={ 'mfs' + (this.state.mfs === 'nagad' ? ' active' : '') } onClick={ () => { this.setState({ mfs: 'nagad' }) } }>
                          <img src={ require('../assets/img/mfs/nagad.png') } />
                        </button>
                        <button className={ 'mfs' + (this.state.mfs === 'upay' ? ' active' : '') } onClick={ () => { this.setState({ mfs: 'upay' }) } }>
                          <img src={ require('../assets/img/mfs/upay.png') } />
                        </button>
                        <button className={ 'mfs' + (this.state.mfs === 'surecash' ? ' active' : '') } onClick={ () => { this.setState({ mfs: 'surecash' }) } }>
                          <img src={ require('../assets/img/mfs/surecash.png') } />
                        </button>
                      </div>
                    }

                    {
                      (this.state.paymentMethod === 'E-Wallet' || this.state.paymentMethod === 'Card') &&
                      <div className={ 'form-group col-md-'+(this.state.paymentMethod === 'E-Wallet' ? '4' : '8') }>
                        <label>Reference *</label>
                        <input
                          type='text'
                          className='form'
                          onChange={ this.onChange }
                          placeholder='Enter Ref. # or Trans. ID'
                          name='productName'
                          // value={ this.state.paymentMethod }
                        />
                      </div>
                    }

                    {
                      this.state.paymentMethod === 'Credit' &&
                      <>
                        <div className='form-group col-md-4'>
                          <label>Customer's Name</label>
                          <input
                            readOnly
                            type='text'
                            className='form'
                            placeholder='Name'
                            value={ this.state.customer.name }
                          />
                        </div>
                        <div className='form-group col-md-4'>
                          <label>Customer ID</label>
                          <input
                            readOnly
                            type='text'
                            className='form'
                            placeholder='Name'
                            value={ this.state.customer.customerId }
                          />
                        </div>
                        <div className='form-group col-md-4'>
                          <label>Paid</label>
                          <input
                            type='number'
                            name='cashGiven'
                            className='form'
                            onChange={ this.setReturnAmount }
                            placeholder='Enter amount'
                            value={ this.state.cashGiven }
                          />
                        </div>
                        <div className='form-group col-md-4'>
                          <label className={ this.state.toReturn < 0 ? 'color-red' : '' }>Due</label>
                          <input
                            type='text'
                            name='toReturn'
                            className={ this.state.toReturn < 0 ? 'form color-red' : 'form' }
                            onChange={ this.onChange }
                            placeholder=''
                            value={ this.state.toReturn }
                          />
                        </div>
                      </>
                    }

                    <div className='form-group mb-0 col-md-12'>
                      <label>Note</label>
                      <textarea
                        className='form'
                        onChange={ this.onChange }
                        placeholder='(Optional)'
                        name='productName'
                        // value={ this.state.paymentMethod }
                      >
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Content>

          <Modal.Actions>
            <div className='d-flex justify-content-end'>
              <button className='button button-outline mr-3' onClick={ () => { this.setOpen(false) } }>
                <i className='material-icons'>close</i>&nbsp;Cancel
              </button>
              <button className='button button-green' onClick={ () => { this.proceed() } }>
                <i className='material-icons'>check</i>&nbsp;Confirm Sale
              </button>
            </div>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}