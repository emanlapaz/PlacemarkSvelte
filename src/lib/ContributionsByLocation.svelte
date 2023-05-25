<script lang="ts">
	import Chart from "svelte-frappe-charts";
	import type { LocationContributions, ChartData } from "../services/contribution-types";

	export let locationContributions: LocationContributions[];

	let totalByLocation: ChartData = {
		labels: [],
		datasets: [
			{
				values: []
			}
		]
	};

	locationContributions.forEach((contributionByLocation) => {
		const label = `${contributionByLocation.location.town}, ${contributionByLocation.location.county}`;
		totalByLocation.labels.push(label);
		let total = 0;
		contributionByLocation.contributions.forEach((contribution) => {
			total += contribution.rating;
		});
		totalByLocation.datasets[0].values.push(total);
	});
</script>

<h1 class="title is-4">By Location</h1>
<Chart data={totalByLocation} type="bar" />
