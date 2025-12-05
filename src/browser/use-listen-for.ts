import {useEffect} from "react";
import {MessageMap} from "../nodecg/messages";

export const useListenFor = <TMessageName extends keyof MessageMap>(
	messageName: TMessageName,
	handler: (
		data: MessageMap[TMessageName] extends {data: infer TData}
			? TData
			: MessageMap[TMessageName],
	) => void,
): void => {
	useEffect(() => {
		nodecg.listenFor(messageName, handler as any);
		return () => {
			nodecg.unlisten(messageName, handler as any);
		};
	}, [handler, messageName]);
};
