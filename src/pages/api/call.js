import twilio from 'twilio';

export default async function handler(req, res) {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, VERIFIED_PHONE_NUMBER } = process.env;
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    if (req.method === 'POST') {
        try {
            const call = await client.calls.create({
                to: VERIFIED_PHONE_NUMBER,
                from: TWILIO_PHONE_NUMBER,
                url: 'https://ivr-app.vercel.app/api/ivr',
            });

            res.status(200).json({ callSid: call.sid });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}