export default async function handler(req, res) {
    console.log("Login Here");
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    const { accessToken, trace_id } = req.body;

    const apiUrl = "https://api.intellectseecstag.com/magicplatform/v1/invokeasset/3542d126-a328-4e44-8425-71e6401d41af/"+trace_id;

    const headers = {
        ApiKey: "magicplatform.7881874f7df9423d94b6fFd8ebd6e279",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
    };

    

    try {
        const response = await fetch(apiUrl, {
            method: "GET", // Or "POST" if required by the external API
            headers: headers

        });

        // Pass through status and response
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error("Error fetching API:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
