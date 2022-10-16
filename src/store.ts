import { writable } from "svelte/store";

export const isSettingsOpen = writable(false);

export const settings = writable({
	alwaysStayAwake: { name: "always keep screen awake", value: false },
});
