import chalk from "chalk";
import { Client } from "discord.js";
import { join } from "path";
import { SlashCommandHandler } from "slashdiscord.js";
import { SlashCommandLoader } from "../../src";

(async () => {

	//	Creating the client

	const client = new Client();
	client.on('ready', () => console.log(`[${chalk.blue(client.shard.ids[0])}] Logged in as ${chalk.green(client.user.tag)}`))

	//	Creating the handler

	const handler = new SlashCommandHandler({
		client,
		registerCommands: false,
		debug: true,
		debugPrefix: '[SHARD SDJS]'
	})

	//	Loading commands

	await new SlashCommandLoader(handler)
		.addFolder(join(__dirname, 'commands'))
		.load();

	//	Logging in

	client.login()
})()
.catch(err => {
	console.log(chalk.red('Unexpected Error'));
	console.error(err);
	process.exit(2);
});