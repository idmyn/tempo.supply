<script>
	import { settings } from "../../store";
</script>

<div id="outer-container">
	<div id="inner-container">
		<h1>settings</h1>
		<label
			><input type="checkbox" bind:checked={$settings.alwaysStayAwake.value} />
			{$settings.alwaysStayAwake.name}</label
		>
	</div>
</div>

<style>
	#outer-container {
		position: relative;
		height: 100vh;
		z-index: 1;

		display: grid;
		place-items: center;
	}

	#inner-container {
		height: 50vh;
	}
</style>
