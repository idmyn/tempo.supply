<script lang="ts">
	import { onDestroy } from "svelte";
	import unmute from "../vendor/unmute";

	import { isSettingsOpen } from "./store";
	import Metronome from "./lib/metronome/Metronome.svelte";
	import Icon from "./lib/icons/Icon.svelte";
	import Settings from "./lib/settings/Settings.svelte";

	const context = window.AudioContext ? new window.AudioContext() : null;
	const allowBackgroundPlayback = false; // default false, recommended false
	const forceIOSBehavior = false; // default false, recommended false
	const { dispose } = unmute(
		context,
		allowBackgroundPlayback,
		forceIOSBehavior
	);
	onDestroy(dispose);

	const toggleIsSettingsOpen = () => isSettingsOpen.set(!$isSettingsOpen);
</script>

<main>
	<button on:click={toggleIsSettingsOpen} id="settings-toggle">
		{#if $isSettingsOpen}
			<Icon name="close" size="30px" />
		{:else}
			<Icon name="cog" size="30px" />
		{/if}
	</button>
	<div class:hidden={!$isSettingsOpen}>
		<Settings />
	</div>
	<div class:hidden={$isSettingsOpen}>
		<Metronome />
	</div>
</main>

<style lang="scss">
	#settings-toggle {
		z-index: 2;
		background-color: transparent;
		border: none;

		position: absolute;
		top: 20px;
		right: 20px;

		&:hover {
			cursor: pointer;
		}
	}

	.hidden {
		display: none;
	}
</style>
