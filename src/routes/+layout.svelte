<script>
	import { beforeUpdate } from "svelte";
	import { contributionService } from "../services/contribution-service.js";

	beforeUpdate(() => {
		contributionService.reload();
	});
</script>

<div class="container">
	<slot />
</div>