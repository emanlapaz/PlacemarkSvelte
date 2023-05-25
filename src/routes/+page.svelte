<script lang="ts">
	import Header from '$lib/Header.svelte';
	import WelcomeNavigator from '$lib/WelcomeNavigator.svelte';
</script>

<Header>
	<WelcomeNavigator />
</Header>

<div class="column has-text-centered">
	<h1 class="title">Welcome to Placemark Svelte</h1>
<p>Placemark is a open community web app where you can log places of Interests for everyone to see and explore!</p>
</div>
<div class="box has-text-centered columns m-2">
	<div class="column has-text-centered">
		<img width="1000" src="/welcome.jpg" alt="welcome" />
	</div>
</div>

