/**
 * Fire alarm mendeteksi adanya asap kebakaran pada ruangan server
 * 
 */

const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');
const topic = 'server/smoke';

client.on('connect', () => {
	client.subscribe(topic);
})

client.on('message', (topic, message) => {
  console.log(JSON.parse(message.toString()));
});
