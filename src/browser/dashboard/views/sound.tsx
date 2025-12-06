import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {render} from "../../render";
import {useReplicant} from "../../use-replicant";

export const Sound = () => {
	const sound = useReplicant("sound");

	const getCurrentValue = () => {
		if (sound?.east) return "east";
		if (sound?.west) return "west";
		if (sound?.south) return "south";
		if (sound?.north) return "north";
		return "";
	};

	const handleSoundChange = (
		direction: "east" | "west" | "south" | "north",
	) => {
		const updatedSound = {
			east: direction === "east",
			west: direction === "west",
			south: direction === "south",
			north: direction === "north",
		};
		(nodecg.sendMessage as any)("updateSound", updatedSound);
	};

	return (
		<RadioGroup
			value={getCurrentValue()}
			onChange={(e) => handleSoundChange(e.target.value as any)}
		>
			<FormControlLabel
				value='east'
				control={<Radio />}
				label='東'
			/>
			<FormControlLabel
				value='west'
				control={<Radio />}
				label='西'
			/>
			<FormControlLabel
				value='south'
				control={<Radio />}
				label='南'
			/>
			<FormControlLabel
				value='north'
				control={<Radio />}
				label='北'
			/>
		</RadioGroup>
	);
};

render(
	<>
		<Sound />
	</>,
);
