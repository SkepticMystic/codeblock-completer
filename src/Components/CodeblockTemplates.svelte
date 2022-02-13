<script lang="ts">
	import { MarkdownPreviewRenderer } from "obsidian";

	import CCPlugin from "../main";
	import { SettingTab } from "../SettingTab";

	export let plugin: CCPlugin;
	export let settingsTab: SettingTab;

	const { settings } = plugin;
	let { codeblockTemplates, customTypes } = settings;

	const typesFromPlugins = Object.keys(
		//@ts-ignore
		MarkdownPreviewRenderer.codeBlockPostProcessors
	);

	async function addTemplate() {
		codeblockTemplates.push({ type: "", template: "" });
		codeblockTemplates = codeblockTemplates;
		await plugin.saveSettings();
	}

	async function removeTemplate(i: number) {
		codeblockTemplates.splice(i, 1);
		codeblockTemplates = codeblockTemplates;
		await plugin.saveSettings();
	}

	async function addToCustomTypes(type: string) {
		customTypes.push(type);
		customTypes = customTypes;
		await plugin.saveSettings();
		settingsTab.display();
	}
</script>

<h3>Codeblock Templates</h3>

<p>
	Give templates to specific codeblock types.<br />
	Use <code>$|$</code> to set where the cursor should be placed after inserting
	the template (Espanso style).
</p>

<button aria-label="Add new template" on:click={async () => addTemplate()}>
	+
</button>

<div class="CCGrid">
	{#each codeblockTemplates as cbTemplate, i}
		<div class="CCItem">
			<span>
				<input
					class="CCName"
					type="text"
					placeholder="Type"
					on:blur={async () => await plugin.saveSettings()}
					bind:value={cbTemplate.type}
				/>
				{#if cbTemplate.type !== "" && ![...typesFromPlugins, ...customTypes].includes(cbTemplate.type)}
					<button
						class="missingCustomType"
						aria-label="This type is not in your custom types, click to add"
						on:click={async () =>
							await addToCustomTypes(cbTemplate.type)}
					>
						+
					</button>
				{/if}
				<button
					aria-label="Remove Template"
					on:click={async () => await removeTemplate(i)}>X</button
				>
			</span>
			<div class="CBTemplate">
				<label>
					<textarea
						placeholder="Template"
						on:blur={async () => await plugin.saveSettings()}
						bind:value={cbTemplate.template}
					/>
				</label>
			</div>
		</div>
	{/each}
</div>

<style>
	input.CCName {
		display: inline;
	}
	div.CCGrid {
		display: flex;
		flex-wrap: wrap;
	}
	div.CCItem {
		margin: 10px 0;
		padding: 5px 10px;
		border: 1px solid var(--background-modifier-border);
		border-radius: 5px;
	}

	button.missingCustomType {
		background-color: rgb(207, 45, 45) !important;
	}
	div.removeTemplate {
		margin-left: 5px;
	}

	textarea {
		height: 120px;
	}
</style>
