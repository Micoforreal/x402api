const duffel = require("../config/duffel");
const { getOrderDetails } = require("../services/flightFullDetail.service");

exports.Payment = async (req, res, next) => {
    try {

        const order_id = req.body.order_id;
        const details = await getOrderDetails(order_id);
        const price = details.total_amount
        

        
 const res = await duffel.payments.create({
    payment: {
     type: "balance",
      // three_d_secure_session_id: "3ds_0000AWr2XsTRIF1Vp34gh5",
      currency: "USD",
     amount: price
    },
    order_id: order_id
  })
    } catch (error) {
      console.log(error)
        return res.status(400).json({ error: error })
    }

// const clientKey = await duffel.identity.componentClientKeys.create()

// console.log(clientKey)


    return res.json({
      success: true,
      message: res
    })
   
  
  
  }