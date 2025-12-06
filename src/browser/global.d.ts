import {
	BrowserNodecgConstructor,
	BrowserNodecgInstance,
} from "../nodecg/nodecg";

declare global {
	const nodecg: BrowserNodecgInstance;
	const NodeCG: BrowserNodecgConstructor;
}

declare module "*.svg?react" {
	import {FC, SVGProps} from "react";
	const content: FC<SVGProps<SVGSVGElement>>;
	export default content;
}
