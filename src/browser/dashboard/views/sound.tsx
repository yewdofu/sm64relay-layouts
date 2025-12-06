import {Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, Switch, Box, Typography} from "@mui/material";
import {useState} from "react";
import {render} from "../../render";
import {useReplicant} from "../../use-replicant";

export const Sound = () => {
	const sound = useReplicant("sound");
	const [isMultiSelect, setIsMultiSelect] = useState(false);

	const getCurrentValue = () => {
		if (sound?.east) return "east";
		if (sound?.west) return "west";
		if (sound?.south) return "south";
		if (sound?.north) return "north";
		return "";
	};

	const handleRadioChange = (
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

	const handleCheckboxChange = (
		direction: "east" | "west" | "south" | "north",
		checked: boolean,
	) => {
		const updatedSound = {
			...sound,
			[direction]: checked,
		};
		(nodecg.sendMessage as any)("updateSound", updatedSound);
	};

	return (
		<Box>
			<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
				<Typography>単一選択</Typography>
				<Switch
					checked={isMultiSelect}
					onChange={(e) => setIsMultiSelect(e.target.checked)}
				/>
				<Typography>複数選択</Typography>
			</Box>

			{isMultiSelect ? (
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={sound?.east || false}
								onChange={(e) => handleCheckboxChange("east", e.target.checked)}
							/>
						}
						label='東'
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={sound?.west || false}
								onChange={(e) => handleCheckboxChange("west", e.target.checked)}
							/>
						}
						label='西'
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={sound?.south || false}
								onChange={(e) => handleCheckboxChange("south", e.target.checked)}
							/>
						}
						label='南'
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={sound?.north || false}
								onChange={(e) => handleCheckboxChange("north", e.target.checked)}
							/>
						}
						label='北'
					/>
				</FormGroup>
			) : (
				<RadioGroup
					value={getCurrentValue()}
					onChange={(e) => handleRadioChange(e.target.value as any)}
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
			)}
		</Box>
	);
};

render(
	<>
		<Sound />
	</>,
);
