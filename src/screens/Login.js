import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { local, server } from '../config/server';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'kafi',
      password: '1234',
      isloggingIn: false,
      isInvalid: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

	handleChange({ target }) {
		this.setState({
			[target.name]: target.value
		});
	}

  validate = () => {
    if(this.state.username.trim().length > 0 && this.state.password.trim().length > 0) return false;
    return true;
  }

  login = () => {
    this.setState({
      isloggingIn: true,
      isInvalid: false
    })
    // fetch(server + '/authenticate', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     username: this.state.username,
    //     password: this.state.password
    //   })
    // })
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   if(responseJson.hasOwnProperty('username')) {
        this.props.history.push('/home/dashboard');
        localStorage.setItem('username', this.state.username)
    //   }
    //   else this.setState({
    //     isInvalid: true
    //   })
    //   this.setState({
    //     isloggingIn: false
    //   })
    // })
    // .catch((error) => {
    //   this.setState({
    //     isInvalid: false,
    //     isloggingIn: false
    //   })
    // });
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-form">
          <p className="login-title">Log In to</p>
          
          <img
            src={ require('../assets/img/shodai.png') }
            className="login-logo"
            alt="Logo"
          />


          <label>Username</label>
          <input
            type="text"
            placeholder="Example: kafi"
            name="username"
            className="loginInput"
            value={this.state.username}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            name="password"
            className="loginInput"
            value={this.state.password}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />

          <button
            onClick={ () => { this.login() } }
            disabled={ this.validate() || this.isloggingIn }
          >
            { this.state.isloggingIn ? "Logging In..." : "Log In" }
          </button>

          {
            this.state.isInvalid &&
            <p
              className="invalid-credentials"
            >
              Username or password does not match!
            </p>
          }

          <p
            className="forgot-password"
            onClick={ () => { alert('Please contact admin.') } }
          >
            Forgot Password?
          </p>

        </div>

        <p className="credit">
          Powered by Business Novelty Ltd.
        </p>
      </div>
    );
  }
}

export default withRouter(Login);