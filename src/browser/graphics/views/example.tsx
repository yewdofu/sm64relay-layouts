import styled from "@emotion/styled";
import '@fontsource/m-plus-1p/400.css';
import '@fontsource/m-plus-1p/500.css';
import '@fontsource/m-plus-1p/700.css';
import '@fontsource/m-plus-1p/800.css';
import {render} from "../../render";
import {useReplicant} from "../../use-replicant";
import {Timer} from "../components/timer";
import SoundIcon from "./Speaker_Icon.svg";

const Sound = styled.img`
	width: 56px;
	height: 56px;
	filter: invert(17%) sepia(91%) saturate(7085%) hue-rotate(45deg) brightness(100%) contrast(106%);
`;

const Container = styled.div`
	position: absolute;
	font-family: 'M PLUS 1p', sans-serif;
	width: 1920px;
	height: 1080px;
	color: white;
	top: 0;
	left: 0;
`;

const Layout = () => {
	const runners = useReplicant("runners");
	const sound = useReplicant("sound");

	return (
		<Container>
			<div
				style={{
					position: "absolute",
					top: "445px",
					left: "185px",
					fontSize: 52,
					textAlign: "center",
				}}
			>
				{runners?.east}
			</div>
			{sound?.east && (
				<Sound
					src={SoundIcon}
					style={{
						position: "absolute",
						top: "455px",
						left: "670px",
					}}
				/>
			)}
			<div
				style={{
					position: "absolute",
					top: "445px",
					left: "920px",
					fontSize: 52,
					textAlign: "center",
				}}
			>
				{runners?.west}
			</div>
			{sound?.west && (
				<Sound
					src={SoundIcon}
					style={{
						position: "absolute",
						top: "455px",
						left: "1400px",
					}}
				/>
			)}
			<div
				style={{
					position: "absolute",
					top: "545px",
					left: "185px",
					fontSize: 52,
					textAlign: "center",
				}}
			>
				{runners?.south}
			</div>
			{sound?.south && (
				<Sound
					src={SoundIcon}
					style={{
						position: "absolute",
						top: "555px",
						left: "670px",
					}}
				/>
			)}
			<div
				style={{
					position: "absolute",
					top: "545px",
					left: "920px",
					fontSize: 52,
					textAlign: "center",
				}}
			>
				{runners?.north}
			</div>
			{sound?.north && (
				<Sound
					src={SoundIcon}
					style={{
						position: "absolute",
						top: "555px",
						left: "1400px",
					}}
				/>
			)}
			<Timer
				fontSize={84}
				x={1512}
				y={150}
			/>
		</Container>
	);
};

render(<Layout />);
