import React from 'react';
import Animation from '../assets/img/loader.svg';

export default class Loader extends React.Component {
  render() {
    return (
      <div className="suspense-loader">
        <img
          src={ Animation }
        />
      </div>
    );
  }
}