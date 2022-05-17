import React, { Component } from 'react';
import MenuItem from './MenuItem';

const menu = [
  { title: 'Dashboard', path: '/home/dashboard' },
  {
    title: 'Products', path: '/home/products', children: [
      { title: 'List Products', path: '/home/products/list' },
      { title: 'Add Product', path: '/home/products/add' },
      { title: 'Import Products', path: '/home/products/import' },
      { title: 'Categories', path: '/home/products/categories' },
      { title: 'Units', path: '/home/products/units' },
      { title: 'Brands', path: '/home/products/brands' },
      { title: 'Variants', path: '/home/products/variants' },
      { title: 'Print Barcode', path: '/home/products/barcodes' },
      { title: 'Qty Adjustment', path: '/home/products/quantity' },
    ] 
  },
  {
    title: 'Sale', path: '/home/sale', children: [
      { title: 'List Sales', path: '/home/sale/list' },
      { title: 'POS Sales', path: '/home/sale/list' },
      { title: 'Add Sale', path: '/home/sale/list' },
      { title: 'Import Sale', path: '/home/sale/list' },
      { title: 'Deliveries', path: '/home/sale/list' },
      { title: 'Gift Cards', path: '/home/sale/list' },
    ] 
  },
  { title: 'Purchases', path: '/home/purchases' },
  { title: 'Returns', path: '/home/returns' },
  {
    title: 'People', path: '/home/people', children: [
      { title: 'List Users', path: '/home/people/list' },
      { title: 'Add User', path: '/home/people/add' },
      { title: 'List Billers', path: '/home/people/import' },
      { title: 'Add Biller', path: '/home/people/categories' },
      { title: 'List Customers', path: '/home/people/units' },
      { title: 'List Suppliers ', path: '/home/people/brands' },
      { title: 'Add Supplier', path: '/home/people/variants' },
    ] 
  },
  { title: 'Reports', path: '/home/reports' },
  { title: 'Settings', path: '/home/settings' },
]

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div id="sidebar">
        {
          menu.map((item, i) => (
            <MenuItem key={ 'Menu_' + i } title={ item.title } path={ item?.path } children={ item?.children } />
          ))
        }
      </div>
    );
  }
}