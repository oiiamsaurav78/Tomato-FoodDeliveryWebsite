import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import authMiddleware from "../middleware/auth.js";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Placing order from frontend;
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173" //hardcoded the frontend_url

    try {
        const newOrder = new orderModel({
            userId: req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,

        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100
                // unit_amount:item.price
            },
            quantity: item.quantity

        }))
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        })
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            //if payment is successfull redirect to success page else fail page
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({
            success: true, session_url: session.url
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Order placed failed--inside orderController" });

    }

}
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({
                success: true,
                message: "Paid-inside verify Order"
            })
        }
    } catch (error) {
        await orderModel.findByIdAndDelete(orderId);
        res.json({ success: false, message: "Not Paid-Inside verify order" });
        console.log(error);
    }

}

//userOrder for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId });
        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Inside userOrder -Error"
        });
    }
};

//listing order for admin panel
const listOrders=async(req,res)=>{
    try {
        const order=await orderModel.find({});
        res.json({success:true,data:order});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error in listOrders'});
    }

}


export { placeOrder, verifyOrder, userOrders,listOrders }