<script>
	import Header from '$lib/Header.svelte';
	import ContributeForm from '$lib/ContributeForm.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns is-vcentered">
	<div class="column has-text-centered">
		<img alt="globe" src="/globe.jpeg" width="300" />
	</div>
	<div class="column box has-text-centered">
		<h1 class="title is-4">Add a PlaceMark</h1>
		<ContributeForm/>
	</div>
</div>