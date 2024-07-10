import twilio from 'twilio';

export default function handler(req, res) {
    const VoiceResponse = twilio.twiml.VoiceResponse;
    const response = new VoiceResponse();

    const gather = response.gather({
        action: '/api/gather',
        method: 'POST',
        numDigits: 1,
    });
    gather.say('Please press 1 or 2.');

    response.say("We didn't receive any input. Goodbye!");

    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(response.toString());
}
