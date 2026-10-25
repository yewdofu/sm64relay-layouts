import {render} from "../../render";
import {
	useObsAudioInputs,
	useSoundIconSize,
	useSoundIconTargets,
	useSoundIconUrl,
} from "../../sound-icon";

const SoundIcons = () => {
	const audioInputs = useObsAudioInputs();
	const [targets] = useSoundIconTargets();
	const [size] = useSoundIconSize();
	const iconUrl = useSoundIconUrl();

	if (!iconUrl || size === undefined) return null;

	// OBS 未接続時は audioInputs が空になるので、マークも全て非表示になる
	return targets?.map((target) => {
		const input = audioInputs?.find((i) => i.inputName === target.inputName);
		if (!input || input.inputMuted) return null;
		return (
			<img
				key={target.inputName}
				src={iconUrl}
				alt=''
				style={{
					position: "absolute",
					left: target.x,
					top: target.y,
					width: size,
				}}
			/>
		);
	});
};

export const Graphics = () => {
	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: 1920,
				height: 1080,
				overflow: "hidden",
			}}
		>
			<SoundIcons />
		</div>
	);
};

render(<Graphics />);
