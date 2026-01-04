import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Contexts/StoreContext'
import axios from 'axios';


export default function PlaceOrder() {
  const { getTotalCartAmount, cartItems, food_list, token, url } = useContext(StoreContext);

  // to store data
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  // 🔹 Calculate subtotal
  const subtotal = food_list.reduce((acc, item) => {
    if (cartItems[item._id] > 0) {
      return acc + item.price * cartItems[item._id];
    }
    return acc;
  }, 0);

  // 🔹 Delivery fee logic
  const deliveryFee = subtotal > 100 ? 0 : 20;
  const total = subtotal + deliveryFee;
  const placeOrder=async(event)=>{
      event.preventDefault();
      let orderItems=[];
      food_list.map((item)=>{
        if(cartItems[item._id]>0){
            let itemInfo=item;
            itemInfo["quantity"]=cartItems[item._id];
            orderItems.push(itemInfo);
        }
      })
      let orderData={
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+deliveryFee,
      }
      let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}});
      if(response.data.success){
        const {session_url}=response.data;
        window.location.replace(session_url);
      }
      else{
        alert("Error");
      }

  }


  return (
    <form onSubmit={placeOrder} className='place-order'>
      {/* ===== Left: Delivery Info ===== */}
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>

        <div className="multi-field">
          <input
            name='firstName'
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder='First name'
            required
          />
          <input
            name='lastName'
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder='Last name'
            required
          />
        </div>

        <input
          name='email'
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder='Email address'
          required
        />

        <input
          name='phone'
          onChange={onChangeHandler}
          value={data.phone}
          type="number"
          placeholder='Phone number'
          required
        />

        <div className="multi-field">
          <input
            name='street'
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder='Street'
            required
          />
          <input
            name='city'
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder='City'
            required
          />
        </div>

        <div className="multi-field">
          <input
            name='state'
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder='State'
            required
          />
          <input
            name='zipcode'
            onChange={onChangeHandler}
            value={data.zipcode}
            type="number"
            placeholder='Pincode'
            required
          />
        </div>

        <input
          name='country'
          onChange={onChangeHandler}
          value={data.country}
          type="text"
          placeholder='Country'
          required
        />
      </div>

      {/* ===== Right: Order Summary ===== */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div className='card-total-details'>
            <p>Subtotal</p>
            <p>₹ {subtotal}</p>
          </div>

          <hr />

          <div className='card-total-details'>
            <p>Delivery Fee</p>
            <p>₹ {deliveryFee}</p>
          </div>

          <hr />

          <div className='card-total-details'>
            <p>Total</p>
            <p>₹ {total}</p>
          </div>

          <button type='submit' disabled={subtotal === 0}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
}
