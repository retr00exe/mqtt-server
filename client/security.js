/**
 * Security memonitoring adanya penyusup pada server
 * 
 */

const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');
const topic = 'server/motion';

client.on('connect', () => {
	client.subscribe(topic);
})

client.on('message', (topic, message) => {
  console.log(JSON.parse(message.toString()));
});
