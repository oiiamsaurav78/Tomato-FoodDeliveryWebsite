import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Contexts/StoreContext'

export default function PlaceOrder() {
  const { cartItems, food_list } = useContext(StoreContext);

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

  return (
    <form className='place-order'>
      {/* ===== Left: Delivery Info ===== */}
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-field">
          <input type="text" placeholder='First name' required />
          <input type="text" placeholder='Last name' required />
        </div>
        <input type="email" placeholder='Email address' required />
        <input type="number" placeholder='Phone number' required />
        <div className="multi-field">
          <input type="text" placeholder='Street' required />
          <input type="text" placeholder='Landmark' />
        </div>
        <div className="multi-field">
          <input type="text" placeholder='City' required />
          <input type="number" placeholder='Pincode' required />
        </div>
      </div>

      {/* ===== Right: Order Summary ===== */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className='card-total-details'>
              <p>Subtotal</p>
              <p>₹ {subtotal}</p>
            </div>
            <hr />
            <div className='card-total-details'>
              <p>Delivery Fee</p>
              <p>₹ {deliveryFee}</p>
            </div>
            {subtotal < 100 ? (
              <p className="free-delivery-hint">
                Add ₹{100 - subtotal} more to get <b>Free Delivery 🚚</b>
              </p>
            ) : (
              <p className="free-delivery-success">
                🎉 You got Free Delivery!
              </p>
            )}
            <hr />
            <div className='card-total-details'>
              <p>Total</p>
              <p>₹ {total}</p>
            </div>
            <hr />
          </div>
          <button disabled={subtotal === 0}>Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}
