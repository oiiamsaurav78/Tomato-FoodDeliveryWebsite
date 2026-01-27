import userModel from "../models/userModel.js";

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({
      _id: req.userId
    });

    let cartData = userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });

    res.json({
      success: true,
      message: "Added to Cart",
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


// REMOVE FROM CART
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({
      _id: req.userId
    });

    let cartData = userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });

    res.json({
      success: true,
      message: "Removed from cart"
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


// GET CART
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId);

    let cartData = userData.cartData;

    res.json({
      success: true,
      message: cartData
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in getCart" });
  }
};

export { addToCart, removeFromCart, getCart };
