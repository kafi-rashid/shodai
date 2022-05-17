import React from 'react';
import { customers, categories } from '../../../fakedb/Data';

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

  details = (user) => {
    user['userType'] = user.role[0].roleName;
    this.props.history.push({
      pathname: '/home/people/add-users',
      state: user
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
            placeholder='Search by name'/>

          <div className='table-responsive table-sticky'>
            <table className='table'>
              <thead>
                <tr>
                  <th width="10">SN.</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>User Type</th>
                </tr>
              </thead>
              <tbody>
                {
                  customers.filter(user => user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())).map((user, i) => (
                    <tr onClick={ () => { this.details(user) } } key={ 'User_' + i }>
                      <td>{ i + 1 }</td>
                      <td className='font-weight-bold'>
                        <img
                          alt={ user.gender}
                          src={ require('../../../assets/img/'+(user.gender && user.gender.toLowerCase() === 'female' ? 'female' : 'male')+'.png') }
                          style={{ width: 20, marginRight: 10 }} />
                        { user.name }
                      </td>
                      <td>{ user.username }</td>
                      <td>{ user.role[0].roleName }</td>
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