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

	functionMap: Map<string, InteractionFunction> = new Map<string, InteractionFunction>();
	

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
	run(callback: InteractionFunction): Command
	/**
	 * Execute the command for a specific option.
	 * @param option the option to listen to. 
	 * @param callback the function being ran when executed.
	 */
	run(option: string, callback: InteractionFunction): Command


	run(callbackOrOption: string | InteractionFunction, callback?: InteractionFunction): Command {
		if(typeof callbackOrOption === 'string') {
			if(typeof callback !== 'function') throw new Error('callback must be of type function.');
			this.functionMap.set(callbackOrOption, callback);
		}
		else
			this.functionMap.set('', callbackOrOption);

		return this;
	}


	/**
	 * @deprecated
	 * Run a sub command, for example: 'example ping user'.
	 * @param subcommand the subcommand which should be executed
	 * @param callback function that executes this command
	 */
	sub(subcommand: string, callback: InteractionFunction) {
		console.log('SlashCommandLoader DeprecationWarning: Command.sub(option, callback) is deprecated, please use command.run(option, callback)')
		this.functionMap.set(subcommand, callback)
	}
}