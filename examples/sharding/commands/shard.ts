import { Command } from '../../../src';

//	Creating command

const command = new Command({
	name: 'shard',
	description: 'Get the current shard',
});


command.run(interaction => {
	interaction.send(`This guild is using shard #${interaction.client.shard.ids[0]}`);
})

//	Export

export default command;