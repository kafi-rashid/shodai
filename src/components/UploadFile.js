import React, { Component } from 'react';

export default class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Choose file',
      id: Math.random(),
      file: null
    };
  }

  componentDidMount = () => {
    
  }

  triggerFile = () => {
    document.getElementById('File_' + this.state.id).click()
  }

  handleFileUpload = (e) => {
    let that = this;
    let temp = e.target.files[0];
    const file = {
      file: '',
      name: '',
      type: '',
      ext: ''        
    }
    if (temp && temp.name.includes('.')) {
      const reader = new FileReader();
      reader.readAsDataURL(temp);
      reader.onload = function () {
        file.file = reader.result.split(',')[1];
        file.name = temp.name;
        file.type = reader.result.split(',')[0];
        file.ext = temp.name.includes('.') ? temp.name.split('.').pop() : 'unknown'

        that.setState({
          file: file,
          title: file.name.length >= 20 ? (file.name.slice(0, 17 ) + ('... .' + file.ext)) : file.name
        })
      };
    }
  }

  render() {
    return (
      <>
        <button
          onClick={ () => { this.triggerFile() } }
          htmlFor={ 'File_' + this.state.id }
          className={ 'button button-upload h-40px w-100 text-truncate justify-content-start border ' + this.props.className }
        >
          <i className='material-icons mr-1'>attach_file</i>{ this.state.title }
        </button>
        <input type="file"
          onChange={ this.handleFileUpload }
          className="d-none"
          { ...this.props }
          id={ 'File_' + this.state.id } />
      </>
    );
  }
}