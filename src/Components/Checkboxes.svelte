<script lang="ts">
	import type CCPlugin from "../main";

	export let plugin: CCPlugin;
	export let settingName: string;
	export let options: string[];

	const { settings } = plugin;

	let selected = settings[settingName];

	$: toNone = selected.length === 0 ? false : true;

	async function save() {
		settings[settingName] = selected;
		await plugin.saveSettings();
	}
</script>

<div>
	<button
		on:click={async () => {
			if (toNone) selected = [];
			else selected = options;
			await save();
		}}
	>
		Select {toNone ? "None" : "All"}
	</button>
</div>

<div class="grid">
	{#each options as option}
		<div>
			<label>
				<input
					type="checkbox"
					value={option}
					bind:group={selected}
					on:change={async () => await save()}
				/>
				{option}
			</label>
		</div>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	}
</style>
