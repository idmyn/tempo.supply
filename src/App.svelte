<script lang="ts">
	import { onDestroy } from "svelte";
	import unmute from "../vendor/unmute";

	import Metronome from "./lib/metronome/Metronome.svelte";

	const context = window.AudioContext ? new window.AudioContext() : null;
	const allowBackgroundPlayback = false; // default false, recommended false
	const forceIOSBehavior = false; // default false, recommended false
	const { dispose } = unmute(
		context,
		allowBackgroundPlayback,
		forceIOSBehavior
	);
	onDestroy(dispose);
</script>

<main>
	<Metronome />
</main>
