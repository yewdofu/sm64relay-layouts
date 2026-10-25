import {useReplicant} from "@nodecg/react-hooks";
import type {Teams} from "../types/generated/teams";

export type Team = Teams[number];

/** Replicant teams の並び順に対応するチーム名 */
export const TEAM_NAMES = ["青", "黒", "赤", "黄", "緑"];

export const useTeams = () => {
	const [teams, setTeams] = useReplicant<Teams>("teams");

	// 表示中の値からチームを作り直して代入すると他の項目まで上書きしてしまうので、
	// Replicant の現在値の必要な項目だけを書き換える
	const updateTeam = (index: number, update: (team: Team) => void) => {
		setTeams((current) => {
			const team = current?.[index];
			if (team) update(team);
		});
	};

	return [teams, updateTeam] as const;
};
