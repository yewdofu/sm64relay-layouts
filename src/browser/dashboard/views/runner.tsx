import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import {useRef} from "react";
import {Teams} from "../../../nodecg/replicants";
import {render} from "../../render";
import {useReplicant} from "../../use-replicant";

export const Runner = () => {
	const teams = useReplicant("teams");
	const runners = useReplicant("runners");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = () => {
		fileInputRef.current?.click();
	};

	const handleRunnerChange = (
		direction: "east" | "west" | "south" | "north",
		value: string,
	) => {
		const updatedRunners = {
			...(runners || {}),
			[direction]: value,
		};
		(nodecg.sendMessage as any)("updateRunners", updatedRunners);
	};

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const text = await file.text();
		const lines = text.trim().split("\n");

		// ヘッダー行をパース（東,西,南,北）
		const headers = lines[0]?.split(",");
		if (!headers) return;

		// 方向のマッピング
		const directionMap: Record<string, keyof Teams> = {
			東: "east",
			西: "west",
			南: "south",
			北: "north",
		};

		// 初期化
		const teamsData: Teams = {
			east: [],
			west: [],
			south: [],
			north: [],
		};

		// データ行をパース
		for (let i = 1; i < lines.length; i++) {
			const line = lines[i];
			if (!line) continue;
			const values = line.split(",");
			headers.forEach((header, index) => {
				const direction = directionMap[header.trim()];
				if (direction && values[index]) {
					teamsData[direction].push(values[index].trim());
				}
			});
		}

		// Replicantに保存
		(nodecg.sendMessage as any)("updateTeams", teamsData);

		// 入力をリセット
		event.target.value = "";
	};

	return (
		<Box sx={{p: 2}}>
			<Typography
				variant='h6'
				gutterBottom
			>
				走者管理
			</Typography>

			<Box sx={{mb: 2}}>
				<input
					type='file'
					ref={fileInputRef}
					onChange={handleFileChange}
					accept='.csv'
					style={{display: "none"}}
				/>
				<Button
					variant='contained'
					onClick={handleFileSelect}
				>
					CSVを読み込む
				</Button>
			</Box>

			{teams && (
				<Box sx={{mt: 3}}>
					<Typography
						variant='subtitle1'
						gutterBottom
					>
						走者選択:
					</Typography>
					<Box
						sx={{
							display: "grid",
							gap: 2,
							gridTemplateColumns: "repeat(2, 1fr)",
						}}
					>
						<FormControl fullWidth>
							<InputLabel>東 (East)</InputLabel>
							<Select
								value={runners?.east || ""}
								label='東 (East)'
								onChange={(e) => handleRunnerChange("east", e.target.value)}
								sx={{backgroundColor: "white"}}
							>
								{(teams.east ?? []).map((runner) => (
									<MenuItem
										key={runner}
										value={runner}
									>
										{runner}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl fullWidth>
							<InputLabel>西 (West)</InputLabel>
							<Select
								value={runners?.west || ""}
								label='西 (West)'
								onChange={(e) => handleRunnerChange("west", e.target.value)}
								sx={{backgroundColor: "white"}}
							>
								{(teams.west ?? []).map((runner) => (
									<MenuItem
										key={runner}
										value={runner}
									>
										{runner}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl fullWidth>
							<InputLabel>南 (South)</InputLabel>
							<Select
								value={runners?.south || ""}
								label='南 (South)'
								onChange={(e) => handleRunnerChange("south", e.target.value)}
								sx={{backgroundColor: "white"}}
							>
								{(teams.south ?? []).map((runner) => (
									<MenuItem
										key={runner}
										value={runner}
									>
										{runner}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl fullWidth>
							<InputLabel>北 (North)</InputLabel>
							<Select
								value={runners?.north || ""}
								label='北 (North)'
								onChange={(e) => handleRunnerChange("north", e.target.value)}
								sx={{backgroundColor: "white"}}
							>
								{(teams.north ?? []).map((runner) => (
									<MenuItem
										key={runner}
										value={runner}
									>
										{runner}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				</Box>
			)}
		</Box>
	);
};

render(
	<>
		<Runner />
	</>,
);
