import type {CSSProperties} from "react";
import {render} from "../../render";
import {
	type SoundIconTarget,
	useObsAudioInputs,
	useSoundIconSize,
	useSoundIconTargets,
	useSoundIconUrl,
} from "../../sound-icon";

const styles = {
	root: {
		padding: 8,
		color: "#fff",
		fontFamily: "sans-serif",
		fontSize: 14,
	},
	header: {
		display: "flex",
		alignItems: "center",
		gap: 8,
		marginBottom: 8,
	},
	preview: {
		maxWidth: 64,
		maxHeight: 64,
	},
	notice: {
		opacity: 0.6,
		marginBottom: 8,
	},
	row: {
		display: "grid",
		gridTemplateColumns: "auto 1fr auto auto",
		alignItems: "center",
		gap: 8,
		padding: "6px 0",
		borderTop: "1px solid rgba(255, 255, 255, 0.15)",
	},
	name: {
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	},
	number: {
		width: 64,
	},
} satisfies Record<string, CSSProperties>;

const NumberInput = ({
	label,
	value,
	disabled,
	onChange,
}: {
	label: string;
	value: number;
	disabled?: boolean;
	onChange: (value: number) => void;
}) => (
	<label>
		{label}{" "}
		<input
			type='number'
			value={value}
			disabled={disabled}
			style={styles.number}
			onChange={(e) => {
				const newValue = e.currentTarget.valueAsNumber;
				if (Number.isFinite(newValue)) onChange(newValue);
			}}
		/>
	</label>
);

export const SoundIcon = () => {
	const audioInputs = useObsAudioInputs();
	const [targets, setTargets] = useSoundIconTargets();
	const [size, setSize] = useSoundIconSize();
	const iconUrl = useSoundIconUrl();

	const findTarget = (inputName: string) =>
		targets?.find((t) => t.inputName === inputName);

	const setEnabled = (inputName: string, enabled: boolean) => {
		const others = targets?.filter((t) => t.inputName !== inputName) ?? [];
		setTargets(enabled ? [...others, {inputName, x: 0, y: 0}] : others);
	};

	const updateTarget = (inputName: string, patch: Partial<SoundIconTarget>) => {
		setTargets(
			targets?.map((t) => (t.inputName === inputName ? {...t, ...patch} : t)) ??
				[],
		);
	};

	return (
		<div style={styles.root}>
			<div style={styles.header}>
				{iconUrl ? (
					<img
						src={iconUrl}
						alt='音マーク'
						style={styles.preview}
					/>
				) : (
					<span style={styles.notice}>
						Assets の「音マーク画像」に画像をアップロードしてください
					</span>
				)}
				<NumberInput
					label='サイズ'
					value={size ?? 0}
					onChange={(newSize) => {
						if (newSize >= 1) setSize(newSize);
					}}
				/>
			</div>
			{audioInputs?.length ? (
				audioInputs.map((input) => {
					const target = findTarget(input.inputName);
					return (
						<div
							key={input.inputUuid}
							style={styles.row}
						>
							<input
								type='checkbox'
								checked={target !== undefined}
								onChange={(e) =>
									setEnabled(input.inputName, e.currentTarget.checked)
								}
							/>
							<span
								style={styles.name}
								title={input.inputName}
							>
								{input.inputName}
							</span>
							<NumberInput
								label='X'
								value={target?.x ?? 0}
								disabled={!target}
								onChange={(x) => updateTarget(input.inputName, {x})}
							/>
							<NumberInput
								label='Y'
								value={target?.y ?? 0}
								disabled={!target}
								onChange={(y) => updateTarget(input.inputName, {y})}
							/>
						</div>
					);
				})
			) : (
				<div style={styles.notice}>
					OBS に接続されていないか、音声ソースがありません
				</div>
			)}
		</div>
	);
};

render(<SoundIcon />);
