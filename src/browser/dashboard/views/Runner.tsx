import type {CSSProperties} from "react";
import {render} from "../../render";
import {TEAM_NAMES, type Team, useTeams} from "../../teams";

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
	},
	navigation: {
		display: "grid",
		gridTemplateColumns: "auto 1fr auto",
		alignItems: "center",
		gap: 8,
	},
	arrowButton: {
		width: 48,
		height: 36,
		fontSize: 18,
		cursor: "pointer",
	},
	current: {
		textAlign: "center",
		fontSize: 18,
		fontWeight: "bold",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	},
	muted: {
		opacity: 0.6,
	},
} satisfies Record<string, CSSProperties>;

const TeamSwitch = ({
	label,
	team,
	onChange,
}: {
	label: string;
	team: Team;
	onChange: (update: (team: Team) => void) => void;
}) => {
	const {runners, currentIndex} = team;

	const move = (offset: number) => {
		onChange((current) => {
			const newIndex = current.currentIndex + offset;
			if (newIndex >= 0 && newIndex < current.runners.length) {
				current.currentIndex = newIndex;
			}
		});
	};

	return (
		<div style={styles.team}>
			<div style={styles.header}>
				<span>{label}</span>
				<span style={styles.muted}>
					{runners.length > 0 ? `${currentIndex + 1} / ${runners.length}` : "-"}
				</span>
			</div>
			<div style={styles.navigation}>
				<button
					type='button'
					style={styles.arrowButton}
					disabled={currentIndex <= 0}
					onClick={() => move(-1)}
				>
					←
				</button>
				<span
					style={styles.current}
					title={runners[currentIndex]}
				>
					{runners[currentIndex] ?? <span style={styles.muted}>未登録</span>}
				</span>
				<button
					type='button'
					style={styles.arrowButton}
					disabled={currentIndex >= runners.length - 1}
					onClick={() => move(1)}
				>
					→
				</button>
			</div>
		</div>
	);
};

export const Runner = () => {
	const [teams, updateTeam] = useTeams();

	return (
		<div style={styles.root}>
			{teams?.map((team, index) => (
				<TeamSwitch
					key={index}
					label={`${TEAM_NAMES[index]}チーム`}
					team={team}
					onChange={(update) => updateTeam(index, update)}
				/>
			))}
		</div>
	);
};

render(<Runner />);
