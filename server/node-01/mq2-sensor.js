/**
 * Smoke
 * MQ-2 Smoke Sensor
 * 
 */

const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');
const topic = 'server/smoke';
const node = 'NODE-01';
 
 
client.on('connect', () => {
 setInterval(() => {
	 const min = 0;
	 const max = 1;
	 const smoke = Math.floor(Math.random() * (max - min + 1) + min);

	 const timestamp = new Date().toISOString();

	 const status = smoke == 1 ? 'Smoke detected!' : 'No smoke detected';
	 
	 const data = { node, status, timestamp };
	 const message = JSON.stringify(data);

	 client.publish(topic, message);
	 console.log('Message:', message);
 }, 500);
})