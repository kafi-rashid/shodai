import React from 'react';
import { brands } from '../../fakedb/Data';
import { Divider, Modal, Checkbox } from 'semantic-ui-react'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      brands: brands,
      open: false,

      brandId: -1,
      brandName: '',
      brandIsActive: true
    };
  }
  

  setOpen = (state) => {
    this.setState({
      open: state
    })
    this.resetForm()
  }


  componentDidMount = () => {

  }

  onChange = (event, result) => {
    const { name, value } = result || event.target;
    this.setState({ [name]: value });
  };

  back = () => {
    this.props.history.push('/');
  }

  toggleStatus = (brand) => {
    const brands = this.state.brands;
    brands.map(cat => {
      if(cat.id === brand.id) cat.isActive = !cat.isActive
    })
    this.setState({ brands })
  }

  resetForm = () => {
    this.setState({
      brandId: -1,
      brandName: '',
      brandIsActive : true
    })
  }

  brandDetails = (brand) => {
    this.setOpen(true)
    this.setState({
      brandId: brand.id,
      brandName: brand.value,
      brandIsActive : brand.isActive
    })
  }

  proceed = () => {
    
  }

  render() {
    return (
      <div className='col-md-12'>


        <Modal
          open={ this.state.open }
          onClose={ () => this.setOpen(false) }
          onOpen={ () => this.setOpen(true) }
        >
          <Modal.Header>
            Add/ Update Brand
          </Modal.Header>

          <Modal.Content>
            <div className='col-md-4 p-0'>
              <div className='row'>
                <div className='form-group col-md-12'>
                  <label>Brand Name</label>
                  <input
                    type='text'
                    className='form'
                    onChange={ this.onChange }
                    placeholder='Ex: Novelty'
                    name='brandName'
                    value={ this.state.brandName }
                  />
                </div>

                <div className='form-group col-md-12'>
                  <Checkbox
                    name="brandIsActive"
                    checked={ this.state.brandIsActive }
                    onChange={ this.onChange }
                    label='Is active'
                  />
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
                <i className='material-icons'>add</i>&nbsp;Save Brand
              </button>
            </div>
          </Modal.Actions>
        </Modal>


        <div className='content-body content-body-w-nav'>
          
          {
            this.state.brands.filter(brand => brand.isActive).length > 0 &&
            <div>
              <p className='title'>Brands</p>
              <div className='categories mt-4 mb-4'>
                {
                  this.state.brands.filter(brand => brand.isActive).sort((a, b) => a.value.localeCompare(b.value)).map((brand, i) => (
                    <div key={ 'Cat_' + i } onClick={ () => { this.brandDetails(brand) } } className="category">
                      <i className='material-icons'>check</i>
                      <p>{ brand.value }</p>
                    </div>
                  ))
                }
              </div>
            </div>
          }
  
          {
            this.state.brands.filter(brand => !brand.isActive).length > 0 &&
            <div>
              <p className='title mt-25px mb-4'>Inactive Brands</p>
              <div className='categories pb-2'>
                {
                  this.state.brands.filter(brand => !brand.isActive).sort((a, b) => a.value.localeCompare(b.value)).map((brand, i) => (
                    <div key={ 'Cat_' + i } onClick={ () => { this.brandDetails(brand) } } className="category category-inactive">
                      <i className='material-icons'>block</i>
                      <p>{ brand.value }</p>
                    </div>
                  ))
                }
              </div>
            </div>
          }

          <Divider horizontal>
            Or
          </Divider>

          <div className='row'>
            <div className='col-md-12 mt-4'>
              <button className='button button-green' onClick={ () => { this.setOpen(true) } }>
                <i className='material-icons'>add</i>&nbsp;Add New Brand
              </button>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}