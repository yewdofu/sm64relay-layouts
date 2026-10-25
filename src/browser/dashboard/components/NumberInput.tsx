export const NumberInput = ({
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
			style={{width: 64}}
			onChange={(e) => {
				const newValue = e.currentTarget.valueAsNumber;
				if (Number.isFinite(newValue)) onChange(newValue);
			}}
		/>
	</label>
);
