import {Example} from "./generated/example";

type Assets = {
	base: string;
	bundleName: string;
	category: string;
	ext: string;
	name: string;
	sum: string;
	url: string;
};

type Teams = {
	east: string[];
	west: string[];
	south: string[];
	north: string[];
};

type Runners = {
	east?: string;
	west?: string;
	south?: string;
	north?: string;
};

type Sound = {
	east: boolean;
	west: boolean;
	south: boolean;
	north: boolean;
};

export interface Timer {
	raw: number;
	timeAtPaused: number;
	initialTime: number;
	state: "NotRunning" | "Running" | "Paused";
	formattedTime: string;
}

type ReplicantMap = {
	"assets:test": Assets[];
	example: Example;
	teams: Teams;
	runners: Runners;
	sound: Sound;
	timer: Timer;
};

export {ReplicantMap, Runners, Sound, Teams};
