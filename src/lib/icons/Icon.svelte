<script lang="ts">
	import cog from "./cog.svg";
	import close from "./close.svg";

	const nameSourceMap: Record<string, string> = {
		cog,
		close,
	};

	export let name: keyof typeof nameSourceMap;
	export let size: `${number}px` = "15px";

	const iconSrc = nameSourceMap[name];
</script>

<img width={size} src={iconSrc} alt={name} />
