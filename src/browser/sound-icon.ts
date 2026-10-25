import {useReplicant} from "@nodecg/react-hooks";
import type {ObsAudioInputs} from "../../bundles/nodecg-obs-websocket/src/types/generated/obsAudioInputs";
import type {Assets} from "../types/assets";
import type {SoundIconTargets} from "../types/generated/soundIconTargets";

export type SoundIconTarget = SoundIconTargets[number];

/** package.json の assetCategories に登録した音マーク画像のカテゴリ */
const ASSET_CATEGORY = "soundIcon";

export const useObsAudioInputs = () =>
	useReplicant<ObsAudioInputs>("obsAudioInputs", {
		bundle: "nodecg-obs-websocket",
	})[0];

export const useSoundIconTargets = () =>
	useReplicant<SoundIconTargets>("soundIconTargets");

/** 画像は一種類のみ使うので、複数アップロードされていても先頭を使う */
export const useSoundIconUrl = () =>
	useReplicant<Assets[]>(`assets:${ASSET_CATEGORY}`)[0]?.[0]?.url;
