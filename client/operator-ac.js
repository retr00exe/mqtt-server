/**
 * Operator AC memonitoring suhu server untuk mencegah adanya overheating pada server
 * 
 */

const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');
const topic = 'server/temp';

client.on('connect', () => {
	client.subscribe(topic);
})

client.on('message', (topic, message) => {
  console.log(JSON.parse(message.toString()));
});
