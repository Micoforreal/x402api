exports.send = async (email, order) => {
    console.log("📧 Sending email to", email)
    console.log("Booking confirmed:", order.id)
  }
  