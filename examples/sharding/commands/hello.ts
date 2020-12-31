import { Command } from '../../../src';

//	Creating command

const command = new Command({
	name: 'hello',
	description: 'I am a test command.',
});


command.run(interaction => {
	interaction.send('Hi,', interaction.member.toString());
})

//	Export

export default command;