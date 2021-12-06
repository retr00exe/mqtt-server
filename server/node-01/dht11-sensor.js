/**
 * Humidity
 * DHT-11 humidity sensor
 * 
 */

 const mqtt = require('mqtt');

 const client = mqtt.connect('mqtt://localhost:1883');
 const topic = 'server/humidity';
 const node = 'NODE-01';
 
 client.on('connect', () => {
	setInterval(() => {
		const min = 30;
		const max = 50;
		const humidity = Math.floor(Math.random() * (max - min + 1) + min);

		const timestamp = new Date().toISOString();

		const status = humidity <= 30 && humidity >= 50 ? 'Danger' : 'Normal';
		
		const data = { node, humidity, status, timestamp };
		const message = JSON.stringify(data);

		client.publish(topic, message);
		console.log('Message:', message);
	}, 500);
 })