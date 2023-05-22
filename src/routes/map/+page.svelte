<script>
    import { beforeUpdate } from "svelte";
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import ContributionMap from "$lib/ContributionMap.svelte";
    import { contributionService } from "../../services/contribution-service";

    beforeUpdate(() => {
        // @ts-ignore
        contributionService.checkPageRefresh();
    });
</script>

<Header>
    <MainNavigator />
</Header>

<ContributionMap />
