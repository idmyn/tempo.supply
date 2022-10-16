import { writable, type Writable } from "svelte/store";

export const isSettingsOpen = writable(false);

export const settings = persistStore("settings", {
	alwaysStayAwake: { name: "always keep screen awake", value: false },
});

function persistStore<T>(key: string, defaultValue: T): Writable<T> {
	let valueFromStorage;

	try {
		valueFromStorage = JSON.parse(localStorage.getItem(key));
	} catch (e) {
		valueFromStorage = null;
	}

	const valueToUse = writable(valueFromStorage ?? defaultValue);

	valueToUse.subscribe((newValue) => {
		localStorage.setItem(key, JSON.stringify(newValue));
	});

	return valueToUse;
}
