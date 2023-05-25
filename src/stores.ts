import {writable} from "svelte/store";
import type { Contribution, LoggedInUser } from "./services/contribution-types";
import type { MarkerSpec } from "./services/markers";

export const loggedInUser = writable<LoggedInUser>();
export const latestContribution = writable<Contribution>();
export const markerSelected = writable<MarkerSpec>();
