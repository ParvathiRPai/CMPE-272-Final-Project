import React, {Component} from 'react';
import Cart from '../components/Cart';
import Filter from '../components/Filter';
import Products from "../components/Products";
import data from '../data.json';
import '../user.css';

class GenericCharity extends Component{
  createOrder=(order)=>{
    alert("need to save" + order.name);
  };
  removeFromCart=(product)=>{
    const cartItems=this.props.cartItems.slice();
    this.props.updateItems(this.props.products, this.props.size, this.props.sort, cartItems.filter(x=>x._id!==product._id), this.props.product)
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x)=>x._id!==product._id)));
  }
  addToCart=(product)=>{
    const cartItems=this.props.cartItems.slice();
    let alreadyIncart=false;
    cartItems.forEach(item => {
      if(item._id===product._id){
        item.count++;
        alreadyIncart=true;
      }
    });
    if(!alreadyIncart)
    {
      cartItems.push({...product, count:1})
    }
    this.props.updateItems(this.props.products, this.props.size, this.props.sort, cartItems, this.props.product)
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  sortProducts=(event)=>
  {
    const sort=event.target.value;
    console.log(event.target.value);
    this.props.updateItems(
      this.props.products.slice().sort((a, b)=>(
        sort==="lowest"?
        ((a.price>b.price)? 1:-1):
        sort==="highest"?
        ((a.price<b.price)?1:-1):
        a._id>b._id?1:-1

      )),
      this.props.size,
      sort,
      this.props.cartItems,
      this.props.product
    )
  }
  filterProducts=(event)=>
  {
    console.log(event.target.value);
    if(event.target.value ===""){
      this.props.updateItems(data.products, event.target.value, this.props.sort, this.props.cartItems, this.props.product)
    }
    else{
      this.props.updateItems(
        data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value)>=0
        ),
        event.target.value,
        this.props.sort,
        this.props.cartItems,
        this.props.product
      )
    }
  };
  render()
  {
  return (
    <div className="grid-container">
      <main>
        <div className="content">
          <div className="main">
          <Filter count={this.props.products.length}
            size={this.props.size}
            sort={this.props.sort}
            filterProducts={this.filterProducts}
            sortProducts={this.sortProducts}>
          </Filter>
          <Products products={this.props.products} addToCart={this.addToCart}></Products> 
          </div>
           <div className="sidebar">
             <Cart cartItems={this.props.cartItems}
               removeFromCart={this.removeFromCart}
               createOrder={this.createOrder}
             />
           </div>
        </div>
      </main>
      <footer>
      </footer>
    </div>
    );
  }
}

export default GenericCharity;