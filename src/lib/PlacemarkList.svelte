<script>
	// @ts-nocheck
	import { onMount } from "svelte";
	import { placemarkService } from "../services/placemark-service";

	let placemarkList = [];
	onMount(async () => {
		placemarkList = await placemarkService.getPlacemarks();
	});
</script>

<table class="table is-fullwidth">
	<thead>
		<th>Name</th> 
		<th>Latitude</th> 
		<th>Longitude</th>
		<th>Category</th>
		<th>Contributor</th> <!-- user to donor??-->
		<th>Description</th>
	</thead>
	<tbody>
		{#each placemarkList as placemark}
			<tr>
				<td>
					{placemark.placemarkName}
				</td>
				<td>
					{placemark.latitude}
				</td>
				<td>
					{placemark.longitude}
				</td>
				<td>
					{placemark.category}
				</td>
				<td>
					{placemark.user.firstName} {placemark.user.lastName}<!-- donor to user-->
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