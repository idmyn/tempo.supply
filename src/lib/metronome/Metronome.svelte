<script lang="ts">
	import { onMount } from "svelte";

	import { makeNoise } from "./noise";
	import { AudioScheduler } from "./scheduler";

	let tempo = 120;

	let scheduler: AudioScheduler | undefined;
	onMount(() => {
		scheduler = new AudioScheduler();
	});

	let isPlaying: boolean = false;
	const toggleIsPlaying = () => {
		isPlaying = !isPlaying;
		if (isPlaying) {
			scheduler.start(makeNoise);
		} else {
			scheduler.stop();
		}
	};

	$: scheduler?.setTempo(tempo);
</script>

<div id="container">
	<button on:click={toggleIsPlaying}>
		{isPlaying ? "pause" : "play"}
	</button>
	<div id="tempo">tempo: {tempo}</div>
	<div>
		<button on:click={() => (tempo -= 10)}>-10</button>
		<button on:click={() => (tempo += 10)}>+10</button>
	</div>
</div>

<style>
	#tempo {
		font-size: 3rem;
	}

	#container {
		width: 50vw;
		height: 50vh;
		display: grid;
		place-items: center;
	}

	button {
		font-size: 40px;
	}
</style>
