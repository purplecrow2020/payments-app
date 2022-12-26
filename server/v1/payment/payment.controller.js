const CheckoutModel = require('../../../models/mongo/checkout');
const { v4: uuidv4 } = require('uuid');

async function checkout(req, res, next) {
    try {
        const stripe = req.app.get('stripe');
        const { product } = req.body; 
        const { id, } = req.user;
        const idempotencyKey = uuidv4();
        const session = await stripe.checkout.sessions.create({ 
            payment_method_types: ["card"], 
            line_items: [ 
                { 
                    price_data: {
                        currency: "inr", 
                        product_data: { 
                        name: product.name, 
                        }, 
                        unit_amount: product.price * 100, 
                    }, 
                    quantity: product.quantity, 
                },
            ], 
            mode: "payment", 
            success_url: `http://localhost:3000/success?session_key=${idempotencyKey}`,  // random success url for now - which will hit my update session details
            cancel_url: `http://localhost:3000/cancel?session_key=${idempotencyKey}`,   // random failure url for now - which will hit my update session details
        }); 

        await CheckoutModel._create({
            user_id: id,
            session_id: session.id,
            details: product,
            amount: product.price * product.quantity,
            session_key: idempotencyKey,
        });
        next({ data: { stripe_session_id: session.id, }});
    } catch (e) {
        console.log(e);
    }
}

async function updateCheckoutSessionStatus(req, res, next) {
    try {
        const { 
            session_key,
            status,
        } = req.body;
        await CheckoutModel._updateBySessionKey(session_key, { status, });
        next({ data: null, });
    } catch (e) {
        next({ err: e, });
    }
}

async function getSessionDetailsById(req, res, next) {
    try {
        const id = req.body.id;
        const stripe = req.app.get('stripe');
        const session = await stripe.checkout.sessions.retrieve(
            id,
        );
        next({ data: session, });
    } catch (e) {
        next({ err: e,});
    } 
}

module.exports = {
    checkout,
    getSessionDetailsById,
    updateCheckoutSessionStatus,
}