import React, {Component} from 'react';
import data from '../data.json';
import '../user.css';
import GenericCharity from './GenericCharity';

class RegularCharity extends Component{
  constructor(){
    super();
    this.state={
      products:data.products,
      cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
      size:"",
      sort:"",
    };
  }

  handleUpdate(products, size, sort, cartItems, product)
  {
    this.setState({
      products: products,
      size:size,
      sort:sort,
      cartItems: cartItems,
      product: product
    })
  }
  
  render()
  {
  return (
    <GenericCharity
    products={this.state.products}
    cartItems={this.state.cartItems}
    size={this.state.size}
    sort={this.state.sort}
    updateItems = {(products, size, sort, cartItems, product) => { this.handleUpdate(products, size, sort, cartItems, product); }} />
  )
}
}

export default RegularCharity;