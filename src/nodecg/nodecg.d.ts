import Browser from "ts-nodecg/browser";
import Server from "ts-nodecg/server";
import {Configschema as BundleConfig} from "./generated/configschema";
import {MessageMap} from "./messages";
import {ReplicantMap} from "./replicants";

export type ServerNodecgInstance = Server.CreateNodecgInstance<
	"sm64relay-layouts",
	BundleConfig,
	ReplicantMap,
	MessageMap
>;

export type BrowserNodecgInstance = Browser.CreateNodecgInstance<
	"sm64relay-layouts",
	BundleConfig,
	ReplicantMap,
	MessageMap
>;

export type BrowserNodecgConstructor = Browser.CreateNodecgConstructor<
	"sm64relay-layouts",
	BundleConfig,
	ReplicantMap,
	MessageMap
>;
