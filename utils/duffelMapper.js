exports.mapBookingForEmail = (order) => ({
    orderId: order.id,
    passengers: order.passengers.map(p => p.id),
    totalAmount: order.total_amount,
    currency: order.total_currency,
    paymentDeadline: order.payment_status.payment_required_by,
    slices: order.slices
  });
  