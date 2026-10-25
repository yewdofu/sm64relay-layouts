import {type CSSProperties, useState} from "react";
import {render} from "../../render";
import {TEAM_NAMES, type Team, useTeams} from "../../teams";
import {NumberInput} from "../components/NumberInput";

const styles = {
	root: {
		padding: 8,
		color: "#fff",
		fontFamily: "sans-serif",
		fontSize: 14,
	},
	team: {
		display: "grid",
		gap: 6,
		padding: "8px 0",
		borderTop: "1px solid rgba(255, 255, 255, 0.15)",
	},
	header: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 8,
	},
	coordinates: {
		display: "flex",
		gap: 8,
	},
	runners: {
		margin: 0,
		paddingLeft: 24,
	},
	runner: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 8,
	},
	removeButton: {
		cursor: "pointer",
	},
	form: {
		display: "flex",
		gap: 8,
	},
	nameInput: {
		flex: 1,
		minWidth: 0,
	},
	muted: {
		opacity: 0.6,
	},
} satisfies Record<string, CSSProperties>;

const TeamSetup = ({
	label,
	team,
	onChange,
}: {
	label: string;
	team: Team;
	onChange: (update: (team: Team) => void) => void;
}) => {
	const [name, setName] = useState("");

	const addRunner = () => {
		const trimmed = name.trim();
		if (trimmed === "") return;
		onChange((current) => {
			current.runners.push(trimmed);
		});
		setName("");
	};

	const removeRunner = (runnerIndex: number) => {
		const runner = team.runners[runnerIndex];
		if (!window.confirm(`${label}から「${runner}」を削除しますか？`)) return;
		onChange((current) => {
			// 表示後に他の操作で並びが変わっていたら、別の走者を消さないよう何もしない
			if (current.runners[runnerIndex] !== runner) return;
			current.runners.splice(runnerIndex, 1);
			if (
				runnerIndex < current.currentIndex ||
				current.currentIndex >= current.runners.length
			) {
				current.currentIndex = Math.max(current.currentIndex - 1, 0);
			}
		});
	};

	return (
		<div style={styles.team}>
			<div style={styles.header}>
				<span>{label}</span>
				<div style={styles.coordinates}>
					<NumberInput
						label='X'
						value={team.x}
						onChange={(x) =>
							onChange((current) => {
								current.x = x;
							})
						}
					/>
					<NumberInput
						label='Y'
						value={team.y}
						onChange={(y) =>
							onChange((current) => {
								current.y = y;
							})
						}
					/>
				</div>
			</div>
			{team.runners.length > 0 ? (
				<ol style={styles.runners}>
					{team.runners.map((runner, runnerIndex) => (
						<li key={runnerIndex}>
							<div style={styles.runner}>
								<span>{runner}</span>
								<button
									type='button'
									style={styles.removeButton}
									onClick={() => removeRunner(runnerIndex)}
								>
									×
								</button>
							</div>
						</li>
					))}
				</ol>
			) : (
				<span style={styles.muted}>走者が登録されていません</span>
			)}
			<form
				style={styles.form}
				onSubmit={(e) => {
					e.preventDefault();
					addRunner();
				}}
			>
				<input
					type='text'
					placeholder='走者名'
					value={name}
					style={styles.nameInput}
					onChange={(e) => setName(e.currentTarget.value)}
				/>
				<button
					type='submit'
					disabled={name.trim() === ""}
				>
					登録
				</button>
			</form>
		</div>
	);
};

export const RunnerSetup = () => {
	const [teams, updateTeam] = useTeams();

	return (
		<div style={styles.root}>
			{teams?.map((team, index) => (
				<TeamSetup
					key={index}
					label={`${TEAM_NAMES[index]}チーム`}
					team={team}
					onChange={(update) => updateTeam(index, update)}
				/>
			))}
		</div>
	);
};

render(<RunnerSetup />);
