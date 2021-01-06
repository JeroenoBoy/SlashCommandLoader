require('dotenv').config();
import { Client } from "discord.js";
import chalk from 'chalk';
import { join } from "path";
import { SlashCommandHandler } from "slashdiscord.js";
import { SlashCommandLoader } from "../../src";

(async () => {

	// Creating the instances
	
	const client = new Client();
	client.once('ready', () => console.log(`Client logged in as ${chalk.green(client.user!.tag)}`))
	
	// The command handler requires the client in order to run the commands.
	
	const handler = new SlashCommandHandler({ client, debug: true });
	
	//	Loading the commands using the loader.
	
	new SlashCommandLoader(handler)
		.addFolder(join(__dirname, 'commands'))
		.load()
	
	// And lastly, login into the client using a bot token.
	
	client.login(process.env.TEST_BOT_TOKEN);

})();
