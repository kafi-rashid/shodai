import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { products } from '../../fakedb/Data';

const unit = [
  { key: '%', value: '%', text: '%' },
  { key: '৳', value: '৳', text: '৳' },
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
    const allProducts = products;
    allProducts.map(item => {
      item['temp'] = 'BDT'; 
    })
    this.setState({
      products: allProducts
    })
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
                Set Profit
              </p>
              <div className='mt-4 row'>
                <div className='col-md-12'>

                    <div className='table-sticky reset-height'>
                      <table className='table w-100 table-dense table-v-center'>
                        <thead>
                          <tr>
                            <th width="20">SN.</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Profit</th>
                            <th>Sale Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.products.map((product, i) => (
                              <tr key={ 'Prod_' + i }>
                                <td>{ i + 1 }</td>
                                <td>{ product.name }</td>
                                <td>{ product.brand }</td>
                                <td>
                                  <input
                                    className='form width-small text-right m-0 '
                                    type='text'
                                    onChange={ (e) => { this.onChangeProd('products', 'price', i, e) } }
                                    value={ product.price }/>
                                </td>
                                <td>
                                  <div className='d-flex '>
                                    <input
                                      className='form width-small text-right m-0 '
                                      type='text'
                                      onChange={ (e) => { this.onChangeProd('products', 'vat', i, e) } }
                                      value={ product.vat }/>
                                    <Dropdown
                                      className='width-xs m-0 ml-2'
                                      name="status"
                                      onChange={ (e) => { this.onChangeProd('products', 'unit', i, e) } }
                                      fluid
                                      selection
                                      options={ unit }
                                      value={ product.unit }
                                    />
                                  </div>
                                </td>
                                <td className='text-right'>
                                  { (product.price + product.price * (product.vat / 100)).toFixed(2) }
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
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