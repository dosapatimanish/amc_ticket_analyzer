export default async function handler(req, res) {
    console.log("Login Here");
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const apiUrl = "https://api.intellectseecstag.com/accesstoken/idxpigtb";

    const headers = {
        ApiKey: "magicplatform.7881874f7df9423d94b6fFd8ebd6e279",
        Username: req.body.username, // Extracted from POST body
        Password: req.body.password, // Extracted from POST body
    };

    try {
        const response = await fetch(apiUrl, {
            method: "GET", // Or "POST" if required by the external API
            headers: headers,
        });

        // Pass through status and response
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error("Error fetching API:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
