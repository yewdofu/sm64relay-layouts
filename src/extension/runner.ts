import {ServerNodecgInstance} from "../nodecg/nodecg";
import {Runners, Sound, Teams} from "../nodecg/replicants";

export const runner = (nodecg: ServerNodecgInstance) => {
	const runnersReplicant = nodecg.Replicant("runners");
	const teamsReplicant = nodecg.Replicant("teams");
	const soundReplicant = nodecg.Replicant("sound");

	const updateRunners = (data: unknown) => {
		runnersReplicant.value = data as Runners;
	};

	const updateTeams = (data: unknown) => {
		teamsReplicant.value = data as Teams;
	};

	const updateSound = (data: unknown) => {
		soundReplicant.value = data as Sound;
	};

	nodecg.listenFor("updateRunners", updateRunners);
	nodecg.listenFor("updateTeams", updateTeams);
	nodecg.listenFor("updateSound", updateSound);
};
