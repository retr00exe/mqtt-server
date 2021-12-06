/**
 * Server monitoring MQTT broker
 * Node.js + MongoDB
 * 
 */

// MQTT Broker
const mosca = require('mosca');
const broker = new mosca.Server({
	port: 1883
});

// MongoDB
const mongo = require('mongodb');
const mongoc = mongo.MongoClient;
const endpoint = 'mongodb://mekel:password@localhost:27017/mqtt';

broker.on('ready', () => {
	console.log('Broker is running on mqtt://localhost:1883');
})

broker.on('published', (packet) => {
	const message = packet.payload.toString();
	console.log('Published: ', message);

	if(message.slice(0, 4) != 'mqtt') {
		mongoc.connect(endpoint, (err, client) => {
			if(err) {
				console.log('Error connecting to MongoDB: ', err);
			} else {
				const db = client.db('mqtt');
				const collection = db.collection('data');
				collection.insertOne({
					message: JSON.parse(message)
				}, (err, result) => {
					if(err) {
						console.log('Error inserting into MongoDB: ', err);
					} else {
						client.close();
					}
				});
			}
		});
	}
})