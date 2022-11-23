const { request } = require('undici');

module.exports = {
	name: 'pong',
	description: 'Ping!',
	execute(message, args) {
		message.channel.send('pang.');
	},
};