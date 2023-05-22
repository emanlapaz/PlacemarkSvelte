<script>
	// @ts-nocheck

	import "leaflet/dist/leaflet.css";
	import { LeafletMap } from "../services/leaflet-map";
	import { onMount } from "svelte";
	import { contributionService } from "../services/contribution-service";
	import { latestContribution } from "../stores";

	const mapConfig = {
		location: { lat: 52.160858, lng: -7.15242 },
		zoom: 8,
		minZoom: 1
	};
	let map;

	onMount(async () => {
		map = new LeafletMap("contribution-map", mapConfig);
		map.showZoomControl();
		map.addLayerGroup("Contributions");
		map.showLayerControl();
		const contributions = await contributionService.getContributions();
		contributions.forEach((contribution) => {
			addContributionMarker(map, contribution);
		});
	});

	function addContributionMarker(map, contribution) {
		const contributionStr = `${contribution.location.town} ${contribution.location.county} €${contribution.placemarkName.toString()}`;
		map.addMarker({ lat: contribution.lat, lng: contribution.lng }, contributiontr, "Contributions");
		map.moveTo(8, { lat: contribution.lat, lng: contribution.lng });
	}

	latestContribution.subscribe(async (contribution) => {
		if (contribution && map) {
			const candidate = await contributionService.getLocation(contribution.contribution);
			contribution.location = location;
			addContributionMarker(map, contribution);
		}
	});
</script>

<div class="box" id="contribution-map" style="height: 75vh" />