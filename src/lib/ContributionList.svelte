<script>
	// @ts-nocheck
	import { onMount } from "svelte";
	import { contributionService } from "../services/contribution-service";

	let contributionList = [];
	onMount(async () => {
		contributionList = await contributionService.getContributions();
	});
</script>

<table class="table is-fullwidth">
	<thead>
		<th>Name</th>
		<th>Description</th>
		<th>Latitude</th> 
		<th>Longitude</th>
		<th>Category</th>
		<th>Contributor</th> <!-- user to donor??-->
		
	</thead>
	<tbody>
		{#each contributionList as contribution}
			<tr>
				<td>
					{contribution.placemarkName}
				</td>
				<td>
					{contribution.description}
				</td>
				<td>
					{contribution.lat}
				</td>
				<td>
					{contribution.lng}
				</td>
				<td>
					{contribution.category.type}, {contribution.category.location}
				</td>
				<td>
					{contribution.contributor.firstName} {contribution.contributor.lastName}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<!--refactor this to apply to placemarkBeta
amount to location add lat/long
Method to Category
Cadidate to ????
Donor to User
--> 