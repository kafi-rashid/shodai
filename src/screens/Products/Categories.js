import React from 'react';
import { categories } from '../../fakedb/Data';
import { Divider, Modal, Checkbox, Dropdown } from 'semantic-ui-react'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      categories: categories,
      open: false,

      categoryId: -1,
      categoryName: '',
      categoryCode: '',
      parentCategory: '',
      categoryIsActive: true
    };
  }
  
  setOpen = (state) => {
    this.setState({
      open: state
    })
    this.resetForm()
  }

  componentDidMount = () => {
    const cat = [];
    const cats = JSON.parse(JSON.stringify(categories))
    cats.map(item => {
      if(item.name === 'All Items') item.name = 'N/A'
      cat.push({
        key: item.name,
        text: item.name,
        value: item.name,
        id: item.id,
        name: item.name,
        isActive: item.isActive
      })
    })
    this.setState({
      categories: cat
    })
  }

  onChange = (event, result) => {
    const { name, value } = result || event.target;
    this.setState({ [name]: value });
  };

  back = () => {
    this.props.history.push('/');
  }

  toggleStatus = (category) => {
    const categories = this.state.categories;
    categories.map(cat => {
      if(cat.id === category.id) cat.isActive = !cat.isActive
    })
    this.setState({ categories })
  }

  resetForm = () => {
    this.setState({
      categoryId: -1,
      categoryName: '',
      categoryCode: '',
      categoryIsActive : true
    })
  }

  categoryDetails = (category) => {
    this.setOpen(true)
    this.setState({
      categoryId: category.id,
      categoryName: category.name,
      categoryCode: category.code,
      categoryIsActive : category.isActive
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
          className="modal-medium"
        >
          <Modal.Header>
            Add/ Update Category
          </Modal.Header>

          <Modal.Content>
            <div className='col-md-4 p-0'>
              <div className='row'>
                <div className='form-group col-md-12'>
                  <label>Category Name</label>
                  <input
                    type='text'
                    className='form'
                    onChange={ this.onChange }
                    placeholder='Ex: Beverage'
                    name='categoryName'
                    value={ this.state.categoryName }
                  />
                </div>

                <div className='form-group col-md-12'>
                  <label>Category Code</label>
                  <input
                    type='text'
                    className='form'
                    onChange={ this.onChange }
                    placeholder='Ex: BEV'
                    name='categoryCode'
                    value={ this.state.categoryCode }
                  />
                </div>

                <div className='form-group col-md-12'>
                  <label>Parent Category</label>
                  <Dropdown
                    search
                    name="parentCategory"
                    onChange={ this.onChange }
                    placeholder='Select'
                    fluid
                    selection
                    options={ this.state.categories }
                    value={ this.state.parentCategory }
                  />
                </div>

                <div className='form-group col-md-12'>
                  <Checkbox
                    name="categoryIsActive"
                    checked={ this.state.categoryIsActive }
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
                <i className='material-icons'>add</i>&nbsp;Save Category
              </button>
            </div>
          </Modal.Actions>
        </Modal>

        <div className='content-body content-body-w-nav'>
          
          {
            this.state.categories.filter(category => category.isActive).length > 0 &&
            <div>
              <p className='title'>Product Categories</p>
              <div className='categories mt-4 mb-4'>
                {
                  this.state.categories.filter(category => category.isActive).sort((a, b) => a.name.localeCompare(b.name)).map((category, i) => (
                    <div key={ 'Cat_' + i } onClick={ () => { this.categoryDetails(category) } } className="category">
                      <i className='material-icons'>check</i>
                      <p>{ category.name }</p>
                    </div>
                  ))
                }
              </div>
            </div>
          }
  
          {
            this.state.categories.filter(category => !category.isActive).length > 0 &&
            <div>
              <p className='title mt-25px mb-4'>Inactive Categories</p>
              <div className='categories pb-2'>
                {
                  this.state.categories.filter(category => !category.isActive).sort((a, b) => a.name.localeCompare(b.name)).map((category, i) => (
                    <div key={ 'Cat_' + i } onClick={ () => { this.categoryDetails(category) } } className="category category-inactive">
                      <i className='material-icons'>block</i>
                      <p>{ category.name }</p>
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
                <i className='material-icons'>add</i>&nbsp;Add New Category
              </button>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}