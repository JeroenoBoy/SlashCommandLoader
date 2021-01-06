import path from 'path';
import fs from 'fs';
import { SlashCommandHandler } from 'slashdiscord.js';
import { Command } from './Command';


export interface Options {
	/**
	 * Send debug messages
	 * @default false
	 */
	debug: boolean
	/**
	 * Send debug messages
	 * @default [SCL]
	 */
	debugPrefix: string
}


export interface FolderData {
	/**
	 * Absolute path to the folder
	 */
	dir: string
	/**
	 * Load subdirectories
	 * @default true
	 */
	loadSub: boolean
}




export class SlashCommandLoader {

	/**
	 * The directory all commands will be in.
	 */
	private folders: FolderData[] = []

	/**
	 * direct command files to add
	 */
	private files: string[] = []

	/**
	 * The SlashCommandHandler
	 */
	handler: SlashCommandHandler

	/**
	 * Object containing all options
	 */
	options: Options



	/**
	 * Load commands from a directory.
	 * 
	 * @param dir The directory all commands are in.
	 * @param handler The SlashCommandHandler to use
	 * @param options Options for the SlashCommandLoader
	 */
	constructor(handler: SlashCommandHandler, options: Partial<Options> = {}) {
		this.handler = handler;

		this.options = {
			debug: options.debug ?? false,
			debugPrefix: options.debugPrefix ?? '[SCL]',
		}
	}


	/**
	 * Add a folder to the loader
	 * @param dir Absolute path to this folder.
	 * @param loadSub Load sub folders.
	 */
	addFolder(dir: string, loadSub: boolean = true) {
		if(!path.isAbsolute(dir)) throw new Error('Folder path must be absolute!');

		this.folders.push({
			dir,
			loadSub
		})

		return this;
	}


	/**
	 * Add a single file to the loader
	 * @param file Absolute path to this file.
	 */
	addFile(file: string) {
		if(!path.isAbsolute(file)) throw new Error('File path must be absolute!');

		this.files.push(file);
		return this;
	}
	

	/**
	 * Start loading all commands.
	 */
	load() {

		//	Loading files first

		for(const file of this.files) {
			this.loadCommand(file)
		}

		//	Loading directories

		for(const data of this.folders) {
			this.loadDir(data);
		}
	}


	/**
	 * Load a folder to the SlashCommandHandler.
	 * @param data Data of this folder.
	 */
	loadDir(data: FolderData) {
		
		const folders = fs.readdirSync(data.dir);
		
		for(const folder of folders) {
			if(folder.startsWith('!')) continue;

			const dir = path.join(data.dir, folder)
			const stat = fs.lstatSync(dir);

			//	Loading sub directories

			if(stat.isDirectory()) {
				if(data.loadSub)
					this.loadDir({
						dir,
						loadSub: true
					});

				continue;
			}

			//	Loading command

			this.loadCommand(dir)
		}

	}



	/**
	 * Load a command to the SlashCommandHandler.
	 * @param file Path of the file. 
	 */
	loadCommand(dir: string) {

		//	Loading command

		const _a = require(dir)
		let _b: any;
		const cmd = ( _b = (_a.default ? _a.default : _a) ) instanceof Command ? _b : undefined; 

		if(!cmd) throw new Error(`File ${dir} doesn't export a Command instance.`);

		//	Adding command

		const command = this.handler.addCommand(cmd);

		//	Adding subcommands and stuff

		if(!this.handler.runCommands) return;

		command.subFunctions = cmd.subcommands;
		command.runFunction = cmd.runFunction;

		return;
	}


	/**
	 * Send a message to the console.
	 * @param message Message to send
	 * @param optionalParams optional params
	 */
	log(message: any, ...optionalParams: any) {
		if(this.options.debug)
			console.log(this.options.debugPrefix + ' ' + message, ...optionalParams)
	}
}