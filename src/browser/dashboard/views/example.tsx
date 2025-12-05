import {render} from "../../render";
import {useReplicant} from "../../use-replicant";

const App = () => {
	const example = useReplicant("example");

	return (
		<div id='container'>
			<div>This is Panel.</div>
			<div>text: {example?.text}</div>
			<div>age: {example?.age}</div>
			<button onClick={() => nodecg.sendMessage("resetAge")}>reset age</button>
		</div>
	);
};

render(
	<>
		<App />
	</>,
);
