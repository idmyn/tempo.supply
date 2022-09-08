import { Howl } from "howler";

const sound = new Howl({
	src: ["/src/assets/sound.mp3"],
});

export const makeNoise = () => {
	sound.play();
};
