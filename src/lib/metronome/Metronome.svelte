<script lang="ts">
  import { onMount } from "svelte";

  import { makeNoise } from "./noise";
  import { AudioScheduler } from "./scheduler";

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

  const testScheduler = () => {
    console.log(scheduler.nowSeconds());
    console.log(scheduler.debug());
  };
</script>

<div id="container">
  <button on:click={toggleIsPlaying}>
    {isPlaying ? "pause" : "play"}
  </button>
  <button on:click={testScheduler}>test noise</button>
</div>

<style>
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
