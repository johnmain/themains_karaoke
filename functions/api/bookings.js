export async function onRequestPost(context) {
  try {
    // Parse the incoming JSON data from the request body
    const data = await context.request.json();

    // TODO: Add your logic here (e.g., send an email, save to a database, etc.)
    // For now, we'll just log it to the Cloudflare console
    console.log("Received booking request:", data);

    // Return a success response to the client
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Booking request received successfully." 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });

  } catch (error) {
    // Handle errors (e.g., invalid JSON or missing data)
    return new Response(JSON.stringify({ 
      success: false, 
      error: "Bad Request or invalid data provided." 
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
