<script>
	import Header from '$lib/Header.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';
	import ContributionList from '$lib/ContributionList.svelte';
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns">
	<div class="column has-text-centered">
		<img alt="map" src="/map.jpeg" width="300" />
	</div>
	<div class="column box has-text-centered">
		<h1 class="title is-4">Placemark Contribution List</h1>
		<ContributionList />
	</div>
</div>