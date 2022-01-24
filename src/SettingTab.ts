import { App, PluginSettingTab, Setting } from "obsidian";
import CCPlugin from "./main";
import { splitAndTrim } from "./utils";

export class SettingTab extends PluginSettingTab {
	plugin: CCPlugin;

	constructor(app: App, plugin: CCPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl, plugin } = this;
		const { settings } = plugin;
		containerEl.empty();

		new Setting(containerEl)
			.setName("Custom Codeblocks")
			.setDesc(
				"A comma-separated list of codeblocks types to suggest (aside from those added by your plugins)."
			)
			.addText((text) => {
				text.setValue(settings.customTypes.join(", "));
				text.inputEl.onblur = async () => {
					const value = text.getValue();
					settings.customTypes = splitAndTrim(value);
					await plugin.saveSettings();
				};
			});
	}
}
