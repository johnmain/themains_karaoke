export async function onRequestPost(context) {
  try {
    // Parse the incoming JSON data from the request body
    const data = await context.request.json();

    // Extract specific fields for the subject line and reply-to
    const eventType = data.eventType || data['Event Type'] || 'Unknown Event';
    const date = data.date || data['Date'] || 'Unknown Date';
    const replyTo = data.Email || data.email || 'no-reply@themains.org';

    const subject = `New Booking Inquiry: ${eventType} on ${date}`;

    // Dynamically build the email body with all submitted form fields
    let htmlBody = `<h2>New Booking Inquiry</h2><ul style="list-style: none; padding: 0;">`;
    for (const [key, value] of Object.entries(data)) {
      // Capitalize the first letter of the key for better readability
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
      htmlBody += `<li style="margin-bottom: 10px;"><strong>${formattedKey}:</strong><br/> ${value}</li>`;
    }
    htmlBody += `</ul>`;

    // Call the Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'bookings@themains.org', // Note: This domain must be verified in your Resend account
        to: 'bookings@themains.org',
        reply_to: replyTo,
        subject: subject,
        html: htmlBody
      })
    });

    // Check if the Resend API call was successful
    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error("Resend API Error:", errorData);
      throw new Error("Failed to send email via Resend");
    }

    // Return a success response to the client
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Booking request sent successfully." 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Booking Error:", error);
    // Handle errors
    return new Response(JSON.stringify({ 
      success: false, 
      error: "Failed to process booking request." 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
