import React from 'react';
import Splash from './Splash';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount = () => {
    
  }

  render() {
    return (
      <div className='col-md-12 content-body content-body bg-transparent p-0'>
        <div className="splash-wrapper" style={{ width: 'unset', height: '100%' }}>
          
          <img
            src={ require('../assets/img/shodai.png') }
            className="splash-logo"
            alt="Logo"
            style={{ width: '10vw' }}
          />

          <div className='splash-credit'>
            <p className='font-medium font-weight-bold'>Concept, Planning and Direction: ...</p>
            <p className='font-medium font-weight-bold'>Coordination: ...</p>
            <p className='font-medium font-weight-bold'>Requirements Analysis: ...</p>
            <p className='font-medium font-weight-bold'>Technical Implementation: ...</p>
          </div>
          
        </div>
      </div>
    );
  }
}