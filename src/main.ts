import { Plugin } from "obsidian";
import { DEFAULT_SETTINGS } from "./const";
import { MyPluginSettings } from "./interfaces";
import { SettingTab } from "./SettingTab";
import { CodeblockSuggester } from "./Suggester";

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SettingTab(this.app, this));

		this.registerEditorSuggest(new CodeblockSuggester(this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
