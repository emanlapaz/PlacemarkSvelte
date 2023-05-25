<script lang="ts">
	// @ts-ignore
	import Chart from "svelte-frappe-charts";
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import type { ChartData } from "../../services/charts";
	import { onMount } from "svelte";
	import { contributionService } from "../../services/contribution-service";
	import { generateByLocation, generateByCategory } from "../../services/contribution-utils";

	let byLocation: ChartData;
	let byCategory: ChartData;

	onMount(async () => {
		contributionService.checkPageRefresh();

		const contributions = await contributionService.getContributions();
		const contributionsByLocation = await contributionService.getContributionsByLocations();
		byCategory = generateByCategory(contributions);
		byLocation = generateByLocation(contributionsByLocation);
	});
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns">
	<div class="column box has-text-centered">
		<h1 class="title is-4">Contribution By Category</h1>
		<Chart data={byCategory} type="bar" />
	</div>
	<div class="column box has-text-centered">
		<h1 class="title is-4">Contributions to date</h1>
		<Chart data={byLocation} type="pie" />
	</div>
</div>
