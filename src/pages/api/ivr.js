import twilio from 'twilio';

export default function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const VoiceResponse = twilio.twiml.VoiceResponse;
            const response = new VoiceResponse();

            const gather = response.gather({
                action: 'https://ivr-app.vercel.app/api/gather',
                method: 'POST',
                numDigits: 1,
            });
            gather.say('Please press 1 or 2.');

            response.say("We didn't receive any input. Goodbye!");

            res.setHeader('Content-Type', 'text/xml');
            res.status(200).send(response.toString());
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
