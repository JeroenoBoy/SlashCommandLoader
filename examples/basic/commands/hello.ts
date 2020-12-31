import { User } from 'discord.js';
import { Command } from '../../../src';

//	Creating command

const command = new Command({
	name: 'test',
	description: 'I am a test command.',
	options: [
		{
			type: 'SUB_COMMAND',
			name: 'ping',
			description: 'This is a double test.'
		},
		{
			type: 'SUB_COMMAND',
			name: 'hello',
			description: 'Say hello.',
			options: [{
				type: 'USER',
				name: 'user',
				description: 'Say hi to an user.'
			}]
		}
	]
});

//	Ping command

command.sub('ping', interaction => {
	interaction.reply(`API: ${interaction.client.ws.ping}ms`);
})

//	Hello command

command.sub('hello user', interaction => {
	const data = interaction.getOption<User>('hello user');
	if(!data)
		return interaction.reply(`Couldn't find user`);
	interaction.reply(`Hello ${data.value}!`);
})

command.sub('hello', interaction => {
	interaction.reply(`Hello, ${interaction.member}.`)
})

//	Export

export default command;