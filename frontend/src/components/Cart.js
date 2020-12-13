import React, { Component } from 'react'
import formatCurrency from '../util';
import { PayPalButton } from "react-paypal-button-v2";
import axios from 'axios';

export default class Cart extends Component {
    constructor(props){
        super(props);

        this.state={
            name:"",
            email:"",
            address:"",
            showCheckout:false};
    }
    handleInput=(e) => {
        this.setState({[e.target.name]:e.target.value});
    }
    createOrder=(e)=> {
        e.preventDefault();
        const order={
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            cartItems: this.props.cartItems,
        };
        this.props.createOrder(order);
    }

    paymentHandler = (details, data) => {
        console.log(details, data);
        var bodyFormData = new FormData();
        bodyFormData.append("paypal", JSON.stringify(details));
        axios({
            method: 'post',
            url: `http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/donation`,
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
          .then((result) => {
            console.log(result);
            alert("Donation Registered, Thank You");
          }).catch((err) =>{
            console.log(err);
          });
    };
    render() {
        const {cartItems}=this.props;
        return (
            <div>
                {cartItems.length===0?
                (<div className="cart cart-header">Cart is empty</div>)
                :
                (<div className="cart cart-header">You have {cartItems.length} in the cart{" "}</div>)
                }

                <div>
                    <div className="cart">
                    <ul className="cart-items">
                     {cartItems.map((item) => (
                        <li key={item._id}>
                        <div>
                        <img src={item.image} alt={item.title}></img>
                        </div>
                    <div>
                        <div>{item.title}</div>
                        <div className="right">
                        {formatCurrency(item.price)}x{item.count}{" "}
                        <button className="button"
                        onClick={()=> this.props.removeFromCart(item)}>
                            Remove
                        </button>
                        </div>
                    </div>
                    </li>
                ))}
                </ul>
            </div>
            {cartItems.length!==0 && (<div className="cart">
            <div>
                <div className="cart">
                <div className="total">
                    <div>
                        Total: {" "}
                        {formatCurrency(
                            cartItems.reduce((a, c)=> a+c.price*c.count, 0))}
                    </div>
                    <button onClick={()=> {this.setState({showCheckout: true})}} className="button primary">Proceed</button>
                </div>
                </div>
            {this.state.showCheckout && (
                <div className="cart">
                <form onSubmit={this.createOrder}>
                <ul className="form-container">

                  <PayPalButton
                    amount={cartItems.reduce((a, c)=> a+c.price*c.count, 0)}
                    onSuccess={(details, data) => this.paymentHandler(details, data)}
                    options={{clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID}}
                  />
                </ul>
                </form>
                </div>
            )}
            </div>
        </div>
            )}
        </div>
        </div>
        );
    }
}