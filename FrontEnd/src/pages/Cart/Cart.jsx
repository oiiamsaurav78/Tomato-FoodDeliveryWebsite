import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Contexts/StoreContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);
  const navigate=useNavigate();


  // ✅ Calculate subtotal dynamically
  const subtotal = food_list.reduce((acc, item) => {
    if (cartItems[item._id] > 0) {
      return acc + item.price * cartItems[item._id];
    }
    return acc;
  }, 0);

  const deliveryFee = subtotal > 100 ? 0 : 20; 
  const total = subtotal + deliveryFee;

  return (
    <div className='cart'>
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index} className="cart-items-title cart-items-item">
                <img src={item.image} alt='' />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>₹{item.price * cartItems[item._id]}</p>
                <p 
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  ✖
                </p>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* ===== Bottom Section ===== */}
      <div className="cart-bottom">
        {/* Cart Total Box */}
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
              <p>
                ₹ {deliveryFee}
              </p>
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
          <button onClick={()=>navigate('/PlaceOrder')} disabled={subtotal === 0}>Proceed to Checkout</button>
        </div>

        {/* Promo Code Box */}
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here:</p>
          <div className="cart-promocode-input">
            <input type='text' placeholder='Promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
