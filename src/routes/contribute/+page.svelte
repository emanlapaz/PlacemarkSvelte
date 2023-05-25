<script lang="ts">
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import { onMount } from "svelte";
	import { contributionService } from "../../services/contribution-service";
	import type { Location, Contribution } from "../../services/contribution-types";
	import ContributeForm from "../../lib/ContributeForm.svelte";
	import ContributionList from "$lib/ContributionList.svelte";
	import { latestContribution } from "../../stores";

	
	let locationList: Location[] = [];
	let contributions: Contribution[] = [];

	onMount(async () => {
		contributionService.checkPageRefresh();
		locationList = await contributionService.getLocations();
		contributions = await contributionService.getContributions();
	});

	latestContribution.subscribe(async (contribution) => {
		contributions = await contributionService.getContributions();
	});
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns">
	<div class="column has-text-centered">
		<h1 class="title is-4">Contribution by Location</h1>
		<ContributionList {contributions} />
	</div>
	<div class="column box has-text-centered">
		<h1 class="title is-4">Make a Contribution</h1>
		<ContributeForm {locationList} />
	</div>
</div>
