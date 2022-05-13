<script lang="ts">
	import { MarkdownPreviewRenderer } from "obsidian";
	import { removeDups } from "src/utils";
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

	const allTypes = removeDups([...typesFromPlugins, ...customTypes]);

	const doesNeedToBeAdded = (type: string) => !allTypes.includes(type);
	const needsToBeAdded: { [type: string]: boolean } = {};
	codeblockTemplates.forEach(
		(cbt) => (needsToBeAdded[cbt.type] = doesNeedToBeAdded(cbt.type))
	);

	async function addTemplate() {
		codeblockTemplates.push({ type: "", template: "" });
		codeblockTemplates = codeblockTemplates;
		await plugin.saveSettings();
	}

	async function removeTemplate(i: number) {
		const typeToRemove = codeblockTemplates[i].type;

		codeblockTemplates.splice(i, 1);
		codeblockTemplates = codeblockTemplates;
		await plugin.saveSettings();

		delete needsToBeAdded[typeToRemove];
	}

	async function addToCustomTypes(type: string) {
		customTypes.push(type);
		customTypes = customTypes;
		needsToBeAdded[type] = false;

		await plugin.saveSettings();
		settingsTab.display();
	}
</script>

<button aria-label="Add new template" on:click={async () => addTemplate()}>
	+
</button>

<div class="CCGrid">
	{#each codeblockTemplates as cbTemplate, i}
		<div class="CCItem">
			<div class="buttons">
				<button
					aria-label="Remove Template"
					on:click={async () => await removeTemplate(i)}
				>
					X
				</button>

				{#if cbTemplate.type !== "" && needsToBeAdded[cbTemplate.type]}
					<button
						class="missingCustomType"
						aria-label="This type is not in your custom types, click to add"
						on:click={async () =>
							await addToCustomTypes(cbTemplate.type)}
					>
						+
					</button>
				{/if}
			</div>

			<input
				class="CCName"
				type="text"
				placeholder="Type"
				on:blur={async () => {
					const { type } = cbTemplate;
					needsToBeAdded[type] = doesNeedToBeAdded(type);
					await plugin.saveSettings();
				}}
				bind:value={cbTemplate.type}
			/>

			<div class="CBTemplate">
				<textarea
					placeholder="Template"
					on:blur={async () => await plugin.saveSettings()}
					bind:value={cbTemplate.template}
				/>
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
		margin: 5px 5px;
		padding: 5px 10px;
		border: 1px solid var(--background-modifier-border);
		border-radius: 5px;
	}

	button.missingCustomType {
		background-color: rgb(207, 45, 45) !important;
	}

	textarea {
		height: 120px;
	}
</style>
