import {ServerNodecgInstance} from "../nodecg/nodecg";

const formatTime = (ms: number | null | undefined) => {
	if (typeof ms !== "number") {
		return "";
	} else {
		const isNegative = ms < 0;
		const absoluteMs = Math.abs(ms);
		const totalSeconds = Math.floor(absoluteMs / 1000);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		const formattedHours = String(hours).padStart(1, "0");
		const formattedMinutes = String(minutes).padStart(2, "0");
		const formattedSeconds = String(seconds).padStart(2, "0");

		const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
		return isNegative ? `-${timeString}` : timeString;
	}
};

export default (nodecg: ServerNodecgInstance) => {
	const timerRep = nodecg.Replicant("timer");

	let startTime: Date | null = null;
	let timerInterval: NodeJS.Timeout | null = null;

	const startTimer = () => {
		if (timerInterval || !timerRep.value) {
			return;
		}
		startTime = new Date();
		timerRep.value.state = "Running";

		timerInterval = setInterval(() => {
			if (!timerRep.value) return;

			const elapsed = new Date().getTime() - startTime!.getTime();

			// マイナスの初期時間の場合は0に向かって進む（カウントアップ）
			// プラスの初期時間の場合も0から進む（カウントアップ）
			timerRep.value.raw = elapsed + timerRep.value.timeAtPaused;

			timerRep.value.formattedTime = formatTime(timerRep.value.raw);
		}, 500);
		nodecg.log.info("timer start");
	};

	const stopTimer = () => {
		if (!timerRep.value) {
			return;
		}

		if (timerInterval) {
			clearInterval(timerInterval);
			timerInterval = null;
			timerRep.value.timeAtPaused = timerRep.value.raw;
			timerRep.value.state = "Paused";
		}
		nodecg.log.info("timer stop");
	};

	const resetTimer = () => {
		if (!timerRep.value) {
			return;
		}

		stopTimer();
		timerRep.value.raw = timerRep.value.initialTime;
		timerRep.value.formattedTime = formatTime(timerRep.value.raw);
		timerRep.value.timeAtPaused = timerRep.value.initialTime;
		timerRep.value.state = "NotRunning";
		nodecg.log.info("timer reset");
	};

	const setInitialTime = (
		data: unknown,
		_cb?: {handled: true} | {<TError>(error: TError): void; handled: false}
	) => {
		if (!timerRep.value) {
			return;
		}

		const {minutes, seconds} = data as {minutes: number; seconds: number};
		const totalMs = (minutes * 60 + seconds) * 1000;
		timerRep.value.initialTime = totalMs;
		timerRep.value.raw = totalMs;
		timerRep.value.timeAtPaused = totalMs;
		timerRep.value.formattedTime = formatTime(totalMs);
		nodecg.log.info(`timer initial time set to ${minutes}:${seconds}`);
	};

	nodecg.listenFor("timer:start", startTimer);
	nodecg.listenFor("timer:stop", stopTimer);
	nodecg.listenFor("timer:reset", resetTimer);
	nodecg.listenFor("timer:setInitialTime", setInitialTime);
};
