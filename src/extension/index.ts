import {ServerNodecgInstance} from "../nodecg/nodecg";
// import {example} from "./example";
import {runner} from "./runner";
import {sound} from "./sound";
import timer from "./timer";

export default (nodecg: ServerNodecgInstance) => {
	// example(nodecg);
	runner(nodecg);
	sound(nodecg);
	timer(nodecg);
};
