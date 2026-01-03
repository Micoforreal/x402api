const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "8a94ba001@smtp-brevo.com", // generated ethereal user
    pass: process.env.SMTP_KEY, // generated ethereal password
  },
});

exports.send = async ({ email, booking }) => {
  const {
    orderId,
    passengers,
    totalAmount,
    currency,
    paymentDeadline,
    slices
  } = booking;


let info = await transporter.sendMail({
  from: '"mjjames006@gmail.com', // sender address
  to: email, // list of receivers
  subject: "Mylo from Flight Agent", // Subject line
  text: "Hello  , your flight has been book ", // plain text body
  html:`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flight Booking Confirmation</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4; line-height: 1.6;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4; padding: 20px 0;">
      <tr>
        <td align="center">
          <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                  ✈️ Your Flight Has Been Booked!
                </h1>
                <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                  Booking Confirmation
                </p>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td style="padding: 40px 30px;">
                <!-- Booking Summary Card -->
                <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
                  <h2 style="margin: 0 0 15px 0; color: #333333; font-size: 20px; font-weight: 600;">
                    Booking Summary
                  </h2>
                  <table role="presentation" style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 140px;">
                        <strong style="color: #333333;">Order ID:</strong>
                      </td>
                      <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600;">
                        ${orderId}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666666; font-size: 14px;">
                        <strong style="color: #333333;">Total Amount:</strong>
                      </td>
                      <td style="padding: 8px 0; color: #667eea; font-size: 18px; font-weight: 700;">
                        ${currency} ${totalAmount}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666666; font-size: 14px;">
                        <strong style="color: #333333;">Payment Deadline:</strong>
                      </td>
                      <td style="padding: 8px 0; color: #e74c3c; font-size: 14px; font-weight: 600;">
                        ${paymentDeadline}
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Passengers Section -->
                <div style="margin-bottom: 30px;">
                  <h3 style="margin: 0 0 15px 0; color: #333333; font-size: 18px; font-weight: 600; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                    👥 Passengers
                  </h3>
                  <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px;">
                    ${passengers.map(id => `
                      <div style="padding: 10px; background-color: #ffffff; margin-bottom: 8px; border-radius: 4px; border-left: 3px solid #667eea;">
                        <span style="color: #333333; font-size: 14px; font-weight: 500;">${id}</span>
                      </div>
                    `).join("")}
                  </div>
                </div>

                <!-- Flight Details Section -->
                <div style="margin-bottom: 30px;">
                  <h3 style="margin: 0 0 15px 0; color: #333333; font-size: 18px; font-weight: 600; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                    🛫 Flight Details
                  </h3>
                  ${slices.map((slice, index) => {
                    const seg = slice.segments[0];
                    return `
                      <div style="background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <div style="text-align: center; margin-bottom: 20px;">
                          <div style="display: inline-block; background-color: #667eea; color: #ffffff; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
                            Flight ${index + 1}
                          </div>
                        </div>
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td style="padding: 12px 0; text-align: center; width: 45%;">
                              <div style="font-size: 32px; font-weight: 700; color: #667eea; margin-bottom: 5px;">
                                ${seg.origin.iata_code}
                              </div>
                              <div style="font-size: 12px; color: #666666; text-transform: uppercase;">
                                Origin
                              </div>
                            </td>
                            <td style="padding: 12px 0; text-align: center; width: 10%;">
                              <div style="font-size: 24px; color: #667eea;">→</div>
                            </td>
                            <td style="padding: 12px 0; text-align: center; width: 45%;">
                              <div style="font-size: 32px; font-weight: 700; color: #667eea; margin-bottom: 5px;">
                                ${seg.destination.iata_code}
                              </div>
                              <div style="font-size: 12px; color: #666666; text-transform: uppercase;">
                                Destination
                              </div>
                            </td>
                          </tr>
                        </table>
                        <div style="border-top: 1px solid #e0e0e0; margin: 20px 0; padding-top: 20px;">
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="padding: 8px 0; color: #666666; font-size: 13px; width: 50%;">
                                <strong style="color: #333333;">Departure:</strong><br>
                                <span style="color: #333333; font-size: 14px;">${seg.departing_at}</span>
                              </td>
                              <td style="padding: 8px 0; color: #666666; font-size: 13px; width: 50%;">
                                <strong style="color: #333333;">Arrival:</strong><br>
                                <span style="color: #333333; font-size: 14px;">${seg.arriving_at}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #666666; font-size: 13px;">
                                <strong style="color: #333333;">Airline:</strong><br>
                                <span style="color: #333333; font-size: 14px;">${seg.marketing_carrier.name}</span>
                              </td>
                              <td style="padding: 8px 0; color: #666666; font-size: 13px;">
                                <strong style="color: #333333;">Flight Number:</strong><br>
                                <span style="color: #333333; font-size: 14px; font-weight: 600;">${seg.marketing_carrier_flight_number}</span>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    `;
                  }).join("")}
                </div>

                <!-- Payment Notice -->
                <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
                  <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                    <strong style="font-size: 16px;">⚠️ Important:</strong><br>
                    Please complete payment before the deadline to avoid cancellation of your booking.
                  </p>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                <p style="margin: 0 0 10px 0; color: #666666; font-size: 12px;">
                  Thank you for choosing our flight booking service!
                </p>
                <p style="margin: 0; color: #999999; font-size: 11px;">
                  If you have any questions, please contact our support team.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`
});
console.log("Message sent: %s", info);
};
