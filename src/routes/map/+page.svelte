<script lang="ts">
	import Header from "$lib/Header.svelte";
	import LeafletMap from "$lib/LeafletMap.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import { onMount } from "svelte";
	import { contributionService } from "../../services/contribution-service";
	import { getMarkerLayer } from "../../services/contribution-utils";

	let map: LeafletMap;

	onMount(async () => {
		contributionService.checkPageRefresh();
		const contributions = await contributionService.getContributions();
		const contributionMarkerLayer = getMarkerLayer(contributions);
		map.populateLayer(contributionMarkerLayer);
	});


</script>

<Header>
	<MainNavigator />
</Header>

<LeafletMap bind:this={map} />