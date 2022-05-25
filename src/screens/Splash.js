import React from 'react';
import { withRouter } from "react-router-dom";
import '../assets/css/Splash.css';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.history.push('/login');
    }, 2000);
  }

  render() {
    return (
      <div className="splash-wrapper">
          
        <img
          src={ require('../assets/img/shodai.png') }
          className="splash-logo"
          alt="Logo"
        />

        <div className='splash-credit'>
          <p className='font-medium font-weight-bold'>Concept, Planning and Direction: ...</p>
          <p className='font-medium font-weight-bold'>Coordination: ...</p>
          <p className='font-medium font-weight-bold'>Requirements Analysis: ...</p>
          <p className='font-medium font-weight-bold'>Technical Implementation: ...</p>
        </div>
        
      </div>
    );
  }
}

export default withRouter(Splash);