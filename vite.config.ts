import path from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"src/": `${path.resolve(__dirname, "src")}/`,
		},
	},
	plugins: [
		svelte(),
		VitePWA({
			includeAssets: [
				"favicon.ico",
				"apple-touch-icon.png",
				"safari-pinned-tab.svg",
			],
			manifest: {
				name: "Metronome",
				short_name: "Metronome",
				description: "A simple ad-free metronome",
				theme_color: "#ffffff",
				icons: [
					{
						src: "android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "safari-pinned-tab.svg",
						sizes: "700x700",
						purpose: "maskable",
					},
				],
			},
		}),
	],
});
