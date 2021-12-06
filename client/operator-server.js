/**
 * Operator server memonitoring kelembaban server agar dapat beroperasi dengan baik
 * 
 */

const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');
const topic = 'server/humidity';

client.on('connect', () => {
	client.subscribe(topic);
})

client.on('message', (topic, message) => {
  console.log(JSON.parse(message.toString()));
});
