<script lang="ts">
	import CCPlugin from "../main";

	export let plugin: CCPlugin;

	const { settings } = plugin;
	let { codeblockTemplates } = settings;

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
</script>

<h3>Codeblock Templates</h3>

<button on:click={async () => addTemplate()}>+</button>

{#each codeblockTemplates as cbTemplate, i}
	<div class="CCItem">
		<div class="CBInputs">
			<div class="CBName">
				<input
					type="text"
					placeholder="Type"
					on:blur={async () => await plugin.saveSettings()}
					bind:value={cbTemplate.type}
				/>
			</div>
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
		<div class="removeTemplate">
			<button on:click={async () => await removeTemplate(i)}>X</button>
		</div>
	</div>
{/each}

<style>
	div.CCItem {
		display: flex;
		flex-direction: row;
		margin: 10px 0;
		padding: 5px 10px;
		border: 1px solid var(--background-modifier-border);
		border-radius: 5px;
	}

	div.removeTemplate {
		margin-left: 5px;
	}

	textarea {
		height: 120px;
	}
</style>
