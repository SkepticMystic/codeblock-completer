import { App, PluginSettingTab, Setting } from "obsidian";
import CCPlugin from "./main";
import { splitAndTrim } from "./utils";
import CodeblockTemplates from "./Components/CodeblockTemplates.svelte";

const fragWithHTML = (html: string) =>
	createFragment((frag) => (frag.createDiv().innerHTML = html));
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
			.addTextArea((text) => {
				text.inputEl.addClass("customTypesTA");
				text.setValue(settings.customTypes.join(", "));
				text.inputEl.onblur = async () => {
					const value = text.getValue();
					settings.customTypes = splitAndTrim(value);
					await plugin.saveSettings();
				};
			});

		new CodeblockTemplates({
			target: containerEl,
			props: { settingsTab: this, plugin: this.plugin },
		});

		new Setting(containerEl)
			.setName("Add Codeblock Labels")
			.setDesc(
				"Enable this to add `{}` at the end of the codeblock type. This is useful if you have the Codeblock Label plugin installed."
			)
			.addToggle((tog) =>
				tog.setValue(settings.addCBLabel)
					.onChange(async (value) => {
						settings.addCBLabel = value;
						await plugin.saveSettings();
					})
			);
	}
}
