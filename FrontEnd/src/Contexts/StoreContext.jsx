import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);
import axios from 'axios'

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);




  // Add to cart
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  // ✅ Calculate total items in cart
  const getCartTotal = () => {
    return Object.values(cartItems).reduce((acc, count) => acc + count, 0);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find(
          (product) => product._id === itemId
        );
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }

    return totalAmount;
  };
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);

  }

  useEffect(() => {

    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
      }

    }
    loadData();
  }, [])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    removeFromCart,
    addToCart,
    getCartTotal, // ✅ exposed
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
