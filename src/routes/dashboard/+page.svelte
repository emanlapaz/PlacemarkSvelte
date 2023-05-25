<script lang="ts">
	// @ts-ignore
	import Chart from "svelte-frappe-charts";
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import type { ChartData } from "../../services/charts";
	import { onMount } from "svelte";
	import { contributionService } from "../../services/contribution-service";
	import { generateByLocation, generateByCategory, getMarkerLayer } from "../../services/contribution-utils";
	import LeafletMap from "$lib/LeafletMap.svelte";
	import ContributeForm from "$lib/ContributeForm.svelte";
	import ContributionList from "$lib/ContributionList.svelte";
	import type { Location, Contribution } from "../../services/contribution-types";
	import { latestContribution} from "../../stores";

	let byLocation: ChartData;
	let locationList: Location[] = [];
	let contributions: Contribution[] = [];
	let map: LeafletMap;

	async function refreshDashboard() {
		contributions = await contributionService.getContributions();
		locationList = await contributionService.getLocations();
		const contributionMarkerLayer = getMarkerLayer(contributions);
		if (contributions.length > 0) {
			const contributionsByLocation = await contributionService.getContributionsByLocations();
			byLocation = generateByLocation(contributionsByLocation);
			map.populateLayer(contributionMarkerLayer);
			const lastMarker = contributionMarkerLayer.markerSpecs[contributionMarkerLayer.markerSpecs.length - 1];
			map.moveTo(lastMarker.location, 8);
		}
	}
	
	onMount(async () => {
		contributionService.checkPageRefresh();
		await refreshDashboard();
	});

	latestContribution.subscribe(async (contribution) => {
		await refreshDashboard();
	});
</script>

<Header>
	<MainNavigator />
</Header>


	
	<div class="column box has-text-centered">
		<h1 class="title is-4">Placemark Locations</h1>
		<LeafletMap height={40} bind:this={map} />
	</div>
<div class="columns m-2 p-2"></div>
	<div class="column box has-text-centered">
		<h1 class="title is-4">Add a Placemark</h1>
		<ContributeForm {locationList} />
	</div>
	<div class="column box has-text-centered">
		<h1 class="title is-4">Placemark Contribution List</h1>
		<ContributionList {contributions} />
	</div>
	<div class="columns">
		<div class="column is-half">
			<div class="box has-text-centered">
				<h1 class="title is-4">Graphs and Charts</h1>
				<Chart data={byLocation} type="pie" />
			</div>
		</div>
		<div class="column is-half">
			<div class="box has-text-centered">
				<h1 class="title is-4">Graphs and Charts</h1>
				<Chart data={byLocation} type="pie" />
			</div>
		</div>
	</div>
	
	