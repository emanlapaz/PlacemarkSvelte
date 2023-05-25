import { LatLng } from "leaflet";
import type { ChartData } from "./charts";
import type { LocationContributions, Contribution} from "./contribution-types";
import type { MarkerLayer, MarkerSpec } from "./markers";

export function getMarkerLayer(contributions: Contribution[]): MarkerLayer {
	const markerSpecs = Array<MarkerSpec>();
	contributions.forEach((contribution) => {
		markerSpecs.push({
			id: contribution._id,
			title: `${contribution.location.town} ${contribution.location.county}: €${contribution.rating}`,
			location: new LatLng(contribution.lat, contribution.lng),
			popup: true
		});
	});
	return { title: "contributions", markerSpecs: markerSpecs };
}

export function generateByLocation(contributionsByLocation: LocationContributions[]): ChartData {
	const totalByLocation: ChartData = {
		labels: [],
		datasets: [
			{
				values: []
			}
		]
	};

	contributionsByLocation.forEach((contributionByLocation) => {
		const label = `${contributionByLocation.location.county}, ${contributionByLocation.location.town}`;
		totalByLocation.labels.push(label);
		let total = 0;
		contributionByLocation.contributions.forEach((contribution) => {
			total += contribution.rating;
		});
		totalByLocation.datasets[0].values.push(total);
	});
	return totalByLocation;
}

export function generateByCategory(contributionList: Contribution[]): ChartData {
	const totalByCategory: ChartData = {
		labels: ["Nature", "Food"],
		datasets: [
			{
				values: [0, 0]
			}
		]
	};

	contributionList.forEach((contribution) => {
		if (contribution.category == "paypal") {
			totalByCategory.datasets[0].values[0] += contribution.rating;
		} else if (contribution.category == "direct") {
			totalByCategory.datasets[0].values[1] += contribution.rating;
		}
	});

	return totalByCategory
}

