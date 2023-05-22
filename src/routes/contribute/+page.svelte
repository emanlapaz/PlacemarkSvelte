<script>
	import Header from '$lib/Header.svelte';
	import ContributeForm from '$lib/ContributeForm.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';
	import ContributionMap from "$lib/ContributionMap.svelte";
</script>

<Header>
	<MainNavigator />
</Header>

<div class="container">
	<div class="box has-text-centered">
		<h1 class="title is-4">Add a PlaceMark</h1>
		<ContributeForm/>
	</div>
	<div class="box has-text-centered">
		<ContributionMap/>
	</div>

</div>
