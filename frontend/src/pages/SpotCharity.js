import React, { Component, useState } from 'react';
import axios from 'axios';
import '../user.css';
import GenericCharity from './GenericCharity';


class SpotCharity extends Component {
  constructor(){
    super();
    this.state={
      charities:[],
      cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
      size:"",
      sort:"",
    };
  }
  fetchData = async () => {
    const response = await axios.get(
      `http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/charity/approved_c`
    );

    let responseCharities = response.data.map((charity, index) => {
      return {
        "_id": charity.cname,
        "image": charity.fileLink,
        "title": charity.email,
        "description": charity.description,
        "availableSizes": ["S"],
        "price": 1
      };
    })
      this.setState({
        charities: responseCharities
      });
  };

  handleUpdate(charities, size, sort, cartItems, product)
  {
    this.setState({
      charities: charities,
      size:size,
      sort:sort,
      cartItems: cartItems,
      product: product
    })
  }

  render() {
    return (
      <div className="standardCharity">
        {/* Fetch data from API */}
        <div>
          <button className="fetch-button" onClick={this.fetchData}>
            Donate to the charities in need Today!
          </button>
          <br />
        </div>
        <div className="charities">
        <GenericCharity
    products={this.state.charities}
    cartItems={this.state.cartItems}
    size={this.state.size}
    sort={this.state.sort}
    updateItems = {(charities, size, sort, cartItems, product) => { this.handleUpdate(charities, size, sort, cartItems, product); }} />
  
        </div>
      </div>
    );
  }
}

export default SpotCharity;