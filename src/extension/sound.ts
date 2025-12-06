import {ServerNodecgInstance} from "../nodecg/nodecg";
import {Sound} from "../nodecg/replicants";

export const sound = (nodecg: ServerNodecgInstance) => {
	const soundReplicant = nodecg.Replicant("sound");

	const updateSound = (data: unknown) => {
		soundReplicant.value = data as Sound;
		nodecg.log.info(soundReplicant.value);
	};

	nodecg.listenFor("updateSound", updateSound);
};
