import { MarkdownPreviewRenderer, Plugin } from "obsidian";
import { DEFAULT_SETTINGS } from "./const";
import { Settings } from "./interfaces";
import { SettingTab } from "./SettingTab";
import { CodeblockSuggester } from "./Suggester";

export default class CCPlugin extends Plugin {
	settings: Settings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SettingTab(this.app, this));

		this.registerEditorSuggest(new CodeblockSuggester(this));


		this.app.workspace.onLayoutReady(() => {
			setTimeout(async () => {
				const pluginTypes = this.getPluginTypes();
				const newIgnores = this.settings.ignoreTypes.filter(t => pluginTypes.contains(t));
				this.settings.ignoreTypes = newIgnores
				await this.saveSettings()
			}, 3000)
		})
	}

	//@ts-expect-error
	getPluginTypes = () => Object.keys(MarkdownPreviewRenderer.codeBlockPostProcessors)

	onunload() { }

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
