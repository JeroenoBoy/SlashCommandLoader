import { ApplicationCommand, ApplicationCommandOption, InteractionFunction, SlashCommandHandler } from 'slashdiscord.js';

export class Command implements ApplicationCommand {
	
	handler: SlashCommandHandler;
	
	//	Options

	id?: string | undefined;
	application_id?: string | undefined;
	
	name: string;
	description: string;
	options?: ApplicationCommandOption[] | undefined;
	
	//	Behind the scenes

	runFunction: InteractionFunction = () => {};	
	subcommands: Map<string, InteractionFunction> = new Map<string, InteractionFunction>();
	

	/**
	 * Create a new command for the SlashCommandLoader.
	 * @param cmd Command data to load
	 */
	constructor(cmd: ApplicationCommand) {
		this.name = cmd.name;
		this.description = cmd.description;
		this.options = cmd.options;
	}

	
	/**
	 * Set the main InteractionFunction.
	 * @param callback the function called upon execution
	 */
	run(callback: InteractionFunction) {
		this.runFunction = callback;
	}


	/**
	 * Run a sub command, for example: 'example ping user'.
	 * @param subcommand the subcommand which should be executed
	 * @param callback function that executes this command
	 */
	sub(subcommand: string, callback: InteractionFunction) {
		this.subcommands.set(subcommand, callback)
	}
}