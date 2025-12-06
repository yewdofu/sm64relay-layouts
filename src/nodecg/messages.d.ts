import {Runners, Sound, Teams} from "./replicants";

export type MessageMap = {
	resetAge;
	updateRunners: Runners;
	updateTeams: Teams;
	updateSound: Sound;
	"timer:start": unknown;
	"timer:stop": unknown;
	"timer:reset": unknown;
	"timer:setInitialTime": {minutes: number; seconds: number};
};
