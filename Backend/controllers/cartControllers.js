import userModel from '../models/userModel.js';

const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({
            _id: req.body.userID
        })
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            //if there is no entry in cart with that id then create one
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userID, { cartData });
        res.json({
            success: true,
            message: "Added to Cart",
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}




//removeItem From User Cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById({
            _id: req.body.userID
        })
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userID, { cartData });
        res.json({ success: true, message: "Removed from cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }


}

//fetchUser cart data
const getCart = async (req, res) => {
    
}

export { addToCart, removeFromCart, getCart };