import twilio from 'twilio';

export default async function handler(req, res) {
    const { Digits } = req.body;

    const VoiceResponse = twilio.twiml.VoiceResponse;
    const response = new VoiceResponse();

    if (Digits === '2') {
        const data = await fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching data:', error);
                return { title: 'Error fetching data', body: 'Please try again later.' };
            });

        response.say(`Connecting to Sundeep. Here is the sample data: Title: ${data.title}. Body: ${data.body}`);
    } else {
        response.say('Connecting to Teja. There is nothing to speak good day');
    }

    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(response.toString());
}
