<script lang="ts">
	import type { Contribution } from "../services/contribution-types";

	export let contributions: Contribution[];
</script>

<table class="table is-fullwidth">
	<thead>
		<th>Name</th>
		<th>Rating</th>
		<th>Description</th>
		<th>Latitude</th> 
		<th>Longitude</th>
		<th>Category</th>
		<th>Contributor</th>
		<th>Location</th>
	</thead>
	<tbody>
		{#each contributions as contribution}
			<tr>
				<td>
					{contribution.placemarkName}
				</td>
				<td>
					{contribution.rating}
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
					{contribution.category}
				</td>
				<td>
					{contribution.contributor.email}
				</td>
				<td>
					{contribution.location.town} {contribution.location.county}
				</td>
			</tr>
		{/each}
	</tbody>
</table>