import React, { Component } from 'react';
var mexp = require('math-expression-evaluator');

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.x,
      y: this.props.y,
      input: '',
      output: 0
    };
    this.dragMouseDown = this.dragMouseDown.bind(this)
    this.elementDrag = this.elementDrag.bind(this)
    this.closeDragElement = this.closeDragElement.bind(this)
    this.reff = React.createRef()
  }

  componentDidMount() {
    this.pos1 = 0
    this.pos2 = 0
    this.pos3 = 0
    this.pos4 = 0
  }
  
  dragMouseDown(e) {
    e.preventDefault()
    this.pos3 = e.clientX
    this.pos4 = e.clientY
    document.onmouseup = this.closeDragElement
    document.onmousemove = this.elementDrag
  }
  
  elementDrag(e) {
    e.preventDefault()
    this.pos1 = this.pos3 - e.clientX
    this.pos2 = this.pos4 - e.clientY
    this.pos3 = e.clientX
    this.pos4 = e.clientY
    if(this.pos3 > 0 && this.pos4 > 0) {
      this.setState({
        y: (this.reff.current.offsetTop - this.pos2) + "px",
        x: (this.reff.current.offsetLeft - this.pos1) + "px",
      })
    }
  }
  
  closeDragElement() {
    document.onmouseup = null
    document.onmousemove = null
  }

  pressed = (type, key) => {
    this.setState({
      input: this.state.input + key
    })
  }

  getOutput = (key) => {
    if(key === 'C') {
      this.setState({
        input: '',
        output: 0
      })
    }
    else if(key === '=') {
      console.log(mexp.eval(this.state.input))
      const output = 2;
      this.setState({
        output
      })
    }
  }

  render() {
    return (
      <div id='calculator'
        tabIndex={ 0 }
        ref={ this.reff } 
        onMouseDown={ this.dragMouseDown }
        style={{ left: this.state.x, top: this.state.y }}
      >
        <div className='actions'>
          <button onClick={ this.props.calculator }>
            <i className='material-icons'>close</i>
          </button>
          {/* <button>
            <i className='material-icons'>call_received</i>
          </button> */}
        </div>
        <div className='io'>
          <input type='text' placeholder='0' value={ this.state.input }/>
          <p className='output'>{ this.state.output }</p>
        </div>
        <div className='controls'>
          <div className='control' onClick={ () => { this.pressed('o', ' % ') } }>%</div>
          <div className='control' onClick={ () => { this.pressed('o', ' +/- ') } }>+/-</div>
          <div className='control' onClick={ () => { this.getOutput('C') } }>C</div>
          <div className='control' onClick={ () => { this.pressed('o', ' / ') } }>/</div>
          <div className='control' onClick={ () => { this.pressed('d', '7') } }>7</div>
          <div className='control' onClick={ () => { this.pressed('d', '8') } }>8</div>
          <div className='control' onClick={ () => { this.pressed('d', '9') } }>9</div>
          <div className='control' onClick={ () => { this.pressed('o', ' x ') } }>x</div>
          <div className='control' onClick={ () => { this.pressed('d', '4') } }>4</div>
          <div className='control' onClick={ () => { this.pressed('d', '5') } }>5</div>
          <div className='control' onClick={ () => { this.pressed('d', '6') } }>6</div>
          <div className='control' onClick={ () => { this.pressed('o', ' - ') } }>-</div>
          <div className='control' onClick={ () => { this.pressed('d', '1') } }>1</div>
          <div className='control' onClick={ () => { this.pressed('d', '2') } }>2</div>
          <div className='control' onClick={ () => { this.pressed('d', '3') } }>3</div>
          <div className='control' onClick={ () => { this.pressed('o', ' + ') } }>+</div>
          <div className='control' onClick={ () => { this.pressed('d', '0') } }>0</div>
          <div className='control' onClick={ () => { this.pressed('d', '.') } }>.</div>
          <div className='control' onClick={ () => { this.getOutput('=') } }>=</div>
        </div>
      </div>
    );
  }
}