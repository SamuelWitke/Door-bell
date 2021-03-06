const express = require('express');
const twilio = require('twilio');
const url = require('url');
const env = require('node-env-file');
env('./.env');
const PORT = process.env.PORT || 3000;

let app = express();

app.get('/', (req, res) => {
	    res.send('Doorbell server started');
});

app.all('/greeting', (req, res) => {
	    let twiml = new twilio.twiml.VoiceResponse();
	    twiml.say("There's someone at the door", { voice: 'alice' });
	    res.type('text/xml');
	    res.send(twiml.toString());
});

app.get('/call', (req, res) => {
	    let client = new twilio(
				process.env.TWILIO_ACCOUNT_SID,
				process.env.TWILIO_AUTH_TOKEN
			);
			let greetingUrl = url.format({
    		protocol: req.protocol,
		    host: req.get('host'),
				pathname: 'greeting',
			});
	    client.calls.create({
				url: greetingUrl,
				to: process.env.MY_NUMBER,
				from: process.env.TWILIO_NUMBER
			},(err, call) => {
				if (err) {console.log(err);}
		});
});

app.listen(PORT, () => {
	    console.log(`Doorbell listening on port ${PORT}`);
});
