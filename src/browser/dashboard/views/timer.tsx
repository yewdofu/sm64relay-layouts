import styled from "@emotion/styled";
import {Pause, PlayArrow, RestartAlt} from "@mui/icons-material";
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {render} from "../../render";
import {useReplicant} from "../../use-replicant";

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-rows: 72px auto 1fr;
	grid-template-areas:
		"timer"
		"initialTime"
		"ctrls";
	justify-items: center;
	align-items: center;
	gap: 8px 0;
`;

const Timer = styled.div<{color: string}>`
	grid-area: timer;
	padding: 0 16px;
	font-size: 48px;
	font-weight: 700;
	border-radius: 16px;
	color: ${(props) => props.color};
`;

const InitialTimeContainer = styled.div`
	grid-area: initialTime;
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 16px;
`;

const ButtonContainer = styled.div`
	display: grid;
	grid-area: ctrls;
	justify-items: center;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 0 8px;
`;

const PlayButton = (props: {onClick: () => void; disabled: boolean}) => {
	return (
		<Button
			variant='contained'
			startIcon={<PlayArrow />}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			START
		</Button>
	);
};

const PauseButton = (props: {onClick: () => void; disabled: boolean}) => {
	return (
		<Button
			variant='contained'
			startIcon={<Pause />}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			PAUSE
		</Button>
	);
};

const ResetButton = (props: {onClick: () => void; disabled: boolean}) => {
	return (
		<Button
			variant='contained'
			startIcon={<RestartAlt />}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			RESET
		</Button>
	);
};
export const ControlTimer = () => {
	const timer = useReplicant("timer");
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	const color = (): string => {
		if (timer) {
			// マイナスの時はグレーのまま
			if (timer.raw < 0) {
				return "#525252";
			}

			if (timer.state === "Running") {
				return "rgb(0, 186, 69)";
			}

			if (timer.state === "Paused") {
				return "rgb(230, 176, 0)";
			}

			return "";
		}
		return "";
	};

	const handleSetInitialTime = () => {
		nodecg.sendMessage("timer:setInitialTime", {minutes, seconds});
	};

	return (
		<>
			<Container>
				<Timer color={color()}>{timer?.formattedTime}</Timer>
				<InitialTimeContainer>
					<TextField
						label="分"
						type="number"
						value={minutes}
						onChange={(e) => setMinutes(Number(e.target.value))}
						size="small"
						style={{width: "100px"}}
					/>
					<TextField
						label="秒"
						type="number"
						value={seconds}
						onChange={(e) => setSeconds(Number(e.target.value))}
						size="small"
						style={{width: "100px"}}
					/>
					<Button variant="contained" onClick={handleSetInitialTime}>
						初期時間設定
					</Button>
				</InitialTimeContainer>
				<ButtonContainer>
					<PlayButton
						onClick={() => nodecg.sendMessage("timer:start")}
						disabled={timer?.state === "Running"}
					/>
					<PauseButton
						onClick={() => nodecg.sendMessage("timer:stop")}
						disabled={timer?.state !== "Running"}
					/>
					<ResetButton
						onClick={() => nodecg.sendMessage("timer:reset")}
						disabled={timer?.state === "NotRunning"}
					/>
				</ButtonContainer>
			</Container>
		</>
	);
};

render(
	<>
		<ControlTimer />
	</>,
);
