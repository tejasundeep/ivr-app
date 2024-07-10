export default function handler(req, res) {
    const data = {
        message: "Here is the support information you requested: Our support team is available 24/7. You can reach us at support@example.com."
    };
    res.status(200).json(data);
}
