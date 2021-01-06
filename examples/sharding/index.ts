require('dotenv').config();
import chalk from "chalk";
import { ShardingManager } from "discord.js"
import { join } from "path";
import { SlashCommandHandler } from "slashdiscord.js";
import { SlashCommandLoader } from "../../src";


(async () => {


	const manager = new ShardingManager('examples/sharding/bot.ts', {
		token: process.env.TEST_BOT_TOKEN!,
		execArgv: process.execArgv
	});

	// ========================== \\
	console.log('Loading commands');
	// ========================== \\
		
	const handler = new SlashCommandHandler({
		client: {
			token: process.env.TEST_BOT_TOKEN!,
			id: process.env.TEST_CLIENT_ID!
		},
		debug: true,
	});

	//	Loading the commands

	new SlashCommandLoader(handler)
		.addFolder(join(__dirname, 'commands'))
		.load();

	//	Starting the handler

	await handler.start();

	// ======================== \\
	console.log('Spawning shards');
	// ======================== \\
	
	manager.spawn();
})()
.catch(err => {
	console.log(chalk.red('Unexpected Error'));
	console.error(err);
	process.exit(2);
});