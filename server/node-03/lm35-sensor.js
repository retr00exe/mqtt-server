/**
 * Temperature
 * LM-35 Temperature Sensor
 * 
 */

 const mqtt = require('mqtt');

 const client = mqtt.connect('mqtt://localhost:1883');
 const topic = 'server/temp';
 const node = 'NODE-03';
 
 
 client.on('connect', () => {
	setInterval(() => {
		const min = 16;
		const max = 40;
		const temp = Math.floor(Math.random() * (max - min + 1) + min);

		const timestamp = new Date().toISOString();

		const status = temp <= 25 ? 'Normal' : 'Danger';
		
		const data = { node, temp, status, timestamp };
		const message = JSON.stringify(data);

		client.publish(topic, message);
		console.log('Message:', message);
	}, 500);
 })