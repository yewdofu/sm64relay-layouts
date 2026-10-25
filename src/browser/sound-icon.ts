import {useReplicant} from "@nodecg/react-hooks";
import type {ObsAudioInputs} from "../../bundles/nodecg-obs-websocket/src/types/generated/obsAudioInputs";
import type {Assets} from "../types/assets";
import type {SoundIconSize} from "../types/generated/soundIconSize";
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

/** 全マーク共通の幅 (px)。高さは画像の縦横比に合わせる */
export const useSoundIconSize = () =>
	useReplicant<SoundIconSize>("soundIconSize");

/** 画像は一種類のみ使うので、複数アップロードされていても先頭を使う */
export const useSoundIconUrl = () =>
	useReplicant<Assets[]>(`assets:${ASSET_CATEGORY}`)[0]?.[0]?.url;
