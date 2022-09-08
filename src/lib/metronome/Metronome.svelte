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
	<div id="current-tempo">{tempo}</div>
	<div id="adjustment-buttons">
		<button>-10</button>
		<button>-5</button>
		<button>+5</button>
		<button>+10</button>
	</div>
	<button id="toggle-playing" on:click={toggleIsPlaying}>
		{isPlaying ? "stop" : "start"}
	</button>
</div>

<style lang="scss">
	#container {
		width: 100vw;
		text-align: center;
		margin-top: 40vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	#current-tempo {
		height: 20vh;
		display: grid;
		place-items: center;
		font-size: 60px;
		font-weight: 700;
	}

	#adjustment-buttons {
		display: flex;
		justify-content: space-around;
		margin: 5vh auto 10vh;
		min-width: 400px;
		button {
			font-size: 26px;
		}
	}

	button {
		background: none;
		border: none;
		&:hover {
			cursor: pointer;
		}
	}

	#toggle-playing {
		width: fit-content;
		margin: auto;
		padding: 8px;
		font-size: 30px;
		font-weight: normal;
		text-decoration: underline;
	}
</style>
