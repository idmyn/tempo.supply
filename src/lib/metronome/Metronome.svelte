<script lang="ts">
	import { onMount } from "svelte";
	import NoSleep from "nosleep.js";

	import { makeNoise } from "./noise";
	import { AudioScheduler } from "./scheduler";
	import { settings } from "src/store";

	let tempo = 120;

	let scheduler: AudioScheduler | undefined;
	let noSleep: NoSleep | undefined;
	onMount(() => {
		scheduler = new AudioScheduler();
		noSleep = new NoSleep();
	});

	let isPlaying: boolean = false;
	const toggleIsPlaying = () => {
		isPlaying = !isPlaying;
		if (isPlaying) {
			scheduler.start(makeNoise);
			noSleep.enable();
		} else {
			scheduler.stop();

			if ($settings.alwaysStayAwake.value === false) {
				noSleep.disable();
			}
		}
	};

	$: scheduler?.setTempo(tempo);
</script>

<div id="container">
	<div id="current-tempo">{tempo}</div>
	<div id="adjustment-buttons">
		<button
			on:click={() => {
				tempo -= 10;
			}}>-10</button
		>
		<button
			on:click={() => {
				tempo -= 5;
			}}>-5</button
		>
		<button
			on:click={() => {
				tempo += 5;
			}}>+5</button
		>
		<button
			on:click={() => {
				tempo += 10;
			}}>+10</button
		>
	</div>
	<button id="toggle-playing" on:click={toggleIsPlaying}>
		{isPlaying ? "stop" : "start"}
	</button>
</div>

<style lang="scss">
	#container {
		width: 100vw;
		height: 100vh;
		text-align: center;
		display: grid;
		grid-template-rows: 2fr 2fr 1fr 1fr;
	}

	#current-tempo {
		grid-row: 2 / 3;
		place-self: center;
		font-size: 60px;
		font-weight: 700;
	}

	#adjustment-buttons {
		grid-row: 3 / 4;
		align-self: start;
		display: flex;
		justify-content: space-around;
		width: min(95vw, 400px);
		margin: 0 auto;
		button {
			font-size: 26px;
		}
	}

	button {
		touch-action: manipulation; // to prevent double tap zoom
		color: black;
		background: none;
		border: none;
		&:hover {
			cursor: pointer;
		}
	}

	#toggle-playing {
		grid-row: 4 / 5;
		align-self: start;
		justify-self: center;
		width: fit-content;
		padding: 8px;
		font-size: 30px;
		font-weight: normal;
		text-decoration: underline;
	}

	@media (min-width: 1000px) {
		#container {
			margin-top: 20vh;
			height: 60vh;
		}
		#adjustment-buttons {
			grid-row: 1 / 2;
			align-self: end;
		}
		#toggle-playing {
			grid-row: 3 / 4;
		}
	}

	@media (max-height: 600px) {
		#adjustment-buttons {
			grid-row: 1 / 2;
			align-self: end;
		}
		#toggle-playing {
			grid-row: 3 / 4;
		}
	}
</style>
