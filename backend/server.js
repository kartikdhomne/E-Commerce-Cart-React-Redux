const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SK_KEY);

// Stripe Checkout Session route
app.post("/create-checkout-session", async (req, res) => {
    try {
        const { cartItems } = req.body;

        const lineItems = cartItems.map((item) => ({
            price_data: {
                currency: "inr", // or "usd"
                product_data: {
                    name: item.title,
                    images: [item.thumbnail],
                },
                unit_amount: Math.round(item.price * 100), // Stripe requires paise/cents
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
