const duffel = require("../config/duffel")


async function getOfferDetails(offerId){
    const response = await duffel.offers.get(offerId)
    
    // Extract the offer data from the response structure
    const offerData = response.order_id?.data || response.data || response
    
    // Extract passenger IDs from the passengers array
    const passengerIds = offerData.passengers?.map(passenger => passenger.id) || []
    
    // Extract full passenger information for booking
    const passengers = offerData.passengers?.map(passenger => ({
        id: passenger.id,
        type: passenger.type,
        age: passenger.age,
        given_name: passenger.given_name,
        family_name: passenger.family_name,
        loyalty_programme_accounts: passenger.loyalty_programme_accounts || []
    })) || []
    
    // Return all necessary information for booking
    return {
        offerId: offerData.id || offerId,
        passengerIds: passengerIds,
        passengers: passengers,
        offer: {
            id: offerData.id,
            total_amount: offerData.total_amount,
            total_currency: offerData.total_currency,
            base_amount: offerData.base_amount,
            tax_amount: offerData.tax_amount,
            expires_at: offerData.expires_at,
            payment_requirements: offerData.payment_requirements,
            supported_passenger_identity_document_types: offerData.supported_passenger_identity_document_types,
            passenger_identity_documents_required: offerData.passenger_identity_documents_required,
            conditions: offerData.conditions
        }
    }
}


async function getOrderDetails(orderId){
    const response = await duffel.orders.get(orderId)

    // console.log(response.data)
    return response.data
}

module.exports = { getOfferDetails, getOrderDetails };