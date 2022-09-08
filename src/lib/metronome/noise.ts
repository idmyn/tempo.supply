import { Howl } from "howler";
import pathToSound from "../../assets/sound.mp3";

const sound = new Howl({
	src: [pathToSound],
});

export const makeNoise = () => {
	sound.play();
};
